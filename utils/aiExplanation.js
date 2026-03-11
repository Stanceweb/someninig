import { AI_CONFIG } from "@/config/constructionToolsConfig";

const DEFAULT_FALLBACK_MESSAGE =
    "We could not fetch the AI explanation right now. This estimate remains a preliminary planning guide — final figures depend on detailed engineering review, site inspection, regulatory approvals, and current market conditions.";

const RETRYABLE_ERROR_CODES = new Set(["timeout", "network", "server_unavailable"]);

class AIExplanationError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "AIExplanationError";
        this.code = code;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const trimWordCount = (text, limit = 220) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= limit) {
        return text.trim();
    }
    return `${words.slice(0, limit).join(" ")}...`;
};

const COST_KEYS = [
    ["materialCost", "Materials"],
    ["laborCost", "Labour"],
    ["equipmentCost", "Equipment"],
    ["preliminaries", "Preliminaries / P&G"],
    ["overheadAndProfit", "Overhead & Profit"],
    ["overhead", "Overhead"],
    ["contingency", "Contingency"],
    ["taxAmount", "Tax"],
    ["mobilization", "Mobilization"],
    ["specialRequirementCost", "Special Requirements"],
    ["baseCost", "Base Cost"],
    ["estimatedTotal", "Estimated Total"],
    ["grandTotal", "Grand Total"],
];

const QUANTITY_KEYS = [
    ["wetVolumeM3", "Concrete volume (m³)"],
    ["cementBags", "Cement (bags)"],
    ["sandM3", "Sand (m³)"],
    ["graniteM3", "Granite (m³)"],
    ["waterLitres", "Water (litres)"],
    ["blocks", "Blocks (units)"],
    ["mortarBags", "Mortar cement (bags)"],
    ["mortarSandM3", "Mortar sand (m³)"],
    ["plasterCementBags", "Plaster cement (bags)"],
    ["plasterSandM3", "Plaster sand (m³)"],
    ["areaM2", "Area (m²)"],
    ["tileBoxes", "Tile boxes"],
    ["adhesiveBags", "Tile adhesive (bags)"],
    ["steelKg", "Steel (kg)"],
    ["steelTonnes", "Steel (tonnes)"],
];

const toNumberOrNull = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const buildNormalizedBreakdown = (outputs) => {
    const costLines = COST_KEYS
        .map(([key, label]) => {
            const value = toNumberOrNull(outputs?.[key]);
            return value === null ? null : `${label}: ${value.toFixed(2)}`;
        })
        .filter(Boolean);

    const quantityLines = QUANTITY_KEYS
        .map(([key, label]) => {
            const value = toNumberOrNull(outputs?.[key]);
            return value === null ? null : `${label}: ${value.toFixed(2)}`;
        })
        .filter(Boolean);

    return {
        costLines,
        quantityLines,
    };
};

/**
 * Builds a structured, deterministic prompt for the Ollama AI model.
 * The prompt is designed to produce stable, professional, client-friendly output
 * relevant to Nigerian construction projects.
 */
const buildPrompt = ({ toolName, inputs, outputs }) => {
    const { costLines, quantityLines } = buildNormalizedBreakdown(outputs);

    return [
        "You are a Nigerian Quantity Surveyor and construction commercial advisor.",
        "Your role is to produce a BOQ-style preliminary breakdown and simple explanation for non-technical clients.",
        "",
        `## Tool Used: ${toolName}`,
        "",
        "## Client Inputs:",
        JSON.stringify(inputs, null, 2),
        "",
        "## Calculated Results:",
        JSON.stringify(outputs, null, 2),
        "",
        "## Normalized Cost Lines (use only if present):",
        costLines.length ? costLines.join("\n") : "No cost line items detected.",
        "",
        "## Normalized Quantity Lines (use only if present):",
        quantityLines.length ? quantityLines.join("\n") : "No quantity line items detected.",
        "",
        "## Instructions:",
        "1. Output format must start with: 'Preliminary BOQ-style Breakdown (Not Final)'.",
        "2. Provide line items for Materials and Labour first whenever available, then Equipment, Preliminaries/P&G, Overhead & Profit, Contingency, Tax, and Total.",
        "3. If quantity lines exist, add a 'Key Quantities' section with those values.",
        "4. Do not invent any line item, cost driver, location risk, or quantity that is not present in the inputs/results.",
        "5. Mention factors that may change final values: site conditions, market rates, design updates, and approvals.",
        "6. State clearly this is a preliminary estimate and not a final binding BOQ.",
        "7. Keep response concise, professional, and under 200 words.",
        "8. Use Nigerian Naira (₦ / NGN) for any currency references.",
        "9. Do not use markdown formatting. Use plain text only.",
    ].join("\n");
};

const requestExplanation = async ({ url, requestBody, timeoutMs }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        });

        if (!response.ok) {
            const code = response.status >= 500 || response.status === 429 ? "server_unavailable" : "bad_response";
            throw new AIExplanationError(`Ollama request failed with status ${response.status}.`, code);
        }

        let payload;
        try {
            payload = await response.json();
        } catch {
            throw new AIExplanationError("Invalid JSON response from Ollama.", "invalid_json");
        }

        const rawText =
            typeof payload?.response === "string"
                ? payload.response
                : typeof payload?.message?.content === "string"
                  ? payload.message.content
                  : "";

        if (!rawText.trim()) {
            throw new AIExplanationError("Missing response text from Ollama.", "invalid_response");
        }

        return trimWordCount(rawText);
    } catch (error) {
        if (error?.name === "AbortError") {
            throw new AIExplanationError("The AI explanation request timed out.", "timeout");
        }
        if (error instanceof AIExplanationError) {
            throw error;
        }
        throw new AIExplanationError("Network error while contacting Ollama.", "network");
    } finally {
        clearTimeout(timeoutId);
    }
};

export const generateAIExplanation = async ({ toolName, inputs, outputs }) => {
    if (!AI_CONFIG.ENABLE_AI) {
        return { success: false, text: "AI explanation is currently disabled in configuration." };
    }

    const url = `${AI_CONFIG.OLLAMA_BASE_URL}${AI_CONFIG.OLLAMA_CHAT_ENDPOINT}`;
    const requestBody = {
        model: AI_CONFIG.OLLAMA_MODEL,
        prompt: buildPrompt({ toolName, inputs, outputs }),
        stream: AI_CONFIG.OLLAMA_STREAM,
        options: {
            temperature: AI_CONFIG.OLLAMA_TEMPERATURE,
            top_p: AI_CONFIG.OLLAMA_TOP_P,
            num_predict: AI_CONFIG.OLLAMA_NUM_PREDICT,
        },
    };

    const timeoutMs = Number(AI_CONFIG.OLLAMA_TIMEOUT_MS) || 45000;
    const maxRetries = Math.max(0, Number(AI_CONFIG.OLLAMA_MAX_RETRIES ?? 1));
    const retryDelayMs = Math.max(0, Number(AI_CONFIG.OLLAMA_RETRY_DELAY_MS ?? 1200));
    let lastError = null;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        try {
            const text = await requestExplanation({ url, requestBody, timeoutMs });
            return { success: true, text };
        } catch (error) {
            lastError = error;
            const shouldRetry = attempt < maxRetries && RETRYABLE_ERROR_CODES.has(error?.code);
            if (shouldRetry) {
                await delay(retryDelayMs * (attempt + 1));
                continue;
            }
            break;
        }
    }

    if (lastError?.code === "timeout") {
        return {
            success: false,
            text: `The AI explanation request timed out. The model may still be warming up; please try again shortly. ${DEFAULT_FALLBACK_MESSAGE}`,
        };
    }

    return { success: false, text: DEFAULT_FALLBACK_MESSAGE };
};


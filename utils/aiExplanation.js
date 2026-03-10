import { AI_CONFIG } from "@/config/constructionToolsConfig";

const DEFAULT_FALLBACK_MESSAGE =
    "We could not fetch the AI explanation right now. This estimate remains a preliminary planning guide — final figures depend on detailed engineering review, site inspection, regulatory approvals, and current market conditions.";

const trimWordCount = (text, limit = 250) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= limit) {
        return text.trim();
    }
    return `${words.slice(0, limit).join(" ")}...`;
};

/**
 * Builds a structured, deterministic prompt for the Ollama AI model.
 * The prompt is designed to produce stable, professional, client-friendly output
 * relevant to Nigerian construction projects.
 */
const buildPrompt = ({ toolName, inputs, outputs }) => {
    return [
        "You are a Nigerian Quantity Surveyor and construction commercial advisor.",
        "Your role is to explain construction estimates in simple, professional English for non-technical clients.",
        "",
        `## Tool Used: ${toolName}`,
        "",
        "## Client Inputs:",
        JSON.stringify(inputs, null, 2),
        "",
        "## Calculated Results:",
        JSON.stringify(outputs, null, 2),
        "",
        "## Instructions:",
        "1. Explain what this estimate covers in 2-3 sentences.",
        "2. Highlight the main cost or quantity drivers.",
        "3. Mention any factors that could cause the final figure to differ (site conditions, market prices, design changes, approvals).",
        "4. Do NOT present this as a final or binding price/quantity. State clearly it is a preliminary estimate.",
        "5. Keep your response under 200 words, professional, and reassuring.",
        "6. Use Nigerian Naira (₦ / NGN) for any currency references.",
        "7. Do not use markdown formatting. Use plain text only.",
    ].join("\n");
};

export const generateAIExplanation = async ({ toolName, inputs, outputs }) => {
    if (!AI_CONFIG.ENABLE_AI) {
        return { success: false, text: "AI explanation is currently disabled in configuration." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.OLLAMA_TIMEOUT_MS);
    const url = `${AI_CONFIG.OLLAMA_BASE_URL}${AI_CONFIG.OLLAMA_CHAT_ENDPOINT}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: AI_CONFIG.OLLAMA_MODEL,
                prompt: buildPrompt({ toolName, inputs, outputs }),
                stream: AI_CONFIG.OLLAMA_STREAM,
                options: {
                    temperature: AI_CONFIG.OLLAMA_TEMPERATURE,
                    top_p: AI_CONFIG.OLLAMA_TOP_P,
                    num_predict: AI_CONFIG.OLLAMA_NUM_PREDICT,
                },
            }),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Ollama request failed with status ${response.status}`);
        }

        let payload;
        try {
            payload = await response.json();
        } catch (parseError) {
            throw new Error("Invalid JSON response from Ollama.");
        }

        const rawText =
            typeof payload?.response === "string"
                ? payload.response
                : typeof payload?.message?.content === "string"
                  ? payload.message.content
                  : "";

        if (!rawText.trim()) {
            throw new Error("Missing response text from Ollama.");
        }

        return { success: true, text: trimWordCount(rawText) };
    } catch (error) {
        const timeoutMessage = error?.name === "AbortError" ? "The AI explanation request timed out." : "";
        return {
            success: false,
            text: timeoutMessage ? `${timeoutMessage} ${DEFAULT_FALLBACK_MESSAGE}` : DEFAULT_FALLBACK_MESSAGE,
        };
    } finally {
        clearTimeout(timeoutId);
    }
};


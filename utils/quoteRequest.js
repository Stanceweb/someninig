import { BUSINESS_CONTACT_CONFIG } from "@/config/constructionToolsConfig";

export const createQuoteRequestPayload = ({
    toolName,
    customer,
    project,
    result,
    summaryText,
    meta = {},
}) => ({
    toolName,
    customer,
    project,
    result,
    summaryText,
    meta: {
        source: "web-construction-tools",
        generatedAt: new Date().toISOString(),
        ...meta,
    },
});

export const submitOfficialQuoteRequest = async (payload) => {
    const response = await fetch(BUSINESS_CONTACT_CONFIG.mockQuoteEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
};


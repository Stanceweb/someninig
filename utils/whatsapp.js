import { BUSINESS_CONTACT_CONFIG } from "@/config/constructionToolsConfig";

const stringifyEntries = (record = {}) =>
    Object.entries(record)
        .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
        .join("\n");

export const buildWhatsAppSummary = ({ toolName, inputs = {}, outputs = {}, note = "" }) => {
    return [
        `${BUSINESS_CONTACT_CONFIG.companyName} - ${toolName}`,
        "",
        "Inputs:",
        stringifyEntries(inputs),
        "",
        "Result:",
        stringifyEntries(outputs),
        "",
        note ||
            "Note: This is an indicative estimate. Final values may change after site inspection and engineering review.",
    ].join("\n");
};

export const generateWhatsAppLink = ({ toolName, inputs, outputs, note, phoneNumber }) => {
    const summary = buildWhatsAppSummary({ toolName, inputs, outputs, note });
    const targetNumber = String(phoneNumber || BUSINESS_CONTACT_CONFIG.whatsappNumber || "").replace(/[^\d]/g, "");
    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(summary)}`;
};


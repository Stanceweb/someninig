import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@/config/constructionToolsConfig";

export const formatCurrency = (amount, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE) => {
    const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(safeAmount);
};

export const formatNumber = (value, maxFractionDigits = 2, locale = DEFAULT_LOCALE) => {
    const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: maxFractionDigits,
    }).format(safeValue);
};


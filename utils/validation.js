export const parsePositiveNumber = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return null;
    }
    return parsed;
};

export const parseNonNegativeNumber = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return null;
    }
    return parsed;
};

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
export const isValidPhone = (value) => /^\+?\d{10,15}$/.test(String(value || "").replace(/\s+/g, ""));

export const validateRequiredFields = (fields) => {
    const errors = {};
    Object.entries(fields).forEach(([key, value]) => {
        if (value === null || value === undefined || String(value).trim() === "") {
            errors[key] = "This field is required.";
        }
    });
    return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;


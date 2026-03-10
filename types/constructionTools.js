export const PROJECT_TYPES = ["residential", "commercial", "roadworks", "industrial"];
export const QUALITY_LEVELS = ["basic", "standard", "premium", "industrial"];
export const LABOR_INTENSITY_LEVELS = ["light", "normal", "high", "critical"];
export const SITE_ACCESS_LEVELS = ["easy", "moderate", "difficult", "remote"];
export const MATERIAL_TYPES = ["concrete", "blocks", "plaster", "flooring", "steel"];

/**
 * @typedef {Object} AIExplanationRequest
 * @property {string} toolName
 * @property {Record<string, unknown>} inputs
 * @property {Record<string, unknown>} outputs
 */

/**
 * @typedef {Object} CostBreakdownResult
 * @property {number} materialCost
 * @property {number} laborCost
 * @property {number} equipmentCost
 * @property {number} overhead
 * @property {number} contingency
 * @property {number} tax
 * @property {number} grandTotal
 */


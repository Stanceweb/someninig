export const DEFAULT_CURRENCY = "NGN";
export const DEFAULT_LOCALE = "en-NG";

export const BRANDING_CONFIG = {
    primaryColor: "#0F3D66",
    secondaryColor: "#F7A600",
    accentColor: "#1F7A8C",
    textColor: "#1B1F23",
    mutedTextColor: "#4B5563",
    surfaceColor: "#F8FAFC",
};

export const BUSINESS_CONTACT_CONFIG = {
    companyName: "Someni Nigeria Limited",
    whatsappNumber: "2348012345678",
    quoteEmail: "quotes@someninigltd.com",
    mockQuoteEndpoint: "/api/quote-requests",
};

export const AI_CONFIG = {
    ENABLE_AI: true,
    OLLAMA_BASE_URL: "https://ollama.someninigltd.com",
    OLLAMA_MODEL: "qwen2.5:7b",
    OLLAMA_CHAT_ENDPOINT: "/api/generate",
    OLLAMA_TIMEOUT_MS: 45000,
    OLLAMA_TEMPERATURE: 0.2,
    OLLAMA_NUM_PREDICT: 500,
    OLLAMA_TOP_P: 0.9,
    OLLAMA_STREAM: false,
};

/**
 * PROJECT COST RATES — Per-sqm (or per-meter for roads) all-in rates.
 * Aligned to Q1 2025 Nigerian market averages.
 * materialRate: cement, blocks, sand, granite, iron rods, roofing, finishes
 * laborRate: skilled + unskilled labour, gang rates, subcontractor allowances
 * equipmentRate: plant hire, scaffolding, small tools
 * prelimsRate: site establishment, supervision, security, welfare, insurance (as % of direct cost)
 * overheadRate: head-office overhead + profit margin (as % of direct cost)
 */
export const PROJECT_TYPE_CONFIG = {
    residential: {
        label: "Residential Building",
        unitLabel: "sqm",
        materialRate: 185000,
        laborRate: 65000,
        equipmentRate: 22000,
        prelimsRate: 0.08,
        overheadRate: 0.12,
        profitMargin: 0.1,
        defaultTaxPercent: 7.5,
        defaultContingencyPercent: 10,
    },
    commercial: {
        label: "Commercial Building",
        unitLabel: "sqm",
        materialRate: 235000,
        laborRate: 82000,
        equipmentRate: 35000,
        prelimsRate: 0.1,
        overheadRate: 0.12,
        profitMargin: 0.1,
        defaultTaxPercent: 7.5,
        defaultContingencyPercent: 12,
    },
    roadworks: {
        label: "Road Construction",
        unitLabel: "linear meter",
        materialRate: 245000,
        laborRate: 85000,
        equipmentRate: 78000,
        prelimsRate: 0.1,
        overheadRate: 0.13,
        profitMargin: 0.1,
        defaultTaxPercent: 7.5,
        defaultContingencyPercent: 15,
    },
    industrial: {
        label: "Industrial Facility",
        unitLabel: "sqm",
        materialRate: 265000,
        laborRate: 95000,
        equipmentRate: 55000,
        prelimsRate: 0.1,
        overheadRate: 0.14,
        profitMargin: 0.1,
        defaultTaxPercent: 7.5,
        defaultContingencyPercent: 15,
    },
    renovation: {
        label: "Renovation / Remodeling",
        unitLabel: "sqm",
        materialRate: 125000,
        laborRate: 55000,
        equipmentRate: 15000,
        prelimsRate: 0.07,
        overheadRate: 0.12,
        profitMargin: 0.1,
        defaultTaxPercent: 7.5,
        defaultContingencyPercent: 12,
    },
};

/**
 * LOCATION MULTIPLIERS — reflects market price premium in each city.
 * Lagos and Abuja carry highest premiums due to land cost, logistics, and demand.
 */
export const LOCATION_MULTIPLIERS = {
    lagos: { label: "Lagos", multiplier: 1.18 },
    abuja: { label: "Abuja (FCT)", multiplier: 1.15 },
    port_harcourt: { label: "Port Harcourt", multiplier: 1.12 },
    kano: { label: "Kano", multiplier: 1.05 },
    ibadan: { label: "Ibadan", multiplier: 1.04 },
    enugu: { label: "Enugu", multiplier: 1.06 },
    calabar: { label: "Calabar", multiplier: 1.05 },
    benin: { label: "Benin City", multiplier: 1.06 },
    other: { label: "Other Nigerian Location", multiplier: 1 },
};

export const QUALITY_LEVEL_MULTIPLIERS = {
    basic: { label: "Basic / Low-cost", factor: 0.82 },
    standard: { label: "Standard", factor: 1 },
    premium: { label: "Premium / High-end", factor: 1.45 },
    luxury: { label: "Luxury / Bespoke", factor: 1.85 },
};

export const LABOR_INTENSITY_MULTIPLIERS = {
    light: { label: "Light — simple trades, low skill", factor: 0.85 },
    normal: { label: "Normal — typical project", factor: 1 },
    high: { label: "High — specialized trades required", factor: 1.25 },
    critical: { label: "Critical — 24hr or shift work", factor: 1.45 },
};

export const SITE_ACCESS_MULTIPLIERS = {
    easy: { label: "Easy — good road, open site", factor: 1 },
    moderate: { label: "Moderate — some restrictions", factor: 1.15 },
    difficult: { label: "Difficult — narrow access, congestion", factor: 1.3 },
    remote: { label: "Remote — poor roads, far from suppliers", factor: 1.45 },
};

/**
 * MATERIAL FORMULAS — Nigerian QS standard calculations.
 *
 * CONCRETE: Rates are per m³ of WET concrete volume.
 * The dry volume conversion (×1.54) is already factored into the per-m³ rates below.
 * Do NOT multiply by dryVolumeFactor again in the calculation.
 *
 * Mix design basis (Nigerian standard):
 *   C20 (1:2:4): 6.5 bags cement, 0.44 m³ sand, 0.88 m³ granite per m³ wet
 *   C25 (1:1.5:3): 7.5 bags cement, 0.40 m³ sand, 0.80 m³ granite per m³ wet
 *   C30 (1:1:2): 9.0 bags cement, 0.37 m³ sand, 0.74 m³ granite per m³ wet
 *   C40 (1:1:1.5): 10.5 bags cement, 0.34 m³ sand, 0.68 m³ granite per m³ wet
 */
export const MATERIAL_FORMULA_CONFIG = {
    concrete: {
        label: "Concrete Calculator",
        defaults: {
            length: 12,
            width: 8,
            thickness: 0.15,
            unit: "m",
            grade: "C25",
        },
        grades: {
            C20: { cementBagsPerM3Wet: 6.5, sandM3PerM3Wet: 0.44, graniteM3PerM3Wet: 0.88, label: "C20 (1:2:4) — Blinding, light foundations" },
            C25: { cementBagsPerM3Wet: 7.5, sandM3PerM3Wet: 0.40, graniteM3PerM3Wet: 0.80, label: "C25 (1:1.5:3) — Slabs, beams, columns" },
            C30: { cementBagsPerM3Wet: 9.0, sandM3PerM3Wet: 0.37, graniteM3PerM3Wet: 0.74, label: "C30 (1:1:2) — Structural, high-strength" },
            C40: { cementBagsPerM3Wet: 10.5, sandM3PerM3Wet: 0.34, graniteM3PerM3Wet: 0.68, label: "C40 — Special structural elements" },
        },
        waterLitersPerM3: 180,
        wastageRate: 0.05,
    },
    blocks: {
        label: "Block Calculator",
        defaults: {
            wallLength: 45,
            wallHeight: 3,
            openingArea: 6,
            blockType: "9in",
        },
        blockTypes: {
            "6in": { length: 0.45, height: 0.225, label: "6 inch (150mm)", mortarBagsPer100: 1.8, sandM3Per100: 0.045 },
            "9in": { length: 0.45, height: 0.225, label: "9 inch (225mm)", mortarBagsPer100: 2.5, sandM3Per100: 0.065 },
        },
        wastageRate: 0.07,
        mortarWastageRate: 0.1,
    },
    plaster: {
        label: "Plaster Calculator",
        defaults: {
            area: 240,
            thicknessMm: 12,
            mix: "1:4",
            coats: "2",
        },
        mixRatios: {
            "1:3": { label: "1:3 (External render, strong)", cementBagsPerM2At12mm: 0.22, sandM3PerM2At12mm: 0.016 },
            "1:4": { label: "1:4 (Internal plaster, standard)", cementBagsPerM2At12mm: 0.18, sandM3PerM2At12mm: 0.019 },
            "1:5": { label: "1:5 (Ceiling plaster, light)", cementBagsPerM2At12mm: 0.15, sandM3PerM2At12mm: 0.021 },
            "1:6": { label: "1:6 (Non-structural, patching)", cementBagsPerM2At12mm: 0.12, sandM3PerM2At12mm: 0.023 },
        },
        wastageRate: 0.08,
    },
    flooring: {
        label: "Flooring Calculator",
        defaults: {
            area: 180,
            areaUnit: "sqm",
            tileLengthMm: 600,
            tileWidthMm: 600,
        },
        tileWastageRate: 0.1,
        adhesiveCoverageM2PerBag: 4.5,
        groutKgPerM2: 0.35,
        screedThicknessMm: 25,
        screedCementBagsPerM2: 0.12,
        screedSandM3PerM2: 0.025,
    },
    steel: {
        label: "Steel Reinforcement Estimate",
        defaults: {
            concreteVolume: 110,
            structureType: "building_frame",
        },
        kgPerM3ByStructure: {
            slab: { rate: 80, label: "Floor slab" },
            beam: { rate: 120, label: "Beams" },
            column: { rate: 160, label: "Columns" },
            building_frame: { rate: 110, label: "Building frame (average)" },
            heavy_foundation: { rate: 140, label: "Heavy / raft foundation" },
            bridge_element: { rate: 175, label: "Bridge / heavy civil" },
        },
        wastageRate: 0.05,
        bindingWireKgPerTonne: 8,
    },
};

/**
 * INSTANT QUOTE CONFIG — base rates per sqm by service type.
 * These rates represent total all-in project cost per sqm including materials, labour, equipment.
 */
export const QUOTE_CONFIG = {
    serviceTypes: {
        design_build: { label: "Design + Build (Turnkey)", baseRate: 285000 },
        shell_only: { label: "Shell / Carcass Only", baseRate: 165000 },
        renovation: { label: "Renovation / Remodeling", baseRate: 135000 },
        civil_works: { label: "Civil / Infrastructure Works", baseRate: 210000 },
        mep_installation: { label: "MEP Installation", baseRate: 120000 },
        interior_fitout: { label: "Interior Fit-out", baseRate: 95000 },
    },
    urgencyMultipliers: {
        standard: { label: "Standard timeline", factor: 1 },
        fast_track: { label: "Fast-track (compressed schedule)", factor: 1.18 },
        emergency: { label: "Emergency / urgent", factor: 1.32 },
    },
    mobilizationRates: {
        none: { label: "No mobilization needed", cost: 0 },
        within_city: { label: "Within city", cost: 1200000 },
        interstate: { label: "Interstate", cost: 2500000 },
        remote: { label: "Remote / rural location", cost: 4200000 },
    },
    equipmentMultiplierByLevel: {
        basic: { label: "Basic — hand tools, mixers", factor: 0.06 },
        medium: { label: "Medium — cranes, pumps", factor: 0.12 },
        heavy: { label: "Heavy — excavators, piling rigs", factor: 0.2 },
    },
    laborMultiplierByLevel: {
        standard: { label: "Standard labour gang", factor: 0.18 },
        skilled: { label: "Skilled trades (electricians, plumbers)", factor: 0.25 },
        specialist: { label: "Specialist (piling, structural steel)", factor: 0.35 },
    },
    contingencyRate: 0.1,
    advancePaymentPercent: 40,
    specialRequirementRate: 0.05,
    minProjectSize: 20,
};

/**
 * TIMELINE CONFIG — phases and productivity benchmarks.
 * baselineOutputPerCrewPerDay: sqm completed per 10-person crew per day
 * benchmarkDays: typical total duration for a standard-sized project of this type
 * materialLeadTimeDays: typical procurement wait in Nigeria (cement, steel, imported items)
 */
export const TIMELINE_CONFIG = {
    projectDefaults: {
        residential: {
            label: "Residential Building",
            baselineOutputPerCrewPerDay: 6.5,
            benchmarkDays: 210,
            materialLeadTimeDays: 14,
            phases: [
                { name: "Site Mobilization & Clearing", allocation: 0.06 },
                { name: "Setting Out & Excavation", allocation: 0.06 },
                { name: "Foundation / Substructure", allocation: 0.16 },
                { name: "Block Work & Superstructure", allocation: 0.22 },
                { name: "Roofing & Carpentry", allocation: 0.1 },
                { name: "MEP Rough-in (Electrical, Plumbing)", allocation: 0.12 },
                { name: "Plastering & Screeding", allocation: 0.1 },
                { name: "Finishes (Tiling, Painting, Joinery)", allocation: 0.12 },
                { name: "External Works & Handover", allocation: 0.06 },
            ],
        },
        commercial: {
            label: "Commercial Building",
            baselineOutputPerCrewPerDay: 5.2,
            benchmarkDays: 300,
            materialLeadTimeDays: 21,
            phases: [
                { name: "Mobilization & Design Coordination", allocation: 0.07 },
                { name: "Piling / Deep Foundation", allocation: 0.12 },
                { name: "Substructure & Ground Floor Slab", allocation: 0.13 },
                { name: "Structural Frame (Columns, Beams, Slabs)", allocation: 0.22 },
                { name: "Block Work & Building Envelope", allocation: 0.12 },
                { name: "MEP Systems Installation", allocation: 0.14 },
                { name: "Finishes & Façade", allocation: 0.12 },
                { name: "Commissioning & Handover", allocation: 0.08 },
            ],
        },
        roadworks: {
            label: "Road Construction",
            baselineOutputPerCrewPerDay: 16,
            benchmarkDays: 180,
            materialLeadTimeDays: 14,
            phases: [
                { name: "Survey & Site Clearing", allocation: 0.1 },
                { name: "Earthworks & Drainage", allocation: 0.25 },
                { name: "Sub-base & Base Course", allocation: 0.22 },
                { name: "Binder & Surface Course (Asphalt)", allocation: 0.22 },
                { name: "Road Furniture & Markings", allocation: 0.1 },
                { name: "Testing & Defects Period", allocation: 0.11 },
            ],
        },
        industrial: {
            label: "Industrial Facility",
            baselineOutputPerCrewPerDay: 4.3,
            benchmarkDays: 360,
            materialLeadTimeDays: 28,
            phases: [
                { name: "Planning, Permits & Procurement", allocation: 0.1 },
                { name: "Site Preparation & Foundation", allocation: 0.15 },
                { name: "Structural Steel / RC Frame", allocation: 0.22 },
                { name: "Roofing & Cladding", allocation: 0.1 },
                { name: "MEP & Process Equipment Install", allocation: 0.2 },
                { name: "Fire Protection & Safety Systems", allocation: 0.08 },
                { name: "Testing, Commissioning & Handover", allocation: 0.15 },
            ],
        },
    },
    workScheduleFactors: {
        "5x8": { label: "5 days/week × 8 hrs/day", factor: 1 },
        "6x8": { label: "6 days/week × 8 hrs/day", factor: 1.15 },
        "6x10": { label: "6 days/week × 10 hrs/day", factor: 1.3 },
        "7x10": { label: "7 days/week × 10 hrs/day (intensive)", factor: 1.45 },
    },
    siteDifficultyMultipliers: {
        low: { label: "Low — flat, open, good soil", factor: 1 },
        medium: { label: "Medium — some constraints", factor: 1.18 },
        high: { label: "High — confined, swampy, rocky", factor: 1.4 },
    },
    weatherRiskMultipliers: {
        dry_season: { label: "Dry season (Nov — Mar)", factor: 1 },
        transition: { label: "Transition period (Apr, Oct)", factor: 1.08 },
        light_rain: { label: "Light rainy season (May — Jun)", factor: 1.15 },
        heavy_rain: { label: "Peak rainy season (Jul — Sep)", factor: 1.35 },
    },
};

export const TOOL_TEXT = {
    engineeringDisclaimer:
        "⚠️ This estimate is for preliminary planning purposes only. Actual cost, quantities, and duration will be confirmed after detailed design, bill of quantities preparation, site inspection, regulatory approvals, and current market pricing. All figures are exclusive of land cost.",
};


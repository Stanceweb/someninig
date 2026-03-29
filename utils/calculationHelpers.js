import {
    LABOR_INTENSITY_MULTIPLIERS,
    LOCATION_MULTIPLIERS,
    MATERIAL_FORMULA_CONFIG,
    PROJECT_TYPE_CONFIG,
    QUALITY_LEVEL_MULTIPLIERS,
    QUOTE_CONFIG,
    SITE_ACCESS_MULTIPLIERS,
    TIMELINE_CONFIG,
} from "@/config/constructionToolsConfig";

const safeNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const roundTo = (value, digits = 2) => Number(safeNumber(value).toFixed(digits));

/**
 * PROJECT COST CALCULATOR
 * Nigerian QS cost build-up: Material + Labour + Equipment = Direct Cost
 * + Preliminaries (P&G) + Overhead & Profit = Subtotal
 * + Contingency = Pre-tax Total + VAT = Grand Total
 */
export const calculateProjectCost = (inputs) => {
    const project = PROJECT_TYPE_CONFIG[inputs.projectType] || PROJECT_TYPE_CONFIG.residential;
    const size = safeNumber(inputs.projectSize, 0);
    const locationFactor = LOCATION_MULTIPLIERS[inputs.projectLocation]?.multiplier || 1;
    const qualityFactor = QUALITY_LEVEL_MULTIPLIERS[inputs.qualityLevel]?.factor || 1;
    const laborFactor = LABOR_INTENSITY_MULTIPLIERS[inputs.laborIntensity]?.factor || 1;
    const accessFactor = SITE_ACCESS_MULTIPLIERS[inputs.siteAccessDifficulty]?.factor || 1;
    const contingencyPercent = safeNumber(inputs.contingencyPercent, project.defaultContingencyPercent);
    const taxPercent = safeNumber(inputs.taxPercent, project.defaultTaxPercent);

    // Direct costs — rates are per unit (sqm or linear meter)
    const materialCost = size * project.materialRate * qualityFactor * locationFactor;
    const laborCost = size * project.laborRate * laborFactor * locationFactor;
    const equipmentCost = size * project.equipmentRate * accessFactor * locationFactor;
    const directCost = materialCost + laborCost + equipmentCost;

    // Preliminaries & General (P&G) — site setup, supervision, security, welfare, insurance
    const preliminaries = directCost * (project.prelimsRate || 0);

    // Overhead & Profit — head office costs + contractor margin
    const overheadAndProfit = directCost * ((project.overheadRate || 0) + (project.profitMargin || 0));

    const subtotal = directCost + preliminaries + overheadAndProfit;
    const contingency = subtotal * (contingencyPercent / 100);
    const preTaxTotal = subtotal + contingency;
    const tax = preTaxTotal * (taxPercent / 100);
    const grandTotal = preTaxTotal + tax;

    // Cost per unit for reference
    const costPerUnit = size > 0 ? grandTotal / size : 0;

    const breakdown = [
        { key: "Materials", value: materialCost, color: "#0f3d66" },
        { key: "Labour", value: laborCost, color: "#1f7a8c" },
        { key: "Equipment", value: equipmentCost, color: "#2ca58d" },
        { key: "Preliminaries (P&G)", value: preliminaries, color: "#84bfc4" },
        { key: "Overhead & Profit", value: overheadAndProfit, color: "#f7a600" },
        { key: "Contingency", value: contingency, color: "#e87d2f" },
        { key: "VAT", value: tax, color: "#c05746" },
    ].map((item) => ({
        ...item,
        percent: grandTotal > 0 ? roundTo((item.value / grandTotal) * 100, 1) : 0,
    }));

    return {
        unitLabel: project.unitLabel,
        size,
        materialCost: roundTo(materialCost),
        laborCost: roundTo(laborCost),
        equipmentCost: roundTo(equipmentCost),
        preliminaries: roundTo(preliminaries),
        overheadAndProfit: roundTo(overheadAndProfit),
        contingency: roundTo(contingency),
        tax: roundTo(tax),
        grandTotal: roundTo(grandTotal),
        costPerUnit: roundTo(costPerUnit),
        breakdown,
    };
};

const convertToSquareMeters = (value, areaUnit) => {
    const area = safeNumber(value, 0);
    if (areaUnit === "sqft") {
        return area * 0.092903;
    }
    return area;
};

const convertToMeters = (value, unit) => {
    const input = safeNumber(value, 0);
    if (unit === "ft") {
        return input * 0.3048;
    }
    return input;
};

/**
 * MATERIAL CALCULATOR
 * Uses Nigerian QS standard material quantification formulas.
 * IMPORTANT: Concrete rates are per m³ of WET volume (dry volume factor already included).
 */
export const calculateMaterialEstimate = (materialType, inputs) => {
    const config = MATERIAL_FORMULA_CONFIG[materialType];
    if (!config) {
        return null;
    }

    if (materialType === "concrete") {
        const length = convertToMeters(inputs.length, inputs.unit);
        const width = convertToMeters(inputs.width, inputs.unit);
        const thickness = convertToMeters(inputs.thickness, inputs.unit);
        const wetVolume = length * width * thickness;
        const mix = config.grades[inputs.grade] || config.grades.C25;
        const wastage = 1 + config.wastageRate;

        // Rates already include dry-to-wet conversion — apply directly to wet volume
        const cementBags = wetVolume * mix.cementBagsPerM3Wet * wastage;
        const sandM3 = wetVolume * mix.sandM3PerM3Wet * wastage;
        const graniteM3 = wetVolume * mix.graniteM3PerM3Wet * wastage;
        const waterLiters = wetVolume * config.waterLitersPerM3;

        return {
            title: config.label,
            summary: `${roundTo(wetVolume, 2)} m³ of ${inputs.grade} concrete. Procurement quantities include ${config.wastageRate * 100}% wastage allowance.`,
            quantities: [
                { label: "Concrete Volume", value: roundTo(wetVolume, 2), unit: "m³" },
                { label: "Cement (50kg bags)", value: Math.ceil(cementBags), unit: "bags" },
                { label: "Sharp Sand", value: roundTo(sandM3, 2), unit: "m³" },
                { label: "Granite (¾ inch)", value: roundTo(graniteM3, 2), unit: "m³" },
                { label: "Water (approx.)", value: Math.ceil(waterLiters), unit: "litres" },
            ],
            notes: `Grade ${inputs.grade}: ${mix.label || ""}. Adjust for actual site mix design and batching method.`,
        };
    }

    if (materialType === "blocks") {
        const wallLength = safeNumber(inputs.wallLength, 0);
        const wallHeight = safeNumber(inputs.wallHeight, 0);
        const openingArea = safeNumber(inputs.openingArea, 0);
        const blockData = config.blockTypes[inputs.blockType] || config.blockTypes["9in"];
        const grossWallArea = wallLength * wallHeight;
        const netWallArea = Math.max(grossWallArea - openingArea, 0);
        const blockFaceArea = blockData.length * blockData.height;
        const rawBlocks = netWallArea / blockFaceArea;
        const totalBlocks = Math.ceil(rawBlocks * (1 + config.wastageRate));
        const mortarCementBags = Math.ceil((totalBlocks / 100) * blockData.mortarBagsPer100 * (1 + config.mortarWastageRate));
        const mortarSandM3 = roundTo((totalBlocks / 100) * blockData.sandM3Per100 * (1 + config.mortarWastageRate), 2);

        return {
            title: config.label,
            summary: `${totalBlocks} ${blockData.label} blocks for ${roundTo(netWallArea, 1)} m² net wall area (${config.wastageRate * 100}% wastage included).`,
            quantities: [
                { label: "Gross Wall Area", value: roundTo(grossWallArea, 1), unit: "m²" },
                { label: "Deduct Openings", value: roundTo(openingArea, 1), unit: "m²" },
                { label: "Net Wall Area", value: roundTo(netWallArea, 1), unit: "m²" },
                { label: `Blocks (${blockData.label})`, value: totalBlocks, unit: "pcs" },
                { label: "Mortar Cement", value: mortarCementBags, unit: "bags (50kg)" },
                { label: "Mortar Sand", value: mortarSandM3, unit: "m³" },
            ],
        };
    }

    if (materialType === "plaster") {
        const area = safeNumber(inputs.area, 0);
        const thicknessMm = safeNumber(inputs.thicknessMm, 12);
        const coats = safeNumber(inputs.coats, 2);
        const mix = config.mixRatios[inputs.mix] || config.mixRatios["1:4"];
        const thicknessFactor = thicknessMm / 12;
        const wastage = 1 + config.wastageRate;

        // Scale by thickness relative to 12mm base and number of coats
        const effectiveArea = area * coats;
        const cementBags = effectiveArea * mix.cementBagsPerM2At12mm * thicknessFactor * wastage;
        const sandM3 = effectiveArea * mix.sandM3PerM2At12mm * thicknessFactor * wastage;

        return {
            title: config.label,
            summary: `${roundTo(area, 0)} m² × ${coats} coat(s) at ${thicknessMm}mm using ${inputs.mix} mix. Includes ${config.wastageRate * 100}% wastage.`,
            quantities: [
                { label: "Wall / Ceiling Area", value: roundTo(area, 1), unit: "m²" },
                { label: "Plaster Thickness", value: roundTo(thicknessMm, 0), unit: "mm" },
                { label: "Number of Coats", value: coats, unit: "" },
                { label: "Cement (50kg bags)", value: Math.ceil(cementBags), unit: "bags" },
                { label: "Plastering Sand", value: roundTo(sandM3, 2), unit: "m³" },
            ],
            notes: `Mix ${inputs.mix}: ${mix.label || ""}`,
        };
    }

    if (materialType === "flooring") {
        const areaM2 = convertToSquareMeters(inputs.area, inputs.areaUnit);
        const tileLengthM = safeNumber(inputs.tileLengthMm, 0) / 1000;
        const tileWidthM = safeNumber(inputs.tileWidthMm, 0) / 1000;
        const tileArea = tileLengthM * tileWidthM;
        const wastageFactor = 1 + config.tileWastageRate;
        const tiles = Math.ceil((areaM2 / tileArea) * wastageFactor);
        const adhesiveBags = Math.ceil(areaM2 / config.adhesiveCoverageM2PerBag);
        const groutKg = roundTo(areaM2 * config.groutKgPerM2, 1);
        const screedCement = Math.ceil(areaM2 * config.screedCementBagsPerM2);
        const screedSand = roundTo(areaM2 * config.screedSandM3PerM2, 2);

        return {
            title: config.label,
            summary: `${tiles} tiles (${inputs.tileLengthMm}×${inputs.tileWidthMm}mm) for ${roundTo(areaM2, 1)} m² including ${config.tileWastageRate * 100}% cutting wastage.`,
            quantities: [
                { label: "Floor Area", value: roundTo(areaM2, 1), unit: "m²" },
                { label: `Tiles (${inputs.tileLengthMm}×${inputs.tileWidthMm}mm)`, value: tiles, unit: "pcs" },
                { label: "Tile Adhesive (20kg bags)", value: adhesiveBags, unit: "bags" },
                { label: "Grout", value: groutKg, unit: "kg" },
                { label: "Screed Cement", value: screedCement, unit: "bags (50kg)" },
                { label: "Screed Sand", value: screedSand, unit: "m³" },
            ],
            notes: `Includes ${config.screedThicknessMm}mm floor screed allowance.`,
        };
    }

    if (materialType === "steel") {
        const volume = safeNumber(inputs.concreteVolume, 0);
        const structureConfig = config.kgPerM3ByStructure[inputs.structureType] || config.kgPerM3ByStructure.building_frame;
        const steelKgPerM3 = structureConfig.rate;
        const totalKg = volume * steelKgPerM3 * (1 + config.wastageRate);
        const tonnes = totalKg / 1000;
        const bindingWireKg = roundTo(tonnes * config.bindingWireKgPerTonne, 1);

        return {
            title: config.label,
            summary: `${roundTo(tonnes, 2)} tonnes of reinforcement steel for ${roundTo(volume, 0)} m³ of ${structureConfig.label} concrete. Includes ${config.wastageRate * 100}% lap/wastage.`,
            quantities: [
                { label: "Concrete Volume", value: roundTo(volume, 1), unit: "m³" },
                { label: `Steel Intensity (${structureConfig.label})`, value: roundTo(steelKgPerM3, 0), unit: "kg/m³" },
                { label: "Total Steel (kg)", value: roundTo(totalKg, 0), unit: "kg" },
                { label: "Total Steel (tonnes)", value: roundTo(tonnes, 2), unit: "tonnes" },
                { label: "Binding Wire", value: bindingWireKg, unit: "kg" },
            ],
            notes: "Steel estimate uses rule-of-thumb ratios. Actual requirements depend on structural design and bar bending schedule.",
        };
    }

    return null;
};

/**
 * INSTANT QUOTE GENERATOR
 * Builds up from base rate × size, applies equipment/labour/special percentages,
 * adds mobilization and contingency, then urgency premium.
 */
export const calculateInstantQuote = (inputs) => {
    const serviceType = QUOTE_CONFIG.serviceTypes[inputs.serviceType] || QUOTE_CONFIG.serviceTypes.design_build;
    const urgency = QUOTE_CONFIG.urgencyMultipliers[inputs.urgency] || QUOTE_CONFIG.urgencyMultipliers.standard;
    const mobilization = QUOTE_CONFIG.mobilizationRates[inputs.mobilizationLevel] || QUOTE_CONFIG.mobilizationRates.none;
    const equipment = QUOTE_CONFIG.equipmentMultiplierByLevel[inputs.equipmentLevel] || QUOTE_CONFIG.equipmentMultiplierByLevel.basic;
    const labor = QUOTE_CONFIG.laborMultiplierByLevel[inputs.laborLevel] || QUOTE_CONFIG.laborMultiplierByLevel.standard;
    const specialRate = safeNumber(inputs.specialRequirementPercent, QUOTE_CONFIG.specialRequirementRate * 100) / 100;
    const projectSize = Math.max(safeNumber(inputs.projectSize, 0), QUOTE_CONFIG.minProjectSize);

    const baseCost = projectSize * serviceType.baseRate;
    const equipmentCost = baseCost * equipment.factor;
    const laborCost = baseCost * labor.factor;
    const specialRequirementCost = baseCost * specialRate;
    const subtotalBeforeMob = baseCost + equipmentCost + laborCost + specialRequirementCost;
    const contingency = subtotalBeforeMob * QUOTE_CONFIG.contingencyRate;
    const subtotal = subtotalBeforeMob + contingency + mobilization.cost;
    const total = subtotal * urgency.factor;
    const advancePercent = QUOTE_CONFIG.advancePaymentPercent;
    const recommendedAdvance = total * (advancePercent / 100);

    return {
        serviceLabel: serviceType.label,
        projectSize,
        baseCost: roundTo(baseCost),
        mobilization: roundTo(mobilization.cost),
        mobilizationLabel: mobilization.label,
        equipmentCost: roundTo(equipmentCost),
        laborCost: roundTo(laborCost),
        specialRequirementCost: roundTo(specialRequirementCost),
        contingency: roundTo(contingency),
        urgencyLabel: urgency.label,
        urgencyFactor: urgency.factor,
        subtotal: roundTo(subtotal),
        estimatedTotal: roundTo(total),
        recommendedAdvance: roundTo(recommendedAdvance),
        advancePercent,
        estimateRangeLow: roundTo(total * 0.9),
        estimateRangeHigh: roundTo(total * 1.12),
    };
};

export const buildQuoteSummaryText = (quoteInput, quoteOutput) => {
    return [
        `PRELIMINARY COST ESTIMATE`,
        `========================`,
        `Client: ${quoteInput.customerName || "N/A"}`,
        `Company: ${quoteInput.companyName || "N/A"}`,
        `Service: ${quoteOutput.serviceLabel}`,
        `Location: ${quoteInput.projectLocation}`,
        `Project Size: ${roundTo(quoteOutput.projectSize, 0)} sqm`,
        ``,
        `Base Cost: NGN ${quoteOutput.baseCost.toLocaleString("en-NG")}`,
        `Equipment: NGN ${quoteOutput.equipmentCost.toLocaleString("en-NG")}`,
        `Labour: NGN ${quoteOutput.laborCost.toLocaleString("en-NG")}`,
        `Special Requirements: NGN ${quoteOutput.specialRequirementCost.toLocaleString("en-NG")}`,
        `Contingency (10%): NGN ${quoteOutput.contingency.toLocaleString("en-NG")}`,
        `Mobilization: NGN ${quoteOutput.mobilization.toLocaleString("en-NG")}`,
        `Urgency: ${quoteOutput.urgencyLabel}`,
        ``,
        `ESTIMATED TOTAL: NGN ${quoteOutput.estimatedTotal.toLocaleString("en-NG")}`,
        `Range: NGN ${quoteOutput.estimateRangeLow.toLocaleString("en-NG")} – ${quoteOutput.estimateRangeHigh.toLocaleString("en-NG")}`,
        `Recommended Advance (${quoteOutput.advancePercent}%): NGN ${quoteOutput.recommendedAdvance.toLocaleString("en-NG")}`,
        ``,
        `Note: This is a preliminary estimate. Final pricing will be confirmed after site inspection, detailed BOQ, and current market pricing.`,
    ].join("\n");
};

/**
 * TIMELINE ESTIMATOR
 * Duration = (projectSize / effectiveOutputPerDay) × difficulty × weather + permits + material lead time
 */
export const calculateTimelineEstimate = (inputs) => {
    const project = TIMELINE_CONFIG.projectDefaults[inputs.projectType] || TIMELINE_CONFIG.projectDefaults.residential;
    const projectSize = safeNumber(inputs.projectSize, 0);
    const crewSize = Math.max(safeNumber(inputs.crewSize, 1), 1);
    const schedule = TIMELINE_CONFIG.workScheduleFactors[inputs.workSchedule] || TIMELINE_CONFIG.workScheduleFactors["5x8"];
    const siteFactor = TIMELINE_CONFIG.siteDifficultyMultipliers[inputs.siteDifficulty]?.factor || 1;
    const weatherFactor = TIMELINE_CONFIG.weatherRiskMultipliers[inputs.weatherRisk]?.factor || 1;
    const permitDelayDays = Math.max(safeNumber(inputs.permitDelayDays, 0), 0);
    const materialLeadTime = project.materialLeadTimeDays || 14;

    // Crew productivity scales with diminishing returns beyond baseline 10-person crew
    const crewFactor = crewSize <= 10
        ? crewSize / 10
        : 1 + Math.log2(crewSize / 10) * 0.5;
    const effectiveOutputPerDay = project.baselineOutputPerCrewPerDay * crewFactor * schedule.factor;
    const workingDays = Math.ceil(projectSize / Math.max(effectiveOutputPerDay, 0.1));
    const adjustedDays = Math.ceil(workingDays * siteFactor * weatherFactor);
    const totalDays = adjustedDays + permitDelayDays + materialLeadTime;
    const durationWeeks = roundTo(totalDays / 7, 1);
    const durationMonths = roundTo(totalDays / 30, 1);

    let runningTotal = 0;
    const phases = project.phases.map((phase) => {
        const phaseDays = Math.max(Math.round(adjustedDays * phase.allocation), 1);
        runningTotal += phaseDays;
        return {
            ...phase,
            days: phaseDays,
            cumulativeDays: runningTotal,
            percent: roundTo(phase.allocation * 100, 1),
        };
    });

    const warnings = [];
    if (totalDays > project.benchmarkDays) {
        warnings.push(`Projected timeline (${totalDays} days) exceeds the typical ${project.benchmarkDays}-day benchmark for ${project.label}. Consider increasing crew size or work schedule intensity.`);
    }
    if (weatherFactor > 1.2) {
        warnings.push("Heavy rain season significantly increases project duration. Plan critical concrete and earthwork activities for dry periods where possible.");
    }
    if (crewSize < 5) {
        warnings.push("Very small crew size will extend the project significantly. Minimum recommended crew for this project type is 8–10 workers.");
    }

    return {
        projectLabel: project.label,
        workingDays,
        totalDays,
        adjustedDurationDays: totalDays,
        durationWeeks,
        durationMonths,
        permitDelayDays,
        materialLeadTimeDays: materialLeadTime,
        phases,
        warnings,
        warning: warnings.join(" "),
    };
};


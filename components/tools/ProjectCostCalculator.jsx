"use client";

import { useMemo, useRef, useState } from "react";
import {
    LABOR_INTENSITY_MULTIPLIERS,
    LOCATION_MULTIPLIERS,
    PROJECT_TYPE_CONFIG,
    QUALITY_LEVEL_MULTIPLIERS,
    SITE_ACCESS_MULTIPLIERS,
    TOOL_TEXT,
} from "@/config/constructionToolsConfig";
import { calculateProjectCost } from "@/utils/calculationHelpers";
import { formatCurrency, formatNumber } from "@/utils/currency";
import { exportElementToPdf } from "@/utils/pdfExport";
import { generateWhatsAppLink } from "@/utils/whatsapp";
import { hasErrors, parseNonNegativeNumber, parsePositiveNumber } from "@/utils/validation";
import AIExplanationPanel from "./AIExplanationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import ToolCard from "./ToolCard";
import styles from "./construction-tools.module.css";

const buildDefaultState = () => {
    const firstProject = Object.keys(PROJECT_TYPE_CONFIG)[0];
    const defaultType = PROJECT_TYPE_CONFIG[firstProject];

    return {
        projectType: firstProject,
        projectLocation: "lagos",
        projectSize: 250,
        qualityLevel: "standard",
        laborIntensity: "normal",
        siteAccessDifficulty: "moderate",
        contingencyPercent: defaultType.defaultContingencyPercent,
        taxPercent: defaultType.defaultTaxPercent,
    };
};

const ProjectCostCalculator = () => {
    const [formState, setFormState] = useState(buildDefaultState);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [actionMessage, setActionMessage] = useState("");
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const resultRef = useRef(null);

    const selectedProjectType = PROJECT_TYPE_CONFIG[formState.projectType];

    const summaryText = useMemo(() => {
        if (!result) return "";
        return [
            `COST ESTIMATE SUMMARY`,
            `=====================`,
            `Project Type: ${selectedProjectType.label}`,
            `Project Size: ${formatNumber(result.size)} ${selectedProjectType.unitLabel}`,
            ``,
            `Materials: ${formatCurrency(result.materialCost)}`,
            `Labour: ${formatCurrency(result.laborCost)}`,
            `Equipment: ${formatCurrency(result.equipmentCost)}`,
            `Preliminaries (P&G): ${formatCurrency(result.preliminaries)}`,
            `Overhead & Profit: ${formatCurrency(result.overheadAndProfit)}`,
            `Contingency: ${formatCurrency(result.contingency)}`,
            `VAT: ${formatCurrency(result.tax)}`,
            ``,
            `GRAND TOTAL: ${formatCurrency(result.grandTotal)}`,
            `Cost per ${selectedProjectType.unitLabel}: ${formatCurrency(result.costPerUnit)}`,
        ].join("\n");
    }, [result, selectedProjectType]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "projectType") {
            const typeDefaults = PROJECT_TYPE_CONFIG[value];
            setFormState((prev) => ({
                ...prev,
                projectType: value,
                contingencyPercent: typeDefaults.defaultContingencyPercent,
                taxPercent: typeDefaults.defaultTaxPercent,
            }));
            return;
        }
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const validationErrors = {};
        if (parsePositiveNumber(formState.projectSize) === null) {
            validationErrors.projectSize = "Project size must be greater than zero.";
        }
        const contingency = parseNonNegativeNumber(formState.contingencyPercent);
        const tax = parseNonNegativeNumber(formState.taxPercent);
        if (contingency === null || contingency > 30) {
            validationErrors.contingencyPercent = "Contingency should be between 0% and 30%.";
        }
        if (tax === null || tax > 20) {
            validationErrors.taxPercent = "Tax should be between 0% and 20%.";
        }
        return validationErrors;
    };

    const handleCalculate = (event) => {
        event.preventDefault();
        setActionMessage("");
        const validationErrors = validate();
        setErrors(validationErrors);
        if (hasErrors(validationErrors)) {
            setResult(null);
            return;
        }
        setResult(calculateProjectCost(formState));
    };

    const handleReset = () => {
        setFormState(buildDefaultState());
        setErrors({});
        setResult(null);
        setShowQuoteForm(false);
        setActionMessage("");
    };

    const handlePdfDownload = async () => {
        const response = await exportElementToPdf({
            element: resultRef.current,
            fileName: "project-cost-estimate.pdf",
        });
        setActionMessage(response.message);
    };

    const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink({
            toolName: "Project Cost Calculator",
            inputs: formState,
            outputs: result,
        });
        window.open(link, "_blank", "noopener,noreferrer");
    };

    return (
        <ToolCard
            title="Project Cost Calculator"
            description="Estimate material, labour, equipment, preliminaries, overhead & profit, contingency, and VAT for Nigerian construction projects."
        >
            <form className={styles.formGrid} onSubmit={handleCalculate}>
                <div className={styles.formField}>
                    <label htmlFor="cost-projectType">Project Type</label>
                    <select id="cost-projectType" name="projectType" value={formState.projectType} onChange={handleInputChange}>
                        {Object.entries(PROJECT_TYPE_CONFIG).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-projectLocation">Project Location</label>
                    <select id="cost-projectLocation" name="projectLocation" value={formState.projectLocation} onChange={handleInputChange}>
                        {Object.entries(LOCATION_MULTIPLIERS).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                        ))}
                    </select>
                    <p className={styles.helperText}>Location affects material and labour costs due to logistics and market rates.</p>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-projectSize">Total Size ({selectedProjectType.unitLabel})</label>
                    <input
                        id="cost-projectSize"
                        name="projectSize"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formState.projectSize}
                        onChange={handleInputChange}
                    />
                    <p className={styles.helperText}>
                        {selectedProjectType.unitLabel === "sqm"
                            ? "Enter total built-up area (GFA) in square metres."
                            : "Enter total linear length in metres."}
                    </p>
                    {errors.projectSize ? <p className={styles.errorText}>{errors.projectSize}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-qualityLevel">Quality / Specification Level</label>
                    <select id="cost-qualityLevel" name="qualityLevel" value={formState.qualityLevel} onChange={handleInputChange}>
                        {Object.entries(QUALITY_LEVEL_MULTIPLIERS).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-laborIntensity">Labour Intensity</label>
                    <select id="cost-laborIntensity" name="laborIntensity" value={formState.laborIntensity} onChange={handleInputChange}>
                        {Object.entries(LABOR_INTENSITY_MULTIPLIERS).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-siteAccessDifficulty">Site Access Difficulty</label>
                    <select id="cost-siteAccessDifficulty" name="siteAccessDifficulty" value={formState.siteAccessDifficulty} onChange={handleInputChange}>
                        {Object.entries(SITE_ACCESS_MULTIPLIERS).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-contingencyPercent">Contingency (%)</label>
                    <input
                        id="cost-contingencyPercent"
                        name="contingencyPercent"
                        type="number"
                        min="0"
                        max="30"
                        step="0.5"
                        value={formState.contingencyPercent}
                        onChange={handleInputChange}
                    />
                    <p className={styles.helperText}>Typically 10–15% for new builds, 12–20% for renovation/infrastructure.</p>
                    {errors.contingencyPercent ? <p className={styles.errorText}>{errors.contingencyPercent}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="cost-taxPercent">VAT (%)</label>
                    <input
                        id="cost-taxPercent"
                        name="taxPercent"
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={formState.taxPercent}
                        onChange={handleInputChange}
                    />
                    <p className={styles.helperText}>Nigeria standard VAT is 7.5%.</p>
                    {errors.taxPercent ? <p className={styles.errorText}>{errors.taxPercent}</p> : null}
                </div>

                <div className={`${styles.actionsRow} ${styles.fullWidth}`}>
                    <button className={styles.primaryButton} type="submit">
                        📊 Calculate Estimate
                    </button>
                    <button className={styles.ghostButton} type="button" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>

            {result ? (
                <div className={styles.resultsCard} ref={resultRef}>
                    <h4>Cost Breakdown — {selectedProjectType.label}</h4>
                    <div className={styles.resultsGrid}>
                        <div className={styles.resultItem}>
                            <div>Materials</div>
                            <strong>{formatCurrency(result.materialCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Labour</div>
                            <strong>{formatCurrency(result.laborCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Equipment</div>
                            <strong>{formatCurrency(result.equipmentCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Preliminaries (P&amp;G)</div>
                            <strong>{formatCurrency(result.preliminaries)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Overhead &amp; Profit</div>
                            <strong>{formatCurrency(result.overheadAndProfit)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Contingency</div>
                            <strong>{formatCurrency(result.contingency)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>VAT</div>
                            <strong>{formatCurrency(result.tax)}</strong>
                        </div>
                        <div className={styles.resultItemHighlight}>
                            <div>Grand Total</div>
                            <strong>{formatCurrency(result.grandTotal)}</strong>
                        </div>
                    </div>
                    <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "#4b5563" }}>
                        Cost per {result.unitLabel}: <strong style={{ color: "#0f3d66" }}>{formatCurrency(result.costPerUnit)}</strong>
                    </div>

                    <div className={styles.barChart}>
                        {result.breakdown.map((item) => (
                            <div key={item.key} className={styles.barRow}>
                                <span>{item.key}</span>
                                <span className={styles.barTrack}>
                                    <span className={styles.barFill} style={{ width: `${item.percent}%`, background: item.color }} />
                                </span>
                                <span>{item.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

            {result ? (
                <>
                    <div className={styles.actionsRow}>
                        <button className={styles.secondaryButton} type="button" onClick={handlePdfDownload}>
                            📄 Download PDF
                        </button>
                        <button className={styles.secondaryButton} type="button" onClick={handleWhatsAppShare}>
                            💬 Send to WhatsApp
                        </button>
                        <button
                            className={styles.secondaryButton}
                            type="button"
                            onClick={() => setShowQuoteForm((prev) => !prev)}
                        >
                            {showQuoteForm ? "Hide quote form" : "📩 Request Official Quote"}
                        </button>
                    </div>
                    {actionMessage ? <p className={styles.helperText}>{actionMessage}</p> : null}
                    <AIExplanationPanel toolName="Project Cost Calculator" inputs={formState} outputs={result} />
                    {showQuoteForm ? (
                        <QuoteRequestForm
                            toolName="project-cost-calculator"
                            projectData={formState}
                            resultData={result}
                            summaryText={summaryText}
                        />
                    ) : null}
                </>
            ) : null}

            <p className={styles.disclaimer}>{TOOL_TEXT.engineeringDisclaimer}</p>
        </ToolCard>
    );
};

export default ProjectCostCalculator;


"use client";

import { useMemo, useRef, useState } from "react";
import { TIMELINE_CONFIG, TOOL_TEXT } from "@/config/constructionToolsConfig";
import { calculateTimelineEstimate } from "@/utils/calculationHelpers";
import { formatNumber } from "@/utils/currency";
import { exportElementToPdf } from "@/utils/pdfExport";
import { generateWhatsAppLink } from "@/utils/whatsapp";
import { hasErrors, parseNonNegativeNumber, parsePositiveNumber } from "@/utils/validation";
import AIExplanationPanel from "./AIExplanationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import ToolCard from "./ToolCard";
import styles from "./construction-tools.module.css";

const buildDefaults = () => ({
    projectType: "residential",
    projectSize: 260,
    crewSize: 14,
    workSchedule: "6x8",
    siteDifficulty: "medium",
    weatherRisk: "dry_season",
    permitDelayDays: 14,
});

const ProjectTimelineEstimator = () => {
    const [formState, setFormState] = useState(buildDefaults);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const resultRef = useRef(null);

    const summaryText = useMemo(() => {
        if (!result) return "";
        const lines = [
            `Project Type: ${result.projectLabel}`,
            `Total Duration: ${result.totalDays} calendar days`,
            `Working Days: ${result.workingDays} days`,
            `Duration: ${result.durationWeeks} weeks / ${result.durationMonths} months`,
        ];
        if (result.materialLeadTimeDays) {
            lines.push(`Material Lead Time: ${result.materialLeadTimeDays} days`);
        }
        if (result.permitDelayDays) {
            lines.push(`Permit / Approval Delay: ${result.permitDelayDays} days`);
        }
        lines.push("", "Phase Breakdown:");
        result.phases.forEach((phase) => {
            lines.push(`  ${phase.name}: ${phase.days} days (${phase.percent}%)`);
        });
        if (result.warnings?.length) {
            lines.push("", "⚠️ Warnings:");
            result.warnings.forEach((w) => lines.push(`  • ${w}`));
        } else if (result.warning) {
            lines.push("", `⚠️ ${result.warning}`);
        } else {
            lines.push("", "✓ Timeline is within typical benchmark range.");
        }
        return lines.join("\n");
    }, [result]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const currentErrors = {};
        if (parsePositiveNumber(formState.projectSize) === null) {
            currentErrors.projectSize = "Project size must be greater than zero.";
        }
        if (parsePositiveNumber(formState.crewSize) === null) {
            currentErrors.crewSize = "Crew size must be at least 1.";
        }
        if (parseNonNegativeNumber(formState.permitDelayDays) === null) {
            currentErrors.permitDelayDays = "Permit delay cannot be negative.";
        }
        return currentErrors;
    };

    const handleCalculate = (event) => {
        event.preventDefault();
        setActionMessage("");
        const currentErrors = validate();
        setErrors(currentErrors);
        if (hasErrors(currentErrors)) {
            setResult(null);
            return;
        }
        setResult(calculateTimelineEstimate(formState));
    };

    const handleReset = () => {
        setFormState(buildDefaults());
        setErrors({});
        setResult(null);
        setShowQuoteForm(false);
        setActionMessage("");
    };

    const handlePdfDownload = async () => {
        const response = await exportElementToPdf({
            element: resultRef.current,
            fileName: "project-timeline-estimate.pdf",
        });
        setActionMessage(response.message);
    };

    const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink({
            toolName: "Project Timeline Estimator",
            inputs: formState,
            outputs: result,
        });
        window.open(link, "_blank", "noopener,noreferrer");
    };

    const sizeUnit = formState.projectType === "roadworks" ? "metres" : "sqm";

    return (
        <ToolCard
            title="Project Timeline Estimator"
            description="Estimate project delivery duration and phase breakdown using crew size, schedule, site complexity, Nigerian weather seasons, and permit delays."
        >
            <form className={styles.formGrid} onSubmit={handleCalculate}>
                <div className={styles.formField}>
                    <label htmlFor="timeline-projectType">Project Type</label>
                    <select id="timeline-projectType" name="projectType" value={formState.projectType} onChange={handleChange}>
                        {Object.entries(TIMELINE_CONFIG.projectDefaults).map(([key, value]) => (
                            <option key={key} value={key}>{value.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-projectSize">Project Size ({sizeUnit})</label>
                    <input id="timeline-projectSize" name="projectSize" type="number" value={formState.projectSize} onChange={handleChange} />
                    <p className={styles.helperText}>Gross floor area or road length.</p>
                    {errors.projectSize ? <p className={styles.errorText}>{errors.projectSize}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-crewSize">Crew Size (workers)</label>
                    <input id="timeline-crewSize" name="crewSize" type="number" min="1" value={formState.crewSize} onChange={handleChange} />
                    <p className={styles.helperText}>Total on-site workers including artisans and labourers.</p>
                    {errors.crewSize ? <p className={styles.errorText}>{errors.crewSize}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-workSchedule">Work Schedule</label>
                    <select id="timeline-workSchedule" name="workSchedule" value={formState.workSchedule} onChange={handleChange}>
                        {Object.entries(TIMELINE_CONFIG.workScheduleFactors).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-siteDifficulty">Site Difficulty</label>
                    <select id="timeline-siteDifficulty" name="siteDifficulty" value={formState.siteDifficulty} onChange={handleChange}>
                        {Object.entries(TIMELINE_CONFIG.siteDifficultyMultipliers).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-weatherRisk">Weather / Season</label>
                    <select id="timeline-weatherRisk" name="weatherRisk" value={formState.weatherRisk} onChange={handleChange}>
                        {Object.entries(TIMELINE_CONFIG.weatherRiskMultipliers).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                    <p className={styles.helperText}>Nigerian weather season at project start.</p>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="timeline-permitDelayDays">Permit / Approval Delay (days)</label>
                    <input id="timeline-permitDelayDays" name="permitDelayDays" type="number" min="0" value={formState.permitDelayDays} onChange={handleChange} />
                    <p className={styles.helperText}>Government approvals, development permits, EIA, etc.</p>
                    {errors.permitDelayDays ? <p className={styles.errorText}>{errors.permitDelayDays}</p> : null}
                </div>

                <div className={`${styles.actionsRow} ${styles.fullWidth}`}>
                    <button type="submit" className={styles.primaryButton}>📅 Estimate Timeline</button>
                    <button type="button" className={styles.ghostButton} onClick={handleReset}>Reset</button>
                </div>
            </form>

            {result ? (
                <div className={styles.resultsCard} ref={resultRef}>
                    <h4>Timeline Summary — {result.projectLabel}</h4>
                    <div className={styles.resultsGrid}>
                        <div className={styles.resultItemHighlight}>
                            <div>Total Calendar Duration</div>
                            <strong>{result.totalDays} days</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Working Days</div>
                            <strong>{result.workingDays} days</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Duration</div>
                            <strong>{formatNumber(result.durationWeeks)} weeks / {formatNumber(result.durationMonths)} months</strong>
                        </div>
                        {result.materialLeadTimeDays ? (
                            <div className={styles.resultItem}>
                                <div>Material Lead Time</div>
                                <strong>{result.materialLeadTimeDays} days</strong>
                            </div>
                        ) : null}
                        {result.permitDelayDays ? (
                            <div className={styles.resultItem}>
                                <div>Permit / Approval Delay</div>
                                <strong>{result.permitDelayDays} days</strong>
                            </div>
                        ) : null}
                    </div>

                    <h5 style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}>Phase Breakdown</h5>
                    <ul className={styles.timelineList}>
                        {result.phases.map((phase) => (
                            <li key={phase.name} className={styles.timelineItem}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                    <strong>{phase.name}</strong>
                                    <span>{phase.days} days ({phase.percent}%)</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <span className={styles.progressFill} style={{ width: `${phase.percent}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    {result.warnings?.length > 0 ? (
                        <div className={styles.warningBox}>
                            <strong>⚠️ Timeline Warnings</strong>
                            <ul>
                                {result.warnings.map((w, i) => (
                                    <li key={i}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    ) : result.warning ? (
                        <p className={styles.warningText}>{result.warning}</p>
                    ) : (
                        <p className={styles.helperText}>✓ Timeline is within typical benchmark range for this project type.</p>
                    )}
                </div>
            ) : null}

            {result ? (
                <>
                    <div className={styles.actionsRow}>
                        <button type="button" className={styles.secondaryButton} onClick={handlePdfDownload}>
                            📄 Download PDF
                        </button>
                        <button type="button" className={styles.secondaryButton} onClick={handleWhatsAppShare}>
                            💬 Send to WhatsApp
                        </button>
                        <button type="button" className={styles.secondaryButton} onClick={() => setShowQuoteForm((prev) => !prev)}>
                            {showQuoteForm ? "Hide quote form" : "📩 Request Official Quote"}
                        </button>
                    </div>
                    {actionMessage ? <p className={styles.helperText}>{actionMessage}</p> : null}
                    <AIExplanationPanel toolName="Project Timeline Estimator" inputs={formState} outputs={result} />
                    {showQuoteForm ? (
                        <QuoteRequestForm
                            toolName="project-timeline-estimator"
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

export default ProjectTimelineEstimator;


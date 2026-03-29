"use client";

import { useMemo, useRef, useState } from "react";
import { QUOTE_CONFIG, TOOL_TEXT } from "@/config/constructionToolsConfig";
import { buildQuoteSummaryText, calculateInstantQuote } from "@/utils/calculationHelpers";
import { formatCurrency, formatNumber } from "@/utils/currency";
import { exportElementToPdf } from "@/utils/pdfExport";
import { createQuoteRequestPayload, submitOfficialQuoteRequest } from "@/utils/quoteRequest";
import { generateWhatsAppLink } from "@/utils/whatsapp";
import { hasErrors, isValidEmail, isValidPhone, parsePositiveNumber, validateRequiredFields } from "@/utils/validation";
import AIExplanationPanel from "./AIExplanationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import ToolCard from "./ToolCard";
import styles from "./construction-tools.module.css";

const STEP_LABELS = ["Customer Info", "Service Type", "Project Details", "Estimate Summary"];

const defaultState = {
    customerName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceType: "design_build",
    projectLocation: "Lagos",
    projectSize: 240,
    urgency: "standard",
    mobilizationLevel: "within_city",
    equipmentLevel: "medium",
    laborLevel: "skilled",
    specialRequirementPercent: 5,
    specialRequirementsText: "",
};

const InstantQuoteGenerator = () => {
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({});
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const resultRef = useRef(null);

    const result = useMemo(() => calculateInstantQuote(formState), [formState]);
    const summaryText = useMemo(() => buildQuoteSummaryText(formState, result), [formState, result]);
    const payloadPreview = useMemo(
        () =>
            createQuoteRequestPayload({
                toolName: "instant-quote-generator",
                customer: {
                    fullName: formState.customerName,
                    email: formState.email,
                    phone: formState.phone,
                    company: formState.companyName,
                },
                project: {
                    serviceType: formState.serviceType,
                    projectLocation: formState.projectLocation,
                    projectSize: formState.projectSize,
                    urgency: formState.urgency,
                    mobilizationLevel: formState.mobilizationLevel,
                    equipmentLevel: formState.equipmentLevel,
                    laborLevel: formState.laborLevel,
                    specialRequirementsText: formState.specialRequirementsText,
                },
                result,
                summaryText,
            }),
        [formState, result, summaryText]
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const validateStep = (targetStep) => {
        let validationErrors = {};

        if (targetStep === 1) {
            validationErrors = validateRequiredFields({
                customerName: formState.customerName,
                email: formState.email,
                phone: formState.phone,
            });
            if (formState.email && !isValidEmail(formState.email)) {
                validationErrors.email = "Please enter a valid email.";
            }
            if (formState.phone && !isValidPhone(formState.phone)) {
                validationErrors.phone = "Please enter a valid phone number.";
            }
        }

        if (targetStep === 3) {
            validationErrors = validateRequiredFields({
                projectLocation: formState.projectLocation,
                projectSize: formState.projectSize,
            });
            if (parsePositiveNumber(formState.projectSize) === null) {
                validationErrors.projectSize = "Project size must be greater than zero.";
            }
            if (Number(formState.projectSize) < QUOTE_CONFIG.minProjectSize) {
                validationErrors.projectSize = `Minimum project size is ${QUOTE_CONFIG.minProjectSize} sqm.`;
            }
        }

        return validationErrors;
    };

    const moveNext = () => {
        const validationErrors = validateStep(step);
        setErrors(validationErrors);
        if (hasErrors(validationErrors)) return;
        setStep((prev) => Math.min(prev + 1, 4));
    };

    const moveBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleReset = () => {
        setFormState(defaultState);
        setErrors({});
        setStep(1);
        setCopied(false);
        setSubmissionMessage("");
        setShowQuoteForm(false);
    };

    const handleCopySummary = async () => {
        try {
            await navigator.clipboard.writeText(summaryText);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    const handlePdfDownload = async () => {
        setSubmissionMessage("");
        const response = await exportElementToPdf({
            element: resultRef.current,
            fileName: "instant-quote-summary.pdf",
        });
        setSubmissionMessage(response.message);
    };

    const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink({
            toolName: "Instant Quote Generator",
            inputs: formState,
            outputs: result,
        });
        window.open(link, "_blank", "noopener,noreferrer");
    };

    const handleMockSubmit = async () => {
        setLoading(true);
        setSubmissionMessage("");
        try {
            const response = await submitOfficialQuoteRequest(payloadPreview);
            setSubmissionMessage(response?.message || "Quote request sent successfully.");
        } catch {
            setSubmissionMessage("Could not submit to API at the moment. Please retry or use WhatsApp.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolCard
            title="Instant Quote Generator"
            description="Capture client details, select project options, and generate a professional preliminary quote in minutes."
        >
            <div className={styles.stepper}>
                {STEP_LABELS.map((label, index) => (
                    <span
                        key={label}
                        className={`${styles.stepBadge} ${step === index + 1 ? styles.stepBadgeActive : ""} ${step > index + 1 ? styles.stepBadgeDone : ""}`}
                    >
                        {step > index + 1 ? "✓ " : ""}Step {index + 1}: {label}
                    </span>
                ))}
            </div>

            {step === 1 ? (
                <div className={styles.formGrid}>
                    <div className={styles.formField}>
                        <label htmlFor="quote-customerName">Customer Name *</label>
                        <input id="quote-customerName" name="customerName" value={formState.customerName} onChange={handleChange} placeholder="Full name" />
                        {errors.customerName ? <p className={styles.errorText}>{errors.customerName}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-email">Email *</label>
                        <input id="quote-email" name="email" type="email" value={formState.email} onChange={handleChange} placeholder="name@company.com" />
                        {errors.email ? <p className={styles.errorText}>{errors.email}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-phone">Phone *</label>
                        <input id="quote-phone" name="phone" value={formState.phone} onChange={handleChange} placeholder="+234..." />
                        {errors.phone ? <p className={styles.errorText}>{errors.phone}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-companyName">Company (optional)</label>
                        <input id="quote-companyName" name="companyName" value={formState.companyName} onChange={handleChange} />
                    </div>
                </div>
            ) : null}

            {step === 2 ? (
                <div className={styles.formGrid}>
                    <div className={styles.formField}>
                        <label htmlFor="quote-serviceType">Service Type</label>
                        <select id="quote-serviceType" name="serviceType" value={formState.serviceType} onChange={handleChange}>
                            {Object.entries(QUOTE_CONFIG.serviceTypes).map(([key, item]) => (
                                <option key={key} value={key}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-urgency">Project Urgency</label>
                        <select id="quote-urgency" name="urgency" value={formState.urgency} onChange={handleChange}>
                            {Object.entries(QUOTE_CONFIG.urgencyMultipliers).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-mobilizationLevel">Mobilization / Site Location</label>
                        <select id="quote-mobilizationLevel" name="mobilizationLevel" value={formState.mobilizationLevel} onChange={handleChange}>
                            {Object.entries(QUOTE_CONFIG.mobilizationRates).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ) : null}

            {step === 3 ? (
                <div className={styles.formGrid}>
                    <div className={styles.formField}>
                        <label htmlFor="quote-projectLocation">Project Location</label>
                        <input id="quote-projectLocation" name="projectLocation" value={formState.projectLocation} onChange={handleChange} placeholder="e.g. Lekki, Lagos" />
                        {errors.projectLocation ? <p className={styles.errorText}>{errors.projectLocation}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-projectSize">Project Size (sqm)</label>
                        <input id="quote-projectSize" name="projectSize" type="number" value={formState.projectSize} onChange={handleChange} />
                        <p className={styles.helperText}>Minimum {QUOTE_CONFIG.minProjectSize} sqm.</p>
                        {errors.projectSize ? <p className={styles.errorText}>{errors.projectSize}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-equipmentLevel">Equipment Requirement</label>
                        <select id="quote-equipmentLevel" name="equipmentLevel" value={formState.equipmentLevel} onChange={handleChange}>
                            {Object.entries(QUOTE_CONFIG.equipmentMultiplierByLevel).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-laborLevel">Labour Category</label>
                        <select id="quote-laborLevel" name="laborLevel" value={formState.laborLevel} onChange={handleChange}>
                            {Object.entries(QUOTE_CONFIG.laborMultiplierByLevel).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quote-specialRequirementPercent">Special Requirement (%)</label>
                        <input id="quote-specialRequirementPercent" name="specialRequirementPercent" type="number" min="0" max="30" value={formState.specialRequirementPercent} onChange={handleChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.fullWidth}`}>
                        <label htmlFor="quote-specialRequirementsText">Special Requirements Notes</label>
                        <textarea id="quote-specialRequirementsText" name="specialRequirementsText" rows={3} value={formState.specialRequirementsText} onChange={handleChange} placeholder="Any special project requirements or conditions..." />
                    </div>
                </div>
            ) : null}

            {step === 4 ? (
                <div className={styles.resultsCard} ref={resultRef}>
                    <h4>Preliminary Quote Summary</h4>
                    <div className={styles.resultsGrid}>
                        <div className={styles.resultItem}>
                            <div>Service</div>
                            <strong>{result.serviceLabel}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Project Size</div>
                            <strong>{formatNumber(result.projectSize)} sqm</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Base Cost</div>
                            <strong>{formatCurrency(result.baseCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Equipment</div>
                            <strong>{formatCurrency(result.equipmentCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Labour</div>
                            <strong>{formatCurrency(result.laborCost)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Contingency (10%)</div>
                            <strong>{formatCurrency(result.contingency)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Mobilization</div>
                            <strong>{formatCurrency(result.mobilization)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Urgency</div>
                            <strong>{result.urgencyLabel} ({result.urgencyFactor}×)</strong>
                        </div>
                        <div className={styles.resultItemHighlight}>
                            <div>Estimated Total</div>
                            <strong>{formatCurrency(result.estimatedTotal)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <div>Estimated Range</div>
                            <strong>{formatCurrency(result.estimateRangeLow)} – {formatCurrency(result.estimateRangeHigh)}</strong>
                        </div>
                        <div className={`${styles.resultItem} ${styles.fullWidth}`}>
                            <div>Recommended Advance ({result.advancePercent}%)</div>
                            <strong>{formatCurrency(result.recommendedAdvance)}</strong>
                        </div>
                    </div>
                    <div className={`${styles.formField} ${styles.fullWidth}`} style={{ marginTop: "1rem" }}>
                        <label htmlFor="quote-summaryText">Generated Summary Text</label>
                        <textarea id="quote-summaryText" rows={12} readOnly value={summaryText} style={{ fontFamily: "monospace", fontSize: "0.82rem" }} />
                    </div>
                    <div className={styles.actionsRow}>
                        <button className={styles.secondaryButton} type="button" onClick={handleCopySummary}>
                            {copied ? "✓ Copied!" : "📋 Copy Summary"}
                        </button>
                    </div>
                    <details style={{ marginTop: "0.75rem" }}>
                        <summary className={styles.helperText}>View JSON payload for backend integration</summary>
                        <pre className={styles.jsonBox}>{JSON.stringify(payloadPreview, null, 2)}</pre>
                    </details>
                </div>
            ) : null}

            <div className={styles.actionsRow}>
                {step > 1 ? (
                    <button type="button" className={styles.ghostButton} onClick={moveBack}>
                        ← Back
                    </button>
                ) : null}
                {step < 4 ? (
                    <button type="button" className={styles.primaryButton} onClick={moveNext}>
                        Next Step →
                    </button>
                ) : null}
                <button type="button" className={styles.ghostButton} onClick={handleReset}>
                    Reset
                </button>
            </div>

            {step === 4 ? (
                <>
                    <div className={styles.actionsRow}>
                        <button className={styles.secondaryButton} type="button" onClick={handlePdfDownload}>
                            📄 Download PDF
                        </button>
                        <button className={styles.secondaryButton} type="button" onClick={handleWhatsAppShare}>
                            💬 Send to WhatsApp
                        </button>
                        <button className={styles.secondaryButton} type="button" onClick={handleMockSubmit} disabled={loading}>
                            {loading ? "Submitting..." : "📩 Request Official Quote"}
                        </button>
                        <button
                            className={styles.secondaryButton}
                            type="button"
                            onClick={() => setShowQuoteForm((prev) => !prev)}
                        >
                            {showQuoteForm ? "Hide detailed form" : "Open detailed quote form"}
                        </button>
                    </div>
                    {submissionMessage ? <p className={styles.helperText}>{submissionMessage}</p> : null}
                    <AIExplanationPanel toolName="Instant Quote Generator" inputs={formState} outputs={result} />
                    {showQuoteForm ? (
                        <QuoteRequestForm
                            toolName="instant-quote-generator"
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

export default InstantQuoteGenerator;


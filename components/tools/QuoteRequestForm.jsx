"use client";

import { useMemo, useState } from "react";
import { createQuoteRequestPayload, submitOfficialQuoteRequest } from "@/utils/quoteRequest";
import { hasErrors, isValidEmail, isValidPhone, validateRequiredFields } from "@/utils/validation";
import styles from "./construction-tools.module.css";

const QuoteRequestForm = ({ toolName, projectData, resultData, summaryText }) => {
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        additionalNotes: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [submitError, setSubmitError] = useState("");

    const payloadPreview = useMemo(
        () =>
            createQuoteRequestPayload({
                toolName,
                customer: {
                    fullName: formState.fullName,
                    email: formState.email,
                    phone: formState.phone,
                    company: formState.company,
                },
                project: projectData,
                result: resultData,
                summaryText,
                meta: {
                    channel: "website_tools",
                },
            }),
        [formState, projectData, resultData, summaryText, toolName]
    );

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage("");
        setSubmitError("");

        const requiredErrors = validateRequiredFields({
            fullName: formState.fullName,
            email: formState.email,
            phone: formState.phone,
        });

        if (formState.email && !isValidEmail(formState.email)) {
            requiredErrors.email = "Please enter a valid email address.";
        }

        if (formState.phone && !isValidPhone(formState.phone)) {
            requiredErrors.phone = "Please enter a valid phone number with country code if possible.";
        }

        setErrors(requiredErrors);
        if (hasErrors(requiredErrors)) {
            return;
        }

        setLoading(true);
        try {
            const response = await submitOfficialQuoteRequest(payloadPreview);
            setSuccessMessage(response?.message || "Quote request submitted successfully.");
        } catch (error) {
            setSubmitError(
                "We could not submit your request right now. Please try again shortly or contact us directly on WhatsApp."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.resultsCard} onSubmit={handleSubmit}>
            <h4>Request Official Quote</h4>
            <p className={styles.mutedText}>Submit your details and this estimate will be sent for commercial review.</p>
            <div className={styles.formGrid}>
                <div className={styles.formField}>
                    <label htmlFor={`${toolName}-fullName`}>Full Name</label>
                    <input
                        id={`${toolName}-fullName`}
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleFieldChange}
                    />
                    {errors.fullName ? <p className={styles.errorText}>{errors.fullName}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor={`${toolName}-email`}>Email</label>
                    <input id={`${toolName}-email`} name="email" value={formState.email} onChange={handleFieldChange} />
                    {errors.email ? <p className={styles.errorText}>{errors.email}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor={`${toolName}-phone`}>Phone</label>
                    <input id={`${toolName}-phone`} name="phone" value={formState.phone} onChange={handleFieldChange} />
                    {errors.phone ? <p className={styles.errorText}>{errors.phone}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor={`${toolName}-company`}>Company (optional)</label>
                    <input
                        id={`${toolName}-company`}
                        name="company"
                        value={formState.company}
                        onChange={handleFieldChange}
                    />
                </div>
                <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label htmlFor={`${toolName}-additionalNotes`}>Additional Notes</label>
                    <textarea
                        id={`${toolName}-additionalNotes`}
                        name="additionalNotes"
                        value={formState.additionalNotes}
                        onChange={handleFieldChange}
                        rows={3}
                    />
                </div>
            </div>
            <div className={styles.actionsRow}>
                <button className={styles.primaryButton} type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Official Quote Request"}
                </button>
            </div>
            {successMessage ? <p className={styles.aiText}>{successMessage}</p> : null}
            {submitError ? <p className={styles.errorText}>{submitError}</p> : null}
            <details>
                <summary className={styles.helperText}>Payload preview for backend integration</summary>
                <pre className={styles.jsonBox}>{JSON.stringify(payloadPreview, null, 2)}</pre>
            </details>
        </form>
    );
};

export default QuoteRequestForm;


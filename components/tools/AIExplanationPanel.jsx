"use client";

import { useState } from "react";
import { generateAIExplanation } from "@/utils/aiExplanation";
import { AI_CONFIG } from "@/config/constructionToolsConfig";
import styles from "./construction-tools.module.css";

const AIExplanationPanel = ({ toolName, inputs, outputs }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const providerLabel = `${AI_CONFIG.OLLAMA_MODEL} via ${AI_CONFIG.OLLAMA_BASE_URL.replace(/^https?:\/\//, "")}`;

    if (!AI_CONFIG.ENABLE_AI) return null;

    const handleExplain = async () => {
        setLoading(true);
        setError("");
        setResult("");
        const response = await generateAIExplanation({ toolName, inputs, outputs });
        setLoading(false);

        if (!response.success) {
            setError(response.text);
            return;
        }

        setResult(response.text);
    };

    return (
        <div className={styles.aiPanel}>
            <div className={styles.aiPanelHeader}>
                <span className={styles.aiIcon}>✨</span>
                <div>
                    <strong className={styles.aiTitle}>AI Estimate Explanation</strong>
                    <p className={styles.aiSubtitle}>
                        Get a BOQ-style material/labour breakdown plus a plain-English summary
                    </p>
                    <p className={styles.aiMeta}>{providerLabel}</p>
                </div>
            </div>
            {!result && !error && !loading ? (
                <button type="button" className={styles.aiButton} onClick={handleExplain}>
                    <span className={styles.aiButtonIcon}>🤖</span>
                    Generate BOQ-style Breakdown with AI
                </button>
            ) : null}
            {loading ? (
                <div className={styles.aiLoading}>
                    <div className={styles.aiSpinner} />
                    <span>AI is analyzing your estimate...</span>
                </div>
            ) : null}
            {result ? (
                <div className={styles.aiResult}>
                    <p className={styles.aiText}>{result}</p>
                    <button type="button" className={styles.ghostButton} onClick={handleExplain} style={{ marginTop: "0.5rem" }}>
                        🔄 Regenerate Explanation
                    </button>
                </div>
            ) : null}
            {error ? (
                <div className={styles.aiError}>
                    <p className={styles.errorText}>{error}</p>
                    <button type="button" className={styles.ghostButton} onClick={handleExplain} style={{ marginTop: "0.5rem" }}>
                        🔄 Try Again
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default AIExplanationPanel;


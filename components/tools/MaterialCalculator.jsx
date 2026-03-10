"use client";

import { useMemo, useRef, useState } from "react";
import { MATERIAL_FORMULA_CONFIG, TOOL_TEXT } from "@/config/constructionToolsConfig";
import { calculateMaterialEstimate } from "@/utils/calculationHelpers";
import { exportElementToPdf } from "@/utils/pdfExport";
import { generateWhatsAppLink } from "@/utils/whatsapp";
import { hasErrors, parsePositiveNumber } from "@/utils/validation";
import AIExplanationPanel from "./AIExplanationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import ToolCard from "./ToolCard";
import styles from "./construction-tools.module.css";

const cloneMaterialDefaults = () =>
    Object.entries(MATERIAL_FORMULA_CONFIG).reduce((acc, [key, value]) => {
        acc[key] = { ...value.defaults };
        return acc;
    }, {});

const MaterialCalculator = () => {
    const [selectedType, setSelectedType] = useState("concrete");
    const [formState, setFormState] = useState(cloneMaterialDefaults);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [actionMessage, setActionMessage] = useState("");
    const resultRef = useRef(null);

    const activeValues = formState[selectedType];
    const summaryText = useMemo(() => {
        if (!result) return "";
        return [
            `MATERIAL ESTIMATE — ${result.title}`,
            `========================`,
            ...result.quantities.map((item) => `${item.label}: ${item.value} ${item.unit}`),
            ``,
            `Summary: ${result.summary}`,
            result.notes ? `Note: ${result.notes}` : "",
        ].filter(Boolean).join("\n");
    }, [result]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({
            ...prev,
            [selectedType]: { ...prev[selectedType], [name]: value },
        }));
    };

    const validateCurrentForm = () => {
        const currentErrors = {};
        const skipKeys = ["unit", "grade", "mix", "blockType", "areaUnit", "structureType", "coats"];
        Object.entries(activeValues).forEach(([key, value]) => {
            if (skipKeys.includes(key)) return;
            if (key === "openingArea") return; // opening area can be zero
            if (parsePositiveNumber(value) === null) {
                currentErrors[key] = "Enter a value greater than zero.";
            }
        });
        return currentErrors;
    };

    const handleCalculate = (event) => {
        event.preventDefault();
        setActionMessage("");
        const validationErrors = validateCurrentForm();
        setErrors(validationErrors);
        if (hasErrors(validationErrors)) {
            setResult(null);
            return;
        }
        setResult(calculateMaterialEstimate(selectedType, activeValues));
    };

    const handleReset = () => {
        setFormState(cloneMaterialDefaults());
        setResult(null);
        setErrors({});
        setShowQuoteForm(false);
        setActionMessage("");
    };

    const handlePdfDownload = async () => {
        const response = await exportElementToPdf({
            element: resultRef.current,
            fileName: `material-${selectedType}-estimate.pdf`,
        });
        setActionMessage(response.message);
    };

    const handleWhatsAppShare = () => {
        const link = generateWhatsAppLink({
            toolName: "Material Calculator",
            inputs: { materialType: selectedType, ...activeValues },
            outputs: result,
        });
        window.open(link, "_blank", "noopener,noreferrer");
    };

    const renderDynamicFields = () => {
        if (selectedType === "concrete") {
            return (
                <>
                    <div className={styles.formField}>
                        <label htmlFor="material-length">Length</label>
                        <input id="material-length" name="length" type="number" step="0.01" value={activeValues.length} onChange={handleChange} />
                        {errors.length ? <p className={styles.errorText}>{errors.length}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-width">Width</label>
                        <input id="material-width" name="width" type="number" step="0.01" value={activeValues.width} onChange={handleChange} />
                        {errors.width ? <p className={styles.errorText}>{errors.width}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-thickness">Thickness / Depth</label>
                        <input id="material-thickness" name="thickness" type="number" step="0.01" value={activeValues.thickness} onChange={handleChange} />
                        <p className={styles.helperText}>Slab: 0.15m, Beam: 0.3-0.6m, Column: varies</p>
                        {errors.thickness ? <p className={styles.errorText}>{errors.thickness}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-unit">Measurement Unit</label>
                        <select id="material-unit" name="unit" value={activeValues.unit} onChange={handleChange}>
                            <option value="m">Metres</option>
                            <option value="ft">Feet</option>
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-grade">Concrete Grade</label>
                        <select id="material-grade" name="grade" value={activeValues.grade} onChange={handleChange}>
                            {Object.entries(MATERIAL_FORMULA_CONFIG.concrete.grades).map(([key, val]) => (
                                <option key={key} value={key}>{val.label || key}</option>
                            ))}
                        </select>
                    </div>
                </>
            );
        }

        if (selectedType === "blocks") {
            return (
                <>
                    <div className={styles.formField}>
                        <label htmlFor="material-wallLength">Total Wall Length (m)</label>
                        <input id="material-wallLength" name="wallLength" type="number" step="0.1" value={activeValues.wallLength} onChange={handleChange} />
                        <p className={styles.helperText}>Sum of all wall lengths (perimeter + internal walls).</p>
                        {errors.wallLength ? <p className={styles.errorText}>{errors.wallLength}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-wallHeight">Wall Height (m)</label>
                        <input id="material-wallHeight" name="wallHeight" type="number" step="0.1" value={activeValues.wallHeight} onChange={handleChange} />
                        {errors.wallHeight ? <p className={styles.errorText}>{errors.wallHeight}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-openingArea">Total Opening Area (m²)</label>
                        <input id="material-openingArea" name="openingArea" type="number" step="0.1" value={activeValues.openingArea} onChange={handleChange} />
                        <p className={styles.helperText}>Total area of doors + windows to deduct.</p>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-blockType">Block Size</label>
                        <select id="material-blockType" name="blockType" value={activeValues.blockType} onChange={handleChange}>
                            {Object.entries(MATERIAL_FORMULA_CONFIG.blocks.blockTypes).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                </>
            );
        }

        if (selectedType === "plaster") {
            return (
                <>
                    <div className={styles.formField}>
                        <label htmlFor="material-area">Surface Area (m²)</label>
                        <input id="material-area" name="area" type="number" value={activeValues.area} onChange={handleChange} />
                        {errors.area ? <p className={styles.errorText}>{errors.area}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-thicknessMm">Plaster Thickness (mm)</label>
                        <input id="material-thicknessMm" name="thicknessMm" type="number" value={activeValues.thicknessMm} onChange={handleChange} />
                        <p className={styles.helperText}>Standard: 12mm internal, 15-18mm external.</p>
                        {errors.thicknessMm ? <p className={styles.errorText}>{errors.thicknessMm}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-mix">Mix Ratio</label>
                        <select id="material-mix" name="mix" value={activeValues.mix} onChange={handleChange}>
                            {Object.entries(MATERIAL_FORMULA_CONFIG.plaster.mixRatios).map(([key, val]) => (
                                <option key={key} value={key}>{val.label || key}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-coats">Number of Coats</label>
                        <select id="material-coats" name="coats" value={activeValues.coats || "2"} onChange={handleChange}>
                            <option value="1">1 coat (touch-up / skim)</option>
                            <option value="2">2 coats (standard)</option>
                            <option value="3">3 coats (heavy render)</option>
                        </select>
                    </div>
                </>
            );
        }

        if (selectedType === "flooring") {
            return (
                <>
                    <div className={styles.formField}>
                        <label htmlFor="material-floorArea">Floor Area</label>
                        <input id="material-floorArea" name="area" type="number" value={activeValues.area} onChange={handleChange} />
                        {errors.area ? <p className={styles.errorText}>{errors.area}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-areaUnit">Area Unit</label>
                        <select id="material-areaUnit" name="areaUnit" value={activeValues.areaUnit} onChange={handleChange}>
                            <option value="sqm">Square metres (m²)</option>
                            <option value="sqft">Square feet (ft²)</option>
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-tileLengthMm">Tile Length (mm)</label>
                        <input id="material-tileLengthMm" name="tileLengthMm" type="number" value={activeValues.tileLengthMm} onChange={handleChange} />
                        {errors.tileLengthMm ? <p className={styles.errorText}>{errors.tileLengthMm}</p> : null}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="material-tileWidthMm">Tile Width (mm)</label>
                        <input id="material-tileWidthMm" name="tileWidthMm" type="number" value={activeValues.tileWidthMm} onChange={handleChange} />
                        <p className={styles.helperText}>Common sizes: 300×300, 400×400, 600×600, 800×800mm</p>
                        {errors.tileWidthMm ? <p className={styles.errorText}>{errors.tileWidthMm}</p> : null}
                    </div>
                </>
            );
        }

        // Steel
        return (
            <>
                <div className={styles.formField}>
                    <label htmlFor="material-concreteVolume">Total Concrete Volume (m³)</label>
                    <input id="material-concreteVolume" name="concreteVolume" type="number" value={activeValues.concreteVolume} onChange={handleChange} />
                    <p className={styles.helperText}>Sum of all concrete elements: slabs, beams, columns, foundations.</p>
                    {errors.concreteVolume ? <p className={styles.errorText}>{errors.concreteVolume}</p> : null}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="material-structureType">Predominant Structure Type</label>
                    <select id="material-structureType" name="structureType" value={activeValues.structureType} onChange={handleChange}>
                        {Object.entries(MATERIAL_FORMULA_CONFIG.steel.kgPerM3ByStructure).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                        ))}
                    </select>
                </div>
            </>
        );
    };

    return (
        <ToolCard
            title="Material Calculator"
            description="Calculate procurement quantities for concrete, blocks, plaster, flooring, and steel using Nigerian QS standard formulas."
        >
            <div className={styles.tabsRow}>
                {Object.entries(MATERIAL_FORMULA_CONFIG).map(([key, item]) => (
                    <button
                        key={key}
                        type="button"
                        className={`${styles.tabButton} ${selectedType === key ? styles.tabButtonActive : ""}`}
                        onClick={() => {
                            setSelectedType(key);
                            setErrors({});
                            setResult(null);
                            setShowQuoteForm(false);
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <form className={styles.formGrid} onSubmit={handleCalculate}>
                {renderDynamicFields()}
                <div className={`${styles.actionsRow} ${styles.fullWidth}`}>
                    <button type="submit" className={styles.primaryButton}>
                        🧱 Calculate Materials
                    </button>
                    <button type="button" className={styles.ghostButton} onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>

            {result ? (
                <div className={styles.resultsCard} ref={resultRef}>
                    <h4>{result.title} — Results</h4>
                    <p className={styles.mutedText}>{result.summary}</p>
                    <div className={styles.resultsGrid}>
                        {result.quantities.map((item, i) => (
                            <div key={`${item.label}-${i}`} className={styles.resultItem}>
                                <div>{item.label}</div>
                                <strong>{item.value} {item.unit}</strong>
                            </div>
                        ))}
                    </div>
                    {result.notes ? <p className={styles.notesText}>📌 {result.notes}</p> : null}
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
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => setShowQuoteForm((prev) => !prev)}
                        >
                            {showQuoteForm ? "Hide quote form" : "📩 Request Official Quote"}
                        </button>
                    </div>
                    {actionMessage ? <p className={styles.helperText}>{actionMessage}</p> : null}
                    <AIExplanationPanel
                        toolName="Material Calculator"
                        inputs={{ materialType: selectedType, ...activeValues }}
                        outputs={result}
                    />
                    {showQuoteForm ? (
                        <QuoteRequestForm
                            toolName="material-calculator"
                            projectData={{ materialType: selectedType, ...activeValues }}
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

export default MaterialCalculator;


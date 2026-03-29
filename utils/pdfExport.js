export const exportElementToPdf = async ({ element, fileName = "construction-estimate.pdf" }) => {
    if (typeof window === "undefined") {
        return { success: false, message: "PDF export is only available in the browser." };
    }

    if (!element) {
        return { success: false, message: "Nothing to export yet. Calculate an estimate first." };
    }

    try {
        const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = 210;
        const pageHeight = 297;
        const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
        const width = canvas.width * ratio;
        const height = canvas.height * ratio;
        const x = (pageWidth - width) / 2;

        pdf.addImage(imageData, "PNG", x, 10, width, height, undefined, "FAST");
        pdf.save(fileName);
        return { success: true, message: "PDF downloaded successfully." };
    } catch (error) {
        return {
            success: false,
            message:
                "Unable to generate PDF right now. Please try again, or use your browser print-to-PDF as backup.",
            error,
        };
    }
};


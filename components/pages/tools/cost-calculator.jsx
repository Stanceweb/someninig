"use client";

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import ProjectCostCalculator from "@/components/tools/ProjectCostCalculator";
import styles from "@/components/tools/construction-tools.module.css";

const CostCalculatorPage = () => {
    return (
        <>
            <SEO pageTitle="Project Cost Calculator" />
            <HeaderTwo />
            <BreadCrumb title="Project Cost Calculator" innerTitle="Project Cost Calculator" />
            <div className="container">
                <div className={styles.toolsWrapper}>
                    <ProjectCostCalculator />
                </div>
            </div>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default CostCalculatorPage;

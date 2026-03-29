"use client";

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import MaterialCalculator from "@/components/tools/MaterialCalculator";
import styles from "@/components/tools/construction-tools.module.css";

const MaterialCalculatorPage = () => {
    return (
        <>
            <SEO pageTitle="Material Calculator" />
            <HeaderTwo />
            <BreadCrumb title="Material Calculator" innerTitle="Material Calculator" />
            <div className="container">
                <div className={styles.toolsWrapper}>
                    <MaterialCalculator />
                </div>
            </div>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default MaterialCalculatorPage;

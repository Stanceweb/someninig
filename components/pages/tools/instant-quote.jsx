"use client";

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import InstantQuoteGenerator from "@/components/tools/InstantQuoteGenerator";
import styles from "@/components/tools/construction-tools.module.css";

const InstantQuotePage = () => {
    return (
        <>
            <SEO pageTitle="Instant Quote Generator" />
            <HeaderTwo />
            <BreadCrumb title="Instant Quote Generator" innerTitle="Instant Quote Generator" />
            <div className="container">
                <div className={styles.toolsWrapper}>
                    <InstantQuoteGenerator />
                </div>
            </div>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default InstantQuotePage;

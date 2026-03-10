"use client";

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import ProjectTimelineEstimator from "@/components/tools/ProjectTimelineEstimator";
import styles from "@/components/tools/construction-tools.module.css";

const TimelineEstimatorPage = () => {
    return (
        <>
            <SEO pageTitle="Project Timeline Estimator" />
            <HeaderTwo />
            <BreadCrumb title="Project Timeline Estimator" innerTitle="Project Timeline Estimator" />
            <div className="container">
                <div className={styles.toolsWrapper}>
                    <ProjectTimelineEstimator />
                </div>
            </div>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default TimelineEstimatorPage;

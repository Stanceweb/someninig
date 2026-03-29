"use client";

import SEO from "@/components/data/seo";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import ConstructionToolsHub from "@/components/tools/ConstructionToolsHub";

const ToolsPageContent = ({ title = "Construction Tools" }) => {
    return (
        <>
            <SEO pageTitle={title} />
            <HeaderTwo />
            <BreadCrumb title={title} innerTitle={title} />
            <div className="container">
                <ConstructionToolsHub />
            </div>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default ToolsPageContent;


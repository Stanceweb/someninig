"use client"
import SEO from "@/components/data/seo";
import BreadCrumb from "../../common/breadcrumb";
import CertificationsMain from "./certification";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import HeaderTwo from "@/components/layout/headers/header-two";
import SwitchTab from "../../common/dark-light";
import CustomCursor from "../../common/cursor";
import FooterTwo from "@/components/layout/footers/footer-two";

const Certifications = () => {
    return (
        <>
            <SEO pageTitle="Certifications" />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title="Certifications" innerTitle="Certifications" />
            <CertificationsMain />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default Certifications;
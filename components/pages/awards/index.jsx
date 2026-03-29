"use client";
import SEO from "@/components/data/seo";
import CustomCursor from "../common/cursor";
import SwitchTab from "../common/dark-light";
import HeaderTwo from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import FooterTwo from "@/components/layout/footers/footer-two";
import ScrollToTop from "../common/scroll/scroll-to-top";
import AwardsShowcase from "./showcase";
import "../../../public/assets/css/awards-page.css";

const Awards = () => {
    return (
        <>
            <SEO pageTitle="Awards & Recognitions" />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title="Awards & Recognitions" innerTitle="Awards & Recognitions" />
            <AwardsShowcase />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default Awards;

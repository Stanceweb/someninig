"use client"
import SEO from "@/components/data/seo";
import BreadCrumb from "../common/breadcrumb";
import PricingPlansMain from "./pricing-plans";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import CustomCursor from "../common/cursor";
import SwitchTab from "../common/dark-light";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";

const PricingPages = () => {
    return (
        <>
            <SEO pageTitle='Pricing Plan' />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title='Pricing Plan' innerTitle='Pricing Plan' />
            <PricingPlansMain />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default PricingPages;
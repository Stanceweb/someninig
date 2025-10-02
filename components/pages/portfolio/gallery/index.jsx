"use client"
import SEO from "../../../data/seo";
import BreadCrumb from "../../common/breadcrumb";
import HeaderTwo from "../../../layout/headers/header-two";
import PortfolioFilter from "./portfolio-filter";
import FooterOne from "../../../layout/footers/footer-one";
import CustomCursor from "../../common/cursor";
import SwitchTab from "../../common/dark-light";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import FooterTwo from "@/components/layout/footers/footer-two";

const PortfolioFilterPage = () => {
    return (
        <>
            <SEO pageTitle="Filterable Gallery" />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title="Filterable Gallery" innerTitle="Filterable Gallery" />
            <PortfolioFilter />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default PortfolioFilterPage;
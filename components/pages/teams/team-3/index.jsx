"use client"
import SEO from "../../../data/seo";
import HeaderTwo from "../../../layout/headers/header-two";
import BreadCrumb from "../../common/breadcrumb";
import TeamMain from "./team";
import FooterOne from "../../../layout/footers/footer-one";
import SwitchTab from "../../common/dark-light";
import CustomCursor from "../../common/cursor";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import FooterTwo from "@/components/layout/footers/footer-two";

const TeamPageThree = () => {
    return (
        <>
            <SEO pageTitle="Team Three" />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title="Team Three" innerTitle="Team Three" />
            <TeamMain />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default TeamPageThree;
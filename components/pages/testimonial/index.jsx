"use client"
import SEO from "@/components/data/seo";
import BreadCrumb from "../common/breadcrumb";
import TestimonialMain from "./testimonial";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import HeaderTwo from "@/components/layout/headers/header-two";
import SwitchTab from "../common/dark-light";
import CustomCursor from "../common/cursor";
import FooterTwo from "@/components/layout/footers/footer-two";

const Testimonial = () => {
    return (
        <>
            <SEO pageTitle='Testimonials' />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title='Testimonials' innerTitle='Testimonials' />
            <TestimonialMain />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default Testimonial;
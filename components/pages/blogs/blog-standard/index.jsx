"use client"
import React, { Suspense } from "react";
import SEO from "@/components/data/seo";
import BreadCrumb from "../../common/breadcrumb";
import BlogStandardMain from "./blog-standard";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import SwitchTab from "../../common/dark-light";
import CustomCursor from "../../common/cursor";
import HeaderTwo from "@/components/layout/headers/header-two";
import FooterTwo from "@/components/layout/footers/footer-two";

const BlogStandardPage = () => {
    return (
        <>
            <SEO pageTitle='Blog Standard' />
            <SwitchTab />
            <CustomCursor />
            <HeaderTwo />
            <BreadCrumb title="Blog Standard" innerTitle="Blog Standard" />
            <Suspense fallback={
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '400px',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    Loading blog posts...
                </div>
            }>
                <BlogStandardMain />
            </Suspense>
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default BlogStandardPage;
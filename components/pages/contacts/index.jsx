"use client";
import SEO from "@/components/data/seo";
import FooterOne from "../../layout/footers/footer-one";
import HeaderTwo from "../../layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import CustomCursor from "../common/cursor";
import SwitchTab from "../common/dark-light";
import ContactMain from "./contact";
import FooterTwo from "@/components/layout/footers/footer-two";

const ContactUs = () => {
    return (
        <>
            <SEO pageTitle="Contact Us" />
            <HeaderTwo />
            <CustomCursor />
            <SwitchTab />
            <BreadCrumb title="Contact Us" innerTitle="Contact Us" />
            <ContactMain />
            <div className="map section-padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 wow fadeInUp" data-wow-delay=".4s">
                            <div className="map-area">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0313763716044!2d5.777449774158852!3d5.56236779441809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041ada4ffffffff%3A0xc4226621b76d08af!2sSomeni%20Nigeria%20Limited!5e0!3m2!1sen!2sng!4v1759348573516!5m2!1sen!2sng"
                                    width="600"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <FooterTwo/>
        </>
    );
};

export default ContactUs;
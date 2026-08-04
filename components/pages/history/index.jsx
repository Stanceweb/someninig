"use client";
import SEO from "@/components/data/seo";
import CustomCursor from "../common/cursor";
import SwitchTab from "../common/dark-light";
import HeaderTwo from "@/components/layout/headers/header-two";
import BreadCrumb from "../common/breadcrumb";
import CompanyHistory from "./history";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FooterTwo from "@/components/layout/footers/footer-two";

const History = () => {
    return (
        <>
            <SEO pageTitle="Company History" />
            <CustomCursor />
            <SwitchTab />
            <HeaderTwo />
            <BreadCrumb title="Company History" innerTitle="Company History" />
            <section className="history__intro section-padding pb-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="title mb-35">
                                <span className="subtitle">Our History</span>
                                <h2>Building Nigeria&apos;s Engineering Future Since 1993</h2>
                            </div>
                            <div className="history__intro-content">
                                <p className="mb-25">Someni Nigeria Limited was established in 1993 with a clear vision: to provide world-class engineering, construction, and specialist services to Nigeria&apos;s oil and gas industry and other key sectors of the economy. Founded on the principles of technical excellence, integrity, innovation, and safety, the company has consistently delivered solutions that combine engineering expertise with international best practices. From project conception and feasibility studies to engineering design, construction, commissioning, maintenance, and project support services, Someni has built a reputation as a dependable partner capable of executing complex projects with precision and professionalism.</p>
                                <p className="mb-25">Today, Someni Nigeria Limited is recognized as a trusted indigenous engineering and construction company serving clients across the oil and gas, energy, industrial, and infrastructure sectors. Headquartered in Effurun, Delta State, with operational presence in Lagos and Port Harcourt, the company continues to expand its footprint across Nigeria. Through strategic partnerships, a highly skilled workforce, modern engineering technologies, and an unwavering commitment to Health, Safety, Security, Environment, and Quality (HSSEQ), Someni delivers innovative, cost-effective, and sustainable solutions that consistently exceed client expectations. Over the years, the company has also contributed to community development through capacity-building initiatives and local content development, reinforcing its position as a responsible corporate partner.</p>
                                <p className="mb-0">Looking ahead, Someni Nigeria Limited is committed to becoming one of Africa&apos;s leading engineering, construction, and integrated project solutions companies. The company is focused on expanding its capabilities, embracing emerging technologies, strengthening strategic partnerships, and delivering sustainable infrastructure that drives economic growth. With a steadfast commitment to excellence, innovation, and client satisfaction, Someni is well-positioned to shape the future of Nigeria&apos;s energy and infrastructure landscape while creating lasting value for its clients, employees, host communities, and stakeholders.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CompanyHistory />
            <FooterTwo />
            <ScrollToTop />
        </>
    );
};

export default History;

"use client";

import SEO from '@/components/data/seo';
import HeaderTwo from '@/components/layout/headers/header-two';
import FooterTwo from '@/components/layout/footers/footer-two';
import BreadCrumb from '../common/breadcrumb';
import CustomCursor from '../common/cursor';
import SwitchTab from '../common/dark-light';
import ScrollToTop from '../common/scroll/scroll-to-top';
import ProjectsTable from './projects-table';
import '../../../public/assets/css/projects-page.css';

const ProjectsPage = () => (
    <>
        <SEO pageTitle="Completed Projects" />
        <CustomCursor />
        <SwitchTab />
        <HeaderTwo />
        <BreadCrumb title="Completed Projects" innerTitle="Completed Projects" />
        <ProjectsTable />
        <FooterTwo />
        <ScrollToTop />
    </>
);

export default ProjectsPage;

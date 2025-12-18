"use client"
import Link from "next/link";
import React, { useState } from 'react';

const ResponsiveMenu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeIcon = (value) => (activeMenu == value ? "mean-clicked" : ""),
    activeSubMenu = (value) =>
    value == activeMenu ? { display: "block" } : { display: "none" };

    const [activeMenus, setActiveMenus] = useState(null);
    const actives = (value) => setActiveMenus(value === activeMenus ? null : value),
    activeIcons = (value) => (activeMenus == value ? "mean-clicked" : ""),
    activeSubMenus = (value) =>
    value == activeMenus ? { display: "block" } : { display: "none" };
  return (
    <>    
    <ul>
        <li><Link href='/' title="Home page">Home</Link></li>
        <li className='menu-item-has-children'>
            <Link href='/about-us' title="Pages overview">Pages</Link>
            <ul className='sub-menu' style={activeSubMenu("pages")}> 
                <li><Link href='/about-us' title="About Us">About Us</Link></li>
                <li><Link href='/history' title="Company History">Company History</Link></li>
                <li><Link href='/services' title="Our Services">Services</Link></li>
                <li><Link href='/testimonial' title="Testimonials">Testimonials</Link></li>
                <li><Link href='/faq' title="Frequently Asked Questions">FAQ's</Link></li>
                <li><Link href='/awards' title="Awards and Recognitions">Awards &amp; Recognitions</Link></li>
                <li><Link href='/request-quote' title="Request a Quote">Request Quote</Link></li>
            </ul>
            <a className={`mean-expand ${activeIcon("pages")}`} onClick={() => active("pages")}></a>
        </li>
        <li><Link href='/portfolio/3-columns' title="Portfolio Gallery">Portfolio</Link></li>
        <li><Link href='/blog-standard' title="Blog">Blog</Link></li>
        <li>
            <Link 
                href='https://chat.someninigltd.com' 
                target="_blank" 
                rel="noopener noreferrer"
                title="Someni AI Chat (opens in new tab)"
                aria-label="Someni AI Chat (opens in new tab)"
            >
                Someni AI
            </Link>
        </li>
        <li><Link href='/blog-standard'>Blog</Link>
            {/* <ul className='sub-menu' style={activeSubMenu("blog")}>
                <li><Link href='/blog'>Blog Grid</Link></li>
                <li><Link href='/blog-standard'>Blog Standard</Link></li>
                <li><Link href='/blog/revamp-your-business-with-expert-consulting'>Blog Details</Link></li>
            </ul>
            <a className={`mean-expand ${activeIcon("blog")}`} onClick={() => active("blog")}></a> */}
        </li>
        <li><Link href='/contact-us'>Contact</Link>
            {/* <ul className='sub-menu' style={activeSubMenu("contact")}>
                <li><Link href='/contact'>Contact Style 01</Link></li>
                <li><Link href='/contact-two'>Contact Style 02</Link></li>
                <li><Link href='/contact-three'>Contact Style 03</Link></li>
                <li><Link href='/contact-four'>Contact Style 04</Link></li>
            </ul>
            <a className={`mean-expand ${activeIcon("contact")}`} onClick={() => active("contact")}></a> */}
        </li>      
    </ul>  
    </>
  );
};

export default ResponsiveMenu;
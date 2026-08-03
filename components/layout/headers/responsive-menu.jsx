"use client"
import Link from "next/link";
import React, { useState } from 'react';

const ResponsiveMenu = ({ onNavigate }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const active = (value) => setActiveMenu(value === activeMenu ? null : value);
    const activeIcon = (value) => (activeMenu === value ? "mean-clicked" : "");
    const activeSubMenu = (value) => activeMenu === value ? { display: "block" } : { display: "none" };
    const linkProps = { onClick: onNavigate };
  return (
    <>    
    <ul>
        <li><Link href='/' title="Home page" {...linkProps}>Home</Link></li>
        <li className='menu-item-has-children'>
            <Link href='/about-us' title="Pages overview" {...linkProps}>Pages</Link>
            <ul id="mobile-pages-submenu" className='sub-menu' style={activeSubMenu("pages")}>
                <li><Link href='/about-us' title="About Us" {...linkProps}>About Us</Link></li>
                <li><Link href='/history' title="Company History" {...linkProps}>Company History</Link></li>
                <li><Link href='/services' title="Our Services" {...linkProps}>Services</Link></li>
                <li><Link href='/testimonial' title="Testimonials" {...linkProps}>Testimonials</Link></li>
                <li><Link href='/faq' title="Frequently Asked Questions" {...linkProps}>FAQ's</Link></li>
                <li><Link href='/awards' title="Awards and Recognitions" {...linkProps}>Awards &amp; Recognitions</Link></li>
            </ul>
            <button className={`mean-expand ${activeIcon("pages")}`} type="button" aria-label="Toggle Pages submenu" aria-expanded={activeMenu === "pages"} aria-controls="mobile-pages-submenu" onClick={() => active("pages")}></button>
        </li>
        <li><Link href='/portfolio/3-columns' title="Portfolio Gallery" {...linkProps}>Portfolio</Link></li>
        <li className='menu-item-has-children'>
            <Link href='/services/tools' title="Construction Tools" {...linkProps}>Tools</Link>
            <ul id="mobile-tools-submenu" className='sub-menu' style={activeSubMenu("tools")}>
                <li><Link href='/services/tools/cost-calculator' title="Project Cost Calculator" {...linkProps}>Cost Calculator</Link></li>
                <li><Link href='/services/tools/material-calculator' title="Material Calculator" {...linkProps}>Material Calculator</Link></li>
                <li><Link href='/services/tools/instant-quote' title="Instant Quote Generator" {...linkProps}>Instant Quote</Link></li>
                <li><Link href='/services/tools/timeline-estimator' title="Project Timeline Estimator" {...linkProps}>Timeline Estimator</Link></li>
            </ul>
            <button className={`mean-expand ${activeIcon("tools")}`} type="button" aria-label="Toggle Tools submenu" aria-expanded={activeMenu === "tools"} aria-controls="mobile-tools-submenu" onClick={() => active("tools")}></button>
        </li>
        <li><Link href='/blog-standard' title="Blog" {...linkProps}>Blog</Link></li>
        <li>
            <Link 
                href='https://chat.someninigltd.com' 
                target="_blank" 
                rel="noopener noreferrer"
                title="Someni AI Chat (opens in new tab)"
                aria-label="Someni AI Chat (opens in new tab)"
                onClick={onNavigate}
            >
                Someni AI
            </Link>
        </li>
        <li><Link href='/contact-us' {...linkProps}>Contact</Link></li>
    </ul>  
    </>
  );
};

export default ResponsiveMenu;

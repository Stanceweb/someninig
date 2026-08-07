"use client";

import Link from "next/link";
import React, { useState } from 'react';

const ResponsiveMenu = ({ onNavigate }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const active = (value) => setActiveMenu(value === activeMenu ? null : value);
    const activeIcon = (value) => (activeMenu === value ? 'mean-clicked' : '');
    const activeSubMenu = (value) => (activeMenu === value ? { display: 'block' } : { display: 'none' });
    const linkProps = { onClick: onNavigate };

    return (
        <ul>
            <li><Link href='/' title="Home page" {...linkProps}>Home</Link></li>
            <li className='menu-item-has-children'>
                <Link href='/about-us' title="About Someni Nigeria Limited" {...linkProps}>About</Link>
                <ul id="mobile-about-submenu" className='sub-menu' style={activeSubMenu('about')}>
                    <li><Link href='/about-us' title="About Us" {...linkProps}>About Us</Link></li>
                    <li><Link href='/history' title="Company History" {...linkProps}>Company History</Link></li>
                    <li><Link href='/awards' title="Awards and Recognitions" {...linkProps}>Awards &amp; Recognitions</Link></li>
                    <li><Link href='/testimonial' title="Testimonials" {...linkProps}>Testimonials</Link></li>
                </ul>
                <button className={`mean-expand ${activeIcon('about')}`} type="button" aria-label="Toggle About submenu" aria-expanded={activeMenu === 'about'} aria-controls="mobile-about-submenu" onClick={() => active('about')}></button>
            </li>
            <li className='menu-item-has-children'>
                <Link href='/services' title="Our Services" {...linkProps}>Services</Link>
                <ul id="mobile-services-submenu" className='sub-menu' style={activeSubMenu('services')}>
                    <li><Link href='/services' title="Services Overview" {...linkProps}>Services Overview</Link></li>
                    <li><Link href='/services/tools' title="Project Tools" {...linkProps}>Project Tools</Link></li>
                    <li><Link href='/faq' title="Frequently Asked Questions" {...linkProps}>FAQ&apos;s</Link></li>
                </ul>
                <button className={`mean-expand ${activeIcon('services')}`} type="button" aria-label="Toggle Services submenu" aria-expanded={activeMenu === 'services'} aria-controls="mobile-services-submenu" onClick={() => active('services')}></button>
            </li>
            <li><Link href='/projects' title="Completed Projects" {...linkProps}>Projects</Link></li>
            <li className='menu-item-has-children'>
                <Link href='/blog' title="Insights" {...linkProps}>Insights</Link>
                <ul id="mobile-insights-submenu" className='sub-menu' style={activeSubMenu('insights')}>
                    <li><Link href='/blog' title="Blog" {...linkProps}>Blog</Link></li>
                    <li><Link href='https://blog.someninigltd.com/' target="_blank" rel="noopener noreferrer" title="News and Insights (opens in new tab)" onClick={onNavigate}>News &amp; Insights</Link></li>
                </ul>
                <button className={`mean-expand ${activeIcon('insights')}`} type="button" aria-label="Toggle Insights submenu" aria-expanded={activeMenu === 'insights'} aria-controls="mobile-insights-submenu" onClick={() => active('insights')}></button>
            </li>
            <li><Link href='/contact-us' title="Contact Us" {...linkProps}>Contact</Link></li>
            <li><Link href='https://chat.someninigltd.com' target="_blank" rel="noopener noreferrer" title="Someni AI (opens in new tab)" onClick={onNavigate}>Someni AI</Link></li>
        </ul>
    );
};

export default ResponsiveMenu;

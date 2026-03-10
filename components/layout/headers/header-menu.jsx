import Link from "next/link";
import React from 'react';

const MainMenu = () => {
    // Main navigation menu for site SEO and accessibility
    return (
        <>
            <ul>
                <li><Link href='/' title="Home page">Home</Link></li>
                <li className='menu-item-has-children'>
                    <Link href='/about-us' title="Pages overview">Pages</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/about-us' title="About Us">About Us</Link></li>
                        <li><Link href='/history' title="Company History">Company History</Link></li>
                        <li><Link href='/services' title="Our Services">Services</Link></li>
                        <li><Link href='/testimonial' title="Testimonials">Testimonials</Link></li>
                        <li><Link href='/faq' title="Frequently Asked Questions">FAQ's</Link></li>
                        <li><Link href='/awards' title="Awards and Recognitions">Awards &amp; Recognitions</Link></li>
                        <li><Link href='/request-quote' title="Request a Quote">Request Quote</Link></li>
                    </ul>
                </li>
                <li><Link href='/portfolio/3-columns' title="Portfolio Gallery">Portfolio</Link></li>
                <li className='menu-item-has-children'>
                    <Link href='/services/tools' title="Construction Tools">Tools</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/services/tools/cost-calculator' title="Project Cost Calculator">Cost Calculator</Link></li>
                        <li><Link href='/services/tools/material-calculator' title="Material Calculator">Material Calculator</Link></li>
                        <li><Link href='/services/tools/instant-quote' title="Instant Quote Generator">Instant Quote</Link></li>
                        <li><Link href='/services/tools/timeline-estimator' title="Project Timeline Estimator">Timeline Estimator</Link></li>
                    </ul>
                </li>
                <li><Link href='/blog-standard' title="Blog">Blog</Link></li>
                <li>
                    {/* External AI chat link */}
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
                <li><Link href='/contact-us' title="Contact Us">Contact Us</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;

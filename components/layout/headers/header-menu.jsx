import Link from "next/link";
import React from 'react';

const MainMenu = () => (
    <ul>
        <li><Link href='/' title="Home page">Home</Link></li>
        <li className='menu-item-has-children'>
            <Link href='/about-us' title="About Someni Nigeria Limited">About</Link>
            <ul className='sub-menu'>
                <li><Link href='/about-us' title="About Us">About Us</Link></li>
                <li><Link href='/history' title="Company History">Company History</Link></li>
                <li><Link href='/awards' title="Awards and Recognitions">Awards &amp; Recognitions</Link></li>
                <li><Link href='/testimonial' title="Testimonials">Testimonials</Link></li>
            </ul>
        </li>
        <li className='menu-item-has-children'>
            <Link href='/services' title="Our Services">Services</Link>
            <ul className='sub-menu'>
                <li><Link href='/services' title="Services Overview">Services Overview</Link></li>
                <li><Link href='/services/tools' title="Project Tools">Project Tools</Link></li>
                <li><Link href='/faq' title="Frequently Asked Questions">FAQ&apos;s</Link></li>
            </ul>
        </li>
        <li><Link href='/projects' title="Completed Projects">Projects</Link></li>
        <li className='menu-item-has-children'>
            <Link href='/blog' title="Insights">Insights</Link>
            <ul className='sub-menu'>
                <li><Link href='/blog' title="Blog">Blog</Link></li>
                <li><Link href='https://blog.someninigltd.com/' target="_blank" rel="noopener noreferrer" title="News and Insights (opens in new tab)">News &amp; Insights</Link></li>
            </ul>
        </li>
        <li><Link href='/contact-us' title="Contact Us">Contact</Link></li>
    </ul>
);

export default MainMenu;

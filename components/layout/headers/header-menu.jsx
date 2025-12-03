import Link from "next/link";
import React from 'react';

const MainMenu = () => {
    return (
        <>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li className='menu-item-has-children'><Link href='/about-us'>Pages</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/about-us'>About Us</Link></li>
                        <li><Link href='/history'>Company History</Link></li>
                        <li><Link href='/services'>Services</Link></li>
                        <li><Link href='/testimonial'>Testimonials</Link></li>
                        <li><Link href='/faq'>FAQ's</Link></li>
                        <li><Link href='/awards'>Awards &amp; Recognitions</Link></li>
                        <li><Link href='/request-quote'>Request Quote</Link></li>
                    </ul>
                </li>
                <li><Link href='/gallery'>Portfolio</Link></li>
                <li><Link href='/blog-standard'>Blog</Link></li>
                <li>
                    {/* This is a link */}
                    <Link href='https://chat.someninigltd.com' target="_blank" rel="noopener noreferrer">
                        Someni AI
                    </Link>
                </li>
                <li><Link href='/contact-us'>Contact Us</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;
import Link from "next/link";
import React from 'react';

const MainMenu = () => {
    return (
        <>
            <ul>
                <li><Link href='/'>Home</Link>
                    {/* <ul className='sub-menu'>
                        <li><Link href='/'>Home 01</Link></li>
                        <li><Link href='/home-two'>Home 02</Link></li>
                        <li><Link href='/home-three'>Home 03</Link></li>
                        <li><Link href='/home-four'>Home 04</Link></li>
                    </ul> */}
                </li>  
                <li className='menu-item-has-children'><Link href='/about-us'>Pages</Link>
                    <ul className='sub-menu'>
                        <li><Link href='/about-us'>About Us</Link></li>
                        <li><Link href='/history'>Company History</Link></li>
                        <li className><Link href='/services'>Services</Link>
                            {/* <ul className='sub-menu'>
                                <li><Link href='/services'>Services</Link></li>
                                <li><Link href='/services/building-architecture'>Services Details</Link></li>
                            </ul> */}
                        </li>
                        <li className><Link href='/certifications'>Certifications</Link></li>

                        <li><Link href='/testimonial'>Testimonials</Link></li>
                        {/* <li><Link href='/pricing-plans'>Price Plans</Link></li> */}
                        <li><Link href='/faq'>FAQ's</Link></li>
                        {/* <li className><Link href='/team'>Teams</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/team'>Team 01</Link></li>
                                <li><Link href='/team-two'>Team 02</Link></li>
                                <li><Link href='/team-three'>Team 03</Link></li>
                            </ul>
                        </li> */}
                        <li><Link href='/request-quote'>Request Quote</Link></li>
                        {/* <li><Link href='/404-error'>404 Page</Link></li> */}
                    </ul>
                </li>
                <li><Link href='/gallery'>Portfolio</Link>
                    {/* <ul className='sub-menu'>
                        <li><Link href='/gallery'>Filterable Gallery</Link></li>
                        <li className='menu-item-has-children'><Link href='/portfolio/2-columns'>Project Grid</Link>
                            <ul className='sub-menu'>
                                <li><Link href='/portfolio/2-columns'>2 Columns</Link></li>
                                <li><Link href='/portfolio/3-columns'>3 Columns</Link></li>
                                <li><Link href='/portfolio/4-columns'>4 Columns</Link></li>
                            </ul>
                        </li>
                        <li><Link href='/portfolio/healthcare-facility'>Project Details</Link></li>
                    </ul> */}
                </li>
                <li><Link href='/blog-standard'>Blog</Link>
                    {/* <ul className='sub-menu'>
                        <li><Link href='/blog'>Blog Grid</Link></li>
                        <li><Link href='/blog-standard'>Blog Standard</Link></li>
                        <li><Link href='/blog/key-steps-to-ensure-a-smooth-building-process'>Blog Details</Link></li>
                    </ul> */}
                </li>
                <li><Link href='/contact-us'>Contact Us</Link></li>      
            </ul>  
        </>
    );
};

export default MainMenu;
"use client";

import Link from "next/link";
import logo from "../../../public/assets/img/logo-2.png";
import MainMenu from './header-menu';
import { useRef, useState } from 'react';
import MobileMenuOne from './menu_sidebar/menu-one';
import SideBar from './offcanvas';

const HeaderTwo = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuSidebar, setMenuSidebar] = useState(false);
    const sidebarTriggerRef = useRef(null);
    const menuTriggerRef = useRef(null);

    const closeSidebar = () => {
        setSidebarOpen(false);
        sidebarTriggerRef.current?.focus();
    };

    const closeMenu = () => {
        setMenuSidebar(false);
        menuTriggerRef.current?.focus();
    };

    return (
        <>
            <header className="header__area two">
                <div className="custom_container">
                    <div className="header__area-menubar">
                        <div className="header__area-menubar-left one">
                            <div className="header__area-menubar-left-logo">
                                <Link href='/'><img className='one' src={logo.src} alt='Someni Nigeria Limited' /></Link>
                            </div>
                        </div>
                        <div className="header__area-menubar-center">
                            <nav className="header__area-menubar-center-menu" aria-label="Primary navigation">
                                <MainMenu />
                            </nav>
                        </div>
                        <div className="header__area-menubar-right">
                            <div className="header__area-menubar-right-btn one">
                                <Link className="build_button" href="/request-quote">Request a Quote<i className="flaticon-right-up"></i></Link>
                            </div>
                            <div className="header__area-menubar-right-sidebar">
                                <button
                                    ref={sidebarTriggerRef}
                                    className="header__area-menubar-right-sidebar-icon"
                                    type="button"
                                    aria-label="Open company contact details"
                                    aria-expanded={sidebarOpen}
                                    aria-controls="company-contact-panel"
                                    onClick={() => setSidebarOpen(true)}
                                ><i className="flaticon-menu-6" aria-hidden="true"></i></button>
                            </div>
                            <div className="header__area-menubar-right-responsive-menu menu__bar">
                                <button
                                    ref={menuTriggerRef}
                                    className="menu__bar-trigger"
                                    type="button"
                                    aria-label="Open navigation menu"
                                    aria-expanded={menuSidebar}
                                    aria-controls="mobile-navigation"
                                    onClick={() => setMenuSidebar(true)}
                                ><i className="flaticon-menu-3" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onClose={closeSidebar} />
            <MobileMenuOne isOpen={menuSidebar} setIsOpen={setMenuSidebar} onClose={closeMenu} />
        </>
    );
};

export default HeaderTwo;

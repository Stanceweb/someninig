"use client";

import Link from "next/link";
import Social from '../../data/social';
import logo2 from "../../../public/assets/img/logo-2.png";
import { useCallback, useEffect, useRef } from "react";

const SideBar = ({ isOpen, setIsOpen, onClose }) => {
    const dialogRef = useRef(null);
    const closeSidebar = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose, setIsOpen]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const dialog = dialogRef.current;
        const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = () => [...dialog.querySelectorAll(focusableSelector)];
        const closeButton = dialog.querySelector('.sidebar-close-btn');
        closeButton?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeSidebar();
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = focusableElements();
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) return;

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeSidebar, isOpen]);

    return (
        <>
            <div ref={dialogRef} id="company-contact-panel" className={`header__area-menubar-right-sidebar-popup ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Company contact details">
                <button className="sidebar-close-btn" type="button" aria-label="Close company contact details" onClick={closeSidebar}><i className="fal fa-times" aria-hidden="true"></i></button>
                <div className="header__area-menubar-right-sidebar-popup-logo">
                <Link href='/'>
                    <img src={logo2.src} alt="Someni Nigeria Limited logo" />
                </Link>
                </div>
                <p>Providing engineering and specialist services for Nigeria's oil and gas sector and allied industries with innovative solutions, focusing on technology, safety, environmental impact, and cost efficiency.</p>
                <div className="header__area-menubar-right-sidebar-popup-contact">
                    <h4 className="mb-30">Address</h4>
                    <div className="header__area-menubar-right-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
                            <i className="flaticon-phone"></i>
                        </div>
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
                            <span>Phone:</span>
                            <h6><Link href="tel:08068472444">08068472444</Link> | <Link href="tel:08030646966">08030646966</Link></h6>
                        </div>
                    </div>
                    <div className="header__area-menubar-right-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
                            <i className="flaticon-email-3"></i>
                        </div>
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
                            <span>Email Address:</span>
                            <h6><Link href="mailto:contactsomeni@yahoo.com">contactsomeni@yahoo.com</Link></h6>
                        </div>
                    </div>
                    <div className="header__area-menubar-right-sidebar-popup-contact-item">
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
                            <i className="flaticon-location-1"></i>
                        </div>
                        <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
                            <span>Location:</span>
                            <h6><Link href="https://maps.app.goo.gl/CDYMLqBjQcsLbicc6" target="_blank">NO 49, Uti Street, Off PTI Road, Effurun, Delta State</Link></h6>
                        </div>
                    </div>
                </div>
                <div className="header__area-menubar-right-sidebar-popup-social">
                    <Social />							
                </div>
            </div>
            <button className={`sidebar-overlay ${isOpen ? 'show' : ''}`} type="button" tabIndex={-1} aria-label="Close company contact details" onClick={closeSidebar}></button>
        </>
    );
};

export default SideBar;

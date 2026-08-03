"use client";

import Link from "next/link";
import logo1 from "../../../../public/assets/img/logo-2.png";
import ResponsiveMenu from "../responsive-menu";
import { useCallback, useEffect, useRef } from "react";

const MobileMenuOne = ({ isOpen, setIsOpen, onClose }) => {
    const dialogRef = useRef(null);
    const closeMenu = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose, setIsOpen]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const dialog = dialogRef.current;
        const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = () => [...dialog.querySelectorAll(focusableSelector)];
        const closeButton = dialog.querySelector('.menu__bar-popup-close');
        closeButton?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeMenu();
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
    }, [closeMenu, isOpen]);

    return (
        <>
            <div ref={dialogRef} id="mobile-navigation" className={`menu__bar-popup ${isOpen ? "show" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <div className="menu__bar-popup-top">
                    <div className="logo">
                        <Link href="/" onClick={closeMenu}><img src={logo1.src} alt='Someni Nigeria Limited' /></Link>
                    </div>
                    <button className="close menu__bar-popup-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}>
                        <i className="fal fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="responsive-menu mean-container">
                    <div className="mean-bar">
                        <nav className="mean-nav" aria-label="Mobile navigation">
                            <ResponsiveMenu onNavigate={closeMenu} />
                        </nav>
                    </div>
                </div>
                <Link className="menu__bar-popup-cta build_button" href="/request-quote" onClick={closeMenu}>Request a Quote<i className="flaticon-right-up" aria-hidden="true"></i></Link>
            </div>
            <button className={`menu__bar-popup-overlay ${isOpen ? "show" : ""}`} type="button" tabIndex={-1} aria-label="Close navigation menu" onClick={closeMenu}></button>
        </>
    );
};

export default MobileMenuOne;

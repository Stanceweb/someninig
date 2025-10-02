import Link from "next/link";
import Social from '../../data/social';
import logo2 from "../../../public/assets/img/logo-2.png";

const SideBar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            <div className={`header__area-menubar-right-sidebar-popup ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-close-btn" onClick={() => setIsOpen(false)}><i className="fal fa-times"></i></div>
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
                            <h6><Link href="https://www.google.com/maps/search/?api=1&query=Plot+1+Effurun+DSC+Express+Way,+Effurun,+Delta+State,+Nigeria" target="_blank">Plot 1 Effurun / DSC Express Way, Effurun, Delta State, Nigeria</Link></h6>
                        </div>
                    </div>
                </div>
                <div className="header__area-menubar-right-sidebar-popup-social">
                    <Social />							
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`}></div>
        </>
    );
};

export default SideBar;
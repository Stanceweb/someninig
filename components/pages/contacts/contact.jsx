import React from 'react';
import FormArea from './form';
import Link from 'next/link';

const ContactMain = () => {
    return (
        <>
            <div className="contact__area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 lg-mb-25">
                            <div className="contact__area-left mr-40 xl-mr-0">
                                <div className="title">
                                    <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Contact Us</span>
                                    <h2 className="title_split_anim mb-25">Get In Touch for Oil and Gas Engineering Services in Nigeria</h2>
                                    <p className="wow fadeInUp" data-wow-delay=".4s">We’re here to assist with your engineering projects! Reach out for inquiries on oil field construction, pipeline installation, civil works, or manpower supply in Delta State and across Nigeria.</p>
                                </div>
                                <div className="contact__area-left-contact wow fadeInUp" data-wow-delay=".7s">
                                    <div className="contact__area-left-contact-item">
                                        <div className="contact__area-left-contact-item-icon">
                                            <i className="flaticon-phone"></i>
                                        </div>
                                        <div className="contact__area-left-contact-item-content">
                                            <span>Phone:</span>
                                            <h6><Link href="tel:08068472444">08068472444</Link> | <Link href="tel:08030646966">08030646966</Link></h6>
                                        </div>
                                    </div>
                                    <div className="contact__area-left-contact-item">
                                        <div className="contact__area-left-contact-item-icon">
                                            <i className="flaticon-email-3"></i>
                                        </div>
                                        <div className="contact__area-left-contact-item-content">
                                            <span>Email Address:</span>
                                            <h6><Link href="mailto:contactsomeni@yahoo.com">contactsomeni@yahoo.com</Link></h6>
                                        </div>
                                    </div>
                                    <div className="contact__area-left-contact-item">
                                        <div className="contact__area-left-contact-item-icon">
                                            <i className="flaticon-location-1"></i>
                                        </div>
                                        <div className="contact__area-left-contact-item-content">
                                            <span>Location:</span>
                                            <h6><Link href="https://www.google.com/maps/search/?api=1&query=Plot+1+Effurun+DSC+Express+Way,+Effurun,+Delta+State,+Nigeria" target="_blank">Plot 1 Effurun / DSC Express Way, Effurun, Delta State, Nigeria</Link></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 wow fadeInRight" data-wow-delay=".4s">
                            <div className="contact__area-form">
                                <h4>Send Message</h4>
                                <FormArea />
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </>
    );
};

export default ContactMain;
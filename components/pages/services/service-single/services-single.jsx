import React from 'react';
import Link from "next/link";
import ctaImage from '../../../../public/assets/img/page/cta-1.jpg';
import image1 from '../../../../public/assets/img/portfolio/portfolio-5.jpg';
import image2 from '../../../../public/assets/img/portfolio/portfolio-8.jpg';
import servicesData from '@/components/data/services-data';

const ServicesSingleMain = ({singleData}) => {
    return (
        <>
            <div className="services__details section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 columns_sticky">
                            <div className="all__sidebar">                        
                                <div className="all__sidebar-item">
                                    <h4>Our Solutions</h4>
                                    <div className="all__sidebar-item-category">
                                        <ul>
                                            {servicesData.slice(0, 5).map((data, id) => (
                                                <li key={id}><Link href={`/services/${data.id}`}>{data.title}<i className="flaticon-right-up"></i></Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="all__sidebar-item-help mb-25" style={{backgroundImage: `url(${ctaImage.src})`}}>
                                    <h3>Ready for Your Next Construction?</h3>
                                    <Link className="build_button mt-20" href="/contact-us">Get an Advice<i className="flaticon-right-up"></i></Link>
                                </div>
                                <div className="all__sidebar-item">
                                    <h4>Download</h4>
                                    <div className="all__sidebar-item-download">
                                        <ul>
                                            <li><Link href="#">Company Details<span className="fal fa-arrow-to-bottom"></span></Link></li>
                                            <li><Link href="#">Our Brochures<span className="fal fa-arrow-to-bottom"></span></Link></li>
                                        </ul>                            
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div className="col-lg-8">
                            <div className="services__details-area">
                                <img src={singleData.image.src} alt="image" className="mb-30 rounded shadow-sm w-100" />
                                <div className="service-details-section bg-light p-4 rounded mb-40 border">
                                    {singleData.detailsSection}
                                </div>
                                <div className="row mt-40 mb-40">
                                    <div className="col-sm-6 sm-mb-25">
                                        <img className="img_full rounded shadow-sm" src={image1.src} alt="image" />
                                    </div>
                                    <div className="col-sm-6">
                                        <img className="img_full rounded shadow-sm" src={image2.src} alt="image" />
                                    </div>
                                </div>
                                <p className="mb-20">We deliver exceptional construction services backed by years of experience. Our skilled team prioritizes quality, transparency, and client satisfaction. We utilize innovative techniques and sustainable practices, ensuring timely project completion. Trust us to bring your to life with unmatched craftsmanship</p>
                                <ul className="services__details-area-list mb-30">
                                    <li><i className="flaticon-check-mark"></i>Our skilled professionals bring years of experience a</li>
                                    <li><i className="flaticon-check-mark"></i>We are the leading construction company in the industry.</li>
                                    <li><i className="flaticon-check-mark"></i>Our transparent pricing ensures no hidden fees or surprises.</li>
                                    <li><i className="flaticon-check-mark"></i>We adhere to strict safety standards on all job sites.</li>
                                </ul>
                                <h3 className="mb-20">Commonly Asked Questions</h3>
                                <div className="mt-30" id="accordionExample">
                                    <div className="faq-item">
                                        <h5 className="icon" data-bs-toggle="collapse" data-bs-target="#collapseOne">1. What services do you offer?</h5>
                                        <div id="collapseOne" className="faq-item-body collapse show" data-bs-parent="#accordionExample">
                                            <p>We offer a range of services including construction management, design-build solutions, renovations, and specialty contracting for both residential and commercial projects</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <h5 className="icon collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">2. Do you provide free estimates?</h5>
                                        <div id="collapseTwo" className="faq-item-body collapse" data-bs-parent="#accordionExample">
                                            <p>Yes, we offer free estimates for all potential projects. We assess your requirements and provide a detailed quote without any obligation</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <h5 className="icon collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">3. Are you licensed and insured?</h5>
                                        <div id="collapseThree" className="faq-item-body collapse" data-bs-parent="#accordionExample">
                                            <p>Yes, we are fully licensed and insured to operate in our service areas. This ensures that your project is protected and complies with all local regulations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        </>
    );
};

export default ServicesSingleMain;
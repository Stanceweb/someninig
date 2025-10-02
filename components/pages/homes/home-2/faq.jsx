import React from 'react';
import image from "../../../../public/assets/img/service/services-1.jpg";

const FaqArea = () => {
    return (
        <>            
            <div className="faq__area section-padding">
                <div className="container">
                    <div className="row al-center">
                        <div className="col-xl-6 col-lg-5 lg-mb-25">
                            <div className="faq__area-image mr-50 xl-mr-0">
                                <img className="wow img_right_animation" src={image.src} alt="Someni Nigeria construction project" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <div className="faq__area-right">
                                <div className="faq__area-right-title mb-40">
                                    <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Common Inquiries</span>
                                    <h2 className="wow fadeInRight" data-wow-delay=".6s">Answers to Your Construction Queries</h2>
                                </div>
                                <div className="wow fadeInUp" data-wow-delay=".9s" id="accordionExample">
                                    <div className="faq-item">
                                        <h5 className="icon" data-bs-toggle="collapse" data-bs-target="#collapseOne">1. What services does Someni Nigeria Limited offer?</h5>
                                        <div id="collapseOne" className="faq-item-body collapse show" data-bs-parent="#accordionExample">
                                            <p>Someni Nigeria Limited provides a wide range of construction services, including oil field services, building construction, manpower supply, and community relations management. We specialize in innovative construction solutions, sustainable development projects, and design-build services across residential, commercial, and industrial sectors in Nigeria.</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <h5 className="icon collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo">2. Do you provide free estimates in Nigeria?</h5>
                                        <div id="collapseTwo" className="faq-item-body collapse" data-bs-parent="#accordionExample">
                                            <p>Yes, Someni Nigeria Limited offers free, no-obligation estimates for all construction projects across Nigeria. Our team conducts thorough site assessments to deliver detailed, tailored quotes, ensuring transparency and value for your construction needs.</p>
                                        </div>
                                    </div>
                                    <div className="faq-item">
                                        <h5 className="icon collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree">3. Are you licensed and insured in Nigeria?</h5>
                                        <div id="collapseThree" className="faq-item-body collapse" data-bs-parent="#accordionExample">
                                            <p>Yes, Someni Nigeria Limited is fully licensed and insured to operate throughout Nigeria. We comply with all local regulations and industry standards, providing peace of mind and protection for every construction project we undertake.</p>
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

export default FaqArea;
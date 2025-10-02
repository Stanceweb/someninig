import Link from "next/link";
import image from "../../../public/assets/img/about/about-4.jpg";
import bgImage from "../../../public/assets/img/portfolio/portfolio-8.jpg";

const AboutMain = () => {
    return (
        <>
            <div className="mission__area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 lg-mb-25">
                            <div className="mission__area-left mr-40 xl-mr-0">
                                <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Our Mission</span>
                                <h2 className="title_split_anim">Dedicated to Delivering Value and Excellence</h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission__area-right">
                                <div className="row">
                                    <div className="col-md-6 md-mb-25 wow fadeInUp" data-wow-delay=".6s">
                                        <div className="experience__area-list-item">
                                            <i className="flaticon-team"></i>
                                            <div className="experience__area-list-item-content">
                                                <h4>Project Planning</h4>
                                                <p>Ensuring every detail is meticulously planned and executed with precision.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 wow fadeInUp" data-wow-delay=".9s">
                                        <div className="experience__area-list-item">
                                            <i className="flaticon-technology"></i>
                                            <div className="experience__area-list-item-content">
                                                <h4>Labor Preparation</h4>
                                                <p>We uphold the highest standards of quality craftsmanship and safety.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about__five section-padding pt-0">
                <div className="container">
                    <div className="row al-center">
                        <div className="col-lg-5 lg-mb-25">
                            <div className="about__five-image wow img_left_animation">
                                <img src={image.src} alt="Someni Nigeria construction team at work" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="about__five-right ml-70 xl-ml-0">
                                <div className="about__five-right-title">
                                    <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">About Our Company</span>
                                    <h2 className="title_split_anim">Trusted Partner in Construction and Design</h2>
                                </div>
                                <div className="features wow fadeInUp" data-wow-delay=".3s" style={{backgroundImage: `url(${bgImage.src})`}}>
                                    <h3>Building Trust<br/>Over Decades of Expertise</h3>
                                </div>
                                <p className="wow fadeInUp" data-wow-delay=".6s">
                                    At Someni Nigeria Limited, our journey began with a passion for excellence, evolving from a local enterprise into a leading provider of construction expertise and design innovation. We specialize in delivering client-focused solutions for residential, commercial, and industrial projects, integrating sustainable development practices and cutting-edge technology. Our commitment to quality craftsmanship and community impact has earned us a reputation as a trusted partner across Nigeria and beyond.
                                </p>
                                <div className="item_bounce">
                                    <Link className="build_button mt-20" href="/gallery">See Projects<i className="flaticon-right-up"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutMain;
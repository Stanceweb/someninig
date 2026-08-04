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
                                    <h2 className="title_split_anim">A Nigerian Engineering Partner with Nationwide Reach</h2>
                                </div>
                                <div className="features wow fadeInUp" data-wow-delay=".3s" style={{backgroundImage: `url(${bgImage.src})`}}>
                                    <h3>Building Trust<br/>Over Decades of Expertise</h3>
                                </div>
                                <p className="wow fadeInUp" data-wow-delay=".6s">
                                    Headquartered in Effurun, Delta State, Someni Nigeria Limited supports projects across Nigeria with engineering, oil field support, manpower and community-relations services. We bring local understanding, capable people and practical project coordination to every assignment—helping clients deliver work safely, efficiently and responsibly.
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

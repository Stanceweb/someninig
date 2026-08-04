import Link from "next/link";
import Count from "../../common/count";
import image from "../../../../public/assets/img/page/who-we-are.jpg";

const AboutTwo = () => {
    return (
        <div className="about__two section-padding pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 lg-mb-25">
                        <div className="about__two-left section-padding pb-0">
                            <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">About Someni Nigeria Limited</span>
                            <h2 className="wow fadeInRight" data-wow-delay=".6s">Engineering Delivery with Nationwide Reach</h2>
                            <p className="wow fadeInUp" data-wow-delay=".4s">
                                Headquartered in Effurun, Delta State, Someni Nigeria Limited delivers engineering and specialist services for oil and gas, industrial and civil projects across Nigeria. Our teams combine practical field experience with disciplined planning, safety and quality control to help clients deliver complex work with confidence.
                            </p>
                            <div className="wow fadeInDown" data-wow-delay="1.2s">
                                <Link className="build_button mt-35" href="/about-us">All Services<i className="flaticon-right-up"></i></Link>                        
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-6">
                        <div className="about__two-right">
                            <img className="wow img_top_animation" src={image.src} alt="image" />
                            <div className="counter__one-area mt-35">
                                <div className="about__two-right-counter">
                                    <h2><Count number={678}/>+</h2>
                                    <p>Complete Projects</p>
                                </div>
                                <div className="about__two-right-counter">
                                    <h2><Count number={120}/>+</h2>
                                    <p>Team Members</p>
                                </div>
                                <div className="about__two-right-counter">
                                    <h2><Count number={635}/>+</h2>
                                    <p>Client Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutTwo;

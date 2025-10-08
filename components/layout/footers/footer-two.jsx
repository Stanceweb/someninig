import Link from "next/link";
import logo from "../../../public/assets/img/logo-2.png";
import subscribeBg from "../../../public/assets/img/page/banner-video.png";
import Social from "@/components/data/social";
import blogData from "@/components/data/blog-data";

const FooterTwo = () => {
    return (
        <>
            <div className="footer__two">
                <div className="subscribe__area">
                    <div className="container">
                        <div className="row align-items-center subscribe__area-bg" style={{backgroundImage: `url(${subscribeBg.src})`}}>
                            <div className="col-lg-6 lg-mb-40 lg-t-center">
                                <div className="subscribe__area-left title_split_anim">
                                    <h2>Start Your Engineering Project with Someni Today!</h2>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="subscribe__area-form wow fadeInUp" data-wow-delay=".4s">
                                    <form>
                                        <input type="email" name="email" placeholder="Email address" />
                                        <button className="build_button" type="submit">Subscribe Now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="footer__two-widget">
                                <div className="footer__two-widget-about">
                                    <Link href="/"><img src={logo.src} alt="Someni Nigeria Limited logo" /></Link>
                                    <p>Someni Nigeria Limited provides engineering and specialist services for Nigeria's oil and gas sector and allied industries. We deliver innovative solutions with a focus on technology, safety, environmental impact, and cost efficiency.</p>
                                    <div className="footer__two-widget-about-social">
                                        <Social />
                                    </div>							
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 md-mt-30">
                            <div className="footer__two-widget footer-border pl-60 md-pl-0">
                                <h4>Head Office</h4>
                                <div className="footer__two-widget-location">
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="flaticon-location"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <Link href="https://www.google.com/maps/search/?api=1&query=NO+49,+Uti+Street,+Off+PTI+Road,+Effurun,+Delta+State">NO 49, Uti Street, Off PTI Road, Effurun, Delta State</Link>
                                        </div>
                                    </div>
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="flaticon-phone"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <Link href="tel:08068472444">08068472444</Link> | <Link href="tel:08030646966">08030646966</Link>
                                        </div>
                                    </div>
                                    <div className="footer__two-widget-location-item">
                                        <div className="footer__two-widget-location-item-icon">
                                            <i className="flaticon-email"></i>
                                        </div>
                                        <div className="footer__two-widget-location-item-info">
                                            <Link href="mailto:contactsomeni@yahoo.com">contactsomeni@yahoo.com</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 lg-mt-30">
                            <div className="footer__two-widget footer-border pl-60 lg-pl-0">
                                <h4>Recent Post</h4>
                                <div className="all__sidebar-item-post">
                                    {blogData?.slice(0, 2)?.map((data, id) => (
                                        <div className="post__item" key={id}>
                                            <div className="post__item-image">
                                                <Link href={`/blog/${data.id}`}><img src={data.image.src} alt="blog image" /></Link>
                                            </div>
                                            <div className="post__item-title">
                                                <span><i className="far fa-calendar-alt"></i>Sep {data.date}, 2025</span>
                                                <h6><Link href={`/blog/${data.id}`}>{data.title}</Link></h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>	
                            </div>
                        </div>
                    </div>
                </div>	
            </div>
            <div className="copyright__area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="copyright__area-content t-center">
                                <p>Copyright 2025 – All Rights Reserved By <Link href="/">Someni Nigeria Limited</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterTwo;
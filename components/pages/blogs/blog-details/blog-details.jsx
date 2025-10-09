import Link from 'next/link';
import Social from '@/components/data/social';
import BlogSidebar from '../blog-sidebar/blog-sidebar';
import avatar1 from '../../../../public/assets/img/team/member-5.jpg';
import avatar2 from '../../../../public/assets/img/team/member-3.jpg';
import avatar3 from '../../../../public/assets/img/team/member-1.jpg';
import image1 from '../../../../public/assets/img/about/about-1.jpg';
import image2 from '../../../../public/assets/img/page/choose-us.jpg';
import FormArea from '../../contacts/form';
import blogData from '@/components/data/blog-data';

const BlogSingleMain = ({ singleData }) => {
    const blogPost = blogData.slice(0, 3);

    return (
        <>
            <div className="blog__details section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 lg-mb-25">
                            <div className="blog__details-area">
                                <img src={singleData.image.src} alt="image" />
                                <h3 className="mt-25 mb-20">{singleData.title}</h3>
                                <p>{singleData.description}</p>
                                <p>Someni Nigeria Limited excels in community relations management for oil and gas projects in Delta State, fostering positive stakeholder engagement and sustainable operations through our CASHES policy. With a 28-year partnership with DAEWOO Nigeria Ltd., we handle community affairs across over 50 projects in Delta and Rivers States, ensuring seamless project execution and long-term goodwill.</p>
                                <div className="blog__details-area-box">
                                    <i className="fas fa-quote-right"></i>
                                    <div>
                                        <h6>Someni’s community relations expertise has been instrumental in building trust and minimizing disruptions in host communities for our oil projects.</h6>                                
                                        <span>Project Manager, DAEWOO Nigeria Ltd.</span>
                                    </div>
                                </div>
                                <h4 className="mb-20">Fostering Sustainable Community Partnerships in Nigeria's Oil Sector</h4>
                                <p>In Delta State's oil-rich regions, Someni Nigeria Limited manages community relations for major infrastructure projects, including pipeline laying and flow station construction. Our integrated CASHES approach prioritizes community affairs, health, safety, environment, and security, aligning with client standards to prevent conflicts and promote mutual benefits in onshore operations.</p>
                                <div className="row mt-40 mb-40 blog__details-area-image">
                                    <div className="col-sm-6 sm-mb-25">
                                        <img src={image1.src} alt="image" />
                                    </div>
                                    <div className="col-sm-6">
                                        <img src={image2.src} alt="image" />
                                    </div>
                                </div>
                                <p>Someni Nigeria Limited delivers comprehensive community relations management in Nigeria's oil and gas sector, leveraging decades of experience in stakeholder consultations and conflict resolution. Our proactive strategies ensure smooth execution of onshore pipeline projects and manpower deployment, as evidenced in our collaborations with SPDC and Chevron since 1993.</p>
                                <div className="blog__details-area-tag">
                                    <h5>Related Tags :</h5>
                                    <div className="all__sidebar-item-tag">
                                        <ul>
                                            {blogPost.map((data, id) => (
                                                <li key={id}><Link href={`/blog/${data.id}`}>{data.title.split(' ').slice(0, 2).join(' ')}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__details-area-author">
                                    <div className="blog__details-area-author-image">
                                        <img src={avatar1.src} alt="avatar-image" />
                                    </div>
                                    <div className="blog__details-area-author-content">
                                        <h5>Joshua Okon</h5>
                                        <p>Effective community relations management in Delta State demands cultural insight and strategic engagement, core strengths of Someni Nigeria Limited in Nigeria's energy sector.</p>
                                        <div className="social__icon">
                                            <Social />
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details-area-comment mt-40">
                                    <h3 className="mb-30">Comments ({singleData.comment})</h3>
                                    <div className="blog__details-area-comment-item">
                                        <div className="blog__details-area-comment-item-comment">
                                            <div className="blog__details-area-comment-item-comment-image">
                                                <img src={avatar2.src} alt="avatar-image" />	
                                            </div>									
                                            <div className="blog__details-area-comment-item-comment-content">
                                                <h5>Chinedu Eze<Link href="#"><i className="far fa-reply-all"></i>Reply</Link></h5>
                                                <span>June 10, 2025  At 3:PM</span>
                                                <p>Excellent overview of community engagement—Someni’s approach is a model for oil projects in Delta State!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog__details-area-comment-item ml-65 sm-ml-0">
                                        <div className="blog__details-area-comment-item-comment">
                                            <div className="blog__details-area-comment-item-comment-image">
                                                <img src={avatar3.src} alt="avatar-image" />
                                            </div>									
                                            <div className="blog__details-area-comment-item-comment-content">
                                                <h5>Fatima Musa<Link href="#"><i className="far fa-reply-all"></i>Reply</Link></h5>
                                                <span>June 12, 2025  At 5:PM</span>
                                                <p>Impressive work on sustainable partnerships in Nigeria's oil communities!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details-area-contact mt-60">
                                    <h3>Post Comment</h3>
                                    <p>Your email address will not be published. Required fields are marked</p>
                                    <div className="blog__details-area-contact-form">
                                        <FormArea />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 columns_sticky">
                            <BlogSidebar />
                        </div>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default BlogSingleMain;
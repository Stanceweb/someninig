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
                                <p>Someni Nigeria Limited provides security services Warri oil sector, protecting critical oil assets in Delta State with its CASHES policy. Since 2010, our zero lost-time incident record reflects robust safety standards Warri, achieved through surveillance, personnel deployment, and risk mitigation for oil field security Nigeria, notably in pipeline projects.</p>
                                <div className="blog__details-area-box">
                                    <i className="fas fa-quote-right"></i>
                                    <div>
                                        <h6>Someni’s security services have significantly enhanced safety and operational continuity in the Nigeria oil sector.</h6>                                
                                        <span>Operations Manager</span>
                                    </div>
                                </div>
                                <h4 className="mb-20">Enhancing Oil Field Security in Warri</h4>
                                <p>In Warri’s oil fields, Someni Nigeria Limited secures pipelines and flow stations, as demonstrated in our Delta State projects. Our CASHES-aligned approach uses advanced monitoring to protect against threats, supporting clients like MOBIL with pipeline security services, ensuring compliance with Nigerian oil sector regulations.</p>
                                <div className="row mt-40 mb-40 blog__details-area-image">
                                    <div className="col-sm-6 sm-mb-25">
                                        <img src={image1.src} alt="image" />
                                    </div>
                                    <div className="col-sm-6">
                                        <img src={image2.src} alt="image" />
                                    </div>
                                </div>
                                <p>Someni Nigeria Limited delivers top-tier oil field security Nigeria with expert surveillance and innovative techniques. Using durable materials for barriers and real-time monitoring technology, we ensure efficiency and client satisfaction, as seen in over 50 projects since 2010 across Delta and Rivers States.</p>
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
                                        <p>Leading security services Warri requires meticulous planning and safety execution, a strength of Someni Nigeria Limited in the Nigeria oil sector.</p>
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
                                                <p>Great insights on safety standards Warri—Someni’s security work is impressive!</p>
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
                                                <p>Pipeline security in Nigeria oil sector is well-handled by Someni!</p>
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
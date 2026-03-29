import Image from "next/image";
import heroImage from "@/public/assets/img/page/experience.jpg";
import ribbonImage from "@/public/assets/img/page/cta-1.jpg";
import { awardsShowcase, recognitionTimeline, certificationBadges, impactStats } from "@/components/data/awards-data";

const AwardsShowcase = () => {
    return (
        <>
            <section className="award__showcase-hero section-padding">
                <div className="container">
                    <div className="row al-center">
                        <div className="col-lg-6 lg-mb-40">
                            <div className="award__area-title">
                                <span className="subtitle wow fadeInLeft" data-wow-delay=".2s">Awards & Recognition</span>
                                <h2 className="wow fadeInRight" data-wow-delay=".4s">Celebrating trusted delivery across Nigeria&apos;s energy infrastructure</h2>
                                <p className="award__intro-text mt-20">
                                    From HSSE innovations to community diplomacy, Someni Nigeria Limited continues to be recognised for the discipline and ingenuity
                                    that keep critical assets safe, available, and profitable for our clients.
                                </p>
                            </div>
                            <div className="award__stats mt-40">
                                <div className="row">
                                    {impactStats.map((stat) => (
                                        <div className="col-sm-6 col-12 mt-20" key={stat.id}>
                                            <div className="award__stat-item">
                                                <div className="stat-number">{stat.value}<span className="stat-suffix">{stat.suffix}</span></div>
                                                <p className="stat-label">{stat.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <div className="award__hero-placeholder" style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320}}>
                                <div style={{
                                    background: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)',
                                    borderRadius: 20,
                                    width: '100%',
                                    minHeight: 220,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#2d3a4a',
                                    fontWeight: 600,
                                    fontSize: 28,
                                    letterSpacing: 1,
                                    boxShadow: '0 2px 16px 0 rgba(44,62,80,0.07)'
                                }}>
                                    Awards & Recognition
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="award__awards-grid section-padding">
                <div className="container">
                    <div className="section-header text-center mb-60">
                        <h3>Major Awards & Recognitions</h3>
                        <p className="mt-10">Industry-leading achievements in HSSE, quality, and community engagement</p>
                    </div>
                    <div className="row">
                        {awardsShowcase.map((award) => (
                            <div className="col-lg-4 col-md-6 mt-30" key={award.id}>
                                <div className="award__card">
                                    <div className="award__card-image">
                                        <Image src={award.image} alt={`${award.title} plaque`} width={520} height={360} />
                                    </div>
                                    <div className="award__card-header">
                                        <span className="award__year-badge">{award.year}</span>
                                        <h4 className="award__card-title">{award.title}</h4>
                                    </div>
                                    <p className="award__card-description">{award.description}</p>
                                    <div className="award__card-footer">
                                        <div className="award__meta-item">
                                            <span className="label">Issuer:</span>
                                            <span className="value">{award.issuer}</span>
                                        </div>
                                        <div className="award__meta-item">
                                            <span className="label">Category:</span>
                                            <span className="value">{award.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="award__timeline section-padding">
                <div className="container">
                    <div className="section-header text-center mb-60">
                        <h3>Recognition Timeline</h3>
                        <p className="mt-10">Milestones in our journey of excellence</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="timeline__wrapper">
                                {recognitionTimeline.map((item) => (
                                    <div className="timeline__item" key={item.id}>
                                        <div className="timeline__date-marker">
                                            <span className="badge">{item.date}</span>
                                        </div>
                                        <div className="timeline__content">
                                            <div className="timeline__image">
                                                <Image src={item.image} alt={item.title} width={600} height={360} />
                                            </div>
                                            <div className="timeline__text">
                                                <h4>{item.title}</h4>
                                                <p>{item.summary}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="award__certifications section-padding">
                <div className="container">
                    <div className="section-header mb-60">
                        <span className="subtitle">Global Benchmarks</span>
                        <h2>Certifications that back our promises</h2>
                        <p className="award__cert-intro mt-20">Our management systems are audited frequently, giving clients assurance that every milestone is governed by tested procedures.</p>
                    </div>
                    <div className="row">
                        {certificationBadges.map((badge) => (
                            <div className="col-lg-4 col-md-6 mt-30" key={badge.id}>
                                <div className="cert__badge">
                                    <div className="cert__image">
                                        <Image src={badge.image} alt={`${badge.title} certificate`} width={360} height={480} />
                                    </div>
                                    <div className="cert__icon">✓</div>
                                    <h4 className="cert__title">{badge.title}</h4>
                                    <p className="cert__subtitle">{badge.subtitle}</p>
                                    <p className="cert__description">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AwardsShowcase;

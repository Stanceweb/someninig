import certificationsData from '@/components/data/certifications-data';
import Image from 'next/image';

const CertificationsMain = () => {
    return (
        <section className="certification__page section-padding">
            <div className="container">
                <div className="section-header text-center mb-60">
                    <span className="subtitle">Verified Credentials</span>
                    <h2>Our ISO-certified management systems</h2>
                    <p className="mt-15">Independent auditors verify that Someni Nigeria Limited aligns quality, environmental, and HSSE controls with international benchmarks.</p>
                </div>

                <div className="row">
                    {certificationsData.map((cert) => (
                        <div className="col-lg-4 col-md-6 mt-30" key={cert.id}>
                            <div className="cert-card">
                                <div className="cert-card-image">
                                    <Image src={cert.image} alt={`${cert.title} certificate`} width={420} height={560} />
                                </div>
                                <div className="cert-card-body">
                                    <span className="cert-card-number">{cert.icon} #{cert.number}</span>
                                    <h4>{cert.title}</h4>
                                    <p>{cert.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="certification__details mt-80">
                    {certificationsData.map((cert) => (
                        <div className="certification__details-item" key={`${cert.id}-details`}>
                            <div className="details-header">
                                <div>
                                    <h3>{cert.title}</h3>
                                    <p>{cert.description}</p>
                                </div>
                                <span className="badge">{cert.number.padStart(2, '0')}</span>
                            </div>
                            <div className="details-content">
                                {cert.detailsSection}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationsMain;
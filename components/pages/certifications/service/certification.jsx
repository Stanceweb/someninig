import certificationsData from '@/components/data/certifications-data';
import Image from 'next/image';

const CertificationsMain = () => {
    const certification = certificationsData[0];

    return (
        <>
        <div className="services__details section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="services__details-area">
                            <div className="services__details-area-image mb-40">
                                <Image src={certification.image} alt={certification.title} width={1100} height={800} />
                            </div>
                            {certification.detailsSection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CertificationsMain;
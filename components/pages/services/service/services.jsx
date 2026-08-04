import servicesData from '@/components/data/services-data';
import Link from "next/link";

const ServicesMain = () => {
    return (
        <>
        <div className="services__page section-padding-three">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="title mb-35">
                            <span className="subtitle">Nationwide Project Delivery</span>
                            <h2>Engineering and Specialist Services Across Nigeria</h2>
                            <p>From our headquarters in Effurun, Delta State, we support oil and gas, industrial, civil and manpower requirements for clients across Nigeria.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {servicesData?.map((data, id) => (
                        <div className="col-lg-4 col-md-6 mt-25" key={id}>
                            <div className="services__one-item">
                                {data.icon}
                                <h4><Link href={`/services/${data.id}`}>{data.title}</Link></h4>
                                <Link className="more_btn" href={`/services/${data.id}`}>Read More<i className="flaticon-right-up"></i></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default ServicesMain;

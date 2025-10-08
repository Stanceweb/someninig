const image1 = "/assets/img/certification.png";

const serviceImages = [image1];

const serviceDetails = [
    {
        id: 'iso-9001-2015-certification',
        iconClass: "flaticon-certificate",
        title: 'ISO 9001:2015 Quality Management System',
        description: 'Someni Nigeria Limited is registered under ISO 9001:2015 for onshore pipeline laying construction services and manpower supply community relations management consultancy, ensuring excellence in oil and gas engineering as of September 2025.',
        detailsSection: (
            <>
                <h3 className="mt-25 mb-20">Certification Overview</h3>
                <p className="mb-20">
                    Someni Nigeria Limited has achieved ISO 9001:2015 certification, a globally recognized standard for Quality Management Systems (QMS). Issued by SIS Certifications Pvt. Ltd. (SIC), this certification validates our commitment to delivering consistent, high-quality services in Nigeria's oil and gas sector.
                </p>

                <h3 className="mt-25 mb-20">Scope of Certification</h3>
                <p className="mb-20">
                    The certification covers providing construction services for onshore pipeline laying works and manpower supply community relations related management consultancy services. This ensures our processes meet international standards for efficiency, safety, and client satisfaction in projects like pipeline installation and community engagement in Delta State.
                </p>

                <h3 className="mt-25 mb-20">Key Dates and Validity</h3>
                <p className="mb-20">
                    Initial Registration Date: 10-Sep-2025<br />
                    1st Surveillance Date: 10-Aug-2026<br />
                    2nd Surveillance Date: 10-Aug-2027<br />
                    Certificate Expiry Date: 09-Sep-2028<br />
                    Certificate Number: SIC/01/SNL/25/6159
                </p>

                <h3 className="mt-25 mb-20">Accreditation and Verification</h3>
                <p className="mb-20">
                    Issued by SIS Certifications Pvt. Ltd., accredited by UAF (United Accreditation Foundation) and IAS (International Accreditation Service). Verify at www.siccert.com, www.iafcertsearch.org, or www.ufaccreditation.org.
                </p>

                <h3 className="mt-25 mb-20">Benefits of Our Certification</h3>
                <p className="mb-20">
                    This ISO 9001:2015 certification underscores Someni Nigeria Limited's dedication to quality, continuous improvement, and stakeholder satisfaction. It enhances our credibility for onshore pipeline projects and community relations consultancy, aligning with global best practices for sustainable oil field operations.
                </p>
            </>
        ),
    },
];

const certificationsData = serviceDetails.map((service, index) => ({
    ...service,
    icon: <i className={service.iconClass}></i>,
    number: (index + 1).toString(),
    image: serviceImages[index],
}));

export default certificationsData;
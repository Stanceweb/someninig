const certificateImage = (file) => `/assets/img/certificationsandawards/${file}`;

const certificationsData = [
    {
        id: 'delta-role-model-2011',
        iconClass: "flaticon-certificate",
        title: 'Delta 20th Anniversary Awards',
        description: 'Honours Someni Nigeria Limited as one of Delta State’s most distinguished institutions for patriotism and service to humanity.',
        image: certificateImage("delta_20th_anniversary_awards.jpg"),
        detailsSection: (
            <>
                <h3 className="mt-25 mb-20">Role Model Recognition</h3>
                <p className="mb-20">
                    Presented as part of the Delta 20th Anniversary Awards for 20 Outstanding Delta Role Models, the plaque commends Someni Nigeria Limited as one of the state’s most distinguished institutions.
                </p>

                <h3 className="mt-25 mb-20">Citation</h3>
                <p className="mb-20">
                    The certificate applauds our “true patriotism and genuine zeal to serve humanity,” signed by Prof. Patrick Igbigbi MBBS, MSc, MD, Chairman of the Delta Role Model Awards.
                </p>
            </>
        ),
    },
    {
        id: 'egtl-first-batch',
        iconClass: "flaticon-leaf",
        title: 'EGTL Welders Training Programme (1st Batch)',
        description: 'CNL/SGC certificate acknowledging Someni Nigeria Limited’s training of 57 youths from host communities between February and December 2010.',
        image: certificateImage("egtl_welders_1st_batch.jpg"),
        detailsSection: (
            <>
                <h3 className="mt-25 mb-20">Programme Summary</h3>
                <p className="mb-20">
                    The Escravos Gas to Liquids Project, in association with SGC and Chevron Nigeria Limited, certified the successful completion of the first batch of welders trained at the Someni Nigeria Ltd Welders Training Centre.
                </p>

                <h3 className="mt-25 mb-20">Key Details</h3>
                <p className="mb-20">
                    Training ran from 8 February to 31 December 2010, graduating 57 youths from local communities. The certificate was issued 11 August 2011 and signed by Michael Krafy (CNL-EGTL Project Manager) and Geoffrey Mason (SGC JV GTL Project Director).
                </p>
            </>
        ),
    },
    {
        id: 'egtl-second-batch',
        iconClass: "flaticon-shield",
        title: 'EGTL Welders Training Programme (2nd Batch)',
        description: 'Recognises the second cohort of 30 community youths trained between June 2011 and March 2012 under the EGTL initiative.',
        image: certificateImage("egtl_welders_2nd_batch.jpg"),
        detailsSection: (
            <>
                <h3 className="mt-25 mb-20">Programme Summary</h3>
                <p className="mb-20">
                    Under the same EGTL partnership, Someni Nigeria Limited hosted and trained the second batch of welders for Escravos Gas to Liquids facilities, reinforcing local capacity building.
                </p>

                <h3 className="mt-25 mb-20">Key Details</h3>
                <p className="mb-20">
                    The programme ran from 13 June 2011 to 30 March 2012 with 30 participating youths. The certificate was issued on 29 August 2012 and signed by Michael H. Krafy (CNL-EGTL Project Manager) and Geoffrey Mason (EGTL JV Project Director).
                </p>
            </>
        ),
    },
].map((service, index) => ({
    ...service,
    icon: <i className={service.iconClass}></i>,
    number: (index + 1).toString(),
}));

export default certificationsData;
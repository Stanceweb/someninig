const awardImage = (file) => `/assets/img/certificationsandawards/${file}`;

export const awardsShowcase = [
    {
        id: "delta-20th-anniversary",
        year: "2011",
        title: "Delta 20th Anniversary Role Model",
        issuer: "Delta Role Model Awards",
        category: "Community Service",
        description: "Presented in 2011 during the Delta 20th Anniversary celebrations by Prof. Patrick Igbigbi, citing Someni Nigeria Limited for true patriotism and a zeal to serve humanity.",
        image: awardImage("delta_20th_anniversary_awards.jpg"),
    },
    {
        id: "someni-md-recognition",
        year: "Date N/S",
        title: "Leadership Recognition",
        issuer: "Someni Nigeria Limited",
        category: "Executive Leadership",
        description: "Applauds Chief S. O. Agbugbu (JP) for immense leadership contributions during the Niger Delta Amnesty Trainees' 22nd Graduation Ceremony, highlighting guidance that accelerated Someni's growth.",
        image: awardImage("someni_recognition_to_md.jpg"),
    },
    {
        id: "fupre-sponsor-shell-eco",
        year: "Oct 2015",
        title: "Shell Eco-Marathon Patron",
        issuer: "Federal University of Petroleum Resources, Effurun",
        category: "STEM Sponsorship",
        description: "Recognises Chief S. Agbugbu as proud sponsor of Team FUPRE's Delta-Cruz prototype at the Shell Eco-Marathon competition in South Africa, 2–4 October 2015.",
        image: awardImage("fupre_shell_eco_marathon.jpg"),
    },
    {
        id: "fupre-merit-2014",
        year: "Oct 2014",
        title: "FUPRE Merit Awards – Most Outstanding Contractor",
        issuer: "Federal University of Petroleum Resources (FUPRE)",
        category: "Project Delivery",
        description: "Honours Someni Nigeria Limited at the October 2014 FUPRE Merit Awards for outstanding contributions to the university's growth and development.",
        image: awardImage("fupre_merit_awards_2014.jpg"),
    },
    {
        id: "daewoo-service-award",
        year: "Date N/S",
        title: "Daewoo Service Award",
        issuer: "Daewoo Nigeria Limited",
        category: "Strategic Partner",
        description: "Signed by Project Manager S. B. Lee, this service award thanks Chief Sunday Agbugbu for invaluable support and cooperation that underpinned Daewoo's operational success.",
        image: awardImage("daewoo_service_award.jpg"),
    },
    {
        id: "hyundai-egp3-completion",
        year: "Dec 2010",
        title: "EGP3 (A) Onshore Completion",
        issuer: "Hyundai Heavy Industries Co. Ltd.",
        category: "Project Milestone",
        description: "Commemorates the December 2010 completion of the EGP3(A) Onshore Project with a world-map plaque featuring London, Lagos, Seoul, and Houston clocks.",
        image: awardImage("hyundai_egp3_onshore.jpg"),
    },
];

export const recognitionTimeline = [
    {
        id: "timeline-2010-egp3",
        date: "Dec 2010",
        title: "EGP3(A) Onshore Delivery",
        summary: "Hyundai Heavy Industries marks the December 2010 completion of the EGP3(A) Onshore Project with a world-clock plaque linking London, Lagos, Seoul, and Houston.",
        image: awardImage("hyundai_egp3_onshore.jpg"),
    },
    {
        id: "timeline-2010",
        date: "Feb–Dec 2010 / Issued Aug 2011",
        title: "EGTL Welders Training – 1st Cohort",
        summary: "Trained 57 host-community youths between 8 Feb and 31 Dec 2010 at the Someni Welders Training Centre; certificates issued 11 Aug 2011 by CNL/SGC.",
        image: awardImage("egtl_welders_1st_batch.jpg"),
    },
    {
        id: "timeline-2011",
        date: "Jun 2011–Mar 2012 / Issued Aug 2012",
        title: "EGTL Welders Training – 2nd Cohort",
        summary: "Delivered a second EGTL programme for 30 youths from 13 Jun 2011 to 30 Mar 2012, culminating in certificates issued 29 Aug 2012.",
        image: awardImage("egtl_welders_2nd_batch.jpg"),
    },
    {
        id: "timeline-2011-delta",
        date: "2011",
        title: "Delta 20th Anniversary Award",
        summary: "Prof. Patrick Igbigbi presents Someni Nigeria Limited as one of 20 Outstanding Delta Role Models for patriotism and service to humanity.",
        image: awardImage("delta_20th_anniversary_awards.jpg"),
    },
    {
        id: "timeline-2014",
        date: "Oct 2014",
        title: "FUPRE Merit Excellence",
        summary: "Named Most Outstanding Contractor for sustained support to FUPRE infrastructure and students at the 2014 Merit Awards.",
        image: awardImage("fupre_merit_awards_2014.jpg"),
    },
    {
        id: "timeline-2015",
        date: "Oct 2–4, 2015",
        title: "Shell Eco-Marathon Sponsorship",
        summary: "Supported Team FUPRE's Delta-Cruz prototype at the Shell Eco-Marathon in South Africa, reinforcing our commitment to engineering talent.",
        image: awardImage("fupre_shell_eco_marathon.jpg"),
    },
];

export const certificationBadges = [
    {
        id: "egtl-first-batch",
        title: "EGTL Welders Training Cohort 1",
        subtitle: "57 Community Youths",
        description: "Certificate issued 11 Aug 2011 jointly by CNL/SGC confirming completion of the first EGTL welding programme (Feb–Dec 2010).",
        image: awardImage("egtl_welders_1st_batch.jpg"),
    },
    {
        id: "egtl-second-batch",
        title: "EGTL Welders Training Cohort 2",
        subtitle: "30 Community Youths",
        description: "Certificate dated 29 Aug 2012 for the second EGTL welding cohort conducted between Jun 2011 and Mar 2012 at Someni facilities.",
        image: awardImage("egtl_welders_2nd_batch.jpg"),
    },
    {
        id: "delta-role-model",
        title: "Delta Role Model Citation",
        subtitle: "20 Outstanding Institutions",
        description: "Delta Role Model Awards plaque celebrating Someni Nigeria Limited's patriotism and service to humanity across the state.",
        image: awardImage("delta_20th_anniversary_awards.jpg"),
    },
];

export const impactStats = [
    {
        id: "zero-lti",
        value: "1,460",
        suffix: "+ days",
        label: "Zero-LTI streak on live brownfield projects",
    },
    {
        id: "community-projects",
        value: "36",
        suffix: " projects",
        label: "Community development initiatives delivered with host stakeholders",
    },
    {
        id: "nigerian-talent",
        value: "82",
        suffix: " %",
        label: "Nigerian workforce representation across technical disciplines",
    },
    {
        id: "audits",
        value: "48",
        suffix: " audits",
        label: "External HSSE and quality audits closed without major findings",
    },
];

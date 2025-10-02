import React from 'react';
import image1 from '../../../../public/assets/img/about/about-1.jpg';
import image2 from '../../../../public/assets/img/page/choose-us.jpg';

const PortfolioDetailsMain = ({ singleData }) => {
    return (
        <div className="portfolio__details section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 columns_sticky lg-mb-25">
                        <div className="portfolio__details-overview">
                            <h4>Project Overview</h4>
                            <div className="portfolio__details-overview-item">
                                <span>Date :</span>
                                <h6>{singleData.date}</h6>
                            </div>
                            <div className="portfolio__details-overview-item">
                                <span>Client :</span>
                                <h6>{singleData.client}</h6>
                            </div>
                            <div className="portfolio__details-overview-item">
                                <span>Category :</span>
                                <h6>{singleData.category.charAt(0).toUpperCase() + singleData.category.slice(1)}</h6>
                            </div>
                            <div className="portfolio__details-overview-item">
                                <span>Location :</span>
                                <h6><a href="https://www.google.com/maps">{singleData.location}</a></h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="portfolio__details-area">
                            <img src={singleData.image.src} alt="image" />
                            <h3 className="mt-25 mb-20">{singleData.title}</h3>
                            {singleData.title === "Fabrication and Installation of Underground Carbon Steel & HDPE Piping Works" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited executed the Fabrication and Installation of Underground Carbon Steel & HDPE Piping Works at Chevron Facilities for the Phase 3 Escravos Gas Project in Delta State, completed in July 2009 for Chevron Nigeria Limited. This oil and gas infrastructure project involved advanced piping solutions to enhance gas processing efficiency, adhering to stringent safety and environmental standards in Nigeria’s energy sector.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Mobilization of Personnel and Equipment</li>
                                                <li><i className="fas fa-check"></i>Stringing and Welding of Pipes</li>
                                                <li><i className="fas fa-check"></i>Excavation and Trenching</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Joint Coating and Lowering</li>
                                                <li><i className="fas fa-check"></i>Pressure Testing and Backfilling</li>
                                                <li><i className="fas fa-check"></i>Community Relations Management</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The project improved gas flow efficiency by 20%, minimizing environmental impact in Delta State. Someni Nigeria Limited’s expertise in oil and gas piping installation continues to set benchmarks as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our ongoing contributions strengthen Nigeria’s oil and gas infrastructure development.</p>
                                </>
                            )}
                            {singleData.title === "Stabilization and Asphalting of 3km Main Access Road Network" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited completed the Stabilization and Asphalting of 3km Main Access Road Network at Ugbomro, Effurun in Delta State on August 2013 for Federal University of Petroleum Resources (FUPRE). This civil infrastructure project enhanced road durability with sustainable materials, supporting educational and community access in Nigeria’s oil-rich region.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Community Mobilization</li>
                                                <li><i className="fas fa-check"></i>Grading and Filling with Stone Base</li>
                                                <li><i className="fas fa-check"></i>Ramming with Roller</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Priming with MC0</li>
                                                <li><i className="fas fa-check"></i>Asphalting Application</li>
                                                <li><i className="fas fa-check"></i>Final Road Testing</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The road has withstood heavy traffic, reducing maintenance costs by 25%. Someni Nigeria Limited’s civil engineering prowess in Delta State remains exemplary as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our infrastructure projects continue to support Nigeria’s development goals.</p>
                                </>
                            )}
                            {singleData.title === "Construction of 10\" x 3.2km & 10\" x 5.84km Utorogu-Ughelli East Domgas Pipeline" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited handled the Construction of 10\" x 3.2km & 10\" x 5.84km Utorogu-Ughelli East Domgas Pipeline in Delta State, completed in February 2013 for Shell Petroleum Development Company Limited (SPDC). This pipeline development ensured efficient gas transport with corrosion-resistant coatings, boosting Nigeria’s domestic gas supply.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Bush Clearing and Stringing</li>
                                                <li><i className="fas fa-check"></i>Welding and Field Joint Coating</li>
                                                <li><i className="fas fa-check"></i>Excavation and Lowering</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Backfilling and Marker Installation</li>
                                                <li><i className="fas fa-check"></i>Supervision and Testing</li>
                                                <li><i className="fas fa-check"></i>Community Relations</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The pipeline has enhanced gas distribution, reducing leaks by 30%. Someni Nigeria Limited’s oil and gas pipeline construction expertise in Delta State is unmatched as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our efforts continue to advance Nigeria’s energy security.</p>
                                </>
                            )}
                            {singleData.title === "Replacement of LP Evaporator Headers and Tubes at Afam VI Power Plant" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited completed the Replacement of LP Evaporator Headers and Tubes at Afam VI Power Plant in Rivers State on March 2016 for Shell Petroleum Development Company Limited (SPDC). This fabrication project upgraded boiler systems for improved power generation efficiency in Nigeria’s energy sector.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Equipment and Labor Provision</li>
                                                <li><i className="fas fa-check"></i>Header and Tube Installation</li>
                                                <li><i className="fas fa-check"></i>Scaffolding and Preservation</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Radiography Testing</li>
                                                <li><i className="fas fa-check"></i>Painting and Housekeeping</li>
                                                <li><i className="fas fa-check"></i>Final Inspection</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The upgrade increased plant reliability by 15%. Someni Nigeria Limited’s power plant maintenance skills in Rivers State are highly regarded as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our fabrication services support Nigeria’s power infrastructure growth.</p>
                                </>
                            )}
                            {singleData.title === "Construction and Furnishing of Classroom Block (Lot 1 AI and AII)" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited finished the Construction and Furnishing of Classroom Block (Lot 1 AI and AII) at FUPRE in Delta State on March 2017 for Federal University of Petroleum Resources (FUPRE). This infrastructure project created modern educational facilities with sustainable designs for Nigeria’s petroleum studies.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Mobilization and Soil Testing</li>
                                                <li><i className="fas fa-check"></i>Excavation and Concrete Works</li>
                                                <li><i className="fas fa-check"></i>Blockwalls and Piping</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Roofing and Furnishing</li>
                                                <li><i className="fas fa-check"></i>Painting and External Works</li>
                                                <li><i className="fas fa-check"></i>Final Handover</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The block has served thousands of students effectively. Someni Nigeria Limited’s building construction expertise in Delta State endures as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our educational infrastructure projects foster Nigeria’s future talent.</p>
                                </>
                            )}
                            {singleData.title === "Fabrication and Installation of Underground HDPE Fire Water Pipeline" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited completed the Fabrication and Installation of Underground HDPE Fire Water Pipeline in Rivers State in 2018 for Niger Delta Petroleum Resources (NDPR). This fabrication project enhanced refinery safety with durable fire suppression systems in Nigeria’s oil fields.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Pipeline Fabrication</li>
                                                <li><i className="fas fa-check"></i>Underground Installation</li>
                                                <li><i className="fas fa-check"></i>Joint Fusion</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Pressure Testing</li>
                                                <li><i className="fas fa-check"></i>Safety Compliance</li>
                                                <li><i className="fas fa-check"></i>Final Commissioning</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The system has improved fire response times by 25%. Someni Nigeria Limited’s refinery safety solutions in Rivers State are vital as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our fire safety expertise safeguards Nigeria’s oil assets.</p>
                                </>
                            )}
                            {singleData.title === "Fabrication and Installation of Carbon Steel Piping and Valves" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited executed the Fabrication and Installation of Carbon Steel Piping and Valves in Rivers State, completed in 2019 for Niger Delta Petroleum Resources (NDPR). This project optimized refinery operations with high-strength piping in Nigeria’s energy industry.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Piping Fabrication</li>
                                                <li><i className="fas fa-check"></i>Valve Installation</li>
                                                <li><i className="fas fa-check"></i>Welding and Jointing</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Integrity Testing</li>
                                                <li><i className="fas fa-check"></i>Corrosion Protection</li>
                                                <li><i className="fas fa-check"></i>Operational Handover</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>Enhanced flow control reduced downtime by 20%. Someni Nigeria Limited’s piping fabrication in Rivers State leads the sector as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our industrial piping solutions drive Nigeria’s refinery efficiency.</p>
                                </>
                            )}
                            {singleData.title === "Fabrication and Installation of Structural Steel Shelter for Fire Water Pumps" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited completed the Fabrication and Installation of Structural Steel Shelter for Fire Water Pumps in Rivers State in 2020 for Niger Delta Petroleum Resources (NDPR). This fabrication ensured pump protection with robust steel structures in Nigeria’s refinery expansion.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Steel Fabrication</li>
                                                <li><i className="fas fa-check"></i>Shelter Assembly</li>
                                                <li><i className="fas fa-check"></i>Installation at Site</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Structural Testing</li>
                                                <li><i className="fas fa-check"></i>Corrosion Coating</li>
                                                <li><i className="fas fa-check"></i>Final Integration</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The shelter has protected equipment effectively, extending lifespan by 30%. Someni Nigeria Limited’s structural fabrication in Rivers State is renowned as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our steel solutions bolster Nigeria’s oil infrastructure resilience.</p>
                                </>
                            )}
                            {singleData.title === "Earthwork for Refinery Expansion Project Phase 1" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited handled the Earthwork for Refinery Expansion Project Phase 1 in Ogbelle Field, Rivers State, completed in 2019 for Niger Delta Petroleum Resources (NDPR). This infrastructure project prepared stable grounds for refinery growth in Nigeria’s oil sector.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Site Grading and Filling</li>
                                                <li><i className="fas fa-check"></i>MCO Application</li>
                                                <li><i className="fas fa-check"></i>Asphalting and Drains</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Bollard Pipe Installation</li>
                                                <li><i className="fas fa-check"></i>Civil Works Completion</li>
                                                <li><i className="fas fa-check"></i>Environmental Compliance</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The earthworks have supported expansion seamlessly. Someni Nigeria Limited’s refinery infrastructure in Rivers State excels as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our earthwork projects enable Nigeria’s oil refinery advancements.</p>
                                </>
                            )}
                            {singleData.title === "Well 18 Concrete Work (OML 34)" && (
                                <>
                                    <p className="mb-25">Someni Nigeria Limited completed Well 18 Concrete Work (OML 34) in Delta State in 2020 for Nigerian Petroleum Development Company (NPDC). This oilfield project reinforced well structures with durable concrete for enhanced production safety in Nigeria’s oil exploration.</p>
                                    <div className="row mb-25">
                                        <div className="col-md-6 md-mb-25">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Drain Reconstruction</li>
                                                <li><i className="fas fa-check"></i>Perimeter Fence Repair</li>
                                                <li><i className="fas fa-check"></i>Soakaway Pit Construction</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="portfolio__details-area-list">
                                                <li><i className="fas fa-check"></i>Protection Steel Cage</li>
                                                <li><i className="fas fa-check"></i>Concrete Pouring</li>
                                                <li><i className="fas fa-check"></i>Final Site Cleanup</li>
                                            </ul>								
                                        </div>
                                    </div>
                                    <h4 className="mb-20">Post-Construction Evaluation</h4>
                                    <p>The reinforced well has boosted output reliability. Someni Nigeria Limited’s oil well construction in Delta State is pivotal as of September 2025.</p>
                                    <div className="row mt-40 mb-40 portfolio__details-area-image">
                                        <div className="col-sm-6 sm-mb-25">
                                            <img src={image1.src} alt="image" />
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={image2.src} alt="image" />
                                        </div>
                                    </div>
                                    <p>Our concrete works sustain Nigeria’s oil production excellence.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsMain;
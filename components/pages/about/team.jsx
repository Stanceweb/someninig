import React from 'react';
import teamData from '../../data/team-data';

const Team = () => {
    return (
        <div className="team__area section-padding">
            <div className="container">
                <div className="row mb-35">
                    <div className="col-xl-12">
                        <div className="team__area-title t-center">
                            <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">We Are Licensed & Insured</span>
                            <h2 className="title_split_anim">OUR CERTIFICATION</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {teamData?.slice(0, 4).map((data) => (
                        <div className="col-lg-3 col-md-6 mt-25" key={data.id}>
                            <div className="team__area-item">
                                <img className="img_full" src={data.image.src} alt="certification" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
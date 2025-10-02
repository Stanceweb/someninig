import React from 'react';

const RequestQuoteMain = () => {
	return (
		<>
			<div className="request__quote section-padding-three">
				<div className="container">
					<div className="row">
						<div className="col-xl-12">
							<form action="#">
								<div className="row">
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>First Name<span> *</span></label>
											<input type="text" name="firstName" placeholder="Enter your first name" />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Last Name</label>
											<input type="text" name="lastName" placeholder="Enter your last name" />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Email Address<span> *</span></label>
											<input type="email" name="email" placeholder="Enter your email" />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Phone Number<span> *</span></label>
											<input type="tel" name="phone" placeholder="+234 123 456 789" />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Company/Organization<span> *</span></label>
											<input type="text" name="company" placeholder="Enter your company name" />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>State in Nigeria<span> *</span></label>
											<input type="text" name="state" placeholder="e.g., Lagos, Abuja" />
										</div>
									</div>
									<div className="col-md-12 mt-30">
										<p className="mb-10">What services do you need from Someni Nigeria Limited?<span> *</span></p>
										<div className="row">
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="constructionManagement" />Construction Management</label>
													<label><input className="mr-10" type="checkbox" name="service" value="sustainableDesign" />Sustainable Design</label>
													<label><input className="mr-10" type="checkbox" name="service" value="oilFieldServices" />Oil Field Services</label>
												</div>
											</div>
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="manpowerSupply" />Manpower Supply</label>
													<label><input className="mr-10" type="checkbox" name="service" value="designBuild" />Design-Build Solutions</label>
													<label><input className="mr-10" type="checkbox" name="service" value="renovation" />Renovation Services</label>
												</div>
											</div>
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="communityRelations" />Community Relations</label>
													<label><input className="mr-10" type="checkbox" name="service" value="industrialConstruction" />Industrial Construction</label>
													<label><input className="mr-10" type="checkbox" name="service" value="consulting" />Construction Consulting</label>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 mt-30">
										<div className="request__quote-item">
											<label>Project Details<span> *</span></label>
											<textarea name="message" placeholder="Describe your project requirements"></textarea>
										</div>
									</div>
									<div className="col-lg-12">
										<button className="build_button mt-30" type="submit">Request Quote<i className="flaticon-right-up"></i></button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RequestQuoteMain;
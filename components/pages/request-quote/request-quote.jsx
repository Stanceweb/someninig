import React, { useState } from 'react';

const RequestQuoteMain = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		company: '',
		state: '',
		services: [],
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === 'checkbox') {
			setFormData((prev) => {
				const services = checked
					? [...prev.services, value]
					: prev.services.filter((s) => s !== value);
				return { ...prev, services };
			});
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const response = await fetch('/__forms.html', {
				method: 'POST',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({
					'form-name': 'request-quote',
					'firstName': formData.firstName,
					'lastName': formData.lastName,
					'email': formData.email,
					'phone': formData.phone,
					'company': formData.company,
					'state': formData.state,
					'services': formData.services.join(', '),
					'message': formData.message
				}).toString()
			});

			if (response.ok) {
				setSubmitStatus('success');
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					company: '',
					state: '',
					services: [],
					message: ''
				});
			} else {
				setSubmitStatus('error');
			}
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="request__quote section-padding-three">
				<div className="container">
					<div className="row">
						<div className="col-xl-12">
							<form 
								name="request-quote" 
								method="POST" 
								data-netlify="true" 
								data-netlify-honeypot="bot-field"
								onSubmit={handleSubmit}
							>
								{/* Hidden fields for Netlify Forms */}
								<input type="hidden" name="form-name" value="request-quote" />
								<p style={{ display: 'none' }}>
									<label>Don't fill this out if you're human: <input name="bot-field" /></label>
								</p>
								<div className="row">
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>First Name<span> *</span></label>
											<input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Last Name</label>
											<input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Email Address<span> *</span></label>
											<input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Phone Number<span> *</span></label>
											<input type="tel" name="phone" placeholder="+234 123 456 789" value={formData.phone} onChange={handleChange} required />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>Company/Organization<span> *</span></label>
											<input type="text" name="company" placeholder="Enter your company name" value={formData.company} onChange={handleChange} required />
										</div>
									</div>
									<div className="col-md-6 mt-30">
										<div className="request__quote-item">
											<label>State in Nigeria<span> *</span></label>
											<input type="text" name="state" placeholder="e.g., Lagos, Abuja" value={formData.state} onChange={handleChange} required />
										</div>
									</div>
									<div className="col-md-12 mt-30">
										<p className="mb-10">What services do you need from Someni Nigeria Limited?<span> *</span></p>
										<div className="row">
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="constructionManagement" checked={formData.services.includes("constructionManagement")} onChange={handleChange} />Construction Management</label>
													<label><input className="mr-10" type="checkbox" name="service" value="sustainableDesign" checked={formData.services.includes("sustainableDesign")} onChange={handleChange} />Sustainable Design</label>
													<label><input className="mr-10" type="checkbox" name="service" value="oilFieldServices" checked={formData.services.includes("oilFieldServices")} onChange={handleChange} />Oil Field Services</label>
												</div>
											</div>
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="manpowerSupply" checked={formData.services.includes("manpowerSupply")} onChange={handleChange} />Manpower Supply</label>
													<label><input className="mr-10" type="checkbox" name="service" value="designBuild" checked={formData.services.includes("designBuild")} onChange={handleChange} />Design-Build Solutions</label>
													<label><input className="mr-10" type="checkbox" name="service" value="renovation" checked={formData.services.includes("renovation")} onChange={handleChange} />Renovation Services</label>
												</div>
											</div>
											<div className="col-md-4">
												<div className="request__quote-services">
													<label><input className="mr-10" type="checkbox" name="service" value="communityRelations" checked={formData.services.includes("communityRelations")} onChange={handleChange} />Community Relations</label>
													<label><input className="mr-10" type="checkbox" name="service" value="industrialConstruction" checked={formData.services.includes("industrialConstruction")} onChange={handleChange} />Industrial Construction</label>
													<label><input className="mr-10" type="checkbox" name="service" value="consulting" checked={formData.services.includes("consulting")} onChange={handleChange} />Construction Consulting</label>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 mt-30">
										<div className="request__quote-item">
											<label>Project Details<span> *</span></label>
											<textarea name="message" placeholder="Describe your project requirements" value={formData.message} onChange={handleChange} required></textarea>
										</div>
									</div>
									<div className="col-lg-12">
										<button className="build_button mt-30" type="submit" disabled={isSubmitting}>
											{isSubmitting ? "Sending..." : "Request Quote"}<i className="flaticon-right-up"></i>
										</button>
									</div>
									{submitStatus === 'success' && (
										<div className="contact-message success-message" style={{marginTop: "20px"}}>
											<i className="fa fa-check-circle" style={{color: "#28a745", marginRight: "8px"}}></i>
											Quote request sent successfully!
										</div>
									)}
									{submitStatus === 'error' && (
										<div className="contact-message error-message" style={{marginTop: "20px"}}>
											<i className="fa fa-times-circle" style={{color: "#dc3545", marginRight: "8px"}}></i>
											Failed to send quote request. Please try again.
										</div>
									)}
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
import React, { useState } from 'react';

const FormArea = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                    'form-name': 'contact',
                    'name': formData.name,
                    'email': formData.email,
                    'subject': formData.subject,
                    'message': formData.message
                }).toString()
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
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
            <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                {/* Hidden fields for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>
                
                <div className="row">
                    <div className="col-md-6 mb-25">
                        <div className="contact__form-area-item">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Full Name" 
                                value={formData.name}
                                onChange={handleChange}
                                required="required" 
                            />
                        </div>
                    </div>
                    <div className="col-md-6 md-mb-25">
                        <div className="contact__form-area-item">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                value={formData.email}
                                onChange={handleChange}
                                required="required" 
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mb-25">
                        <div className="contact__form-area-item">
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder="Subject" 
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mb-25">
                        <div className="contact__form-area-item">
                            <textarea 
                                name="message" 
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="contact__form-area-item">
                            <button 
                                className="build_button" 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Message'} <i className="flaticon-right-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {submitStatus === 'success' && (
                    <div className="contact-message success-message">
                        <i className="fa fa-check-circle" style={{color: "#28a745", marginRight: "8px"}}></i>
                        Message sent successfully! We'll get back to you soon.
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="contact-message error-message">
                        <i className="fa fa-times-circle" style={{color: "#dc3545", marginRight: "8px"}}></i>
                        Failed to send message. Please try again.
                    </div>
                )}
            </form>          
        </>
    );
};

export default FormArea;
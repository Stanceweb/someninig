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

        // Map form fields to API fields
        const payload = {
            to: "contactsomeni@yahoo.com", // Always send to this address
            subject: formData.subject || "Contact Form Submission",
            text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
            html: `<p><strong>Name:</strong> ${formData.name}</p>
                   <p><strong>Email:</strong> ${formData.email}</p>
                   <p><strong>Message:</strong> ${formData.message}</p>`,
            name: formData.name
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
            <form onSubmit={handleSubmit}>
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
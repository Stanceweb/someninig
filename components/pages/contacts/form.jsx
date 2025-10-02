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
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                    <div className="alert alert-success mt-3">Message sent successfully! We'll get back to you soon.</div>
                )}
                {submitStatus === 'error' && (
                    <div className="alert alert-danger mt-3">Failed to send message. Please try again.</div>
                )}
            </form>          
        </>
    );
};

export default FormArea;
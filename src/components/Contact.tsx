

import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    const getEmailDetails = () => {
        const subject = `Portfolio message from ${name}`;
        const body = `${message}\n\nReply to: ${email}`;
        return { subject, body };
    };

    const getGmailUrl = () => {
        const { subject, body } = getEmailDetails();
        const params = new URLSearchParams({
            view: 'cm',
            fs: '1',
            to: 'abdulhaditahir405@gmail.com',
            su: subject,
            body,
        });
        return `https://mail.google.com/mail/?${params.toString()}`;
    };

    const getMailtoUrl = () => {
        const { subject, body } = getEmailDetails();
        return `mailto:abdulhaditahir405@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            setFormError('Please complete your name, email, and message before continuing.');
            return;
        }
        setFormError('');
        window.open(getGmailUrl(), '_blank', 'noopener,noreferrer');
        setIsSubmitted(true);
    };

    const openEmailApp = () => {
        window.location.assign(getMailtoUrl());
    };

    return (
        <section id="contact" className="editorial-section contact-section">
            <p className="section-label">05 — CONTACT</p>
            <div className="contact-layout">
              <div className="contact-content">
                <p className="eyebrow">Have an idea?</p>
                <h2>Let&apos;s make something<br /><em>worth remembering.</em></h2>
                <p className="muted-copy">Send a note about a project, a question, or a problem you want to explore. This opens your email app with the details ready to send.</p>
                <a className="contact-email" href="mailto:abdulhaditahir405@gmail.com">abdulhaditahir405@gmail.com <span>↗</span></a>
              </div>
              <div className="contact-form-panel">
            {isSubmitted ? (
                <div className="form-success">
                    <span>↗</span><h3>Your Gmail draft is ready.</h3>
                    <p>A new Gmail compose window should be open with the recipient, subject, and message filled in.</p>
                    <div className="contact-success-actions">
                      <a className="button-primary contact-submit" href={getGmailUrl()} target="_blank" rel="noopener noreferrer">Open Gmail draft <span>↗</span></a>
                      <button className="contact-email contact-email-button" type="button" onClick={openEmailApp}>Use email app instead</button>
                      <small className="contact-app-note">Requires Outlook, Apple Mail, or another mail app to be configured on this device.</small>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    {formError && <p className="form-error" role="alert">{formError}</p>}
                    <div className="field">
                        <label htmlFor="name">Your name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setFormError(''); }}
                            required
                            placeholder="How should I call you?"
                            className="contact-input"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Your email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setFormError(''); }}
                            required
                            placeholder="you@example.com"
                            className="contact-input"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Your message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => { setMessage(e.target.value); setFormError(''); }}
                            required
                            placeholder="Tell me what you are thinking about..."
                            className="contact-input contact-textarea"
                        />
                    </div>
                    <button type="submit" className="button-primary contact-submit">
                        Prepare email <span>↗</span>
                    </button>
                </form>
            )}
              </div>
            </div>
        </section>
    );
};

export default Contact;
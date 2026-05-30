import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'hello@fashiondesigner.com',
      link: 'mailto:hello@fashiondesigner.com',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      content: 'New York, NY',
      link: '#',
    },
  ];

  const serviceInfo = [
    {
      title: 'Custom Commissions',
      description: 'Work with me to create custom designs tailored to your vision. Whether digital or hand-crafted, I bring your ideas to life.',
      price: 'Starting from $500',
    },
    {
      title: 'Design Consulting',
      description: 'Get expert advice on your fashion projects. I offer consultations for brands, designers, and fashion enthusiasts.',
      price: 'Hourly rates available',
    },
    {
      title: 'Workshops & Training',
      description: 'Learn fashion design techniques directly from me. Workshops cover digital design, hand-crafting, and more.',
      price: 'Group and individual rates',
    },
    {
      title: 'Collaboration',
      description: 'Looking for collaboration? Let\'s work together on creative projects and bring something unique to life.',
      price: 'Project-based pricing',
    },
  ];

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header section-dark">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Have a project in mind? Let's create something extraordinary together</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <h2>Quick Contact</h2>
              <div className="contact-info-cards">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <a 
                      key={idx} 
                      href={info.link}
                      className="contact-info-card"
                    >
                      <div className="info-icon">
                        <Icon size={24} />
                      </div>
                      <div className="info-content">
                        <h4>{info.title}</h4>
                        <p>{info.content}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow My Work</h4>
                <div className="social-links-grid">
                  <a href="#instagram" className="social-link">Instagram</a>
                  <a href="#linkedin" className="social-link">LinkedIn</a>
                  <a href="#behance" className="social-link">Behance</a>
                  <a href="#twitter" className="social-link">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section section-dark">
        <div className="container">
          <div className="section-header">
            <h2>Services & Rates</h2>
            <p>Here's what I offer and typical pricing structure</p>
          </div>

          <div className="grid grid-2">
            {serviceInfo.map((service, idx) => (
              <div key={idx} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
                <button className="btn btn-secondary">Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container-md">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-items">
            <div className="faq-item">
              <h4>What is your typical turnaround time?</h4>
              <p>
                Turnaround time depends on the project complexity. Simple designs 
                take 1-2 weeks, while intricate hand-crafted pieces may take 4-8 weeks. 
                We'll discuss timeline during our initial consultation.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you work with rush requests?</h4>
              <p>
                Yes, I can accommodate rush requests with additional fees. Contact me 
                directly to discuss your timeline and I'll let you know if it's feasible.
              </p>
            </div>

            <div className="faq-item">
              <h4>What's your process for commissions?</h4>
              <p>
                The process begins with an initial consultation to understand your vision. 
                I then provide concept sketches, revisions based on feedback, and final delivery 
                of the completed design or product.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can I see previous work before commissioning?</h4>
              <p>
                Absolutely! My portfolio on this site showcases my previous work. You can also 
                request references from past clients upon request.
              </p>
            </div>

            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>
                I accept credit cards, bank transfers, and PayPal. A 50% deposit is required 
                to begin work, with the balance due upon completion.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you offer team collaboration projects?</h4>
              <p>
                Yes! I frequently collaborate with other designers, brands, and creative professionals. 
                Let's discuss your project and see how we can work together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

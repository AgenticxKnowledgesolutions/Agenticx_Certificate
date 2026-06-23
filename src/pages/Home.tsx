import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState<{ email?: string; dob?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Landing page SEO optimization
    document.title = "AgenticX Certificate & Verification Portal | Best Software Training Institute in Kollam";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Verify course completion certificates and student internship credentials from AgenticX Knowledge Solutions, the leading software and IT training academy in Kollam, Kerala.');
  }, []);

  const validate = (): boolean => {
    const newErrors: { email?: string; dob?: string } = {};

    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!dob) {
      newErrors.dob = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief transition for premium UX response
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/result', { state: { email, dob } });
    }, 600);
  };

  return (
    <div className="portal-landing-wrapper">
      {/* Hero Section and Form Container */}
      <main className="portal-hero-section">
        <div className="hero-grid">
          
          {/* Hero text branding */}
          <div className="hero-info-column">
            <div className="hero-badge">
              <ShieldCheck size={14} className="hero-badge-icon" />
              <span>100% Cryptographically Verified Credentials</span>
            </div>
            
            <h1 className="hero-title">
              Verify Your Professional Achievements & Skills
            </h1>
            
            <p className="hero-subtitle">
              Welcome to the official AgenticX certification portal. Enter your registration email and date of birth to retrieve, verify, and download your course completion credentials or internship certificates.
            </p>

            <div className="hero-features-preview">
              <div className="feature-preview-item">
                <span className="bullet-dot">•</span>
                <span>Direct integration with LinkedIn for profiles</span>
              </div>
              <div className="feature-preview-item">
                <span className="bullet-dot">•</span>
                <span>Secure PDF download for resume attachment</span>
              </div>
              <div className="feature-preview-item">
                <span className="bullet-dot">•</span>
                <span>Globally verifiable verification links & IDs</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="hero-form-column">
            <div className="auth-card landing-card">
              <div className="card-intro">
                <h2 className="card-form-title">Search Certificate</h2>
                <p className="card-form-subtitle">Provide your details to lookup your credentials</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      required
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" size={18} />
                    <input
                      id="dob"
                      type="date"
                      className={`form-input ${errors.dob ? 'input-error' : ''}`}
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        if (errors.dob) setErrors((prev) => ({ ...prev, dob: undefined }));
                      }}
                      required
                    />
                  </div>
                  {errors.dob && <span className="error-text">{errors.dob}</span>}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner-wrapper">
                      <span className="spinner"></span>
                      Searching records...
                    </span>
                  ) : (
                    <>
                      View Certificate
                      <ArrowRight size={18} className="btn-arrow" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Global Footer with Credits */}
      <footer className="branding-portal-footer">
        <span className="footer-company">
          © {new Date().getFullYear()} AgenticX Knowledge Solutions. All rights reserved.
        </span>
        <span className="footer-developer">
          Developed by{' '}
          <a 
            href="https://github.com/fazilyousuf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="developer-link"
          >
            Muhammad Fazil
          </a>{' '}
          for AgenticX
        </span>
        <a 
          href="https://www.agenticx.co.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-website-link"
        >
          www.agenticx.co.in
        </a>
      </footer>
    </div>
  );
};

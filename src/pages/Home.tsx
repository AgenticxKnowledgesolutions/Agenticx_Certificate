import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Mail, Calendar, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState<{ email?: string; dob?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState(false);

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
    <div className="auth-container">
      <div className="auth-card">
        <div className="brand-header">
          <div className="logo-badge" style={{ overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {!logoError ? (
              <img 
                src="/AgenticX.png" 
                alt="AgenticX Logo" 
                className="logo-image" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith('.png')) {
                    // Try loading svg if png fails
                    target.src = '/logo.svg';
                  } else {
                    setLogoError(true);
                  }
                }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <Award className="logo-icon" size={32} />
            )}
          </div>
          <h1 className="brand-title">AgenticX</h1>
          <p className="brand-subtitle">Certificate & Verification System</p>
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
                Processing...
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
  );
};

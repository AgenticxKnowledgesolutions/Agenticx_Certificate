import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Certificate } from '../services/apiService';
import { ArrowLeft, Download, ExternalLink, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const state = location.state as { email?: string; dob?: string } | null;
  const email = state?.email;
  const dob = state?.dob;

  useEffect(() => {
    if (!email || !dob) {
      setError('Missing credentials. Please submit your details again.');
      setLoading(false);
      return;
    }

    const fetchCert = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.fetchCertificate(email, dob);
        setCertificate(data);
      } catch (err: any) {
        console.error('Error fetching certificate:', err);
        setError(err.message || 'An error occurred while fetching the certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCert();
  }, [email, dob]);

  const handleDownload = () => {
    if (!certificate) return;
    
    // Fallback if certificate_url is missing
    const url = certificate.certificate_url;
    if (!url) {
      alert('Download URL not available for this certificate');
      return;
    }

    // Trigger direct browser download
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = `Certificate_${certificate.candidate_name || certificate.name || 'AgenticX'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCandidateName = () => {
    return certificate?.candidate_name || certificate?.name || 'N/A';
  };

  const getCourseName = () => {
    return certificate?.course_name || certificate?.course || 'N/A';
  };

  const getCompletionDate = () => {
    if (certificate?.completion_date_formatted) return certificate.completion_date_formatted;
    if (certificate?.completion_date) {
      try {
        return new Date(certificate.completion_date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        return certificate.completion_date;
      }
    }
    return 'N/A';
  };

  // Rendering Loader State
  if (loading) {
    return (
      <div className="result-container">
        <div className="result-card skeleton-card">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line subtitle"></div>
          <div className="skeleton-grid">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
          <div className="skeleton-preview"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    );
  }

  // Rendering Error or Missing Data State
  if (error || !certificate) {
    const isNoCert = error === 'No certificate found' || !certificate;
    return (
      <div className="result-container">
        <div className="result-card error-card">
          <div className="error-icon-wrapper">
            <AlertCircle size={48} className="error-icon" />
          </div>
          <h2 className="error-title">
            {isNoCert ? 'No Certificate Found' : 'An Error Occurred'}
          </h2>
          <p className="error-description">
            {isNoCert
              ? 'We could not find any certificate matching the email and date of birth provided. Please check your credentials and try again.'
              : error || 'Failed to retrieve certificate details.'}
          </p>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="back-button">
              <ArrowLeft size={18} />
              Go Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  const certificateUrl = certificate.certificate_url;
  const certificateId = certificate.id;

  return (
    <div className="result-container">
      <div className="result-card">
        {/* Navigation header */}
        <div className="result-header">
          <Link to="/" className="text-link">
            <ArrowLeft size={16} />
            Back to Search
          </Link>
          <div className="status-indicator valid">
            <CheckCircle size={14} />
            Verified Authentic
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="certificate-meta">
          <h1 className="cert-title">Certificate of Completion</h1>
          <p className="cert-subtitle">This certificate is verified by AgenticX authenticity protocols.</p>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Recipient Name</span>
              <span className="meta-value highlight">{getCandidateName()}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Course Name</span>
              <span className="meta-value">{getCourseName()}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Completion Date</span>
              <span className="meta-value">{getCompletionDate()}</span>
            </div>
          </div>
        </div>

        {/* Certificate Preview (iframe / fallback layout) */}
        <div className="certificate-preview-box">
          {certificateUrl ? (
            <div className="iframe-wrapper">
              <iframe
                title="Certificate PDF Preview"
                src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="preview-iframe"
                frameBorder="0"
              />
            </div>
          ) : (
            <div className="preview-fallback">
              <div className="fallback-inner">
                <FileText size={56} className="fallback-icon" />
                <h3>Digital Document Available</h3>
                <p>A preview of this PDF is not viewable directly in this browser frame. You can verify details or download the certificate.</p>
              </div>
            </div>
          )}
        </div>

        {/* Certificate ID & Action buttons */}
        <div className="cert-actions-section">
          <div className="cert-id-badge">
            <span className="id-label">Verification ID:</span>
            <span className="id-value">{certificateId}</span>
          </div>

          <div className="button-group">
            {certificateUrl && (
              <button onClick={handleDownload} className="download-btn">
                <Download size={18} />
                Download PDF
              </button>
            )}
            
            <Link to={`/verify/${certificateId}`} className="verify-link-btn">
              <ExternalLink size={18} />
              Open Verification Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

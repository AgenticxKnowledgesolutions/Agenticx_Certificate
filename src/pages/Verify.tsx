import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Certificate } from '../services/apiService';
import { ShieldCheck, ShieldAlert, Award, Calendar, BookOpen, User, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';

export const Verify: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract token from query params
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    const identifier = token || id;
    if (!identifier) {
      setError('Certificate token or ID is required for verification.');
      setLoading(false);
      return;
    }

    const verifyCert = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.verifyCertificate(identifier, !!token);
        setCertificate(data);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'Failed to verify certificate validity');
      } finally {
        setLoading(false);
      }
    };

    verifyCert();
  }, [id, token]);

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

  const isCertificateValid = () => {
    const status = certificate?.status?.toLowerCase();
    return status === 'valid' || status === 'active';
  };

  // Rendering Loader State
  if (loading) {
    return (
      <div className="verify-container">
        <div className="verify-card skeleton-card">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line subtitle"></div>
          <div className="skeleton-grid">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        </div>
      </div>
    );
  }

  // Rendering Error State
  if (error || !certificate) {
    return (
      <div className="verify-container">
        <div className="verify-card error-card">
          <div className="error-icon-wrapper">
            <AlertCircle size={48} className="error-icon" />
          </div>
          <h2 className="error-title">Verification Failed</h2>
          <p className="error-description">
            {error || 'This certificate ID could not be matched with any records on file. It might be invalid, forged, or the server could not be reached.'}
          </p>
          <div className="error-actions">
            <Link to="/" className="back-button btn-full">
              <ArrowLeft size={18} />
              Return to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isValid = isCertificateValid();

  return (
    <div className="verify-container">
      <div className="verify-card">
        {/* Verification Status Header Banner */}
        <div className={`status-banner ${isValid ? 'valid' : 'revoked'}`}>
          {isValid ? (
            <>
              <ShieldCheck className="status-banner-icon" size={32} />
              <div className="status-banner-text">
                <h2>Certificate is Valid</h2>
                <p>This is a certified authentic credential.</p>
              </div>
            </>
          ) : (
            <>
              <ShieldAlert className="status-banner-icon" size={32} />
              <div className="status-banner-text">
                <h2>Certificate is Revoked</h2>
                <p>This credential has been marked as invalid or has been revoked.</p>
              </div>
            </>
          )}
        </div>

        {/* Content details */}
        <div className="verify-content">
          <div className="verify-header">
            <h1 className="verify-title">Verification Details</h1>
            <p className="verify-id-label">ID: {id || 'Secure JWT Token'}</p>
          </div>

          <div className="verify-details-list">
            <div className="detail-row">
              <div className="detail-icon-wrapper">
                <User size={20} className="detail-icon" />
              </div>
              <div className="detail-info">
                <span className="detail-label">Recipient Name</span>
                <span className="detail-value text-bold">{getCandidateName()}</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon-wrapper">
                <BookOpen size={20} className="detail-icon" />
              </div>
              <div className="detail-info">
                <span className="detail-label">Course / Certification</span>
                <span className="detail-value">{getCourseName()}</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon-wrapper">
                <Calendar size={20} className="detail-icon" />
              </div>
              <div className="detail-info">
                <span className="detail-label">Completion Date</span>
                <span className="detail-value">{getCompletionDate()}</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-icon-wrapper">
                <Award size={20} className="detail-icon" />
              </div>
              <div className="detail-info">
                <span className="detail-label">Credential Status</span>
                <span className={`status-badge ${isValid ? 'valid' : 'revoked'}`}>
                  {isValid ? 'Valid & Active' : 'Revoked / Suspended'}
                </span>
              </div>
            </div>
          </div>

          <div className="verify-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {certificate.certificate_url && (
              <a 
                href={certificate.certificate_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="download-btn btn-full"
                style={{ textDecoration: 'none' }}
              >
                <ExternalLink size={18} />
                View Original Certificate PDF
              </a>
            )}
            <Link to="/" className="back-button btn-full">
              <ArrowLeft size={18} />
              Verify Another Certificate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

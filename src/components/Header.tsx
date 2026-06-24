import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="portal-header">
      <div className="header-inner">
        <Link to="/" className="header-logo-link">
          <div className="header-logo-badge">
            {!logoError ? (
              <img 
                src="/AgenticX.png" 
                alt="AgenticX Logo" 
                className="header-logo-img" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <Award className="logo-icon" size={20} />
            )}
          </div>
          <span className="header-brand-name">AgenticX Knowledge Solutions</span>
        </Link>
        
        <nav className="header-nav">
          <a href="https://www.agenticx.co.in" target="_blank" rel="noopener noreferrer" className="nav-btn">
            Website
          </a>
          <a href="https://www.agenticx.co.in/courses" target="_blank" rel="noopener noreferrer" className="nav-btn accent-nav-btn">
            Courses
            <ExternalLink size={12} />
          </a>
          <a href="https://www.agenticx.co.in/about" target="_blank" rel="noopener noreferrer" className="nav-btn hide-mobile">
            About Us
          </a>
          <a href="https://www.agenticx.co.in/contact" target="_blank" rel="noopener noreferrer" className="nav-btn">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

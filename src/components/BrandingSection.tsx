import React, { useEffect } from 'react';
import { Award, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';

interface BrandingSectionProps {
  recipientName?: string;
  courseName?: string;
  isVerifyPage?: boolean;
}

export const BrandingSection: React.FC<BrandingSectionProps> = ({
  recipientName,
  courseName,
  isVerifyPage = false
}) => {
  useEffect(() => {
    // 1. Dynamic Title Tag Update
    const defaultTitle = "Verify Certificate & Credentials | AgenticX Knowledge Solutions Kollam";
    let pageTitle = defaultTitle;
    
    if (recipientName && courseName) {
      pageTitle = `${isVerifyPage ? 'Verify Certificate' : 'Certificate Result'} - ${recipientName} - ${courseName} | AgenticX Kollam`;
    } else if (recipientName) {
      pageTitle = `${isVerifyPage ? 'Verify Certificate' : 'Certificate Result'} - ${recipientName} | AgenticX Kollam`;
    }
    document.title = pageTitle;

    // 2. Meta Description Injection
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    const descContent = recipientName && courseName
      ? `Verify the authentic AgenticX course completion certificate for ${recipientName} in ${courseName}. AgenticX Knowledge Solutions is the best software training institute in Kollam, Kerala.`
      : "Verify authentic student course certificate credentials for AgenticX Knowledge Solutions, the best IT training institute in Kollam. Explore premium courses in Data Science, Full Stack, and AI/ML.";
    metaDescription.setAttribute('content', descContent);

    // 3. Meta Keywords Injection
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'best software training institute in kollam, best training institute in kollam, software training kollam, python full stack course kollam, data science course kollam, cybersecurity course kollam, AI ML training kollam, best IT academy Kollam, internship training kollam, placement assistance kollam, AgenticX Kollam');

    // 4. OpenGraph Meta Tags (for social media sharing and link indexing)
    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: descContent },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

  }, [recipientName, courseName, isVerifyPage]);

  // Schema.org structured data JSON-LD configuration
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "AgenticX Knowledge Solutions",
    "url": "https://www.agenticx.co.in",
    "logo": "https://www.agenticx.co.in/assets/AgenticX-removebg-preview.png",
    "description": "AgenticX Knowledge Solutions is the best software training institute in Kollam, Kerala. Offering job-oriented professional training in Python Full Stack, Data Science, AI & ML, Cyber Security, and Digital Marketing with real-world projects & placement support.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kollam",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/agenticx.co.in",
      "https://www.linkedin.com/company/agenticx"
    ]
  };

  return (
    <div className="branding-outer-wrapper">
      {/* JSON-LD Script block injected into page DOM */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>

      {/* 1. Trust Line */}
      <div className="trust-line-box">
        <CheckCircle size={16} className="trust-check-icon" />
        <span className="trust-text">
          This certificate is officially issued by <strong>AgenticX Knowledge Solutions</strong>.
        </span>
      </div>

      {/* Main Content card */}
      <div className="branding-container-card">
        
        {/* 2. Brand Section */}
        <section className="brand-info-section">
          <div className="brand-logo-wrapper">
            <Award size={28} className="brand-award-icon" />
            <h2 className="brand-name-heading">AgenticX Knowledge Solutions</h2>
          </div>
          
          <ul className="brand-features-list">
            <li>
              <span className="bullet-dot">•</span>
              <span className="feature-text">Industry-focused training programs</span>
            </li>
            <li>
              <span className="bullet-dot">•</span>
              <span className="feature-text">Real-world project experience</span>
            </li>
            <li>
              <span className="bullet-dot">•</span>
              <span className="feature-text">Internship & placement support</span>
            </li>
            <li>
              <span className="bullet-dot">•</span>
              <span className="feature-text">Trusted by learners</span>
            </li>
          </ul>
        </section>

        {/* Separator line */}
        <div className="branding-card-divider" />

        {/* 3. CTA Section */}
        <section className="cta-action-section">
          <h3 className="cta-title">Want to build skills like this?</h3>
          <p className="cta-description">
            Explore programs in Data Science, Full Stack, Cybersecurity, AI & ML.
          </p>
          <a 
            href="https://www.agenticx.co.in/courses" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="explore-courses-btn"
          >
            Explore Courses
            <ExternalLink size={16} />
          </a>
        </section>

        {/* 4. Optional Contact CTA */}
        <section className="contact-cta-section">
          <span className="contact-text">Have questions? Talk to our team</span>
          <a 
            href="https://www.agenticx.co.in/contact" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-team-btn"
          >
            <MessageSquare size={16} />
            Contact Page
          </a>
        </section>
      </div>

      {/* Semantic SEO content section (optimized keywords visible for search engine and LLM crawlers) */}
      <article className="seo-information-block" aria-label="About AgenticX Software Training in Kollam">
        <h3 className="seo-heading">Best Software & IT Training Institute in Kollam, Kerala</h3>
        <p className="seo-paragraph">
          AgenticX Knowledge Solutions is recognized as the best software training institute in Kollam. 
          We specialize in providing hands-on, job-oriented training courses designed to make students industry-ready. 
          Our curriculum includes advanced learning paths for Python Full Stack Development, Data Science, 
          Artificial Intelligence (AI), Machine Learning (ML), Cyber Security, and Ethical Hacking. 
          All students gain hands-on, practical training using real-world project experiences, 
          guiding them towards certified completion, internship credentials, and placement support.
        </p>
        <p className="seo-paragraph">
          If you are looking for the best IT training center in Kollam, Kerala to upgrade your technology skillset 
          or transition into high-paying software jobs, AgenticX is your trusted partner. 
          Every achievement certificate we issue is cryptographically verifiable via our authenticity verification portal 
          to guarantee recipient qualifications to global recruiters.
        </p>
      </article>

      {/* 5. Footer */}
      <footer className="branding-portal-footer">
        <span className="footer-company">AgenticX Knowledge Solutions</span>
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

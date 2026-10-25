import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Use - Form8846Calculator.com"
        description="Terms governing use of Form8846Calculator.com, including permitted use, prohibited use, intellectual property, and governing law."
      />
      <h1>Terms of Use</h1>

      <p>
        These Terms of Use ("Terms") govern your access to and use of Form8846Calculator.com (the "Site"). By
        using the Site you accept these Terms. If you do not agree, do not use the Site.
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        Accessing or using any part of the Site constitutes acceptance of these Terms and of the{' '}
        <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/disclaimer">Disclaimer</Link>. We may
        revise the Terms from time to time. The "Last updated" date will change when we do. Continued use after
        a revision constitutes acceptance of the revised Terms.
      </p>

      <h2>Permitted Use</h2>
      <p>
        You may use the Site for personal or internal business estimation and reference related to the federal
        FICA tip credit and Form 8846. You may view, download, or print pages for your own non-commercial
        reference, provided you do not remove any notices or alter the content in a misleading way.
      </p>

      <h2>Prohibited Use</h2>
      <p>You may not:</p>
      <ul>
        <li>
          Scrape, harvest, or systematically extract content or data from the Site by automated means without
          our prior written consent
        </li>
        <li>
          Resell, republish, or commercially redistribute Site content or calculator output as a competing
          product or service
        </li>
        <li>Attempt to interfere with the Site's operation, security, or integrity</li>
        <li>Use the Site for any unlawful purpose</li>
        <li>Misrepresent the source or accuracy of Site content</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        The Site's text, design, and original content are owned by the operators of the Site and are protected
        by applicable intellectual-property laws. You may not copy, modify, or distribute the Site's proprietary
        content except as expressly permitted in these Terms.
      </p>

      <h2>No Guarantee of Accuracy</h2>
      <p>
        The Site and the calculator provide estimates and general information only. We do not guarantee that any
        content or result is accurate, complete, or current. Tax rules change. You are solely responsible for
        verifying any figure before relying on it for filing or other decisions. See the{' '}
        <Link to="/disclaimer">Disclaimer</Link> for additional limitations.
      </p>

      <p className="mt-6">
        Return to the <Link to="/">Form 8846 calculator</Link>.
      </p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

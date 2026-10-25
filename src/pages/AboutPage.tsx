import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Form8846Calculator.com"
        description="Who runs this site, why the calculator exists, how we verify rates, and how to reach us."
      />
      <h1>About Form8846Calculator.com</h1>

      <h2>Why This Site Exists</h2>
      <p>
        Form 8846 is a one-page form, yet most free explanations either bury the math inside long
        payroll-software pages or require an email address before showing a result. This site exists to give
        restaurant and bar owners a clean, no-login calculator and plain-English reference pages for the FICA
        tip credit. The calculator runs in the browser; nothing is stored.
      </p>

      <h2>How We Verify Rates</h2>
      <p>Each year we check the following sources and update the pages that depend on them:</p>
      <ul>
        <li>IRS Form 8846 and its instructions</li>
        <li>IRC §45B and related regulations</li>
        <li>Social Security Administration wage-base announcements</li>
        <li>U.S. Department of Labor tipped-employee minimum-wage table</li>
        <li>State labor-department notices for cash-wage changes</li>
      </ul>
      <p>
        Every content page carries a "Last updated" date. Figures that can change mid-year are confirmed against
        the current official notice before publication.
      </p>

      <h2>What We Do Not Do</h2>
      <p>
        We do not provide tax, legal, or accounting advice. The calculator and the articles are estimation and
        reference tools only. Filing decisions belong to you and your tax professional. See the full{' '}
        <Link to="/disclaimer">disclaimer</Link>.
      </p>

      <h2>How to Reach Us</h2>
      <p>
        Corrections and questions are welcome. We read every message that points out an outdated rate or a
        factual error and update the affected page when the source confirms the change.
      </p>

      <h2>Editorial Independence</h2>
      <p>
        This site is not owned by or affiliated with any payroll software company, tip-management platform, or
        tax-preparation service. The calculator is free and does not require registration.
      </p>

      <p className="mt-6">
        Return to the <Link to="/">Form 8846 calculator</Link> or read the{' '}
        <Link to="/privacy-policy">privacy policy</Link>.
      </p>
    </>
  );
};

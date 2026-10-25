import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Disclaimer - Form8846Calculator.com"
        description="Form8846Calculator.com provides estimation tools and reference content only. Not tax, legal, or accounting advice."
      />
      <h1>Disclaimer</h1>

      <p>
        Please read this disclaimer carefully before using Form8846Calculator.com ("the Site"). By accessing or
        using the Site you acknowledge and agree to the limitations below.
      </p>

      <h2>Informational Content and Estimation Tools Only</h2>
      <p>
        The Site provides general information about the federal FICA tip credit (IRC §45B / Form 8846) and a
        browser-based estimation calculator. All content and results are for informational and educational
        purposes only. Nothing on the Site constitutes tax advice, legal advice, accounting advice, or any
        other form of professional advice.
      </p>

      <h2>No Professional Relationship</h2>
      <p>
        Use of the Site does not create a CPA-client, attorney-client, advisor-client, or any other professional
        relationship between you and the operators of the Site. You should not act or refrain from acting on
        the basis of any content on the Site without first obtaining advice from a qualified professional
        licensed in your jurisdiction and familiar with your specific facts.
      </p>

      <h2>Estimates Must Be Verified</h2>
      <p>
        All calculator results are estimates only. They depend on the accuracy of the numbers you enter and on
        the continued validity of the rules and rates reflected on the Site. Before filing any tax return or
        taking any position with a tax authority, you must verify the calculation with a licensed tax
        professional or CPA and against the current IRS forms and instructions for the relevant tax year.
      </p>

      <h2>Tax Law Changes</h2>
      <p>
        Tax statutes, regulations, IRS guidance, Social Security wage bases, and state wage rules change. The
        Site may not reflect the most current rules at any given moment. We update pages when we become aware of
        material changes, but we do not guarantee that every page is current on every day. Always confirm
        figures against official IRS and state sources before relying on them.
      </p>

      <h2>No Warranty</h2>
      <p>
        The Site and all content and tools are provided "as is" and "as available," without warranties of any
        kind, whether express, implied, or statutory, including but not limited to warranties of accuracy,
        completeness, merchantability, fitness for a particular purpose, or non-infringement. We do not warrant
        that the Site will be uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, the operators of the Site shall not be liable for any direct,
        indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or
        goodwill, arising out of or related to your use of (or inability to use) the Site, even if advised of the
        possibility of such damages. Your sole remedy for dissatisfaction with the Site is to stop using it.
      </p>

      <p className="mt-6">
        Related pages: <Link to="/privacy-policy">Privacy Policy</Link>, <Link to="/terms">Terms of Use</Link>,{' '}
        <Link to="/about">About</Link>. Return to the <Link to="/">Form 8846 calculator</Link>.
      </p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

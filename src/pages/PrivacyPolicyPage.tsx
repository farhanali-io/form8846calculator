import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - Form8846Calculator.com"
        description="How Form8846Calculator.com handles server logs, analytics cookies, and advertising data."
      />
      <h1>Privacy Policy</h1>

      <p>
        This Privacy Policy describes how Form8846Calculator.com ("the Site," "we," "us") collects, uses, and
        shares information when you visit the Site. By using the Site you agree to the practices described
        here. This policy is reviewed at least annually. Last updated: October 2026.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect limited information in the ordinary course of operating a website:</p>
      <ul>
        <li>
          <strong>Server logs.</strong> Our hosting provider automatically records standard technical data such
          as IP address, browser type, operating system, referring URL, pages requested, and timestamps. This
          data is used for security, performance, and abuse prevention.
        </li>
        <li>
          <strong>Cookies and similar technologies.</strong> The Site and its third-party partners may place
          cookies or similar technologies on your device. These may be session cookies (deleted when you close
          the browser) or persistent cookies.
        </li>
        <li>
          <strong>Analytics data.</strong> We use analytics services to understand aggregate traffic patterns,
          such as pages viewed, time on site, and approximate geographic region. Analytics data is processed in
          aggregate form.
        </li>
      </ul>
      <p>
        The calculator itself runs in your browser. We do not require an account, and we do not intentionally
        collect or store the numbers you enter into the calculator.
      </p>

      <h2>How We Use Information</h2>
      <p>We use the information described above to:</p>
      <ul>
        <li>Operate, maintain, and improve the Site</li>
        <li>Measure traffic and usage patterns</li>
        <li>Detect and prevent fraud, abuse, and technical problems</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>
        We do not sell personal information as that term is commonly understood. We do not use calculator
        inputs for marketing.
      </p>

      <h2>Third-Party Partners</h2>
      <p>The Site relies on standard third-party services for hosting, analytics, and performance.</p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

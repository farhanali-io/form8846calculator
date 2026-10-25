import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/">Calculator</Link>
          <Link to="/fica-tip-credit-calculator">FICA Tip Credit</Link>
          <Link to="/form-8846-instructions">Instructions</Link>
          <Link to="/tip-credit-vs-payroll-tax-credit">Tip Credit vs Payroll Credit</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <p>© 2026 Form8846Calculator.com. Estimates only. Not tax advice.</p>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Calculator' },
    { to: '/fica-tip-credit-calculator', label: 'FICA Tip Credit' },
    { to: '/form-8846-instructions', label: 'Instructions' },
    { to: '/5-15-minimum-wage-tip-credit-rule', label: '$5.15 Rule' },
    { to: '/restaurant-tip-credit-calculator', label: 'Restaurants' },
    { to: '/salon-tip-credit-calculator', label: 'Salons' },
    { to: '/tip-credit-rules-by-state', label: 'State Rules' },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="site-brand">
          Form8846Calculator.com
        </Link>
        <nav className="site-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={isActive ? 'active text-teal-700 font-semibold' : ''}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

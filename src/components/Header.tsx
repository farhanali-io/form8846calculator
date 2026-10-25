import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { IconCalculator, IconMenu2, IconX, IconReceiptTax } from '@tabler/icons-react';
import { LiquidGlass } from '@/components/ui/liquid-glass';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const interaction = reduceMotion
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

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
    <header className="sticky top-2 sm:top-3 z-50 px-2 sm:px-4 mb-6 w-full max-w-full overflow-hidden print:hidden">
      <LiquidGlass
        tint={0.06}
        scale={28}
        bevelDepth={10}
        className="mx-auto w-full max-w-5xl shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15 backdrop-blur-2xl bg-black/80"
        contentClassName="flex items-center justify-between py-2.5 px-4 sm:px-6"
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-white tracking-tight text-base sm:text-lg group"
          onClick={() => setIsOpen(false)}
        >
          <div className="size-8 rounded-lg bg-white flex items-center justify-center text-black shadow-md shadow-white/10 group-hover:scale-105 transition-transform">
            <IconReceiptTax className="size-5" />
          </div>
          <span>Form8846<span className="text-neutral-400 font-normal">Calculator</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 text-xs sm:text-sm font-medium text-neutral-400">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors py-1.5 px-2.5 rounded-lg ${
                  isActive
                    ? 'text-white font-semibold bg-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div {...interaction}>
            <Link
              to="/#calculator-section"
              onClick={() => {
                const el = document.getElementById('calculator-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-neutral-200 text-black px-4 py-2 text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              <IconCalculator className="size-4 text-black" />
              <span>Calculate</span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          </button>
        </div>
      </LiquidGlass>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-2 max-w-5xl mx-auto">
          <LiquidGlass
            tint={0.15}
            className="shadow-2xl border border-white/20 backdrop-blur-2xl bg-black/95 p-4 rounded-2xl"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </LiquidGlass>
        </div>
      )}
    </header>
  );
};

export default Header;

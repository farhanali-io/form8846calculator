import React from 'react';
import { Link } from 'react-router-dom';
import { IconReceiptTax } from '@tabler/icons-react';
import { LiquidGlass } from '@/components/ui/liquid-glass';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 pt-12 pb-16 px-4 print:hidden">
      <div className="max-w-5xl mx-auto">
        <LiquidGlass
          tint={0.06}
          scale={24}
          bevelDepth={8}
          className="p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/10 bg-neutral-950/80 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-white border border-white flex items-center justify-center text-black shadow-md">
                <IconReceiptTax className="size-5" />
              </div>
              <div>
                <div className="font-bold text-white text-base tracking-tight">Form8846Calculator</div>
                <div className="text-xs text-neutral-400">Employer FICA Tip Credit Calculation Engine</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-neutral-300">
              <Link to="/" className="hover:text-white transition-colors">Calculator</Link>
              <Link to="/fica-tip-credit-calculator" className="hover:text-white transition-colors">FICA Guide</Link>
              <Link to="/form-8846-instructions" className="hover:text-white transition-colors">Instructions</Link>
              <Link to="/restaurant-tip-credit-calculator" className="hover:text-white transition-colors">Restaurants</Link>
              <Link to="/salon-tip-credit-calculator" className="hover:text-white transition-colors">Salons</Link>
              <Link to="/tip-credit-rules-by-state" className="hover:text-white transition-colors">50-State Rules</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <div>
              © 2026 Form8846Calculator.com. IRC §45B Estimates only. Not tax advice.
            </div>
          </div>
        </LiquidGlass>
      </div>
    </footer>
  );
};

export default Footer;

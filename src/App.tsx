import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FicaTipCreditPage } from './pages/FicaTipCreditPage';
import { Form8846InstructionsPage } from './pages/Form8846InstructionsPage';
import { Rule515Page } from './pages/Rule515Page';
import { RestaurantPage } from './pages/RestaurantPage';
import { SalonPage } from './pages/SalonPage';
import { StateRulesPage } from './pages/StateRulesPage';
import { TipCreditVsPayrollPage } from './pages/TipCreditVsPayrollPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { TermsPage } from './pages/TermsPage';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-black text-neutral-100 selection:bg-white selection:text-black relative overflow-x-hidden w-full max-w-full">
        {/* Full-screen Dotted Glow Background */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-black overflow-hidden print:hidden">
          <DottedGlowBackground
            className="size-full"
            opacity={0.8}
            gap={15}
            radius={1.3}
            speedMin={0.3}
            speedMax={1.6}
            speedScale={1}
          />
          {/* Subtle vignette radial mask to enhance focus on content */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,#000000_100%)]" />
        </div>

        <Header />
        <main className="flex-grow">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fica-tip-credit-calculator" element={<FicaTipCreditPage />} />
              <Route path="/form-8846-instructions" element={<Form8846InstructionsPage />} />
              <Route path="/5-15-minimum-wage-tip-credit-rule" element={<Rule515Page />} />
              <Route path="/restaurant-tip-credit-calculator" element={<RestaurantPage />} />
              <Route path="/salon-tip-credit-calculator" element={<SalonPage />} />
              <Route path="/tip-credit-rules-by-state" element={<StateRulesPage />} />
              <Route path="/tip-credit-vs-payroll-tax-credit" element={<TipCreditVsPayrollPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Legacy .html redirects */}
              <Route path="/fica-tip-credit-calculator.html" element={<Navigate to="/fica-tip-credit-calculator" replace />} />
              <Route path="/form-8846-instructions.html" element={<Navigate to="/form-8846-instructions" replace />} />
              <Route path="/5-15-minimum-wage-tip-credit-rule.html" element={<Navigate to="/5-15-minimum-wage-tip-credit-rule" replace />} />
              <Route path="/restaurant-tip-credit-calculator.html" element={<Navigate to="/restaurant-tip-credit-calculator" replace />} />
              <Route path="/salon-tip-credit-calculator.html" element={<Navigate to="/salon-tip-credit-calculator" replace />} />
              <Route path="/tip-credit-rules-by-state.html" element={<Navigate to="/tip-credit-rules-by-state" replace />} />
              <Route path="/tip-credit-vs-payroll-tax-credit.html" element={<Navigate to="/tip-credit-vs-payroll-tax-credit" replace />} />
              <Route path="/about.html" element={<Navigate to="/about" replace />} />
              <Route path="/privacy-policy.html" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="/disclaimer.html" element={<Navigate to="/disclaimer" replace />} />
              <Route path="/terms.html" element={<Navigate to="/terms" replace />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

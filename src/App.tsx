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

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <div className="container">
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

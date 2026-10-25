import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../components/Calculator';
import { SEO } from '../components/SEO';
import { LiquidGlass } from '@/components/ui/liquid-glass';
import {
  IconCheck,
  IconArrowRight,
  IconReceiptTax,
  IconScale,
  IconBuildingStore,
  IconSparkles,
} from '@tabler/icons-react';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEO
        title="Form 8846 Calculator: FICA Tip Credit (Free)"
        description="Free Form 8846 calculator. Estimate your FICA tip credit from reported tips, hours, and cash wages. No login. Built for restaurant and bar owners."
      />

      {/* Calculator Section - opens immediately at the front */}
      <Calculator />

      <div className="print:hidden">
        {/* Value Pillars Grid in LiquidGlass */}
        <section className="mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <LiquidGlass
            tint={0.06}
            scale={20}
            bevelDepth={8}
            className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
          >
            <div className="size-10 rounded-xl bg-white text-black flex items-center justify-center mb-4 font-bold shadow-md">
              <IconReceiptTax className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">7.65% Employer Credit</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Recovers the employer share of FICA: 6.20% Social Security plus 1.45% Medicare on creditable tips under IRC §45B.
            </p>
          </LiquidGlass>

          <LiquidGlass
            tint={0.06}
            scale={20}
            bevelDepth={8}
            className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
          >
            <div className="size-10 rounded-xl bg-white text-black flex items-center justify-center mb-4 font-bold shadow-md">
              <IconScale className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">$5.15 Frozen Floor</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Tips needed to bring wages up to $5.15/hr are excluded on Line 2. Any direct cash wages paid reduce this exclusion.
            </p>
          </LiquidGlass>

          <LiquidGlass
            tint={0.06}
            scale={20}
            bevelDepth={8}
            className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
          >
            <div className="size-10 rounded-xl bg-white text-black flex items-center justify-center mb-4 font-bold shadow-md">
              <IconBuildingStore className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Food & Beverage Focus</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Designed specifically for restaurants, bars, caterers, and food service businesses where tipping is customary.
            </p>
          </LiquidGlass>
        </div>
      </section>

      {/* Core Guide Content Section */}
      <section className="space-y-10 text-neutral-300">
        {/* How credit is calculated */}
        <LiquidGlass
          tint={0.06}
          scale={24}
          bevelDepth={10}
          className="p-8 border border-white/15 bg-neutral-950/80 rounded-3xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
            <IconSparkles className="size-6 text-white" />
            How the Form 8846 Credit Is Calculated
          </h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            When employees report tips, you owe employer Social Security and Medicare tax on them. Form 8846 gives part of that tax back as a dollar-for-dollar general business income tax credit. The credit is 7.65% of your <strong className="text-white font-bold">creditable tips</strong>: 6.2% for Social Security plus 1.45% for Medicare.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Step 1 & 2</span>
              <p className="text-sm text-neutral-300 mt-1">
                Add total reported tips with FICA paid (Line 1). Calculate tips excluded below the $5.15 wage floor (Line 2).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Step 3 & 4</span>
              <p className="text-sm text-neutral-300 mt-1">
                Subtract Line 2 from Line 1 to find creditable tips (Line 3). Multiply Line 3 by 7.65% to determine your credit (Line 4).
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/15 text-sm text-white font-medium">
            <strong>Formula:</strong> Credit = (Reported Tips − Excluded Tips) × 7.65%, where Excluded Tips = ($5.15 × Hours) − Cash Wages (minimum $0).
          </div>
        </LiquidGlass>

        {/* Worked Example */}
        <LiquidGlass
          tint={0.06}
          scale={24}
          bevelDepth={10}
          className="p-8 border border-white/15 bg-neutral-950/80 rounded-3xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Worked Example ($25,000 Tips, 1,800 Hours)</h2>
          <p className="text-neutral-400 text-sm mb-5">
            A server reported $25,000 in tips over the year and worked 1,800 hours. The restaurant paid a cash wage of $2.13/hr.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/60">
            <table className="w-full text-left text-sm border-collapse m-0 border-none">
              <thead>
                <tr className="border-b border-white/15 text-neutral-400 bg-white/[0.02]">
                  <th className="py-3 px-4 font-bold text-white">Form Step</th>
                  <th className="py-3 px-4 font-bold text-white">Calculation</th>
                  <th className="py-3 px-4 text-right font-bold text-white">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 px-4 text-neutral-300 font-medium">Pay at the $5.15 floor</td>
                  <td className="py-3 px-4 text-neutral-400">1,800 hrs × $5.15</td>
                  <td className="py-3 px-4 text-right text-white font-semibold tabular-nums">$9,270.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-neutral-300 font-medium">Cash wages paid</td>
                  <td className="py-3 px-4 text-neutral-400">1,800 hrs × $2.13</td>
                  <td className="py-3 px-4 text-right text-white font-semibold tabular-nums">$3,834.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-neutral-300 font-medium">Excluded tips (Line 2)</td>
                  <td className="py-3 px-4 text-neutral-400">$9,270.00 − $3,834.00</td>
                  <td className="py-3 px-4 text-right text-neutral-400 font-semibold tabular-nums">$5,436.00</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-bold">Creditable tips (Line 3)</td>
                  <td className="py-3 px-4 text-neutral-400">$25,000.00 − $5,436.00</td>
                  <td className="py-3 px-4 text-right text-white font-bold tabular-nums">$19,564.00</td>
                </tr>
                <tr className="bg-white text-black font-extrabold">
                  <td className="py-3.5 px-4 text-black font-bold">Total Credit (Line 4)</td>
                  <td className="py-3.5 px-4 text-neutral-800">$19,564.00 × 7.65%</td>
                  <td className="py-3.5 px-4 text-right text-black text-base tabular-nums font-black">$1,496.65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </LiquidGlass>

        {/* What Counts & Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidGlass
            tint={0.06}
            scale={20}
            bevelDepth={8}
            className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
          >
            <h3 className="text-lg font-bold text-white mb-3">Eligible Tips</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <IconCheck className="size-4 text-white mt-0.5 shrink-0" />
                <span>Customer tips for food and drink provision or delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="size-4 text-white mt-0.5 shrink-0" />
                <span>Reported by employee on Form 4070 or POS report</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="size-4 text-white mt-0.5 shrink-0" />
                <span>Employer FICA taxes paid or incurred by employer</span>
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="size-4 text-white mt-0.5 shrink-0" />
                <span>Tips above the $5.15 statutory wage floor</span>
              </li>
            </ul>
          </LiquidGlass>

          <LiquidGlass
            tint={0.06}
            scale={20}
            bevelDepth={8}
            className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
          >
            <h3 className="text-lg font-bold text-white mb-3">Excluded From Credit</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold shrink-0">✕</span>
                <span>Mandatory service charges (treated as direct wages)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold shrink-0">✕</span>
                <span>Tips for salon, hotel, or personal services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold shrink-0">✕</span>
                <span>Unreported cash tips with no employer FICA paid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 font-bold shrink-0">✕</span>
                <span>Tips paid to 1099 independent contractors</span>
              </li>
            </ul>
          </LiquidGlass>
        </div>

        {/* Quick Reference Links */}
        <LiquidGlass
          tint={0.06}
          scale={20}
          bevelDepth={8}
          className="p-6 border border-white/15 bg-neutral-950/80 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white">Need multi-employee payroll detail?</h4>
              <p className="text-sm text-neutral-400">
                Explore our full staff workpaper tool and state-by-state wage directory.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/restaurant-tip-credit-calculator"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 shadow-md transition-colors"
              >
                Restaurant Staff Tool
                <IconArrowRight className="size-3.5" />
              </Link>
              <Link
                to="/tip-credit-rules-by-state"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                50-State Rules
              </Link>
            </div>
          </div>
        </LiquidGlass>
      </section>
      </div>
    </>
  );
};

export default HomePage;

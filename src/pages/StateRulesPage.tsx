import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { STATE_RULES, STATES_NO_TIP_CREDIT } from '../data/stateRules';

export const StateRulesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'no-credit' | 'credit-allowed'>('all');
  const navigate = useNavigate();

  const filteredStates = STATE_RULES.filter((item) => {
    const matchesSearch = item.state.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'no-credit') {
      return matchesSearch && item.tipCreditAllowed === 'No';
    }
    if (filterType === 'credit-allowed') {
      return matchesSearch && item.tipCreditAllowed !== 'No';
    }
    return matchesSearch;
  });

  const handleUseInCalculator = (stateName: string) => {
    navigate(`/?state=${encodeURIComponent(stateName)}`);
  };

  return (
    <>
      <SEO
        title="Tip Credit Rules by State (2026 Tipped Wages)"
        description="Tipped minimum wage and tip credit rules for all 50 states, with notes on the most complex states and how state rules affect Form 8846."
      />
      <h1>Tip Credit Rules by State</h1>

      <p>
        This page is a reference table of tipped cash wages and tip-credit rules across the 50 states and the
        District of Columbia. It is not tax, legal, or payroll advice. State tip-credit rules are wage-and-hour
        law. The FICA tip credit on Form 8846 is a separate federal income-tax credit. State rules affect only
        the cash wage you pay (and therefore the cash-wage number you enter when you figure Line 2 of Form
        8846). They do not change the federal $5.15 floor used for the credit itself.
      </p>

      <h2>How State Tip Credit Rules Affect Form 8846</h2>
      <p>
        Under federal labor law an employer may pay a tipped employee a cash wage as low as $2.13 an hour and
        count tips toward the $7.25 federal minimum. Many states raise that cash floor or ban the tip credit
        entirely. The higher the cash wage you actually pay, the smaller (or zero) the exclusion on Form 8846
        Line 2, and the larger the potential FICA tip credit. See the{' '}
        <Link to="/5-15-minimum-wage-tip-credit-rule">$5.15 rule explainer</Link> for why the federal floor
        never moves.
      </p>

      <h2>The 50-State Table</h2>
      <p>
        Figures reflect the U.S. Department of Labor tipped-employee table effective July 1, 2026, cross-checked
        against state labor-department announcements available as of October 2026. Local ordinances can be
        higher. Always confirm the rate that applies to your location and industry before setting payroll.
      </p>

      {/* Filter and Search Bar */}
      <div className="my-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search states (e.g. Texas, California)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white flex-1 min-w-[200px]"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              filterType === 'all'
                ? 'bg-teal-700 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All States ({STATE_RULES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('no-credit')}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              filterType === 'no-credit'
                ? 'bg-teal-700 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            No Tip Credit ({STATES_NO_TIP_CREDIT.length})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Tipped minimum cash wage (2026)</th>
              <th>Tip credit allowed</th>
              <th>Notes</th>
              <th>Quick Tool</th>
            </tr>
          </thead>
          <tbody>
            {filteredStates.map((row) => (
              <tr key={row.state}>
                <td className="font-semibold text-slate-900">{row.state}</td>
                <td className="font-medium text-slate-800">{row.cashWage}</td>
                <td>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      row.tipCreditAllowed === 'No'
                        ? 'bg-amber-100 text-amber-800'
                        : row.tipCreditAllowed === 'Conditional'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {row.tipCreditAllowed}
                  </span>
                </td>
                <td className="text-slate-600 text-sm">{row.notes}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUseInCalculator(row.state)}
                    className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline whitespace-nowrap"
                  >
                    Estimate &rarr;
                  </button>
                </td>
              </tr>
            ))}
            {filteredStates.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-500">
                  No states found matching "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="calc-help">
        Source baseline: U.S. DOL Wage and Hour Division, Minimum Wages for Tipped Employees, effective July 1,
        2026, plus state announcements through October 2026.
      </p>

      <h2>The Most Complex States</h2>
      <p>
        <strong>California</strong> bans the tip credit. Employers pay the full state minimum ($16.90 in
        2026) before tips. Local and industry rates (fast food, health care) can be higher. Because cash wages
        already exceed $5.15, Form 8846 Line 2 is normally zero.
      </p>
      <p>
        <strong>New York</strong> sets different cash wages by region and by industry. Hospitality rates
        differ between New York City / Long Island / Westchester and the rest of the state; many non-hospitality
        tipped occupations must receive the full minimum. Confirm the exact schedule that applies to your
        establishment.
      </p>
      <p>
        <strong>Alaska, Oregon, Washington, Minnesota, Montana, and Nevada</strong> also prohibit the tip
        credit. Cash wages equal the full applicable state (or regional) minimum. Oregon's three regional rates
        change every July 1.
      </p>
      <p>
        Several other states index their rates annually or have pending legislation. Always re-check the
        current notice before the start of a new calendar year.
      </p>

      <h2>States With No Tip Credit</h2>
      <p>Seven states require the full applicable minimum wage in cash before tips:</p>
      <ul>
        {STATES_NO_TIP_CREDIT.map((st) => (
          <li key={st}>
            <strong>{st}</strong>
          </li>
        ))}
      </ul>
      <p>
        In these states the cash wage already exceeds the federal $5.15 floor used on Form 8846. Line 2 is
        typically zero, so nearly all reported tips become creditable and the FICA tip credit is larger than
        it would be under a low cash-wage regime.
      </p>

      <h2>How to Use This Table With the Calculator</h2>
      <ol>
        <li>
          Find your state (and region, if applicable) in the table above and note the tipped cash wage that
          applies to your employees.
        </li>
        <li>
          Gather each tipped employee's reported tips, hours worked, and actual cash wages paid for the period
          you are calculating.
        </li>
        <li>
          Enter those figures in the <Link to="/">Form 8846 calculator</Link>. The cash-wage amount you enter
          drives the Line 2 exclusion; the $5.15 federal floor stays fixed.
        </li>
      </ol>

      <h2>FAQ</h2>
      <h3>My state has no tip credit. Do I still qualify for the FICA tip credit?</h3>
      <p>
        Yes. The two rules are independent. A state that bans the wage-law tip credit simply forces a higher
        cash wage. That higher cash wage usually produces a larger Form 8846 credit because fewer (or zero)
        tips are excluded on Line 2.
      </p>

      <h3>Does a local minimum wage override the state tipped cash wage?</h3>
      <p>
        Often yes. Many cities and counties set higher floors. Use the higher of the state and local rate that
        applies to your location.
      </p>

      <h3>Where do I find the official DOL table?</h3>
      <p>
        The U.S. Department of Labor publishes the national summary at dol.gov under "Minimum Wages for Tipped
        Employees." State labor departments publish the controlling local notices.
      </p>

      <h3>Do these cash wages change the $5.15 figure on Form 8846?</h3>
      <p>
        No. The $5.15 floor is fixed by IRC §45B. State cash wages only change the number you subtract when you
        compute the exclusion. See the <Link to="/5-15-minimum-wage-tip-credit-rule">$5.15 rule page</Link>.
      </p>

      <p className="mt-6">
        Restaurant operators can continue on the{' '}
        <Link to="/restaurant-tip-credit-calculator">restaurant tip credit page</Link>. Salon owners should
        first confirm eligibility on the <Link to="/salon-tip-credit-calculator">salon tip credit page</Link>.
      </p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

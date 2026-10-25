import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Rule515Page: React.FC = () => {
  return (
    <>
      <SEO
        title="Why the Tip Credit Uses $5.15 (and Never Changes)"
        description="Why the FICA tip credit is stuck at $5.15 an hour, where the figure comes from, and how it changes your Line 2 calculation."
      />
      <h1>Why the Tip Credit Uses $5.15 (and Never Changes)</h1>

      <p>
        The FICA tip credit still uses $5.15 as its hourly floor. That number has not moved in nearly two
        decades, and it is not tied to today's minimum wage. This page explains the statute, the practical
        effect on Form 8846 Line 2, and the mistakes owners make when they treat $5.15 as a living rate.
      </p>

      <h2>Where $5.15 Comes From</h2>
      <p>
        IRC §45B sets the floor for the employer FICA tip credit. The statute does not say "the current
        federal minimum wage." It points to the federal minimum wage that was in effect on January 1, 2007. On
        that date the federal minimum wage was $5.15 an hour. Congress locked the figure into the code, and
        later increases in the federal minimum wage never updated it.
      </p>
      <p>
        The result is a permanent gap. The federal minimum wage today is higher, and many state tipped cash
        wages are higher still, yet the credit calculation still measures against $5.15. That is why a
        restaurant that pays the modern tipped cash wage often excludes far fewer tips than an owner who
        mistakenly uses the current minimum.
      </p>

      <h2>Why It Does Not Change When the Minimum Wage Changes</h2>
      <p>
        Most wage rules float with inflation or with new legislation. Section 45B does not. It is a dated
        reference, not a living rate. When Congress raised the federal minimum wage after 2007, it left the
        tip-credit statute untouched. The IRS has never issued guidance that substitutes a newer floor. Until
        Congress amends the code, $5.15 remains the only figure that belongs on Line 2.
      </p>
      <p>
        That permanence is the entire point of the rule. The credit is larger than it would be if the floor
        rose with the minimum wage. The trade-off is that the math looks outdated until you see the statute
        itself.
      </p>

      <h2>How It Affects Your Line 2 Calculation</h2>
      <p>
        Line 2 removes the tips that merely bring an employee's cash pay up to $5.15. The calculation is done
        employee by employee and, for accuracy, month by month. Here is one month for one server:
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Calculation</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hours worked</td>
            <td>—</td>
            <td>200</td>
          </tr>
          <tr>
            <td>Pay at the $5.15 floor</td>
            <td>200 × $5.15</td>
            <td>$1,030.00</td>
          </tr>
          <tr>
            <td>Cash wages paid ($3.50/hr)</td>
            <td>200 × $3.50</td>
            <td>$700.00</td>
          </tr>
          <tr>
            <td>Excluded tips (Line 2 piece)</td>
            <td>$1,030.00 − $700.00</td>
            <td>$330.00</td>
          </tr>
          <tr>
            <td>Tips reported that month</td>
            <td>—</td>
            <td>$1,900.00</td>
          </tr>
          <tr>
            <td>Creditable tips for the month</td>
            <td>$1,900.00 − $330.00</td>
            <td>$1,570.00</td>
          </tr>
        </tbody>
      </table>
      <p>
        If the same server had been paid $5.15 or more in cash, the excluded amount would be zero and the
        full $1,900 would stay creditable. The{' '}
        <Link to="/form-8846-instructions">Form 8846 instructions page</Link> shows how these monthly pieces
        roll into the annual Line 2 total.
      </p>

      <h2>What Happens If You Pay Above $5.15</h2>
      <p>
        Many states already require a cash wage higher than $5.15 for tipped employees. When every tipped
        worker's cash wage meets or exceeds $5.15, Line 2 is zero. Creditable tips equal reported tips, and
        the credit is the largest the law allows. The higher cash wage costs more in payroll, but it also
        unlocks a bigger Form 8846 credit because nothing is excluded.
      </p>
      <p>
        Owners sometimes assume a higher cash wage reduces the credit. The opposite is true under §45B. The
        exclusion shrinks or disappears, so more tips enter the 7.65% calculation.
      </p>

      <h2>Does State Minimum Wage Change the Rule?</h2>
      <p>
        No. State law sets the cash wage you must pay and therefore the cash-wage number you enter on the
        worksheet. It does not change the federal $5.15 floor itself. A state that bans the tip credit and
        requires the full state minimum in cash simply produces a larger cash-wage figure; the $5.15 test
        remains the same. For the cash-wage amounts that apply in each state, see the{' '}
        <Link to="/tip-credit-rules-by-state">tip credit rules by state</Link> page.
      </p>

      <h2>Common Misconceptions</h2>
      <ul>
        <li>
          <strong>"The $5.15 updates every year."</strong> False. The figure is frozen by statute at the
          January 1, 2007 federal minimum.
        </li>
        <li>
          <strong>"The credit is based on the current minimum wage."</strong> False. Using today's federal or
          state minimum on Line 2 understates the credit.
        </li>
        <li>
          <strong>"I can average the year instead of working month by month."</strong> Risky. The IRS
          computes the exclusion per employee and per month; annual averages can produce the wrong total when
          hours or rates fluctuate.
        </li>
        <li>
          <strong>"Paying more than $5.15 hurts the credit."</strong> False. Paying at or above $5.15 removes
          the exclusion and increases the credit.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Where is the $5.15 rule written?</h3>
      <p>
        It appears in IRC §45B. The statute references the federal minimum wage in effect on January 1, 2007,
        which was $5.15.
      </p>

      <h3>Do I ever use my state's tipped minimum instead of $5.15?</h3>
      <p>Only for the cash-wage input. The floor that creates the exclusion is always the federal $5.15 figure.</p>

      <h3>What if my payroll system uses the current minimum wage for the credit?</h3>
      <p>
        Correct it. The system is applying the wrong floor. Re-run the Line 2 calculation with $5.15 before you
        file Form 8846.
      </p>

      <p className="mt-6">
        Ready to apply the rule to your numbers? Use the <Link to="/">Form 8846 calculator</Link> or review
        the <Link to="/fica-tip-credit-calculator">FICA tip credit guide</Link> for eligibility details.
      </p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

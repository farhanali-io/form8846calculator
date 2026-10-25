import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { MultiEmployeeTable } from '../components/MultiEmployeeTable';

export const RestaurantPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Restaurant Tip Credit Calculator (Form 8846)"
        description="How restaurants, bars, and caterers claim the FICA tip credit. Real examples for servers, bartenders, and pooled tips."
      />
      <h1>Restaurant Tip Credit Calculator: How Food and Beverage Employers Claim Form 8846</h1>

      <p>
        Restaurants, bars, and similar food-service businesses are the core users of the FICA tip credit. The
        statute was written around tips for providing, delivering, or serving food and drinks. This page shows
        how the credit works inside a restaurant, which roles generate creditable tips, and how tip pools and
        service charges affect the Form 8846 numbers.
      </p>

      <h2>Why Restaurants Are the Main Users of Form 8846</h2>
      <p>
        Section 45B limits the credit to tips received for food and beverage service where tipping is
        customary. That description matches full-service restaurants, bars, cafes, caterers, and many delivery
        operations. Other tipped businesses generally fall outside the credit. Because restaurants already
        report tips for payroll-tax purposes, the same data feeds Form 8846 with little extra record-keeping.
      </p>
      <p>
        The credit does not change how you withhold or deposit FICA. It only appears later on the income-tax
        return. For the eligibility rules that apply beyond restaurants, see the{' '}
        <Link to="/fica-tip-credit-calculator">FICA tip credit guide</Link>.
      </p>

      <h2>Which Restaurant Roles Generate Creditable Tips</h2>
      <p>
        Tips count when they are paid to employees for food or beverage service and employer FICA is paid on
        them. Typical roles that generate creditable tips include:
      </p>
      <ul>
        <li>Servers and waitstaff</li>
        <li>Bartenders</li>
        <li>Bussers and food runners who share in a tip pool</li>
        <li>Delivery drivers employed by the restaurant (not by a third-party platform)</li>
      </ul>
      <p>
        Hosts, managers, and supervisors usually do not receive tips. If they do receive tips and are
        correctly treated as employees with FICA paid, those tips can still enter the calculation. Independent
        contractors never generate a credit because the restaurant does not pay employer FICA on their
        earnings.
      </p>

      <h2>Worked Example: Multi-Employee Restaurant Staff</h2>
      <p>
        A small restaurant has three tipped employees in one month. Each person's tips, hours, and cash wages
        must be calculated separately; one employee's surplus cannot offset another's shortfall.
      </p>

      {/* Interactive table */}
      <MultiEmployeeTable />

      <p>
        Total creditable tips for the month: $1,677.20 + $1,632.00 + $420.00 = $3,729.20. At 7.65% the
        estimated credit for the month is $285.28. Annual totals are built the same way, employee by employee.
        The <Link to="/">Form 8846 calculator</Link> can run the arithmetic once you have the raw figures.
      </p>

      <h2>Tip Pooling and Form 8846</h2>
      <p>
        Many restaurants pool tips and then distribute shares to servers, bartenders, and support staff. For
        Form 8846 the credit is based on each employee's own reported tips after the pool is allocated, not on
        the pool total before distribution. The employee who ultimately reports the tip on the payroll
        records is the one whose hours and cash wages are used for the Line 2 exclusion.
      </p>
      <p>
        Keep the post-pool tip reports. Those are the numbers that match Box 7 of the W-2 and the tip lines on
        Form 941, and they are the numbers that belong on Line 1 of Form 8846.
      </p>

      <h2>Service Charges vs Tips</h2>
      <p>
        A mandatory service charge or automatic gratuity that the customer cannot decline is generally treated
        as a wage, not a tip. Because it is not a tip, it does not enter the Form 8846 calculation and does
        not generate a credit. True tips are voluntary amounts the customer chooses to leave. When a check
        includes both a mandatory service charge and a voluntary tip, only the voluntary tip counts for the
        credit.
      </p>
      <p>
        Payroll systems sometimes label both items the same way. Review the POS configuration and the tip
        reports so that only voluntary tips reach Line 1.
      </p>

      <h2>Delivery and Takeout Tips</h2>
      <p>
        Tips for "providing, delivering, or serving food or drinks" qualify when the restaurant is the
        employer. Tips paid to a restaurant's own delivery drivers therefore usually count. Tips left through
        a third-party delivery app generally do not, because the platform—not the restaurant—is the employer
        of record and the one that pays (or does not pay) employer FICA on those tips.
      </p>
      <p>
        If your restaurant employs its own drivers and reports their tips for FICA purposes, include those tips
        in the Form 8846 calculation under the same rules that apply to floor staff.
      </p>

      <h2>FAQ</h2>
      <h3>Do bartenders' tips count the same way as servers' tips?</h3>
      <p>
        Yes. Both are tips for food or beverage service. The same $5.15 floor, the same reporting requirements,
        and the same 7.65% rate apply.
      </p>

      <h3>Can I claim the credit on tips that were never reported?</h3>
      <p>
        No. Only tips on which you paid or incurred employer FICA tax are eligible. Unreported tips never enter
        the calculation.
      </p>

      <h3>Does tip pooling reduce the credit?</h3>
      <p>
        Not by itself. The credit follows the tips each employee reports after the pool is allocated. The pool
        total is irrelevant; the individual reported amounts matter.
      </p>

      <h3>Where can I see the cash-wage rules that apply in my state?</h3>
      <p>
        See the <Link to="/tip-credit-rules-by-state">tip credit rules by state</Link> page. State law sets
        the cash wage you pay; the federal $5.15 floor used for the Form 8846 exclusion stays the same.
      </p>

      <p className="mt-6">
        For the line-by-line form walkthrough, go to the{' '}
        <Link to="/form-8846-instructions">Form 8846 instructions</Link>. For the statutory reason the floor
        stays at $5.15, read the <Link to="/5-15-minimum-wage-tip-credit-rule">$5.15 rule explainer</Link>.
      </p>

      <p className="last-updated">Last updated: October 2026</p>
    </>
  );
};

# Form 8846 Calculator (React + Vite)

A modern, fast, and accessible React rewrite of Form8846Calculator.com — the FICA Tip Credit Calculator and reference guide for restaurant, bar, and food and beverage employers.

## Features

- **Form 8846 FICA Tip Credit Calculator**: Real-time calculation of creditable tips, Social Security portion (6.2%), Medicare portion (1.45%), and total credit (7.65%) under IRC §45B.
- **$5.15 Wage Floor Enforcement**: Accurate computation of Line 2 tip exclusions based on the statutory frozen $5.15 hourly rate.
- **Social Security Wage Base Warning**: Warns when combined wages and tips exceed the 2026 SSA wage base limit ($176,100).
- **Multi-Employee Sample Staff Tool**: Dynamic month-by-month and employee-by-employee calculations reflecting IRS workpaper requirements.
- **50-State + DC Tipped Minimum Wage Directory**: Searchable, filterable directory with 2026 state cash wages, tip credit legality, and direct one-click calculation presets.
- **Comprehensive Reference Pages**:
  - `/fica-tip-credit-calculator`: Who qualifies and credit-eligible tips vs non-eligible tips.
  - `/form-8846-instructions`: Line-by-line Form 8846 walkthrough.
  - `/5-15-minimum-wage-tip-credit-rule`: Detailed legal background on the $5.15 frozen floor.
  - `/restaurant-tip-credit-calculator`: Specific guidance for waitstaff, bartenders, tip pools, and delivery staff.
  - `/salon-tip-credit-calculator`: Guidance on why personal services are excluded and food-service exceptions.
  - `/tip-credit-vs-payroll-tax-credit`: Clear separation of wage-law tip credits, FICA income tax credits, and ERC/WOTC.
  - `/about`, `/privacy-policy`, `/disclaimer`, `/terms`: Legal and reference documentation.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite (running on port 3000)
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS + custom typography & print/tabular-nums styles

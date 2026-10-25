import { CalculatorInputs, CalculationResult } from '../types';

export const CONFIG = {
  taxYear: 2026,
  wageFloor: 5.15, // IRC §45B, fixed federal floor
  socialSecurityRate: 0.062, // 6.2% employer share
  medicareRate: 0.0145, // 1.45% employer share
  totalFicaRate: 0.0765, // 7.65% employer share
  ssWageBase: 176100, // SSA wage base for 2026
};

export function formatUSD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}

export function calculateCredit(inputs: CalculatorInputs): CalculationResult | null {
  const { reportedTips, hoursWorked, cashWages } = inputs;

  if (reportedTips <= 0 || hoursWorked <= 0) {
    return null;
  }

  // Step 1: Pay at the $5.15/hour floor
  const floorPay = CONFIG.wageFloor * hoursWorked;

  // Step 2: Excluded tips = tips needed to reach $5.15/hr; never negative, never more than total tips
  let excludedTips = Math.max(0, floorPay - cashWages);
  excludedTips = Math.min(excludedTips, reportedTips);

  // Step 3: Creditable tips
  const creditableTips = reportedTips - excludedTips;

  // Step 4: Credit (employer 7.65% = 6.2% SS + 1.45% Medicare)
  const ssPortion = creditableTips * CONFIG.socialSecurityRate;
  const medicarePortion = creditableTips * CONFIG.medicareRate;
  const totalCredit = ssPortion + medicarePortion;

  const totalTipsPlusWages = reportedTips + cashWages;
  const wageBaseExceeded = totalTipsPlusWages > CONFIG.ssWageBase;

  return {
    floorPay,
    excludedTips,
    creditableTips,
    ssPortion,
    medicarePortion,
    totalCredit,
    wageBaseExceeded,
    totalTipsPlusWages,
  };
}

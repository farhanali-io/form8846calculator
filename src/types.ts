export interface CalculatorInputs {
  reportedTips: number;
  hoursWorked: number;
  cashWages: number;
}

export interface CalculationResult {
  floorPay: number;
  excludedTips: number;
  creditableTips: number;
  ssPortion: number;
  medicarePortion: number;
  totalCredit: number;
  wageBaseExceeded: boolean;
  totalTipsPlusWages: number;
}

export interface StateRule {
  state: string;
  cashWage: string;
  cashWageValue: number;
  tipCreditAllowed: 'Yes' | 'No' | 'Conditional';
  notes: string;
  noTipCredit?: boolean;
}

export interface EmployeeRow {
  id: string;
  name: string;
  hours: number;
  cashWage: number;
  tipsReported: number;
}

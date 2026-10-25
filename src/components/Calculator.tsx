import React, { useState, useId } from 'react';
import { calculateCredit, formatUSD, CONFIG } from '../utils/calculator';
import { STATE_RULES } from '../data/stateRules';

interface CalculatorProps {
  initialTips?: string;
  initialHours?: string;
  initialWages?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({
  initialTips = '',
  initialHours = '',
  initialWages = '',
}) => {
  const [reportedTips, setReportedTips] = useState<string>(initialTips);
  const [hoursWorked, setHoursWorked] = useState<string>(initialHours);
  const [cashWages, setCashWages] = useState<string>(initialWages);
  const [selectedState, setSelectedState] = useState<string>('');

  const tipsId = useId();
  const hoursId = useId();
  const wagesId = useId();
  const stateId = useId();

  const numTips = parseFloat(reportedTips) || 0;
  const numHours = parseFloat(hoursWorked) || 0;
  const numWages = parseFloat(cashWages) || 0;

  const result = calculateCredit({
    reportedTips: numTips,
    hoursWorked: numHours,
    cashWages: numWages,
  });

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    const rule = STATE_RULES.find((s) => s.state === stateName);
    if (rule && numHours > 0) {
      const estimatedWages = (numHours * rule.cashWageValue).toFixed(2);
      setCashWages(estimatedWages);
    }
  };

  const handleReset = () => {
    setReportedTips('');
    setHoursWorked('');
    setCashWages('');
    setSelectedState('');
  };

  const loadExample = () => {
    setReportedTips('25000');
    setHoursWorked('1800');
    setCashWages('3834');
    setSelectedState('Texas');
  };

  return (
    <section className="calc-card" aria-labelledby="calc-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="calc-heading" className="text-xl font-bold text-slate-900 m-0">
          Estimate your credit
        </h2>
        <button
          type="button"
          onClick={loadExample}
          className="text-xs text-teal-700 hover:text-teal-900 font-medium underline"
        >
          Load worked example ($25k tips)
        </button>
      </div>

      <div className="calc-field">
        <label htmlFor={tipsId}>Total reported tips (USD)</label>
        <input
          type="number"
          id={tipsId}
          min="0"
          step="0.01"
          placeholder="e.g. 25000"
          value={reportedTips}
          onChange={(e) => setReportedTips(e.target.value)}
        />
        <p className="calc-help">Tips employees reported to you on which you paid employer FICA.</p>
      </div>

      <div className="calc-field">
        <label htmlFor={hoursId}>Total hours worked by tipped employees</label>
        <input
          type="number"
          id={hoursId}
          min="0"
          step="0.01"
          placeholder="e.g. 1800"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
        />
        <p className="calc-help">Sum across all tipped employees.</p>
      </div>

      <div className="calc-field">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor={wagesId} className="!mb-0">
            Cash wages paid to tipped employees (USD)
          </label>
        </div>
        <input
          type="number"
          id={wagesId}
          min="0"
          step="0.01"
          placeholder="e.g. 3834"
          value={cashWages}
          onChange={(e) => setCashWages(e.target.value)}
        />
        <p className="calc-help">Direct wages only, not including tips.</p>
      </div>

      {/* State quick helper */}
      <div className="calc-field mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <label htmlFor={stateId} className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Optional: Auto-calculate cash wages by state tipped rate
        </label>
        <select
          id={stateId}
          value={selectedState}
          onChange={handleStateSelect}
          className="text-sm bg-white"
        >
          <option value="">Select a state (e.g. Texas $2.13, California $16.90)...</option>
          {STATE_RULES.map((rule) => (
            <option key={rule.state} value={rule.state}>
              {rule.state} — Tipped min: {rule.cashWage}
            </option>
          ))}
        </select>
        {selectedState && (
          <p className="text-xs text-slate-500 mt-1">
            {STATE_RULES.find((s) => s.state === selectedState)?.notes}
          </p>
        )}
      </div>

      {result && (
        <div id="resultCard" aria-live="polite">
          <div className="result-row">
            <span className="result-label">Creditable tips</span>
            <span className="result-value" id="creditableTipsOut">
              {formatUSD(result.creditableTips)}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Social Security portion (6.2%)</span>
            <span className="result-value" id="ssPortionOut">
              {formatUSD(result.ssPortion)}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Medicare portion (1.45%)</span>
            <span className="result-value" id="medicarePortionOut">
              {formatUSD(result.medicarePortion)}
            </span>
          </div>
          <div className="result-row total">
            <span className="result-label">Estimated credit</span>
            <span className="result-value" id="totalCreditOut">
              {formatUSD(result.totalCredit)}
            </span>
          </div>
          <div id="breakdownLine">
            Creditable tips: {formatUSD(result.creditableTips)} (reported tips {formatUSD(numTips)} minus{' '}
            {formatUSD(result.excludedTips)} excluded at the ${CONFIG.wageFloor.toFixed(2)} floor)
          </div>

          {result.wageBaseExceeded && (
            <div id="wageBaseWarning" role="alert">
              <strong>Warning:</strong> Your total wages plus tips ({formatUSD(result.totalTipsPlusWages)})
              exceed the {CONFIG.taxYear} Social Security wage base of {formatUSD(CONFIG.ssWageBase)}. Tips
              above that base earn only the 1.45% Medicare portion. Recalculate per employee for accuracy.
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-teal-200 text-xs text-slate-600 flex justify-between items-center">
            <span>
              Matches IRS Form 8846: Line 1 ({formatUSD(numTips)}) − Line 2 ({formatUSD(result.excludedTips)}) =
              Line 3 ({formatUSD(result.creditableTips)}) × 7.65% = <strong>{formatUSD(result.totalCredit)}</strong>
            </span>
          </div>

          <button type="button" className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}

      <p className="calc-help" style={{ marginTop: '12px' }}>
        This is the employer's share only. Do not include the employee's 7.65%.
      </p>
    </section>
  );
};

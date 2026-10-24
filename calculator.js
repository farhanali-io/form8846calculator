// Form 8846 FICA Tip Credit Calculator
// All rates live in CONFIG — update once per year.

const CONFIG = {
  taxYear: 2026,
  wageFloor: 5.15,            // IRC §45B, fixed. Do not change.
  socialSecurityRate: 0.062,  // 6.2% employer share
  medicareRate: 0.0145,       // 1.45% employer share
  // Update this number every January with the SSA wage base:
  // https://www.ssa.gov/oact/cola/cbb.html
  ssWageBase: 176100
};

function formatUSD(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

function calculateCredit() {
  const reportedTips = parseFloat(document.getElementById('reportedTips').value) || 0;
  const hoursWorked = parseFloat(document.getElementById('hoursWorked').value) || 0;
  const cashWages    = parseFloat(document.getElementById('cashWages').value)    || 0;

  const resultCard = document.getElementById('resultCard');

  if (reportedTips <= 0 || hoursWorked <= 0) {
    resultCard.classList.add('hidden');
    return;
  }

  // Step 1: Pay at the $5.15/hour floor
  const floorPay = CONFIG.wageFloor * hoursWorked;

  // Step 2: Excluded tips = tips needed to reach $5.15/hr; never negative, never more than total tips
  let excludedTips = Math.max(0, floorPay - cashWages);
  excludedTips = Math.min(excludedTips, reportedTips);

  // Step 3: Creditable tips
  const creditableTips = reportedTips - excludedTips;

  // Step 4: Credit (employer 7.65% = 6.2% SS + 1.45% Medicare)
  const ssPortion        = creditableTips * CONFIG.socialSecurityRate;
  const medicarePortion  = creditableTips * CONFIG.medicareRate;
  const totalCredit      = ssPortion + medicarePortion;

  // Render
  document.getElementById('creditableTipsOut').textContent = formatUSD(creditableTips);
  document.getElementById('ssPortionOut').textContent      = formatUSD(ssPortion);
  document.getElementById('medicarePortionOut').textContent = formatUSD(medicarePortion);
  document.getElementById('totalCreditOut').textContent    = formatUSD(totalCredit);
  document.getElementById('breakdownLine').textContent =
    'Creditable tips: ' + formatUSD(creditableTips) +
    ' (reported tips ' + formatUSD(reportedTips) +
    ' minus ' + formatUSD(excludedTips) + ' excluded at the $5.15 floor)';

  // Warn if wages + tips may exceed the Social Security wage base
  const totalTipsPlusWages = reportedTips + cashWages;
  const warningEl = document.getElementById('wageBaseWarning');
  if (totalTipsPlusWages > CONFIG.ssWageBase) {
    warningEl.textContent = 'Warning: Your total wages plus tips (' + formatUSD(totalTipsPlusWages) +
      ') exceed the ' + CONFIG.taxYear + ' Social Security wage base of ' + formatUSD(CONFIG.ssWageBase) +
      '. Tips above that base earn only the 1.45% Medicare portion. Recalculate per employee for accuracy.';
    warningEl.classList.remove('hidden');
  } else {
    warningEl.classList.add('hidden');
  }

  resultCard.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
  const ids = ['reportedTips', 'hoursWorked', 'cashWages'];
  let timer = null;

  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(calculateCredit, 200);
    });
  });

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('resultCard').classList.add('hidden');
    });
  }
});

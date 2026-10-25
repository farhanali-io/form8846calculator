// Form 8846 FICA Tip Credit Calculator
// Production engine for calculator.toolgenie.online

const CONFIG = {
  taxYear: 2026,
  wageFloor: 5.15,
  socialSecurityRate: 0.062,
  medicareRate: 0.0145,
  ssWageBase: 176100
};

function formatUSD(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
}

function calculateCredit() {
  const tipsField = document.getElementById('reportedTipsField');
  const hoursField = document.getElementById('hoursWorkedField');
  const wagesField = document.getElementById('cashWagesField');

  const tipsInput = document.getElementById('reportedTips');
  const hoursInput = document.getElementById('hoursWorked');
  const wagesInput = document.getElementById('cashWages');

  const resultCard = document.getElementById('resultCard');
  const emptyState = document.getElementById('calcEmptyState');
  const warningEl = document.getElementById('wageBaseWarning');

  if (!tipsInput || !hoursInput || !wagesInput) return;

  // Clear past errors
  tipsField && tipsField.classList.remove('error');
  hoursField && hoursField.classList.remove('error');
  wagesField && wagesField.classList.remove('error');

  const rawTips = tipsInput.value.trim();
  const rawHours = hoursInput.value.trim();
  const rawWages = wagesInput.value.trim();

  let hasError = false;

  // Validate tips
  if (rawTips !== '') {
    const val = Number(rawTips);
    if (isNaN(val) || val < 0) {
      tipsField && tipsField.classList.add('error');
      hasError = true;
    }
  }

  // Validate hours
  if (rawHours !== '') {
    const val = Number(rawHours);
    if (isNaN(val) || val < 0) {
      hoursField && hoursField.classList.add('error');
      hasError = true;
    }
  }

  // Validate wages
  if (rawWages !== '') {
    const val = Number(rawWages);
    if (isNaN(val) || val < 0) {
      wagesField && wagesField.classList.add('error');
      hasError = true;
    }
  }

  if (hasError) {
    if (resultCard) resultCard.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  const reportedTips = parseFloat(rawTips) || 0;
  const hoursWorked = parseFloat(rawHours) || 0;
  const cashWages = parseFloat(rawWages) || 0;

  // Empty state check
  if (reportedTips <= 0 || hoursWorked <= 0) {
    if (resultCard) resultCard.classList.add('hidden');
    if (emptyState) {
      emptyState.textContent = 'Enter tips and hours to see your estimate';
      emptyState.classList.remove('hidden');
    }
    return;
  }

  // Hide empty state placeholder
  if (emptyState) emptyState.classList.add('hidden');

  // Math
  const floorPay = CONFIG.wageFloor * hoursWorked;
  let excludedTips = Math.max(0, floorPay - cashWages);
  excludedTips = Math.min(excludedTips, reportedTips);

  const creditableTips = reportedTips - excludedTips;
  const ssPortion = creditableTips * CONFIG.socialSecurityRate;
  const medicarePortion = creditableTips * CONFIG.medicareRate;
  const totalCredit = ssPortion + medicarePortion;

  // Populate output
  const creditableTipsEl = document.getElementById('creditableTipsOut');
  const ssPortionEl = document.getElementById('ssPortionOut');
  const medicarePortionEl = document.getElementById('medicarePortionOut');
  const totalCreditEl = document.getElementById('totalCreditOut');
  const breakdownLineEl = document.getElementById('breakdownLine');

  if (creditableTipsEl) creditableTipsEl.textContent = formatUSD(creditableTips);
  if (ssPortionEl) ssPortionEl.textContent = formatUSD(ssPortion);
  if (medicarePortionEl) medicarePortionEl.textContent = formatUSD(medicarePortion);
  if (totalCreditEl) totalCreditEl.textContent = formatUSD(totalCredit);

  if (breakdownLineEl) {
    breakdownLineEl.innerHTML =
      '<div>Creditable tips = ' + formatUSD(reportedTips) + ' − ' + formatUSD(excludedTips) + ' = ' + formatUSD(creditableTips) + '</div>' +
      '<div>Credit = ' + formatUSD(creditableTips) + ' × 7.65% = ' + formatUSD(totalCredit) + '</div>';
  }

  // Wage base warning
  const totalTipsPlusWages = reportedTips + cashWages;
  if (warningEl) {
    if (totalTipsPlusWages > CONFIG.ssWageBase) {
      warningEl.textContent =
        'Warning: Your total wages plus tips (' + formatUSD(totalTipsPlusWages) +
        ') exceed the ' + CONFIG.taxYear + ' Social Security wage base of ' + formatUSD(CONFIG.ssWageBase) +
        '. Tips above that base earn only the 1.45% Medicare portion. Recalculate per employee for accuracy.';
      warningEl.classList.remove('hidden');
    } else {
      warningEl.classList.add('hidden');
    }
  }

  // Store calculated data on resultCard for copy button
  if (resultCard) {
    resultCard.dataset.reportedTips = formatUSD(reportedTips);
    resultCard.dataset.hoursWorked = String(hoursWorked);
    resultCard.dataset.cashWages = formatUSD(cashWages);
    resultCard.dataset.creditableTips = formatUSD(creditableTips);
    resultCard.dataset.estimatedCredit = formatUSD(totalCredit);
    resultCard.classList.remove('hidden');
  }
}

function copyResultToClipboard() {
  const resultCard = document.getElementById('resultCard');
  const copyBtn = document.getElementById('copyBtn');
  if (!resultCard || !copyBtn) return;

  const textToCopy =
    'Form 8846 FICA Tip Credit Estimate\n' +
    'Reported tips: ' + (resultCard.dataset.reportedTips || '$0.00') + '\n' +
    'Hours worked: ' + (resultCard.dataset.hoursWorked || '0') + '\n' +
    'Cash wages paid: ' + (resultCard.dataset.cashWages || '$0.00') + '\n' +
    'Creditable tips: ' + (resultCard.dataset.creditableTips || '$0.00') + '\n' +
    'Estimated credit: ' + (resultCard.dataset.estimatedCredit || '$0.00') + '\n' +
    'Calculated at calculator.toolgenie.online';

  function onSuccess() {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.setAttribute('aria-label', 'Results copied to clipboard');
    setTimeout(function () {
      copyBtn.textContent = originalText;
      copyBtn.removeAttribute('aria-label');
    }, 2000);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(onSuccess).catch(function () {
      fallbackCopy(textToCopy, onSuccess);
    });
  } else {
    fallbackCopy(textToCopy, onSuccess);
  }
}

function fallbackCopy(text, cb) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    cb && cb();
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textarea);
}

document.addEventListener('DOMContentLoaded', function () {
  const ids = ['reportedTips', 'hoursWorked', 'cashWages'];
  let debounceTimer = null;

  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(calculateCredit, 250);
    });
  });

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.value = '';
        const field = document.getElementById(id + 'Field');
        if (field) field.classList.remove('error');
      });
      const resultCard = document.getElementById('resultCard');
      if (resultCard) resultCard.classList.add('hidden');
      const emptyState = document.getElementById('calcEmptyState');
      if (emptyState) {
        emptyState.textContent = 'Enter tips and hours to see your estimate';
        emptyState.classList.remove('hidden');
      }
      const warningEl = document.getElementById('wageBaseWarning');
      if (warningEl) warningEl.classList.add('hidden');
    });
  }

  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyResultToClipboard);
  }

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
});

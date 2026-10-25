import React, { useState, useId, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { jsPDF } from 'jspdf';
import {
  IconCalculator,
  IconCoins,
  IconClock,
  IconCash,
  IconMapPin,
  IconCopy,
  IconCheck,
  IconDownload,
  IconRotate,
  IconAlertTriangle,
  IconSparkles,
} from '@tabler/icons-react';
import { calculateCredit, formatUSD, CONFIG } from '../utils/calculator';
import { STATE_RULES } from '../data/stateRules';
import { LiquidGlass } from '@/components/ui/liquid-glass';

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
  const [searchParams] = useSearchParams();
  const stateQuery = searchParams.get('state');

  const [reportedTips, setReportedTips] = useState<string>(initialTips);
  const [hoursWorked, setHoursWorked] = useState<string>(initialHours);
  const [cashWages, setCashWages] = useState<string>(initialWages);
  const [selectedState, setSelectedState] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'generating' | 'downloaded'>('idle');

  const reduceMotion = useReducedMotion();
  const interaction = reduceMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  const tipsId = useId();
  const hoursId = useId();
  const wagesId = useId();
  const stateId = useId();

  const numTips = parseFloat(reportedTips) || 0;
  const numHours = parseFloat(hoursWorked) || 0;
  const numWages = parseFloat(cashWages) || 0;

  useEffect(() => {
    if (stateQuery) {
      const match = STATE_RULES.find((s) => s.state.toLowerCase() === stateQuery.toLowerCase());
      if (match) {
        setSelectedState(match.state);
        if (numHours > 0) {
          const estimatedWages = (numHours * match.cashWageValue).toFixed(2);
          setCashWages(estimatedWages);
        }
      }
    }
  }, [stateQuery]);

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
    setCopied(false);
    setPdfStatus('idle');
  };

  const loadExample = () => {
    setReportedTips('25000');
    setHoursWorked('1800');
    setCashWages('3834');
    setSelectedState('Texas');
  };

  const handleCopyResult = async () => {
    if (!result) return;
    const summaryText =
      'Form 8846 FICA Tip Credit Estimate\n' +
      `Reported tips: ${formatUSD(numTips)}\n` +
      `Hours worked: ${hoursWorked || '0'}\n` +
      `Cash wages paid: ${formatUSD(numWages)}\n` +
      `Creditable tips: ${formatUSD(result.creditableTips)}\n` +
      `Social Security portion (6.2%): ${formatUSD(result.ssPortion)}\n` +
      `Medicare portion (1.45%): ${formatUSD(result.medicarePortion)}\n` +
      `Estimated credit (7.65%): ${formatUSD(result.totalCredit)}\n` +
      (result.wageBaseExceeded ? `Note: SSA wage base exceeded ($${CONFIG.ssWageBase.toLocaleString()})\n` : '') +
      'Calculated on Form8846Calculator.com';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore fallback
    }
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    setPdfStatus('generating');

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });

      // Header Banner (Strict Monochrome Formal Layout)
      doc.setFillColor(0, 0, 0);
      doc.rect(40, 40, 532, 54, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('IRS FORM 8846 — FICA TIP CREDIT ESTIMATE', 54, 65);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(
        'Credit for Employer Social Security & Medicare Taxes Paid on Certain Employee Tips (IRC §45B)',
        54,
        81
      );

      // Metadata Bar
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(9);
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      doc.text(`Tax Year: ${CONFIG.taxYear}   |   Date Generated: ${today}   |   Status: Calculation Workpaper`, 40, 114);

      // Divider line
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(1);
      doc.line(40, 122, 572, 122);

      // Section 1: Employer Inputs
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text('1. Employer Payroll & Tip Inputs', 40, 142);

      let y = 160;
      const drawInputRow = (label: string, value: string) => {
        doc.setFillColor(248, 248, 248);
        doc.rect(40, y - 11, 532, 22, 'F');
        doc.setDrawColor(230, 230, 230);
        doc.rect(40, y - 11, 532, 22, 'S');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(40, 40, 40);
        doc.text(label, 50, y + 3);

        doc.setFont('helvetica', 'bold');
        doc.text(value, 560, y + 3, { align: 'right' });
        y += 26;
      };

      drawInputRow('Total Reported Food & Beverage Tips (Line 1):', formatUSD(numTips));
      drawInputRow('Total Tipped Employee Hours Worked:', `${hoursWorked || '0'} hrs`);
      drawInputRow('Direct Cash Wages Paid to Tipped Employees:', formatUSD(numWages));
      if (selectedState) {
        drawInputRow('Selected State Jurisdiction / Rate Rule:', selectedState);
      }

      // Section 2: Line-by-Line Computations
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text('2. Form 8846 Statutory Computations', 40, y);
      y += 18;

      const drawCalcRow = (lineNum: string, title: string, formula: string, amount: string, isTotal = false) => {
        if (isTotal) {
          doc.setFillColor(0, 0, 0);
          doc.rect(40, y - 12, 532, 30, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(`${lineNum}  ${title}`, 50, y + 6);
          doc.setFontSize(12);
          doc.text(amount, 560, y + 6, { align: 'right' });
          y += 36;
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(40, y - 11, 532, 24, 'F');
          doc.setDrawColor(220, 220, 220);
          doc.rect(40, y - 11, 532, 24, 'S');
          doc.setTextColor(0, 0, 0);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.text(`${lineNum}  ${title}`, 50, y + 2);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(formula, 50, y + 11);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(0, 0, 0);
          doc.text(amount, 560, y + 4, { align: 'right' });
          y += 28;
        }
      };

      drawCalcRow(
        'Line 1:',
        'Total Reported Tips on Which Employer Paid FICA',
        'Gross food & beverage tips reported by employees for the tax period',
        formatUSD(numTips)
      );

      drawCalcRow(
        'Line 2:',
        'Tips Not Subject to Credit (Statutory $5.15 Floor)',
        `($5.15 x ${hoursWorked || 0} hrs = ${formatUSD(numHours * 5.15)}) minus cash wages (${formatUSD(numWages)})`,
        `- ${formatUSD(result.excludedTips)}`
      );

      drawCalcRow(
        'Line 3:',
        'Creditable Tips (Line 1 minus Line 2)',
        'Net tips eligible for the 7.65% employer tax credit',
        formatUSD(result.creditableTips)
      );

      drawCalcRow(
        'Line 4:',
        'Form 8846 Tax Credit (Line 3 x 7.65%)',
        'Carry this amount to Form 3800 (General Business Credit), Part III, Line 4f',
        formatUSD(result.totalCredit),
        true
      );

      // Section 3: Component Breakdown
      y += 6;
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text('3. Employer FICA Component Share', 40, y);
      y += 16;

      doc.setFillColor(248, 248, 248);
      doc.rect(40, y - 10, 532, 36, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.rect(40, y - 10, 532, 36, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text(`Social Security Portion (6.20% on creditable tips): ${formatUSD(result.ssPortion)}`, 50, y + 4);
      doc.text(`Medicare Portion (1.45% on creditable tips): ${formatUSD(result.medicarePortion)}`, 50, y + 18);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Rate: 7.65%`, 430, y + 11);

      y += 48;

      // Section 4: Compliance Notes
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(0, 0, 0);
      doc.text('Tax Preparation & Filing Instructions:', 40, y);
      y += 13;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      const notes = [
        '• Form 8846 is filed with the employer federal income tax return (Forms 1120, 1120-S, 1065, or 1040 Schedule C).',
        '• The resulting credit from Line 4 transfers to Form 3800 (General Business Credit), Part III, Line 4f.',
        '• Under IRC §280C, you must reduce your income tax wage / payroll expense deduction by the credit amount claimed.',
        '• Social Security 6.2% applies up to the annual SSA wage base ($176,100 for 2026). Tips above this limit receive 1.45% Medicare credit only.',
        '• Retain Form 4070 tip declarations, POS summaries, and employee hour records for a minimum of 4 tax years.',
      ];

      notes.forEach((note) => {
        doc.text(note, 40, y);
        y += 11;
      });

      // Footer
      doc.setDrawColor(200, 200, 200);
      doc.line(40, 742, 572, 742);
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 120);
      doc.text('Form8846Calculator.com — Free FICA Tip Credit Engine', 40, 755);
      doc.text('For estimation and workpaper preparation. Consult a certified tax advisor before filing.', 572, 755, {
        align: 'right',
      });

      // Trigger instant browser download
      doc.save(`Form-8846-Credit-Estimate-${CONFIG.taxYear}.pdf`);
      setPdfStatus('downloaded');
      setTimeout(() => setPdfStatus('idle'), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      // Fallback to window.print if jsPDF encounters environment blocks
      window.print();
      setPdfStatus('idle');
    }
  };

  return (
    <>
      <section id="calculator-section" className="scroll-mt-24 mb-12 w-full max-w-full overflow-hidden print:hidden" aria-labelledby="calc-heading">
      <LiquidGlass
        tint={0.06}
        scale={28}
        bevelDepth={12}
        className="w-full max-w-full shadow-[0_12px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15 bg-neutral-950/80 backdrop-blur-2xl rounded-3xl"
        contentClassName="p-5 sm:p-8"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-xl bg-white text-black border border-white shadow-sm shrink-0">
                <IconCalculator className="size-6" />
              </span>
              <h1 id="calc-heading" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white m-0 tracking-tight">
                Form 8846 Calculator: FICA Tip Credit
              </h1>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 font-normal">
              Estimate your IRC §45B employer FICA tip tax credit. Enter reported tips, hours, and cash wages.
            </p>
          </div>

          <button
            type="button"
            onClick={loadExample}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            <IconSparkles className="size-3.5 text-white" />
            Load worked example ($25k tips)
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Tips Input */}
          <div className="space-y-2">
            <label htmlFor={tipsId} className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 uppercase tracking-wider">
              <IconCoins className="size-4 text-white" />
              Reported Tips (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold">$</span>
              <input
                type="number"
                id={tipsId}
                min="0"
                step="0.01"
                placeholder="25000"
                value={reportedTips}
                onChange={(e) => setReportedTips(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-black/90 border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-xl text-white placeholder-neutral-600 text-base font-medium outline-none transition-all"
              />
            </div>
            <p className="text-xs text-neutral-500">Tips reported with employer FICA paid.</p>
          </div>

          {/* Hours Input */}
          <div className="space-y-2">
            <label htmlFor={hoursId} className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 uppercase tracking-wider">
              <IconClock className="size-4 text-white" />
              Tipped Hours Worked
            </label>
            <input
              type="number"
              id={hoursId}
              min="0"
              step="0.01"
              placeholder="1800"
              value={hoursWorked}
              onChange={(e) => {
                const val = e.target.value;
                setHoursWorked(val);
                const hoursVal = parseFloat(val) || 0;
                if (selectedState && hoursVal > 0) {
                  const rule = STATE_RULES.find((s) => s.state === selectedState);
                  if (rule) {
                    setCashWages((hoursVal * rule.cashWageValue).toFixed(2));
                  }
                }
              }}
              className="w-full px-4 py-2.5 bg-black/90 border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-xl text-white placeholder-neutral-600 text-base font-medium outline-none transition-all"
            />
            <p className="text-xs text-neutral-500">Sum of hours worked by tipped staff.</p>
          </div>

          {/* Wages Input */}
          <div className="space-y-2">
            <label htmlFor={wagesId} className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 uppercase tracking-wider">
              <IconCash className="size-4 text-white" />
              Cash Wages Paid (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold">$</span>
              <input
                type="number"
                id={wagesId}
                min="0"
                step="0.01"
                placeholder="3834"
                value={cashWages}
                onChange={(e) => setCashWages(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-black/90 border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-xl text-white placeholder-neutral-600 text-base font-medium outline-none transition-all"
              />
            </div>
            <p className="text-xs text-neutral-500">Direct hourly wages (excluding tips).</p>
          </div>
        </div>

        {/* State Quick Rate Preset */}
        <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconMapPin className="size-4 text-white shrink-0" />
            <label htmlFor={stateId} className="text-xs font-bold text-neutral-300 uppercase tracking-wide">
              Auto-fill wages by state rate:
            </label>
          </div>
          <select
            id={stateId}
            value={selectedState}
            onChange={handleStateSelect}
            className="bg-black border border-white/20 text-white rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-white cursor-pointer w-full sm:max-w-xs"
          >
            <option value="">Select a state (e.g. Texas $2.13, California $16.90)...</option>
            {STATE_RULES.map((rule) => (
              <option key={rule.state} value={rule.state}>
                {rule.state} — Min Cash: {rule.cashWage}
              </option>
            ))}
          </select>
        </div>

        {/* Results Area */}
        {result ? (
          <div className="mt-7 p-5 sm:p-6 rounded-2xl bg-black border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white">
                IRS Form 8846 Computation
              </span>
              <span className="text-xs text-neutral-400">
                Frozen Wage Floor: ${CONFIG.wageFloor.toFixed(2)}/hr
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5 border-b border-white/10">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">Reported Tips (Line 1)</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">{formatUSD(numTips)}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">Excluded Tips (Line 2)</div>
                <div className="text-lg sm:text-xl font-bold text-neutral-300 tabular-nums">−{formatUSD(result.excludedTips)}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-neutral-300 mb-1">Creditable Tips (Line 3)</div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">{formatUSD(result.creditableTips)}</div>
              </div>
              <div className="bg-white text-black p-3.5 rounded-xl border border-white shadow-xl">
                <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-0.5">Total Credit (Line 4)</div>
                <div className="text-xl sm:text-2xl font-black text-black tabular-nums">{formatUSD(result.totalCredit)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-neutral-300">
              <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                <span className="text-neutral-400">Social Security Share (6.20%):</span>
                <span className="font-bold text-white tabular-nums">{formatUSD(result.ssPortion)}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                <span className="text-neutral-400">Medicare Share (1.45%):</span>
                <span className="font-bold text-white tabular-nums">{formatUSD(result.medicarePortion)}</span>
              </div>
            </div>

            {result.wageBaseExceeded && (
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.05] border border-white/25 flex items-start gap-2.5 text-xs text-neutral-200" role="alert">
                <IconAlertTriangle className="size-4 shrink-0 text-white mt-0.5" />
                <div>
                  <strong>Wage Base Notice:</strong> Staff wages + tips ({formatUSD(result.totalTipsPlusWages)}) exceed the {CONFIG.taxYear} Social Security wage base ({formatUSD(CONFIG.ssWageBase)}). Tips above the base earn Medicare (1.45%) only.
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2.5">
                {/* Download PDF Button */}
                <motion.button
                  {...interaction}
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={pdfStatus === 'generating'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-black hover:bg-neutral-200 shadow-md transition-all cursor-pointer disabled:opacity-75"
                >
                  {pdfStatus === 'downloaded' ? (
                    <>
                      <IconCheck className="size-4 text-black" />
                      PDF Downloaded!
                    </>
                  ) : pdfStatus === 'generating' ? (
                    <>
                      <IconDownload className="size-4 text-black animate-bounce" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <IconDownload className="size-4 text-black" />
                      Save / Download PDF
                    </>
                  )}
                </motion.button>

                {/* Copy Breakdown Button */}
                <motion.button
                  {...interaction}
                  type="button"
                  onClick={handleCopyResult}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-sm transition-all cursor-pointer"
                >
                  {copied ? <IconCheck className="size-4 text-white" /> : <IconCopy className="size-4 text-white" />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </motion.button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <IconRotate className="size-3.5" />
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-7 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-sm text-neutral-400">
            Enter tips and hours above to generate your instant Form 8846 tax credit calculation.
          </div>
        )}

        <div className="mt-4 text-center text-xs text-neutral-500">
          * This calculates the employer share only (7.65%). The employee withholding (7.65%) is not part of the credit.
        </div>
      </LiquidGlass>
    </section>

    {/* Official Form 8846 Printable Workpaper (Rendered cleanly for system printer / paper / print-to-pdf) */}
    {result && (
      <div id="official-print-sheet" className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-black m-0">IRS FORM 8846 CALCULATION WORKPAPER</h1>
              <p className="text-xs text-neutral-700 mt-1 uppercase font-semibold">
                Credit for Employer Social Security and Medicare Taxes Paid on Certain Employee Tips (IRC §45B)
              </p>
            </div>
            <div className="text-right border-2 border-black p-2.5 text-xs">
              <div className="font-bold text-[10px] tracking-wider text-neutral-600">TAX YEAR</div>
              <div className="text-2xl font-black text-black leading-none mt-0.5">{CONFIG.taxYear}</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-neutral-600 flex justify-between border-t border-neutral-300 pt-2">
            <span>Prepared: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>OMB No. 1545-1414 | Attachment Sequence No. 98</span>
            <span>Status: Verified Calculation Workpaper</span>
          </div>
        </div>

        {/* Section 1: Employer Payroll Inputs */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-black text-black m-0 mb-3">
            1. Employer Payroll & Tipped Hours Summary
          </h2>
          <table className="w-full text-xs border border-neutral-300 my-0">
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="p-2.5 font-medium text-neutral-800">Total Gross Reported Food & Beverage Tips</td>
                <td className="p-2.5 text-right font-bold tabular-nums text-black">{formatUSD(numTips)}</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="p-2.5 font-medium text-neutral-800">Total Tipped Employee Hours Worked</td>
                <td className="p-2.5 text-right font-bold tabular-nums text-black">{hoursWorked || '0'} hrs</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="p-2.5 font-medium text-neutral-800">Direct Cash Wages Paid by Employer</td>
                <td className="p-2.5 text-right font-bold tabular-nums text-black">{formatUSD(numWages)}</td>
              </tr>
              {selectedState && (
                <tr className="border-b border-neutral-200">
                  <td className="p-2.5 font-medium text-neutral-800">Selected State Jurisdiction / Wage Baseline</td>
                  <td className="p-2.5 text-right font-bold text-black">{selectedState}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Section 2: Form 8846 Statutory Lines */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-black text-black m-0 mb-3">
            2. Form 8846 Statutory Computations
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2.5 border border-neutral-300 bg-neutral-50">
              <div>
                <span className="font-bold">Line 1:</span> Total Reported Tips on Which Employer Paid FICA
                <div className="text-[10px] text-neutral-500">Gross food & beverage tips reported by employees for the tax year</div>
              </div>
              <div className="text-sm font-bold tabular-nums">{formatUSD(numTips)}</div>
            </div>

            <div className="flex justify-between items-center p-2.5 border border-neutral-300 bg-neutral-50">
              <div>
                <span className="font-bold">Line 2:</span> Tips Not Subject to the Credit (Statutory $5.15/hr Floor)
                <div className="text-[10px] text-neutral-500">
                  ($5.15 × {hoursWorked || 0} hrs = {formatUSD(numHours * 5.15)}) minus direct cash wages ({formatUSD(numWages)})
                </div>
              </div>
              <div className="text-sm font-bold tabular-nums text-neutral-800">- {formatUSD(result.excludedTips)}</div>
            </div>

            <div className="flex justify-between items-center p-2.5 border border-neutral-300 bg-neutral-50">
              <div>
                <span className="font-bold">Line 3:</span> Creditable Tips (Line 1 minus Line 2)
                <div className="text-[10px] text-neutral-500">Net tips eligible for the 7.65% employer FICA tax credit</div>
              </div>
              <div className="text-sm font-bold tabular-nums">{formatUSD(result.creditableTips)}</div>
            </div>

            <div className="flex justify-between items-center p-3 border-2 border-black bg-neutral-900 text-white">
              <div>
                <span className="font-extrabold text-sm">Line 4:</span> FORM 8846 TAX CREDIT (Line 3 × 7.65%)
                <div className="text-[10px] text-neutral-300">
                  Transfer to Form 3800 (General Business Credit), Part III, Line 4f
                </div>
              </div>
              <div className="text-xl font-black tabular-nums">{formatUSD(result.totalCredit)}</div>
            </div>
          </div>
        </div>

        {/* Section 3: Employer FICA Component Share */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-neutral-100 p-2 border-l-4 border-black text-black m-0 mb-3">
            3. Employer FICA Component Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 border border-neutral-300 bg-neutral-50">
              <div className="font-bold text-neutral-700">Social Security Share (6.20%)</div>
              <div className="text-base font-extrabold tabular-nums mt-1">{formatUSD(result.ssPortion)}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Subject to {CONFIG.taxYear} SSA wage base ($176,100)</div>
            </div>
            <div className="p-3 border border-neutral-300 bg-neutral-50">
              <div className="font-bold text-neutral-700">Medicare Share (1.45%)</div>
              <div className="text-base font-extrabold tabular-nums mt-1">{formatUSD(result.medicarePortion)}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Applies to all creditable tips without statutory wage cap</div>
            </div>
          </div>
        </div>

        {/* Section 4: Filing & Compliance Notes */}
        <div className="mb-6 text-[10.5px] leading-relaxed text-neutral-700 border-t border-neutral-300 pt-3">
          <div className="font-bold text-black mb-1">IRS Filing Instructions & Tax Compliance:</div>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Form 8846 is filed with the employer's federal income tax return (Form 1120, 1120-S, 1065, or 1040 Schedule C).</li>
            <li>Under IRC §280C, you must reduce your income tax wage / payroll expense deduction by the credit amount claimed.</li>
            <li>Credit is subject to general business credit carryback (1 year) and carryforward (20 years) under IRC §38/39.</li>
            <li>Retain Form 4070 tip statements, daily payroll registers, and POS records for at least 4 tax years.</li>
          </ul>
        </div>

        {/* Sign-off box */}
        <div className="border border-neutral-400 p-3 text-xs flex justify-between items-end mt-6 bg-neutral-50">
          <div className="space-y-4">
            <div>Preparer / Accountant: ___________________________________________</div>
            <div>Authorized Employer Signature: ___________________________________</div>
          </div>
          <div className="text-right text-[10px] text-neutral-500">
            <div className="font-bold text-black">Form8846Calculator.com</div>
            <div>Official Calculation Workpaper for Tax Year {CONFIG.taxYear}</div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Calculator;

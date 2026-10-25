import React, { useState } from 'react';
import { formatUSD, CONFIG } from '../utils/calculator';
import { EmployeeRow } from '../types';
import { LiquidGlass } from '@/components/ui/liquid-glass';
import { IconUserPlus, IconTrash, IconRotate, IconUsers } from '@tabler/icons-react';

export const MultiEmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeRow[]>([
    { id: '1', name: 'Server A', hours: 140, cashWage: 2.13, tipsReported: 2100 },
    { id: '2', name: 'Bartender B', hours: 120, cashWage: 5.00, tipsReported: 1650 },
    { id: '3', name: 'Busser C', hours: 100, cashWage: 7.25, tipsReported: 420 },
  ]);

  const [newName, setNewName] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newWage, setNewWage] = useState('');
  const [newTips, setNewTips] = useState('');

  const rows = employees.map((emp) => {
    const floorPay = emp.hours * CONFIG.wageFloor;
    const cashPaid = emp.hours * emp.cashWage;
    const rawExcluded = Math.max(0, floorPay - cashPaid);
    const excludedTips = Math.min(rawExcluded, emp.tipsReported);
    const creditableTips = emp.tipsReported - excludedTips;
    const credit = creditableTips * CONFIG.totalFicaRate;
    return {
      ...emp,
      floorPay,
      cashPaid,
      excludedTips,
      creditableTips,
      credit,
    };
  });

  const totalCreditableTips = rows.reduce((acc, r) => acc + r.creditableTips, 0);
  const totalCredit = rows.reduce((acc, r) => acc + r.credit, 0);
  const totalReported = rows.reduce((acc, r) => acc + r.tipsReported, 0);
  const totalExcluded = rows.reduce((acc, r) => acc + r.excludedTips, 0);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newHours || !newWage || !newTips) return;
    setEmployees([
      ...employees,
      {
        id: Date.now().toString(),
        name: newName,
        hours: parseFloat(newHours) || 0,
        cashWage: parseFloat(newWage) || 0,
        tipsReported: parseFloat(newTips) || 0,
      },
    ]);
    setNewName('');
    setNewHours('');
    setNewWage('');
    setNewTips('');
  };

  const handleRemove = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const handleResetDefaults = () => {
    setEmployees([
      { id: '1', name: 'Server A', hours: 140, cashWage: 2.13, tipsReported: 2100 },
      { id: '2', name: 'Bartender B', hours: 120, cashWage: 5.00, tipsReported: 1650 },
      { id: '3', name: 'Busser C', hours: 100, cashWage: 7.25, tipsReported: 420 },
    ]);
  };

  return (
    <LiquidGlass
      tint={0.06}
      scale={24}
      bevelDepth={10}
      className="my-8 border border-white/15 bg-neutral-950/80 rounded-3xl shadow-xl"
      contentClassName="p-6 sm:p-8"
    >
      <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
        <div className="flex items-center gap-2">
          <IconUsers className="size-5 text-white" />
          <h3 className="text-xl font-bold text-white m-0 tracking-tight">
            Interactive Multi-Employee Calculation (Month by Month)
          </h3>
        </div>
        <button
          type="button"
          onClick={handleResetDefaults}
          className="text-xs text-neutral-300 hover:text-white underline inline-flex items-center gap-1 cursor-pointer"
        >
          <IconRotate className="size-3.5" />
          Reset Example
        </button>
      </div>

      <p className="text-sm text-neutral-400 mb-6">
        As IRS regulations require, Line 2 cannot net across employees; one employee’s surplus cash wages
        cannot offset another’s shortfall.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/60">
        <table className="w-full text-left text-xs sm:text-sm border-collapse m-0 border-none">
          <thead>
            <tr className="border-b border-white/15 text-neutral-400 bg-white/[0.02]">
              <th className="py-3 px-3 font-bold text-white">Employee</th>
              <th className="py-3 px-3 font-bold text-white">Hours</th>
              <th className="py-3 px-3 font-bold text-white">Cash Wage</th>
              <th className="py-3 px-3 font-bold text-white">Tips Reported</th>
              <th className="py-3 px-3 font-bold text-white">$5.15 × Hours</th>
              <th className="py-3 px-3 font-bold text-white">Wages Paid</th>
              <th className="py-3 px-3 font-bold text-white">Excluded Tips</th>
              <th className="py-3 px-3 font-bold text-white">Creditable Tips</th>
              <th className="py-3 px-3 font-bold text-white">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3 font-bold text-white">{row.name}</td>
                <td className="py-3 px-3 text-neutral-300 tabular-nums">{row.hours}</td>
                <td className="py-3 px-3 text-neutral-300 tabular-nums">{formatUSD(row.cashWage)}</td>
                <td className="py-3 px-3 text-white tabular-nums">{formatUSD(row.tipsReported)}</td>
                <td className="py-3 px-3 text-neutral-500 tabular-nums">{formatUSD(row.floorPay)}</td>
                <td className="py-3 px-3 text-neutral-500 tabular-nums">{formatUSD(row.cashPaid)}</td>
                <td className="py-3 px-3 text-neutral-400 tabular-nums font-medium">{formatUSD(row.excludedTips)}</td>
                <td className="py-3 px-3 font-bold text-white tabular-nums">{formatUSD(row.creditableTips)}</td>
                <td className="py-3 px-3">
                  <button
                    type="button"
                    onClick={() => handleRemove(row.id)}
                    className="text-xs text-neutral-400 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <IconTrash className="size-3.5" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-white text-black font-extrabold border-t border-white">
              <td className="py-3 px-3 text-black font-bold">Total Staff</td>
              <td className="py-3 px-3 tabular-nums">{rows.reduce((acc, r) => acc + r.hours, 0)}</td>
              <td className="py-3 px-3">—</td>
              <td className="py-3 px-3 tabular-nums">{formatUSD(totalReported)}</td>
              <td className="py-3 px-3">—</td>
              <td className="py-3 px-3">—</td>
              <td className="py-3 px-3 text-neutral-800 tabular-nums">{formatUSD(totalExcluded)}</td>
              <td className="py-3 px-3 text-black font-black text-base tabular-nums">{formatUSD(totalCreditableTips)}</td>
              <td className="py-3 px-3">—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-5 p-4 bg-white/[0.04] border border-white/15 rounded-2xl flex flex-wrap justify-between items-center gap-3 text-sm">
        <div>
          <span className="text-neutral-400">Total creditable tips: </span>
          <span className="text-white font-bold tabular-nums">{formatUSD(totalCreditableTips)}</span>
        </div>
        <div>
          <span className="text-neutral-400">Estimated monthly tax credit (7.65%): </span>
          <span className="text-white font-black text-base tabular-nums">{formatUSD(totalCredit)}</span>
        </div>
      </div>

      <form onSubmit={handleAddEmployee} className="mt-6 pt-5 border-t border-white/10">
        <span className="text-xs font-bold text-white block mb-3 uppercase tracking-wider flex items-center gap-1.5">
          <IconUserPlus className="size-4 text-white" />
          Add Employee to Sample Workpaper
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <input
            type="text"
            placeholder="Role / Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white outline-none"
            required
          />
          <input
            type="number"
            step="1"
            placeholder="Hours (e.g. 140)"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            className="bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white outline-none"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Cash Wage $/hr"
            value={newWage}
            onChange={(e) => setNewWage(e.target.value)}
            className="bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white outline-none"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Tips Reported $"
            value={newTips}
            onChange={(e) => setNewTips(e.target.value)}
            className="bg-black border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-white outline-none"
            required
          />
          <button
            type="submit"
            className="bg-white hover:bg-neutral-200 text-black rounded-xl px-3 py-2 text-xs font-extrabold col-span-2 sm:col-span-1 shadow-md transition-all cursor-pointer"
          >
            + Add Staff
          </button>
        </div>
      </form>
    </LiquidGlass>
  );
};

export default MultiEmployeeTable;

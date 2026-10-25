import React, { useState } from 'react';
import { formatUSD, CONFIG } from '../utils/calculator';
import { EmployeeRow } from '../types';

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
    <div className="my-6 border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
        <h3 className="text-lg font-bold text-slate-900 m-0">
          Interactive Multi-Employee Calculation (Month by Month)
        </h3>
        <button
          type="button"
          onClick={handleResetDefaults}
          className="text-xs text-teal-700 hover:text-teal-900 underline"
        >
          Reset to Restaurant Example
        </button>
      </div>
      <p className="text-sm text-slate-600 mb-4">
        As IRS regulations require, Line 2 cannot net across employees; one employee’s surplus cash wages
        cannot offset another’s shortfall.
      </p>

      <div className="overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Hours</th>
              <th>Cash wage</th>
              <th>Tips reported</th>
              <th>$5.15 × hours</th>
              <th>Cash wages paid</th>
              <th>Excluded tips</th>
              <th>Creditable tips</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="font-medium text-slate-800">{row.name}</td>
                <td>{row.hours}</td>
                <td>{formatUSD(row.cashWage)}</td>
                <td>{formatUSD(row.tipsReported)}</td>
                <td>{formatUSD(row.floorPay)}</td>
                <td>{formatUSD(row.cashPaid)}</td>
                <td className="text-amber-800">{formatUSD(row.excludedTips)}</td>
                <td className="font-semibold text-teal-800">{formatUSD(row.creditableTips)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemove(row.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-semibold text-slate-900 border-t-2 border-slate-300">
              <td>Total</td>
              <td>{rows.reduce((acc, r) => acc + r.hours, 0)}</td>
              <td>—</td>
              <td>{formatUSD(totalReported)}</td>
              <td>—</td>
              <td>—</td>
              <td className="text-amber-900">{formatUSD(totalExcluded)}</td>
              <td className="text-teal-900 font-bold">{formatUSD(totalCreditableTips)}</td>
              <td>—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg flex flex-wrap justify-between items-center text-sm">
        <div>
          <span className="font-semibold text-slate-800">Total creditable tips: </span>
          <span className="text-teal-900 font-bold">{formatUSD(totalCreditableTips)}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-800">Total estimated monthly credit (7.65%): </span>
          <span className="text-teal-900 font-bold text-base">{formatUSD(totalCredit)}</span>
        </div>
      </div>

      <form onSubmit={handleAddEmployee} className="mt-4 pt-3 border-t border-slate-200">
        <span className="text-xs font-semibold text-slate-700 block mb-2 uppercase tracking-wider">
          Add Employee to Sample
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="Role/Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1.5 text-xs"
            required
          />
          <input
            type="number"
            step="1"
            placeholder="Hours (e.g. 140)"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1.5 text-xs"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Cash Wage $/hr"
            value={newWage}
            onChange={(e) => setNewWage(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1.5 text-xs"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Tips Reported $"
            value={newTips}
            onChange={(e) => setNewTips(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1.5 text-xs"
            required
          />
          <button
            type="submit"
            className="bg-teal-700 text-white rounded px-3 py-1.5 text-xs font-semibold hover:bg-teal-800 col-span-2 sm:col-span-1"
          >
            + Add Staff
          </button>
        </div>
      </form>
    </div>
  );
};

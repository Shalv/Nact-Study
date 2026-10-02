import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Plus,
  ArrowUpRight,
  Sparkles,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SalesOrder, PaymentStatus } from '../../types';

export const SalesPaymentsModule: React.FC = () => {
  const { orders, markOrderPaid, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<SalesOrder | null>(null);

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.paymentStatus === statusFilter);

  const totalCollected = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((acc, o) => acc + o.total, 0);

  const totalPending = orders
    .filter(o => o.paymentStatus === 'pending')
    .reduce((acc, o) => acc + o.total, 0);

  const handleSimulatePayment = (orderId: string) => {
    markOrderPaid(orderId);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Sales, Invoices & Payment Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track student fee payments, installment schedules, tax receipts, and payment gateway webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'paid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded transition-colors ${
                statusFilter === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <span className="text-slate-500 block">Total Gross Revenue</span>
          <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">₹24,50,000</span>
          <span className="text-emerald-600 font-medium text-[11px] mt-1 block">MTD Target: 104% Achieved</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <span className="text-slate-500 block">Realized Collections (Bank)</span>
          <span className="text-xl font-bold text-emerald-600 font-mono mt-1 block">
            ₹{totalCollected.toLocaleString('en-IN')}
          </span>
          <span className="text-slate-500 text-[11px] mt-1 block">Auto-reconciled via UPI/Gateways</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg">
          <span className="text-slate-500 block">Pending Orders in Funnel</span>
          <span className="text-xl font-bold text-amber-600 font-mono mt-1 block">
            ₹{totalPending.toLocaleString('en-IN')}
          </span>
          <span className="text-slate-500 text-[11px] mt-1 block">Counselor follow-up active</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="py-2.5 px-3">Order Number</th>
              <th className="py-2.5 px-3">Student / Buyer</th>
              <th className="py-2.5 px-3">Product Title</th>
              <th className="py-2.5 px-3">Mode</th>
              <th className="py-2.5 px-3 font-mono">Amount</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Counselor</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 font-mono font-medium text-slate-900 text-[11px]">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-900">{order.customerName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{order.customerPhone}</div>
                </td>
                <td className="py-3 px-3 max-w-xs truncate text-slate-800">
                  {order.productName}
                </td>
                <td className="py-3 px-3 text-slate-600 font-medium">{order.paymentMode}</td>
                <td className="py-3 px-3 font-mono font-bold text-slate-900 tabular-nums">
                  ₹{order.total.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                      order.paymentStatus === 'paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600">{order.counselorName}</td>
                <td className="py-3 px-3 text-right space-x-2">
                  {order.paymentStatus === 'pending' ? (
                    <button
                      onClick={() => handleSimulatePayment(order.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors"
                    >
                      Simulate Pay
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs"
                    >
                      Receipt
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Tax Invoice & Receipt</h3>
                <span className="font-mono text-slate-500 text-[11px]">{selectedInvoice.orderNumber}</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Billed To:</span>
                  <strong className="text-slate-900">{selectedInvoice.customerName}</strong>
                  <div className="text-[11px]">{selectedInvoice.customerEmail}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Payment Date:</span>
                  <strong className="text-slate-900">{selectedInvoice.date}</strong>
                  <div className="text-[11px] font-mono text-emerald-600 font-semibold">STATUS: PAID</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded p-3 space-y-2 bg-slate-50">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>{selectedInvoice.productName}</span>
                  <span className="font-mono">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Fellowship / Scholarship Discount</span>
                  <span className="font-mono text-emerald-600">-₹{selectedInvoice.discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Paid (INR)</span>
                  <span className="font-mono">₹{selectedInvoice.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">NACT Institute of Advanced Technologies</span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

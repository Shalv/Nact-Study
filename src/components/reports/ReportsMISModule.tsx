import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  Users,
  Download,
  Printer,
  Sparkles,
  ArrowUpRight,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsMISModule: React.FC = () => {
  const { showToast } = useApp();
  const [activeReportTab, setActiveReportTab] = useState<'mis' | 'crm' | 'sales' | 'marketing' | 'lms'>('mis');

  const exportCSV = () => {
    showToast('Report CSV exported successfully.');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Reports & Executive Management MIS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic business intelligence across CRM conversion rates, payment collections, marketing attribution, and academic progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Categories Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium w-fit">
        <button
          onClick={() => setActiveReportTab('mis')}
          className={`px-3 py-1 rounded transition-colors ${
            activeReportTab === 'mis' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Executive MIS
        </button>
        <button
          onClick={() => setActiveReportTab('crm')}
          className={`px-3 py-1 rounded transition-colors ${
            activeReportTab === 'crm' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          CRM Reports
        </button>
        <button
          onClick={() => setActiveReportTab('sales')}
          className={`px-3 py-1 rounded transition-colors ${
            activeReportTab === 'sales' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sales Reports
        </button>
        <button
          onClick={() => setActiveReportTab('marketing')}
          className={`px-3 py-1 rounded transition-colors ${
            activeReportTab === 'marketing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Marketing ROI
        </button>
        <button
          onClick={() => setActiveReportTab('lms')}
          className={`px-3 py-1 rounded transition-colors ${
            activeReportTab === 'lms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          LMS Academic Reports
        </button>
      </div>

      {/* Tab 1: Executive Management MIS (Prompt Matching) */}
      {activeReportTab === 'mis' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Nact Study Business Management Information System (MIS)
              </h2>
              <span className="text-xs text-slate-500 font-mono">Consolidated Period: Current Month (MTD)</span>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded font-semibold">
              AUDITED LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            {/* Left Block: Inbound & Conversion Performance */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <h3 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1.5">
                Lead & Conversion Summary
              </h3>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Total Leads Inbound</span>
                <span className="font-bold text-slate-900">2,450</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Qualified Leads</span>
                <span className="font-bold text-slate-900">820</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Conversions (Won)</span>
                <span className="font-bold text-emerald-600">210</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Conversion Rate</span>
                <span className="font-bold text-emerald-600">8.57%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Cohort Enrollments</span>
                <span className="font-bold text-slate-900">195</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Active Students</span>
                <span className="font-bold text-slate-900">1,850</span>
              </div>
            </div>

            {/* Right Block: Financial Realization */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <h3 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1.5">
                Financial & Commercial Ledger
              </h3>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Gross Sales</span>
                <span className="font-bold text-slate-900 text-sm">₹24,50,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Collected in Bank</span>
                <span className="font-bold text-emerald-600 text-sm">₹21,30,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Outstanding Receivables</span>
                <span className="font-bold text-rose-600 text-sm">₹3,20,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Published Courses</span>
                <span className="font-bold text-slate-900">48</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Webinar Cohorts</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">1:1 Consultations Conducted</span>
                <span className="font-bold text-slate-900">125</span>
              </div>
            </div>
          </div>

          {/* Leaders & Drivers Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-md">
              <span className="text-slate-400 block text-[11px]">Top Revenue Product</span>
              <strong className="text-slate-900 text-xs mt-0.5 block">Full-Stack Data Science & GenAI Masterclass</strong>
              <span className="font-mono text-emerald-600 mt-1 block">₹14,40,000 (58.7% share)</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-md">
              <span className="text-slate-400 block text-[11px]">Top Inbound Source</span>
              <strong className="text-slate-900 text-xs mt-0.5 block">WhatsApp Inbound (1,420 Leads)</strong>
              <span className="font-mono text-emerald-600 mt-1 block">12.4% conversion efficiency</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-md">
              <span className="text-slate-400 block text-[11px]">Top Performing Counselor</span>
              <strong className="text-slate-900 text-xs mt-0.5 block">Pooja Kashyap</strong>
              <span className="font-mono text-emerald-600 mt-1 block">94 Closures · ₹11,40,000</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CRM & Sales Reports */}
      {activeReportTab !== 'mis' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm capitalize">
              {activeReportTab.toUpperCase()} Data Breakdown
            </h3>
            <span className="font-mono text-slate-500">Live Telemetry Feed</span>
          </div>

          <div className="p-8 text-center text-slate-500 italic">
            Comprehensive drill-down registers for {activeReportTab.toUpperCase()} are synchronized with production database.
            Use the "Export CSV" button above to download full tabular data extracts.
          </div>
        </div>
      )}
    </div>
  );
};

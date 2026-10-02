import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Save,
  Check,
  CreditCard,
  Key,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsMasterDataModule: React.FC = () => {
  const { showToast } = useApp();

  const [categories, setCategories] = useState([
    'Data Science & AI',
    'Applied Machine Learning',
    'Finance & Valuation',
    'Tech Leadership',
    'Cloud & Distributed Systems'
  ]);

  const [leadSources, setLeadSources] = useState([
    'WhatsApp Inbound',
    'Meta Ads',
    'Google Search',
    'Organic YouTube',
    'Referral',
    'Webinar Reg'
  ]);

  const [lostReasons, setLostReasons] = useState([
    'Budget constraints / Fee too high',
    'Batch timings conflict with office hours',
    'Joined alternative university / bootcamp',
    'Candidate unresponsive after 5 attempts',
    'Language / prerequisite mismatch'
  ]);

  const [taxPercent, setTaxPercent] = useState(18);
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_849204910249');
  const [whatsappApiStatus, setWhatsappApiStatus] = useState('Connected (200 OK)');
  const [smtpStatus, setSmtpStatus] = useState('Active (SES-India)');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Master configuration settings saved successfully.');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            System Configuration & Master Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin master lists, lead qualification criteria, lost reasons, tax regimes, and integration webhooks.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Master Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Course & Product Categories */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">Academic & Product Categories</h3>
            <span className="font-mono text-[11px] text-slate-400">{categories.length} entries</span>
          </div>

          <div className="space-y-1.5">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between">
                <span className="text-slate-800 font-medium">{cat}</span>
                <span className="text-[10px] text-slate-400 font-mono">ID: CAT-0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Inbound Sources */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">CRM Lead Channels & UTM Sources</h3>
            <span className="font-mono text-[11px] text-slate-400">{leadSources.length} sources</span>
          </div>

          <div className="space-y-1.5">
            {leadSources.map((src, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between">
                <span className="text-slate-800 font-medium">{src}</span>
                <span className="text-emerald-600 text-[10px] font-mono">Live Ingestion</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Lost Disqualification Reasons */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">Standardized Lost & Drop-Off Reasons</h3>
            <span className="font-mono text-[11px] text-slate-400">Counselor Mandate</span>
          </div>

          <div className="space-y-1.5">
            {lostReasons.map((reason, idx) => (
              <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700">
                {reason}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Gateways & Tax Compliance */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900">Commercial, Tax & Gateway Configuration</h3>
            <span className="font-mono text-emerald-600 text-[10px]">Production</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Standard GST / Tax Rate (%)</label>
              <input
                type="number"
                value={taxPercent}
                onChange={e => setTaxPercent(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Razorpay Live Key ID</label>
              <input
                type="text"
                value={razorpayKey}
                onChange={e => setRazorpayKey(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
              />
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
              <span className="text-slate-700 font-medium">WhatsApp Cloud API Webhook:</span>
              <span className="text-emerald-700 font-mono font-semibold">{whatsappApiStatus}</span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
              <span className="text-slate-700 font-medium">Outbound Transactional SMTP:</span>
              <span className="text-emerald-700 font-mono font-semibold">{smtpStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

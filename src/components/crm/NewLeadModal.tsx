import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductType } from '../../types';

interface NewLeadModalProps {
  onClose: () => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({ onClose }) => {
  const { addLead, courses, users } = useApp();

  const counselors = users.filter(u => u.role === 'Counselor' || u.role === 'Super Admin');

  const [form, setForm] = useState({
    name: '',
    mobile: '+91 ',
    whatsapp: '+91 ',
    email: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    source: 'WhatsApp Inbound' as const,
    campaign: 'Direct_Website_Inquiry',
    interestedProduct: courses[0]?.title || 'Full-Stack Data Science & Generative AI Masterclass',
    productId: courses[0]?.id || 'crs-1',
    productType: 'Course' as ProductType,
    budget: 28800,
    stage: 'new' as const,
    assignedCounselorId: counselors[0]?.id || 'usr-4',
    assignedCounselorName: counselors[0]?.name || 'Pooja Kashyap',
    priority: 'High' as const,
    qualification: 'B.Tech / MCA',
    experienceYears: 3,
    occupation: 'Software Engineer',
    nextFollowUpDate: new Date().toISOString().split('T')[0],
    nextFollowUpTime: '16:00',
    followUpType: 'WhatsApp' as const,
    remarks: 'Candidate requested cohort timing and syllabus overview.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Capture New Prospective Lead</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Candidate Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Mobile Contact *</label>
              <input
                type="text"
                required
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value, whatsapp: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={form.whatsapp}
                onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="e.g. priya@company.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">City & State</label>
              <input
                type="text"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Inbound Channel / Source</label>
              <select
                value={form.source}
                onChange={e => setForm({ ...form, source: e.target.value as any })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white"
              >
                <option value="WhatsApp Inbound">WhatsApp Inbound</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Google Search">Google Search</option>
                <option value="Organic YouTube">Organic YouTube</option>
                <option value="Referral">Referral</option>
                <option value="Webinar Reg">Webinar Reg</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Target Product / Course</label>
              <select
                value={form.productId}
                onChange={e => {
                  const sel = courses.find(c => c.id === e.target.value);
                  setForm({
                    ...form,
                    productId: e.target.value,
                    interestedProduct: sel?.title || form.interestedProduct,
                    budget: sel?.finalPrice || 28800
                  });
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} (₹{c.finalPrice.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Estimated Budget (₹)</label>
              <input
                type="number"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: Number(e.target.value) })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Assign Counselor</label>
              <select
                value={form.assignedCounselorName}
                onChange={e => {
                  const c = counselors.find(u => u.name === e.target.value);
                  setForm({
                    ...form,
                    assignedCounselorName: e.target.value,
                    assignedCounselorId: c?.id || 'usr-4'
                  });
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white font-medium"
              >
                {counselors.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as any })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white"
              >
                <option value="High">High (Immediate Hot Inbound)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Occupation / Company</label>
              <input
                type="text"
                value={form.occupation}
                onChange={e => setForm({ ...form, occupation: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
              />
            </div>
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-md text-[11px] text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Auto-Trigger Enabled: Saving this lead will automatically dispatch the <strong>"lead_welcome"</strong> WhatsApp template and initialize a conversation thread.
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-medium transition-colors"
            >
              Create Lead & Trigger Welcome
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

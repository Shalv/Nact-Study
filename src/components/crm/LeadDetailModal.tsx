import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Clock,
  User,
  CreditCard,
  Send,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStage } from '../../types';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const {
    updateLeadStage,
    addLeadTimelineItem,
    sendWhatsAppMessage,
    whatsAppConversations,
    createOrderAndPaymentLink,
    currentRole,
    users,
    updateLead,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'timeline' | 'details' | 'followup'>('timeline');
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'note' | 'call' | 'whatsapp' | 'demo'>('call');
  const [customStage, setCustomStage] = useState<LeadStage>(lead.stage);

  // Quick WhatsApp message
  const [quickMsg, setQuickMsg] = useState('');

  const counselors = users.filter(u => u.role === 'Counselor' || u.role === 'Super Admin');

  const stages: { stage: LeadStage; label: string }[] = [
    { stage: 'new', label: 'New' },
    { stage: 'assigned', label: 'Assigned' },
    { stage: 'contacted', label: 'Contacted' },
    { stage: 'interested', label: 'Interested' },
    { stage: 'qualified', label: 'Qualified' },
    { stage: 'counselling_scheduled', label: 'Counselling Scheduled' },
    { stage: 'counselling_completed', label: 'Counselling Completed' },
    { stage: 'proposal_offer', label: 'Proposal / Offer' },
    { stage: 'payment_pending', label: 'Payment Pending' },
    { stage: 'won', label: 'Won / Enrolled' },
    { stage: 'lost', label: 'Lost' },
    { stage: 'not_interested', label: 'Not Interested' },
  ];

  const handleStageChange = (newStage: LeadStage) => {
    setCustomStage(newStage);
    updateLeadStage(lead.id, newStage);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addLeadTimelineItem(lead.id, {
      title: noteType === 'call' ? 'Counselor Call Log' : noteType === 'demo' ? 'Demo Session Note' : 'Internal Note',
      description: newNote,
      author: currentRole,
      type: noteType
    });

    setNewNote('');
  };

  const handleSendQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;

    const conv = whatsAppConversations.find(c => c.phone === lead.whatsapp);
    if (conv) {
      sendWhatsAppMessage(conv.id, quickMsg);
    }

    addLeadTimelineItem(lead.id, {
      title: 'WhatsApp Message Sent',
      description: quickMsg,
      author: currentRole,
      type: 'whatsapp'
    });

    setQuickMsg('');
  };

  const handleGeneratePaymentLink = () => {
    createOrderAndPaymentLink(lead.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
              {lead.code}
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">{lead.name}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{lead.city}, {lead.state}</span>
                <span>·</span>
                <span className="text-indigo-600 font-medium">{lead.source}</span>
                <span>·</span>
                <span>Created {new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {lead.stage !== 'won' && (
              <button
                onClick={handleGeneratePaymentLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Send Payment Link</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Selector Bar */}
        <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-medium text-slate-600">Current Pipeline Stage:</span>
            <select
              value={customStage}
              onChange={e => handleStageChange(e.target.value as LeadStage)}
              className="px-2.5 py-1 font-semibold text-slate-900 bg-white border border-slate-300 rounded shadow-2xs focus:ring-1 focus:ring-indigo-500 text-xs"
            >
              {stages.map(s => (
                <option key={s.stage} value={s.stage}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-slate-600 shrink-0">
            <span>Budget: <strong className="text-slate-900 font-mono">₹{lead.budget.toLocaleString('en-IN')}</strong></span>
            <span>·</span>
            <span>Priority: <strong className={`font-semibold ${lead.priority === 'High' ? 'text-rose-600' : 'text-slate-700'}`}>{lead.priority}</strong></span>
            <span>·</span>
            <span>Counselor: <strong className="text-slate-900">{lead.assignedCounselorName}</strong></span>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="flex border-b border-slate-200 px-4 bg-white text-xs font-medium">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Activity Timeline ({lead.timeline.length})
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Customer Profile 360°
          </button>
          <button
            onClick={() => setActiveTab('followup')}
            className={`py-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'followup'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Follow-Up & Scheduling
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50">
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {/* Quick WhatsApp Sender Box */}
              <form onSubmit={handleSendQuickWhatsApp} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant WhatsApp to {lead.whatsapp}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Delivered via Nact Cloud API</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type customized reply or choose a template..."
                    value={quickMsg}
                    onChange={e => setQuickMsg(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </div>
              </form>

              {/* Add Interaction Log */}
              <form onSubmit={handleAddNote} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Log Interaction Note / Call Outcome</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNoteType('call')}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${noteType === 'call' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-500'}`}
                    >
                      Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteType('demo')}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${noteType === 'demo' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-500'}`}
                    >
                      Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteType('note')}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${noteType === 'note' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-500'}`}
                    >
                      Internal Note
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter discussion notes, objections, or commitment details..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Activity</span>
                  </button>
                </div>
              </form>

              {/* Chronological Activity Timeline */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-slate-900 mb-3">Unified Customer Interaction Timeline</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
                  {lead.timeline.map(item => (
                    <div key={item.id} className="relative flex items-start gap-3 pl-7">
                      <div className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                      <div className="flex-1 bg-slate-50/70 p-2.5 rounded-md border border-slate-100 text-xs">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                          <span>{item.title}</span>
                          <span className="font-mono text-[10px] text-slate-400">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.description}</p>
                        <div className="text-[10px] text-slate-400 mt-1 font-medium">Logged by: {item.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">
                  Personal & Professional Profile
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Candidate Name</span>
                    <span className="font-medium text-slate-900">{lead.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mobile Number</span>
                    <span className="font-mono font-medium text-slate-900">{lead.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">WhatsApp</span>
                    <span className="font-mono font-medium text-slate-900">{lead.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Address</span>
                    <span className="font-medium text-slate-900">{lead.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Qualification</span>
                    <span className="font-medium text-slate-900">{lead.qualification}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Occupation / Role</span>
                    <span className="font-medium text-slate-900">{lead.occupation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Experience</span>
                    <span className="font-medium text-slate-900">{lead.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Location</span>
                    <span className="font-medium text-slate-900">{lead.city}, {lead.state}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">
                  Academic Interest & Attribution
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Interested Product</span>
                    <span className="font-medium text-indigo-700">{lead.interestedProduct}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Product Type</span>
                    <span className="font-medium text-slate-900">{lead.productType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Lead Source</span>
                    <span className="font-medium text-slate-900">{lead.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Campaign Tag</span>
                    <span className="font-mono text-slate-700">{lead.campaign}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assigned Counselor</span>
                    <span className="font-semibold text-slate-900">{lead.assignedCounselorName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'followup' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1">
                Next Follow-Up Commitment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Follow-Up Date</label>
                  <input
                    type="date"
                    defaultValue={lead.nextFollowUpDate}
                    onChange={e => updateLead(lead.id, { nextFollowUpDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Follow-Up Time</label>
                  <input
                    type="time"
                    defaultValue={lead.nextFollowUpTime}
                    onChange={e => updateLead(lead.id, { nextFollowUpTime: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Communication Channel</label>
                  <select
                    defaultValue={lead.followUpType}
                    onChange={e => updateLead(lead.id, { followUpType: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Video Demo">Video Demo</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Counselor Remarks</label>
                <textarea
                  rows={3}
                  defaultValue={lead.remarks}
                  onBlur={e => updateLead(lead.id, { remarks: e.target.value })}
                  placeholder="Specific requirements, objections raised, payment terms discussed..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Contact,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Mail,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';

export const ContactList: React.FC = () => {
  const { leads, setSelectedLeadForDetail, setActiveModule } = useApp();
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<Lead>(leads[0]);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.mobile.includes(search)
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            CRM Contacts 360° Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified customer profiles across personal, professional, marketing attribution, and academic history.
          </p>
        </div>

        <button
          onClick={() => setActiveModule('leads')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-900"
        >
          Go to Lead Pipeline Kanban →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Contact List */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs flex flex-col h-[650px]">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2 text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs"
            />
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 text-xs">
            {filtered.map(contact => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedContact?.id === contact.id
                    ? 'bg-indigo-50/60 border-l-3 border-indigo-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>{contact.name}</span>
                  <span className="font-mono text-[10px] text-slate-400">{contact.code}</span>
                </div>
                <div className="text-[11px] text-slate-500">{contact.email}</div>
                <div className="text-[11px] text-indigo-600 font-medium truncate mt-0.5">
                  {contact.interestedProduct}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 360° Record Card */}
        {selectedContact && (
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-xs">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-[11px] text-slate-400">{selectedContact.code}</span>
                <h2 className="text-lg font-bold text-slate-900">{selectedContact.name}</h2>
                <div className="text-slate-500 text-xs mt-0.5">
                  {selectedContact.city}, {selectedContact.state} · Joined {new Date(selectedContact.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedLeadForDetail(selectedContact);
                  setActiveModule('leads');
                }}
                className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Inspect Pipeline Timeline
              </button>
            </div>

            {/* 4 Categorized Record Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Personal */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  1. Personal & Contact
                </h3>
                <div className="space-y-1 text-slate-600">
                  <div>Mobile: <strong className="text-slate-900 font-mono">{selectedContact.mobile}</strong></div>
                  <div>WhatsApp: <strong className="text-slate-900 font-mono">{selectedContact.whatsapp}</strong></div>
                  <div>Email: <strong className="text-slate-900">{selectedContact.email}</strong></div>
                  <div>Location: <strong className="text-slate-900">{selectedContact.city}, {selectedContact.state}</strong></div>
                </div>
              </div>

              {/* 2. Professional */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  2. Professional Background
                </h3>
                <div className="space-y-1 text-slate-600">
                  <div>Qualification: <strong className="text-slate-900">{selectedContact.qualification}</strong></div>
                  <div>Occupation: <strong className="text-slate-900">{selectedContact.occupation}</strong></div>
                  <div>Experience: <strong className="text-slate-900">{selectedContact.experienceYears} Years</strong></div>
                  <div>Counselor: <strong className="text-slate-900">{selectedContact.assignedCounselorName}</strong></div>
                </div>
              </div>

              {/* 3. Marketing UTMs */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  3. Marketing & Attribution
                </h3>
                <div className="space-y-1 text-slate-600">
                  <div>Inbound Channel: <strong className="text-indigo-600 font-semibold">{selectedContact.source}</strong></div>
                  <div>Campaign Tag: <strong className="text-slate-900 font-mono">{selectedContact.campaign}</strong></div>
                  <div>Priority: <strong className="text-slate-900">{selectedContact.priority}</strong></div>
                  <div>Landing Page: <strong className="text-slate-900">/creator/dr-rajesh-sharma</strong></div>
                </div>
              </div>

              {/* 4. Commercial & Academic Interest */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  4. Commercial Interest
                </h3>
                <div className="space-y-1 text-slate-600">
                  <div>Target Product: <strong className="text-slate-900">{selectedContact.interestedProduct}</strong></div>
                  <div>Estimated Budget: <strong className="text-slate-900 font-mono">₹{selectedContact.budget.toLocaleString('en-IN')}</strong></div>
                  <div>Pipeline Status: <strong className="capitalize text-slate-900">{selectedContact.stage.replace('_', ' ')}</strong></div>
                  <div>Next Follow-Up: <strong className="text-slate-900 font-mono">{selectedContact.nextFollowUpDate} at {selectedContact.nextFollowUpTime}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

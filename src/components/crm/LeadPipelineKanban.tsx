import React, { useState } from 'react';
import {
  KanbanSquare,
  List,
  Search,
  Filter,
  Plus,
  MessageSquare,
  PhoneCall,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStage } from '../../types';

interface LeadPipelineKanbanProps {
  onOpenNewLeadModal: () => void;
}

export const LeadPipelineKanban: React.FC<LeadPipelineKanbanProps> = ({ onOpenNewLeadModal }) => {
  const { leads, updateLeadStage, setSelectedLeadForDetail, createOrderAndPaymentLink } = useApp();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [counselorFilter, setCounselorFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const pipelineColumns: { stage: LeadStage; title: string; color: string }[] = [
    { stage: 'new', title: 'New Leads', color: 'border-slate-300' },
    { stage: 'assigned', title: 'Assigned', color: 'border-sky-300' },
    { stage: 'contacted', title: 'Contacted', color: 'border-blue-300' },
    { stage: 'interested', title: 'Interested', color: 'border-indigo-300' },
    { stage: 'qualified', title: 'Qualified', color: 'border-purple-300' },
    { stage: 'counselling_scheduled', title: 'Counselling Scheduled', color: 'border-amber-300' },
    { stage: 'counselling_completed', title: 'Counselling Done', color: 'border-orange-300' },
    { stage: 'proposal_offer', title: 'Proposal Sent', color: 'border-cyan-300' },
    { stage: 'payment_pending', title: 'Payment Pending', color: 'border-pink-300' },
    { stage: 'won', title: 'Won / Enrolled', color: 'border-emerald-400' },
  ];

  // Stage order for advancing
  const stageOrder: LeadStage[] = [
    'new',
    'assigned',
    'contacted',
    'interested',
    'qualified',
    'counselling_scheduled',
    'counselling_completed',
    'proposal_offer',
    'payment_pending',
    'won',
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interestedProduct.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCounselor = counselorFilter === 'all' || lead.assignedCounselorName === counselorFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesCounselor && matchesSource;
  });

  const advanceStage = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    const currentIndex = stageOrder.indexOf(lead.stage);
    if (currentIndex >= 0 && currentIndex < stageOrder.length - 1) {
      updateLeadStage(lead.id, stageOrder[currentIndex + 1]);
    }
  };

  const counselorsList = Array.from(new Set(leads.map(l => l.assignedCounselorName)));
  const sourcesList = Array.from(new Set(leads.map(l => l.source)));

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Top Header & Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Lead Management & Pipeline</span>
            <span className="text-xs font-mono font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {filteredLeads.length} active leads
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full 10-stage admissions conversion funnel from initial capture to payment confirmation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={onOpenNewLeadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name, code, phone, or course..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={counselorFilter}
            onChange={e => setCounselorFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white text-slate-700"
          >
            <option value="all">All Counselors</option>
            {counselorsList.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white text-slate-700"
          >
            <option value="all">All Channels / Sources</option>
            {sourcesList.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View Mode 1: Kanban Board */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-3 overflow-x-auto pb-4 items-start min-h-[600px]">
          {pipelineColumns.map(col => {
            const colLeads = filteredLeads.filter(l => l.stage === col.stage);
            const colTotalValue = colLeads.reduce((acc, l) => acc + (l.budget || 0), 0);

            return (
              <div
                key={col.stage}
                className="w-72 shrink-0 bg-slate-100/70 border border-slate-200 rounded-lg flex flex-col max-h-[750px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 border-t-2 ${col.color} bg-white rounded-t-lg border-b border-slate-200`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{col.title}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                      {colLeads.length}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono tabular-nums mt-0.5">
                    ₹{colTotalValue.toLocaleString('en-IN')} pipeline
                  </div>
                </div>

                {/* Column Cards Container */}
                <div className="p-2 space-y-2.5 overflow-y-auto flex-1">
                  {colLeads.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-400 italic">
                      No leads in this stage
                    </div>
                  ) : (
                    colLeads.map(lead => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadForDetail(lead)}
                        className="p-3 bg-white border border-slate-200 rounded-md shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all cursor-pointer group text-xs space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-[10px] text-slate-500 font-medium">
                            {lead.code}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                              lead.priority === 'High'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {lead.priority}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {lead.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {lead.interestedProduct}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="font-mono font-semibold text-slate-800">
                            ₹{lead.budget.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-400">{lead.source}</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                          <span className="truncate max-w-[120px]">
                            {lead.assignedCounselorName}
                          </span>

                          {lead.stage !== 'won' && (
                            <button
                              onClick={e => advanceStage(e, lead)}
                              title="Advance to next pipeline stage"
                              className="flex items-center gap-0.5 text-indigo-600 hover:text-indigo-900 font-semibold px-1.5 py-0.5 rounded hover:bg-indigo-50 transition-colors"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode 2: Full Data Table */
        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Lead Code</th>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Interested Course</th>
                <th className="py-2.5 px-3">Channel / Source</th>
                <th className="py-2.5 px-3">Budget</th>
                <th className="py-2.5 px-3">Stage</th>
                <th className="py-2.5 px-3">Counselor</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLeadForDetail(lead)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 font-medium">
                    {lead.code}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-[11px] text-slate-400">{lead.city}, {lead.state}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-mono text-[11px] text-slate-700">{lead.mobile}</div>
                    <div className="text-[11px] text-slate-400">{lead.email}</div>
                  </td>
                  <td className="py-2.5 px-3 max-w-xs truncate text-slate-800">
                    {lead.interestedProduct}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{lead.source}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                    ₹{lead.budget.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium capitalize bg-slate-100 text-slate-700">
                      {lead.stage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{lead.assignedCounselorName}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedLeadForDetail(lead);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

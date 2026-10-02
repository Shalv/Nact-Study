import React, { useState } from 'react';
import {
  Mail,
  Send,
  Plus,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
  Eye,
  MousePointer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmailCampaign } from '../../types';

export const EmailModule: React.FC = () => {
  const { emailCampaigns, createEmailCampaign, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'drip-sequence'>('campaigns');
  const [showNewCampModal, setShowNewCampModal] = useState(false);

  const [campName, setCampName] = useState('');
  const [campSubject, setCampSubject] = useState('');
  const [campAudience, setCampAudience] = useState('Qualified Inbound Leads (820)');
  const [campContent, setCampContent] = useState('');

  const dripSteps = [
    {
      day: 'Day 0',
      title: 'Lead Inbound Welcome & Full Syllabus PDF',
      purpose: 'Immediate trust establishment with faculty credentials & capstone project repository.',
      openRate: '68.4%',
      clickRate: '38.2%'
    },
    {
      day: 'Day 1',
      title: 'Technical Deep-Dive: Enterprise Architecture Stack',
      purpose: 'Why PyTorch, Transformers, and MLOps are standard in high-paying engineering roles.',
      openRate: '54.2%',
      clickRate: '26.8%'
    },
    {
      day: 'Day 3',
      title: 'Alumni Spotlight: 180% Salary Hike Transition Case Study',
      purpose: 'Concrete proof showing portfolio transformation and interview walkthrough.',
      openRate: '49.1%',
      clickRate: '21.5%'
    },
    {
      day: 'Day 5',
      title: 'Limited Fellowship: Claim 20% Early Bird Fellowship',
      purpose: 'Urgency-driven commercial incentive before cohort seat capacity closes.',
      openRate: '52.7%',
      clickRate: '29.3%'
    },
    {
      day: 'Day 7',
      title: 'Final Call: Complimentary 15-Min Counselor Advisory Call',
      purpose: 'Personalized admissions consultation link before registration lockout.',
      openRate: '44.0%',
      clickRate: '19.8%'
    }
  ];

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    createEmailCampaign({
      name: campName,
      subject: campSubject,
      sender: 'Dr. Rajesh Sharma & Council <admissions@nactstudy.com>',
      audience: campAudience,
      scheduledDate: new Date().toISOString().split('T')[0],
      content: campContent
    });
    setShowNewCampModal(false);
    setCampName('');
    setCampSubject('');
    setCampContent('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Email Marketing & 7-Day Nurture Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliver scheduled newsletters, cohort announcements, and automated multi-touch drip journeys.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'campaigns' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Email Campaigns ({emailCampaigns.length})
            </button>
            <button
              onClick={() => setActiveTab('drip-sequence')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'drip-sequence' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7-Day Nurture Drip Workflow
            </button>
          </div>

          <button
            onClick={() => setShowNewCampModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Campaigns Table */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Total Emails Dispatched (MTD)</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">4,060</span>
              <span className="text-emerald-600 font-medium text-[11px] mt-1 block">99.4% Delivery Success</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Average Open Rate</span>
              <span className="text-xl font-bold text-indigo-600 font-mono mt-1 block">50.5%</span>
              <span className="text-slate-400 text-[11px] mt-1 block">EdTech benchmark: 28%</span>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <span className="text-slate-500 block">Average Click-Through Rate</span>
              <span className="text-xl font-bold text-emerald-600 font-mono mt-1 block">21.2%</span>
              <span className="text-slate-400 text-[11px] mt-1 block">High commercial intent</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Campaign Name & Subject</th>
                  <th className="py-2.5 px-3">Audience Segment</th>
                  <th className="py-2.5 px-3 font-mono">Dispatched</th>
                  <th className="py-2.5 px-3 font-mono">Open Rate</th>
                  <th className="py-2.5 px-3 font-mono">Click Rate</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {emailCampaigns.map(camp => (
                  <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{camp.name}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-sm mt-0.5">{camp.subject}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{camp.audience}</td>
                    <td className="py-3 px-3 font-mono text-slate-900 font-medium">{camp.sentCount.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-indigo-600 font-semibold">{camp.openRate}%</td>
                    <td className="py-3 px-3 font-mono text-emerald-600 font-semibold">{camp.clickRate}%</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium rounded text-[11px]">
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400 text-[11px]">{camp.scheduledDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 7-Day Nurture Drip Workflow Visualizer */}
      {activeTab === 'drip-sequence' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Automated 7-Day Lead Nurture Journey
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically triggered whenever a lead is created from Meta Ads, Google, or Organic forms.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              Running for 1,420 Active Leads
            </span>
          </div>

          <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-200">
            {dripSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-12 text-xs">
                <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono text-[10px] font-bold ring-4 ring-white">
                  {idx + 1}
                </div>

                <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-600 uppercase">{step.day}</span>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-indigo-500" /> Open: <strong className="text-slate-800">{step.openRate}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <MousePointer className="w-3 h-3 text-emerald-500" /> Click: <strong className="text-slate-800">{step.clickRate}</strong>
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewCampModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Create & Broadcast Email Campaign</h3>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Campaign Internal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. October Live Cohort Scholarship Reminder"
                  value={campName}
                  onChange={e => setCampName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email Subject Line *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. [Exclusive] Early Bird Fellowship Expiring in 24 Hours"
                  value={campSubject}
                  onChange={e => setCampSubject(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Audience Segment</label>
                <select
                  value={campAudience}
                  onChange={e => setCampAudience(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white font-medium"
                >
                  <option value="Qualified Inbound Leads (820)">Qualified Inbound Leads (820)</option>
                  <option value="Enrolled Cohort Students (1,850)">Enrolled Cohort Students (1,850)</option>
                  <option value="Webinar Attendees (340)">Webinar Attendees (340)</option>
                  <option value="All CRM Contacts (3,400)">All CRM Contacts (3,400)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email Body Content</label>
                <textarea
                  rows={4}
                  required
                  value={campContent}
                  onChange={e => setCampContent(e.target.value)}
                  placeholder="Write announcement body or markdown copy..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewCampModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800"
                >
                  Schedule Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

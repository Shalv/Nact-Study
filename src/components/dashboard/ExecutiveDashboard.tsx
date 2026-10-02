import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  TrendingUp,
  CreditCard,
  BookOpen,
  GraduationCap,
  Calendar,
  Award,
  ArrowUpRight,
  Filter,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExecutiveDashboard: React.FC = () => {
  const { leads, courses, orders, setActiveModule, setSelectedLeadForDetail } = useApp();
  const [funnelFilter, setFunnelFilter] = useState<'month' | 'quarter' | 'all'>('month');

  // KPI calculations
  const totalLeads = 2450;
  const newLeadsToday = 18;
  const qualifiedLeads = 820;
  const openOpportunities = 412;
  const convertedLeads = 210;
  const conversionRate = '8.57%';
  const totalStudents = 1850;
  const activeStudents = 1640;
  const totalCourses = 48;
  const activeCourses = 42;
  const grossRevenue = '₹24,50,000';
  const pendingPayments = '₹3,20,000';
  const upcomingClasses = 14;
  const upcomingWebinars = 3;
  const certificatesIssued = 420;

  const funnelSteps = [
    { label: 'New Leads', count: 2450, drop: '14% drop', pct: 100 },
    { label: 'Contacted', count: 2100, drop: '31% drop', pct: 85.7 },
    { label: 'Interested', count: 1450, drop: '43% drop', pct: 59.1 },
    { label: 'Qualified', count: 820, drop: '34% drop', pct: 33.4 },
    { label: 'Demo / Counseling', count: 540, drop: '29% drop', pct: 22.0 },
    { label: 'Proposal / Offer', count: 380, drop: '31% drop', pct: 15.5 },
    { label: 'Payment Pending', count: 260, drop: '19% drop', pct: 10.6 },
    { label: 'Converted (Won)', count: 210, drop: 'Final Won', pct: 8.57, highlight: true },
  ];

  const sourceData = [
    { source: 'WhatsApp Inbound', count: 1029, pct: '42%' },
    { source: 'Meta Ads', count: 686, pct: '28%' },
    { source: 'Google Search', count: 392, pct: '16%' },
    { source: 'Organic YouTube', count: 220, pct: '9%' },
    { source: 'Referral & Others', count: 123, pct: '5%' },
  ];

  const counselorPerformance = [
    { name: 'Pooja Kashyap', role: 'Senior Admissions Lead', leads: 840, converted: 94, revenue: '₹11,40,000', convRate: '11.2%' },
    { name: 'Rohan Mehra', role: 'Tech & Finance Counselor', leads: 780, converted: 82, revenue: '₹9,80,000', convRate: '10.5%' },
    { name: 'Anita Roy', role: 'Executive Counselor', leads: 510, converted: 34, revenue: '₹3,30,000', convRate: '6.7%' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Management & Operations MIS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated overview across Creator, Institute, LMS cohorts, CRM funnel, and Automated Revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFunnelFilter('month')}
              className={`px-3 py-1 rounded transition-colors ${
                funnelFilter === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Month
            </button>
            <button
              onClick={() => setFunnelFilter('quarter')}
              className={`px-3 py-1 rounded transition-colors ${
                funnelFilter === 'quarter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setFunnelFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                funnelFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FY 2026
            </button>
          </div>

          <button
            onClick={() => setActiveModule('reports')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            Export Detailed MIS
          </button>
        </div>
      </div>

      {/* 15 Primary KPI Cards (Structured 5x3 Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Total Leads</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{totalLeads.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs last mo
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">New Leads Today</div>
          <div className="text-xl font-bold text-indigo-600 font-mono tabular-nums mt-1">+{newLeadsToday}</div>
          <div className="text-[11px] text-slate-500 mt-1">Via WhatsApp & Ads</div>
        </div>

        {/* Card 3 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Qualified Leads</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{qualifiedLeads}</div>
          <div className="text-[11px] text-slate-500 mt-1">33.4% qualification rate</div>
        </div>

        {/* Card 4 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Open Opportunities</div>
          <div className="text-xl font-bold text-amber-600 font-mono tabular-nums mt-1">{openOpportunities}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active in counseling</div>
        </div>

        {/* Card 5 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Conversions (Won)</div>
          <div className="text-xl font-bold text-emerald-600 font-mono tabular-nums mt-1">{convertedLeads}</div>
          <div className="text-[11px] font-medium text-emerald-700 mt-1">Conversion: {conversionRate}</div>
        </div>

        {/* Card 6 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Gross Sales (MTD)</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{grossRevenue}</div>
          <div className="text-[11px] text-emerald-600 mt-1">Collected: ₹21,30,000</div>
        </div>

        {/* Card 7 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Pending Payments</div>
          <div className="text-xl font-bold text-rose-600 font-mono tabular-nums mt-1">{pendingPayments}</div>
          <div className="text-[11px] text-slate-500 mt-1">Installment due in 7d</div>
        </div>

        {/* Card 8 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Total Students</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{totalStudents.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active learners: {activeStudents}</div>
        </div>

        {/* Card 9 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Total Courses</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{totalCourses}</div>
          <div className="text-[11px] text-slate-500 mt-1">{activeCourses} active in cohort</div>
        </div>

        {/* Card 10 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Upcoming Classes</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{upcomingClasses}</div>
          <div className="text-[11px] text-slate-500 mt-1">Next: Tonight 7:00 PM</div>
        </div>

        {/* Card 11 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Upcoming Webinars</div>
          <div className="text-xl font-bold text-indigo-600 font-mono tabular-nums mt-1">{upcomingWebinars}</div>
          <div className="text-[11px] text-slate-500 mt-1">340 registered for Oct 8</div>
        </div>

        {/* Card 12 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Certificates Issued</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">{certificatesIssued}</div>
          <div className="text-[11px] text-emerald-600 mt-1">100% verified QR codes</div>
        </div>

        {/* Card 13 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">Course Completion Rate</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">84.2%</div>
          <div className="text-[11px] text-slate-500 mt-1">Industry avg: 15%</div>
        </div>

        {/* Card 14 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">WhatsApp Lead Volume</div>
          <div className="text-xl font-bold text-emerald-600 font-mono tabular-nums mt-1">1,420</div>
          <div className="text-[11px] text-slate-500 mt-1">58% of total inquiries</div>
        </div>

        {/* Card 15 */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
          <div className="text-[11px] font-medium text-slate-500">1:1 Consultations Booked</div>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">125</div>
          <div className="text-[11px] text-slate-500 mt-1">Avg rating: 4.9/5</div>
        </div>
      </div>

      {/* End-to-End Sales Funnel (Specification Flow) */}
      <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              End-to-End Sales & Conversion Funnel
            </h2>
            <p className="text-xs text-slate-500">
              Progression from first touchpoint (Lead Inbound) to Won Enrollment
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
            Overall Conversion: 8.57%
          </span>
        </div>

        {/* Horizontal Visual Funnel Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {funnelSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                step.highlight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5 line-clamp-1">
                  {step.label}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-base font-bold font-mono tabular-nums text-slate-900">
                  {step.count.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                  <span>{step.drop}</span>
                  <span className="font-mono">{step.pct}%</span>
                </div>
                {/* Visual bar */}
                <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5 overflow-hidden">
                  <div
                    className={`h-full ${step.highlight ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Source & Counselor Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source & Course Breakdown */}
        <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Leads by Channel & Source</h2>
            <button
              onClick={() => setActiveModule('leads')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              View Pipeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {sourceData.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">{s.source}</span>
                  <span className="text-slate-500 font-mono tabular-nums">
                    {s.count.toLocaleString()} leads ({s.pct})
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full"
                    style={{ width: s.pct }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Highest converting channel: <strong className="text-slate-900">WhatsApp Inbound (12.4%)</strong></span>
            <span>Cost per Lead: <strong className="text-slate-900">₹84.50</strong></span>
          </div>
        </div>

        {/* Counselor Conversion Leaderboard */}
        <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Counselor Performance & Sales</h2>
            <span className="text-xs font-mono text-slate-500">Month to Date</span>
          </div>

          <div className="divide-y divide-slate-100">
            {counselorPerformance.map((c, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-[11px] text-slate-500">{c.role}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 font-mono tabular-nums">{c.revenue}</div>
                  <div className="text-[11px] text-slate-500">
                    {c.converted} Won / {c.leads} Leads · <span className="text-emerald-600 font-medium">{c.convRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
            <span>Lead Allocation Engine:</span>
            <span className="font-medium text-emerald-700">Auto Round-Robin (Active)</span>
          </div>
        </div>
      </div>

      {/* Recent Leads & Scheduled Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Follow-up Action Queue */}
        <div className="lg:col-span-1 p-5 bg-white border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Today's Follow-Up Queue</span>
            </h3>
            <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">
              3 Due Now
            </span>
          </div>

          <div className="space-y-2.5">
            {leads.slice(0, 3).map(lead => (
              <div
                key={lead.id}
                onClick={() => {
                  setSelectedLeadForDetail(lead);
                  setActiveModule('leads');
                }}
                className="p-2.5 rounded-md border border-slate-100 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors text-xs"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>{lead.name}</span>
                  <span className="font-mono text-[11px] text-slate-500">{lead.nextFollowUpTime}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{lead.interestedProduct}</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-indigo-600 font-medium">{lead.followUpType}</span>
                  <span className="text-slate-400">{lead.assignedCounselorName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Leads Table View Preview */}
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs font-bold text-slate-900">Recent Inbound Pipeline Activity</h3>
            <button
              onClick={() => setActiveModule('leads')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Open Full Kanban
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-2 font-medium">Lead Code</th>
                  <th className="pb-2 font-medium">Candidate</th>
                  <th className="pb-2 font-medium">Course / Product</th>
                  <th className="pb-2 font-medium">Stage</th>
                  <th className="pb-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 font-mono text-[11px] text-slate-500">{lead.code}</td>
                    <td className="py-2">
                      <div className="font-medium text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.mobile}</div>
                    </td>
                    <td className="py-2 truncate max-w-xs text-slate-700">{lead.interestedProduct}</td>
                    <td className="py-2">
                      <span className="text-[11px] font-medium text-slate-700 capitalize">
                        {lead.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => {
                          setSelectedLeadForDetail(lead);
                          setActiveModule('leads');
                        }}
                        className="text-indigo-600 hover:text-indigo-900 font-medium text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

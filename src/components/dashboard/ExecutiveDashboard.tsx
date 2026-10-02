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
  ChevronRight,
  Video,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExecutiveDashboard: React.FC = () => {
  const {
    leads,
    courses,
    orders,
    setActiveModule,
    setSelectedLeadForDetail,
    drillDown
  } = useApp();
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
    { label: 'New Leads', count: 2450, drop: '14% drop', pct: 100, stageKey: 'new' },
    { label: 'Contacted', count: 2100, drop: '31% drop', pct: 85.7, stageKey: 'contacted' },
    { label: 'Interested', count: 1450, drop: '43% drop', pct: 59.1, stageKey: 'interested' },
    { label: 'Qualified', count: 820, drop: '34% drop', pct: 33.4, stageKey: 'qualified' },
    { label: 'Demo / Counseling', count: 540, drop: '29% drop', pct: 22.0, stageKey: 'demo' },
    { label: 'Proposal / Offer', count: 380, drop: '31% drop', pct: 15.5, stageKey: 'proposal' },
    { label: 'Payment Pending', count: 260, drop: '19% drop', pct: 10.6, stageKey: 'payment_pending' },
    { label: 'Converted (Won)', count: 210, drop: 'Final Won', pct: 8.57, highlight: true, stageKey: 'won' },
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Management & Operations MIS</span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
              Live Interactive
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any KPI card, funnel stage, or team member to drill down directly into records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFunnelFilter('month')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                funnelFilter === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Month
            </button>
            <button
              onClick={() => setFunnelFilter('quarter')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                funnelFilter === 'quarter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => setFunnelFilter('all')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                funnelFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FY 2026
            </button>
          </div>

          <button
            onClick={() => drillDown('reports', { originLabel: 'Executive MIS', title: 'Executive Operations MIS Report', filter: { reportType: 'executive' } })}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Export Detailed MIS</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 15 Primary KPI Cards (Structured 5x3 Grid - Fully Clickable Drilldown) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: Total Leads */}
        <div
          onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: 'All CRM Leads & Inquiries (2,450)', filter: { stage: 'All' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to open CRM Lead Pipeline"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-indigo-600">Total Leads</span>
            <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-indigo-600 transition-colors">{totalLeads.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +18.4%</span>
            <span className="text-slate-400 group-hover:text-indigo-600 font-mono">View →</span>
          </div>
        </div>

        {/* Card 2: New Leads Today */}
        <div
          onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: "Today's Inbound Leads (+18)", filter: { stage: 'new' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view today's inbound leads"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-indigo-600">New Leads Today</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-xl font-black text-indigo-600 font-mono tabular-nums">+{newLeadsToday}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>WhatsApp & Ads</span>
            <span className="text-slate-400 group-hover:text-indigo-600 font-mono">Inspect →</span>
          </div>
        </div>

        {/* Card 3: Qualified Leads */}
        <div
          onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: 'Qualified Candidates (820)', filter: { stage: 'qualified' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view qualified candidates"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-emerald-700">Qualified Leads</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-emerald-700 transition-colors">{qualifiedLeads}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>33.4% Qual Rate</span>
            <span className="text-slate-400 group-hover:text-emerald-700 font-mono">List →</span>
          </div>
        </div>

        {/* Card 4: Open Opportunities */}
        <div
          onClick={() => drillDown('crm', { originLabel: 'Executive MIS', title: 'Active Counseling Opportunities (412)', filter: { status: 'opportunity' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-amber-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view active opportunities"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-amber-700">Opportunities</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-black text-amber-600 font-mono tabular-nums">{openOpportunities}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>In Counseling</span>
            <span className="text-slate-400 group-hover:text-amber-700 font-mono">CRM →</span>
          </div>
        </div>

        {/* Card 5: Won Conversions */}
        <div
          onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: 'Converted Students (Won 210)', filter: { stage: 'won' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view converted enrollments"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-emerald-700">Won Students</span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-600 font-mono tabular-nums">{convertedLeads}</div>
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center justify-between">
            <span>Rate: {conversionRate}</span>
            <span className="font-mono">Roster →</span>
          </div>
        </div>

        {/* Card 6: Gross Sales */}
        <div
          onClick={() => drillDown('sales', { originLabel: 'Executive MIS', title: 'Gross Revenue & Sales Transactions (₹24.5L)', filter: { status: 'Paid' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to open Sales & Payments ledger"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-emerald-700">Gross Sales (MTD)</span>
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-emerald-700 transition-colors">{grossRevenue}</div>
          <div className="text-[10px] text-emerald-600 flex items-center justify-between font-semibold">
            <span>Collected: ₹21.3L</span>
            <span className="font-mono">Ledger →</span>
          </div>
        </div>

        {/* Card 7: Pending Payments */}
        <div
          onClick={() => drillDown('sales', { originLabel: 'Executive MIS', title: 'Overdue & Pending Fee Invoices (₹3.2L)', filter: { status: 'Pending' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-rose-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view pending payments"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-rose-700">Pending Payments</span>
            <Clock className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-black text-rose-600 font-mono tabular-nums">{pendingPayments}</div>
          <div className="text-[10px] text-rose-700 font-medium flex items-center justify-between">
            <span>Due in 7 days</span>
            <span className="font-mono">Invoices →</span>
          </div>
        </div>

        {/* Card 8: Total Students */}
        <div
          onClick={() => drillDown('students', { originLabel: 'Executive MIS', title: 'Active Students Directory (1,850)', filter: { classGrade: 'All' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view student directory"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-blue-700">Total Students</span>
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-blue-700 transition-colors">{totalStudents.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Active: {activeStudents}</span>
            <span className="font-mono text-slate-400 group-hover:text-blue-700">Roster →</span>
          </div>
        </div>

        {/* Card 9: Total Courses */}
        <div
          onClick={() => drillDown('lms', { originLabel: 'Executive MIS', title: 'Curriculum & Courses Catalog (48)', filter: { tab: 'courses' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-purple-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view course catalog"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-purple-700">Total Courses</span>
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-purple-700 transition-colors">{totalCourses}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>{activeCourses} in Cohort</span>
            <span className="font-mono text-slate-400 group-hover:text-purple-700">LMS →</span>
          </div>
        </div>

        {/* Card 10: Upcoming Classes */}
        <div
          onClick={() => drillDown('teacher-timetable', { originLabel: 'Executive MIS', title: 'Scheduled Live Classes (14)', filter: { activeDay: 'Today' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view live classes timetable"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-indigo-700">Upcoming Classes</span>
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-indigo-700 transition-colors">{upcomingClasses}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Next: 7:00 PM</span>
            <span className="font-mono text-slate-400 group-hover:text-indigo-700">Schedule →</span>
          </div>
        </div>

        {/* Card 11: Upcoming Webinars */}
        <div
          onClick={() => drillDown('automation', { originLabel: 'Executive MIS', title: 'Live Webinars & Broadcast Events (3)', filter: { type: 'webinar' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view webinar funnel"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-indigo-700">Webinars</span>
            <Video className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-indigo-600 font-mono tabular-nums">{upcomingWebinars}</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>340 RSVP Oct 8</span>
            <span className="font-mono text-slate-400 group-hover:text-indigo-700">Events →</span>
          </div>
        </div>

        {/* Card 12: Certificates Issued */}
        <div
          onClick={() => drillDown('students', { originLabel: 'Executive MIS', title: 'Verified Issued Credentials (420)', filter: { certificate: 'Issued' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view verified certificates"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-emerald-700">Certificates</span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-emerald-700 transition-colors">{certificatesIssued}</div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-between">
            <span>100% QR Verified</span>
            <span className="font-mono">Verify →</span>
          </div>
        </div>

        {/* Card 13: Course Completion Rate */}
        <div
          onClick={() => drillDown('reports', { originLabel: 'Executive MIS', title: 'Course Completion & Retention Report (84.2%)', filter: { reportType: 'completion' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-teal-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view completion rate report"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-teal-700">Completion Rate</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-teal-700 transition-colors">84.2%</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>5x Industry Avg</span>
            <span className="font-mono text-slate-400 group-hover:text-teal-700">Report →</span>
          </div>
        </div>

        {/* Card 14: WhatsApp Lead Volume */}
        <div
          onClick={() => drillDown('whatsapp', { originLabel: 'Executive MIS', title: 'WhatsApp Inbound Inquiries (1,420)', filter: { channel: 'whatsapp' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to open WhatsApp workspace"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-emerald-700">WhatsApp Leads</span>
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-600 font-mono tabular-nums">1,420</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>58% Inquiries</span>
            <span className="font-mono text-slate-400 group-hover:text-emerald-700">Chats →</span>
          </div>
        </div>

        {/* Card 15: 1:1 Consultations */}
        <div
          onClick={() => drillDown('crm', { originLabel: 'Executive MIS', title: '1:1 Counseling & Consultations Booked (125)', filter: { type: 'consultation' } })}
          className="p-3.5 bg-white border border-slate-200 hover:border-purple-400 rounded-2xl hover:shadow-md cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group space-y-1"
          title="Click to view counseling sessions"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold group-hover:text-purple-700">Consultations</span>
            <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums group-hover:text-purple-700 transition-colors">125</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Rating: 4.9/5</span>
            <span className="font-mono text-slate-400 group-hover:text-purple-700">Calendar →</span>
          </div>
        </div>
      </div>

      {/* End-to-End Sales Funnel (Specification Flow - Fully Interactive Stepper) */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              End-to-End Sales & Conversion Funnel
            </h2>
            <p className="text-xs text-slate-500">
              Click any stage below to filter and inspect underlying lead opportunities.
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
              onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: `Funnel Stage: ${step.label} (${step.count.toLocaleString()})`, filter: { stage: step.stageKey } })}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group shadow-2xs ${
                step.highlight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:border-emerald-500'
                  : 'bg-slate-50/60 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50'
              }`}
              title={`Click to filter leads at ${step.label} stage`}
            >
              <div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Step 0{idx + 1}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5 line-clamp-1 group-hover:text-indigo-900">
                  {step.label}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-base font-black font-mono tabular-nums text-slate-900 group-hover:text-indigo-700">
                  {step.count.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                  <span>{step.drop}</span>
                  <span className="font-mono">{step.pct}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className={`h-full ${step.highlight ? 'bg-emerald-500' : 'bg-indigo-600'}`}
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
        {/* Leads by Source & Channel Breakdown */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Leads by Channel & Source</h2>
            <button
              onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: 'Leads Pipeline by Acquisition Channel' })}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {sourceData.map((s, idx) => (
              <div
                key={idx}
                onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: `Leads from ${s.source} (${s.count})`, filter: { source: s.source } })}
                className="space-y-1 p-2 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-200 cursor-pointer transition-all group"
                title={`Click to inspect leads from ${s.source}`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 group-hover:text-indigo-800 flex items-center gap-1.5">
                    <span>{s.source}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" />
                  </span>
                  <span className="text-slate-500 font-mono tabular-nums font-semibold">
                    {s.count.toLocaleString()} leads ({s.pct})
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-slate-800 group-hover:bg-indigo-600 transition-colors rounded-full"
                    style={{ width: s.pct }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Highest converting: <strong className="text-slate-900">WhatsApp Inbound (12.4%)</strong></span>
            <span>Cost per Lead: <strong className="text-slate-900">₹84.50</strong></span>
          </div>
        </div>

        {/* Counselor Conversion Leaderboard */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Counselor Performance & Sales</h2>
            <span className="text-xs font-mono text-slate-500">Month to Date</span>
          </div>

          <div className="divide-y divide-slate-100">
            {counselorPerformance.map((c, idx) => (
              <div
                key={idx}
                onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: `Leads Assigned to ${c.name} (${c.leads})`, filter: { counselor: c.name } })}
                className="py-2.5 px-2 flex items-center justify-between text-xs hover:bg-indigo-50/70 rounded-xl cursor-pointer transition-colors group"
                title={`Click to inspect portfolio of ${c.name}`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-800 flex items-center gap-1.5">
                    <span>{c.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{c.role}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 font-mono tabular-nums">{c.revenue}</div>
                  <div className="text-[11px] text-slate-500">
                    {c.converted} Won / {c.leads} Leads · <span className="text-emerald-600 font-bold">{c.convRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
            <span>Lead Allocation Engine:</span>
            <span className="font-bold text-emerald-700">Auto Round-Robin (Active)</span>
          </div>
        </div>
      </div>

      {/* Recent Leads & Scheduled Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Follow-up Action Queue */}
        <div className="lg:col-span-1 p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Today's Follow-Up Queue</span>
            </h3>
            <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
              3 Due Now
            </span>
          </div>

          <div className="space-y-2.5">
            {leads.slice(0, 3).map(lead => (
              <div
                key={lead.id}
                onClick={() => {
                  setSelectedLeadForDetail(lead);
                  drillDown('leads', { originLabel: 'Executive MIS', title: `Lead Details: ${lead.name}` });
                }}
                className="p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/60 cursor-pointer transition-all text-xs group"
                title="Click to view full lead history and call notes"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 group-hover:text-indigo-800">
                  <span>{lead.name}</span>
                  <span className="font-mono text-[11px] text-slate-500">{lead.nextFollowUpTime}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{lead.interestedProduct}</div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-indigo-600 font-bold">{lead.followUpType}</span>
                  <span className="text-slate-400">{lead.assignedCounselorName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Leads Table View Preview */}
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs font-bold text-slate-900">Recent Inbound Pipeline Activity</h3>
            <button
              onClick={() => drillDown('leads', { originLabel: 'Executive MIS', title: 'Complete Lead Kanban & Opportunities' })}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              Open Full Kanban →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="pb-2 font-medium">Lead Code</th>
                  <th className="pb-2 font-medium">Candidate</th>
                  <th className="pb-2 font-medium">Course / Product</th>
                  <th className="pb-2 font-medium">Stage</th>
                  <th className="pb-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map(lead => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLeadForDetail(lead);
                      drillDown('leads', { originLabel: 'Executive MIS', title: `Lead Details: ${lead.name}` });
                    }}
                    className="hover:bg-indigo-50/70 cursor-pointer transition-colors group"
                    title="Click to view candidate details"
                  >
                    <td className="py-2.5 font-mono text-[11px] text-slate-500">{lead.code}</td>
                    <td className="py-2.5">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-800">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.mobile}</div>
                    </td>
                    <td className="py-2.5 truncate max-w-xs text-slate-700">{lead.interestedProduct}</td>
                    <td className="py-2.5">
                      <span className="text-[11px] font-bold text-slate-700 capitalize bg-slate-100 px-2 py-0.5 rounded">
                        {lead.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeadForDetail(lead);
                          drillDown('leads', { originLabel: 'Executive MIS', title: `Lead Details: ${lead.name}` });
                        }}
                        className="text-[#3d5ee1] hover:underline font-bold text-xs"
                      >
                        Inspect →
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

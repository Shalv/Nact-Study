import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  CreditCard,
  Building,
  TrendingUp,
  Calendar,
  Clock,
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  DollarSign,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PreskoolIndexDashboard: React.FC = () => {
  const { setActiveModule, courses, leads, drillDown } = useApp();
  const [revenueChartTab, setRevenueChartTab] = useState<'income' | 'expenses'>('income');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2026 - 2027');

  // PreSkool 1:1 Stat metrics
  const stats = [
    {
      title: 'Total Students',
      value: '50,055',
      change: '+12% vs last term',
      icon: GraduationCap,
      bg: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBg: 'bg-blue-600 text-white',
      destination: 'students',
      filter: { classGrade: 'All' },
      drillTitle: 'All Enrolled Students (50,055)'
    },
    {
      title: 'Total Teachers',
      value: '145',
      change: '+8 new faculty joined',
      icon: Users,
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      iconBg: 'bg-amber-500 text-white',
      destination: 'users',
      filter: { role: 'Faculty' },
      drillTitle: 'Faculty & Administrative Staff Directory (145)'
    },
    {
      title: 'Academic Departments',
      value: '32',
      change: '100% operational',
      icon: Building,
      bg: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      iconBg: 'bg-cyan-600 text-white',
      destination: 'masters',
      filter: { category: 'departments' },
      drillTitle: 'Institutional Academic Departments (32 Active)'
    },
    {
      title: 'Revenue / Fees Collected',
      value: '₹24,50,000',
      change: '92% target realized',
      icon: CreditCard,
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconBg: 'bg-emerald-600 text-white',
      destination: 'fees',
      filter: { formTab: 'fees' },
      drillTitle: 'Fee Collection & Dues Ledger'
    },
  ];

  // Revenue monthly data for chart
  const monthlyData = [
    { month: 'Jan', income: 1400000, expense: 800000 },
    { month: 'Feb', income: 1650000, expense: 950000 },
    { month: 'Mar', income: 1900000, expense: 900000 },
    { month: 'Apr', income: 1800000, expense: 850000 },
    { month: 'May', income: 2100000, expense: 1100000 },
    { month: 'Jun', income: 2300000, expense: 1200000 },
    { month: 'Jul', income: 2000000, expense: 1050000 },
    { month: 'Aug', income: 2250000, expense: 1150000 },
    { month: 'Sep', income: 2400000, expense: 1250000 },
    { month: 'Oct', income: 2450000, expense: 1300000 },
  ];

  // Star Students (PreSkool signature index.html table)
  const starStudents = [
    {
      id: 'PRE-1001',
      name: 'Aarav Patel',
      class: 'AI & Data Science (Yr 2)',
      marks: '984 / 1000',
      percentage: '98.4%',
      rank: 'Rank 1',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'PRE-1002',
      name: 'Sneha Kulkarni',
      class: 'Quantitative Finance & CFA',
      marks: '962 / 1000',
      percentage: '96.2%',
      rank: 'Rank 2',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'PRE-1003',
      name: 'Manoj Deshmukh',
      class: 'MLOps & Systems Architecture',
      marks: '955 / 1000',
      percentage: '95.5%',
      rank: 'Rank 3',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'PRE-1004',
      name: 'Tanya Narang',
      class: 'Product Management & AI',
      marks: '942 / 1000',
      percentage: '94.2%',
      rank: 'Rank 4',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'PRE-1005',
      name: 'Harish Chandra',
      class: 'Data Engineering & Cloud',
      marks: '930 / 1000',
      percentage: '93.0%',
      rank: 'Rank 5',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
  ];

  // Student Activity Feed (PreSkool Activity Timeline)
  const activityFeed = [
    {
      time: '10:30 AM',
      title: '1st Rank in Generative AI Benchmark',
      description: 'Aarav Patel achieved 98.4% top marks in transformer evaluation.',
      tag: 'Academic',
      targetModule: 'students',
      filter: { studentName: 'Aarav Patel' }
    },
    {
      time: '11:15 AM',
      title: 'Fee Payment Received via UPI',
      description: '₹28,800 received from Manoj Deshmukh (Receipt #REC-9821).',
      tag: 'Finance',
      targetModule: 'fees',
      filter: { formTab: 'fees' }
    },
    {
      time: '01:45 PM',
      title: 'New Admissions Inquiry Captured',
      description: 'Inbound lead via WhatsApp assigned to Counselor Pooja Kashyap.',
      tag: 'Admissions',
      targetModule: 'leads',
      filter: { stage: 'new' }
    },
    {
      time: '04:00 PM',
      title: 'Live Lab Session Scheduled',
      description: 'Distributed CUDA & PyTorch office hours with Vikramaditya Roy.',
      tag: 'LMS Class',
      targetModule: 'teacher-timetable',
      filter: { activeDay: 'Today' }
    },
  ];

  // Upcoming Events & Calendar
  const upcomingEvents = [
    {
      date: '04 Oct',
      day: 'Saturday',
      title: 'Mid-Term Capstone Code Reviews',
      time: '10:00 AM - 01:00 PM',
      room: 'Virtual Lab Hall A',
      status: 'Mandatory',
    },
    {
      date: '08 Oct',
      day: 'Wednesday',
      title: 'Next-Gen AI Systems Masterclass Webinar',
      time: '06:00 PM - 08:00 PM',
      room: 'Zoom Enterprise Room',
      status: 'Open Event',
    },
    {
      date: '15 Oct',
      day: 'Thursday',
      title: 'Term 2 Tuition Fee Installment Due',
      time: 'All Day',
      room: 'Accounts Portal',
      status: 'Finance',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#f7f7fa] min-h-screen">
      {/* Quick Action Navigation Bar & Nact Study Detailed Form References */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                Nact Study — Consolidated Creator & Institute ERP
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full font-mono">
                Single Unified ERP
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidated operational platform for students, faculty, admissions CRM, fee collections, LMS, and all 15 master settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => drillDown('masters', { originLabel: 'Institutional Dashboard', title: 'System Master Data Hub (15 Masters)' })}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>⚙️ All Masters Hub (15 Masters)</span>
            </button>
            <button
              onClick={() => drillDown('student-admission', { originLabel: 'Institutional Dashboard', title: 'New Student Admission Desk', filter: { formTab: 'student' } })}
              className="px-3 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>+ Student Admission</span>
            </button>
            <button
              onClick={() => drillDown('fees', { originLabel: 'Institutional Dashboard', title: 'Fee Collection & Payment Desk', filter: { formTab: 'fees' } })}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Collect Fees</span>
            </button>
            <button
              onClick={() => drillDown('leads', { originLabel: 'Institutional Dashboard', title: 'Admissions Pipeline & CRM Leads' })}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admissions CRM</span>
            </button>
          </div>
        </div>

        {/* Form Quick Launch Reference Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] shrink-0">
            Form Shortcuts:
          </span>
          <button
            onClick={() => drillDown('student-admission', { originLabel: 'Institutional Dashboard', title: 'Student Admission Form', filter: { formTab: 'student' } })}
            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>+ Admission Form</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => drillDown('student-admission', { originLabel: 'Institutional Dashboard', title: 'Teacher Onboarding Form', filter: { formTab: 'teacher' } })}
            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>+ Faculty Onboarding</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => drillDown('fees', { originLabel: 'Institutional Dashboard', title: 'Fee Collection Ledger', filter: { formTab: 'fees' } })}
            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Fee Receipts</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={() => drillDown('masters', { originLabel: 'Institutional Dashboard', title: 'All Masters Hub' })}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md border border-indigo-200 font-semibold transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Master Settings</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Page Header: Breadcrumbs & Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Institutional Operations Dashboard</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Institutional Command Console</span>
          </div>
        </div>

        {/* Academic Year Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">Academic Year:</span>
          <select
            value={selectedAcademicYear}
            onChange={e => setSelectedAcademicYear(e.target.value)}
            className="bg-transparent font-semibold text-slate-800 focus:outline-none"
          >
            <option value="2026 - 2027">2026 - 2027</option>
            <option value="2025 - 2026">2025 - 2026</option>
          </select>
        </div>
      </div>

      {/* 4 Iconic PreSkool Metric Cards (Clickable Drilldowns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => drillDown(stat.destination, { originLabel: 'PreSkool Dashboard', title: stat.drillTitle, filter: stat.filter })}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between transition-all hover:shadow-md hover:border-[#3d5ee1] cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
              title={`Click to inspect ${stat.title}`}
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-500 tracking-wide group-hover:text-[#3d5ee1] transition-colors">{stat.title}</div>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums group-hover:text-[#3d5ee1] transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${stat.iconBg} group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Row (Overview + Demographics) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Financial Overview & Fees Collection */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Financial Overview & Fees Collection</h3>
              <p className="text-xs text-slate-500">Monthly student fee collection (Click any bar to drill down)</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setRevenueChartTab('income')}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    revenueChartTab === 'income' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Income
                </button>
                <button
                  onClick={() => setRevenueChartTab('expenses')}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                    revenueChartTab === 'expenses' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                  }`}
                >
                  Expenses
                </button>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-2">
            <div className="flex items-end justify-between gap-3 h-52 pt-4 px-2">
              {monthlyData.map((d, i) => {
                const heightPct = Math.round((d.income / 2500000) * 100);
                const expPct = Math.round((d.expense / 2500000) * 100);
                return (
                  <div
                    key={i}
                    onClick={() => drillDown('fees', { originLabel: 'PreSkool Dashboard', title: `Fee Ledger for ${d.month} (₹${d.income.toLocaleString()})`, filter: { month: d.month, formTab: 'fees' } })}
                    className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                    title={`Click to inspect ${d.month} Collection: ₹${d.income.toLocaleString()}`}
                  >
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Income Bar */}
                      <div
                        className="w-3.5 bg-[#3d5ee1] rounded-t-sm group-hover:bg-[#2e4ac7] transition-all group-hover:scale-y-105"
                        style={{ height: `${heightPct}%` }}
                      />
                      {/* Expense Bar */}
                      <div
                        className="w-3.5 bg-slate-200 rounded-t-sm group-hover:bg-slate-300 transition-all group-hover:scale-y-105"
                        style={{ height: `${expPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 font-semibold group-hover:text-[#3d5ee1]">{d.month}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-600 mt-3">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3d5ee1]" />
                <span>Fees Collected (Income)</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-slate-200" />
                <span>Operating Expenses</span>
              </span>
            </div>
          </div>
        </div>

        {/* Chart 2: Student Gender Demographics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Student Demographics</h3>
            <span className="text-xs font-mono text-slate-400">Total: 50,055</span>
          </div>

          {/* Clean Donut Graphic */}
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center border-8 border-slate-100">
              <div
                className="absolute inset-0 rounded-full border-8 border-[#3d5ee1] border-r-transparent border-b-transparent transform -rotate-45"
              />
              <div className="text-center">
                <div className="text-2xl font-black font-mono text-slate-900">54%</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Male Ratio</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full text-center text-xs pt-2">
              <div
                onClick={() => drillDown('students', { originLabel: 'PreSkool Dashboard', title: 'Male Students Roster (27,030)', filter: { gender: 'Male' } })}
                className="p-3 bg-blue-50 hover:bg-blue-100/80 rounded-xl border border-blue-100 cursor-pointer transition-all hover:scale-[1.02] group"
                title="Click to view male students roster"
              >
                <div className="font-black text-[#3d5ee1] text-base font-mono">27,030</div>
                <div className="text-[11px] text-slate-600 mt-0.5 group-hover:text-[#3d5ee1] font-semibold flex items-center justify-center gap-1">
                  <span>Male (54%)</span>
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                </div>
              </div>
              <div
                onClick={() => drillDown('students', { originLabel: 'PreSkool Dashboard', title: 'Female Students Roster (23,025)', filter: { gender: 'Female' } })}
                className="p-3 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl border border-indigo-100 cursor-pointer transition-all hover:scale-[1.02] group"
                title="Click to view female students roster"
              >
                <div className="font-black text-indigo-700 text-base font-mono">23,025</div>
                <div className="text-[11px] text-slate-600 mt-0.5 group-hover:text-indigo-800 font-semibold flex items-center justify-center gap-1">
                  <span>Female (46%)</span>
                  <ChevronRight className="w-3 h-3 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Enrolled Cohorts: <strong>14 Active</strong></span>
            <span className="text-emerald-600 font-semibold">98.2% Retention</span>
          </div>
        </div>
      </div>

      {/* Row 2: Star Students Table + Student Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Star Students High Achievers Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Star Students & Academic Achievers</h3>
              <p className="text-xs text-slate-500">Top-performing learners across semester evaluations</p>
            </div>
            <button
              onClick={() => drillDown('students', { originLabel: 'Institutional Dashboard', title: 'Complete Student Body Roster' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Students</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Class / Program</th>
                  <th className="py-2.5 px-3 font-mono">Marks</th>
                  <th className="py-2.5 px-3 font-mono">Percentage</th>
                  <th className="py-2.5 px-3 text-right">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {starStudents.map(student => (
                  <tr
                    key={student.id}
                    onClick={() => drillDown('students', { originLabel: 'Institutional Dashboard', title: `Student Profile: ${student.name}`, filter: { studentName: student.name } })}
                    className="hover:bg-indigo-50/70 cursor-pointer transition-colors group"
                    title={`Click to inspect ${student.name}'s records`}
                  >
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400 font-semibold">
                      {student.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-900 group-hover:text-[#3d5ee1] transition-colors">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{student.class}</td>
                    <td className="py-3 px-3 font-mono text-slate-800">{student.marks}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600">{student.percentage}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-bold rounded text-[11px] font-mono">
                        {student.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Activity Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Student Activity</h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Live Events</span>
          </div>

          <div className="relative space-y-4 before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
            {activityFeed.map((act, idx) => (
              <div
                key={idx}
                onClick={() => drillDown(act.targetModule, { originLabel: 'Institutional Dashboard', title: act.title, filter: act.filter })}
                className="relative flex items-start gap-3 pl-8 text-xs cursor-pointer p-2 rounded-xl hover:bg-indigo-50/60 transition-colors group"
                title="Click to view underlying activity record"
              >
                <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-[#3d5ee1] ring-4 ring-white group-hover:ring-indigo-100" />
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs group-hover:text-indigo-800">{act.title}</span>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">{act.time}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{act.description}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold group-hover:bg-indigo-100 group-hover:text-indigo-800">
                    {act.tag} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Upcoming Events & Academic Timetable */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Upcoming Academic Events & Schedules</h3>
            <p className="text-xs text-slate-500">Examination dates, cohort classes, and submission deadlines</p>
          </div>

          <button
            onClick={() => drillDown('teacher-timetable', { originLabel: 'Institutional Dashboard', title: 'Complete Institutional Academic Schedule' })}
            className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
          >
            Open LMS Schedule →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {upcomingEvents.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => drillDown('teacher-timetable', { originLabel: 'Institutional Dashboard', title: evt.title })}
              className="p-4 bg-slate-50 hover:bg-indigo-50/60 rounded-2xl border border-slate-200 hover:border-indigo-300 space-y-2 cursor-pointer transition-all group"
              title={`Click to view schedule details for ${evt.title}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs font-mono group-hover:border-indigo-300">
                    <span className="text-xs font-black text-[#3d5ee1] leading-none">{evt.date.split(' ')[0]}</span>
                    <span className="text-[9px] text-slate-400 leading-none mt-0.5">{evt.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-indigo-800">{evt.title}</div>
                    <div className="text-[11px] text-slate-500">{evt.day} · {evt.time}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Room: <strong className="text-slate-800">{evt.room}</strong></span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold text-[10px]">
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

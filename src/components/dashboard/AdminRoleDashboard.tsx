import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  CreditCard,
  UserCheck,
  TrendingUp,
  Calendar,
  Clock,
  Bell,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  DollarSign,
  Download,
  Building,
  UserPlus,
  BookOpen,
  Briefcase,
  ChevronRight,
  Layers,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminRoleDashboard: React.FC = () => {
  const { setActiveModule, showToast, addActivityLog, currentUser, leads, courses, orders } = useApp();

  const [dateRange, setDateRange] = useState('Academic Year 2026-27');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All Classes');

  // Pending Approvals State (CRUD / Interactive)
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'APP-101', type: 'Leave Request', applicant: 'Vikramaditya Roy', role: 'Faculty', details: 'Duty Leave (CBSE AI Pedagogy Workshop - 2 Days)', date: 'Today, 09:30 AM', status: 'Pending' },
    { id: 'APP-102', type: 'Question Paper', applicant: 'Priyanka Sen', role: 'Faculty', details: 'Term 1 Midterm Physics Paper Set B Moderation', date: 'Yesterday', status: 'Pending' },
    { id: 'APP-103', type: 'Admission Waiver', applicant: 'Admissions Desk', role: 'Staff', details: 'Sibling Fee Concession (15%) for Riya Sharma (Class 6-B)', date: '2 days ago', status: 'Pending' },
    { id: 'APP-104', type: 'Lab Budget', applicant: 'Science Dept', role: 'HOD', details: 'Procurement of Optical Benches & Laser Kits (₹45,000)', date: '3 days ago', status: 'Pending' },
  ]);

  // Notices & Announcements State
  const [adminNotices, setAdminNotices] = useState([
    { id: 'NOT-1', title: 'CBSE Board Examination Registration Circular 2026', audience: 'All Faculty & Students', priority: 'High', date: '2026-10-02' },
    { id: 'NOT-2', title: 'Faculty Development Program on Generative AI Classroom Tools', audience: 'Teaching Staff', priority: 'Medium', date: '2026-09-30' },
    { id: 'NOT-3', title: 'Inter-School Science & Robotics Olympiad Hosting Schedule', audience: 'General', priority: 'Normal', date: '2026-09-28' },
  ]);

  // Handle Approvals
  const handleApprove = (id: string, type: string, applicant: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    showToast(`Approved ${type} from ${applicant} successfully!`);
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Approved Request: ${type}`,
      details: `Granted approval for ${applicant} (${id})`,
      category: 'system'
    });
  };

  const handleReject = (id: string, type: string, applicant: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== id));
    showToast(`Rejected ${type} from ${applicant}.`, 'warning');
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Rejected Request: ${type}`,
      details: `Declined request for ${applicant} (${id})`,
      category: 'system'
    });
  };

  return (
    <div className="p-6 space-y-6 text-xs text-slate-800 animate-in fade-in duration-150">
      {/* 1. Header Bar with Overview and Quick Actions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Building className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Institutional Executive & Academic Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Delhi Public Global School • Centralized Operations, Finance, Academic Governance, and Human Resources.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveModule('student-admission')}
            className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Admission</span>
          </button>
          <button
            onClick={() => setActiveModule('users')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Staff Directory</span>
          </button>
          <button
            onClick={() => setActiveModule('reports')}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span>MIS Reports</span>
          </button>
        </div>
      </div>

      {/* 2. Primary KPI Cards Grid (Total Students, Admissions, Teachers & Staff, Attendance, Fees & Outstanding) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Students */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2 hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Students</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">50,055</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+12.4% vs last term</span>
            </div>
          </div>
        </div>

        {/* Admissions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Admissions (YTD)</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">2,450</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              <strong className="text-emerald-700">820</strong> in pipeline
            </div>
          </div>
        </div>

        {/* Teachers & Staff */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2 hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Faculty & Staff</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">145 / 42</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              145 Teachers • 42 Admin Staff
            </div>
          </div>
        </div>

        {/* Daily Attendance Rate */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2 hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Daily Attendance</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-600">95.4%</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              47,750 Present Today
            </div>
          </div>
        </div>

        {/* Fees & Outstanding */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-2 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fees & Collection</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">₹24.5L</div>
            <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
              ₹3.2L Outstanding (88% Cleared)
            </div>
          </div>
        </div>
      </div>

      {/* 3. Class/Section Overview & Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class / Section Overview */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#3d5ee1]" />
              <h3 className="font-bold text-slate-900 text-sm">Class & Section Academic Overview</h3>
            </div>
            <span className="text-xs text-slate-500">12 Grade Levels • 36 Sections Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Class & Section</th>
                  <th className="py-2.5 px-3">Class Teacher</th>
                  <th className="py-2.5 px-3 text-center">Enrollment</th>
                  <th className="py-2.5 px-3 text-center">Attendance</th>
                  <th className="py-2.5 px-3 text-center">Term Avg</th>
                  <th className="py-2.5 px-3 text-right">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Class 8-A', teacher: 'Vikramaditya Roy', students: 32, att: '96.8%', gpa: '85.4%', fees: '94% Paid' },
                  { name: 'Class 8-B', teacher: 'Priyanka Sen', students: 30, att: '94.2%', gpa: '82.1%', fees: '88% Paid' },
                  { name: 'Class 9-B', teacher: 'Marcus Chen (Rep)', students: 28, att: '95.0%', gpa: '81.8%', fees: '92% Paid' },
                  { name: 'Class 10-A', teacher: 'Dr. Alok Verma', students: 34, att: '97.2%', gpa: '89.6%', fees: '96% Paid' },
                  { name: 'Class 11-Science', teacher: 'Rajesh Nair', students: 40, att: '93.5%', gpa: '84.0%', fees: '90% Paid' },
                ].map(c => (
                  <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{c.teacher}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{c.students}</td>
                    <td className="py-2.5 px-3 text-center font-semibold text-emerald-600">{c.att}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-indigo-600">{c.gpa}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-700">{c.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Performance & Analytics */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Academic Performance Distribution</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">CBSE 2026-27</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { grade: 'Distinction (A+ 90-100%)', count: '18,770 Students', pct: 37.5, color: 'bg-emerald-500' },
              { grade: 'First Class (A 80-89%)', count: '17,200 Students', pct: 34.4, color: 'bg-blue-500' },
              { grade: 'Second Class (B 70-79%)', count: '9,410 Students', pct: 18.8, color: 'bg-indigo-500' },
              { grade: 'Passing Grade (C 60-69%)', count: '3,100 Students', pct: 6.2, color: 'bg-amber-500' },
              { grade: 'Remedial Focus (<60%)', count: '1,575 Students', pct: 3.1, color: 'bg-rose-500' },
            ].map(item => (
              <div key={item.grade} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span className="text-slate-700">{item.grade}</span>
                  <span className="text-slate-500 font-mono">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">School Overall Mean GPA: <strong>84.2%</strong></span>
            <button
              onClick={() => setActiveModule('reports')}
              className="text-[#3d5ee1] font-bold hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Pending Approvals & Teacher Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Administrative Pending Approvals</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold font-mono">
              {pendingApprovals.length} Action Items
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-1" />
              <p className="font-semibold text-slate-700">All pending approvals cleared!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.type}</span>
                      <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                        {item.applicant} ({item.role})
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{item.details}</p>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pt-1">
                    <button
                      onClick={() => handleApprove(item.id, item.type, item.applicant)}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs transition-colors"
                      title="Approve"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleReject(item.id, item.type, item.applicant)}
                      className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teacher Activities & Live Audits */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3d5ee1]" />
              <h3 className="font-bold text-slate-900 text-sm">Real-time Faculty & Staff Activity Log</h3>
            </div>
            <span className="text-xs text-slate-500">Live Campus Stream</span>
          </div>

          <div className="space-y-3">
            {[
              { teacher: 'Vikramaditya Roy', role: 'Math Faculty', action: 'Published Exercise 2.3 Homework & Rubric for Class 8-A', time: '12 mins ago', badge: 'Homework' },
              { teacher: 'Dr. Sunita Rao', role: 'Examination Controller', action: 'Approved Term 1 Question Paper blueprint for Class 10 Physics', time: '35 mins ago', badge: 'Exams' },
              { teacher: 'Priyanka Sen', role: 'Science Faculty', action: 'Marked Daily Roll Call for Class 8-B (29 Present, 1 Absent)', time: '1 hour ago', badge: 'Attendance' },
              { teacher: 'Rajesh Nair', role: 'HOD Physics', action: 'Uploaded Lecture Slides & Laser Bench Videos for Class 9 Optics', time: '2 hours ago', badge: 'Materials' },
              { teacher: 'Admissions Office', role: 'Registrar', action: 'Enrolled Aarav Patel & Sneha Kulkarni into 2026-27 Academic Roster', time: '3 hours ago', badge: 'Admissions' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {act.teacher[0]}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{act.teacher}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{act.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Upcoming Events & Notices / Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Institutional Events */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Upcoming Institutional Academic Events</h3>
            </div>
            <span className="text-xs text-slate-500">October 2026</span>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Term 1 Mid-Year Examination Commencement', date: 'Oct 14, 2026', time: '09:00 AM - 12:00 PM', hall: 'All Examination Halls', type: 'Examination', color: 'border-l-4 border-l-rose-500' },
              { title: 'CBSE Regional Science & Math Exhibition', date: 'Oct 19, 2026', time: '10:00 AM - 04:00 PM', hall: 'Main Auditorium', type: 'Exhibition', color: 'border-l-4 border-l-indigo-500' },
              { title: 'Parent-Teacher Academic Review Meeting (Term 1)', date: 'Oct 24, 2026', time: '08:30 AM - 01:30 PM', hall: 'Assigned Classrooms', type: 'PTM', color: 'border-l-4 border-l-amber-500' },
            ].map((evt, i) => (
              <div key={i} className={`p-3 bg-slate-50 rounded-xl border border-slate-200 ${evt.color} space-y-1`}>
                <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                  <span>{evt.title}</span>
                  <span className="text-[10px] font-mono text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {evt.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>{evt.date} • {evt.time}</span>
                  <span>|</span>
                  <span>{evt.hall}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Circulars */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Notices & Campus Circulars</h3>
            </div>
            <button
              onClick={() => showToast('Opened Circular Composer.')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Publish Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {adminNotices.map(notice => (
              <div key={notice.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs">{notice.title}</h4>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      notice.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {notice.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Audience: <strong>{notice.audience}</strong></span>
                  <span>{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Users2,
  Send,
  X,
  Check,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface LeaveApplication {
  id: string;
  leaveType: 'Casual Leave' | 'Sick Leave' | 'Earned Leave' | 'Duty Leave' | 'Maternity/Paternity';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  substituteTeacherName: string;
  assignedPeriods: string[];
  status: 'Pending HOD Approval' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface SubstitutionClass {
  id: string;
  date: string;
  period: string;
  time: string;
  absentTeacherName: string;
  subject: string;
  classGrade: string;
  room: string;
  assignedTopicNotes: string;
  status: 'Upcoming' | 'Conducted' | 'Acknowledged';
}

export const TeacherLeaveSubstituteView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'my-leaves' | 'substitutions'>('my-leaves');
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Leave balances
  const [leaveBalance] = useState({
    casual: 8,
    sick: 6,
    earned: 14,
    duty: 5
  });

  // Leave Applications
  const [leaves, setLeaves] = useState<LeaveApplication[]>([
    {
      id: 'LV-201',
      leaveType: 'Duty Leave',
      startDate: '2026-10-18',
      endDate: '2026-10-19',
      totalDays: 2,
      reason: 'Attending CBSE Capacity Building Workshop on Artificial Intelligence in Pedagogy.',
      substituteTeacherName: 'Priyanka Sen (Senior Science Faculty)',
      assignedPeriods: ['Class 8-A Math (P1)', 'Class 9-B Physics (P3)'],
      status: 'Approved',
      appliedOn: '2026-10-01'
    },
    {
      id: 'LV-202',
      leaveType: 'Casual Leave',
      startDate: '2026-10-24',
      endDate: '2026-10-24',
      totalDays: 1,
      reason: 'Personal family emergency.',
      substituteTeacherName: 'Rajesh Nair',
      assignedPeriods: ['Class 10-A Chemistry (P5)'],
      status: 'Pending HOD Approval',
      appliedOn: '2026-10-02'
    }
  ]);

  // Substitutions assigned TO current teacher
  const [substitutions, setSubstitutions] = useState<SubstitutionClass[]>([
    {
      id: 'SUB-401',
      date: '2026-10-05',
      period: 'Period 4 (11:05 - 11:50 AM)',
      time: '11:05 AM',
      absentTeacherName: 'Mr. Arvind Saxena',
      subject: 'Social Science',
      classGrade: 'Class 8-B',
      room: 'Room 303',
      assignedTopicNotes: 'Supervise Chapter 4: The Indian Constitution revision quiz. Answers in textbook page 52.',
      status: 'Upcoming'
    },
    {
      id: 'SUB-402',
      date: '2026-09-29',
      period: 'Period 2 (09:15 - 10:00 AM)',
      time: '09:15 AM',
      absentTeacherName: 'Ms. Shalini Gupta',
      subject: 'English Literature',
      classGrade: 'Class 9-A',
      room: 'Room 201',
      assignedTopicNotes: 'Reading comprehension exercise: The Sound of Music.',
      status: 'Conducted'
    }
  ]);

  // Apply Form State
  const [leaveType, setLeaveType] = useState<LeaveApplication['leaveType']>('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [substituteTeacher, setSubstituteTeacher] = useState('Priyanka Sen');

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      showToast('Please fill all mandatory fields.', 'warning');
      return;
    }

    const newLeave: LeaveApplication = {
      id: `LV-${Date.now().toString().slice(-4)}`,
      leaveType,
      startDate,
      endDate,
      totalDays: 1,
      reason,
      substituteTeacherName: substituteTeacher,
      assignedPeriods: ['Class 8-A Period 1', 'Class 9-B Period 3'],
      status: 'Pending HOD Approval',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setLeaves(prev => [newLeave, ...prev]);
    showToast(`Leave application submitted for approval.`);
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Submitted Leave Request: ${leaveType}`,
      details: `${startDate} to ${endDate} (Substitute: ${substituteTeacher})`,
      category: 'academic'
    });

    setStartDate('');
    setEndDate('');
    setReason('');
    setShowApplyModal(false);
  };

  const handleConductSubstitution = (id: string) => {
    setSubstitutions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: 'Conducted' } : s))
    );
    showToast('Substitution class marked as conducted.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Faculty Leave & Substitution Management
              </h2>
              <p className="text-xs text-slate-500">
                Apply for academic leave, adjust period coverage, request substitutes, and view assigned coverage.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balance Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Casual Leave</div>
          <div className="text-xl font-bold text-slate-900">{leaveBalance.casual} <span className="text-xs font-normal text-slate-400">Days</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold">Available</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Medical / Sick</div>
          <div className="text-xl font-bold text-slate-900">{leaveBalance.sick} <span className="text-xs font-normal text-slate-400">Days</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold">Available</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Earned Leave</div>
          <div className="text-xl font-bold text-slate-900">{leaveBalance.earned} <span className="text-xs font-normal text-slate-400">Days</span></div>
          <div className="text-[10px] text-indigo-600 font-semibold">Accumulated</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Duty Leave (OD)</div>
          <div className="text-xl font-bold text-slate-900">{leaveBalance.duty} <span className="text-xs font-normal text-slate-400">Days</span></div>
          <div className="text-[10px] text-blue-600 font-semibold">Workshops & Exams</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('my-leaves')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'my-leaves'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Leave Applications</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-white/20 text-white">
            {leaves.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('substitutions')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'substitutions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Assigned Substitution Classes</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-indigo-50 text-indigo-700 font-bold">
            {substitutions.filter(s => s.status === 'Upcoming').length} Upcoming
          </span>
        </button>
      </div>

      {/* MY LEAVES TAB */}
      {activeTab === 'my-leaves' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Substitute Assigned</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applied Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaves.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{l.leaveType}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {l.startDate} {l.startDate !== l.endDate ? `to ${l.endDate}` : ''}
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-600">{l.totalDays} Day(s)</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{l.reason}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{l.substituteTeacherName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          l.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : l.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{l.appliedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBSTITUTIONS TAB */}
      {activeTab === 'substitutions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {substitutions.map(sub => (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Substitute Coverage
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'Conducted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{sub.subject} • {sub.classGrade}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Covering for absent faculty: <strong className="text-slate-700">{sub.absentTeacherName}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sub.date} ({sub.period})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location: {sub.room}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-200/60 mt-1">
                    <strong>HOD Notes:</strong> {sub.assignedTopicNotes}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                {sub.status === 'Upcoming' ? (
                  <button
                    onClick={() => handleConductSubstitution(sub.id)}
                    className="w-full py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 text-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Class Conducted</span>
                  </button>
                ) : (
                  <div className="text-center text-slate-400 text-xs font-semibold py-1">
                    Class Completed & Attendance Logged
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* APPLY LEAVE MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">Apply for Academic Leave</h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Leave Type *</label>
                <select
                  value={leaveType}
                  onChange={e => setLeaveType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                >
                  <option value="Casual Leave">Casual Leave (Balance: {leaveBalance.casual})</option>
                  <option value="Sick Leave">Sick / Medical Leave (Balance: {leaveBalance.sick})</option>
                  <option value="Earned Leave">Earned Leave (Balance: {leaveBalance.earned})</option>
                  <option value="Duty Leave">Duty Leave / On-Duty (Balance: {leaveBalance.duty})</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">From Date *</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">To Date *</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nominated Substitute Teacher</label>
                <select
                  value={substituteTeacher}
                  onChange={e => setSubstituteTeacher(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                >
                  <option value="Priyanka Sen">Priyanka Sen (Science & Math)</option>
                  <option value="Rajesh Nair">Rajesh Nair (Physics Senior)</option>
                  <option value="Dr. Alok Verma">Dr. Alok Verma (HOD)</option>
                  <option value="Shalini Gupta">Shalini Gupta (Languages)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Reason for Leave *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the reason clearly for HOD and Principal approval..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl font-semibold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

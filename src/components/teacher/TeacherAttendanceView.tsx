import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  Save,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Info,
  X,
  FileSpreadsheet,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface StudentAttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  remarks?: string;
}

export const TeacherAttendanceView: React.FC = () => {
  const { showToast, activeFilter, drillDown } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState<string>('Class 8-A');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [attendanceType, setAttendanceType] = useState<'daily' | 'subject'>('daily');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Absent' | 'Late' | 'Leave'>('All');
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionStudent, setCorrectionStudent] = useState<StudentAttendanceRecord | null>(null);
  const [correctionNewStatus, setCorrectionNewStatus] = useState<'Present' | 'Absent' | 'Late' | 'Leave'>('Present');
  const [correctionReason, setCorrectionReason] = useState('');

  // Sync with global drilldown active filter
  useEffect(() => {
    if (activeFilter.classGrade) {
      setSelectedClass(activeFilter.classGrade);
    }
    if (activeFilter.status && ['Present', 'Absent', 'Late', 'Leave'].includes(activeFilter.status)) {
      setStatusFilter(activeFilter.status as any);
    }
  }, [activeFilter]);

  // Attendance Records
  const [records, setRecords] = useState<StudentAttendanceRecord[]>([
    {
      id: 'att-1',
      rollNo: '01',
      name: 'Aarav Patel',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      status: 'Present'
    },
    {
      id: 'att-2',
      rollNo: '02',
      name: 'Sneha Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      status: 'Present'
    },
    {
      id: 'att-3',
      rollNo: '03',
      name: 'Aditya Birla',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      status: 'Late',
      remarks: 'Arrived 15 mins late due to school bus delay.'
    },
    {
      id: 'att-4',
      rollNo: '04',
      name: 'Diya Sen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      status: 'Present'
    },
    {
      id: 'att-5',
      rollNo: '05',
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      status: 'Absent',
      remarks: 'No intimation received.'
    },
    {
      id: 'att-6',
      rollNo: '06',
      name: 'Pooja Hegde',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      status: 'Leave',
      remarks: 'Medical leave approved by principal.'
    },
    {
      id: 'att-7',
      rollNo: '07',
      name: 'Nikhil Roy',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      status: 'Present'
    },
    {
      id: 'att-8',
      rollNo: '08',
      name: 'Ananya Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
      status: 'Present'
    }
  ]);

  const handleStatusChange = (id: string, status: StudentAttendanceRecord['status']) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleBulkMark = (status: 'Present' | 'Absent') => {
    setRecords(prev => prev.map(r => ({ ...r, status })));
    showToast(`Marked all students as ${status}.`);
  };

  const handleSaveAttendance = () => {
    const presentCount = records.filter(r => r.status === 'Present').length;
    showToast(`Attendance register saved for ${selectedClass} (${presentCount}/${records.length} Present).`);
  };

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionStudent || !correctionReason.trim()) {
      showToast('Please specify reason for attendance correction.', 'warning');
      return;
    }

    setRecords(prev => prev.map(r => 
      r.id === correctionStudent.id 
        ? { ...r, status: correctionNewStatus, remarks: `Corrected: ${correctionReason}` }
        : r
    ));

    showToast(`Attendance correction submitted & approved for ${correctionStudent.name}!`);
    setShowCorrectionModal(false);
    setCorrectionStudent(null);
    setCorrectionReason('');
  };

  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const leaveCount = records.filter(r => r.status === 'Leave').length;
  const attendanceRate = Math.round((presentCount / records.length) * 100);

  const handleExportCSV = () => {
    const headers = ['Roll No', 'Student Name', 'Date', 'Class', 'Subject', 'Status', 'Remarks'];
    const rows = records.map(r => [
      r.rollNo,
      `"${r.name}"`,
      selectedDate,
      `"${selectedClass}"`,
      `"${selectedSubject}"`,
      r.status,
      `"${r.remarks || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendance_${selectedClass}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported attendance register to CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Attendance & Roll Call</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Daily & Subject-Wise Attendance Register</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              {attendanceRate}% Present Today
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mark individual statuses, bulk update, register correction workflows, and track persistent absenteeism.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleSaveAttendance}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Attendance Register</span>
          </button>
        </div>
      </div>

      {/* Control Panel & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Attendance Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class / Grade</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-semibold"
            >
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 9-B">Class 9-B</option>
              <option value="Class 10-A">Class 10-A</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Mode</label>
            <select
              value={attendanceType}
              onChange={e => setAttendanceType(e.target.value as any)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
            >
              <option value="daily">Daily Morning Roll Call</option>
              <option value="subject">Subject-Specific Period Attendance</option>
            </select>
          </div>

          {attendanceType === 'subject' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Mathematics">Mathematics (Period 1)</option>
                <option value="Physics">Physics (Period 3)</option>
                <option value="Chemistry">Chemistry (Period 5)</option>
              </select>
            </div>
          )}
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2 pt-3 sm:pt-0">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick Bulk:</span>
          <button
            onClick={() => handleBulkMark('Present')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-semibold transition-colors flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={() => handleBulkMark('Absent')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg font-semibold transition-colors flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Mark All Absent</span>
          </button>
        </div>
      </div>

      {/* STAT SUMMARY COUNTERS (Interactive Drill-Down Filters) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusFilter(prev => prev === 'Present' ? 'All' : 'Present')}
          className={`p-4 rounded-xl border shadow-2xs flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group ${
            statusFilter === 'Present' ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400' : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
          title="Click to filter roster by Present students"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase group-hover:text-emerald-700">Present</span>
              {statusFilter === 'Present' && (
                <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE</span>
              )}
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-600">{presentCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            ✓
          </div>
        </div>

        <div
          onClick={() => setStatusFilter(prev => prev === 'Absent' ? 'All' : 'Absent')}
          className={`p-4 rounded-xl border shadow-2xs flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group ${
            statusFilter === 'Absent' ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400' : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
          title="Click to filter roster by Absent students"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase group-hover:text-rose-700">Absent</span>
              {statusFilter === 'Absent' && (
                <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE</span>
              )}
            </div>
            <div className="text-2xl font-bold font-mono text-rose-600">{absentCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors">
            ✗
          </div>
        </div>

        <div
          onClick={() => setStatusFilter(prev => prev === 'Late' ? 'All' : 'Late')}
          className={`p-4 rounded-xl border shadow-2xs flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group ${
            statusFilter === 'Late' ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400' : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
          title="Click to filter roster by Late students"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase group-hover:text-amber-700">Late Arrival</span>
              {statusFilter === 'Late' && (
                <span className="text-[9px] bg-amber-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE</span>
              )}
            </div>
            <div className="text-2xl font-bold font-mono text-amber-600">{lateCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-white transition-colors">
            ⏱️
          </div>
        </div>

        <div
          onClick={() => setStatusFilter(prev => prev === 'Leave' ? 'All' : 'Leave')}
          className={`p-4 rounded-xl border shadow-2xs flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group ${
            statusFilter === 'Leave' ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400' : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
          title="Click to filter roster by Approved Leave"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase group-hover:text-blue-700">Approved Leave</span>
              {statusFilter === 'Leave' && (
                <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE</span>
              )}
            </div>
            <div className="text-2xl font-bold font-mono text-blue-600">{leaveCount}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
            📝
          </div>
        </div>
      </div>

      {/* ATTENDANCE ROSTER TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <span>Student Roster ({records.length} enrolled)</span>
            {statusFilter !== 'All' && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded-full font-bold text-[11px]">
                <Filter className="w-3 h-3 text-indigo-600" />
                <span>Filtered: {statusFilter} ({records.filter(r => r.status === statusFilter).length})</span>
                <button
                  onClick={() => setStatusFilter('All')}
                  className="ml-1 text-indigo-600 hover:text-indigo-950 cursor-pointer"
                  title="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <span className="text-slate-500 font-mono">{selectedClass} • {selectedDate}</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3 w-16">Roll #</th>
              <th className="p-3">Candidate</th>
              <th className="p-3 text-center">Attendance Status</th>
              <th className="p-3">Remarks / Reason</th>
              <th className="p-3 text-right">Adjustment Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records
              .filter(r => statusFilter === 'All' || r.status === statusFilter)
              .map(r => (
              <tr
                key={r.id}
                onClick={() => drillDown('students', { originLabel: `${selectedClass} Attendance`, title: `Student Profile: ${r.name}`, filter: { studentName: r.name, classGrade: selectedClass } })}
                className="hover:bg-indigo-50/70 cursor-pointer transition-colors group"
                title={`Click to view ${r.name}'s comprehensive student record`}
              >
                <td className="p-3 font-mono font-bold text-slate-700">
                  {r.rollNo}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 group-hover:text-indigo-700">
                      <span>{r.name}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                </td>
                <td className="p-3" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1.5">
                    {(['Present', 'Absent', 'Late', 'Leave'] as const).map(status => {
                      const isSelected = r.status === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(r.id, status)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            isSelected
                              ? status === 'Present'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : status === 'Absent'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : status === 'Late'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3 text-slate-500 text-[11px] max-w-xs truncate">
                  {r.remarks || '—'}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => {
                      setCorrectionStudent(r);
                      setCorrectionNewStatus(r.status);
                      setCorrectionReason('');
                      setShowCorrectionModal(true);
                    }}
                    className="text-[11px] text-[#3d5ee1] font-semibold hover:underline"
                  >
                    Request Correction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: ATTENDANCE CORRECTION REQUEST */}
      {showCorrectionModal && correctionStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Attendance Correction Request</h3>
                <p className="text-[11px] text-slate-500">Record adjustment for {correctionStudent.name} (Roll #{correctionStudent.rollNo})</p>
              </div>
              <button onClick={() => setShowCorrectionModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCorrectionSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Recorded Status:</span>
                  <span className="font-bold text-slate-800">{correctionStudent.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Date & Class:</span>
                  <span className="font-mono text-slate-700">{selectedDate} ({selectedClass})</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Intended Status</label>
                <select
                  value={correctionNewStatus}
                  onChange={e => setCorrectionNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                >
                  <option value="Present">Present (Confirmed in Session)</option>
                  <option value="Absent">Absent (Did not attend)</option>
                  <option value="Late">Late (Excused delay)</option>
                  <option value="Leave">Leave (Approved sanction)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Justification / Correction Reason *</label>
                <textarea
                  rows={3}
                  required
                  value={correctionReason}
                  onChange={e => setCorrectionReason(e.target.value)}
                  placeholder="e.g., Student was participating in inter-school science debate or arrived with medical certificate..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-xs"
                >
                  Submit & Authorize Correction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

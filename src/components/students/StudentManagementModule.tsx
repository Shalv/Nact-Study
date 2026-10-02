import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Play,
  FileText,
  UserCheck,
  Search,
  RefreshCw,
  Plus,
  RotateCcw,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  User,
  ShieldCheck,
  X,
  CreditCard,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentEnrollment } from '../../types';

export const StudentManagementModule: React.FC = () => {
  const {
    enrollments,
    currentRole,
    setActiveModule,
    setSelectedCourseForPlayer,
    courses,
    showToast,
    activeFilter,
    drillDown
  } = useApp();

  const [viewMode, setViewMode] = useState<'admin-roster' | 'student-portal'>('admin-roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentEnrollment | null>(null);

  // Sync with Global Drill-Down Active Filter
  useEffect(() => {
    if (activeFilter.classGrade && activeFilter.classGrade !== 'All') {
      setSearchQuery(activeFilter.classGrade);
    }
    if (activeFilter.gpaGrade) {
      showToast(`Filtering roster for: ${activeFilter.gpaGrade}`);
    }
  }, [activeFilter]);

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch =
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourseFilter === 'All' ||
      e.courseTitle.toLowerCase().includes(selectedCourseFilter.toLowerCase());

    return matchesSearch && matchesCourse;
  });

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Email', 'Course', 'Progress %', 'Attendance %', 'Assignments', 'Certificate', 'Fee Status'];
    const rows = filteredEnrollments.map(e => [
      `"${e.studentName}"`,
      e.studentEmail,
      `"${e.courseTitle}"`,
      e.progressPercentage,
      e.attendancePercentage,
      `"${e.assignmentsSubmittedCount}/${e.totalAssignmentsCount}"`,
      e.certificateIssued ? 'Issued' : 'Pending',
      e.paymentStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredEnrollments.length} student records to CSV.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Student Management & Learning Portal</span>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
              {filteredEnrollments.length} Active Records
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor cohorts, lesson completion progress, attendance rates, assignments, and digital credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => showToast('Student directory refreshed from cloud database.')}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            title="Refresh records"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveModule('student-admission')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Admission</span>
          </button>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium ml-1">
            <button
              onClick={() => setViewMode('admin-roster')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'admin-roster' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Roster (Admin)
            </button>
            <button
              onClick={() => setViewMode('student-portal')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'student-portal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learner Dashboard (Portal)
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Academic Roster (Admin View) */}
      {viewMode === 'admin-roster' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl text-xs shadow-2xs">
            <div className="flex items-center gap-3 flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search enrolled students by name, email, class grade, or course..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 focus:outline-none text-xs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 font-medium">Filter Course:</span>
              <select
                value={selectedCourseFilter}
                onChange={e => setSelectedCourseFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 text-xs font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Courses & Grades</option>
                <option value="Data Science">Data Science Masterclass</option>
                <option value="Executive">Executive Finance</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Student Profile</th>
                    <th className="py-3 px-4">Enrolled Course / Class</th>
                    <th className="py-3 px-4">Course Progress</th>
                    <th className="py-3 px-4 font-mono text-center">Attendance</th>
                    <th className="py-3 px-4 font-mono text-center">Assignments</th>
                    <th className="py-3 px-4 font-mono text-center">Quiz Avg</th>
                    <th className="py-3 px-4 text-center">Certificate</th>
                    <th className="py-3 px-4 text-right">Fee Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnrollments.map(enr => (
                    <tr
                      key={enr.id}
                      onClick={() => setSelectedStudentForDetail(enr)}
                      className="hover:bg-indigo-50/80 cursor-pointer transition-colors group"
                      title="Click to view detailed student dossier, attendance, and exam grades"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#3d5ee1] group-hover:text-white transition-colors">
                            {enr.studentName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-[#3d5ee1] transition-colors flex items-center gap-1.5">
                              <span>{enr.studentName}</span>
                              <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#3d5ee1] transition-colors" />
                            </div>
                            <div className="text-[11px] text-slate-400">{enr.studentEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-800 font-medium">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium group-hover:bg-white group-hover:border group-hover:border-slate-200">
                          {enr.courseTitle}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: `${enr.progressPercentage}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-700 font-semibold">
                            {enr.progressPercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-center font-bold text-slate-800">
                        <span className={`px-2 py-0.5 rounded font-mono ${
                          enr.attendancePercentage >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {enr.attendancePercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-center text-slate-700">
                        {enr.assignmentsSubmittedCount}/{enr.totalAssignmentsCount}
                      </td>
                      <td className="py-3 px-4 font-mono text-center text-slate-900 font-semibold">
                        {enr.quizAverageScore > 0 ? `${enr.quizAverageScore}%` : 'Pending'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {enr.certificateIssued ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium rounded text-[10px] inline-flex items-center gap-1 mx-auto">
                            <Award className="w-3 h-3 text-emerald-600" /> Issued
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">In Progress</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-semibold text-[11px] px-2 py-0.5 rounded ${
                          enr.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {enr.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedStudentForDetail(enr)}
                          className="px-2.5 py-1 text-[11px] font-bold text-[#3d5ee1] hover:bg-indigo-100 rounded-md transition-colors"
                        >
                          View 360°
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Student Learning Portal (Learner Perspective) */
        <div className="space-y-6">
          {/* Student Welcome Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md">
            <div>
              <div className="text-xs font-mono text-indigo-400">STUDENT LEARNING PORTAL</div>
              <h2 className="text-lg font-bold mt-0.5">Welcome back, Aarav Patel</h2>
              <p className="text-xs text-slate-400 mt-1">
                Cohort #14 · Full-Stack Data Science & Generative AI Masterclass
              </p>
            </div>

            <button
              onClick={() => setActiveModule('lms')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Active Lesson</span>
            </button>
          </div>

          {/* Student Course Progress Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Curriculum Progress</span>
                <h3 className="text-base font-bold text-slate-900">Module 4: Retrieval-Augmented Generation (RAG) Architecture</h3>
              </div>
              <span className="text-2xl font-black text-[#3d5ee1]">78% Completed</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-[#3d5ee1] h-full rounded-full transition-all duration-500" style={{ width: '78%' }} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div
                onClick={() => drillDown('lms', { originLabel: 'Learner Portal', title: 'Video Lessons & Lectures' })}
                className="p-3 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-100 cursor-pointer transition-all space-y-0.5"
              >
                <div className="text-slate-500 text-[11px]">Video Lectures</div>
                <div className="text-sm font-bold text-slate-900">18 / 22 Watched</div>
              </div>
              <div
                onClick={() => drillDown('lms', { originLabel: 'Learner Portal', title: 'Interactive Coding Labs' })}
                className="p-3 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-100 cursor-pointer transition-all space-y-0.5"
              >
                <div className="text-slate-500 text-[11px]">Coding Labs</div>
                <div className="text-sm font-bold text-slate-900">6 / 8 Submitted</div>
              </div>
              <div
                onClick={() => drillDown('lms', { originLabel: 'Learner Portal', title: 'Quiz & Knowledge Checks' })}
                className="p-3 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-100 cursor-pointer transition-all space-y-0.5"
              >
                <div className="text-slate-500 text-[11px]">Quiz Scores</div>
                <div className="text-sm font-bold text-emerald-600">92.4% Avg</div>
              </div>
              <div
                onClick={() => drillDown('attendance', { originLabel: 'Learner Portal', title: 'Live Session Attendance' })}
                className="p-3 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-100 cursor-pointer transition-all space-y-0.5"
              >
                <div className="text-slate-500 text-[11px]">Live Attendance</div>
                <div className="text-sm font-bold text-[#3d5ee1]">95% Rate</div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-xs cursor-pointer transition-all space-y-1 group"
            >
              <FileText className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-slate-900 group-hover:text-indigo-700">Assignments (1 Pending)</div>
              <div className="text-slate-500 text-[11px]">Due Oct 28: Production Document RAG</div>
            </div>

            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-xs cursor-pointer transition-all space-y-1 group"
            >
              <Calendar className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-slate-900 group-hover:text-emerald-700">Live Office Hours</div>
              <div className="text-slate-500 text-[11px]">Tonight at 7:00 PM with Vikramaditya Roy</div>
            </div>

            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-400 hover:shadow-xs cursor-pointer transition-all space-y-1 group"
            >
              <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-slate-900 group-hover:text-amber-700">Verified Certificate</div>
              <div className="text-slate-500 text-[11px]">Credential #NACT-CERT-2026-9042 Available</div>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Record Modal: Student 360° Dossier */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden space-y-0 my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-lg font-black text-white">
                  {selectedStudentForDetail.studentName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedStudentForDetail.studentName}</h3>
                    <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-mono font-bold">
                      {selectedStudentForDetail.paymentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200 mt-0.5">{selectedStudentForDetail.studentEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs text-slate-700">
              {/* Academic Overview Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
                  <div className="text-lg font-black text-emerald-600 mt-0.5">
                    {selectedStudentForDetail.attendancePercentage}%
                  </div>
                  <span className="text-[10px] text-slate-500">Above Quota</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Course Progress</span>
                  <div className="text-lg font-black text-indigo-600 mt-0.5">
                    {selectedStudentForDetail.progressPercentage}%
                  </div>
                  <span className="text-[10px] text-slate-500">Active</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Assignments</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {selectedStudentForDetail.assignmentsSubmittedCount}/{selectedStudentForDetail.totalAssignmentsCount}
                  </div>
                  <span className="text-[10px] text-slate-500">Submitted</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Quiz Average</span>
                  <div className="text-lg font-black text-blue-600 mt-0.5">
                    {selectedStudentForDetail.quizAverageScore > 0 ? `${selectedStudentForDetail.quizAverageScore}%` : 'N/A'}
                  </div>
                  <span className="text-[10px] text-slate-500">Proctored</span>
                </div>
              </div>

              {/* Enrolled Details */}
              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 text-sm">Enrolled Program & Cohort</span>
                  <span className="text-[11px] font-mono text-indigo-600">ID: {selectedStudentForDetail.id}</span>
                </div>
                <p className="font-semibold text-slate-900 text-xs">{selectedStudentForDetail.courseTitle}</p>
                <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-1">
                  <span>Enrolled: {selectedStudentForDetail.enrollmentDate}</span>
                  <span>•</span>
                  <span>Certificate: {selectedStudentForDetail.certificateIssued ? 'Issued' : 'Pending Completion'}</span>
                </div>
              </div>

              {/* Guardian & Emergency Contacts */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                  Contact & Communication
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Student Email</div>
                      <div className="font-semibold text-slate-800">{selectedStudentForDetail.studentEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">WhatsApp / Contact</div>
                      <div className="font-semibold text-slate-800">{selectedStudentForDetail.studentPhone || '+91 98765 43210'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    showToast(`Report card generated for ${selectedStudentForDetail.studentName}`);
                  }}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Report Card</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast(`WhatsApp message opened for ${selectedStudentForDetail.studentName}`);
                      setSelectedStudentForDetail(null);
                      drillDown('whatsapp', { originLabel: selectedStudentForDetail.studentName, title: `Chat with ${selectedStudentForDetail.studentName}` });
                    }}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Parent</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStudentForDetail(null);
                      drillDown('fees', { originLabel: selectedStudentForDetail.studentName, title: `Fee Ledger for ${selectedStudentForDetail.studentName}`, filter: { formTab: 'fees' } });
                    }}
                    className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Fee Ledger</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

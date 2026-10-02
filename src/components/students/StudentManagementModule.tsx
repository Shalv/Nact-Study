import React, { useState } from 'react';
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
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentEnrollment } from '../../types';

export const StudentManagementModule: React.FC = () => {
  const { enrollments, currentRole, setActiveModule, setSelectedCourseForPlayer, courses } = useApp();
  const [viewMode, setViewMode] = useState<'admin-roster' | 'student-portal'>('admin-roster');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEnrollments = enrollments.filter(e =>
    e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Student Management & Learning Portal</span>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
              1,850 Active Learners
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor cohorts, lesson completion progress, attendance rates, assignments, and digital credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('admin-roster')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'admin-roster' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Roster (Admin)
            </button>
            <button
              onClick={() => setViewMode('student-portal')}
              className={`px-3 py-1 rounded transition-colors ${
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
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search enrolled students by name, email, or course..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 focus:outline-none text-xs"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Enrolled Course</th>
                  <th className="py-2.5 px-3">Course Progress</th>
                  <th className="py-2.5 px-3 font-mono">Attendance</th>
                  <th className="py-2.5 px-3 font-mono">Assignments</th>
                  <th className="py-2.5 px-3 font-mono">Quiz Avg</th>
                  <th className="py-2.5 px-3">Certificate</th>
                  <th className="py-2.5 px-3 text-right">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnrollments.map(enr => (
                  <tr key={enr.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{enr.studentName}</div>
                      <div className="text-[11px] text-slate-400">{enr.studentEmail}</div>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-slate-800 font-medium">
                      {enr.courseTitle}
                    </td>
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3 font-mono text-slate-900 font-medium">
                      {enr.attendancePercentage}%
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      {enr.assignmentsSubmittedCount}/{enr.totalAssignmentsCount}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-900 font-semibold">
                      {enr.quizAverageScore > 0 ? `${enr.quizAverageScore}%` : 'Pending'}
                    </td>
                    <td className="py-3 px-3">
                      {enr.certificateIssued ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium rounded text-[10px] flex items-center gap-1 w-fit">
                          <Award className="w-3 h-3 text-emerald-600" /> Issued
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">In Progress</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-semibold text-emerald-700 text-[11px]">
                        {enr.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mode 2: Student Learning Portal (Learner Perspective) */
        <div className="space-y-6">
          {/* Student Welcome Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md">
            <div>
              <div className="text-xs font-mono text-indigo-400">STUDENT LEARNING PORTAL</div>
              <h2 className="text-lg font-bold mt-0.5">Welcome back, Aarav Patel</h2>
              <p className="text-xs text-slate-400 mt-1">
                Cohort #14 · Full-Stack Data Science & Generative AI Masterclass
              </p>
            </div>

            <button
              onClick={() => setActiveModule('lms')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Active Lesson</span>
            </button>
          </div>

          {/* Student Course Progress Box (Exact Prompt Specification) */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Course Completion Progress</h3>
                <p className="text-xs text-slate-500">Full-Stack Data Science & Generative AI Masterclass</p>
              </div>
              <span className="text-lg font-bold font-mono text-indigo-600">85% Complete</span>
            </div>

            {/* ASCII / Visual Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="font-mono text-xs text-slate-600">
                ██████████████░░ 85%
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded">
                <span className="text-slate-500 block text-[11px]">Modules</span>
                <span className="font-mono font-bold text-slate-900 text-sm">3 / 3</span>
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <span className="text-slate-500 block text-[11px]">Lessons</span>
                <span className="font-mono font-bold text-slate-900 text-sm">5 / 6</span>
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <span className="text-slate-500 block text-[11px]">Assignments</span>
                <span className="font-mono font-bold text-slate-900 text-sm">1 / 2</span>
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <span className="text-slate-500 block text-[11px]">Quiz Score</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">90%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <span className="text-slate-500 block text-[11px]">Attendance</span>
                <span className="font-mono font-bold text-slate-900 text-sm">92%</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 cursor-pointer transition-all space-y-1"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <div className="font-bold text-slate-900">Assignments (1 Pending)</div>
              <div className="text-slate-500 text-[11px]">Due Oct 28: Production Document RAG</div>
            </div>

            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 cursor-pointer transition-all space-y-1"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div className="font-bold text-slate-900">Live Office Hours</div>
              <div className="text-slate-500 text-[11px]">Tonight at 7:00 PM with Vikramaditya Roy</div>
            </div>

            <div
              onClick={() => setActiveModule('lms')}
              className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 cursor-pointer transition-all space-y-1"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <div className="font-bold text-slate-900">Verified Certificate</div>
              <div className="text-slate-500 text-[11px]">Credential #NACT-CERT-2026-9042 Available</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

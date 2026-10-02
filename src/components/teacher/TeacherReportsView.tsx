import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Printer,
  Filter,
  Users2,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  GraduationCap,
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherReportsView: React.FC = () => {
  const { showToast } = useApp();

  const [selectedReportTab, setSelectedReportTab] = useState<
    'class-performance' | 'subject-performance' | 'attendance-report' | 'assignment-report' | 'exam-analysis' | 'weak-strong'
  >('class-performance');

  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  // Performance data per class
  const classStats = {
    totalStudents: 32,
    classAverage: 84.5,
    passRate: 97,
    topScore: 98,
    attendanceRate: 94.8,
    gradeDistribution: [
      { grade: 'A+ (90-100%)', count: 12, percent: 37.5, color: 'bg-emerald-500' },
      { grade: 'A (80-89%)', count: 11, percent: 34.4, color: 'bg-blue-500' },
      { grade: 'B (70-79%)', count: 6, percent: 18.8, color: 'bg-indigo-500' },
      { grade: 'C (60-69%)', count: 2, percent: 6.2, color: 'bg-amber-500' },
      { grade: 'D/E (<60%)', count: 1, percent: 3.1, color: 'bg-rose-500' },
    ]
  };

  // Weak vs Strong Student breakdown
  const studentAnalysis = [
    { name: 'Aarav Patel', rollNo: '01', overallScore: 98, category: 'Top Achiever', strongTopics: 'Polynomial Factorization, Quadratic Equations', focusArea: 'None (Candidate for Olympiad)', trend: '+3%' },
    { name: 'Sneha Kulkarni', rollNo: '02', overallScore: 95, category: 'Top Achiever', strongTopics: 'Geometry Proofs, Linear Equations', focusArea: 'Word Problem speed', trend: '+1%' },
    { name: 'Elena Rostova', rollNo: '04', overallScore: 89, category: 'Consistent Performer', strongTopics: 'Algebraic Identities', focusArea: 'Negative Exponent Rules', trend: '+4%' },
    { name: 'David Kim', rollNo: '07', overallScore: 78, category: 'Needs Reinforcement', strongTopics: 'Arithmetic & Number Systems', focusArea: 'Multi-step algebraic transposition', trend: '-2%' },
    { name: 'Rohan Deshmukh', rollNo: '14', overallScore: 58, category: 'Remedial Priority', strongTopics: 'Basic Integers & Graphs', focusArea: 'Linear equations with fractions & variables', trend: '-5%' },
  ];

  // Subject Comparison Matrix
  const subjectMatrix = [
    { subject: 'Mathematics', averageScore: 84.5, syllabusCovered: '68%', assignmentsCompleted: '96%', topStudent: 'Aarav Patel (98%)' },
    { subject: 'Physics', averageScore: 81.2, syllabusCovered: '62%', assignmentsCompleted: '91%', topStudent: 'Marcus Chen (96%)' },
    { subject: 'Chemistry', averageScore: 83.0, syllabusCovered: '65%', assignmentsCompleted: '94%', topStudent: 'Sneha Kulkarni (95%)' },
    { subject: 'Computer Science', averageScore: 89.4, syllabusCovered: '75%', assignmentsCompleted: '98%', topStudent: 'Aarav Patel (100%)' }
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Roll No,Name,Overall Score,Category,Focus Area', ...studentAnalysis.map(s => `${s.rollNo},${s.name},${s.overallScore}%,${s.category},"${s.focusArea}"`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedClass}_Academic_Performance_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Academic report exported to CSV successfully.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Academic Performance MIS & Student Analytics
              </h2>
              <p className="text-xs text-slate-500">
                In-depth reports for class trends, syllabus completion, exam moderation, and remedial interventions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Cohort and Subject Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <span className="font-semibold text-slate-500">Class Cohort:</span>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 8-B">Class 8-B</option>
              <option value="Class 9-B">Class 9-B</option>
              <option value="Class 10-A">Class 10-A</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <span className="font-semibold text-slate-500">Academic Subject:</span>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
        </div>

        <div className="text-slate-400">
          Showing verified term metrics for CBSE 2026–27
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'class-performance', label: 'Class Overview' },
          { id: 'weak-strong', label: 'Weak vs. Strong Students' },
          { id: 'subject-performance', label: 'Subject Benchmark Matrix' },
          { id: 'attendance-report', label: 'Attendance & Punctuality' },
          { id: 'assignment-report', label: 'Assignment Turnaround' },
          { id: 'exam-analysis', label: 'Exam Item Analysis' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedReportTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedReportTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CLASS OVERVIEW */}
      {selectedReportTab === 'class-performance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Class Average</div>
              <div className="text-2xl font-bold text-indigo-600">{classStats.classAverage}%</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+2.4% vs Term 1 Diagnostic</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Pass Rate</div>
              <div className="text-2xl font-bold text-emerald-600">{classStats.passRate}%</div>
              <div className="text-[10px] text-slate-400">31/32 Students Passed</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Class Highest</div>
              <div className="text-2xl font-bold text-slate-900">{classStats.topScore}%</div>
              <div className="text-[10px] text-slate-400">Aarav Patel (Roll 01)</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Attendance Rate</div>
              <div className="text-2xl font-bold text-blue-600">{classStats.attendanceRate}%</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Exceeds 75% CBSE Quota</div>
            </div>
          </div>

          {/* Grade Distribution Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Score & Grade Distribution Curve
              </h3>
              <span className="text-xs text-slate-400">Gaussian Bell Normalized</span>
            </div>

            <div className="space-y-3">
              {classStats.gradeDistribution.map(dist => (
                <div key={dist.grade} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-700">{dist.grade}</span>
                    <span className="text-slate-500 font-mono">
                      {dist.count} Students ({dist.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${dist.color} rounded-full transition-all`}
                      style={{ width: `${dist.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEAK VS STRONG STUDENT ANALYSIS */}
      {selectedReportTab === 'weak-strong' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Overall Score</th>
                  <th className="py-3 px-4">Performance Category</th>
                  <th className="py-3 px-4">Strong Topics</th>
                  <th className="py-3 px-4">Intervention & Focus Area</th>
                  <th className="py-3 px-4">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentAnalysis.map(student => (
                  <tr key={student.rollNo} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Roll: {student.rollNo}</div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{student.overallScore}%</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.category === 'Top Achiever'
                            ? 'bg-emerald-100 text-emerald-800'
                            : student.category === 'Consistent Performer'
                            ? 'bg-blue-100 text-blue-800'
                            : student.category === 'Needs Reinforcement'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {student.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{student.strongTopics}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{student.focusArea}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono font-bold ${
                          student.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {student.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECT BENCHMARK MATRIX */}
      {selectedReportTab === 'subject-performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectMatrix.map(subj => (
            <div
              key={subj.subject}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{subj.subject}</h3>
                <span className="text-xs font-bold text-indigo-600">{subj.averageScore}% Class Avg</span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Syllabus Covered</div>
                  <div className="font-bold text-slate-800">{subj.syllabusCovered}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">HW Completion</div>
                  <div className="font-bold text-emerald-600">{subj.assignmentsCompleted}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Top Candidate</div>
                  <div className="font-bold text-slate-800 truncate">{subj.topStudent}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ATTENDANCE & PUNCTUALITY */}
      {selectedReportTab === 'attendance-report' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Monthly Attendance Trajectory</h3>
            <span className="text-slate-400">September – October 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
              <div className="text-xl font-bold">96.2%</div>
              <div className="text-[10px] font-semibold mt-0.5">Regular Attendees (90%+)</div>
            </div>
            <div className="p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
              <div className="text-xl font-bold">2 Students</div>
              <div className="text-[10px] font-semibold mt-0.5">Marginal Risk (75-80%)</div>
            </div>
            <div className="p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200">
              <div className="text-xl font-bold">0 Students</div>
              <div className="text-[10px] font-semibold mt-0.5">Critical Non-Compliance (&lt;75%)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ASSIGNMENT REPORT */}
      {selectedReportTab === 'assignment-report' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Homework & Project Turnaround Speed</h3>
          <p className="text-slate-500">
            Average time between homework publication and student online submission is <strong>1.4 days</strong>.
            Evaluation turnaround by instructor is <strong>18 hours</strong> on average.
          </p>
        </div>
      )}

      {/* TAB 6: EXAM ITEM ANALYSIS */}
      {selectedReportTab === 'exam-analysis' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Diagnostic Exam Psychometrics & Item Discrimination</h3>
          <p className="text-slate-500">
            Question 14 (Algebraic Word Problems on speed & distance) had the highest error rate (42% incorrect),
            suggesting an area for differentiated class revision prior to the final exam.
          </p>
        </div>
      )}
    </div>
  );
};

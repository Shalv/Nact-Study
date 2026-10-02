import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Play,
  FileText,
  UserCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  Lock,
  Printer,
  Sparkles,
  TrendingUp,
  Upload,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentPortal: React.FC = () => {
  const {
    currentUser,
    enrollments,
    courses,
    orders,
    activityLogs,
    addActivityLog,
    showToast,
    instituteProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'classroom' | 'assignments' | 'results' | 'fees' | 'idcard' | 'activity'>('dashboard');

  // Strict student isolation: Only grab records belonging to this logged in student!
  const myEnrollment = enrollments.find(
    e => e.studentEmail === currentUser.email || e.studentId === currentUser.studentId
  ) || enrollments[0];

  const myOrders = orders.filter(
    o => o.customerEmail === currentUser.email || o.customerName === currentUser.name
  );

  const myActivityLogs = activityLogs.filter(a => a.userId === currentUser.id);

  // Assignment submissions for this student
  const [myAssignments, setMyAssignments] = useState([
    {
      id: 'asg-1',
      title: 'Production Transformer Architecture with FlashAttention',
      subject: 'Transformer Architectures & Self-Attention Mechanics',
      deadline: '2026-10-04',
      status: 'Graded',
      score: 98,
      total: 100,
      feedback: 'Outstanding tensor parallel implementation and low-latency benchmark by Prof. Vikramaditya Roy.',
      submittedUrl: 'https://github.com/aarav-patel/transformers-cuda'
    },
    {
      id: 'asg-2',
      title: 'Distributed RAG Pipeline with Milvus & vLLM',
      subject: 'Enterprise Retrieval-Augmented Generation (RAG)',
      deadline: '2026-10-12',
      status: 'Submitted - Under Review',
      score: null,
      total: 100,
      feedback: 'Awaiting faculty evaluation.',
      submittedUrl: 'https://github.com/aarav-patel/rag-vllm-engine'
    },
    {
      id: 'asg-3',
      title: 'Kubernetes GPU Operator & Model Serving Capstone',
      subject: 'Distributed Cloud Systems',
      deadline: '2026-10-20',
      status: 'Pending Submission',
      score: null,
      total: 100,
      feedback: 'Not submitted yet.',
      submittedUrl: ''
    }
  ]);

  const [newSubmissionUrl, setNewSubmissionUrl] = useState('');
  const [selectedAsgForSubmission, setSelectedAsgForSubmission] = useState<any | null>(null);

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubmissionUrl.trim()) return;

    setMyAssignments(prev =>
      prev.map(a =>
        a.id === selectedAsgForSubmission.id
          ? { ...a, status: 'Submitted - Under Review', submittedUrl: newSubmissionUrl }
          : a
      )
    );

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Submitted Homework Assignment`,
      details: `Uploaded repository link for "${selectedAsgForSubmission.title}"`,
      category: 'academic'
    });

    showToast(`Assignment "${selectedAsgForSubmission.title}" submitted to faculty.`);
    setSelectedAsgForSubmission(null);
    setNewSubmissionUrl('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#f7f7fa] min-h-screen">
      {/* Student Profile Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500 shadow-2xs shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Welcome back, {currentUser.name}!
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                Student Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Program: <strong>{myEnrollment.courseTitle}</strong> · ID: {currentUser.studentId || 'PRE-1001'} · Roll: AI-2026-104
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
              <Lock className="w-3 h-3 text-indigo-600" />
              <span>Isolated Workspace: Only your courses, submissions, fee invoices, and private transcripts are visible.</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('classroom')}
            className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Resume Video Lesson</span>
          </button>
          <button
            onClick={() => setActiveTab('idcard')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            <span>View ID Card</span>
          </button>
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'dashboard', label: 'Learning Dashboard', icon: TrendingUp },
          { id: 'classroom', label: 'Classroom & Video Player', icon: BookOpen },
          { id: 'assignments', label: 'My Assignments & Projects', icon: FileText },
          { id: 'results', label: 'Exam Results & Marksheet', icon: Award },
          { id: 'fees', label: 'Fee Receipts & Ledger', icon: CreditCard },
          { id: 'idcard', label: 'Student Identity Card', icon: GraduationCap },
          { id: 'activity', label: 'My Private Activity History', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Student Learning Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Student Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Syllabus Completion</span>
              <div className="text-2xl font-bold font-mono text-slate-900">{myEnrollment.progressPercentage}%</div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                <div className="bg-[#3d5ee1] h-1.5 rounded-full" style={{ width: `${myEnrollment.progressPercentage}%` }} />
              </div>
              <span className="text-[10px] text-slate-400">{myEnrollment.completedLessonsCount} of {myEnrollment.totalLessonsCount} lessons finished</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Class Attendance Rate</span>
              <div className="text-2xl font-bold font-mono text-emerald-600">{myEnrollment.attendancePercentage}%</div>
              <span className="text-[11px] text-emerald-700 font-medium">Eligible for Semester Examination</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Academic Standing</span>
              <div className="text-2xl font-bold font-mono text-amber-600">Rank 1 · Distinction</div>
              <span className="text-[11px] text-amber-700 font-medium">Score: 98.4% Average</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Fee Payment Status</span>
              <div className="text-2xl font-bold font-mono text-emerald-600">Paid in Full</div>
              <span className="text-[11px] text-slate-400 font-medium">Receipt #REC-9821 Verified</span>
            </div>
          </div>

          {/* Enrolled Courses & Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">My Active Enrolled Program</h3>
                  <p className="text-xs text-slate-500">Curriculum syllabus, live lab sessions, and recorded archives</p>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                  Enrolled Active
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{myEnrollment.courseTitle}</h4>
                    <p className="text-xs text-slate-500">Faculty Chair: <strong>Prof. Vikramaditya Roy</strong> · Term: 2026-2027</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('classroom')}
                    className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Go to Classroom</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assignments:</span>
                    <strong className="text-slate-800">{myEnrollment.assignmentsSubmittedCount} / {myEnrollment.totalAssignmentsCount} Submitted</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Quiz Average:</span>
                    <strong className="text-emerald-600 font-mono">{myEnrollment.quizAverageScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Next Live Lecture:</span>
                    <strong className="text-slate-800">Saturday at 10:00 AM</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Student Activity Snapshot */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm">My Personal Activity Log</h3>
                <span className="text-[10px] font-mono text-indigo-700 uppercase font-semibold">Strictly Private</span>
              </div>

              <div className="space-y-3">
                {myActivityLogs.slice(0, 4).map(act => (
                  <div key={act.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{act.action}</span>
                      <span className="font-mono text-[10px] text-slate-400">{act.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{act.details}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Isolated: No other student can see your activity.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Classroom & Video Lessons */}
      {activeTab === 'classroom' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">{myEnrollment.courseTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Interactive Classroom · High-Definition Video Player & Interactive Lab</p>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Module 3: Transformer Attention Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Player */}
            <div className="lg:col-span-2 space-y-4">
              <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-md group">
                <div className="text-center text-white space-y-3 p-6">
                  <div className="w-16 h-16 rounded-full bg-[#3d5ee1] text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-105 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <div className="font-bold text-base">Lesson 3.2: Multi-Head Self-Attention Mathematics & PyTorch Tensors</div>
                  <div className="text-xs text-slate-400">Duration: 45 Minutes · Speaker: Prof. Vikramaditya Roy</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Lecture Description & Code Resources</h4>
                <p className="text-slate-600 leading-relaxed">
                  In this masterclass session, we derive Scaled Dot-Product Attention from scratch, implement batched matrix multiplications using PyTorch `bmm`, and optimize memory footprint with FlashAttention kernel bindings.
                </p>
              </div>
            </div>

            {/* Right 1 Col: Curriculum Outline */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 text-xs">
              <div className="font-bold text-slate-900 text-sm">Course Syllabus & Lessons</div>
              <div className="space-y-2">
                {[
                  { title: '1. Linear Algebra & Tensors', duration: '35 mins', completed: true },
                  { title: '2. Deep Neural Nets & Backprop', duration: '50 mins', completed: true },
                  { title: '3. Multi-Head Self-Attention', duration: '45 mins', completed: true, active: true },
                  { title: '4. Transformer Encoder & Decoder', duration: '60 mins', completed: false },
                  { title: '5. Pre-Training & LoRA Fine-Tuning', duration: '55 mins', completed: false },
                  { title: '6. Enterprise RAG & Vector Databases', duration: '40 mins', completed: false },
                ].map((les, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-colors flex items-center justify-between ${
                      les.active
                        ? 'bg-blue-50 border-[#3d5ee1] font-semibold text-blue-950'
                        : les.completed
                        ? 'bg-white border-slate-200 text-slate-700'
                        : 'bg-white/60 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {les.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span className="truncate">{les.title}</span>
                    </div>
                    <span className="text-[10px] font-mono shrink-0">{les.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: My Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Course Assignments & Submissions</h2>
              <p className="text-slate-500">Submit repositories and view graded evaluation marks from your faculty.</p>
            </div>
            <span className="font-mono text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
              3 Total Assignments
            </span>
          </div>

          <div className="space-y-3">
            {myAssignments.map(asg => (
              <div
                key={asg.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{asg.title}</h3>
                    <div className="text-slate-500 text-[11px]">{asg.subject} · Deadline: {asg.deadline}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                        asg.status === 'Graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : asg.status === 'Submitted - Under Review'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {asg.status === 'Graded' ? `Score: ${asg.score}/${asg.total}` : asg.status}
                    </span>

                    {asg.status === 'Pending Submission' && (
                      <button
                        onClick={() => setSelectedAsgForSubmission(asg)}
                        className="px-3 py-1 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg font-semibold text-xs transition-colors"
                      >
                        Submit Link
                      </button>
                    )}
                  </div>
                </div>

                {asg.submittedUrl && (
                  <div className="text-[11px] text-slate-600 pt-1">
                    Submitted Repository: <a href={asg.submittedUrl} target="_blank" rel="noreferrer" className="text-[#3d5ee1] hover:underline font-mono">{asg.submittedUrl}</a>
                  </div>
                )}

                {asg.feedback && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700">
                    <strong className="text-slate-900">Faculty Feedback:</strong> {asg.feedback}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Exam Results & Marksheet */}
      {activeTab === 'results' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Official Semester Examination Marksheet</h2>
              <p className="text-slate-500">Student: <strong>{currentUser.name}</strong> · Enrollment ID: {currentUser.studentId || 'PRE-1001'}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-1.5 text-xs shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Transcript</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Subject Code</th>
                  <th className="py-2.5 px-4">Subject Title</th>
                  <th className="py-2.5 px-4 text-center">Max Marks</th>
                  <th className="py-2.5 px-4 text-center">Marks Obtained</th>
                  <th className="py-2.5 px-4 text-center">Grade</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-mono">CS-401</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Linear Algebra & Tensors for Deep Learning</td>
                  <td className="py-3 px-4 text-center font-mono">100</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">98</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">A+</td>
                  <td className="py-3 px-4 text-right text-emerald-600 font-semibold">Distinction</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono">CS-402</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Transformer Architectures & Self-Attention</td>
                  <td className="py-3 px-4 text-center font-mono">100</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">99</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">A+</td>
                  <td className="py-3 px-4 text-right text-emerald-600 font-semibold">Distinction</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono">CS-403</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Enterprise Retrieval-Augmented Generation (RAG)</td>
                  <td className="py-3 px-4 text-center font-mono">100</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">96</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">A+</td>
                  <td className="py-3 px-4 text-right text-emerald-600 font-semibold">Distinction</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="py-3 px-4 text-slate-900">Total Aggregate Marks</td>
                  <td className="py-3 px-4 text-center font-mono">300</td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-700">293 / 300</td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-700">97.6%</td>
                  <td className="py-3 px-4 text-right text-amber-600">Rank #1 in Cohort</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Fee Receipts & Ledger */}
      {activeTab === 'fees' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Fee Invoices & Digital Receipts</h2>
              <p className="text-slate-500">Official GST compliant receipts for your tuition and laboratory compute installments.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[11px] text-slate-400 font-bold">RECEIPT #REC-9821</span>
                <h3 className="font-bold text-slate-900 text-sm">Comprehensive Tuition & Cloud Compute Quota (Term 1)</h3>
                <div className="text-slate-500 text-[11px]">Paid via Razorpay UPI · UTR: UPI-TXN-9842104992</div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold font-mono text-emerald-600">₹28,800</div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Payment Verified
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md font-semibold text-[11px] flex items-center gap-1 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Student Identity Card */}
      {activeTab === 'idcard' && (
        <div className="flex justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden text-xs">
            <div className="bg-[#3d5ee1] text-white p-5 text-center relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-100">{instituteProfile.name}</div>
              <div className="text-sm font-bold mt-0.5">Student Identification Pass</div>
            </div>

            <div className="p-6 space-y-4 text-center">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white ring-2 ring-[#3d5ee1] shadow-md"
              />

              <div>
                <h3 className="text-lg font-bold text-slate-900">{currentUser.name}</h3>
                <div className="text-xs text-slate-500 font-mono">{currentUser.studentId || 'PRE-1001'} · Roll: AI-2026-104</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Program:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[170px]">{myEnrollment.courseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Term:</span>
                  <span className="font-mono text-slate-800">2026 - 2027</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Blood Group:</span>
                  <span className="font-mono font-bold text-rose-600">B+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Phone:</span>
                  <span className="font-mono text-slate-800">{currentUser.phone}</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-2 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: My Private Activity Log (Strict Isolation) */}
      {activeTab === 'activity' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Private Learning Activity Log</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Strict User Privacy: Only activities performed by your account ({currentUser.name}) are visible here.
              </p>
            </div>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-full font-semibold border border-indigo-200">
              {myActivityLogs.length} Private Actions
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {myActivityLogs.map(log => (
              <div key={log.id} className="py-3.5 flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-200 font-bold">
                  ✓
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{log.details}</p>
                  <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-mono uppercase">
                    {log.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {selectedAsgForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Submit Homework Assignment</h3>
              <button
                onClick={() => setSelectedAsgForSubmission(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assignment</label>
                <div className="font-bold text-slate-900">{selectedAsgForSubmission.title}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  GitHub / Project Repository URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-username/assignment-repo"
                  value={newSubmissionUrl}
                  onChange={e => setNewSubmissionUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsgForSubmission(null)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-semibold rounded-lg shadow-sm"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

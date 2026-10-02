import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  ListTodo,
  Award,
  TrendingUp,
  FileText,
  Bell,
  Download,
  CheckCircle2,
  Check,
  AlertCircle,
  Play,
  Sparkles,
  UserCheck,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentRoleDashboard: React.FC = () => {
  const { currentUser, setActiveModule, showToast, setIsProfileModalOpen, drillDown } = useApp();

  // Student Pending Tasks
  const [studentTasks, setStudentTasks] = useState([
    { id: 1, title: 'Submit Mathematics Exercise 2.3 Homework PDF', deadline: 'Today, 11:59 PM', done: false, subject: 'Mathematics' },
    { id: 2, title: 'Read Science Chapter 5: Refraction and Snell’s Law', deadline: 'Tomorrow', done: true, subject: 'Physics' },
    { id: 3, title: 'Prepare for Term 1 Midterm Diagnostic Quiz', deadline: 'Oct 06, 2026', done: false, subject: 'All Subjects' },
    { id: 4, title: 'Complete Red Cabbage Acid-Base Indicator Worksheet', deadline: 'Oct 08, 2026', done: false, subject: 'Chemistry' },
  ]);

  const toggleTask = (id: number) => {
    setStudentTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
    showToast('Task updated.');
  };

  return (
    <div className="p-6 space-y-6 text-xs text-slate-800 animate-in fade-in duration-150">
      {/* 1. Header Bar with Student Profile Card & Summary */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono">
                STUDENT CONSOLE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Class 8-A • Roll No: <strong>01</strong> • Admission ID: <strong>PRE-1001</strong> • Delhi Public Global School
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>My Profile</span>
          </button>
          <button
            onClick={() => setActiveModule('student-classroom')}
            className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Resume Classroom</span>
          </button>
          <button
            onClick={() => setActiveModule('student-assignments')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Submit Homework</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Counters (Attendance, GPA, Active Subjects, Pending Tasks) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => drillDown('student-activity', { originLabel: 'Student Dashboard', title: 'My Attendance History & Timesheet', filter: { tab: 'attendance' } })}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view detailed attendance history"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-emerald-700">My Attendance</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">98.2%</div>
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center justify-between">
            <span>Exceeds 75% CBSE Quota</span>
            <span className="text-[9px] font-mono group-hover:underline">History →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('student-results', { originLabel: 'Student Dashboard', title: 'My Academic Performance & Gradebook', filter: { tab: 'results' } })}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view subject-wise marks and grades"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-indigo-700">GPA / Performance</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600">96.0% (A+)</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Rank: 1st in Class 8-A</span>
            <span className="text-[9px] font-mono text-indigo-600 group-hover:underline">Report →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: 'Enrolled Subjects & Study Materials', filter: { tab: 'classroom' } })}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view enrolled subjects and notes"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-blue-700">Enrolled Subjects</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">6 Subjects</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Math, Physics, Chem, AI...</span>
            <span className="text-[9px] font-mono text-blue-600 group-hover:underline">Open →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('student-assignments', { originLabel: 'Student Dashboard', title: 'My Homework & Assignments Roster', filter: { status: 'Pending' } })}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view homework assignments"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-amber-700">Pending Assignments</span>
            <ListTodo className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">1 Due Today</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>3 Already Graded</span>
            <span className="text-[9px] font-mono text-amber-700 group-hover:underline">Submit →</span>
          </div>
        </div>
      </div>

      {/* 3. Today's Timetable & Subjects List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Today's Academic Schedule (4 Periods)</h3>
            </div>
            <span className="text-xs text-slate-500">Friday Schedule • Room 302</span>
          </div>

          <div className="space-y-2.5">
            {[
              { period: 'Period 1 (08:30 - 09:15 AM)', subject: 'Mathematics', teacher: 'Mr. Vikramaditya Roy', topic: 'Exercise 2.3: Transposition in Linear Equations', room: 'Room 302', status: 'Completed', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { period: 'Period 3 (10:20 - 11:05 AM)', subject: 'Physics', teacher: 'Dr. Sunita Rao', topic: 'Ray Diagrams for Spherical Concave Mirrors', room: 'Science Lab 2', status: 'In Progress', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
              { period: 'Period 5 (12:30 - 01:15 PM)', subject: 'Chemistry', teacher: 'Ms. Priyanka Sen', topic: 'Titration & Natural pH Indicators', room: 'Chemistry Lab', status: 'Upcoming', color: 'bg-slate-50 text-slate-700 border-slate-200' },
              { period: 'Period 7 (02:00 - 02:40 PM)', subject: 'Mathematics Workshop', teacher: 'Mr. Vikramaditya Roy', topic: 'Doubt Clearing & Olympiad Problem Solving', room: 'Room 302', status: 'Upcoming', color: 'bg-slate-50 text-slate-700 border-slate-200' },
            ].map((p, i) => (
              <div
                key={i}
                onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: `${p.subject} Classroom Materials`, filter: { subject: p.subject } })}
                className={`p-3 rounded-xl border ${p.color} hover:border-indigo-400 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group`}
                title={`Click to view ${p.subject} lesson materials`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-800">{p.subject}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full font-bold uppercase bg-white border border-current">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{p.topic}</p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {p.period} • Faculty: {p.teacher} ({p.room})
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    drillDown('student-classroom', { originLabel: 'Student Dashboard', title: `${p.subject} Lecture Notes & Videos`, filter: { subject: p.subject } });
                  }}
                  className="px-3 py-1.5 bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-center shrink-0 shadow-2xs transition-colors"
                >
                  Join / Notes →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects & Faculty */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#3d5ee1]" />
              <h3 className="font-bold text-slate-900 text-sm">Enrolled Subjects & Syllabus</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Term 1</span>
          </div>

          <div className="space-y-2.5">
            {[
              { subject: 'Mathematics (Advanced)', code: 'MATH-08', teacher: 'Vikramaditya Roy', progress: '85%', grade: 'A+' },
              { subject: 'Physics & Natural Optics', code: 'PHY-08', teacher: 'Dr. Sunita Rao', progress: '78%', grade: 'A' },
              { subject: 'Chemistry Practicum', code: 'CHEM-08', teacher: 'Priyanka Sen', progress: '90%', grade: 'A+' },
              { subject: 'Computer Science & AI', code: 'CS-08', teacher: 'Anita Sen', progress: '95%', grade: 'A+' },
            ].map(s => (
              <div
                key={s.code}
                onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: `${s.subject} Digital Course Materials`, filter: { subject: s.subject } })}
                className="p-2.5 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between text-xs group"
                title={`Click to view ${s.subject} syllabus and notes`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-800 flex items-center gap-1.5">
                    <span>{s.subject}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-500">Faculty: {s.teacher}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-indigo-600">{s.progress}</div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded font-mono">
                    Grade {s.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: 'All Digital Courseware Materials' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              Access All Digital Course Materials →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Homework / Assignments & Exams / Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Homework & Assignments */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Homework & Project Submissions</h3>
            </div>
            <button
              onClick={() => drillDown('student-assignments', { originLabel: 'Student Dashboard', title: 'All Homework & Project Submissions' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              View All (4) →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Linear Equations Word Problems (Ex 2.3)', subject: 'Mathematics', due: 'Today, 11:59 PM', status: 'Pending Submission', score: '-' },
              { title: 'Spherical Mirrors Ray Diagram Set', subject: 'Physics', due: 'Submitted', status: 'Graded (95/100)', score: '95%' },
              { title: 'Red Cabbage Acid-Base Lab Report', subject: 'Chemistry', due: 'Submitted', status: 'Under Review', score: '-' },
            ].map((hw, idx) => (
              <div
                key={idx}
                onClick={() => drillDown('student-assignments', { originLabel: 'Student Dashboard', title: `Assignment: ${hw.title}`, filter: { assignmentTitle: hw.title, status: hw.status } })}
                className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group"
                title={`Click to view submission rubric and status for ${hw.title}`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-amber-900 flex items-center gap-1.5">
                    <span>{hw.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {hw.subject} • Due: {hw.due}
                  </div>
                </div>
                {hw.status.includes('Pending') ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      drillDown('student-assignments', { originLabel: 'Student Dashboard', title: `Submit Homework: ${hw.title}`, filter: { assignmentTitle: hw.title } });
                    }}
                    className="px-2.5 py-1 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-lg text-[11px] shadow-xs"
                  >
                    Submit PDF
                  </button>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {hw.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exams & Assessment Results */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Exams, Term Results & Performance</h3>
            </div>
            <button
              onClick={() => drillDown('student-results', { originLabel: 'Student Dashboard', title: 'Complete Term Marksheet & Exam Results', filter: { tab: 'results' } })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              Full Report Card →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { exam: 'Unit Test 1 (Mathematics)', score: '25 / 25', grade: '100% (A+)', remarks: 'Perfect score in algebraic proofs' },
              { exam: 'Term 1 Mid-Year Practicum (Science)', score: '48 / 50', grade: '96% (A+)', remarks: 'Accurate titration and focal tracing' },
              { exam: 'Computer Science Practical Defense', score: '24 / 25', grade: '96% (A+)', remarks: 'Excellent attention tensor implementation' },
            ].map((res, i) => (
              <div
                key={i}
                onClick={() => drillDown('student-results', { originLabel: 'Student Dashboard', title: `Marksheet: ${res.exam}`, filter: { examName: res.exam, tab: 'results' } })}
                className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between text-xs group"
                title={`Click to view detailed score breakdown for ${res.exam}`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                    <span>{res.exam}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-500">{res.remarks}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-600">{res.score}</div>
                  <div className="text-[10px] font-bold text-slate-700">{res.grade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Activities, Notices, Events, Learning Resources & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Tasks Interactive Checklist */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">My Daily Tasks</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {studentTasks.filter(t => !t.done).length} Pending
            </span>
          </div>

          <div className="space-y-2">
            {studentTasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 text-xs ${
                  task.done
                    ? 'bg-slate-50/60 border-slate-200 opacity-60 line-through'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center border ${
                  task.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                }`}>
                  {task.done && <Check className="w-2.5 h-2.5" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 text-[11px] leading-tight">{task.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Due: {task.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Upcoming Events */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Campus Notices & Events</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: 'National Math Olympiad Practice Camp Notes' })}
              className="p-3 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs cursor-pointer transition-all space-y-1 group"
              title="Click to view olympiad resources"
            >
              <div className="font-bold text-slate-900 text-xs group-hover:text-emerald-800 flex items-center justify-between">
                <span>National Math Olympiad Registration</span>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>
              <p className="text-slate-600 text-[11px]">Practice camp begins Saturday at 08:30 AM in Room 302.</p>
              <div className="text-[10px] text-indigo-600 font-mono">Deadline: Oct 06, 2026</div>
            </div>

            <div
              onClick={() => drillDown('student-results', { originLabel: 'Student Dashboard', title: 'Term 1 Exam Datesheet & Hall Ticket' })}
              className="p-3 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs cursor-pointer transition-all space-y-1 group"
              title="Click to view hall ticket and datesheet"
            >
              <div className="font-bold text-slate-900 text-xs group-hover:text-indigo-800 flex items-center justify-between">
                <span>Term 1 Examination Timetable Released</span>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <p className="text-slate-600 text-[11px]">Examinations commence on Oct 14. Hall tickets available in portal.</p>
              <div className="text-[10px] text-slate-400 font-mono">Published Yesterday</div>
            </div>
          </div>
        </div>

        {/* Learning Resources & Activities */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">Learning Resources & Clubs</h3>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Linear Equations Practice Handout (PDF)', size: '2.4 MB', type: 'Worksheet' },
              { name: 'Optics Ray Diagrams Interactive Lab Notes', size: '4.1 MB', type: 'Lab Guide' },
              { name: 'Robotics & STEM Innovation Club Meeting', size: 'Thursday 3PM', type: 'Club' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => drillDown('student-classroom', { originLabel: 'Student Dashboard', title: `Resource: ${item.name}` })}
                className="p-2.5 bg-slate-50 hover:bg-purple-50/60 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between text-xs group"
                title={`Click to open ${item.name}`}
              >
                <div className="truncate mr-2">
                  <div className="font-bold text-slate-900 truncate text-[11px] group-hover:text-purple-900">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.size}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`Downloaded ${item.name}`);
                  }}
                  className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 shadow-2xs"
                  title="Download"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

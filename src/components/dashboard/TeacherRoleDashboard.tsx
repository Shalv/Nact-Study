import React, { useState, useEffect } from 'react';
import {
  Users2,
  Calendar,
  Clock,
  UserCheck,
  GraduationCap,
  BookOpen,
  ListTodo,
  FileText,
  Award,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Bell,
  CheckCircle2,
  ArrowRight,
  Plus,
  Play,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Phone,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { reportService } from '../../services/api.ts';

export const TeacherRoleDashboard: React.FC = () => {
  const { currentUser, setActiveModule, showToast, addActivityLog, drillDown } = useApp();

  // Dynamic Dashboard Stats from PostgreSQL Cloud (Requirement 21)
  const [stats, setStats] = useState({
    todayClasses: 4,
    lessonsPlanned: 2,
    lessonsCompleted: 1,
    assignmentsPending: 1,
    assignmentsReviewed: 48,
    resourcesCreated: 6,
    pendingAssessments: 3,
    activeDeliveries: 0,
  });

  useEffect(() => {
    reportService.getDashboardStats()
      .then(setStats)
      .catch(err => console.error('Failed to load dashboard stats:', err));
  }, []);

  // Pending Tasks Interactive Checklist
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Upload Lesson Plan for Class 9 Physics (Refraction)', deadline: 'Today, 2:00 PM', done: false, priority: 'High' },
    { id: 2, title: 'Submit Set B Term 1 Math Question Paper for HOD Approval', deadline: 'Today, 4:00 PM', done: false, priority: 'High' },
    { id: 3, title: 'Evaluate 8 Pending Assignments for Class 8-A Math', deadline: 'Tomorrow', done: true, priority: 'Medium' },
    { id: 4, title: 'Respond to Parent Query regarding Sneha Kulkarni science viva', deadline: 'Tomorrow', done: false, priority: 'Normal' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
    showToast('Task status updated.');
  };

  return (
    <div className="p-6 space-y-6 text-xs text-slate-800 animate-in fade-in duration-150">
      {/* 1. Header Bar with Faculty Welcome & Quick Launch */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Faculty Academic & Instructional Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                  TEACHER CONSOLE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Welcome back, <strong>{currentUser.name}</strong> • Senior Faculty • Mathematics & Natural Sciences.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveModule('teacher-attendance')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Roll Call Today</span>
          </button>
          <button
            onClick={() => setActiveModule('teacher-planner')}
            className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Lesson Planner</span>
          </button>
          <button
            onClick={() => setActiveModule('teacher-assignments')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>Evaluate Work</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Counters from Cloud PostgreSQL (Requirement 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div
          onClick={() => drillDown('teacher-classes', { originLabel: 'Teacher Dashboard', title: "Today's Assigned Classes (4 Periods)", filter: { activeDay: 'Today' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view assigned classes roster"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-indigo-600">Today's Classes</span>
            <Users2 className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{stats.todayClasses} Classes</div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-between">
            <span>Active in DB</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-indigo-600">View →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-planner', { originLabel: 'Teacher Dashboard', title: 'Planned Curriculum & Lesson Modules', filter: { status: 'PLANNED' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view lesson planner"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-emerald-700">Lessons Planned</span>
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-600">{stats.lessonsPlanned} Planned</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Curriculum Synced</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-emerald-700">Planner →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-lessons', { originLabel: 'Teacher Dashboard', title: 'Delivered Lessons Hub & Completion Records', filter: { status: 'COMPLETED' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-teal-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view delivery records"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-teal-700">Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-xl font-black text-teal-600">{stats.lessonsCompleted} Delivered</div>
          <div className="text-[10px] text-teal-700 font-semibold flex items-center justify-between">
            <span>Delivery Logged</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-teal-700">Hub →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-assignments', { originLabel: 'Teacher Dashboard', title: 'Pending Student Homework Submissions', filter: { status: 'Pending Review' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to evaluate pending assignments"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-amber-700">Pending Work</span>
            <ListTodo className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-600">{stats.assignmentsPending} Pending</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Assignments Due</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-amber-700">Grade →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-assignments', { originLabel: 'Teacher Dashboard', title: 'Reviewed & Graded Submissions Roster', filter: { status: 'Graded' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to view graded submissions"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-blue-700">Reviewed</span>
            <Award className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">{stats.assignmentsReviewed} Subs</div>
          <div className="text-[10px] text-blue-600 font-semibold flex items-center justify-between">
            <span>Graded & Verified</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-blue-700">View →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-materials', { originLabel: 'Teacher Dashboard', title: 'Multimedia Lesson Resources & Teaching Assets', filter: { category: 'All' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-purple-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to browse teaching resources"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-purple-700">Resources</span>
            <FileText className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-xl font-black text-purple-700">{stats.resourcesCreated} Created</div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>In PostgreSQL</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-purple-700">Assets →</span>
          </div>
        </div>

        <div
          onClick={() => drillDown('teacher-examination', { originLabel: 'Teacher Dashboard', title: 'Question Bank & Unit Assessments', filter: { status: 'Pending' } })}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-rose-400 hover:shadow-md cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group"
          title="Click to open exam generator and question bank"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-rose-700">Assessments</span>
            <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-black text-rose-600">{stats.pendingAssessments} Pending</div>
          <div className="text-[10px] text-rose-700 font-semibold flex items-center justify-between">
            <span>Q-Bank Linked</span>
            <span className="text-[9px] text-slate-400 font-mono group-hover:text-rose-700">Exams →</span>
          </div>
        </div>
      </div>

      {/* 3. Today's Timetable & My Classes Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Today's Teaching Schedule (4 Periods)</h3>
            </div>
            <button
              onClick={() => setActiveModule('teacher-timetable')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline flex items-center gap-1"
            >
              <span>Weekly Timetable</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { period: 'Period 1 (08:30 - 09:15 AM)', subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Linear Equations Transposition (Ex 2.3)', room: 'Room 302', status: 'Completed', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { period: 'Period 3 (10:20 - 11:05 AM)', subject: 'Physics', classGrade: 'Class 9-B', topic: 'Laws of Reflection & Ray Tracing Lab', room: 'Science Lab 2', status: 'In Progress', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
              { period: 'Period 5 (12:30 - 01:15 PM)', subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'Acid-Base Titration & Phenolphthalein', room: 'Chemistry Lab', status: 'Upcoming', color: 'bg-slate-50 text-slate-700 border-slate-200' },
              { period: 'Period 7 (02:00 - 02:40 PM)', subject: 'Mathematics', classGrade: 'Class 8-B', topic: 'Doubt Clearing & Socratic Problem Solving', room: 'Room 303', status: 'Upcoming', color: 'bg-slate-50 text-slate-700 border-slate-200' },
            ].map((p, i) => (
              <div
                key={i}
                onClick={() => drillDown('teacher-lessons', { originLabel: 'Teacher Dashboard', title: `${p.classGrade} - ${p.subject} Classroom Hub`, filter: { selectedClass: p.classGrade, subject: p.subject } })}
                className={`p-3 rounded-xl border ${p.color} hover:border-indigo-400 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group`}
                title={`Click to open ${p.subject} teaching workspace for ${p.classGrade}`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-indigo-800">{p.subject} • {p.classGrade}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full font-bold uppercase bg-white border border-current">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{p.topic}</p>
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                    <span>{p.period} • {p.room}</span>
                    <span className="text-indigo-600 font-bold group-hover:underline">Launch Lesson →</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    drillDown('teacher-attendance', { originLabel: 'Teacher Dashboard', title: `${p.classGrade} Attendance Roll Call`, filter: { selectedClass: p.classGrade } });
                  }}
                  className="px-2.5 py-1.5 bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 hover:border-indigo-300 rounded-lg font-semibold shrink-0 shadow-2xs"
                >
                  Attendance →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Classes & Students Overview */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-[#3d5ee1]" />
              <h3 className="font-bold text-slate-900 text-sm">Students in My Classes</h3>
            </div>
            <button
              onClick={() => drillDown('teacher-students', { originLabel: 'Teacher Dashboard', title: 'Complete Student Roster & 360° Profiles' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              Roster 360° →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Aarav Patel', roll: '01', class: 'Class 8-A', score: '98%', status: 'Top Achiever', att: '98%' },
              { name: 'Sneha Kulkarni', roll: '02', class: 'Class 8-A', score: '95%', status: 'Consistent', att: '95%' },
              { name: 'Marcus Chen', roll: '03', class: 'Class 9-B', score: '92%', status: 'Physics Lead', att: '96%' },
              { name: 'Elena Rostova', roll: '04', class: 'Class 8-A', score: '89%', status: 'Active', att: '92%' },
            ].map(s => (
              <div
                key={s.roll}
                onClick={() => drillDown('teacher-students', { originLabel: 'Teacher Dashboard', title: `Student Profile: ${s.name} (${s.class})`, filter: { studentName: s.name, classGrade: s.class } })}
                className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-300 hover:shadow-xs cursor-pointer transition-all text-xs group"
                title={`Click to view ${s.name}'s academic marks, behavior notes, and parent details`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-800 flex items-center gap-1.5">
                    <span>{s.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Roll: {s.roll} • {s.class} • Att: {s.att}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600">{s.score}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{s.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Parent Consultations: <strong>3 Scheduled</strong></span>
            <button
              onClick={() => drillDown('teacher-doubts', { originLabel: 'Teacher Dashboard', title: 'Parent & Student Consultations Desk' })}
              className="text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              Contact Parent →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Lesson Plans, Homework, Question Papers & Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lesson Plans & Syllabus Tracking */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Lesson Plans & Syllabus Progress</h3>
            </div>
            <button
              onClick={() => drillDown('teacher-planner', { originLabel: 'Teacher Dashboard', title: 'Complete Syllabus & Lesson Planner' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              Full Planner →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { subject: 'Mathematics (Class 8-A)', chapter: 'Linear Equations in One Variable', completion: '85%', status: 'On Track' },
              { subject: 'Physics (Class 9-B)', chapter: 'Light: Reflection & Refraction', completion: '68%', status: 'Practicum Active' },
              { subject: 'Chemistry (Class 10-A)', chapter: 'Acids, Bases & Salts', completion: '92%', status: 'Near Completion' },
            ].map(lp => (
              <div
                key={lp.subject}
                onClick={() => drillDown('teacher-planner', { originLabel: 'Teacher Dashboard', title: `Lesson Plan: ${lp.subject}`, filter: { subject: lp.subject } })}
                className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs cursor-pointer transition-all space-y-2 text-xs group"
                title={`Click to view lesson plan and teaching resources for ${lp.subject}`}
              >
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="group-hover:text-emerald-900 flex items-center gap-1.5">
                    <span>{lp.subject}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                  </span>
                  <span className="text-emerald-700 font-mono">{lp.completion}</span>
                </div>
                <p className="text-slate-600 text-[11px]">Topic: {lp.chapter}</p>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: lp.completion }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Papers & Assessments */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Question Papers & Summative Assessments</h3>
            </div>
            <button
              onClick={() => drillDown('teacher-exam-builder', { originLabel: 'Teacher Dashboard', title: 'Question Papers & Examination Blueprint Studio' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              Create Paper →
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Class 10 Mathematics Midterm (Set A)', type: 'Term 1 Exam', marks: 80, status: 'Approved & Sealed' },
              { title: 'Class 9 Physics Optics Unit Test', type: 'Unit Test', marks: 25, status: 'Drafting' },
              { title: 'Class 8-A Mental Algebra Quick Quiz', type: 'Formative', marks: 15, status: 'Published to Class' },
            ].map((qp, i) => (
              <div
                key={i}
                onClick={() => drillDown('teacher-exam-builder', { originLabel: 'Teacher Dashboard', title: `Assessment: ${qp.title}`, filter: { examTitle: qp.title, status: qp.status } })}
                className="p-3 bg-slate-50 hover:bg-indigo-50/70 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 text-xs group"
                title={`Click to open blueprint and questions for ${qp.title}`}
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-800 flex items-center gap-1.5">
                    <span>{qp.title}</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {qp.type} • {qp.marks} Max Marks
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  {qp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Activities, Parent Communication, Academic Events & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Tasks Interactive Checklist */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-sm">Faculty Pending Tasks & Checklists</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {tasks.filter(t => !t.done).length} remaining
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 text-xs ${
                  task.done
                    ? 'bg-slate-50/60 border-slate-200 opacity-60 line-through'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                  task.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                }`}>
                  {task.done && <Check className="w-3 h-3" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{task.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                    <span>Due: {task.deadline}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-semibold">{task.priority} Priority</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Communication & Events */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Parent Communication & Academic Events</h3>
            </div>
            <button
              onClick={() => drillDown('teacher-doubts', { originLabel: 'Teacher Dashboard', title: 'Parent Messages & Inquiries Desk' })}
              className="text-xs font-bold text-[#3d5ee1] hover:underline cursor-pointer"
            >
              All Inquiries →
            </button>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => drillDown('teacher-doubts', { originLabel: 'Teacher Dashboard', title: "Parent Inquiry: Ramesh Patel (Aarav)", filter: { student: 'Aarav Patel' } })}
              className="p-3 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200 rounded-xl space-y-1 cursor-pointer transition-all hover:shadow-xs group"
              title="Click to view conversation and reply"
            >
              <div className="flex items-center justify-between font-bold text-indigo-950 text-xs">
                <span className="group-hover:text-indigo-900 flex items-center gap-1.5">
                  <span>Recent Parent Inquiries (2 Unread)</span>
                  <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:text-indigo-700 transition-colors" />
                </span>
                <span className="text-[10px] bg-white px-2 py-0.2 rounded font-mono text-indigo-700">Direct Chat</span>
              </div>
              <p className="text-[11px] text-indigo-800">
                Mr. Ramesh Patel (Aarav's father) requested guidance for the National Math Olympiad registration.
              </p>
            </div>

            <div
              onClick={() => drillDown('teacher-timetable', { originLabel: 'Teacher Dashboard', title: 'Science Practicum Lab Schedule', filter: { event: 'Practicum' } })}
              className="p-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl space-y-1 cursor-pointer transition-all hover:shadow-xs group"
              title="Click to view timetable details"
            >
              <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                <span className="group-hover:text-indigo-700 flex items-center gap-1.5">
                  <span>Upcoming: Science Practicum Lab Defense</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">Oct 08, 2026</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Class 9-B and Class 10-A practical notebooks check and viva examination in Science Lab 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

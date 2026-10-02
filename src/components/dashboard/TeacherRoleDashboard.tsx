import React, { useState } from 'react';
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
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherRoleDashboard: React.FC = () => {
  const { currentUser, setActiveModule, showToast, addActivityLog } = useApp();

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

      {/* 2. Top Metric Counters (Classes, Students, Attendance, Pending Evaluations) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">My Classes</span>
            <Users2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">3 Cohorts</div>
          <div className="text-[10px] text-slate-500">84 Total Assigned Students</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Attendance</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">96.8%</div>
          <div className="text-[10px] text-emerald-700 font-semibold">Class 8-A Recorded (31/32)</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Assignments to Grade</span>
            <ListTodo className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">3 Pending</div>
          <div className="text-[10px] text-slate-500">2 Evaluated This Morning</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Classroom Mean Score</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">84.5%</div>
          <div className="text-[10px] text-blue-600 font-semibold">+3.2% above school average</div>
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
              <div key={i} className={`p-3 rounded-xl border ${p.color} flex items-center justify-between gap-3 text-xs`}>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{p.subject} • {p.classGrade}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full font-bold uppercase bg-white border border-current">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{p.topic}</p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {p.period} • {p.room}
                  </div>
                </div>

                <button
                  onClick={() => setActiveModule('teacher-attendance')}
                  className="px-2.5 py-1.5 bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 rounded-lg font-semibold shrink-0"
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
              onClick={() => setActiveModule('teacher-students')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline"
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
              <div key={s.roll} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl hover:bg-white border border-slate-100 hover:border-indigo-200 transition-all text-xs">
                <div>
                  <div className="font-bold text-slate-900">{s.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Roll: {s.roll} • {s.class}
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
              onClick={() => setActiveModule('teacher-students')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Contact Parent
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
              onClick={() => setActiveModule('teacher-planner')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline"
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
              <div key={lp.subject} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{lp.subject}</span>
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
              onClick={() => setActiveModule('teacher-exam-builder')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline"
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
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900">{qp.title}</div>
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
              onClick={() => setActiveModule('teacher-students')}
              className="text-xs font-bold text-[#3d5ee1] hover:underline"
            >
              Send Circular →
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-indigo-950 text-xs">
                <span>Recent Parent Inquiries (2 Unread)</span>
                <span className="text-[10px] bg-white px-2 py-0.2 rounded font-mono text-indigo-700">Direct Chat</span>
              </div>
              <p className="text-[11px] text-indigo-800">
                Mr. Ramesh Patel (Aarav's father) requested guidance for the National Math Olympiad registration.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                <span>Upcoming: Science Practicum Lab Defense</span>
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

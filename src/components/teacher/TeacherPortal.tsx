import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users2,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  FileText,
  Upload,
  Save,
  Search,
  Plus,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Printer,
  Download,
  Filter,
  Eye,
  Check,
  X,
  Play,
  Award,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  BrainCircuit,
  Wand2,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  BookMarked,
  MessageSquare,
  ListTodo,
  Bell,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Sub-components
import { TeacherStudentsView } from './TeacherStudentsView';
import { TeacherSubjectsView } from './TeacherSubjectsView';
import { TeacherLessonsView } from './TeacherLessonsView';
import { TeacherLessonResourcesView } from './TeacherLessonResourcesView';
import { TeacherCurriculumView } from './TeacherCurriculumView';
import { TeacherLessonPlannerView } from './TeacherLessonPlannerView';
import { TeacherAiVideoStudio } from './TeacherAiVideoStudio';
import { TeacherQuestionGenerator } from './TeacherQuestionGenerator';
import { TeacherDoubtsView } from './TeacherDoubtsView';
import { TeacherAnnouncementsView } from './TeacherAnnouncementsView';
import { TeacherActivityLogView } from './TeacherActivityLogView';
import { TeacherTimetableView } from './TeacherTimetableView';
import { TeacherExamBuilderView } from './TeacherExamBuilderView';
import { TeacherQuestionBankView } from './TeacherQuestionBankView';
import { TeacherAssignmentsView } from './TeacherAssignmentsView';
import { TeacherAttendanceView } from './TeacherAttendanceView';
import { TeacherMarksAssessmentView } from './TeacherMarksAssessmentView';
import { TeacherClassroomActivitiesView } from './TeacherClassroomActivitiesView';
import { TeacherExaminationView } from './TeacherExaminationView';
import { TeacherLeaveSubstituteView } from './TeacherLeaveSubstituteView';
import { TeacherReportsView } from './TeacherReportsView';

export const TeacherPortal: React.FC = () => {
  const {
    currentUser,
    activityLogs,
    addActivityLog,
    showToast,
    instituteProfile,
    activeModule,
    setActiveModule,
  } = useApp();

  // Active sub-module navigation
  const [activeNav, setActiveNav] = useState<
    | 'dashboard'
    | 'timetable'
    | 'my-classes'
    | 'students'
    | 'subjects'
    | 'lessons'
    | 'lesson-resources'
    | 'curriculum'
    | 'lesson-planner'
    | 'ai-content'
    | 'ai-video'
    | 'question-generator'
    | 'worksheet-generator'
    | 'exam-builder'
    | 'assignments'
    | 'question-bank'
    | 'gradebook'
    | 'attendance'
    | 'announcements'
    | 'doubts'
    | 'activities'
    | 'examination'
    | 'leave-substitute'
    | 'reports'
    | 'activity'
  >('dashboard');

  useEffect(() => {
    if (activeModule.startsWith('teacher-')) {
      const sub = activeModule.replace('teacher-', '');
      if (sub === 'classes') setActiveNav('my-classes');
      else if (sub === 'grading') setActiveNav('gradebook');
      else if (sub === 'materials') setActiveNav('lesson-resources');
      else if (sub === 'planner') setActiveNav('lesson-planner');
      else if (sub === 'questions') setActiveNav('question-generator');
      else if (sub === 'activity') setActiveNav('activity');
      else if (sub === 'leave') setActiveNav('leave-substitute');
      else if (sub === 'activities') setActiveNav('activities');
      else if (sub === 'timetable') setActiveNav('timetable');
      else if (sub === 'exam-builder') setActiveNav('exam-builder');
      else if (sub === 'question-bank') setActiveNav('question-bank');
      else if (sub === 'examination') setActiveNav('examination');
      else if (sub === 'assignments') setActiveNav('assignments');
      else if (sub === 'attendance') setActiveNav('attendance');
      else if (sub === 'reports') setActiveNav('reports');
      else setActiveNav(sub as any);
    }
  }, [activeModule]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 1. Periods & Today's Schedule State
  const [periods, setPeriods] = useState([
    {
      id: 1,
      periodName: 'Period 1',
      time: '08:30 - 09:15 AM',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      topic: 'Solving Linear Equations in One Variable (Exercise 2.3)',
      room: 'Room 302',
      status: 'Completed' as const,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 2,
      periodName: 'Period 3',
      time: '10:20 - 11:05 AM',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      topic: 'Laws of Reflection & Ray Diagrams on Spherical Mirrors',
      room: 'Science Lab 2',
      status: 'In Progress' as const,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 3,
      periodName: 'Period 5',
      time: '12:30 - 01:15 PM',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      topic: 'Acid-Base Neutralization & Titration Experiment Lab',
      room: 'Chemistry Lab',
      status: 'Upcoming' as const,
      color: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    {
      id: 4,
      periodName: 'Period 7',
      time: '02:00 - 02:40 PM',
      subject: 'Mathematics',
      classGrade: 'Class 8-B',
      topic: 'Doubt Clearing & Socratic Problem Solving Workshop',
      room: 'Room 303',
      status: 'Upcoming' as const,
      color: 'bg-slate-100 text-slate-700 border-slate-200'
    },
  ]);

  // 2. Attendance Roll Call State
  const [selectedAttendanceClass, setSelectedAttendanceClass] = useState('Class 8-A');
  const [attendanceSheet, setAttendanceSheet] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    'PRE-1001': 'present',
    'PRE-1002': 'present',
    'PRE-1003': 'present',
    'PRE-1004': 'present',
    'PRE-1005': 'late',
    'PRE-1006': 'absent',
    'PRE-1007': 'present',
    'PRE-1008': 'present',
  });

  // 3. Assignments & Submissions State
  const [assignmentsList, setAssignmentsList] = useState([
    {
      id: 'asg-1',
      title: 'RAG Assistant & React 19 Project Defense',
      subject: 'Computer Science & AI',
      classGrade: 'Class 10-A',
      studentName: 'Shivam Sharma',
      studentId: 'PRE-1001',
      submittedAt: '10m ago',
      repoUrl: 'https://github.com/shivam/rag-assistant-react19',
      score: 0,
      status: 'Pending Evaluation',
      remarks: ''
    },
    {
      id: 'asg-2',
      title: 'Optics & Snell Law Refraction Ray Diagrams',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      studentName: 'Marcus Chen',
      studentId: 'PRE-1003',
      submittedAt: '45m ago',
      repoUrl: 'https://cdn.school.org/marcus/ray-diagrams.pdf',
      score: 92,
      status: 'Graded',
      remarks: 'Neat construction lines and accurate focal calculations.'
    },
    {
      id: 'asg-3',
      title: 'Quadratic Polynomial Factorization Problem Set',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      studentName: 'Elena Rostova',
      studentId: 'PRE-1004',
      submittedAt: '2h ago',
      repoUrl: 'https://cdn.school.org/elena/math-hw4.pdf',
      score: 0,
      status: 'Pending Evaluation',
      remarks: ''
    }
  ]);

  const [selectedAsgForGrading, setSelectedAsgForGrading] = useState(assignmentsList[0]);
  const [gradingScoreInput, setGradingScoreInput] = useState(95);
  const [gradingRemarksInput, setGradingRemarksInput] = useState('Excellent precision and step-by-step working.');

  // 4. AI Content Studio Generator State
  const [aiPromptTopic, setAiPromptTopic] = useState('Newtonian Mechanics & Gravitational Acceleration');
  const [aiSelectedGrade, setAiSelectedGrade] = useState('Class 9');
  const [aiMode, setAiMode] = useState<'lesson-plan' | 'socratic' | 'differentiated'>('lesson-plan');
  const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // 5. Worksheet Generator State
  const [worksheetSubject, setWorksheetSubject] = useState('Physics');
  const [generatedWorksheet, setGeneratedWorksheet] = useState<{ id: number; question: string; type: string; marks: number }[]>([
    { id: 1, question: 'Define Snell’s Law and write its mathematical formula with index of refraction.', type: 'Short Answer', marks: 3 },
    { id: 2, question: 'Calculate the focal length of a concave mirror having a radius of curvature of 36 cm.', type: 'Numerical', marks: 2 },
    { id: 3, question: 'Draw a labeled ray diagram when an object is placed between F and C of a concave mirror.', type: 'Diagram', marks: 5 },
    { id: 4, question: 'Which mirror is universally used as a rear-view mirror in vehicles? Give 2 scientific reasons.', type: 'Application', marks: 3 },
    { id: 5, question: 'State the two primary laws of reflection of light.', type: 'Conceptual', marks: 2 },
  ]);

  // 6. Exam Builder Blueprint State
  const [examTitle, setExamTitle] = useState('Term 1 Mid-Year Examination (CBSE 2026-27)');
  const [examSections, setExamSections] = useState([
    { name: 'Section A: Multiple Choice Questions (1 Mark each)', count: 10, total: 10 },
    { name: 'Section B: Short Answer Type I (2 Marks each)', count: 5, total: 10 },
    { name: 'Section C: Long Answer Reasoning (5 Marks each)', count: 4, total: 20 },
    { name: 'Section D: Case-Based Integrated Problem', count: 2, total: 10 },
  ]);

  // 7. Question Bank State
  const [questionBank, setQuestionBank] = useState([
    { id: 'QB-101', subject: 'Mathematics', topic: 'Linear Equations', difficulty: 'Medium', type: 'MCQ', text: 'If 3x - 5 = 16, what is the value of x^2 + 1?' },
    { id: 'QB-102', subject: 'Physics', topic: 'Optics', difficulty: 'Hard', type: 'Numerical', text: 'An object of height 4 cm is placed 25 cm in front of a concave mirror of focal length 15 cm. Find position and size of image.' },
    { id: 'QB-103', subject: 'Chemistry', topic: 'Acids & Bases', difficulty: 'Easy', type: 'MCQ', text: 'Which indicator turns pink in basic solutions?' },
    { id: 'QB-104', subject: 'Computer Science', topic: 'Generative AI', difficulty: 'Hard', type: 'Code', text: 'Write a PyTorch function implementing scaled dot-product attention with causal mask tensor.' }
  ]);

  // 8. Timetable Modal View State
  const [showFullWeekModal, setShowFullWeekModal] = useState(false);

  // Handlers
  const handleSaveAttendance = () => {
    const presentCount = Object.values(attendanceSheet).filter(v => v === 'present').length;
    const absentCount = Object.values(attendanceSheet).filter(v => v === 'absent').length;

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Marked Roll Call for ${selectedAttendanceClass}`,
      details: `${presentCount} Students Present, ${absentCount} Absent submitted for Period session.`,
      category: 'attendance'
    });

    showToast(`Attendance saved for ${selectedAttendanceClass} (${presentCount} present).`);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignmentsList(prev =>
      prev.map(a =>
        a.id === selectedAsgForGrading.id
          ? { ...a, score: gradingScoreInput, remarks: gradingRemarksInput, status: 'Graded' }
          : a
      )
    );

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Graded Submission for ${selectedAsgForGrading.studentName}`,
      details: `Awarded ${gradingScoreInput}/100. Feedback: "${gradingRemarksInput}"`,
      category: 'grading'
    });

    showToast(`Graded ${selectedAsgForGrading.studentName}'s assignment.`);
  };

  const handleGenerateAiLesson = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      if (aiMode === 'socratic') {
        setAiGeneratedContent(
          `### Socratic Discussion & Inquiry Blueprint: ${aiPromptTopic} (${aiSelectedGrade})

#### Socratic Guiding Questions:
1. "If an astronaut drops a stone and a feather inside the International Space Station, why do both float instead of falling?"
   - *Target Insight:* Orbiting bodies are in continuous free-fall around the gravitational curvature.
2. "Why doesn't the moon crash into Earth if gravity is constantly pulling it inward?"
   - *Target Insight:* High tangential velocity provides the necessary centripetal acceleration.
3. "Can gravitational force ever be repulsive? Under what cosmological circumstances?"
   - *Target Insight:* Dark energy / cosmological constant acceleration.`
        );
      } else if (aiMode === 'differentiated') {
        setAiGeneratedContent(
          `### Differentiated Instruction Strategy: ${aiPromptTopic}

#### Tier 1: Remedial / Guided Support (Scaffolded)
- Use physical spring balances and calibrated masses.
- Provide step-by-step formula triangle: W = m * g with pre-filled units.

#### Tier 2: Standard Grade-Level
- Solve standard universal law derivations: F = G(m1*m2)/r^2.
- Calculate weight variance between Earth (9.8 m/s^2) and Mars (3.7 m/s^2).

#### Tier 3: Advanced / Olympiad Extension
- Derive escape velocity v_esc = sqrt(2GM/R) using conservation of mechanical energy.
- Model gravitational potential wells using differential calculus.`
        );
      } else {
        setAiGeneratedContent(
          `### Lesson Plan & Teaching Blueprint: ${aiPromptTopic} (${aiSelectedGrade})

#### 1. Learning Objectives:
- Students will grasp the concept of universal gravitation: F = G * (m1 * m2) / r^2
- Differentiate between mass (scalar quantity in kg) and weight (vector gravitational force in N)
- Understand terminal velocity and free-fall conditions under Earth gravity (g = 9.8 m/s^2)

#### 2. Instructional Timeline (45-Minute Period):
- **00:00 - 00:08**: Socratic Hook — Drop a feather and a bowling ball in vacuum chamber video demo.
- **00:08 - 00:22**: Core Mathematical Derivation on blackboard & interactive whiteboard.
- **00:22 - 00:35**: Guided Pair Problem Solving: Calculate gravitational pull between Earth and Moon.
- **00:35 - 00:45**: Formative Exit Ticket Quiz & Homework Assignment Handout.

#### 3. Common Misconceptions to Address:
- "Heavy objects fall faster in a vacuum" -> Clarify Galileo's Tower of Pisa experiment.
- "There is zero gravity in space" -> Clarify orbit is free-fall motion around Earth curved spacetime.`
        );
      }
      setIsGeneratingAi(false);
      showToast('AI lesson plan generated with pedagogical blueprint!');
    }, 900);
  };

  const handleAddGeneratedQuestionToBank = (q: any) => {
    setQuestionBank(prev => [
      {
        id: q.id,
        subject: q.subject,
        topic: q.topic,
        difficulty: q.difficulty,
        type: q.type,
        text: q.text
      },
      ...prev
    ]);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7fa] font-sans text-slate-900">
      {/* 1. LEFT SIDEBAR: INSTRUCTOR WORKSPACE (Controlled via unified app sidebar) */}
      <aside className="hidden">
        <div className="py-4 px-3 space-y-5 overflow-y-auto">
          {/* Header Brand */}
          <div className="px-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                N
              </div>
              {!sidebarCollapsed && (
                <div>
                  <div className="font-bold text-slate-900 text-sm tracking-tight leading-none">Nact Study</div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
                    Faculty Workspace
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Group 1: TEACHING CORE */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Teaching Core
              </div>
            )}

            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
              { id: 'my-classes', label: 'My Classes', icon: Users2, badge: '3 Cohorts' },
              { id: 'students', label: 'Students Roster', icon: GraduationCap, badge: '50+' },
              { id: 'subjects', label: 'Subjects & Syllabus', icon: BookOpen, badge: null },
              { id: 'lessons', label: 'Lessons Hub', icon: BookMarked, badge: null },
              { id: 'lesson-resources', label: 'Lesson Resources', icon: FolderOpen, badge: 'Curated' },
              { id: 'curriculum', label: 'Curriculum & Studio', icon: Layers, badge: 'Studio' },
              { id: 'lesson-planner', label: 'Lesson Planner', icon: Wand2, badge: 'Weekly' },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#3d5ee1] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 2: AI CONTENT & STUDIO */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                AI Content & Studio
              </div>
            )}

            {[
              { id: 'ai-content', label: 'AI Content Studio', icon: BrainCircuit, badge: 'AI Live' },
              { id: 'ai-video', label: 'AI Video Studio', icon: Video, badge: 'Studio' },
              { id: 'question-generator', label: 'Question Generator', icon: HelpCircle, badge: 'Auto' },
              { id: 'worksheet-generator', label: 'Worksheet Generator', icon: FileText, badge: 'Print' },
              { id: 'exam-builder', label: 'Exam Builder', icon: Award, badge: 'Blueprint' },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#3d5ee1] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 3: ASSESSMENT & OPERATIONS */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Assessment & Operations
              </div>
            )}

            {[
              { id: 'assignments', label: 'Assignments Desk', icon: ListTodo, badge: '3 Due' },
              { id: 'question-bank', label: 'Question Bank', icon: BookOpen, badge: null },
              { id: 'gradebook', label: 'Academic Gradebook', icon: FileSpreadsheet, badge: null },
              { id: 'attendance', label: 'Roll Call Register', icon: UserCheck, badge: 'Daily' },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#3d5ee1] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 4: COMMUNICATION & AUDIT */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Communication & Privacy
              </div>
            )}

            {[
              { id: 'announcements', label: 'Class Circulars', icon: Bell, badge: null },
              { id: 'doubts', label: 'Student Doubts Q&A', icon: MessageSquare, badge: '2 Open' },
              { id: 'activity', label: 'Private Activity Log', icon: ShieldCheck, badge: 'Isolated' },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#3d5ee1] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Collapse Toggle */}
        <div className="p-3 border-t border-slate-200">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full py-2 px-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>{sidebarCollapsed ? '→' : '⮜ Collapse Sidebar'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONSOLE CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Header & Breadcrumb Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                🏛️ Delhi Public Global School • CBSE 2026–27
              </span>
              <span>•</span>
              <span className="text-slate-500 font-medium">Faculty Workspace</span>
              {activeNav !== 'dashboard' && (
                <>
                  <span>•</span>
                  <span className="text-[#3d5ee1] font-bold capitalize">{activeNav.replace('-', ' ')}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Instructor Studio & Academic Console
            </h1>
            <p className="text-xs text-slate-500">
              Welcome back, <strong>{currentUser.name}</strong>. Manage class periods, conduct roll call, generate exam papers, and evaluate submissions.
            </p>
          </div>

          {/* Quick Action Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {activeNav !== 'dashboard' && (
              <button
                onClick={() => setActiveNav('dashboard')}
                className="px-3.5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard Overview</span>
              </button>
            )}

            <button
              onClick={() => setActiveNav('timetable')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Timetable</span>
            </button>

            <button
              onClick={() => setActiveNav('attendance')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Attendance</span>
            </button>

            <button
              onClick={() => setActiveNav('ai-content')}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Lesson Studio</span>
            </button>

            <button
              onClick={() => setActiveNav('curriculum')}
              className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Course</span>
            </button>
          </div>
        </div>

        {/* 3. CONDITIONAL MODULE RENDERING */}

        {/* A. DASHBOARD VIEW */}
        {activeNav === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Launchpad to all Teacher Tools */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Faculty Quick Access Launchpad
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {[
                  { label: 'Timetable', nav: 'timetable', icon: Calendar, color: 'text-indigo-600 bg-indigo-50' },
                  { label: 'Attendance', nav: 'attendance', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
                  { label: 'Assignments', nav: 'assignments', icon: ListTodo, color: 'text-amber-600 bg-amber-50' },
                  { label: 'Marks/Grades', nav: 'gradebook', icon: Award, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Question Bank', nav: 'question-bank', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50' },
                  { label: 'Exam Builder', nav: 'exam-builder', icon: FileText, color: 'text-rose-600 bg-rose-50' },
                  { label: 'Activities', nav: 'activities', icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Reports MIS', nav: 'reports', icon: BarChart3, color: 'text-slate-600 bg-slate-100' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveNav(item.nav as any)}
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50 transition-all text-left flex items-center gap-2 group"
                  >
                    <div className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-slate-800 text-[11px] truncate group-hover:text-[#3d5ee1]">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* TODAY'S ACADEMIC TEACHING SCHEDULE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3d5ee1]" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Today's Academic Teaching Schedule (4 Periods)
                  </h2>
                  <span className="text-xs text-slate-400 font-normal">Friday Schedule • 8-Period Day Matrix</span>
                </div>

                <button
                  onClick={() => setShowFullWeekModal(true)}
                  className="text-xs font-semibold text-[#3d5ee1] hover:underline flex items-center gap-1"
                >
                  <span>Full Week View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {periods.map(period => (
                  <div
                    key={period.id}
                    className="p-4 bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">{period.periodName}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            period.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : period.status === 'In Progress'
                              ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {period.status}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-400">{period.time}</div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{period.subject}</span>
                        <span className="text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-700">
                          {period.classGrade}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {period.topic}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">📍 {period.room}</span>
                      <button
                        onClick={() => {
                          setActiveNav('lesson-resources');
                          showToast(`Opening Resources for ${period.subject} (${period.classGrade})`);
                        }}
                        className="text-[#3d5ee1] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>Video/Notes/PPT</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOUR STAT METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Students</span>
                  <div className="text-3xl font-bold font-mono text-slate-900">54</div>
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>↗ 3 Active Cohorts</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3d5ee1] flex items-center justify-center">
                  <Users2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Courses</span>
                  <div className="text-3xl font-bold font-mono text-slate-900">7</div>
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>↗ Published in LMS</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Grading</span>
                  <div className="text-3xl font-bold font-mono text-slate-900">2</div>
                  <div className="text-xs text-rose-600 font-medium flex items-center gap-1">
                    <span>↘ Deliverables to review</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pass Percentage</span>
                  <div className="text-3xl font-bold font-mono text-slate-900">96.8%</div>
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>↗ Mid-Term Assessment</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* SPLIT SECTION: TODAY'S PRIORITY TASKS + LIVE COHORT ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Cols: Today's Priority Tasks */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Today's Priority Tasks</h3>
                    <p className="text-xs text-slate-400">Action items needing instructor attention</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    3 Tasks Pending
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Task 1 */}
                  <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FileText className="w-4 h-4 text-amber-600" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Action Needed
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">3 Assignments to Grade</div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        RAG Assistant & React 19 homework submissions awaiting evaluation
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveNav('assignments')}
                      className="text-xs font-semibold text-[#3d5ee1] hover:underline flex items-center gap-1 self-start"
                    >
                      <span>Open Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Task 2 */}
                  <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          Review
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">2 Course Reviews Pending</div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Students posted feedback on Module 3 Vector Databases
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveNav('curriculum')}
                      className="text-xs font-semibold text-[#3d5ee1] hover:underline flex items-center gap-1 self-start"
                    >
                      <span>Open Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Task 3 */}
                  <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                          Q&A
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">2 Student Doubts Unresolved</div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Inquiries regarding Snell's Law and quadratic middle-term splitting
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveNav('doubts')}
                      className="text-xs font-semibold text-[#3d5ee1] hover:underline flex items-center gap-1 self-start"
                    >
                      <span>Open Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Live Cohort Activity */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Live Cohort Activity</h3>
                    <p className="text-xs text-slate-400">Real-time student submissions</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 1,
                      user: 'Shivam Sharma',
                      action: 'submitted RAG Assistant assignment',
                      time: '10m ago',
                      icon: FileText,
                      bg: 'bg-blue-50 text-blue-600'
                    },
                    {
                      id: 2,
                      user: 'Marcus Chen',
                      action: 'completed Module 2 Quiz (92%)',
                      time: '45m ago',
                      icon: CheckCircle2,
                      bg: 'bg-emerald-50 text-emerald-600'
                    },
                    {
                      id: 3,
                      user: 'Elena Rostova',
                      action: 'enrolled in UI/UX Systems',
                      time: '1h ago',
                      icon: Users2,
                      bg: 'bg-purple-50 text-purple-600'
                    },
                  ].map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs">
                      <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 truncate">
                          <strong>{item.user}</strong> {item.action}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* B. STUDENTS ROSTER & 360° PROFILES */}
        {activeNav === 'students' && <TeacherStudentsView />}

        {/* C. SUBJECTS & SYLLABUS TRACKER */}
        {activeNav === 'subjects' && <TeacherSubjectsView />}

        {/* D. LESSONS HUB */}
        {activeNav === 'lessons' && <TeacherLessonsView />}

        {/* E. LESSON RESOURCES (VIDEO / NOTES / PPT / LAB) */}
        {activeNav === 'lesson-resources' && <TeacherLessonResourcesView />}

        {/* F. CURRICULUM & STUDIO */}
        {activeNav === 'curriculum' && <TeacherCurriculumView />}

        {/* G. LESSON PLANNER */}
        {activeNav === 'lesson-planner' && <TeacherLessonPlannerView />}

        {/* H. AI VIDEO STUDIO */}
        {activeNav === 'ai-video' && <TeacherAiVideoStudio />}

        {/* I. QUESTION GENERATOR */}
        {activeNav === 'question-generator' && (
          <TeacherQuestionGenerator onAddToQuestionBank={handleAddGeneratedQuestionToBank} />
        )}

        {/* J. ANNOUNCEMENTS NOTICE BOARD */}
        {activeNav === 'announcements' && <TeacherAnnouncementsView />}

        {/* K. STUDENT DOUBTS FORUM */}
        {activeNav === 'doubts' && <TeacherDoubtsView />}

        {/* L. PRIVATE ACTIVITY LOG */}
        {activeNav === 'activity' && <TeacherActivityLogView />}

        {/* M. ATTENDANCE REGISTER */}
        {activeNav === 'attendance' && <TeacherAttendanceView />}

        {/* N. ASSIGNMENTS EVALUATION & GRADING */}
        {activeNav === 'assignments' && <TeacherAssignmentsView />}

        {/* O. AI CONTENT STUDIO */}
        {activeNav === 'ai-content' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-purple-600" />
                  <span>AI Curriculum & Lesson Studio</span>
                </h3>
                <p className="text-slate-500">
                  Generate structured lesson plans, Socratic discussion prompts, and formative exit tickets powered by pedagogical AI.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                AI Studio Live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topic / Chapter Subject</label>
                <input
                  type="text"
                  value={aiPromptTopic}
                  onChange={e => setAiPromptTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Grade Level</label>
                <select
                  value={aiSelectedGrade}
                  onChange={e => setAiSelectedGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                >
                  <option value="Class 8">Class 8 (Middle School)</option>
                  <option value="Class 9">Class 9 (Secondary)</option>
                  <option value="Class 10">Class 10 (Board Exam Batch)</option>
                  <option value="Higher Education / AI">Higher Ed / PG Diploma</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pedagogical Mode</label>
                <select
                  value={aiMode}
                  onChange={e => setAiMode(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                >
                  <option value="lesson-plan">45-Minute Lesson Plan</option>
                  <option value="socratic">Socratic Guiding Questions</option>
                  <option value="differentiated">Differentiated Instruction (Tiers 1-3)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAiLesson}
              disabled={isGeneratingAi}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-[#3d5ee1] text-white font-bold rounded-xl text-xs shadow-xs hover:opacity-95 transition-all flex items-center gap-2"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Pedagogical Plan...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Pedagogical Blueprint</span>
                </>
              )}
            </button>

            {aiGeneratedContent && (
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Generated Lesson Plan Output</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiGeneratedContent);
                        showToast('Copied lesson plan to clipboard!');
                      }}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold text-[11px]"
                    >
                      Copy Markdown
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1 bg-[#3d5ee1] text-white rounded-lg font-semibold text-[11px]"
                    >
                      Print Plan
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-xs">
                  {aiGeneratedContent}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* P. WORKSHEET GENERATOR */}
        {activeNav === 'worksheet-generator' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Classroom Printable Worksheet Generator</span>
                </h3>
                <p className="text-slate-500">
                  Generate classroom problem sheets with student answer boxes and official grading keys.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Student Worksheets</span>
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
              <div className="text-center pb-4 border-b border-slate-200 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Delhi Public Global School • CBSE 2026-27</div>
                <div className="text-base font-bold text-slate-900">Worksheet 04: Optics & Ray Diagrams Practicum</div>
                <div className="flex justify-center gap-8 text-[11px] text-slate-500 pt-1 font-mono">
                  <span>Student Name: _______________________</span>
                  <span>Roll No: _______</span>
                  <span>Date: __/__/2026</span>
                  <span>Max Marks: 15</span>
                </div>
              </div>

              <div className="space-y-4">
                {generatedWorksheet.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-slate-900 leading-snug">
                        <strong>Q{idx + 1}.</strong> {item.question}
                      </div>
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700 shrink-0">
                        [{item.marks} Marks]
                      </span>
                    </div>

                    <div className="h-20 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-end justify-end p-2 text-[10px] text-slate-400 font-mono">
                      Answer Workspace
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Q. EXAM BUILDER */}
        {activeNav === 'exam-builder' && <TeacherExamBuilderView />}

        {/* R. QUESTION BANK */}
        {activeNav === 'question-bank' && <TeacherQuestionBankView />}

        {/* S. MY CLASSES */}
        {activeNav === 'my-classes' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 animate-in fade-in duration-150 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">My Assigned Classes & Student Cohorts</h3>
              <p className="text-slate-500">K-12 & Executive cohorts under your direct instruction.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Class 8-A', subject: 'Mathematics', students: 28, room: 'Room 302', rep: 'Aarav Patel' },
                { name: 'Class 9-B', subject: 'Physics', students: 24, room: 'Science Lab 2', rep: 'Marcus Chen' },
                { name: 'Class 10-A', subject: 'Chemistry', students: 30, room: 'Chemistry Lab', rep: 'Elena Rostova' },
              ].map((c, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-slate-900">{c.name}</span>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-[#3d5ee1]">
                      {c.subject}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <div>Strength: <strong>{c.students} Active Learners</strong></div>
                    <div>Location: <strong>{c.room}</strong></div>
                    <div>Class Representative: <strong>{c.rep}</strong></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setActiveNav('attendance');
                        setSelectedAttendanceClass(c.name);
                      }}
                      className="py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-center"
                    >
                      Roll Call →
                    </button>
                    <button
                      onClick={() => {
                        setActiveNav('students');
                      }}
                      className="py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-semibold rounded-lg text-center"
                    >
                      View Students →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* T. GRADEBOOK */}
        {activeNav === 'gradebook' && <TeacherMarksAssessmentView />}

        {/* U. TIMETABLE & CONFLICT DETECTOR */}
        {activeNav === 'timetable' && <TeacherTimetableView />}

        {/* V. CLASSROOM ACTIVITIES */}
        {activeNav === 'activities' && <TeacherClassroomActivitiesView />}

        {/* W. EXAMINATION & INVIGILATION */}
        {activeNav === 'examination' && <TeacherExaminationView />}

        {/* X. LEAVE & SUBSTITUTES */}
        {activeNav === 'leave-substitute' && <TeacherLeaveSubstituteView />}

        {/* Y. ACADEMIC REPORTS */}
        {activeNav === 'reports' && <TeacherReportsView />}
      </main>

      {/* TIMETABLE FULL WEEK MODAL */}
      {showFullWeekModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col text-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Weekly Academic Timetable Matrix</h3>
                <p className="text-xs text-slate-500">Instructor: <strong>{currentUser.name}</strong> • 24 Periods Assigned Weekly</p>
              </div>
              <button
                onClick={() => setShowFullWeekModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border border-slate-200">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Day</th>
                    <th className="py-2.5 px-3">08:30 - 09:15</th>
                    <th className="py-2.5 px-3">09:15 - 10:00</th>
                    <th className="py-2.5 px-3">10:20 - 11:05</th>
                    <th className="py-2.5 px-3">11:05 - 11:50</th>
                    <th className="py-2.5 px-3">12:30 - 01:15</th>
                    <th className="py-2.5 px-3">02:00 - 02:40</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <tr key={day} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50/50">{day}</td>
                      <td className="py-3 px-3 font-mono text-[11px]">Math 8-A</td>
                      <td className="py-3 px-3 text-slate-400 italic">Free Period</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-indigo-600 font-bold">Physics 9-B</td>
                      <td className="py-3 px-3 font-mono text-[11px]">Math 8-B</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-emerald-600 font-bold">Chem 10-A</td>
                      <td className="py-3 px-3 text-slate-400 italic">Lab Office</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowFullWeekModal(false)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Timetable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

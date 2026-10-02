import React, { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users2,
  BookOpen,
  Boxes,
  Contact,
  KanbanSquare,
  MessageSquare,
  Mail,
  Workflow,
  CreditCard,
  BarChart3,
  Sliders,
  Building2,
  Award,
  Play,
  FileText,
  UserPlus,
  UserCheck,
  ShieldCheck,
  Clock,
  Lock,
  TrendingUp,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  X,
  Sparkles,
  HelpCircle,
  Video,
  ListTodo,
  Bell,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    leads,
    whatsAppConversations,
    currentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useApp();

  const openLeadsCount = leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').length;
  const unreadMessagesCount = whatsAppConversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Group expansion state
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    dashboard: true,
    master: true,
    operations: true,
    academics: true,
    transactions: true,
    crm: true,
    reports: true,
    settings: true,
    teacherTimetable: true,
    teacherClasses: true,
    teacherExam: true,
    teacherComms: true,
    teacherReports: true,
    teacherEval: true,
    teacherStudio: true,
    studentLearn: true,
    studentRecords: true,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleNavClick = (moduleId: string) => {
    if (moduleId === 'my-profile') {
      setIsProfileModalOpen(true);
    } else {
      setActiveModule(moduleId);
    }
    // Close mobile drawer if open
    setIsMobileSidebarOpen(false);
  };

  // 1. Administrator Navigation Structure
  const adminMenuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'preskool-dashboard', label: 'Preskool Academic Hub', icon: TrendingUp, badge: 'ERP' },
      ],
    },
    {
      id: 'master',
      label: 'Master',
      icon: Sliders,
      items: [
        { id: 'users', label: 'Users & Roles', icon: Users2, badge: 'Roster' },
        { id: 'user-rights', label: 'User Rights (RBAC)', icon: ShieldCheck, badge: 'Security' },
        { id: 'masters', label: 'Master Data Center', icon: Sliders, badge: '15 Masters' },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: UserPlus,
      items: [
        { id: 'student-admission', label: 'Student Admissions Form', icon: UserPlus, badge: 'New' },
        { id: 'students', label: 'Student Records Directory', icon: GraduationCap, badge: '50k+' },
        { id: 'preskool-forms', label: 'Multi-Form Center', icon: FileSpreadsheet, badge: 'Forms' },
        { id: 'attendance', label: 'Daily Attendance Register', icon: UserCheck, badge: 'Roll Call' },
      ],
    },
    {
      id: 'academics',
      label: 'Academics & LMS',
      icon: BookOpen,
      items: [
        { id: 'lms', label: 'Courses & Curriculum', icon: BookOpen, badge: '48 Courses' },
        { id: 'digital-products', label: 'Digital Products & Webinars', icon: Boxes, badge: '7 Types' },
        { id: 'teacher-dashboard', label: 'Faculty Studio Portal', icon: Sparkles, badge: 'Faculty' },
        { id: 'student-portal', label: 'Student Learning Portal', icon: Play, badge: 'Learners' },
      ],
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: CreditCard,
      items: [
        { id: 'fees', label: 'Fees Collection & Ledger', icon: CreditCard, badge: '₹24.5L' },
        { id: 'sales', label: 'Orders & Receipts', icon: CreditCard, badge: null },
      ],
    },
    {
      id: 'crm',
      label: 'CRM & Marketing',
      icon: Contact,
      items: [
        { id: 'leads', label: 'Admissions Lead Pipeline', icon: KanbanSquare, badge: openLeadsCount ? `${openLeadsCount}` : null },
        { id: 'crm', label: 'CRM Contacts 360°', icon: Contact, badge: null },
        { id: 'whatsapp', label: 'WhatsApp Automation & Bot', icon: MessageSquare, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : null },
        { id: 'email', label: 'Email Outreach Campaigns', icon: Mail, badge: null },
        { id: 'automation', label: 'Automated Workflows', icon: Workflow, badge: 'Active' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      items: [
        { id: 'reports', label: 'Executive MIS & Analytics', icon: BarChart3, badge: 'MIS' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      items: [
        { id: 'profile', label: 'Creator & Institute Profile', icon: Building2, badge: null },
        { id: 'settings', label: 'System & Gateway Settings', icon: Sliders, badge: null },
      ],
    },
    {
      id: 'profile-group',
      label: 'Profile',
      icon: User,
      items: [
        { id: 'my-profile', label: 'Account Profile & Security', icon: User, badge: 'Active' },
      ],
    },
  ];

  // 2. Teacher / Faculty Navigation Structure (Complete Academic Workflow)
  const teacherMenuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        { id: 'teacher-dashboard', label: 'Faculty Academic Console', icon: LayoutDashboard, badge: 'Live' },
      ],
    },
    {
      id: 'teacherTimetable',
      label: 'Timetable & Planning',
      icon: Calendar,
      items: [
        { id: 'teacher-timetable', label: 'My Timetable & Conflict Matrix', icon: Calendar, badge: 'Schedule' },
        { id: 'teacher-planner', label: 'Weekly Lesson Planner', icon: Clock, badge: 'Curriculum' },
      ],
    },
    {
      id: 'teacherClasses',
      label: 'Classes & Academics',
      icon: BookOpen,
      items: [
        { id: 'teacher-classes', label: 'My Assigned Cohorts', icon: BookOpen, badge: 'Active' },
        { id: 'teacher-students', label: 'Student Academic Records', icon: GraduationCap, badge: '360°' },
        { id: 'teacher-subjects', label: 'Subjects & Syllabus', icon: FileText, badge: null },
        { id: 'teacher-lessons', label: 'Lessons Hub', icon: Play, badge: null },
        { id: 'teacher-materials', label: 'Study Material & Handouts', icon: FileSpreadsheet, badge: 'PDF/Media' },
        { id: 'teacher-activities', label: 'Classroom Activities & Labs', icon: Sparkles, badge: 'Projects' },
      ],
    },
    {
      id: 'teacherExam',
      label: 'Exams & Assessment',
      icon: Award,
      items: [
        { id: 'teacher-exam-builder', label: 'Question Paper Builder', icon: Award, badge: 'Blueprint' },
        { id: 'teacher-question-bank', label: 'Institutional Question Bank', icon: BookOpen, badge: 'Repo' },
        { id: 'teacher-examination', label: 'Examination & Invigilation', icon: ShieldCheck, badge: 'Seating' },
        { id: 'teacher-assignments', label: 'Assignments & Homework', icon: ListTodo, badge: 'Grading' },
        { id: 'teacher-attendance', label: 'Daily Roll Call Register', icon: UserCheck, badge: 'Daily' },
        { id: 'teacher-grading', label: 'Marks & Assessment Desk', icon: Award, badge: 'Results' },
      ],
    },
    {
      id: 'teacherComms',
      label: 'Communication & Leave',
      icon: Bell,
      items: [
        { id: 'teacher-announcements', label: 'Class Announcements', icon: Bell, badge: null },
        { id: 'teacher-doubts', label: 'Student Doubts Q&A', icon: HelpCircle, badge: 'Q&A' },
        { id: 'teacher-leave', label: 'Leave & Substitution Desk', icon: Calendar, badge: 'Coverage' },
      ],
    },
    {
      id: 'teacherReports',
      label: 'MIS Reports & AI Studio',
      icon: BarChart3,
      items: [
        { id: 'teacher-reports', label: 'Academic Performance MIS', icon: BarChart3, badge: 'Analytics' },
        { id: 'teacher-ai-video', label: 'AI Video Studio', icon: Video, badge: 'Studio' },
        { id: 'teacher-questions', label: 'AI Question Generator', icon: Sparkles, badge: 'AI' },
        { id: 'teacher-activity', label: 'Private Activity Log', icon: ShieldCheck, badge: 'Audit' },
      ],
    },
    {
      id: 'profile-group',
      label: 'Profile',
      icon: User,
      items: [
        { id: 'my-profile', label: 'Account Profile & Security', icon: User, badge: 'Active' },
      ],
    },
  ];

  // 3. Student / Learner Navigation Structure
  const studentMenuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        { id: 'student-portal', label: 'Learning Dashboard', icon: TrendingUp, badge: 'Active' },
      ],
    },
    {
      id: 'studentLearn',
      label: 'Classroom & Coursework',
      icon: Play,
      items: [
        { id: 'student-classroom', label: 'Classroom Video Player', icon: Play, badge: 'Resume' },
        { id: 'student-assignments', label: 'My Assignments & Projects', icon: FileText, badge: 'Submit' },
      ],
    },
    {
      id: 'studentRecords',
      label: 'Academic Records & Fees',
      icon: Award,
      items: [
        { id: 'student-results', label: 'Exam Results & Marksheet', icon: Award, badge: 'Rank 1' },
        { id: 'student-fees', label: 'Fee Receipts & Ledger', icon: CreditCard, badge: 'Paid' },
        { id: 'student-idcard', label: 'Student Identity Card', icon: GraduationCap, badge: 'ID' },
        { id: 'student-activity', label: 'My Private Activity Log', icon: ShieldCheck, badge: 'Audit' },
      ],
    },
    {
      id: 'profile-group',
      label: 'Profile',
      icon: User,
      items: [
        { id: 'my-profile', label: 'Account Profile & Security', icon: User, badge: 'Active' },
      ],
    },
  ];

  // Dynamic menu selection based on authenticated user's portal type
  const menuGroups =
    currentUser.portalType === 'teacher'
      ? teacherMenuGroups
      : currentUser.portalType === 'student'
      ? studentMenuGroups
      : adminMenuGroups;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-hidden bg-white select-none">
      {/* User Scope Banner */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/60 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                  currentUser.portalType === 'admin'
                    ? 'bg-blue-600'
                    : currentUser.portalType === 'teacher'
                    ? 'bg-emerald-600'
                    : 'bg-indigo-600'
                }`}
              />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-900 truncate leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate leading-tight">
                {currentUser.role}
              </div>
            </div>
          </div>

          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
              currentUser.portalType === 'admin'
                ? 'bg-blue-100 text-blue-800'
                : currentUser.portalType === 'teacher'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            {currentUser.portalType}
          </span>
        </div>
      </div>

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-3 scrollbar-thin">
        {menuGroups.map(group => {
          const isExpanded = expandedGroups[group.id] !== false;
          const GroupIcon = group.icon;
          const hasActiveChild = group.items.some(i => activeModule === i.id);

          return (
            <div key={group.id} className="space-y-0.5">
              {/* Group Header with Expand/Collapse toggle */}
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-md transition-colors ${
                  hasActiveChild
                    ? 'text-slate-900 font-extrabold'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <GroupIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{group.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Group Items Submenu */}
              {isExpanded && (
                <div className="space-y-0.5 pl-1.5">
                  {group.items.map(item => {
                    const ItemIcon = item.icon;
                    const isActive = activeModule === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#3d5ee1] text-white font-semibold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                        title={item.label}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <ItemIcon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-slate-500'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold shrink-0 ml-1.5 ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer consolidated status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 text-xs shrink-0">
        <div className="flex items-center justify-between text-slate-700 font-semibold mb-0.5">
          <span>Nact Study ERP</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="text-[10px] text-slate-400 leading-tight">
          Isolated {currentUser.portalType.toUpperCase()} Session
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-slate-200 h-[calc(100vh-53px)] transition-all duration-200 shrink-0 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* 2. Responsive Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-xs">
                  N
                </div>
                <span className="font-bold text-slate-900 text-sm">Navigation Menu</span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

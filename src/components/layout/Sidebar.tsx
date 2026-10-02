import React from 'react';
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
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, leads, whatsAppConversations, currentUser } = useApp();

  const openLeadsCount = leads.filter(l => l.stage !== 'won' && l.stage !== 'lost').length;
  const unreadMessagesCount = whatsAppConversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // 1. Admin Portal Navigation
  const adminSections = [
    {
      group: 'Governance & Rights',
      items: [
        {
          id: 'dashboard',
          label: 'Admin Dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          id: 'user-rights',
          label: 'User Rights & Credentials',
          icon: ShieldCheck,
          badge: 'RBAC',
        },
      ]
    },
    {
      group: 'Peoples & Admissions',
      items: [
        {
          id: 'students',
          label: 'Student Directory',
          icon: GraduationCap,
          badge: '50k+',
        },
        {
          id: 'student-admission',
          label: 'Student Admission Form',
          icon: UserPlus,
          badge: 'New',
        },
        {
          id: 'teachers',
          label: 'Faculty & Staff Roster',
          icon: Users2,
          badge: '145',
        },
        {
          id: 'leads',
          label: 'Admissions Lead Pipeline',
          icon: KanbanSquare,
          badge: openLeadsCount ? `${openLeadsCount}` : null,
        },
        {
          id: 'crm',
          label: 'CRM Contacts 360°',
          icon: Contact,
          badge: null,
        },
      ]
    },
    {
      group: 'Academic & LMS Core',
      items: [
        {
          id: 'lms',
          label: 'Courses & Curriculum',
          icon: BookOpen,
          badge: '48 Courses',
        },
        {
          id: 'digital-products',
          label: 'Digital Products & Webinars',
          icon: Boxes,
          badge: '7 Types',
        },
      ]
    },
    {
      group: 'Finance & Accounts',
      items: [
        {
          id: 'fees',
          label: 'Fees Collection & Billing',
          icon: CreditCard,
          badge: '₹24.5L',
        },
        {
          id: 'sales',
          label: 'Orders & Receipts',
          icon: CreditCard,
          badge: null,
        },
      ]
    },
    {
      group: 'Communication & Outreach',
      items: [
        {
          id: 'whatsapp',
          label: 'WhatsApp Messaging & Bot',
          icon: MessageSquare,
          badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : null,
        },
        {
          id: 'email',
          label: 'Email Campaigns',
          icon: Mail,
          badge: null,
        },
        {
          id: 'automation',
          label: 'Automated Workflows',
          icon: Workflow,
          badge: 'Active',
        },
      ]
    },
    {
      group: 'Masters & Administration',
      items: [
        {
          id: 'masters',
          label: 'All Masters Hub (15 Masters)',
          icon: Sliders,
          badge: 'Live',
        },
        {
          id: 'reports',
          label: 'Executive MIS & Analytics',
          icon: BarChart3,
          badge: 'Reports',
        },
        {
          id: 'profile',
          label: 'Institute & Creator Profile',
          icon: Building2,
          badge: null,
        },
        {
          id: 'settings',
          label: 'System & Gateway Config',
          icon: Sliders,
          badge: null,
        },
      ]
    }
  ];

  // 2. Teacher Portal Navigation
  const teacherSections = [
    {
      group: 'Faculty Workspace',
      items: [
        {
          id: 'teacher-dashboard',
          label: 'Faculty Dashboard',
          icon: TrendingUp,
          badge: 'Assigned',
        },
        {
          id: 'teacher-classes',
          label: 'My Assigned Classes',
          icon: BookOpen,
          badge: '2 Cohorts',
        },
      ]
    },
    {
      group: 'Student Evaluation',
      items: [
        {
          id: 'teacher-attendance',
          label: 'Daily Attendance Register',
          icon: UserCheck,
          badge: 'Register',
        },
        {
          id: 'teacher-grading',
          label: 'Assignment Evaluation & Marks',
          icon: Award,
          badge: '2 Pending',
        },
        {
          id: 'teacher-materials',
          label: 'Course Handouts & Code',
          icon: FileText,
          badge: null,
        },
      ]
    },
    {
      group: 'Privacy & Security',
      items: [
        {
          id: 'teacher-activity',
          label: 'My Private Activity Log',
          icon: ShieldCheck,
          badge: 'Isolated',
        },
      ]
    }
  ];

  // 3. Student Portal Navigation
  const studentSections = [
    {
      group: 'Learner Workspace',
      items: [
        {
          id: 'student-portal',
          label: 'Learning Dashboard',
          icon: TrendingUp,
          badge: 'Active',
        },
        {
          id: 'student-classroom',
          label: 'Classroom & Video Player',
          icon: Play,
          badge: 'Resume',
        },
        {
          id: 'student-assignments',
          label: 'My Assignments & Projects',
          icon: FileText,
          badge: 'Submit',
        },
      ]
    },
    {
      group: 'Academic Records & Fees',
      items: [
        {
          id: 'student-results',
          label: 'Exam Results & Marksheet',
          icon: Award,
          badge: 'Rank 1',
        },
        {
          id: 'student-fees',
          label: 'Fee Receipts & Ledger',
          icon: CreditCard,
          badge: 'Paid',
        },
        {
          id: 'student-idcard',
          label: 'Student Identity Card',
          icon: GraduationCap,
          badge: null,
        },
      ]
    },
    {
      group: 'Privacy & Security',
      items: [
        {
          id: 'student-activity',
          label: 'My Private Activity Log',
          icon: ShieldCheck,
          badge: 'Isolated',
        },
      ]
    }
  ];

  // Pick menu sections based on authenticated user's portal type
  const menuSections =
    currentUser.portalType === 'teacher'
      ? teacherSections
      : currentUser.portalType === 'student'
      ? studentSections
      : adminSections;

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-53px)] flex flex-col justify-between select-none">
      <div className="py-3 px-3 space-y-5 overflow-y-auto">
        {/* User Scope Banner */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                currentUser.portalType === 'admin'
                  ? 'bg-blue-600'
                  : currentUser.portalType === 'teacher'
                  ? 'bg-emerald-600'
                  : 'bg-indigo-600'
              }`}
            />
            <div className="truncate">
              <div className="text-[11px] font-bold text-slate-900 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 capitalize">{currentUser.portalType} Scope</div>
            </div>
          </div>
          <span className="text-[9px] font-mono uppercase bg-white border border-slate-200 px-1 py-0.5 rounded font-bold text-slate-600">
            {currentUser.portalType}
          </span>
        </div>

        {menuSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {section.group}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#3d5ee1] text-white font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
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
          </div>
        ))}
      </div>

      {/* Footer consolidated status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 text-xs">
        <div className="flex items-center justify-between text-slate-700 font-semibold mb-0.5">
          <span>Nact Study ERP</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="text-[10px] text-slate-400 leading-tight">
          Isolated {currentUser.portalType.toUpperCase()} Session
        </div>
      </div>
    </aside>
  );
};

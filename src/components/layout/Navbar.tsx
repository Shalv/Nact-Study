import React, { useState } from 'react';
import {
  Bell,
  RefreshCw,
  ChevronDown,
  User,
  LogOut,
  Lock,
  Menu,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Users2,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    logout,
    notifications,
    markNotificationsRead,
    activeModule,
    resetAllData,
    setIsProfileModalOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
  } = useApp();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Breadcrumb mapping
  const getBreadcrumb = () => {
    switch (activeModule) {
      case 'dashboard':
        return { category: 'Dashboard', page: 'Executive Overview' };
      case 'preskool-dashboard':
        return { category: 'Dashboard', page: 'Preskool Academic Hub' };
      case 'users':
        return { category: 'Master', page: 'Users & Roles Management' };
      case 'user-rights':
      case 'rbac':
        return { category: 'Master', page: 'User Rights & Permissions (RBAC)' };
      case 'masters':
      case 'master-data':
        return { category: 'Master', page: 'Master Data Hub' };
      case 'student-admission':
        return { category: 'Operations', page: 'Student Admission Form' };
      case 'students':
        return { category: 'Operations', page: 'Student Records Directory' };
      case 'preskool-forms':
        return { category: 'Operations', page: 'Preskool Multi-Form Center' };
      case 'attendance':
        return { category: 'Operations', page: 'Daily Attendance Register' };
      case 'lms':
        return { category: 'Academics & LMS', page: 'Courses & Curriculum' };
      case 'digital-products':
        return { category: 'Academics & LMS', page: 'Digital Products & Webinars' };
      case 'fees':
        return { category: 'Transactions', page: 'Fees Collection & Ledger' };
      case 'sales':
        return { category: 'Transactions', page: 'Sales Orders & Receipts' };
      case 'leads':
        return { category: 'CRM & Pipeline', page: 'Admissions Lead Kanban' };
      case 'crm':
        return { category: 'CRM & Pipeline', page: 'CRM Contacts 360°' };
      case 'whatsapp':
        return { category: 'Communication', page: 'WhatsApp Automation & Bot' };
      case 'email':
        return { category: 'Communication', page: 'Email Outreach Campaigns' };
      case 'automation':
        return { category: 'Communication', page: 'Marketing Automation Workflows' };
      case 'reports':
        return { category: 'Reports', page: 'Executive MIS & Analytics' };
      case 'profile':
        return { category: 'Settings', page: 'Creator & Institute Profile' };
      case 'settings':
        return { category: 'Settings', page: 'Gateway & System Settings' };
      default:
        if (activeModule.startsWith('teacher-')) {
          return { category: 'Faculty Workspace', page: activeModule.replace('teacher-', '').replace(/-/g, ' ').toUpperCase() };
        }
        if (activeModule.startsWith('student-')) {
          return { category: 'Learner Workspace', page: activeModule.replace('student-', '').replace(/-/g, ' ').toUpperCase() };
        }
        return { category: 'Workspace', page: activeModule.replace(/-/g, ' ').toUpperCase() };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs select-none">
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
        {/* Left: Brand, Sidebar Toggle & Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={() => setIsMobileSidebarOpen(prev => !prev)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(prev => !prev)}
            className="hidden md:flex p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Logo & Brand Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              N
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-sm hidden sm:inline-block">
              Nact Study
            </span>
          </div>

          {/* Breadcrumb Separator & Location */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 pl-2 border-l border-slate-200">
            <span className="font-medium text-slate-500">{breadcrumb.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-slate-800">{breadcrumb.page}</span>
          </div>
        </div>

        {/* Center: Portal Scope Status Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              currentUser.portalType === 'admin'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : currentUser.portalType === 'teacher'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {currentUser.portalType === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
            {currentUser.portalType === 'teacher' && <Users2 className="w-3.5 h-3.5 text-emerald-600" />}
            {currentUser.portalType === 'student' && <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="capitalize">{currentUser.portalType} Workspace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>
        </div>

        {/* Right: Notifications & User Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsRead();
              }}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">Notifications</span>
                  <span className="text-[11px] text-slate-500">{notifications.length} recent</span>
                </div>
                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 text-xs hover:bg-slate-50 transition-colors">
                      <div className="font-medium text-slate-900 mb-0.5">{n.title}</div>
                      <div className="text-slate-600 text-[11px] leading-relaxed mb-1">{n.message}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dataset Reset for demo */}
          <button
            onClick={resetAllData}
            title="Reset system test data"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* USER PROFILE BUTTON (Requirement 4) */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 rounded-xl transition-all border border-slate-200/80"
              title="User Account & Profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono leading-tight">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                {/* Profile Header Summary */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div className="truncate">
                      <div className="font-bold text-slate-900 text-sm truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                      <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-blue-100 text-blue-800">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-semibold">My Account Profile</div>
                      <div className="text-[10px] text-slate-400">View and edit personal information</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-left"
                  >
                    <KeyRound className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="font-semibold">Change Password</div>
                      <div className="text-[10px] text-slate-400">Secure credential management</div>
                    </div>
                  </button>
                </div>

                {/* Logout Option (Requirement 4 & 8) */}
                <div className="pt-2 border-t border-slate-100 px-2">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      logout();
                    }}
                    className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-semibold flex items-center justify-center gap-2 text-xs transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out & Terminate Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

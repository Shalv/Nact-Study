import React, { useState } from 'react';
import {
  Bell,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Search,
  Plus,
  Users2,
  LogOut,
  Sliders,
  Lock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppUser, PortalType } from '../../types';

interface NavbarProps {
  onOpenNewLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewLeadModal }) => {
  const {
    currentUser,
    users,
    login,
    logout,
    notifications,
    markNotificationsRead,
    setActiveModule,
    resetAllData,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (currentUser.portalType === 'teacher') {
                setActiveModule('teacher-dashboard');
              } else if (currentUser.portalType === 'student') {
                setActiveModule('student-portal');
              } else {
                setActiveModule('dashboard');
              }
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[#2f4ac4] transition-colors">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#3d5ee1] transition-colors">
                  Nact Study
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    currentUser.portalType === 'admin'
                      ? 'bg-blue-100 text-blue-800'
                      : currentUser.portalType === 'teacher'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {currentUser.portalType} portal
                </span>
              </div>
              <span className="hidden sm:inline-block text-xs text-slate-400 font-normal">
                Creator, Institute & LMS ERP
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Search Input & Portal Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Search Input */}
          <div className="hidden lg:flex items-center relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search in your portal... (Enter)"
              value={headerSearch}
              onChange={e => setHeaderSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && headerSearch.trim()) {
                  const q = headerSearch.toLowerCase();
                  if (currentUser.portalType === 'admin') {
                    if (q.includes('master') || q.includes('option')) setActiveModule('masters');
                    else if (q.includes('admit') || q.includes('admission')) setActiveModule('student-admission');
                    else if (q.includes('fee')) setActiveModule('fees');
                    else if (q.includes('right') || q.includes('rbac') || q.includes('user')) setActiveModule('user-rights');
                    else setActiveModule('students');
                  } else if (currentUser.portalType === 'teacher') {
                    if (q.includes('attend')) setActiveModule('teacher-attendance');
                    else if (q.includes('grade') || q.includes('mark')) setActiveModule('teacher-grading');
                    else setActiveModule('teacher-classes');
                  } else {
                    if (q.includes('class') || q.includes('video')) setActiveModule('student-classroom');
                    else if (q.includes('assign')) setActiveModule('student-assignments');
                    else if (q.includes('result') || q.includes('mark')) setActiveModule('student-results');
                    else setActiveModule('student-portal');
                  }
                  setHeaderSearch('');
                }
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#3d5ee1] rounded-lg focus:outline-none transition-colors"
            />
          </div>

          {/* User Rights quick link for Admin */}
          {currentUser.portalType === 'admin' && (
            <button
              onClick={() => setActiveModule('user-rights')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Configure User Rights & RBAC"
            >
              <Sliders className="w-3.5 h-3.5 text-[#3d5ee1]" />
              <span>User Rights</span>
            </button>
          )}

          {/* Active User Profile & Portal Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all border border-slate-200/60"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-300 shrink-0"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono leading-tight">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Portal & User Switcher Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Authenticated Account</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{currentUser.email}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                    <Lock className="w-3 h-3" />
                    <span>Workspace isolated to {currentUser.portalType.toUpperCase()} scope</span>
                  </div>
                </div>

                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Portal Account
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {users.map(u => {
                    const isCurrent = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          login(u.username || u.email, u.password);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full text-left p-3 flex items-center justify-between transition-colors ${
                          isCurrent ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="truncate">
                            <div className="truncate font-bold text-slate-900">{u.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">
                              {u.username} · {u.role}
                            </div>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            u.portalType === 'admin'
                              ? 'bg-blue-100 text-blue-800'
                              : u.portalType === 'teacher'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {u.portalType}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 px-3">
                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full py-2 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-lg font-semibold flex items-center justify-center gap-1.5 text-xs transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out of Nact Study</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Actions & Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Notifications */}
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
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

          {/* Quick Action: New Admission / Inquiry (if admin or has permission) */}
          {currentUser.portalType === 'admin' && (
            <button
              onClick={onOpenNewLeadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-2xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Admission / Inquiry</span>
            </button>
          )}

          {/* Reset Demo Data Button */}
          <button
            onClick={resetAllData}
            title="Reset system dataset"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};


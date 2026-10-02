import React, { useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Users2,
  Lock,
  User,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PortalType } from '../../types';

export const LoginPortal: React.FC = () => {
  const { login, users, showToast } = useApp();

  const [selectedPortal, setSelectedPortal] = useState<PortalType>('admin');
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const portalOptions = [
    {
      type: 'admin' as PortalType,
      title: 'Administrator Portal',
      subtitle: 'Institutional Governance, Masters & User Rights',
      icon: ShieldCheck,
      color: 'border-blue-600 bg-blue-50/50 text-blue-700',
      badge: 'Full Access',
      defaultUser: 'admin',
      defaultPass: 'admin123',
      defaultName: 'Anita Sen (Super Admin)',
    },
    {
      type: 'teacher' as PortalType,
      title: 'Teacher / Faculty Portal',
      subtitle: 'Batch Attendance, Grading & Curriculum Notes',
      icon: Users2,
      color: 'border-emerald-600 bg-emerald-50/50 text-emerald-700',
      badge: 'Faculty Roster',
      defaultUser: 'vikram.roy',
      defaultPass: 'teacher123',
      defaultName: 'Prof. Vikramaditya Roy (AI Faculty)',
    },
    {
      type: 'student' as PortalType,
      title: 'Student Learning Portal',
      subtitle: 'Classroom Player, Assignments & Marks Records',
      icon: GraduationCap,
      color: 'border-indigo-600 bg-indigo-50/50 text-indigo-700',
      badge: 'Enrolled Learner',
      defaultUser: 'aarav.patel',
      defaultPass: 'student123',
      defaultName: 'Aarav Patel (ADM-9042)',
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPortal = (type: PortalType) => {
    setSelectedPortal(type);
    setErrorMessage('');
    const opt = portalOptions.find(p => p.type === type)!;
    setUsernameInput(opt.defaultUser);
    setPasswordInput(opt.defaultPass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const success = await login(usernameInput, passwordInput);
      if (!success) {
        setErrorMessage('Invalid username or password credentials. Please verify your login details.');
      }
    } catch {
      setErrorMessage('Authentication request failed. Please check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (username: string, pass: string, portal: PortalType) => {
    setSelectedPortal(portal);
    setUsernameInput(username);
    setPasswordInput(pass);
    setIsLoading(true);
    try {
      await login(username, pass);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7fa] flex flex-col justify-center items-center p-4 selection:bg-[#3d5ee1] selection:text-white font-sans">
      {/* Brand Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            N
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Nact Study
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Unified Multi-Portal Operating System with Granular Role-Based Access Control (RBAC) & Isolated User Sessions.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Step 1: Select Portal Tab */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Step 1: Choose Portal Authentication Scope
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {portalOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = selectedPortal === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleSelectPortal(opt.type)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? `${opt.color} shadow-xs font-semibold ring-2 ring-[#3d5ee1]/20`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#3d5ee1]' : 'text-slate-500'}`} />
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold uppercase tracking-wider ${
                        isSelected ? 'bg-[#3d5ee1] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.type}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">{opt.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5 line-clamp-1">
                      {opt.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Unique Login Credentials Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div className="text-sm font-bold text-slate-900">
                Sign in to {selectedPortal === 'admin' ? 'Administrator' : selectedPortal === 'teacher' ? 'Faculty & Teacher' : 'Student'} Portal
              </div>
              <p className="text-[11px] text-slate-400">
                User activity and records are strictly isolated to your authenticated account.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              RBAC Protected
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Username or Registered Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Enter your username or email"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#3d5ee1] font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">
                Password <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                Preset: {selectedPortal === 'admin' ? 'admin123' : selectedPortal === 'teacher' ? 'teacher123' : 'student123'}
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#3d5ee1] font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs"
          >
            <span>Log in to {selectedPortal.toUpperCase()} Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Step 3: Quick Demo Accounts Selector (For rapid evaluation) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span>Instant One-Click Sign-In Credentials</span>
            <span className="text-indigo-600 font-semibold normal-case">Try any persona:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin', 'admin123', 'admin')}
              className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-left transition-colors group"
            >
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Anita Sen</span>
                <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded font-mono">Admin</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">admin / admin123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('vikram.roy', 'teacher123', 'teacher')}
              className="p-2.5 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 rounded-xl text-left transition-colors group"
            >
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Prof. Vikramaditya</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded font-mono">Faculty</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">vikram.roy / teacher123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('aarav.patel', 'student123', 'student')}
              className="p-2.5 bg-white border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 rounded-xl text-left transition-colors group"
            >
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Aarav Patel</span>
                <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded font-mono">Student</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">aarav.patel / student123</div>
            </button>
          </div>
        </div>
      </div>

      {/* Security Privacy Notice */}
      <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        <span>Strict User Isolation: Students only view their private grades; Teachers only access assigned batches.</span>
      </div>
    </div>
  );
};

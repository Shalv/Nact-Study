import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, LayoutDashboard, UserCheck, AlertTriangle } from 'lucide-react';

interface AccessDeniedBannerProps {
  userRole: string;
  userName: string;
  attemptedModule: string;
  onBackToDashboard: () => void;
}

export const AccessDeniedBanner: React.FC<AccessDeniedBannerProps> = ({
  userRole,
  userName,
  attemptedModule,
  onBackToDashboard,
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 animate-in fade-in duration-150 text-xs">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-rose-200 shadow-xl p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold font-mono uppercase tracking-wider">
            <Lock className="w-3 h-3" />
            <span>RBAC Restricted Access</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-slate-600 text-xs max-w-sm mx-auto">
            You do not have permission to access the <strong>"{attemptedModule}"</strong> module. This function requires higher administrative or faculty credentials.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Authenticated User:</span>
            <strong className="text-slate-900">{userName}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Active Role Scope:</span>
            <strong className="text-indigo-600">{userRole}</strong>
          </div>
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Policy:</span>
            <span className="text-emerald-700 font-semibold">Strict Role Isolation Enforced</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onBackToDashboard}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to My Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

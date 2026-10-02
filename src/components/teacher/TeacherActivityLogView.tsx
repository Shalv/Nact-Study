import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Filter,
  CheckCircle2,
  Lock,
  UserCheck,
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherActivityLogView: React.FC = () => {
  const { activityLogs, currentUser } = useApp();
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Strict User Isolation: ONLY grab activity logs belonging to this specific teacher!
  const myLogs = activityLogs.filter(
    log => log.userId === currentUser.id || log.userName === currentUser.name
  );

  const filteredLogs = myLogs.filter(
    log => categoryFilter === 'All' || log.category === categoryFilter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Teacher Private Audit Trail & Activity Log</span>
          </h2>
          <p className="text-slate-500">
            Strict user isolation enforced: Only operations conducted by <strong>{currentUser.name}</strong> are visible.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Isolated Session</span>
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="font-bold text-slate-900 text-sm">
            Activity Timeline ({filteredLogs.length} Records Logged)
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl font-semibold text-slate-600">
            {['All', 'attendance', 'grading', 'academic'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  categoryFilter === cat ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-400 space-y-2">
            <Clock className="w-8 h-8 mx-auto text-slate-300" />
            <p>No activity records logged in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log, idx) => (
              <div
                key={log.id || idx}
                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-4 hover:bg-white transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">{log.action}</span>
                    <span className="text-[10px] font-mono uppercase bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.details}</p>
                </div>

                <div className="text-[10px] font-mono text-slate-400 whitespace-nowrap text-right shrink-0">
                  {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Just now'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

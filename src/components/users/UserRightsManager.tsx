import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Check,
  X,
  KeyRound,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Edit2,
  Plus,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppUser, PortalType, UserPermissions, UserRole } from '../../types';

export const UserRightsManager: React.FC = () => {
  const { users, currentUser, updateUserPermissions, showToast } = useApp();

  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<UserPermissions | null>(null);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenPermissionsModal = (user: AppUser) => {
    setSelectedUser(user);
    setEditingPermissions({ ...user.permissions });
  };

  const handleTogglePermission = (key: keyof UserPermissions) => {
    if (!editingPermissions) return;
    setEditingPermissions({
      ...editingPermissions,
      [key]: !editingPermissions[key]
    });
  };

  const handleSavePermissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !editingPermissions) return;

    updateUserPermissions(selectedUser.id, editingPermissions);
    setSelectedUser(null);
    setEditingPermissions(null);
  };

  const permissionModulesList: { key: keyof UserPermissions; label: string; desc: string }[] = [
    { key: 'dashboard', label: 'Management / Portal Dashboard', desc: 'Overview metrics, charts & activity feed' },
    { key: 'students', label: 'Student Admissions & Roster', desc: 'View student directory & admissions forms' },
    { key: 'teachers', label: 'Faculty & Teacher Management', desc: 'Faculty profiles, remuneration & staff roster' },
    { key: 'classes', label: 'Academic Classes & Batches', desc: 'Curriculum schedules, cohorts & timetable' },
    { key: 'lms', label: 'Course Builder & LMS Core', desc: 'Video lessons, modules, and public catalog' },
    { key: 'fees', label: 'Fees Collection & Billing', desc: 'Invoices, payment links & fee receipts' },
    { key: 'crm', label: 'Admissions Lead Pipeline (CRM)', desc: 'Kanban pipeline, inquiries & WhatsApp chat' },
    { key: 'masters', label: 'All Masters Hub (15 Masters)', desc: 'Classes, sections, subjects, fee groups & sources' },
    { key: 'reports', label: 'Executive MIS & Analytics', desc: 'Financial, student & lead conversion analytics' },
    { key: 'attendance', label: 'Attendance Register Access', desc: 'Mark daily attendance for enrolled students' },
    { key: 'grading', label: 'Assignment Grading & Marks', desc: 'Evaluate student code, assign marks & feedback' },
    { key: 'assignments', label: 'Assignments & Quizzes', desc: 'Submit and view curriculum homework' },
    { key: 'userRights', label: 'User Rights & RBAC Configuration', desc: 'Grant/revoke user rights and manage credentials' },
    { key: 'settings', label: 'System Configuration & Gateways', desc: 'Razorpay keys, WhatsApp cloud API & SMTP' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#f7f7fa] min-h-screen">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Administration</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">User Rights & RBAC</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#3d5ee1]" />
            <span>User Rights & Unique Credentials Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign modular permissions per user right concept. Each account possesses unique login credentials with isolated workspace scopes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200 font-semibold">
            {users.length} Registered Accounts
          </span>
        </div>
      </div>

      {/* Users and Credentials Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">User & Avatar</th>
                <th className="py-3 px-4">Portal Scope</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Unique Password</th>
                <th className="py-3 px-4">Assigned Rights</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Configure Rights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => {
                const isPasswordVisible = showPasswordMap[u.id] || false;
                const activePermsCount = Object.values(u.permissions || {}).filter(Boolean).length;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* User Profile */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Portal Type */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase tracking-wider ${
                          u.portalType === 'admin'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : u.portalType === 'teacher'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        }`}
                      >
                        {u.portalType}
                      </span>
                    </td>

                    {/* Username */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {u.username || u.email.split('@')[0]}
                    </td>

                    {/* Password with Show/Hide */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span>{isPasswordVisible ? u.password || '******' : '••••••••'}</span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(u.id)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Toggle password visibility"
                        >
                          {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Assigned Rights Count */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono text-[11px] font-semibold">
                        {activePermsCount} Modules Enabled
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                        Active
                      </span>
                    </td>

                    {/* Configure Rights Button */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenPermissionsModal(u)}
                        className="px-3 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1.5 ml-auto"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Edit Rights</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Granular Permission Rights Modal */}
      {selectedUser && editingPermissions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    User Rights & Permissions for {selectedUser.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Scope: <strong className="capitalize">{selectedUser.portalType} Portal</strong> · Username: <span className="font-mono">{selectedUser.username}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Permissions Grid */}
            <form onSubmit={handleSavePermissions} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
                <span>Select modules and operational capabilities granted to this user:</span>
                <button
                  type="button"
                  onClick={() => {
                    const allTrue: any = {};
                    permissionModulesList.forEach(m => (allTrue[m.key] = true));
                    setEditingPermissions(allTrue);
                  }}
                  className="text-[#3d5ee1] font-semibold hover:underline"
                >
                  Grant All Access
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {permissionModulesList.map(mod => {
                  const isChecked = editingPermissions[mod.key] || false;
                  return (
                    <label
                      key={mod.key}
                      onClick={() => handleTogglePermission(mod.key)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-[#3d5ee1] bg-blue-50/50 shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by label click
                        className="mt-0.5 rounded text-[#3d5ee1] focus:ring-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 leading-snug">{mod.label}</div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{mod.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Changes take effect immediately on next page interaction.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Rights Assignment</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

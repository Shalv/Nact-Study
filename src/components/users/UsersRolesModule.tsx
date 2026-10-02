import React from 'react';
import { ShieldCheck, UserCheck, Check, X, KeyRound, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const UsersRolesModule: React.FC = () => {
  const { users, currentRole, setCurrentRole, setActiveModule, showToast } = useApp();

  const permissions = [
    { label: 'Manage Global System & MIS', roles: ['Super Admin'] },
    { label: 'Edit Institute Profile & Masters', roles: ['Super Admin', 'Institute Admin'] },
    { label: 'Author Courses & Curriculum', roles: ['Super Admin', 'Institute Admin', 'Creator', 'Faculty'] },
    { label: 'CRM Pipeline & Lead Follow-ups', roles: ['Super Admin', 'Institute Admin', 'Counselor', 'Marketing User'] },
    { label: 'WhatsApp & Email Broadcasts', roles: ['Super Admin', 'Marketing User', 'Counselor'] },
    { label: 'Financial Orders & Payment Links', roles: ['Super Admin', 'Institute Admin', 'Accountant', 'Counselor'] },
    { label: 'Grade Quizzes & Issue Certificates', roles: ['Super Admin', 'Institute Admin', 'Creator', 'Faculty'] },
    { label: 'Student Classroom Access', roles: ['Super Admin', 'Faculty', 'Student'] },
    { label: 'Learner Support & Ticket Resolution', roles: ['Super Admin', 'Support User', 'Counselor'] },
  ];

  const handleSimulateRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'Student') {
      setActiveModule('student-portal');
    }
    showToast(`Switched active session to perspective: "${role}"`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            User Directory & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage 9 system roles, departmental staff assignments, counseling leads capacity, and permissions.
          </p>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-slate-900 text-xs">Organization Staff & User Directory</span>
          <span className="text-[11px] text-slate-500">{users.length} registered profiles</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="py-2.5 px-3">Name & Email</th>
              <th className="py-2.5 px-3">System Role</th>
              <th className="py-2.5 px-3">Department</th>
              <th className="py-2.5 px-3">Phone</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Perspective Switch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600">{u.department || 'General'}</td>
                <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{u.phone}</td>
                <td className="py-3 px-3">
                  <span className="text-emerald-700 font-medium text-[11px]">Active</span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => handleSimulateRole(u.role)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      currentRole === u.role
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'border border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {currentRole === u.role ? 'Current Role' : 'Switch To Role'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Permission Matrix */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">System Access & Permissions Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-2 px-3 font-semibold text-slate-700">Capability</th>
                <th className="py-2 px-2 text-center font-medium">Super Admin</th>
                <th className="py-2 px-2 text-center font-medium">Institute Admin</th>
                <th className="py-2 px-2 text-center font-medium">Creator</th>
                <th className="py-2 px-2 text-center font-medium">Faculty</th>
                <th className="py-2 px-2 text-center font-medium">Counselor</th>
                <th className="py-2 px-2 text-center font-medium">Marketing</th>
                <th className="py-2 px-2 text-center font-medium">Accountant</th>
                <th className="py-2 px-2 text-center font-medium">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-medium text-slate-800">{p.label}</td>
                  <td className="text-center py-2">{p.roles.includes('Super Admin') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Institute Admin') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Creator') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Faculty') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Counselor') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Marketing User') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Accountant') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                  <td className="text-center py-2">{p.roles.includes('Student') ? <Check className="w-3.5 h-3.5 text-emerald-600 mx-auto" /> : <X className="w-3.5 h-3.5 text-slate-300 mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

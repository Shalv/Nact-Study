import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Search,
  CheckCircle2,
  X,
  Edit2,
  Trash2,
  Sparkles,
  Calendar,
  BookOpen,
  Layers,
  Building,
  GraduationCap,
  CreditCard,
  Target,
  AlertTriangle,
  Award,
  DollarSign,
  ShieldCheck,
  RotateCcw,
  Check,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasterItem, SystemMasters } from '../../types';

interface MasterCategoryConfig {
  key: keyof SystemMasters;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ElementType;
  color: string;
  sampleCode: string;
  categoryPlaceholder?: string;
}

export const MasterDataCenter: React.FC = () => {
  const { systemMasters, addMasterItem, updateMasterItem, deleteMasterItem, showToast, setActiveModule } = useApp();

  const categories: MasterCategoryConfig[] = [
    {
      key: 'classes',
      label: 'Classes & Grade Master',
      shortLabel: 'Classes',
      description: 'Define academic classes, diploma tracks, degrees, and cohort programs.',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      sampleCode: 'CLS-AI-501',
      categoryPlaceholder: 'Higher Ed / Bootcamp / High School',
    },
    {
      key: 'sections',
      label: 'Sections & Batches Master',
      shortLabel: 'Sections',
      description: 'Class divisions, morning/evening shifts, and executive weekend cohorts.',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      sampleCode: 'SEC-A-MORN',
      categoryPlaceholder: 'Shift / Timing Group',
    },
    {
      key: 'subjects',
      label: 'Subjects & Course Modules Master',
      shortLabel: 'Subjects',
      description: 'Core curriculum subjects, practical labs, and elective specializations.',
      icon: BookOpen,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      sampleCode: 'SUB-CS-401',
      categoryPlaceholder: 'Theory / Practical / Capstone',
    },
    {
      key: 'academicYears',
      label: 'Academic Years Master',
      shortLabel: 'Academic Years',
      description: 'Annual academic sessions, enrollment terms, and financial year cycles.',
      icon: Calendar,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      sampleCode: 'AY-2026-27',
      categoryPlaceholder: 'Active / Upcoming',
    },
    {
      key: 'departments',
      label: 'Departments Master',
      shortLabel: 'Departments',
      description: 'Academic faculties, administrative units, counseling, and corporate offices.',
      icon: Building,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      sampleCode: 'DEPT-AI',
      categoryPlaceholder: 'Faculty / Administrative',
    },
    {
      key: 'staffDesignations',
      label: 'Designations & Staff Roles Master',
      shortLabel: 'Designations',
      description: 'Faculty hierarchy, academic ranks, counselors, and leadership titles.',
      icon: ShieldCheck,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      sampleCode: 'DES-PROF',
      categoryPlaceholder: 'Academic / Operations',
    },
    {
      key: 'feeGroups',
      label: 'Fee Groups & Structures Master',
      shortLabel: 'Fee Groups',
      description: 'Tuition fees, GPU compute labs, hostel, examination fees, and installment plans.',
      icon: CreditCard,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      sampleCode: 'FEE-TUITION-YR1',
      categoryPlaceholder: 'Annual / Installment / One-Time',
    },
    {
      key: 'feePaymentModes',
      label: 'Fee Payment Modes Master',
      shortLabel: 'Payment Modes',
      description: 'Accepted channels: UPI, Razorpay Gateway, NEFT wire, Cheque, and Cash.',
      icon: DollarSign,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      sampleCode: 'PAY-UPI',
      categoryPlaceholder: 'Digital / Bank / Offline',
    },
    {
      key: 'scholarships',
      label: 'Scholarships & Fee Concessions Master',
      shortLabel: 'Scholarships',
      description: 'Merit waivers, early-bird cohort discounts, and corporate subsidies.',
      icon: Award,
      color: 'text-pink-600 bg-pink-50 border-pink-200',
      sampleCode: 'SCH-MERIT-20',
      categoryPlaceholder: 'Percentage / Flat Amount',
    },
    {
      key: 'leadSources',
      label: 'Lead Sources & Marketing Channels Master',
      shortLabel: 'Lead Sources',
      description: 'Inbound channels: WhatsApp, Meta Ads, Google PPC, YouTube, and Referrals.',
      icon: Target,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      sampleCode: 'SRC-WHATSAPP',
      categoryPlaceholder: 'Inbound / Outbound / Paid',
    },
    {
      key: 'leadLostReasons',
      label: 'Lead Drop & Disqualification Reasons Master',
      shortLabel: 'Lost Reasons',
      description: 'Standardized counselor lost reasons for CRM analytics and pipeline hygiene.',
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      sampleCode: 'LOST-FEE-HIGH',
      categoryPlaceholder: 'Financial / Timing / Competitor',
    },
    {
      key: 'rooms',
      label: 'Classrooms, Labs & Virtual Halls Master',
      shortLabel: 'Rooms & Labs',
      description: 'Physical lecture halls, GPU computer clusters, and Zoom enterprise links.',
      icon: Building,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      sampleCode: 'LAB-GPU-01',
      categoryPlaceholder: 'Physical / Virtual / Lab',
    },
    {
      key: 'studentCategories',
      label: 'Student Categories & Quotas Master',
      shortLabel: 'Student Categories',
      description: 'Quota reservations, international students, and corporate cohorts.',
      icon: Tag,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      sampleCode: 'CAT-MERIT',
      categoryPlaceholder: 'General / Scholarship / Corporate',
    },
    {
      key: 'examTypes',
      label: 'Exam Types & Assessments Master',
      shortLabel: 'Exam Types',
      description: 'Mid-term reviews, comprehensive final exams, and weekly coding benchmarks.',
      icon: Award,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      sampleCode: 'EXAM-FINAL',
      categoryPlaceholder: 'Written / Practical / Viva',
    },
    {
      key: 'gradingScales',
      label: 'Grading Scales & Mark Bands Master',
      shortLabel: 'Grading Scales',
      description: 'Grade bands (A+, A, B, etc.), percentage thresholds, and GPA mappings.',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      sampleCode: 'GRD-DIST-A+',
      categoryPlaceholder: 'Letter Grade / Range',
    },
  ];

  const [activeCategoryKey, setActiveCategoryKey] = useState<keyof SystemMasters>('classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterItem | null>(null);

  // Form states for Add/Edit Master
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const activeCategory = categories.find(c => c.key === activeCategoryKey)!;
  const currentItems = (systemMasters[activeCategoryKey] || []) as MasterItem[];

  const filteredItems = currentItems.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      code: `${activeCategory.sampleCode}-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      category: '',
      description: '',
      status: 'active',
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item: MasterItem) => {
    setEditingItem(item);
    setFormData({
      code: item.code,
      name: item.name,
      category: item.category || '',
      description: item.description || '',
      status: item.status,
    });
    setShowAddModal(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      showToast('Please fill in both the code and name fields.', 'warning');
      return;
    }

    if (editingItem) {
      updateMasterItem(activeCategoryKey, editingItem.id, {
        code: formData.code.trim(),
        name: formData.name.trim(),
        category: formData.category.trim() || undefined,
        description: formData.description.trim() || undefined,
        status: formData.status,
      });
      showToast(`Updated master item: "${formData.name}"`);
    } else {
      addMasterItem(activeCategoryKey, {
        code: formData.code.trim(),
        name: formData.name.trim(),
        category: formData.category.trim() || undefined,
        description: formData.description.trim() || undefined,
        status: formData.status,
      });
      showToast(`Added new option "${formData.name}" to ${activeCategory.shortLabel}!`);
    }

    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from ${activeCategory.label}?`)) {
      deleteMasterItem(activeCategoryKey, id);
      showToast(`Deleted "${name}" from master.`);
    }
  };

  const handleToggleStatus = (item: MasterItem) => {
    const nextStatus = item.status === 'active' ? 'inactive' : 'active';
    updateMasterItem(activeCategoryKey, item.id, { status: nextStatus });
    showToast(`Marked "${item.name}" as ${nextStatus}.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto bg-[#f7f7fa] min-h-screen">
      {/* PreSkool Breadcrumb & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => setActiveModule('dashboard')}>Home</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Master Management Center</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#3d5ee1]" />
            <span>Master Data & Option Configuration</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, update, and manage all master lists across the ERP. Any changes automatically update dropdown options in Student Admission, Course Creator, and CRM forms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveModule('student-admission')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Open Admission Form</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New {activeCategory.shortLabel} Option</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Master Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Master Categories List */}
        <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Master Categories ({categories.length})
            </span>
            <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 py-0.5 rounded font-semibold">
              Live Sync
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[calc(100vh-280px)] overflow-y-auto">
            {categories.map(cat => {
              const Icon = cat.icon;
              const count = (systemMasters[cat.key] || []).length;
              const isActive = activeCategoryKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategoryKey(cat.key);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left p-3.5 flex items-center justify-between text-xs transition-colors ${
                    isActive
                      ? 'bg-blue-50/80 text-blue-900 border-l-4 border-[#3d5ee1] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-slate-800 font-medium">{cat.label}</div>
                      <div className="text-[11px] text-slate-400 font-normal truncate">{cat.description}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full shrink-0 font-semibold ${
                      isActive ? 'bg-[#3d5ee1] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Active Master Management Table & Actions */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Active Category Header Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${activeCategory.color}`}>
                <activeCategory.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{activeCategory.label}</h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {currentItems.length} Records
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activeCategory.description}</p>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={`Search ${activeCategory.shortLabel}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#3d5ee1] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Master Records Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Code / ID</th>
                    <th className="py-3 px-4">Title / Name</th>
                    <th className="py-3 px-4">Category / Group</th>
                    <th className="py-3 px-4">Description / Details</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <div className="space-y-2">
                          <Sliders className="w-8 h-8 text-slate-300 mx-auto" />
                          <p className="font-medium text-slate-600">No records found for "{searchQuery}"</p>
                          <button
                            onClick={handleOpenAddModal}
                            className="px-3 py-1.5 text-xs text-[#3d5ee1] font-semibold hover:underline"
                          >
                            + Create "{searchQuery || activeCategory.shortLabel}" now
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-700">
                          {item.code}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900">{item.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          {item.category ? (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                              {item.category}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {item.description || '—'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleStatus(item)}
                            title="Click to toggle active / inactive"
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider transition-colors ${
                              item.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                              title="Edit item"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with hint */}
            <div className="p-3 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Showing {filteredItems.length} of {currentItems.length} {activeCategory.shortLabel} options</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Created options are instantly injected into Student Admission, LMS, and Billing forms.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${activeCategory.color}`}>
                  <activeCategory.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingItem ? `Edit ${activeCategory.shortLabel}` : `Add New ${activeCategory.shortLabel}`}
                  </h3>
                  <p className="text-[11px] text-slate-500">{activeCategory.label}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveItem} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Option Code / ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={activeCategory.sampleCode}
                    value={formData.code}
                    onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono font-medium focus:outline-none focus:border-[#3d5ee1]"
                  />
                  <span className="text-[10px] text-slate-400">Unique alphanumeric code</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold focus:outline-none focus:border-[#3d5ee1]"
                  >
                    <option value="active">Active (Available in dropdowns)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Name / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={`e.g. Master Title for ${activeCategory.shortLabel}`}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Category / Sub-classification (Optional)
                </label>
                <input
                  type="text"
                  placeholder={activeCategory.categoryPlaceholder || 'e.g. Core / Elective'}
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Description / Remarks (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Additional context or operational instructions..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingItem ? 'Save Changes' : 'Create Option'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

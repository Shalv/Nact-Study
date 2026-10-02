import React, { useState } from 'react';
import {
  Building2,
  UserCheck,
  Palette,
  Globe,
  Save,
  Upload,
  Check,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Youtube,
  Twitter,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreatorInstituteProfile: React.FC = () => {
  const { creatorProfile, updateCreatorProfile, instituteProfile, updateInstituteProfile, setActiveModule } = useApp();
  const [activeTab, setActiveTab] = useState<'creator' | 'institute' | 'branding' | 'preview'>('creator');

  // Form states
  const [creatorForm, setCreatorForm] = useState(creatorProfile);
  const [instituteForm, setInstituteForm] = useState(instituteProfile);

  const handleSaveCreator = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreatorProfile(creatorForm);
  };

  const handleSaveInstitute = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstituteProfile(instituteForm);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Creator & Institute Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure individual creator credentials, institutional accreditation, and public branded landing portal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('creator')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'creator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Creator Profile
            </button>
            <button
              onClick={() => setActiveTab('institute')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'institute' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Institute Details
            </button>
            <button
              onClick={() => setActiveTab('branding')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'branding' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Branding & Signatures
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Public Profile
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Creator Profile */}
      {activeTab === 'creator' && (
        <form onSubmit={handleSaveCreator} className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="flex items-start gap-6 pb-6 border-b border-slate-100">
            <img
              src={creatorForm.avatarUrl}
              alt={creatorForm.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-sm"
            />
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">{creatorForm.name}</h2>
              <p className="text-xs text-slate-500">{creatorForm.title}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Change Photo
                </button>
                <span className="text-[11px] text-slate-400">JPG or PNG, max 5MB</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Creator Full Name</label>
              <input
                type="text"
                value={creatorForm.name}
                onChange={e => setCreatorForm({ ...creatorForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Professional Title</label>
              <input
                type="text"
                value={creatorForm.title}
                onChange={e => setCreatorForm({ ...creatorForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Bio & Background</label>
              <textarea
                rows={3}
                value={creatorForm.bio}
                onChange={e => setCreatorForm({ ...creatorForm, bio: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={creatorForm.qualification}
                onChange={e => setCreatorForm({ ...creatorForm, qualification: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Years of Experience</label>
              <input
                type="number"
                value={creatorForm.experienceYears}
                onChange={e => setCreatorForm({ ...creatorForm, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Specialization Focus</label>
              <input
                type="text"
                value={creatorForm.specialization}
                onChange={e => setCreatorForm({ ...creatorForm, specialization: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Mobile / WhatsApp Number</label>
              <input
                type="text"
                value={creatorForm.mobile}
                onChange={e => setCreatorForm({ ...creatorForm, mobile: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Email Address</label>
              <input
                type="email"
                value={creatorForm.email}
                onChange={e => setCreatorForm({ ...creatorForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Custom Public URL Slug</label>
              <div className="flex items-center">
                <span className="px-2.5 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-md text-slate-500 text-xs">
                  nactstudy.com/creator/
                </span>
                <input
                  type="text"
                  value={creatorForm.slug}
                  onChange={e => setCreatorForm({ ...creatorForm, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-r-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Creator Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Institute Profile */}
      {activeTab === 'institute' && (
        <form onSubmit={handleSaveInstitute} className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Institute Legal / Trade Name</label>
              <input
                type="text"
                value={instituteForm.name}
                onChange={e => setInstituteForm({ ...instituteForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Registration / Accreditation No.</label>
              <input
                type="text"
                value={instituteForm.registrationNumber}
                onChange={e => setInstituteForm({ ...instituteForm, registrationNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Campus / Corporate Address</label>
              <input
                type="text"
                value={instituteForm.address}
                onChange={e => setInstituteForm({ ...instituteForm, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={instituteForm.contactNumber}
                onChange={e => setInstituteForm({ ...instituteForm, contactNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Admissions Inquiries Email</label>
              <input
                type="email"
                value={instituteForm.email}
                onChange={e => setInstituteForm({ ...instituteForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Mission Statement</label>
              <textarea
                rows={2}
                value={instituteForm.mission}
                onChange={e => setInstituteForm({ ...instituteForm, mission: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Vision Statement</label>
              <textarea
                rows={2}
                value={instituteForm.vision}
                onChange={e => setInstituteForm({ ...instituteForm, vision: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Institute Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Branding & Signatures */}
      {activeTab === 'branding' && (
        <form onSubmit={handleSaveInstitute} className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Primary Brand Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={instituteForm.primaryColor}
                  onChange={e => setInstituteForm({ ...instituteForm, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded border border-slate-300 p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={instituteForm.primaryColor}
                  onChange={e => setInstituteForm({ ...instituteForm, primaryColor: e.target.value })}
                  className="w-32 px-3 py-2 border border-slate-200 rounded-md text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Secondary / Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={instituteForm.secondaryColor}
                  onChange={e => setInstituteForm({ ...instituteForm, secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded border border-slate-300 p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={instituteForm.secondaryColor}
                  onChange={e => setInstituteForm({ ...instituteForm, secondaryColor: e.target.value })}
                  className="w-32 px-3 py-2 border border-slate-200 rounded-md text-xs font-mono"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">Email Campaign Signature</label>
              <textarea
                rows={3}
                value={instituteForm.emailSignature}
                onChange={e => setInstituteForm({ ...instituteForm, emailSignature: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
              />
              <span className="text-[11px] text-slate-400">Appended automatically to outbound nurture and announcement emails.</span>
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-slate-700 mb-1">WhatsApp Automated Footer Signature</label>
              <textarea
                rows={2}
                value={instituteForm.whatsappSignature}
                onChange={e => setInstituteForm({ ...instituteForm, whatsappSignature: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Branding</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Public Profile View / Landing Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-950">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>
                Public Live URL: <strong>https://nactstudy.com/creator/{creatorProfile.slug}</strong>
              </span>
            </div>
            <button
              onClick={() => setActiveModule('public-landing')}
              className="font-semibold text-indigo-700 hover:underline flex items-center gap-1"
            >
              Open Full Academy Experience <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Embedded Mini Preview */}
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={creatorProfile.avatarUrl}
                alt={creatorProfile.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{creatorProfile.name}</h3>
                <p className="text-xs text-indigo-600 font-medium">{creatorProfile.title}</p>
                <p className="text-xs text-slate-500 mt-1">{instituteProfile.name}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>{creatorProfile.qualification}</span>
                  <span>·</span>
                  <span>{creatorProfile.experienceYears}+ Years Mentorship</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-indigo-500 pl-3">
              "{creatorProfile.bio}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Award,
  Video,
  ExternalLink,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicAcademyPage: React.FC = () => {
  const { creatorProfile, instituteProfile, courses, digitalProducts, addLead, setActiveModule, showToast } = useApp();

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(courses[0]?.title || '');

  const handleInboundLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel = courses.find(c => c.title === selectedCourseTitle);

    addLead({
      name: leadName,
      mobile: leadPhone,
      whatsapp: leadPhone,
      email: leadEmail,
      city: 'Bengaluru',
      state: 'Karnataka',
      source: 'WhatsApp Inbound',
      campaign: 'Public_Creator_Landing_Page',
      interestedProduct: selectedCourseTitle,
      productId: sel?.id || 'crs-1',
      productType: 'Course',
      budget: sel?.finalPrice || 28800,
      stage: 'new',
      assignedCounselorId: 'usr-4',
      assignedCounselorName: 'Pooja Kashyap',
      priority: 'High',
      qualification: 'Graduate',
      experienceYears: 2,
      occupation: 'Working Professional',
      nextFollowUpDate: new Date().toISOString().split('T')[0],
      nextFollowUpTime: '15:00',
      followUpType: 'WhatsApp',
      remarks: 'Inbound submission from public creator landing page.'
    });

    showToast(`Thank you ${leadName}! Your inquiry was received. Pooja Kashyap will connect with you via WhatsApp within 10 minutes.`);
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-16">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] bg-indigo-600 px-1.5 py-0.5 rounded uppercase">Public Preview</span>
          <span>Viewing student-facing landing page at <strong>nactstudy.com/creator/{creatorProfile.slug}</strong></span>
        </div>
        <button
          onClick={() => setActiveModule('dashboard')}
          className="text-xs text-indigo-400 hover:text-white underline font-medium"
        >
          Return to Admin Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admissions Open for Q4 2026 Cohorts</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Master Modern AI, Engineering & High-Stakes Finance with {creatorProfile.name}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {creatorProfile.bio} Mentored 14,000+ engineers and corporate executives at {instituteProfile.name}.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> {instituteProfile.registrationNumber}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" /> Accredited Certifications
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9/5 Rating (1,850+ Reviews)
              </span>
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xl p-2 bg-white">
              <img
                src={creatorProfile.avatarUrl}
                alt={creatorProfile.name}
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="p-3 text-center">
                <div className="font-bold text-slate-900 text-sm">{creatorProfile.name}</div>
                <div className="text-xs text-indigo-600 font-medium">{creatorProfile.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{creatorProfile.qualification}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Flagship Certification Cohorts
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Practical 24-week professional programs with cloud GPU lab access and guaranteed placement interview assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-600 font-semibold">{course.code}</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium">
                      {course.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{course.fullDescription}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Dean: <strong>{course.facultyName}</strong></span>
                    <span className="font-mono">{course.modules.length} Modules · {course.validityDays} Days Validity</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-slate-900 font-mono">
                    ₹{course.finalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 line-through">
                    ₹{course.price.toLocaleString('en-IN')} (20% Off)
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCourseTitle(course.title);
                    document.getElementById('lead-inbound-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-colors shadow-sm"
                >
                  Apply & Talk to Counselor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inbound Lead Capture Form (Directly Connected to CRM) */}
      <section id="lead-inbound-form" className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <h2 className="text-xl font-bold">Request Admissions Counseling & Curriculum Brochure</h2>
            <p className="text-xs text-slate-400">
              Get direct syllabus breakdown, installment fee structure, and scholarship eligibility details on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleInboundLeadSubmit} className="space-y-4 max-w-lg mx-auto text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">WhatsApp / Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={leadPhone}
                onChange={e => setLeadPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Work Email Address</label>
              <input
                type="email"
                placeholder="rahul@company.com"
                value={leadEmail}
                onChange={e => setLeadEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Select Program of Interest</label>
              <select
                value={selectedCourseTitle}
                onChange={e => setSelectedCourseTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold text-xs shadow-md transition-colors"
            >
              Get Brochure on WhatsApp & Connect with Counselor
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

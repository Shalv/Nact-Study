import React, { useState } from 'react';
import {
  Boxes,
  Video,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Plus,
  ExternalLink,
  Users,
  CheckCircle2,
  DollarSign,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DigitalProduct, ProductType } from '../../types';

export const DigitalProductsModule: React.FC = () => {
  const { digitalProducts, addDigitalProduct, showToast } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showWebinarModal, setShowWebinarModal] = useState(false);

  // 1:1 Consultation booking state
  const [selectedDate, setSelectedDate] = useState('2026-10-06');
  const [selectedSlot, setSelectedSlot] = useState('03:00 PM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientTopic, setClientTopic] = useState('AI Architecture & Scaling Strategy');

  const filteredProducts = selectedType === 'all'
    ? digitalProducts
    : digitalProducts.filter(p => p.type.toLowerCase() === selectedType.toLowerCase());

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`1:1 Consultation confirmed for ${clientName} on ${selectedDate} at ${selectedSlot}! Calendar & WhatsApp invite dispatched.`);
    setShowConsultationModal(false);
    setClientName('');
    setClientEmail('');
  };

  const productTypesList: ProductType[] = [
    'Course',
    'Webinar',
    '1:1 Consultation',
    'Book',
    'Study Material',
    'Pre-recorded Class',
    'Live Class'
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Digital Products & Monetization
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage Courses, Webinars, Books, Study Notes, Pre-recorded Classes, Live Cohorts, and 1:1 Consultations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConsultationModal(true)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            Test 1:1 Consultation Booking
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
            selectedType === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          All Products ({digitalProducts.length})
        </button>
        {productTypesList.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              selectedType === type
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                  {prod.type}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{prod.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {prod.webinarDetails && (
                  <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded text-xs space-y-1">
                    <div className="flex items-center justify-between text-indigo-950 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{prod.webinarDetails.date}</span>
                      </span>
                      <span className="font-mono text-[11px]">{prod.webinarDetails.time}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center justify-between">
                      <span>Platform: {prod.webinarDetails.platform}</span>
                      <span className="font-mono font-medium">{prod.webinarDetails.registeredCount}/{prod.webinarDetails.capacity} Registered</span>
                    </div>
                  </div>
                )}

                {prod.consultationDetails && (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-900 font-medium">
                      <span>Duration: {prod.consultationDetails.durationMinutes} Mins</span>
                      <span>Platform: {prod.consultationDetails.platform}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Days: {prod.consultationDetails.availableDays.join(', ')}
                    </div>
                  </div>
                )}

                <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
                  <span>Creator: <strong className="text-slate-700">{prod.creatorName}</strong></span>
                  <span className="font-mono">{prod.salesCount} sold</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  ₹{prod.price.toLocaleString('en-IN')}
                </div>
                {prod.originalPrice > prod.price && (
                  <div className="text-[10px] text-slate-400 line-through">
                    ₹{prod.originalPrice.toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {prod.type === '1:1 Consultation' ? (
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold transition-colors"
                >
                  Book Session
                </button>
              ) : (
                <button
                  onClick={() => showToast(`Payment link generated for ${prod.title}`)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold transition-colors"
                >
                  Get Link / Buy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 1:1 Consultation Booking Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Book 1:1 Private Consultation</h3>
                <p className="text-xs text-slate-500">With Dr. Rajesh Sharma · 45 Minutes Dedicated Session</p>
              </div>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookConsultation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Select Available Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={e => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white font-mono"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sumanth Rao"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sumanth@cloudtech.com"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Discussion Agenda / Questions</label>
                <textarea
                  rows={2}
                  value={clientTopic}
                  onChange={e => setClientTopic(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                <span className="font-medium text-slate-700">Consultation Fee</span>
                <span className="font-mono font-bold text-slate-900 text-sm">₹4,500</span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowConsultationModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800"
                >
                  Confirm & Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

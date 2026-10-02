import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Users2,
  BookOpen,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  UserCheck,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: string; // e.g., 'Period 1'
  startTime: string;
  endTime: string;
  subject: string;
  classGrade: string;
  room: string;
  teacher: string;
  substituteTeacher?: string;
  isExamOrSpecial?: boolean;
}

export const TeacherTimetableView: React.FC = () => {
  const { showToast, currentUser } = useApp();

  const [viewType, setViewType] = useState<'weekly' | 'daily' | 'exam'>('weekly');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Friday');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubstituteModal, setShowSubstituteModal] = useState(false);
  const [selectedSlotForSubstitute, setSelectedSlotForSubstitute] = useState<TimetableSlot | null>(null);

  // Timetable State
  const [slots, setSlots] = useState<TimetableSlot[]>([
    {
      id: 'tt-1',
      day: 'Monday',
      period: 'Period 1',
      startTime: '08:30 AM',
      endTime: '09:15 AM',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      room: 'Room 302',
      teacher: currentUser.name
    },
    {
      id: 'tt-2',
      day: 'Monday',
      period: 'Period 3',
      startTime: '10:20 AM',
      endTime: '11:05 AM',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      room: 'Science Lab 2',
      teacher: currentUser.name
    },
    {
      id: 'tt-3',
      day: 'Tuesday',
      period: 'Period 2',
      startTime: '09:20 AM',
      endTime: '10:05 AM',
      subject: 'Artificial Intelligence',
      classGrade: 'Class 10-A',
      room: 'Computer Center 1',
      teacher: currentUser.name
    },
    {
      id: 'tt-4',
      day: 'Wednesday',
      period: 'Period 1',
      startTime: '08:30 AM',
      endTime: '09:15 AM',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      room: 'Room 302',
      teacher: currentUser.name
    },
    {
      id: 'tt-5',
      day: 'Wednesday',
      period: 'Period 4',
      startTime: '11:10 AM',
      endTime: '11:55 AM',
      subject: 'Physics Lab',
      classGrade: 'Class 9-B',
      room: 'Physics Lab',
      teacher: currentUser.name
    },
    {
      id: 'tt-6',
      day: 'Thursday',
      period: 'Period 2',
      startTime: '09:20 AM',
      endTime: '10:05 AM',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      room: 'Room 302',
      teacher: currentUser.name
    },
    {
      id: 'tt-7',
      day: 'Friday',
      period: 'Period 1',
      startTime: '08:30 AM',
      endTime: '09:15 AM',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      room: 'Room 302',
      teacher: currentUser.name
    },
    {
      id: 'tt-8',
      day: 'Friday',
      period: 'Period 3',
      startTime: '10:20 AM',
      endTime: '11:05 AM',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      room: 'Science Lab 2',
      teacher: currentUser.name
    },
    {
      id: 'tt-9',
      day: 'Friday',
      period: 'Period 5',
      startTime: '12:30 PM',
      endTime: '01:15 PM',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      room: 'Chemistry Lab',
      teacher: currentUser.name
    },
    {
      id: 'tt-10',
      day: 'Saturday',
      period: 'Period 1',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      subject: 'Executive Python & MLOps',
      classGrade: 'Cohort Alpha',
      room: 'AI Seminar Hall',
      teacher: currentUser.name
    }
  ]);

  // Exam Schedule
  const examTimetable = [
    {
      date: '2026-10-15',
      time: '09:00 AM - 12:00 PM',
      subject: 'Mathematics (Term 1 Examination)',
      classGrade: 'Class 8-A',
      room: 'Examination Hall 1',
      role: 'Chief Invigilator'
    },
    {
      date: '2026-10-17',
      time: '09:00 AM - 12:00 PM',
      subject: 'Physics Theory (Midterm Exam)',
      classGrade: 'Class 9-B',
      room: 'Examination Hall 2',
      role: 'Room Invigilator'
    },
    {
      date: '2026-10-20',
      time: '09:00 AM - 12:00 PM',
      subject: 'Artificial Intelligence & Neural Systems',
      classGrade: 'Class 10-A',
      room: 'Lab 1',
      role: 'Practical Evaluator'
    }
  ];

  // Form State for Adding Timetable Slot
  const [formDay, setFormDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [formPeriod, setFormPeriod] = useState('Period 1');
  const [formStartTime, setFormStartTime] = useState('08:30 AM');
  const [formEndTime, setFormEndTime] = useState('09:15 AM');
  const [formSubject, setFormSubject] = useState('Mathematics');
  const [formClass, setFormClass] = useState('Class 8-A');
  const [formRoom, setFormRoom] = useState('Room 302');
  const [formConflictWarning, setFormConflictWarning] = useState<string | null>(null);

  // Substitute teacher form
  const [substituteName, setSubstituteName] = useState('Dr. Priya Sundaram');
  const [substituteReason, setSubstituteReason] = useState('Academic Faculty Council Meeting');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const periodsList = [
    { period: 'Period 1', time: '08:30 - 09:15 AM' },
    { period: 'Period 2', time: '09:20 - 10:05 AM' },
    { period: 'Period 3', time: '10:20 - 11:05 AM' },
    { period: 'Period 4', time: '11:10 - 11:55 AM' },
    { period: 'Period 5', time: '12:30 - 01:15 PM' },
    { period: 'Period 6', time: '01:20 - 02:05 PM' },
  ];

  // Conflict Detection Engine
  const checkConflicts = (day: string, period: string, room: string, classGrade: string) => {
    const existing = slots.find(s => s.day === day && s.period === period);
    if (existing) {
      return `Teacher schedule collision: You are already assigned to "${existing.subject} (${existing.classGrade})" in ${existing.room} during ${period} on ${day}.`;
    }
    const roomConflict = slots.find(s => s.day === day && s.period === period && s.room === room);
    if (roomConflict) {
      return `Room booking collision: ${room} is already booked by ${roomConflict.teacher} for ${roomConflict.subject}.`;
    }
    return null;
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const conflict = checkConflicts(formDay, formPeriod, formRoom, formClass);
    if (conflict) {
      setFormConflictWarning(conflict);
      return;
    }

    const newSlot: TimetableSlot = {
      id: `tt-${Date.now()}`,
      day: formDay,
      period: formPeriod,
      startTime: formStartTime,
      endTime: formEndTime,
      subject: formSubject,
      classGrade: formClass,
      room: formRoom,
      teacher: currentUser.name
    };

    setSlots(prev => [...prev, newSlot]);
    setShowAddModal(false);
    setFormConflictWarning(null);
    showToast(`Timetable slot for ${formSubject} (${formClass}) added successfully!`);
  };

  const handleAssignSubstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotForSubstitute) return;

    setSlots(prev => prev.map(s => 
      s.id === selectedSlotForSubstitute.id 
        ? { ...s, substituteTeacher: substituteName }
        : s
    ));

    showToast(`Substitute teacher ${substituteName} assigned for ${selectedSlotForSubstitute.subject} (${selectedSlotForSubstitute.day} ${selectedSlotForSubstitute.period})`);
    setShowSubstituteModal(false);
    setSelectedSlotForSubstitute(null);
  };

  const handleExportCSV = () => {
    const headers = ['Day', 'Period', 'Time', 'Subject', 'Class/Section', 'Room', 'Faculty', 'Substitute'];
    const rows = slots.map(s => [
      s.day,
      s.period,
      `"${s.startTime} - ${s.endTime}"`,
      `"${s.subject}"`,
      `"${s.classGrade}"`,
      `"${s.room}"`,
      `"${s.teacher}"`,
      s.substituteTeacher ? `"${s.substituteTeacher}"` : 'None'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `teacher_timetable_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported weekly timetable to CSV.');
  };

  const filteredSlots = slots.filter(s => {
    if (selectedClassFilter !== 'All' && s.classGrade !== selectedClassFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">My Timetable & Adjustments</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Academic Timetable & Class Routine</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              CBSE & Autonomous 2026–27
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly 6-day class schedules, room allocations, automated conflict detection, and faculty substitution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewType('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewType === 'weekly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly Grid
            </button>
            <button
              onClick={() => setViewType('daily')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewType === 'daily' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setViewType('exam')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewType === 'exam' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Exam Timetable
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
            title="Print Schedule"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setFormConflictWarning(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Slot</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: WEEKLY TIMETABLE GRID */}
      {viewType === 'weekly' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-700">Filter by Class:</span>
              <select
                value={selectedClassFilter}
                onChange={e => setSelectedClassFilter(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-medium"
              >
                <option value="All">All Classes</option>
                <option value="Class 8-A">Class 8-A</option>
                <option value="Class 9-B">Class 9-B</option>
                <option value="Class 10-A">Class 10-A</option>
                <option value="Cohort Alpha">Cohort Alpha</option>
              </select>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Regular Slot
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Substituted
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 font-bold text-slate-600 w-32 border-r border-slate-200">Time / Period</th>
                  {days.map(day => (
                    <th key={day} className="p-3 font-bold text-slate-800 border-r border-slate-200 last:border-r-0 min-w-[170px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {periodsList.map(({ period, time }) => (
                  <tr key={period} className="hover:bg-slate-50/50">
                    <td className="p-3 border-r border-slate-200 bg-slate-50/50">
                      <div className="font-bold text-slate-800">{period}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{time}</div>
                    </td>
                    {days.map(day => {
                      const match = filteredSlots.find(s => s.day === day && s.period === period);
                      return (
                        <td key={day} className="p-2.5 border-r border-slate-200 last:border-r-0 align-top">
                          {match ? (
                            <div className={`p-2.5 rounded-xl border transition-all space-y-1.5 ${
                              match.substituteTeacher 
                                ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                                : 'bg-slate-50 border-slate-200/90 text-slate-900 hover:border-[#3d5ee1] hover:bg-white hover:shadow-2xs'
                            }`}>
                              <div className="flex items-center justify-between font-bold text-[11px]">
                                <span className="truncate">{match.subject}</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white border border-slate-200">
                                  {match.classGrade}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{match.room}</span>
                              </div>
                              {match.substituteTeacher && (
                                <div className="text-[10px] font-medium text-amber-700 bg-white/80 px-1.5 py-0.5 rounded border border-amber-200">
                                  Sub: {match.substituteTeacher}
                                </div>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedSlotForSubstitute(match);
                                  setShowSubstituteModal(true);
                                }}
                                className="w-full mt-1 pt-1 border-t border-slate-200/60 text-[10px] text-[#3d5ee1] font-semibold hover:underline text-left"
                              >
                                {match.substituteTeacher ? 'Change Substitute' : '+ Adjust / Substitute'}
                              </button>
                            </div>
                          ) : (
                            <div className="h-16 rounded-lg border border-dashed border-slate-200/80 flex items-center justify-center text-[10px] text-slate-300">
                              Free Period
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: DAILY VIEW */}
      {viewType === 'daily' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Selected Day:</span>
              <div className="flex items-center gap-1">
                {days.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                      selectedDay === d ? 'bg-[#3d5ee1] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {slots.filter(s => s.day === selectedDay).length} Scheduled Sessions
            </span>
          </div>

          <div className="space-y-3">
            {slots
              .filter(s => s.day === selectedDay)
              .map(slot => (
                <div
                  key={slot.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-white hover:border-indigo-300 transition-all text-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-700 font-mono text-[11px]">
                      {slot.period}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{slot.subject}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{slot.startTime} - {slot.endTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Class / Cohort</span>
                      <span className="font-semibold text-slate-800">{slot.classGrade}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Assigned Room</span>
                      <span className="font-semibold text-slate-800">{slot.room}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Status</span>
                      <span className="font-semibold text-emerald-600">Confirmed</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSlotForSubstitute(slot);
                        setShowSubstituteModal(true);
                      }}
                      className="px-3 py-1.5 text-xs text-[#3d5ee1] bg-indigo-50 hover:bg-indigo-100 rounded-lg font-semibold transition-colors"
                    >
                      Assign Substitute
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* VIEW 3: EXAM TIMETABLE & DUTY */}
      {viewType === 'exam' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Term-End & Midterm Examination Invigilation Roster</h2>
              <p className="text-xs text-slate-500">Supervisory duty duties, seating blocks, and verification schedules.</p>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
              3 Duties Assigned
            </span>
          </div>

          <div className="space-y-3">
            {examTimetable.map((exam, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:bg-white hover:border-indigo-300 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{exam.subject}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                      {exam.classGrade}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>📅 Date: <strong>{exam.date}</strong></span>
                    <span>⏰ Time: <strong>{exam.time}</strong></span>
                    <span>📍 Room: <strong>{exam.room}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Invigilation Role</span>
                    <span className="font-bold text-indigo-700">{exam.role}</span>
                  </div>
                  <button
                    onClick={() => showToast(`Invigilation guidelines & checklist opened for ${exam.subject}`)}
                    className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    View Duty Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD TIMETABLE SLOT WITH CONFLICT DETECTION */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">Add Academic Timetable Slot</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSlot} className="p-6 space-y-4 text-xs">
              {formConflictWarning && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold">Collision Detected</div>
                    <div className="text-[11px] leading-relaxed">{formConflictWarning}</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={formDay}
                    onChange={e => {
                      setFormDay(e.target.value as any);
                      setFormConflictWarning(null);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Period</label>
                  <select
                    value={formPeriod}
                    onChange={e => {
                      setFormPeriod(e.target.value);
                      const p = periodsList.find(pl => pl.period === e.target.value);
                      if (p) {
                        const [st, et] = p.time.split(' - ');
                        setFormStartTime(st);
                        setFormEndTime(et);
                      }
                      setFormConflictWarning(null);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {periodsList.map(p => (
                      <option key={p.period} value={p.period}>{p.period} ({p.time})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value)}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Grade</label>
                  <select
                    value={formClass}
                    onChange={e => setFormClass(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Class 8-A">Class 8-A</option>
                    <option value="Class 9-B">Class 9-B</option>
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Cohort Alpha">Cohort Alpha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Room / Lab</label>
                <select
                  value={formRoom}
                  onChange={e => {
                    setFormRoom(e.target.value);
                    setFormConflictWarning(null);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Room 302">Room 302 (Mathematics Wing)</option>
                  <option value="Science Lab 2">Science Lab 2 (Physics Wing)</option>
                  <option value="Chemistry Lab">Chemistry Lab</option>
                  <option value="Computer Center 1">Computer Center 1 (AI / Systems)</option>
                  <option value="AI Seminar Hall">AI Seminar Hall</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-xs"
                >
                  Validate & Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN SUBSTITUTE TEACHER */}
      {showSubstituteModal && selectedSlotForSubstitute && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">Assign Substitute / Colleague</h3>
              </div>
              <button onClick={() => setShowSubstituteModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignSubstitute} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">
                  {selectedSlotForSubstitute.subject} ({selectedSlotForSubstitute.classGrade})
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  {selectedSlotForSubstitute.day} • {selectedSlotForSubstitute.period} ({selectedSlotForSubstitute.startTime} - {selectedSlotForSubstitute.endTime})
                </div>
                <div className="text-slate-500 text-[11px]">Room: {selectedSlotForSubstitute.room}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Substitute Faculty</label>
                <select
                  value={substituteName}
                  onChange={e => setSubstituteName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Dr. Priya Sundaram">Dr. Priya Sundaram (Finance & Valuation)</option>
                  <option value="Prof. Anand Deshmukh">Prof. Anand Deshmukh (Physics)</option>
                  <option value="Ms. Shalini Iyer">Ms. Shalini Iyer (Mathematics)</option>
                  <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (AI & Systems)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Adjustment</label>
                <textarea
                  rows={2}
                  value={substituteReason}
                  onChange={e => setSubstituteReason(e.target.value)}
                  placeholder="e.g., Academic council conference or medical leave"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSubstituteModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

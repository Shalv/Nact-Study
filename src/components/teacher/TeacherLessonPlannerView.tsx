import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Save,
  Printer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Edit2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherLessonPlannerView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();
  const [selectedWeek, setSelectedWeek] = useState('Week 40 • Oct 05 – Oct 10, 2026');
  const [editingSlot, setEditingSlot] = useState<{ day: string; period: string; subject: string; topic: string } | null>(null);

  const [timetable, setTimetable] = useState<Record<string, Record<string, { subject: string; classGrade: string; topic: string; room: string }>>>({
    Monday: {
      'P1 (08:30)': { subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Linear Equations Transposition', room: 'Room 302' },
      'P2 (09:15)': { subject: 'Free / Prep', classGrade: '—', topic: 'Lesson Plan Prep', room: 'Staff Room' },
      'P3 (10:20)': { subject: 'Physics', classGrade: 'Class 9-B', topic: 'Laws of Reflection', room: 'Science Lab 2' },
      'P4 (11:05)': { subject: 'Mathematics', classGrade: 'Class 8-B', topic: 'Factorization by Regrouping', room: 'Room 303' },
      'P5 (12:30)': { subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'Acid-Base Titration', room: 'Chemistry Lab' },
      'P6 (02:00)': { subject: 'Mentorship', classGrade: 'Class 8-A', topic: 'Socratic Doubt Clearing', room: 'Room 302' },
    },
    Tuesday: {
      'P1 (08:30)': { subject: 'Physics', classGrade: 'Class 9-B', topic: 'Snell’s Law & Index of Refraction', room: 'Science Lab 2' },
      'P2 (09:15)': { subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Word Problems: Age & Speed', room: 'Room 302' },
      'P3 (10:20)': { subject: 'Free / Office', classGrade: '—', topic: 'Department Meeting', room: 'Conference Hall' },
      'P4 (11:05)': { subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'pH Scale & Universal Indicator', room: 'Chemistry Lab' },
      'P5 (12:30)': { subject: 'Mathematics', classGrade: 'Class 8-B', topic: 'Quadratic Polynomial Proofs', room: 'Room 303' },
      'P6 (02:00)': { subject: 'AI Studio Lab', classGrade: 'Class 10-A', topic: 'PyTorch Attention Tensor Lab', room: 'Computer Lab 1' },
    },
    Wednesday: {
      'P1 (08:30)': { subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'Neutralization Stoichiometry', room: 'Chemistry Lab' },
      'P2 (09:15)': { subject: 'Physics', classGrade: 'Class 9-B', topic: 'Spherical Mirror Ray Diagrams', room: 'Science Lab 2' },
      'P3 (10:20)': { subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Mid-Chapter Formative Quiz', room: 'Room 302' },
      'P4 (11:05)': { subject: 'Free / Prep', classGrade: '—', topic: 'Gradebook Entry', room: 'Staff Room' },
      'P5 (12:30)': { subject: 'Physics Lab', classGrade: 'Class 9-B', topic: 'Optical Bench Laser Alignment', room: 'Science Lab 2' },
      'P6 (02:00)': { subject: 'Faculty Circle', classGrade: '—', topic: 'CBSE Curriculum Review', room: 'Admin Block' },
    },
    Thursday: {
      'P1 (08:30)': { subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Surface Area of Cylinder & Cone', room: 'Room 302' },
      'P2 (09:15)': { subject: 'Mathematics', classGrade: 'Class 8-B', topic: 'Exercise 3.2 Problem Solving', room: 'Room 303' },
      'P3 (10:20)': { subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'Chlor-Alkali Process & Bleaching', room: 'Chemistry Lab' },
      'P4 (11:05)': { subject: 'Free / Office', classGrade: '—', topic: 'Parent Consultations', room: 'Faculty Lounge' },
      'P5 (12:30)': { subject: 'Physics', classGrade: 'Class 9-B', topic: 'Universal Gravitation Formula', room: 'Science Lab 2' },
      'P6 (02:00)': { subject: 'Robotics Club', classGrade: 'All Grades', topic: 'Arduino Sensor Calibration', room: 'STEM Lab' },
    },
    Friday: {
      'P1 (08:30)': { subject: 'Mathematics', classGrade: 'Class 8-A', topic: 'Exercise 2.3 Homework Defense', room: 'Room 302' },
      'P2 (09:15)': { subject: 'Free / Prep', classGrade: '—', topic: 'Exam Blueprint Drafting', room: 'Staff Room' },
      'P3 (10:20)': { subject: 'Physics', classGrade: 'Class 9-B', topic: 'Ray Diagram Practicum & Lab', room: 'Science Lab 2' },
      'P4 (11:05)': { subject: 'Mathematics', classGrade: 'Class 8-B', topic: 'Doubt Clearing & Peer Reviews', room: 'Room 303' },
      'P5 (12:30)': { subject: 'Chemistry', classGrade: 'Class 10-A', topic: 'Titration Practical Assessment', room: 'Chemistry Lab' },
      'P6 (02:00)': { subject: 'Weekly Assembly', classGrade: 'School', topic: 'Science Fair Awards Ceremony', room: 'Auditorium' },
    },
    Saturday: {
      'P1 (08:30)': { subject: 'Olympiad Math', classGrade: 'Selected', topic: 'Combinatorics & Number Theory', room: 'Room 302' },
      'P2 (09:15)': { subject: 'Remedial Tutoring', classGrade: 'Class 8-A', topic: 'Algebra Basics Recovery', room: 'Room 302' },
      'P3 (10:20)': { subject: 'Remedial Physics', classGrade: 'Class 9-B', topic: 'Ray Tracing Individual Review', room: 'Science Lab 2' },
      'P4 (11:05)': { subject: 'Weekly Close', classGrade: '—', topic: 'Next Week Lesson Plans Filing', room: 'Staff Room' },
      'P5 (12:30)': { subject: 'Weekend Off', classGrade: '—', topic: '—', room: '—' },
      'P6 (02:00)': { subject: 'Weekend Off', classGrade: '—', topic: '—', room: '—' },
    }
  });

  const periodsList = ['P1 (08:30)', 'P2 (09:15)', 'P3 (10:20)', 'P4 (11:05)', 'P5 (12:30)', 'P6 (02:00)'];

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;

    setTimetable(prev => ({
      ...prev,
      [editingSlot.day]: {
        ...prev[editingSlot.day],
        [editingSlot.period]: {
          ...prev[editingSlot.day][editingSlot.period],
          subject: editingSlot.subject,
          topic: editingSlot.topic
        }
      }
    }));

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Updated Lesson Plan Slot: ${editingSlot.day} ${editingSlot.period}`,
      details: `${editingSlot.subject}: ${editingSlot.topic}`,
      category: 'academic'
    });

    showToast(`Planner updated for ${editingSlot.day} ${editingSlot.period}.`);
    setEditingSlot(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150 text-xs">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3d5ee1]" />
            <span>Weekly Academic Lesson Planner & Timetable Scheduler</span>
          </h2>
          <p className="text-slate-500">
            Map out each instructional period across the 6-day week. Click any period to edit topics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedWeek}</span>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Scheme</span>
          </button>
        </div>
      </div>

      {/* Grid Timetable Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
              <tr>
                <th className="py-3 px-4 w-28 bg-slate-100/70 border-r border-slate-200">Day</th>
                {periodsList.map(p => (
                  <th key={p} className="py-3 px-3 text-center border-r border-slate-200 last:border-r-0 min-w-[170px]">
                    <div className="font-bold text-slate-900">{p.split(' ')[0]}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-normal">{p.split(' ')[1]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.keys(timetable).map(day => (
                <tr key={day} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                    {day}
                  </td>
                  {periodsList.map(period => {
                    const slot = timetable[day]?.[period];
                    const isFree = !slot || slot.subject.includes('Free') || slot.subject.includes('Off');
                    return (
                      <td
                        key={period}
                        onClick={() =>
                          setEditingSlot({
                            day,
                            period,
                            subject: slot?.subject || 'Mathematics',
                            topic: slot?.topic || ''
                          })
                        }
                        className={`py-3 px-3 border-r border-slate-200 last:border-r-0 cursor-pointer transition-all hover:bg-blue-50/50 group ${
                          isFree ? 'bg-slate-50/40 text-slate-400' : 'bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-bold text-[11px] truncate ${
                                isFree ? 'text-slate-400 italic' : 'text-[#3d5ee1]'
                              }`}
                            >
                              {slot?.subject}
                            </span>
                            {!isFree && (
                              <span className="text-[9px] font-mono bg-slate-100 px-1 py-0.2 rounded font-semibold text-slate-600">
                                {slot?.classGrade}
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-snug">
                            {slot?.topic}
                          </div>

                          {!isFree && (
                            <div className="text-[10px] text-slate-400 font-mono pt-1 flex items-center justify-between">
                              <span>📍 {slot?.room}</span>
                              <Edit2 className="w-3 h-3 text-slate-300 group-hover:text-[#3d5ee1]" />
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Slot Modal */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#3d5ee1] uppercase">
                  {editingSlot.day} • {editingSlot.period}
                </span>
                <h3 className="text-base font-bold text-slate-900">Edit Instructional Period Topic</h3>
              </div>
              <button onClick={() => setEditingSlot(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={editingSlot.subject}
                  onChange={e => setEditingSlot({ ...editingSlot, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Planned Topic / Lesson Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingSlot.topic}
                  onChange={e => setEditingSlot({ ...editingSlot, topic: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSlot(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Save Period Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

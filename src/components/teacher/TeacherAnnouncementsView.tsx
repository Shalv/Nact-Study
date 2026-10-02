import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Calendar,
  Users2,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Pin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherAnnouncementsView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [announcements, setAnnouncements] = useState([
    {
      id: 'ANN-101',
      title: 'Term 1 Science Practicum & Lab Notebook Submission Deadline',
      classGrade: 'Class 9-B & 10-A',
      date: '2026-10-02',
      category: 'Exam Notice',
      priority: 'High',
      content:
        'All students must bring signed lab notebooks containing Experiments 1 through 5 (Optics & Acid-Base Titration) on Monday morning. Practical viva will be conducted during Period 5.',
      reads: '48 / 54 Students Read'
    },
    {
      id: 'ANN-102',
      title: 'Mathematics Olympiad Selection Camp Round 1',
      classGrade: 'Class 8-A',
      date: '2026-09-30',
      category: 'Competition',
      priority: 'Normal',
      content:
        'Interested students can register for the National Math Olympiad before Friday. Practice sessions will be held on Saturdays from 8:30 to 10:00 AM in Room 302.',
      reads: '26 / 28 Students Read'
    },
    {
      id: 'ANN-103',
      title: 'Homework Clarification: Exercise 2.3 Questions 6–10',
      classGrade: 'Class 8-A',
      date: '2026-09-28',
      category: 'Homework',
      priority: 'Normal',
      content:
        'For Question 8 involving speed and time, remember to convert minutes into hours (divide by 60) before setting up the distance equality equation.',
      reads: '28 / 28 Students Read'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    classGrade: 'Class 8-A',
    category: 'Homework',
    priority: 'Normal',
    content: ''
  });

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.content.trim()) return;

    const obj = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: newNotice.title,
      classGrade: newNotice.classGrade,
      date: new Date().toISOString().split('T')[0],
      category: newNotice.category,
      priority: newNotice.priority,
      content: newNotice.content,
      reads: 'Broadcasted Just Now'
    };

    setAnnouncements([obj, ...announcements]);

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Broadcasted Class Circular: ${newNotice.title}`,
      details: `${newNotice.classGrade} • ${newNotice.category}`,
      category: 'academic'
    });

    showToast(`Notice broadcasted to ${newNotice.classGrade}.`);
    setShowModal(false);
    setNewNotice({
      title: '',
      classGrade: 'Class 8-A',
      category: 'Homework',
      priority: 'Normal',
      content: ''
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#3d5ee1]" />
            <span>Class Announcements & Circulars Notice Board</span>
          </h2>
          <p className="text-slate-500">
            Publish homework updates, practical exam schedules, and circulars directly to student portals.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Post New Circular</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ann.priority === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {ann.category}
                </span>
                <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                  {ann.classGrade}
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">{ann.date}</span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
            <p className="text-slate-700 leading-relaxed">{ann.content}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Audience: {ann.classGrade}</span>
              <span className="text-emerald-600 font-semibold">{ann.reads}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Post Announcement to Cohort</h3>
            <form onSubmit={handlePostNotice} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit Test 2 Schedule Announcement"
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Class</label>
                  <select
                    value={newNotice.classGrade}
                    onChange={e => setNewNotice({ ...newNotice, classGrade: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Class 8-A">Class 8-A</option>
                    <option value="Class 8-B">Class 8-B</option>
                    <option value="Class 9-B">Class 9-B</option>
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="All Classes">All Classes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newNotice.category}
                    onChange={e => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Homework">Homework</option>
                    <option value="Exam Notice">Exam Notice</option>
                    <option value="Competition">Competition</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type circular announcement for students..."
                  value={newNotice.content}
                  onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

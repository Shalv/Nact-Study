import React, { useState } from 'react';
import {
  Layers,
  Plus,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Save,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherCurriculumView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [modules, setModules] = useState([
    {
      id: 'MOD-1',
      title: 'Module 1: Foundations of Mathematical Reasoning & Polynomials',
      expanded: true,
      lessons: [
        { id: 'L1-1', title: 'Algebraic Identities: (a+b)^2 and (a-b)^2 Derivations', type: 'Lecture Video', duration: '25m' },
        { id: 'L1-2', title: 'Factorization by Regrouping and Common Monomial Factors', type: 'Guided Lab', duration: '30m' },
        { id: 'L1-3', title: 'Splitting the Middle Term in Quadratic Equations', type: 'Practice Drill', duration: '40m' },
        { id: 'L1-4', title: 'Module 1 Mastery Assessment Quiz', type: 'Quiz', duration: '20m' }
      ]
    },
    {
      id: 'MOD-2',
      title: 'Module 2: Classical Mechanics & Gravitational Fields',
      expanded: false,
      lessons: [
        { id: 'L2-1', title: 'Newton’s Universal Gravitation Law & Inverse Square Principle', type: 'Lecture Video', duration: '35m' },
        { id: 'L2-2', title: 'Mass vs Weight: Acceleration due to Gravity on Planetary Bodies', type: 'Interactive Sim', duration: '25m' },
        { id: 'L2-3', title: 'Terminal Velocity & Free-Fall under Atmospheric Drag', type: 'Lab Practicum', duration: '45m' },
        { id: 'L2-4', title: 'Numerical Problem Set on Orbital Velocity', type: 'Problem Set', duration: '30m' }
      ]
    },
    {
      id: 'MOD-3',
      title: 'Module 3: Vector Databases, Embeddings & RAG Architectures',
      expanded: false,
      lessons: [
        { id: 'L3-1', title: 'High-Dimensional Embedding Projections & Cosine Similarity', type: 'Lecture Video', duration: '40m' },
        { id: 'L3-2', title: 'Hierarchical Navigable Small World (HNSW) Indexing', type: 'Code Walkthrough', duration: '50m' },
        { id: 'L3-3', title: 'Building a Low-Latency Hybrid Search Engine with Reciprocal Rank Fusion', type: 'Hands-on Project', duration: '60m' }
      ]
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 'REV-1',
      studentName: 'Aarav Patel',
      rating: 5,
      date: '2026-09-29',
      courseName: 'Mathematics (Class 8-A)',
      comment: 'Prof. Roy’s explanation of quadratic factorization made middle-term splitting intuitive! The video breakdowns helped tremendously.',
      reply: 'Glad it helped, Aarav! Keep practicing the Level 3 Olympiad set.'
    },
    {
      id: 'REV-2',
      studentName: 'Marcus Chen',
      rating: 5,
      date: '2026-09-27',
      courseName: 'Physics (Class 9-B)',
      comment: 'The ray optics simulation and laboratory demonstrations were crystal clear. Scored 92% on the Snell’s Law assignment!',
      reply: ''
    }
  ]);

  const [newReplyText, setNewReplyText] = useState<{ [key: string]: string }>({});
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const toggleExpand = (id: string) => {
    setModules(prev =>
      prev.map(m => (m.id === id ? { ...m, expanded: !m.expanded } : m))
    );
  };

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    const newMod = {
      id: `MOD-${modules.length + 1}`,
      title: newModuleTitle.trim(),
      expanded: true,
      lessons: []
    };

    setModules([...modules, newMod]);
    showToast(`Added module: ${newModuleTitle}`);
    setNewModuleTitle('');
    setShowAddModuleModal(false);
  };

  const handlePostReply = (revId: string) => {
    const text = newReplyText[revId];
    if (!text || !text.trim()) return;

    setReviews(prev =>
      prev.map(r => (r.id === revId ? { ...r, reply: text.trim() } : r))
    );

    setNewReplyText(prev => ({ ...prev, [revId]: '' }));
    showToast('Reply posted to student course review.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Course Curriculum Builder & Student Reviews Studio</span>
          </h2>
          <p className="text-slate-500">
            Structure academic modules, sequence video lectures and practicums, and engage with student feedback.
          </p>
        </div>

        <button
          onClick={() => setShowAddModuleModal(true)}
          className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Course Module</span>
        </button>
      </div>

      {/* Curriculum Modules Accordion */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Curriculum Architecture & Sequence</h3>
            <p className="text-slate-400 text-[11px]">3 Core Modules • 11 Interactive Lessons & Practicums</p>
          </div>
          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Active in LMS
          </span>
        </div>

        <div className="space-y-3">
          {modules.map(mod => (
            <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleExpand(mod.id)}
                className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#3d5ee1] text-white flex items-center justify-center font-bold text-[11px]">
                    {mod.id.replace('MOD-', 'M')}
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{mod.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({mod.lessons.length} Lessons)</span>
                </div>
                {mod.expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>

              {mod.expanded && (
                <div className="p-3 bg-white divide-y divide-slate-100">
                  {mod.lessons.length === 0 ? (
                    <div className="py-4 text-center text-slate-400 italic">No lessons added to this module yet.</div>
                  ) : (
                    mod.lessons.map(lesson => (
                      <div key={lesson.id} className="py-2.5 px-3 flex items-center justify-between hover:bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                            {lesson.id}
                          </span>
                          <span className="font-semibold text-slate-800">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                            {lesson.type}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">{lesson.duration}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Student Course Reviews & Feedback Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Student Course Feedback & Reviews</span>
            </h3>
            <p className="text-slate-400 text-[11px]">Direct ratings and qualitative feedback submitted by enrolled learners.</p>
          </div>
          <span className="font-mono font-bold text-slate-900 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-lg">
            ⭐ 4.9 / 5.0 (38 Reviews)
          </span>
        </div>

        <div className="space-y-4">
          {reviews.map(rev => (
            <div key={rev.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-slate-900">{rev.studentName}</div>
                  <span className="text-slate-400">•</span>
                  <span className="text-[#3d5ee1] font-semibold">{rev.courseName}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                  <span className="text-slate-400 text-[10px] font-mono ml-2">{rev.date}</span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed italic">"{rev.comment}"</p>

              {rev.reply ? (
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                  <div className="font-bold text-[#3d5ee1] shrink-0">Instructor Reply:</div>
                  <div className="text-slate-600">{rev.reply}</div>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Write an encouraging response to this student..."
                    value={newReplyText[rev.id] || ''}
                    onChange={e => setNewReplyText({ ...newReplyText, [rev.id]: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-[#3d5ee1]"
                  />
                  <button
                    onClick={() => handlePostReply(rev.id)}
                    className="px-3 py-1.5 bg-[#3d5ee1] text-white font-bold rounded-lg hover:bg-[#324ecc] transition-colors"
                  >
                    Post Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Module Modal */}
      {showAddModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add New Curriculum Module</h3>
            <form onSubmit={handleAddModule} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Module Title & Subject Scope</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Module 4: Organic Carbon Chains & Nomenclature"
                  value={newModuleTitle}
                  onChange={e => setNewModuleTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Create Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

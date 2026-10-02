import React, { useState } from 'react';
import {
  BookMarked,
  Plus,
  Search,
  Eye,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Printer,
  X,
  Sparkles,
  Layers,
  Wand2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherLessonsView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();
  const [filterClass, setFilterClass] = useState<string>('All');
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const [lessons, setLessons] = useState([
    {
      id: 'LES-101',
      title: 'Solving Linear Equations in One Variable (Exercise 2.3)',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      unit: 'Unit 1: Rational Numbers & Linear Equations',
      duration: '45 Minutes',
      status: 'Today’s Lesson',
      pedagogy: 'Guided Discovery & Problem Solving',
      objectives: [
        'Understand balance method for transposition of algebraic terms',
        'Solve equations with variables on both sides (e.g. 5x + 9 = 5 + 3x)',
        'Check solution validity by LHS = RHS substitution'
      ],
      timeline: [
        { time: '00:00 - 00:08', activity: 'Warmup & Hook: Number riddle balancing scale demonstration' },
        { time: '00:08 - 00:22', activity: 'Direct Instruction: Transposition rules & step-by-step board work' },
        { time: '00:22 - 00:35', activity: 'Paired Student Practicum: Textbook Exercise 2.3 Questions 1 to 5' },
        { time: '00:35 - 00:45', activity: 'Formative Exit Ticket: One quick equation to solve on index card' }
      ],
      boardPlan: 'Left: Definitions & Rules | Center: Exemplar Solved Problems | Right: Student Turn Problems',
      homework: 'Exercise 2.3 Questions 6 to 10 in Homework notebook.'
    },
    {
      id: 'LES-102',
      title: 'Laws of Reflection & Ray Diagrams on Spherical Mirrors',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      unit: 'Unit 3: Gravitation & Optics',
      duration: '45 Minutes',
      status: 'In Progress',
      pedagogy: 'Laboratory Demonstration & Ray Construction',
      objectives: [
        'State Snell’s Law and First & Second Laws of Reflection',
        'Draw accurate ray diagrams for concave mirror with object at C and F',
        'Identify nature of image: Real, Inverted, Magnified vs Diminished'
      ],
      timeline: [
        { time: '00:00 - 00:10', activity: 'Laser pointer ray demonstration using optical bench smoke chamber' },
        { time: '00:10 - 00:25', activity: 'Step-by-step compass and ruler ray diagram construction' },
        { time: '00:25 - 00:40', activity: 'Student Lab Notebook drawing & focal length calculation' },
        { time: '00:40 - 00:45', activity: 'Recap table of object positions vs image characteristics' }
      ],
      boardPlan: 'Center: Concave Mirror Geometry (P, F, C). Top-right: Sign Convention (Cartesian)',
      homework: 'Complete Ray Diagram Chart #2 for object between P and F.'
    },
    {
      id: 'LES-103',
      title: 'Acid-Base Neutralization & Titration Experiment Lab',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      unit: 'Unit 2: Acids, Bases & Salts',
      duration: '60 Minutes (Double Period)',
      status: 'Upcoming',
      pedagogy: 'Wet Chemistry Laboratory Practicum',
      objectives: [
        'Determine endpoint of HCl + NaOH neutralization using phenolphthalein',
        'Record concordant burette readings within 0.1 mL precision',
        'Calculate molarity using M1V1 = M2V2'
      ],
      timeline: [
        { time: '00:00 - 00:10', activity: 'Lab Safety Briefing: Goggles, pipetting bulbs, acid handling' },
        { time: '00:10 - 00:40', activity: 'Individual Titration trials until 2 concordant readings obtained' },
        { time: '00:40 - 00:55', activity: 'Tabulation of readings and stoichiometric calculations' },
        { time: '00:55 - 00:60', activity: 'Chemical waste disposal & glassware cleanup' }
      ],
      boardPlan: 'Reagents: 0.1M HCl in burette, 0.1M NaOH in conical flask. Indicator: Phenolphthalein (Pink to Colorless)',
      homework: 'Submit Lab Report #4 with observation tables and calculation steps.'
    }
  ]);

  // Create Lesson Form State
  const [newLessonData, setNewLessonData] = useState({
    title: '',
    subject: 'Mathematics',
    classGrade: 'Class 8-A',
    unit: 'Unit 1: Fundamentals',
    duration: '45 Minutes',
    pedagogy: 'Lecture & Discussion',
    objective: '',
    homework: ''
  });

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonData.title.trim()) return;

    const newObj = {
      id: `LES-${Math.floor(100 + Math.random() * 900)}`,
      title: newLessonData.title,
      subject: newLessonData.subject,
      classGrade: newLessonData.classGrade,
      unit: newLessonData.unit,
      duration: newLessonData.duration,
      status: 'Upcoming',
      pedagogy: newLessonData.pedagogy,
      objectives: [newLessonData.objective || 'Master primary concepts and demonstrate problem-solving competency.'],
      timeline: [
        { time: '00:00 - 00:10', activity: 'Introduction, hook and prerequisite check' },
        { time: '00:10 - 00:30', activity: 'Core conceptual delivery & board illustrations' },
        { time: '00:30 - 00:45', activity: 'Guided practice, questions and homework briefing' }
      ],
      boardPlan: 'Left: Core Definitions | Center: Workings | Right: Action Summary',
      homework: newLessonData.homework || 'Review chapter notes and complete assigned exercises.'
    };

    setLessons(prev => [newObj, ...prev]);

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Created Lesson Plan: ${newLessonData.title}`,
      details: `${newLessonData.subject} (${newLessonData.classGrade})`,
      category: 'academic'
    });

    showToast(`Lesson plan "${newLessonData.title}" created successfully.`);
    setShowCreateModal(false);
    setNewLessonData({
      title: '',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      unit: 'Unit 1: Fundamentals',
      duration: '45 Minutes',
      pedagogy: 'Lecture & Discussion',
      objective: '',
      homework: ''
    });
  };

  const filteredLessons = lessons.filter(
    l => filterClass === 'All' || l.classGrade.startsWith(filterClass)
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-150 text-xs">
      {/* Top Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#3d5ee1]" />
            <span>Lessons Repository & Instructional Blueprints</span>
          </h2>
          <p className="text-slate-500">
            Structured period timelines, learning outcomes, board plans, and homework assignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl font-semibold text-slate-600">
            {['All', 'Class 8', 'Class 9', 'Class 10'].map(cls => (
              <button
                key={cls}
                onClick={() => setFilterClass(cls)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterClass === cls ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Lesson Plan</span>
          </button>
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredLessons.map(lesson => (
          <div
            key={lesson.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">
                  {lesson.id} • {lesson.classGrade}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    lesson.status === "Today’s Lesson"
                      ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                      : lesson.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {lesson.status}
                </span>
              </div>

              <div className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                {lesson.title}
              </div>

              <div className="text-[11px] text-[#3d5ee1] font-semibold">{lesson.subject}</div>
              <div className="text-[11px] text-slate-400 font-mono">Duration: {lesson.duration}</div>

              <p className="text-slate-600 line-clamp-2 leading-relaxed">
                {lesson.objectives[0]}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-mono">{lesson.pedagogy}</span>
              <button
                onClick={() => setSelectedLesson(lesson)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-[#3d5ee1] hover:text-white rounded-xl font-bold transition-colors flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>View Plan</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Details Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded font-bold text-[#3d5ee1]">
                  {selectedLesson.subject} • {selectedLesson.classGrade}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedLesson.title}</h3>
              </div>
              <button onClick={() => setSelectedLesson(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-700">
                <div>Unit: <strong>{selectedLesson.unit}</strong></div>
                <div>Duration: <strong>{selectedLesson.duration}</strong></div>
                <div>Method: <strong>{selectedLesson.pedagogy}</strong></div>
                <div>Status: <strong className="text-[#3d5ee1]">{selectedLesson.status}</strong></div>
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Learning Objectives (Bloom's Taxonomy)</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {selectedLesson.objectives.map((obj: string, i: number) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Instructional Timeline */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Period Instructional Timeline (Minute Breakdown)</h4>
                <div className="space-y-2 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {selectedLesson.timeline.map((item: any, idx: number) => (
                    <div key={idx} className="p-2.5 flex items-start gap-3 bg-white">
                      <span className="font-mono font-bold text-[#3d5ee1] shrink-0 w-24">{item.time}</span>
                      <span className="text-slate-700 font-medium">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blackboard Plan */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Blackboard / Whiteboard Organization Plan</h4>
                <p className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl leading-relaxed">
                  {selectedLesson.boardPlan}
                </p>
              </div>

              {/* Homework */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium">
                <strong>Homework & Exit Ticket:</strong> {selectedLesson.homework}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Lesson Plan</span>
              </button>
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-semibold"
              >
                Close Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Lesson Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New Instructional Lesson Plan</h3>
            <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lesson Title / Topic <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Newton’s Second Law & Momentum Calculations"
                  value={newLessonData.title}
                  onChange={e => setNewLessonData({ ...newLessonData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newLessonData.subject}
                    onChange={e => setNewLessonData({ ...newLessonData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science & AI">Computer Science & AI</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class</label>
                  <select
                    value={newLessonData.classGrade}
                    onChange={e => setNewLessonData({ ...newLessonData, classGrade: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Class 8-A">Class 8-A</option>
                    <option value="Class 8-B">Class 8-B</option>
                    <option value="Class 9-B">Class 9-B</option>
                    <option value="Class 10-A">Class 10-A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pedagogical Method</label>
                <input
                  type="text"
                  value={newLessonData.pedagogy}
                  onChange={e => setNewLessonData({ ...newLessonData, pedagogy: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Learning Objective</label>
                <textarea
                  rows={2}
                  placeholder="What will students be able to do by the end of 45 minutes?"
                  value={newLessonData.objective}
                  onChange={e => setNewLessonData({ ...newLessonData, objective: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Homework / Exit Ticket Task</label>
                <input
                  type="text"
                  placeholder="Assigned exercises or reflective exit ticket"
                  value={newLessonData.homework}
                  onChange={e => setNewLessonData({ ...newLessonData, homework: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Save Lesson Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

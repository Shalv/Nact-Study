import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Plus,
  Save,
  Printer,
  ChevronRight,
  Sparkles,
  BarChart2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherSubjectsView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [subjects, setSubjects] = useState([
    {
      id: 'SUB-101',
      name: 'Mathematics',
      classGrade: 'Class 8-A & 8-B',
      board: 'CBSE Curriculum 2026-27',
      code: 'MATH-041',
      totalPeriods: 120,
      completedPeriods: 86,
      progress: 72,
      units: [
        {
          id: 'U1',
          name: 'Unit 1: Rational Numbers & Linear Equations',
          weightage: '20 Marks',
          status: 'Completed',
          topics: [
            { name: 'Properties of Rational Numbers', status: 'Completed' },
            { name: 'Solving Equations with Linear Expressions', status: 'Completed' },
            { name: 'Application Word Problems (Age & Speed)', status: 'Completed' },
          ]
        },
        {
          id: 'U2',
          name: 'Unit 2: Understanding Quadrilaterals & Geometry',
          weightage: '15 Marks',
          status: 'Completed',
          topics: [
            { name: 'Polygons & Interior Angle Sum Theorem', status: 'Completed' },
            { name: 'Properties of Parallelogram & Rhombus', status: 'Completed' },
          ]
        },
        {
          id: 'U3',
          name: 'Unit 3: Algebraic Expressions & Factorisation',
          weightage: '25 Marks',
          status: 'In Progress',
          topics: [
            { name: 'Standard Algebraic Identities', status: 'Completed' },
            { name: 'Splitting the Middle Term', status: 'In Progress' },
            { name: 'Division of Algebraic Polynomials', status: 'Scheduled' },
          ]
        },
        {
          id: 'U4',
          name: 'Unit 4: Mensuration & Surface Areas',
          weightage: '20 Marks',
          status: 'Scheduled',
          topics: [
            { name: 'Area of Trapezium & General Quadrilateral', status: 'Scheduled' },
            { name: 'Volume of Cylinder, Cone & Sphere', status: 'Scheduled' },
          ]
        }
      ]
    },
    {
      id: 'SUB-102',
      name: 'Physics (Natural Sciences)',
      classGrade: 'Class 9-B',
      board: 'CBSE Secondary Board',
      code: 'SCI-086',
      totalPeriods: 100,
      completedPeriods: 65,
      progress: 65,
      units: [
        {
          id: 'PU1',
          name: 'Unit 1: Motion, Velocity & Acceleration',
          weightage: '15 Marks',
          status: 'Completed',
          topics: [
            { name: 'Distance vs Displacement Vector Kinematics', status: 'Completed' },
            { name: 'Equations of Uniformly Accelerated Motion', status: 'Completed' },
          ]
        },
        {
          id: 'PU2',
          name: 'Unit 2: Force & Laws of Motion',
          weightage: '20 Marks',
          status: 'Completed',
          topics: [
            { name: 'Newton’s First Law & Inertia', status: 'Completed' },
            { name: 'Second Law F = ma & Momentum Conservation', status: 'Completed' },
          ]
        },
        {
          id: 'PU3',
          name: 'Unit 3: Gravitation & Free Fall',
          weightage: '15 Marks',
          status: 'In Progress',
          topics: [
            { name: 'Universal Law of Gravitation & Derivation', status: 'Completed' },
            { name: 'Acceleration Due to Gravity (g) Calculations', status: 'In Progress' },
            { name: 'Archimedes Principle & Relative Density', status: 'Scheduled' },
          ]
        },
        {
          id: 'PU4',
          name: 'Unit 4: Work, Energy & Sound Waves',
          weightage: '20 Marks',
          status: 'Scheduled',
          topics: [
            { name: 'Kinetic & Potential Energy Transformations', status: 'Scheduled' },
            { name: 'Propagation of Sound & Echo Verification', status: 'Scheduled' },
          ]
        }
      ]
    },
    {
      id: 'SUB-103',
      name: 'Chemistry (Chemical Sciences)',
      classGrade: 'Class 10-A',
      board: 'CBSE Senior Secondary Board',
      code: 'CHEM-052',
      totalPeriods: 90,
      completedPeriods: 60,
      progress: 67,
      units: [
        {
          id: 'CU1',
          name: 'Unit 1: Chemical Reactions & Stoichiometry',
          weightage: '15 Marks',
          status: 'Completed',
          topics: [
            { name: 'Balancing Chemical Equations & Redox', status: 'Completed' },
            { name: 'Types of Reactions (Combination, Decomposition)', status: 'Completed' },
          ]
        },
        {
          id: 'CU2',
          name: 'Unit 2: Acids, Bases & Salts Practicum',
          weightage: '20 Marks',
          status: 'In Progress',
          topics: [
            { name: 'pH Scale & Universal Indicators Lab', status: 'Completed' },
            { name: 'Neutralization & Chlor-Alkali Process', status: 'In Progress' },
            { name: 'Plaster of Paris & Bleaching Powder Prep', status: 'Scheduled' },
          ]
        },
        {
          id: 'CU3',
          name: 'Unit 3: Carbon & Its Compounds',
          weightage: '25 Marks',
          status: 'Scheduled',
          topics: [
            { name: 'Covalent Bonding & Versatile Nature of Carbon', status: 'Scheduled' },
            { name: 'Homologous Series & IUPAC Nomenclature', status: 'Scheduled' },
          ]
        }
      ]
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(selectedSubject.units[0].id);

  const toggleTopicStatus = (unitId: string, topicIndex: number) => {
    setSubjects(prev =>
      prev.map(subj => {
        if (subj.id !== selectedSubject.id) return subj;
        const updatedUnits = subj.units.map(u => {
          if (u.id !== unitId) return u;
          const updatedTopics = u.topics.map((t, idx) => {
            if (idx !== topicIndex) return t;
            const nextStatus =
              t.status === 'Completed' ? 'Scheduled' : t.status === 'Scheduled' ? 'In Progress' : 'Completed';
            return { ...t, status: nextStatus };
          });
          return { ...u, topics: updatedTopics };
        });
        return { ...subj, units: updatedUnits };
      })
    );

    // Sync selected subject
    setTimeout(() => {
      setSelectedSubject((prev: any) => {
        const found = subjects.find(s => s.id === prev.id);
        return found || prev;
      });
    }, 50);

    showToast('Topic status updated.');
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    setSubjects(prev =>
      prev.map(subj => {
        if (subj.id !== selectedSubject.id) return subj;
        const updatedUnits = subj.units.map(u => {
          if (u.id !== selectedUnitId) return u;
          return {
            ...u,
            topics: [...u.topics, { name: newTopicName.trim(), status: 'Scheduled' }]
          };
        });
        return { ...subj, units: updatedUnits };
      })
    );

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Added Syllabus Topic to ${selectedSubject.name}`,
      details: newTopicName.trim(),
      category: 'academic'
    });

    showToast(`Added topic "${newTopicName}" to syllabus.`);
    setNewTopicName('');
    setShowAddTopicModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      {/* Header and Subject Selectors */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#3d5ee1]" />
              <span>Subjects & Academic Syllabus Tracker</span>
            </h2>
            <p className="text-slate-500">
              Track chapter completion progress, theory/practical breakdown, and curriculum milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Scheme of Work</span>
            </button>
            <button
              onClick={() => setShowAddTopicModal(true)}
              className="px-3.5 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Topic / Chapter</span>
            </button>
          </div>
        </div>

        {/* Subject Pill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {subjects.map(subj => {
            const isSelected = selectedSubject.id === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#3d5ee1] bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[10px] text-slate-400">{subj.code}</span>
                  <span className="font-bold text-[11px] text-[#3d5ee1]">{subj.progress}% Completed</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">{subj.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{subj.classGrade}</div>

                <div className="mt-3 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#3d5ee1] h-full rounded-full transition-all duration-300"
                    style={{ width: `${subj.progress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Detailed Syllabus Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {selectedSubject.board} • {selectedSubject.code}
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {selectedSubject.name} — Detailed Units & Learning Milestones
            </h3>
            <div className="text-slate-500 mt-0.5">
              Target Periods: <strong>{selectedSubject.totalPeriods}</strong> • Completed:{' '}
              <strong>{selectedSubject.completedPeriods} Periods</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold">
              ✓ On Track for Mid-Term Exams
            </span>
          </div>
        </div>

        {/* Units Accordion / List */}
        <div className="space-y-4">
          {selectedSubject.units.map(unit => (
            <div key={unit.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{unit.name}</div>
                  <div className="text-slate-500 text-[11px]">Exam Weightage: {unit.weightage}</div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    unit.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : unit.status === 'In Progress'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {unit.status}
                </span>
              </div>

              <div className="p-3 divide-y divide-slate-100 bg-white">
                {unit.topics.map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className="py-2.5 px-3 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleTopicStatus(unit.id, tIdx)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          topic.status === 'Completed'
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : topic.status === 'In Progress'
                            ? 'bg-amber-500 border-amber-500 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                        title="Click to toggle status"
                      >
                        {topic.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {topic.status === 'In Progress' && <Clock className="w-3.5 h-3.5" />}
                      </button>
                      <span
                        className={`font-medium ${
                          topic.status === 'Completed'
                            ? 'text-slate-800 line-through text-slate-400'
                            : topic.status === 'In Progress'
                            ? 'text-indigo-900 font-semibold'
                            : 'text-slate-700'
                        }`}
                      >
                        {topic.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          topic.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : topic.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {topic.status}
                      </span>
                      <button
                        onClick={() => toggleTopicStatus(unit.id, tIdx)}
                        className="text-slate-400 hover:text-slate-700 text-[11px] underline"
                      >
                        Change Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Topic Modal */}
      {showAddTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add New Topic to Syllabus</h3>
            <form onSubmit={handleAddTopic} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Unit / Chapter</label>
                <select
                  value={selectedUnitId}
                  onChange={e => setSelectedUnitId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
                >
                  {selectedSubject.units.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Topic Title / Sub-Chapter Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Socratic Proof of Angle Bisectors"
                  value={newTopicName}
                  onChange={e => setNewTopicName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Add Topic to Syllabus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

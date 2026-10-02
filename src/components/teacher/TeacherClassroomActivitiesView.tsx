import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  Users2,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  MessageSquare,
  HelpCircle,
  Play,
  RotateCcw,
  Download,
  Printer,
  Trash2,
  Edit2,
  Eye,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface ClassroomActivity {
  id: string;
  title: string;
  type: 'Group Activity' | 'Project' | 'Presentation' | 'Quiz' | 'Discussion' | 'Practical Lab';
  subject: string;
  classGrade: string;
  dueDate: string;
  maxScore: number;
  learningOutcome: string;
  instructions: string;
  status: 'Upcoming' | 'In Progress' | 'Under Evaluation' | 'Completed';
  totalStudents: number;
  evaluatedCount: number;
  groups?: { name: string; members: string[]; score?: number; remarks?: string }[];
}

export const TeacherClassroomActivitiesView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [activities, setActivities] = useState<ClassroomActivity[]>([
    {
      id: 'ACT-101',
      title: 'Solar System Planetary Orbit Simulation Project',
      type: 'Group Activity',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      dueDate: '2026-10-12',
      maxScore: 25,
      learningOutcome: 'Apply Kepler laws of planetary motion and gravitational force vectors.',
      instructions: 'Form teams of 4. Model planetary orbits using scale drawings or 3D styrofoam models.',
      status: 'In Progress',
      totalStudents: 28,
      evaluatedCount: 16,
      groups: [
        { name: 'Group Alpha', members: ['Marcus Chen', 'Sneha Kulkarni', 'Aditya Birla', 'Elena Rostova'], score: 24, remarks: 'Superb scale accuracy and orbital eccentricity calculations.' },
        { name: 'Group Beta', members: ['Aarav Patel', 'Priya Sharma', 'Rahul Sen', 'Kavita Nair'], score: undefined, remarks: '' }
      ]
    },
    {
      id: 'ACT-102',
      title: 'Algebraic Identities Rapid Fire Quiz Tournament',
      type: 'Quiz',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      dueDate: '2026-10-06',
      maxScore: 20,
      learningOutcome: 'Instant mental factorization using (a+b)^2, (a-b)^2, and (a^2-b^2).',
      instructions: 'Individual lightning round buzzer test in 4 heats with final championship round.',
      status: 'Upcoming',
      totalStudents: 32,
      evaluatedCount: 0
    },
    {
      id: 'ACT-103',
      title: 'Acid-Base Indicator DIY Lab with Red Cabbage Extract',
      type: 'Practical Lab',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      dueDate: '2026-10-08',
      maxScore: 15,
      learningOutcome: 'Understand natural pH indicators and household substance classification.',
      instructions: 'Bring lemon juice, baking soda, vinegar, and soap solution to test with prepared cabbage water.',
      status: 'In Progress',
      totalStudents: 26,
      evaluatedCount: 10
    },
    {
      id: 'ACT-104',
      title: 'Socratic Circle: Ethics of Artificial General Intelligence',
      type: 'Discussion',
      subject: 'Computer Science & AI',
      classGrade: 'Class 10-A',
      dueDate: '2026-09-29',
      maxScore: 20,
      learningOutcome: 'Articulate ethical dilemmas, bias in algorithms, and societal impact.',
      instructions: 'Outer circle observes argumentation validity while inner circle deliberates policy proposals.',
      status: 'Completed',
      totalStudents: 24,
      evaluatedCount: 24
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ClassroomActivity | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);

  // New Activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ClassroomActivity['type']>('Group Activity');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClassGrade, setNewClassGrade] = useState('Class 8-A');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxScore, setNewMaxScore] = useState(25);
  const [newOutcome, setNewOutcome] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  // Evaluation state
  const [evalGroupName, setEvalGroupName] = useState('');
  const [evalScore, setEvalScore] = useState<number>(20);
  const [evalRemarks, setEvalRemarks] = useState('');

  const filteredActivities = activities.filter(act => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || act.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || act.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter an activity title.', 'warning');
      return;
    }

    const created: ClassroomActivity = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      type: newType,
      subject: newSubject,
      classGrade: newClassGrade,
      dueDate: newDueDate || '2026-10-15',
      maxScore: Number(newMaxScore) || 20,
      learningOutcome: newOutcome || 'Demonstrates subject proficiency.',
      instructions: newInstructions || 'Follow classroom rubric guidelines.',
      status: 'Upcoming',
      totalStudents: newClassGrade === 'Class 8-A' ? 32 : 28,
      evaluatedCount: 0,
      groups: newType === 'Group Activity' ? [
        { name: 'Group 1', members: ['Aarav Patel', 'Sneha Kulkarni'] },
        { name: 'Group 2', members: ['Marcus Chen', 'Elena Rostova'] }
      ] : undefined
    };

    setActivities(prev => [created, ...prev]);
    showToast(`Classroom activity "${created.title}" created successfully!`);
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Created Activity: ${created.title}`,
      details: `${created.type} for ${created.classGrade} (${created.subject})`,
      category: 'academic'
    });

    // Reset form
    setNewTitle('');
    setNewOutcome('');
    setNewInstructions('');
    setShowCreateModal(false);
  };

  const handleDeleteActivity = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete activity "${title}"?`)) {
      setActivities(prev => prev.filter(a => a.id !== id));
      if (selectedActivity?.id === id) setSelectedActivity(null);
      showToast(`Activity "${title}" deleted.`);
    }
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;

    setActivities(prev =>
      prev.map(act => {
        if (act.id !== selectedActivity.id) return act;
        const updatedGroups = (act.groups || []).map(g => {
          if (g.name === evalGroupName) {
            return { ...g, score: evalScore, remarks: evalRemarks };
          }
          return g;
        });
        const evalCount = updatedGroups.filter(g => g.score !== undefined).length;
        return {
          ...act,
          groups: updatedGroups,
          evaluatedCount: Math.min(act.totalStudents, evalCount * 4),
          status: evalCount === updatedGroups.length ? 'Completed' : 'Under Evaluation'
        };
      })
    );

    showToast(`Evaluation saved for ${evalGroupName} (${evalScore}/${selectedActivity.maxScore} marks).`);
    setShowEvaluationModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Classroom Activities & Interactive Learning
              </h2>
              <p className="text-xs text-slate-500">
                Plan and evaluate group projects, presentations, quizzes, lab practicals, and peer discussions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Overview</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Activity</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by activity title, subject or class..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Group Activity">Group Activity</option>
              <option value="Project">Project</option>
              <option value="Presentation">Presentation</option>
              <option value="Quiz">Quiz</option>
              <option value="Discussion">Discussion</option>
              <option value="Practical Lab">Practical Lab</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Evaluation">Under Evaluation</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {(searchQuery || selectedType !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedStatus('All');
              }}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map(activity => {
          const evalPercent = Math.round((activity.evaluatedCount / activity.totalStudents) * 100) || 0;
          return (
            <div
              key={activity.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      activity.type === 'Group Activity'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : activity.type === 'Practical Lab'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : activity.type === 'Quiz'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {activity.type}
                  </span>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      activity.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activity.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {activity.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <span>{activity.subject}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-700">{activity.classGrade}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 line-clamp-2">
                  <span className="font-semibold text-slate-800">Outcome:</span> {activity.learningOutcome}
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Evaluated: {activity.evaluatedCount}/{activity.totalStudents}</span>
                    <span className="font-bold text-slate-700">{evalPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3d5ee1] rounded-full transition-all"
                      style={{ width: `${evalPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {activity.dueDate}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {activity.groups && activity.groups.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedActivity(activity);
                        setEvalGroupName(activity.groups![0].name);
                        setEvalScore(activity.groups![0].score || 20);
                        setEvalRemarks(activity.groups![0].remarks || '');
                        setShowEvaluationModal(true);
                      }}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Award className="w-3 h-3" />
                      <span>Evaluate</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteActivity(activity.id, activity.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Activity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
          <p className="font-medium text-slate-600">No classroom activities found matching criteria.</p>
          <p className="text-xs">Create an activity or reset search filters.</p>
        </div>
      )}

      {/* CREATE ACTIVITY MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">Create New Classroom Activity</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Photosynthesis Chlorophyll Pigment Experiment"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Activity Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  >
                    <option value="Group Activity">Group Activity</option>
                    <option value="Project">Project</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Discussion">Discussion</option>
                    <option value="Practical Lab">Practical Lab</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Target Cohort</label>
                  <select
                    value={newClassGrade}
                    onChange={e => setNewClassGrade(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  >
                    <option value="Class 8-A">Class 8-A</option>
                    <option value="Class 8-B">Class 8-B</option>
                    <option value="Class 9-B">Class 9-B</option>
                    <option value="Class 10-A">Class 10-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Subject</label>
                  <select
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science & AI">Computer Science & AI</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Max Score</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={newMaxScore}
                    onChange={e => setNewMaxScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Primary Learning Outcome</label>
                <input
                  type="text"
                  placeholder="e.g., Formulates scientific hypothesis and records accurate data."
                  value={newOutcome}
                  onChange={e => setNewOutcome(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Instructions & Guidelines</label>
                <textarea
                  rows={3}
                  placeholder="Detail instructions for students/teams..."
                  value={newInstructions}
                  onChange={e => setNewInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl font-semibold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Activity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVALUATION MODAL */}
      {showEvaluationModal && selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Evaluate Activity</h3>
                  <div className="text-[11px] text-slate-500 truncate">{selectedActivity.title}</div>
                </div>
              </div>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Select Team / Student</label>
                <select
                  value={evalGroupName}
                  onChange={e => {
                    setEvalGroupName(e.target.value);
                    const grp = selectedActivity.groups?.find(g => g.name === e.target.value);
                    if (grp) {
                      setEvalScore(grp.score || 20);
                      setEvalRemarks(grp.remarks || '');
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                >
                  {selectedActivity.groups?.map(g => (
                    <option key={g.name} value={g.name}>
                      {g.name} ({g.members.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Marks Awarded (out of {selectedActivity.maxScore}) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max={selectedActivity.maxScore}
                  value={evalScore}
                  onChange={e => setEvalScore(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Faculty Remarks & Feedback</label>
                <textarea
                  rows={3}
                  placeholder="Provide constructive feedback on creativity, teamwork, and analysis..."
                  value={evalRemarks}
                  onChange={e => setEvalRemarks(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl font-semibold text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

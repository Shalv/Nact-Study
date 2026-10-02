import React, { useState } from 'react';
import {
  ListTodo,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  FileText,
  ExternalLink,
  Award,
  Send,
  X,
  Download,
  Calendar,
  Sparkles,
  Paperclip,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  classGrade: string;
  deadline: string;
  maxMarks: number;
  description: string;
  attachmentUrl?: string;
  totalAssigned: number;
  submittedCount: number;
  evaluatedCount: number;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentName: string;
  rollNo: string;
  submittedAt: string;
  status: 'Submitted' | 'Graded' | 'Returned for Correction' | 'Late';
  submissionContent: string;
  score?: number;
  feedback?: string;
}

export const TeacherAssignmentsView: React.FC = () => {
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'assignments' | 'create' | 'review'>('assignments');
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);

  // Assignments State
  const [assignments, setAssignments] = useState<AssignmentItem[]>([
    {
      id: 'asg-101',
      title: 'Linear Equations & Real-world Word Problems Exercise 2.4',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      deadline: '2026-10-06',
      maxMarks: 25,
      description: 'Solve questions 1 through 12 from textbook page 38. Show step-by-step verification for each linear equation.',
      attachmentUrl: 'https://nactstudy.edu/assignments/math-linear-eq-8a.pdf',
      totalAssigned: 32,
      submittedCount: 29,
      evaluatedCount: 26
    },
    {
      id: 'asg-102',
      title: 'Spherical Mirrors Ray Diagram & Focal Length Calculations',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      deadline: '2026-10-08',
      maxMarks: 20,
      description: 'Draw ray diagrams for concave and convex mirrors across 6 distinct object locations. Calculate magnification factor.',
      attachmentUrl: 'https://nactstudy.edu/assignments/physics-optics-raydiagrams.pdf',
      totalAssigned: 28,
      submittedCount: 24,
      evaluatedCount: 15
    },
    {
      id: 'asg-103',
      title: 'Transformer Attention Masking & CUDA Tensor Benchmark',
      subject: 'Artificial Intelligence',
      classGrade: 'Cohort Alpha',
      deadline: '2026-10-12',
      maxMarks: 50,
      description: 'Implement scaled dot-product attention in PyTorch with causal masking and report inference latency across sequence lengths.',
      attachmentUrl: 'https://github.com/nact-study/ai-transformer-starter',
      totalAssigned: 18,
      submittedCount: 16,
      evaluatedCount: 16
    }
  ]);

  // Submissions State
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: 'sub-1',
      assignmentId: 'asg-101',
      studentName: 'Aarav Patel',
      rollNo: '01',
      submittedAt: '2026-10-03 04:30 PM',
      status: 'Graded',
      submissionContent: 'Completed 12 questions in PDF format with cross-check step verifications for linear expressions.',
      score: 25,
      feedback: 'Flawless mathematical rigor! All steps clearly articulated.'
    },
    {
      id: 'sub-2',
      assignmentId: 'asg-101',
      studentName: 'Sneha Kulkarni',
      rollNo: '02',
      submittedAt: '2026-10-03 06:15 PM',
      status: 'Submitted',
      submissionContent: 'Questions 1-10 complete with calculations; Q11 and Q12 graph attached on page 4.',
      score: undefined,
      feedback: ''
    },
    {
      id: 'sub-3',
      assignmentId: 'asg-101',
      studentName: 'Rohan Sharma',
      rollNo: '05',
      submittedAt: '2026-10-04 09:20 AM',
      status: 'Returned for Correction',
      submissionContent: 'Submission missing denominator signs in Q4 & Q7.',
      score: 14,
      feedback: 'Please recheck transposition rules for negative integers in steps 3 and 4 and resubmit by tomorrow.'
    },
    {
      id: 'sub-4',
      assignmentId: 'asg-102',
      studentName: 'Kavita Menon',
      rollNo: '14',
      submittedAt: '2026-10-04 11:45 AM',
      status: 'Submitted',
      submissionContent: 'Optics ray diagram illustrations drawn to scale with compass and ruler.',
      score: undefined,
      feedback: ''
    }
  ]);

  // Form State for creating assignment
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClass, setNewClass] = useState('Class 8-A');
  const [newDeadline, setNewDeadline] = useState('2026-10-15');
  const [newMaxMarks, setNewMaxMarks] = useState(20);
  const [newDescription, setNewDescription] = useState('');
  const [newAttachment, setNewAttachment] = useState('');

  // Evaluation Form State
  const [evalScore, setEvalScore] = useState<number>(20);
  const [evalFeedback, setEvalFeedback] = useState<string>('');
  const [returnForCorrection, setReturnForCorrection] = useState<boolean>(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter an assignment title.', 'warning');
      return;
    }

    const newAssignment: AssignmentItem = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      classGrade: newClass,
      deadline: newDeadline,
      maxMarks: newMaxMarks,
      description: newDescription,
      attachmentUrl: newAttachment || undefined,
      totalAssigned: 30,
      submittedCount: 0,
      evaluatedCount: 0
    };

    setAssignments(prev => [newAssignment, ...prev]);
    setActiveTab('assignments');
    showToast(`Assignment "${newTitle}" created and broadcasted to ${newClass}!`);
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    const newStatus = returnForCorrection ? 'Returned for Correction' : 'Graded';

    setSubmissions(prev => prev.map(s => 
      s.id === selectedSubmission.id
        ? {
            ...s,
            status: newStatus,
            score: returnForCorrection ? evalScore : evalScore,
            feedback: evalFeedback
          }
        : s
    ));

    showToast(
      returnForCorrection 
        ? `Submission returned to ${selectedSubmission.studentName} for revision.`
        : `Graded ${selectedSubmission.studentName}: ${evalScore} marks awarded.`
    );
    setSelectedSubmission(null);
  };

  const currentSubmissions = selectedAssignment
    ? submissions.filter(s => s.assignmentId === selectedAssignment.id)
    : submissions;

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Assignments & Homework Desk</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Coursework Management & Submissions Desk</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
              {assignments.length} Active Tasks
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create tasks, receive student submissions, grade with qualitative rubrics, or return for correction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('assignments');
                setSelectedAssignment(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'assignments' && !selectedAssignment ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Assignments
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeTab === 'create' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: ASSIGNMENTS CARDS */}
      {activeTab === 'assignments' && !selectedAssignment && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map(asg => {
            const pendingToGrade = asg.submittedCount - asg.evaluatedCount;
            return (
              <div
                key={asg.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase">
                      {asg.classGrade}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Due {asg.deadline}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{asg.title}</h3>
                  <div className="text-xs text-[#3d5ee1] font-semibold">{asg.subject}</div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {asg.description}
                  </p>

                  {/* Submission Statistics Bar */}
                  <div className="pt-2 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Submissions Rate:</span>
                      <span className="font-bold text-slate-800 font-mono">
                        {asg.submittedCount}/{asg.totalAssigned} ({Math.round((asg.submittedCount / asg.totalAssigned) * 100)}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(asg.submittedCount / asg.totalAssigned) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    {pendingToGrade > 0 ? (
                      <strong className="text-amber-600 font-semibold">{pendingToGrade} to evaluate</strong>
                    ) : (
                      <span className="text-emerald-600 font-semibold">All Evaluated</span>
                    )}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedAssignment(asg);
                    }}
                    className="px-3 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Submissions Desk</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: SUBMISSIONS DESK FOR SELECTED ASSIGNMENT */}
      {selectedAssignment && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1"
              >
                ← Back to All Assignments
              </button>
              <h2 className="text-base font-bold text-slate-900">{selectedAssignment.title}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-3">
                <span>Class: <strong>{selectedAssignment.classGrade}</strong></span>
                <span>Max Marks: <strong>{selectedAssignment.maxMarks}</strong></span>
                <span>Deadline: <strong>{selectedAssignment.deadline}</strong></span>
              </div>
            </div>

            <button
              onClick={() => showToast('Submissions refreshed.')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Refresh Submissions
            </button>
          </div>

          {/* Submissions Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Student Deliverables & Evaluation</span>
              <span>{currentSubmissions.length} Submissions Received</span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Roll & Candidate</th>
                  <th className="p-3">Submitted On</th>
                  <th className="p-3">Deliverable / Work</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 font-mono">Score</th>
                  <th className="p-3 text-right">Evaluation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{sub.studentName}</div>
                      <div className="text-[10px] font-mono text-slate-400">Roll #{sub.rollNo}</div>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">
                      {sub.submittedAt}
                    </td>
                    <td className="p-3 max-w-xs truncate text-slate-700">
                      {sub.submissionContent}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          sub.status === 'Graded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'Returned for Correction'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-800">
                      {sub.score !== undefined ? `${sub.score}/${selectedAssignment.maxMarks}` : '—'}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedSubmission(sub);
                          setEvalScore(sub.score || selectedAssignment.maxMarks);
                          setEvalFeedback(sub.feedback || '');
                          setReturnForCorrection(sub.status === 'Returned for Correction');
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-[#3d5ee1] bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                      >
                        {sub.status === 'Graded' ? 'Edit Evaluation' : 'Evaluate & Feedback'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: CREATE ASSIGNMENT FORM */}
      {activeTab === 'create' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 max-w-3xl mx-auto">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Create & Assign New Coursework</h2>
            <p className="text-xs text-slate-500">Assign homework, lab deliverables, or reading prompts with attachments.</p>
          </div>

          <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Linear Equations Exercise 2.4"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Class Cohort</label>
                <select
                  value={newClass}
                  onChange={e => setNewClass(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 9-B">Class 9-B</option>
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="Cohort Alpha">Cohort Alpha</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Submission Deadline</label>
                <input
                  type="date"
                  required
                  value={newDeadline}
                  onChange={e => setNewDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Maximum Marks Weightage</label>
                <input
                  type="number"
                  required
                  value={newMaxMarks}
                  onChange={e => setNewMaxMarks(parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment / Reference URL</label>
                <input
                  type="url"
                  value={newAttachment}
                  onChange={e => setNewAttachment(e.target.value)}
                  placeholder="https://example.com/handout.pdf"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assignment Instructions & Description</label>
              <textarea
                rows={4}
                required
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Detailed guidance, required format, problem numbers, and submission criteria..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('assignments')}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-xs"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EVALUATION MODAL */}
      {selectedSubmission && selectedAssignment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Evaluate Student Deliverable</h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  {selectedSubmission.studentName} (Roll #{selectedSubmission.rollNo})
                </p>
              </div>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-800">Submitted Deliverable:</div>
                <p className="text-slate-600 leading-relaxed font-serif text-[11px] bg-white p-2.5 rounded border border-slate-200">
                  "{selectedSubmission.submissionContent}"
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Awarded Score (Max: {selectedAssignment.maxMarks})
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedAssignment.maxMarks}
                  required
                  value={evalScore}
                  onChange={e => setEvalScore(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Qualitative Feedback & Pedagogical Remarks
                </label>
                <textarea
                  rows={3}
                  required
                  value={evalFeedback}
                  onChange={e => setEvalFeedback(e.target.value)}
                  placeholder="Provide constructive suggestions and commendations..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              {/* Return for Correction Checkbox */}
              <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl border border-rose-200">
                <input
                  type="checkbox"
                  id="returnCorrection"
                  checked={returnForCorrection}
                  onChange={e => setReturnForCorrection(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <label htmlFor="returnCorrection" className="font-semibold text-rose-900 cursor-pointer">
                  Return to student for correction & resubmission
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-xs ${
                    returnForCorrection
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-[#3d5ee1] hover:bg-[#324ecc]'
                  }`}
                >
                  {returnForCorrection ? 'Return for Correction' : 'Submit Grade & Remarks'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

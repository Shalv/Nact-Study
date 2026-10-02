import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  Filter,
  Eye,
  Layers,
  Send,
  HelpCircle,
  X,
  Check,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface QuestionItem {
  id: string;
  type: 'MCQ' | 'True/False' | 'FillInBlank' | 'ShortAnswer' | 'LongAnswer' | 'CaseStudy';
  text: string;
  options?: string[];
  correctAnswer: string;
  marks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  chapter: string;
  rubricNotes?: string;
}

export interface QuestionPaper {
  id: string;
  title: string;
  examType: 'Unit Test' | 'Midterm' | 'Final Exam' | 'Pre-Board' | 'Diagnostic Quiz';
  subject: string;
  classGrade: string;
  durationMinutes: number;
  totalMarks: number;
  instructions: string[];
  status: 'Draft' | 'Submitted for Approval' | 'Approved' | 'Published';
  createdAt: string;
  blueprint: {
    sectionA_mcq: number; // count
    sectionB_short: number;
    sectionC_long: number;
    sectionD_caseStudy: number;
  };
  questions: QuestionItem[];
}

export const TeacherExamBuilderView: React.FC = () => {
  const { showToast, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'papers' | 'create-wizard' | 'preview-paper'>('papers');
  const [selectedPaper, setSelectedPaper] = useState<QuestionPaper | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Question Papers State
  const [papers, setPapers] = useState<QuestionPaper[]>([
    {
      id: 'qp-101',
      title: 'Mathematics Midterm Summative Paper 2026',
      examType: 'Midterm',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      durationMinutes: 120,
      totalMarks: 80,
      status: 'Approved',
      createdAt: '2026-09-28',
      instructions: [
        'All questions are compulsory.',
        'Section A contains 10 MCQs of 1 mark each.',
        'Section B contains 6 Short Answer questions of 2 marks each.',
        'Section C contains 6 Long Answer questions of 4 marks each.',
        'Section D contains 2 Case Study analytical questions of 4 marks each.',
        'Use of electronic calculators is strictly prohibited.'
      ],
      blueprint: {
        sectionA_mcq: 10,
        sectionB_short: 6,
        sectionC_long: 6,
        sectionD_caseStudy: 2
      },
      questions: [
        {
          id: 'q-1',
          type: 'MCQ',
          text: 'If 2x - 3 = 7, then the value of x is:',
          options: ['x = 2', 'x = 5', 'x = 7', 'x = 10'],
          correctAnswer: 'x = 5 (2x = 10 => x = 5)',
          marks: 1,
          difficulty: 'Easy',
          chapter: 'Linear Equations in One Variable'
        },
        {
          id: 'q-2',
          type: 'MCQ',
          text: 'Which of the following is a Pythagorean triplet?',
          options: ['(3, 4, 5)', '(2, 3, 4)', '(5, 6, 7)', '(6, 7, 8)'],
          correctAnswer: '(3, 4, 5) since 3^2 + 4^2 = 9 + 16 = 25 = 5^2',
          marks: 1,
          difficulty: 'Easy',
          chapter: 'Squares and Square Roots'
        },
        {
          id: 'q-3',
          type: 'True/False',
          text: 'Every square is a rectangle, but not every rectangle is a square.',
          options: ['True', 'False'],
          correctAnswer: 'True',
          marks: 1,
          difficulty: 'Easy',
          chapter: 'Understanding Quadrilaterals'
        },
        {
          id: 'q-4',
          type: 'FillInBlank',
          text: 'The sum of all interior angles of a convex quadrilateral is ______ degrees.',
          correctAnswer: '360',
          marks: 1,
          difficulty: 'Easy',
          chapter: 'Understanding Quadrilaterals'
        },
        {
          id: 'q-5',
          type: 'ShortAnswer',
          text: 'Find the perimeter of a rectangle whose length is 40 cm and a diagonal is 41 cm.',
          correctAnswer: 'Breadth = sqrt(41^2 - 40^2) = sqrt(1681 - 1600) = sqrt(81) = 9 cm. Perimeter = 2*(40+9) = 98 cm.',
          marks: 2,
          difficulty: 'Medium',
          chapter: 'Squares and Square Roots'
        },
        {
          id: 'q-6',
          type: 'LongAnswer',
          text: 'Solve for x and verify the result: (x + 1)/(2x + 3) = 3/8',
          correctAnswer: '8(x + 1) = 3(2x + 3) => 8x + 8 = 6x + 9 => 2x = 1 => x = 1/2. Verification: LHS = (3/2)/(4) = 3/8 = RHS.',
          marks: 4,
          difficulty: 'Medium',
          chapter: 'Linear Equations in One Variable'
        },
        {
          id: 'q-7',
          type: 'CaseStudy',
          text: 'Case Study: A school playground is shaped as a combination of a rectangle and two semi-circles. If total perimeter is 400 m, derive the equation for area in terms of radius r and calculate optimal dimensions.',
          correctAnswer: 'Step 1: Express length L in terms of r (400 - 2*pi*r)/2. Step 2: Area A = 2*r*L + pi*r^2. Step 3: Differentiate dA/dr = 0 to get r = 200/pi. Max area = 20,000/pi m^2.',
          marks: 4,
          difficulty: 'Hard',
          chapter: 'Mensuration and Practical Geometry'
        }
      ]
    },
    {
      id: 'qp-102',
      title: 'Physics Mechanics & Optics Unit Test',
      examType: 'Unit Test',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      durationMinutes: 60,
      totalMarks: 40,
      status: 'Submitted for Approval',
      createdAt: '2026-10-01',
      instructions: [
        'Questions 1 to 5 carry 1 mark each.',
        'Questions 6 to 9 carry 2 marks each.',
        'Questions 10 and 11 carry 5 marks each with internal choice.'
      ],
      blueprint: {
        sectionA_mcq: 5,
        sectionB_short: 4,
        sectionC_long: 2,
        sectionD_caseStudy: 1
      },
      questions: [
        {
          id: 'qp-phy-1',
          type: 'MCQ',
          text: 'The SI unit of force is:',
          options: ['Joule', 'Newton', 'Pascal', 'Watt'],
          correctAnswer: 'Newton (kg*m/s^2)',
          marks: 1,
          difficulty: 'Easy',
          chapter: 'Laws of Motion'
        },
        {
          id: 'qp-phy-2',
          type: 'ShortAnswer',
          text: 'State Newton’s Second Law of Motion and derive F = ma.',
          correctAnswer: 'The rate of change of momentum is directly proportional to applied force in the direction of force. dp/dt = d(mv)/dt = m(dv/dt) = ma.',
          marks: 2,
          difficulty: 'Medium',
          chapter: 'Laws of Motion'
        }
      ]
    }
  ]);

  // Wizard state for new question paper
  const [newTitle, setNewTitle] = useState('');
  const [newExamType, setNewExamType] = useState<QuestionPaper['examType']>('Unit Test');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClassGrade, setNewClassGrade] = useState('Class 8-A');
  const [newDuration, setNewDuration] = useState(90);
  const [newTotalMarks, setNewTotalMarks] = useState(50);
  const [mcqCount, setMcqCount] = useState(5);
  const [shortCount, setShortCount] = useState(5);
  const [longCount, setLongCount] = useState(3);
  const [caseStudyCount, setCaseStudyCount] = useState(1);
  const [generationMode, setGenerationMode] = useState<'ai_auto' | 'manual'>('ai_auto');

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter an examination paper title.', 'warning');
      return;
    }

    const calculatedMarks = (mcqCount * 1) + (shortCount * 2) + (longCount * 4) + (caseStudyCount * 4);

    const generatedQuestions: QuestionItem[] = [
      {
        id: `gen-q-${Date.now()}-1`,
        type: 'MCQ',
        text: `Fundamental conceptual question on ${newSubject} key theorem.`,
        options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A (Correct)',
        marks: 1,
        difficulty: 'Easy',
        chapter: 'Core Chapter 1'
      },
      {
        id: `gen-q-${Date.now()}-2`,
        type: 'ShortAnswer',
        text: `Explain and derive the relationship between variables in ${newSubject}.`,
        correctAnswer: 'Full step-by-step formula derivation with diagrammatic illustration.',
        marks: 2,
        difficulty: 'Medium',
        chapter: 'Core Chapter 2'
      },
      {
        id: `gen-q-${Date.now()}-3`,
        type: 'LongAnswer',
        text: `Comprehensive numerical proof and scenario evaluation problem.`,
        correctAnswer: 'Step 1: Identify given quantities. Step 2: Formulate quadratic equations. Step 3: Compute final value with correct units.',
        marks: 4,
        difficulty: 'Hard',
        chapter: 'Core Chapter 3'
      },
      {
        id: `gen-q-${Date.now()}-4`,
        type: 'CaseStudy',
        text: `Real-world application case study: Analyze real-world engineering constraints using ${newSubject} principles.`,
        correctAnswer: 'Multi-part diagnostic reasoning with trade-off analysis.',
        marks: 4,
        difficulty: 'Hard',
        chapter: 'Applied Science & Problem Solving'
      }
    ];

    const newPaper: QuestionPaper = {
      id: `qp-${Date.now()}`,
      title: newTitle,
      examType: newExamType,
      subject: newSubject,
      classGrade: newClassGrade,
      durationMinutes: newDuration,
      totalMarks: calculatedMarks || newTotalMarks,
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
      instructions: [
        'Read all instructions carefully before writing.',
        'Attempt all questions in sequence.',
        'Draw neat and labeled diagrams wherever necessary.'
      ],
      blueprint: {
        sectionA_mcq: mcqCount,
        sectionB_short: shortCount,
        sectionC_long: longCount,
        sectionD_caseStudy: caseStudyCount
      },
      questions: generatedQuestions
    };

    setPapers(prev => [newPaper, ...prev]);
    setSelectedPaper(newPaper);
    setActiveTab('preview-paper');
    showToast(`Question Paper "${newTitle}" created successfully!`);
  };

  const handleUpdateStatus = (paperId: string, status: QuestionPaper['status']) => {
    setPapers(prev => prev.map(p => p.id === paperId ? { ...p, status } : p));
    if (selectedPaper?.id === paperId) {
      setSelectedPaper(prev => prev ? { ...prev, status } : null);
    }
    showToast(`Exam paper status changed to "${status}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Question Paper & Exam Management</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Examination Blueprint & Paper Creator</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold border border-rose-200">
              CBSE & NEP 2020 Compliant
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create automated question papers, blueprint matrices, answer keys, printable exams, and approval workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('papers')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'papers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paper Repository ({papers.length})
            </button>
            <button
              onClick={() => setActiveTab('create-wizard')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeTab === 'create-wizard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Paper</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: PAPERS REPOSITORY */}
      {activeTab === 'papers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map(paper => (
            <div
              key={paper.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                    {paper.examType}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      paper.status === 'Approved' || paper.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : paper.status === 'Submitted for Approval'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {paper.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">{paper.title}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{paper.subject}</span>
                  <span>•</span>
                  <span>{paper.classGrade}</span>
                </div>

                {/* Blueprint Breakdown Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    ⏱️ {paper.durationMinutes} mins
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 font-bold text-slate-700">
                    💯 {paper.totalMarks} Marks
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    ❓ {paper.questions.length} Questions
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedPaper(paper);
                    setShowAnswerKey(false);
                    setActiveTab('preview-paper');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#3d5ee1] bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview & Print</span>
                </button>

                {paper.status === 'Draft' && (
                  <button
                    onClick={() => handleUpdateStatus(paper.id, 'Submitted for Approval')}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                )}

                {paper.status === 'Submitted for Approval' && (
                  <button
                    onClick={() => handleUpdateStatus(paper.id, 'Approved')}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                )}

                {paper.status === 'Approved' && (
                  <button
                    onClick={() => handleUpdateStatus(paper.id, 'Published')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CREATE PAPER WIZARD */}
      {activeTab === 'create-wizard' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">New Examination Paper Generator</h2>
            <p className="text-xs text-slate-500">Configure paper blueprint, weightage, question distributions, and automated generator mode.</p>
          </div>

          <form onSubmit={handleCreatePaper} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Examination Paper Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Mathematics Midterm Summative Paper 2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exam Type</label>
                <select
                  value={newExamType}
                  onChange={e => setNewExamType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Unit Test">Unit Test (Class Periodic Assessment)</option>
                  <option value="Midterm">Midterm Examination</option>
                  <option value="Final Exam">Final Term-End Examination</option>
                  <option value="Pre-Board">Pre-Board Mock Examination</option>
                  <option value="Diagnostic Quiz">Diagnostic Remedial Quiz</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & MLOps</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class / Grade Cohort</label>
                <select
                  value={newClassGrade}
                  onChange={e => setNewClassGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 9-B">Class 9-B</option>
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="Cohort Alpha">Cohort Alpha</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={e => setNewDuration(parseInt(e.target.value) || 60)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Total Marks Target</label>
                <input
                  type="number"
                  value={newTotalMarks}
                  onChange={e => setNewTotalMarks(parseInt(e.target.value) || 50)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Blueprint Section Builder */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">Blueprint Question Distribution</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Calculated: {(mcqCount * 1) + (shortCount * 2) + (longCount * 4) + (caseStudyCount * 4)} Marks
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700">Section A: MCQs</div>
                  <div className="text-[10px] text-slate-400">1 Mark each</div>
                  <input
                    type="number"
                    min={0}
                    value={mcqCount}
                    onChange={e => setMcqCount(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700">Section B: Short Ans</div>
                  <div className="text-[10px] text-slate-400">2 Marks each</div>
                  <input
                    type="number"
                    min={0}
                    value={shortCount}
                    onChange={e => setShortCount(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700">Section C: Long Ans</div>
                  <div className="text-[10px] text-slate-400">4 Marks each</div>
                  <input
                    type="number"
                    min={0}
                    value={longCount}
                    onChange={e => setLongCount(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700">Section D: Case Study</div>
                  <div className="text-[10px] text-slate-400">4 Marks each</div>
                  <input
                    type="number"
                    min={0}
                    value={caseStudyCount}
                    onChange={e => setCaseStudyCount(parseInt(e.target.value) || 0)}
                    className="mt-1 w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('papers')}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Paper with AI Blueprint</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: PREVIEW & PRINTABLE VIEW */}
      {activeTab === 'preview-paper' && selectedPaper && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('papers')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Back to Papers List
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  showAnswerKey
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {showAnswerKey ? '✓ Showing Answer Key' : 'Show Answer Key & Rubrics'}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Exam Paper Container */}
          <div id="printable-exam-paper" className="bg-white border border-slate-300 rounded-2xl p-8 shadow-sm space-y-6 max-w-4xl mx-auto font-serif">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <div className="font-bold text-xl uppercase tracking-wider text-slate-900 font-sans">
                Delhi Public Global School • Academic Council
              </div>
              <div className="text-sm font-bold text-slate-700 font-sans uppercase">
                {selectedPaper.title}
              </div>
              <div className="flex items-center justify-center gap-6 text-xs text-slate-600 font-sans pt-1">
                <span>Class: <strong>{selectedPaper.classGrade}</strong></span>
                <span>Subject: <strong>{selectedPaper.subject}</strong></span>
                <span>Max Marks: <strong>{selectedPaper.totalMarks}</strong></span>
                <span>Time Allowed: <strong>{selectedPaper.durationMinutes} Minutes</strong></span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <div className="font-bold text-slate-800">General Instructions:</div>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600">
                {selectedPaper.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Questions List */}
            <div className="space-y-6 pt-2 font-sans text-xs">
              {selectedPaper.questions.map((q, idx) => (
                <div key={q.id} className="space-y-2 border-b border-slate-100 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                      <span className="text-slate-800 leading-relaxed font-medium">{q.text}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-600 shrink-0">[{q.marks} Mark{q.marks > 1 ? 's' : ''}]</span>
                  </div>

                  {/* MCQ Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pl-6 pt-1">
                      {q.options.map((opt, i) => (
                        <div key={i} className="text-slate-700">
                          <span className="font-bold mr-1.5">({String.fromCharCode(97 + i)})</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer Key & Solution */}
                  {showAnswerKey && (
                    <div className="ml-6 p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-[11px] space-y-1 mt-2">
                      <div className="font-bold flex items-center gap-1 text-purple-800">
                        <Check className="w-3.5 h-3.5" />
                        <span>Answer Key & Marking Scheme:</span>
                      </div>
                      <div className="font-mono text-slate-800 leading-relaxed">{q.correctAnswer}</div>
                      <div className="text-[10px] text-purple-700">Chapter: {q.chapter} • Difficulty: {q.difficulty}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center text-[10px] text-slate-400 pt-6 border-t border-slate-200 font-sans">
              *** END OF EXAMINATION QUESTION PAPER ***
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

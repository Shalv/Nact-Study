import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Tag,
  CheckCircle2,
  Upload,
  Download,
  Clock,
  Sparkles,
  HelpCircle,
  X,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuestionItem } from './TeacherExamBuilderView';

export interface BankQuestionItem extends QuestionItem {
  learningOutcome: string;
  isPreviousYear?: boolean;
  previousYearTag?: string;
  usageCount: number;
  lastUsedExam?: string;
}

export const TeacherQuestionBankView: React.FC = () => {
  const { showToast } = useApp();

  const [questions, setQuestions] = useState<BankQuestionItem[]>([
    {
      id: 'qb-1',
      type: 'MCQ',
      text: 'If 2x - 3 = 7, then the value of x is:',
      options: ['x = 2', 'x = 5', 'x = 7', 'x = 10'],
      correctAnswer: 'x = 5 (2x = 10 => x = 5)',
      marks: 1,
      difficulty: 'Easy',
      chapter: 'Linear Equations in One Variable',
      learningOutcome: 'Solves linear equations using inverse operations',
      isPreviousYear: true,
      previousYearTag: 'CBSE 2024 Board',
      usageCount: 4,
      lastUsedExam: 'Term 1 Midterm 2025'
    },
    {
      id: 'qb-2',
      type: 'MCQ',
      text: 'Which of the following is a Pythagorean triplet?',
      options: ['(3, 4, 5)', '(2, 3, 4)', '(5, 6, 7)', '(6, 7, 8)'],
      correctAnswer: '(3, 4, 5) since 3^2 + 4^2 = 9 + 16 = 25 = 5^2',
      marks: 1,
      difficulty: 'Easy',
      chapter: 'Squares and Square Roots',
      learningOutcome: 'Identifies number properties and square relations',
      isPreviousYear: true,
      previousYearTag: 'CBSE 2023 Board',
      usageCount: 3,
      lastUsedExam: 'Periodic Assessment 2'
    },
    {
      id: 'qb-3',
      type: 'True/False',
      text: 'Every square is a rectangle, but not every rectangle is a square.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      marks: 1,
      difficulty: 'Easy',
      chapter: 'Understanding Quadrilaterals',
      learningOutcome: 'Distinguishes properties of regular polygons',
      isPreviousYear: false,
      usageCount: 2,
      lastUsedExam: 'Class Quiz Week 4'
    },
    {
      id: 'qb-4',
      type: 'ShortAnswer',
      text: 'Find the perimeter of a rectangle whose length is 40 cm and a diagonal is 41 cm.',
      correctAnswer: 'Breadth = sqrt(41^2 - 40^2) = 9 cm. Perimeter = 2*(40+9) = 98 cm.',
      marks: 2,
      difficulty: 'Medium',
      chapter: 'Squares and Square Roots',
      learningOutcome: 'Applies Pythagoras theorem to geometric perimeters',
      isPreviousYear: true,
      previousYearTag: 'Exemplar Problem',
      usageCount: 5,
      lastUsedExam: 'Midterm 2025'
    },
    {
      id: 'qb-5',
      type: 'LongAnswer',
      text: 'State Newton’s Second Law of Motion and derive the mathematical expression F = ma from first principles.',
      correctAnswer: 'Rate of change of momentum is proportional to applied force. dp/dt = d(mv)/dt = m*(dv/dt) = ma.',
      marks: 4,
      difficulty: 'Medium',
      chapter: 'Laws of Motion',
      learningOutcome: 'Formulates differential momentum laws',
      isPreviousYear: true,
      previousYearTag: 'CBSE 2025 Board',
      usageCount: 6,
      lastUsedExam: 'Physics Midterm 2026'
    },
    {
      id: 'qb-6',
      type: 'CaseStudy',
      text: 'Case Study on Solar Photovoltaics: An off-grid hospital requires 40 kWh daily. If solar panels yield 350 W each under 5 peak sun hours, compute the required panel array and inverter sizing.',
      correctAnswer: 'Required energy = 40,000 Wh / 5 hrs = 8,000 W. Panels required = 8,000 / 350 = 23 panels. Inverter sizing: 10 kW continuous.',
      marks: 5,
      difficulty: 'Hard',
      chapter: 'Renewable Energy Systems',
      learningOutcome: 'Synthesizes clean energy capacity calculations',
      isPreviousYear: false,
      usageCount: 1,
      lastUsedExam: 'Pre-Board Mock Exam 2026'
    }
  ]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [chapterFilter, setChapterFilter] = useState('All');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<QuestionItem['type']>('MCQ');
  const [newMarks, setNewMarks] = useState(1);
  const [newDifficulty, setNewDifficulty] = useState<QuestionItem['difficulty']>('Easy');
  const [newChapter, setNewChapter] = useState('Linear Equations');
  const [newOutcome, setNewOutcome] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');
  const [isPyq, setIsPyq] = useState(false);
  const [pyqTag, setPyqTag] = useState('');

  const chaptersList = Array.from(new Set(questions.map(q => q.chapter)));

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !newAnswer.trim()) {
      showToast('Please provide both question text and correct answer.', 'warning');
      return;
    }

    const options = newType === 'MCQ' 
      ? [newOptionA || 'Option 1', newOptionB || 'Option 2', newOptionC || 'Option 3', newOptionD || 'Option 4'] 
      : undefined;

    const newQuestion: BankQuestionItem = {
      id: `qb-${Date.now()}`,
      type: newType,
      text: newText,
      options,
      correctAnswer: newAnswer,
      marks: newMarks,
      difficulty: newDifficulty,
      chapter: newChapter,
      learningOutcome: newOutcome || 'Demonstrates mastery of core concepts',
      isPreviousYear: isPyq,
      previousYearTag: isPyq ? pyqTag : undefined,
      usageCount: 0
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setShowAddModal(false);
    showToast('Question added to Question Bank.');
    // Reset form
    setNewText('');
    setNewAnswer('');
    setNewOptionA('');
    setNewOptionB('');
    setNewOptionC('');
    setNewOptionD('');
    setIsPyq(false);
    setPyqTag('');
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question from the bank?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
      showToast('Question deleted from bank.');
    }
  };

  const filtered = questions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.learningOutcome.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesType = typeFilter === 'All' || q.type === typeFilter;
    const matchesChapter = chapterFilter === 'All' || q.chapter === chapterFilter;

    return matchesSearch && matchesDifficulty && matchesType && matchesChapter;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Type', 'Question', 'Marks', 'Difficulty', 'Chapter', 'Learning Outcome', 'PYQ Tag', 'Usage Count'];
    const rows = filtered.map(q => [
      q.id,
      q.type,
      `"${q.text.replace(/"/g, '""')}"`,
      q.marks,
      q.difficulty,
      `"${q.chapter}"`,
      `"${q.learningOutcome}"`,
      q.isPreviousYear ? `"${q.previousYearTag}"` : 'No',
      q.usageCount
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `question_bank_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filtered.length} questions to CSV.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Question Bank & Taxonomies</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Curated Academic Question Bank</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              {filtered.length} Items Indexed
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tagged by chapter, cognitive difficulty, previous board exam appearances, and learning outcomes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Bank</span>
          </button>

          <button
            onClick={() => showToast('Question bank refreshed.')}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
            title="Refresh"
          >
            <Clock className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Question</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search question text, chapter, or learning outcome..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs font-medium"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs font-medium"
            >
              <option value="All">All Question Types</option>
              <option value="MCQ">MCQ</option>
              <option value="True/False">True/False</option>
              <option value="FillInBlank">Fill in the Blank</option>
              <option value="ShortAnswer">Short Answer</option>
              <option value="LongAnswer">Long Answer</option>
              <option value="CaseStudy">Case Study</option>
            </select>

            <select
              value={chapterFilter}
              onChange={e => setChapterFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs font-medium"
            >
              <option value="All">All Chapters</option>
              {chaptersList.map(ch => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.map(q => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-indigo-300 transition-all space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-700">
                    {q.type}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="font-bold text-slate-700">📖 {q.chapter}</span>
                  {q.isPreviousYear && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-600" />
                      <span>{q.previousYearTag || 'Previous Year'}</span>
                    </span>
                  )}
                </div>

                <div className="text-sm font-semibold text-slate-900 pt-1 leading-relaxed">
                  {q.text}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-bold text-[#3d5ee1] font-mono">
                  {q.marks} Mark{q.marks > 1 ? 's' : ''}
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  Used in {q.usageCount} exams
                </div>
              </div>
            </div>

            {/* Options for MCQ */}
            {q.options && (
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                {q.options.map((opt, idx) => (
                  <div key={idx} className="text-slate-700 text-[11px]">
                    <span className="font-bold mr-1">({String.fromCharCode(65 + idx)})</span> {opt}
                  </div>
                ))}
              </div>
            )}

            {/* Solution & Rubric Note */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-emerald-900 text-[11px] space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct Solution / Answer Key:</span>
              </div>
              <div className="font-mono text-slate-800 leading-relaxed">{q.correctAnswer}</div>
              <div className="text-[10px] text-emerald-700 font-medium pt-0.5">
                Target Outcome: {q.learningOutcome}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
              <span className="text-slate-400">
                {q.lastUsedExam ? `Last appeared in ${q.lastUsedExam}` : 'Fresh item, not yet in exam'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Added question ${q.id} to active exam draft.`)}
                  className="px-2.5 py-1 text-xs text-[#3d5ee1] bg-indigo-50 hover:bg-indigo-100 rounded-lg font-semibold transition-colors"
                >
                  + Add to Paper
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD NEW QUESTION */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">Create New Bank Question</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Question Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="MCQ">Multiple Choice (MCQ)</option>
                    <option value="True/False">True / False</option>
                    <option value="FillInBlank">Fill in the Blank</option>
                    <option value="ShortAnswer">Short Answer</option>
                    <option value="LongAnswer">Long Answer</option>
                    <option value="CaseStudy">Case Study</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={e => setNewDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marks Weightage</label>
                  <input
                    type="number"
                    min={1}
                    value={newMarks}
                    onChange={e => setNewMarks(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chapter / Unit</label>
                <input
                  type="text"
                  required
                  value={newChapter}
                  onChange={e => setNewChapter(e.target.value)}
                  placeholder="e.g. Linear Equations in One Variable"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question Text *</label>
                <textarea
                  rows={3}
                  required
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  placeholder="Type the full problem or question prompt..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              {newType === 'MCQ' && (
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block">Multiple Choice Options:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Option A"
                      value={newOptionA}
                      onChange={e => setNewOptionA(e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option B"
                      value={newOptionB}
                      onChange={e => setNewOptionB(e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option C"
                      value={newOptionC}
                      onChange={e => setNewOptionC(e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Option D"
                      value={newOptionD}
                      onChange={e => setNewOptionD(e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correct Answer / Model Solution *</label>
                <textarea
                  rows={2}
                  required
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  placeholder="Provide correct answer and key steps for marking scheme..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Learning Outcome</label>
                <input
                  type="text"
                  value={newOutcome}
                  onChange={e => setNewOutcome(e.target.value)}
                  placeholder="e.g. Applies Pythagoras theorem to solve right-angled problems"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="pyqCheckbox"
                  checked={isPyq}
                  onChange={e => setIsPyq(e.target.checked)}
                  className="rounded text-[#3d5ee1]"
                />
                <label htmlFor="pyqCheckbox" className="font-semibold text-slate-700 cursor-pointer">
                  Is Previous Year Board / Exam Question?
                </label>
                {isPyq && (
                  <input
                    type="text"
                    placeholder="e.g. CBSE 2024 Board"
                    value={pyqTag}
                    onChange={e => setPyqTag(e.target.value)}
                    className="flex-1 px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-xs"
                  />
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-lg shadow-xs"
                >
                  Save Question to Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

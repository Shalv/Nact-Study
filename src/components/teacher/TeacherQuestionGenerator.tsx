import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Plus,
  BookOpen,
  CheckCircle2,
  Copy,
  Wand2,
  Save,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherQuestionGenerator: React.FC<{
  onAddToQuestionBank?: (q: any) => void;
}> = ({ onAddToQuestionBank }) => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [subject, setSubject] = useState('Physics');
  const [topic, setTopic] = useState('Laws of Motion & Friction Mechanics');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionType, setQuestionType] = useState('Multiple Choice Question (MCQ)');
  const [count, setCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedQuestions, setGeneratedQuestions] = useState<
    {
      id: string;
      subject: string;
      topic: string;
      difficulty: string;
      type: string;
      text: string;
      options?: string[];
      correctAnswer: string;
      solution: string;
      marks: number;
    }[]
  >([
    {
      id: 'AI-Q101',
      subject: 'Physics',
      topic: 'Laws of Motion',
      difficulty: 'Medium',
      type: 'MCQ',
      text: 'A block of mass 5 kg rests on a rough horizontal surface with coefficient of static friction μs = 0.4. What horizontal force is required to just initiate motion? (Assume g = 9.8 m/s²)',
      options: ['A) 19.6 N', 'B) 9.8 N', 'C) 49.0 N', 'D) 24.5 N'],
      correctAnswer: 'A) 19.6 N',
      solution:
        'Normal reaction R = m * g = 5 * 9.8 = 49 N. Maximum static friction f_max = μs * R = 0.4 * 49 = 19.6 N. Hence, a horizontal force exceeding 19.6 N is required.',
      marks: 2
    },
    {
      id: 'AI-Q102',
      subject: 'Physics',
      topic: 'Friction Mechanics',
      difficulty: 'Hard',
      type: 'Numerical Problem',
      text: 'A body of mass 2 kg slides down an inclined plane of angle 30° with a constant velocity. Calculate the coefficient of kinetic friction between the body and the plane.',
      correctAnswer: 'μk = tan(30°) = 1/√3 ≈ 0.577',
      solution:
        'When a body moves with constant velocity (zero acceleration), the component of gravity down the incline balances friction: m*g*sin(θ) = μk*m*g*cos(θ) => μk = tan(θ) = tan(30°) = 0.577.',
      marks: 3
    }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newItems = [
        {
          id: `AI-Q${Math.floor(200 + Math.random() * 800)}`,
          subject,
          topic,
          difficulty,
          type: questionType.includes('MCQ') ? 'MCQ' : 'Subjective',
          text: `Evaluate the resultant acceleration of a 10 kg mass subject to two perpendicular forces of 6 N and 8 N. Determine the vector angle with the 6 N force.`,
          options: questionType.includes('MCQ')
            ? ['A) 1.0 m/s² at 53.1°', 'B) 1.4 m/s² at 45°', 'C) 0.8 m/s² at 30°', 'D) 2.0 m/s² at 90°']
            : undefined,
          correctAnswer: 'A) 1.0 m/s² at 53.1°',
          solution:
            'Resultant Force F = √(6² + 8²) = √(36 + 64) = √100 = 10 N. Acceleration a = F / m = 10 / 10 = 1.0 m/s². Angle θ = arctan(8 / 6) = arctan(1.33) ≈ 53.13° from the 6 N axis.',
          marks: 3
        }
      ];

      setGeneratedQuestions([...newItems, ...generatedQuestions]);
      showToast('AI Questions generated with rigorous step-by-step solutions!');

      addActivityLog({
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        portalType: currentUser.portalType,
        action: `Generated AI Questions for ${subject}`,
        details: `${topic} • ${difficulty} • ${questionType}`,
        category: 'academic'
      });
    }, 1000);
  };

  const handleAddQuestionToBank = (q: any) => {
    if (onAddToQuestionBank) {
      onAddToQuestionBank(q);
    }
    showToast(`Question ${q.id} saved to Question Bank!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      {/* Header and Generator Form */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>AI Exam & Practicum Question Generator</span>
            </h2>
            <p className="text-slate-500">
              Generate custom MCQs, numerical problems, and case study prompts with verified step-by-step marking rubrics.
            </p>
          </div>
          <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            Pedagogical Engine Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subject</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Chapter / Concept</label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Difficulty Tier</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="Easy">Easy (Conceptual Recall)</option>
              <option value="Medium">Medium (Standard Board Problem)</option>
              <option value="Hard">Hard (Multi-step Reasoning)</option>
              <option value="Olympiad">Olympiad / Competitive</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Question Type</label>
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="Multiple Choice Question (MCQ)">Multiple Choice (MCQ)</option>
              <option value="Numerical Problem">Numerical Problem</option>
              <option value="Assertion & Reasoning">Assertion & Reasoning</option>
              <option value="Short Answer Question">Short Answer Question</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-[#3d5ee1] text-white font-bold rounded-xl shadow-xs hover:opacity-95 transition-all flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 animate-spin" />
              <span>Generating Rigorous Assessment Questions...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Questions with Marking Scheme</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Questions List */}
      <div className="space-y-4">
        {generatedQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-slate-800">{q.id}</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-[#3d5ee1]">{q.subject}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-sans">{q.topic}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    q.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700'
                      : q.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {q.difficulty}
                </span>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {q.marks} Marks
                </span>
              </div>
            </div>

            <p className="text-slate-900 font-semibold text-xs leading-relaxed">
              <strong>Q{idx + 1}.</strong> {q.text}
            </p>

            {/* Options if MCQ */}
            {q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border ${
                      opt === q.correctAnswer
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}

            {/* Solution & Rubric Accordion */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-emerald-800 text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct Answer & Marking Key: {q.correctAnswer}</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1 font-mono">
                {q.solution}
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${q.text}\nAnswer: ${q.correctAnswer}\nSolution: ${q.solution}`);
                  showToast('Question copied to clipboard.');
                }}
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 text-[11px]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Question & Solution</span>
              </button>

              <button
                onClick={() => handleAddQuestionToBank(q)}
                className="px-3.5 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Question Bank</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

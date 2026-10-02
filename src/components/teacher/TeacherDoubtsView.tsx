import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  HelpCircle,
  User,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherDoubtsView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [doubts, setDoubts] = useState([
    {
      id: 'DBT-101',
      studentName: 'Aarav Patel',
      classGrade: 'Class 8-A',
      subject: 'Mathematics',
      topic: 'Quadratic Polynomial Factorization',
      question:
        'Sir, in Exercise 2.3 question 4, why do we take negative sign when factoring 6x^2 - 7x - 3? What is the rule for picking factors of ac that sum to b?',
      time: '15m ago',
      status: 'Answered',
      reply:
        'Great question Aarav! For 6x^2 - 7x - 3, ac = 6 * (-3) = -18. Since ac is negative, the two factors must have opposite signs. We need factors of -18 that add to -7: -9 and +2. Thus, 6x^2 - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (3x + 1)(2x - 3).'
    },
    {
      id: 'DBT-102',
      studentName: 'Marcus Chen',
      classGrade: 'Class 9-B',
      subject: 'Physics',
      topic: 'Snell’s Law & Total Internal Reflection',
      question:
        'When light travels from water (n=1.33) into air (n=1.00), does it bend away or towards the normal? And what happens when angle of incidence exceeds 48.6 degrees?',
      time: '1h ago',
      status: 'Pending',
      reply: ''
    },
    {
      id: 'DBT-103',
      studentName: 'Harish Chandra',
      classGrade: 'Class 10-A',
      subject: 'Chemistry',
      topic: 'Acid-Base Titration Indicator',
      question:
        'Sir, why do we use phenolphthalein instead of methyl orange when titrating strong base NaOH against weak acid CH3COOH?',
      time: '3h ago',
      status: 'Pending',
      reply: ''
    }
  ]);

  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});

  const handleSendReply = (doubtId: string) => {
    const text = replyInput[doubtId];
    if (!text || !text.trim()) return;

    setDoubts(prev =>
      prev.map(d =>
        d.id === doubtId ? { ...d, reply: text.trim(), status: 'Answered' } : d
      )
    );

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Answered Student Doubt (${doubtId})`,
      details: text.trim(),
      category: 'academic'
    });

    setReplyInput(prev => ({ ...prev, [doubtId]: '' }));
    showToast('Explanation sent to student.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-xs">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span>Student Doubts & Socratic Discussion Desk</span>
          </h2>
          <p className="text-slate-500">
            Clear learner doubts with step-by-step mathematical derivations and conceptual guidance.
          </p>
        </div>
        <span className="font-mono text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
          2 Doubts Awaiting Response
        </span>
      </div>

      <div className="space-y-4">
        {doubts.map(d => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{d.studentName}</span>
                <span className="text-slate-400">•</span>
                <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                  {d.classGrade}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[#3d5ee1] font-semibold">{d.subject} ({d.topic})</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  d.status === 'Answered'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}
              >
                {d.status}
              </span>
            </div>

            <p className="text-slate-800 text-xs font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              "{d.question}"
            </p>

            {d.reply ? (
              <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                <div className="font-bold text-[#3d5ee1] text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Faculty Explanation (Provided by {currentUser.name}):</span>
                </div>
                <p className="text-slate-700 font-sans leading-relaxed text-xs">{d.reply}</p>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <label className="block font-semibold text-slate-700">Write Detailed Explanation / Solution:</label>
                <textarea
                  rows={3}
                  placeholder="Enter clear, step-by-step resolution with formulas..."
                  value={replyInput[d.id] || ''}
                  onChange={e => setReplyInput({ ...replyInput, [d.id]: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1] text-xs"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSendReply(d.id)}
                    className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Explanation to Student</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

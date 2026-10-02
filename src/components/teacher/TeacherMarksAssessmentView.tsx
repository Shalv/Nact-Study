import React, { useState } from 'react';
import {
  Award,
  Save,
  Download,
  Filter,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface StudentMarksRecord {
  id: string;
  rollNo: string;
  name: string;
  theoryMarks: number;
  practicalMarks: number;
  projectMarks: number;
  remarks: string;
}

export const TeacherMarksAssessmentView: React.FC = () => {
  const { showToast } = useApp();

  const [assessmentType, setAssessmentType] = useState<
    'Unit Test' | 'Internal Assessment' | 'Midterm Exam' | 'Practical Lab' | 'Term Final'
  >('Midterm Exam');

  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [maxTheory, setMaxTheory] = useState(60);
  const [maxPractical, setMaxPractical] = useState(20);
  const [maxProject, setMaxProject] = useState(20);

  const totalMaxMarks = maxTheory + maxPractical + maxProject;

  const [records, setRecords] = useState<StudentMarksRecord[]>([
    {
      id: 'mrk-1',
      rollNo: '01',
      name: 'Aarav Patel',
      theoryMarks: 58,
      practicalMarks: 20,
      projectMarks: 19,
      remarks: 'Exceptional conceptual understanding and algebraic problem solving.'
    },
    {
      id: 'mrk-2',
      rollNo: '02',
      name: 'Sneha Kulkarni',
      theoryMarks: 55,
      practicalMarks: 19,
      projectMarks: 18,
      remarks: 'Strong geometric reasoning and neat graphical representations.'
    },
    {
      id: 'mrk-3',
      rollNo: '03',
      name: 'Aditya Birla',
      theoryMarks: 42,
      practicalMarks: 16,
      projectMarks: 15,
      remarks: 'Consistent progress; needs practice in quadratic factoring.'
    },
    {
      id: 'mrk-4',
      rollNo: '04',
      name: 'Diya Sen',
      theoryMarks: 50,
      practicalMarks: 18,
      projectMarks: 17,
      remarks: 'Very diligent and accurate in arithmetic proofs.'
    },
    {
      id: 'mrk-5',
      rollNo: '05',
      name: 'Rohan Sharma',
      theoryMarks: 28,
      practicalMarks: 12,
      projectMarks: 12,
      remarks: 'Needs remedial practice in linear signs and equation balance.'
    },
    {
      id: 'mrk-6',
      rollNo: '06',
      name: 'Pooja Hegde',
      avatar: '',
      theoryMarks: 46,
      practicalMarks: 17,
      projectMarks: 16,
      remarks: 'Good viva performance; minor calculation oversights in theory.'
    } as any,
    {
      id: 'mrk-7',
      rollNo: '07',
      name: 'Nikhil Roy',
      theoryMarks: 52,
      practicalMarks: 18,
      projectMarks: 17,
      remarks: 'Well-structured derivations.'
    },
    {
      id: 'mrk-8',
      rollNo: '08',
      name: 'Ananya Deshmukh',
      theoryMarks: 48,
      practicalMarks: 17,
      projectMarks: 16,
      remarks: 'Good grasp of mensuration geometry.'
    }
  ]);

  const computeGrade = (total: number, max: number) => {
    const percentage = (total / max) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'bg-emerald-100 text-emerald-800' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-blue-100 text-blue-800' };
    if (percentage >= 70) return { grade: 'B+', color: 'bg-indigo-100 text-indigo-800' };
    if (percentage >= 60) return { grade: 'B', color: 'bg-amber-100 text-amber-800' };
    if (percentage >= 50) return { grade: 'C', color: 'bg-orange-100 text-orange-800' };
    return { grade: 'F', color: 'bg-rose-100 text-rose-800' };
  };

  const handleUpdateRecord = (id: string, field: keyof StudentMarksRecord, value: any) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSaveMarks = () => {
    showToast(`Assessment marks saved successfully for ${selectedClass} (${selectedSubject})!`);
  };

  // Performance Analysis
  const totals = records.map(r => r.theoryMarks + r.practicalMarks + r.projectMarks);
  const highestScore = Math.max(...totals);
  const lowestScore = Math.min(...totals);
  const averageScore = Math.round(totals.reduce((a, b) => a + b, 0) / totals.length);
  const passCount = totals.filter(t => (t / totalMaxMarks) * 100 >= 50).length;
  const passPercentage = Math.round((passCount / records.length) * 100);

  const handleExportCSV = () => {
    const headers = ['Roll No', 'Student Name', 'Class', 'Subject', 'Theory', 'Practical', 'Project', 'Total', 'Max', 'Grade', 'Remarks'];
    const rows = records.map(r => {
      const tot = r.theoryMarks + r.practicalMarks + r.projectMarks;
      const { grade } = computeGrade(tot, totalMaxMarks);
      return [
        r.rollNo,
        `"${r.name}"`,
        `"${selectedClass}"`,
        `"${selectedSubject}"`,
        r.theoryMarks,
        r.practicalMarks,
        r.projectMarks,
        tot,
        totalMaxMarks,
        grade,
        `"${r.remarks}"`
      ];
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `marksheet_${selectedClass}_${selectedSubject}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported marksheet data to CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Faculty Console</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Marks & Academic Assessment</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Continuous Assessment & Grading Console</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              CBSE CCE & Grading Engine
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Record marks across Theory, Practicals, and Projects with automatic grade calculation and performance statistics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Marksheet</span>
          </button>

          <button
            onClick={handleSaveMarks}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3d5ee1] hover:bg-[#324ecc] rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Commit Marksheet</span>
          </button>
        </div>
      </div>

      {/* Configuration & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Assessment Type</label>
            <select
              value={assessmentType}
              onChange={e => setAssessmentType(e.target.value as any)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-semibold"
            >
              <option value="Unit Test">Unit Test (Class Periodic Assessment)</option>
              <option value="Internal Assessment">Internal Assessment (Monthly)</option>
              <option value="Midterm Exam">Midterm Examination</option>
              <option value="Practical Lab">Practical / Lab Evaluation</option>
              <option value="Term Final">Term-End Final Examination</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class / Grade</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-semibold"
            >
              <option value="Class 8-A">Class 8-A</option>
              <option value="Class 9-B">Class 9-B</option>
              <option value="Class 10-A">Class 10-A</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-semibold"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>
        </div>

        {/* Max Marks Weightage Configuration */}
        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-600">Max Weightage:</span>
          <div className="flex items-center gap-1 font-mono">
            <span className="text-slate-400">Theory:</span>
            <input
              type="number"
              value={maxTheory}
              onChange={e => setMaxTheory(parseInt(e.target.value) || 0)}
              className="w-12 px-1.5 py-0.5 border border-slate-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span className="text-slate-400">Practical:</span>
            <input
              type="number"
              value={maxPractical}
              onChange={e => setMaxPractical(parseInt(e.target.value) || 0)}
              className="w-12 px-1.5 py-0.5 border border-slate-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span className="text-slate-400">Project:</span>
            <input
              type="number"
              value={maxProject}
              onChange={e => setMaxProject(parseInt(e.target.value) || 0)}
              className="w-12 px-1.5 py-0.5 border border-slate-300 rounded bg-white text-center font-bold"
            />
          </div>
          <span className="font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
            = {totalMaxMarks} Total
          </span>
        </div>
      </div>

      {/* PERFORMANCE METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Class Average</span>
            <div className="text-2xl font-bold font-mono text-slate-900">{averageScore}/{totalMaxMarks}</div>
            <div className="text-[10px] text-slate-400 font-mono">{Math.round((averageScore / totalMaxMarks) * 100)}% Mean</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3d5ee1] flex items-center justify-center font-bold">
            📊
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Highest Score</span>
            <div className="text-2xl font-bold font-mono text-emerald-600">{highestScore}/{totalMaxMarks}</div>
            <div className="text-[10px] text-emerald-600 font-mono">Rank 1 • {Math.round((highestScore / totalMaxMarks) * 100)}%</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            🏆
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Lowest Score</span>
            <div className="text-2xl font-bold font-mono text-amber-600">{lowestScore}/{totalMaxMarks}</div>
            <div className="text-[10px] text-amber-600 font-mono">Remedial Focus</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            ⚠️
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Pass Rate</span>
            <div className="text-2xl font-bold font-mono text-purple-600">{passPercentage}%</div>
            <div className="text-[10px] text-purple-600 font-mono">{passCount}/{records.length} Students</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            ✓
          </div>
        </div>
      </div>

      {/* MARKS ENTRY GRID */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 text-xs font-semibold text-slate-700">
          <span>Student Marksheet Grid ({records.length} students)</span>
          <span className="text-slate-500 font-mono">{selectedClass} • {selectedSubject}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3 w-16">Roll #</th>
                <th className="p-3">Student Name</th>
                <th className="p-3 w-28">Theory ({maxTheory})</th>
                <th className="p-3 w-28">Practical ({maxPractical})</th>
                <th className="p-3 w-28">Project ({maxProject})</th>
                <th className="p-3 w-24 font-mono">Total ({totalMaxMarks})</th>
                <th className="p-3 w-20 text-center">Grade</th>
                <th className="p-3">Qualitative Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map(r => {
                const total = r.theoryMarks + r.practicalMarks + r.projectMarks;
                const { grade, color } = computeGrade(total, totalMaxMarks);
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-700">
                      {r.rollNo}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {r.name}
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={0}
                        max={maxTheory}
                        value={r.theoryMarks}
                        onChange={e => handleUpdateRecord(r.id, 'theoryMarks', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:border-[#3d5ee1]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={0}
                        max={maxPractical}
                        value={r.practicalMarks}
                        onChange={e => handleUpdateRecord(r.id, 'practicalMarks', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:border-[#3d5ee1]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={0}
                        max={maxProject}
                        value={r.projectMarks}
                        onChange={e => handleUpdateRecord(r.id, 'projectMarks', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:border-[#3d5ee1]"
                      />
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 text-sm">
                      {total}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${color}`}>
                        {grade}
                      </span>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={r.remarks}
                        onChange={e => handleUpdateRecord(r.id, 'remarks', e.target.value)}
                        placeholder="Feedback on performance..."
                        className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] text-slate-700"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

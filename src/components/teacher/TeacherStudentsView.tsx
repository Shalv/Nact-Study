import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  X,
  Plus,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherStudentsView: React.FC = () => {
  const { showToast, addActivityLog, currentUser, activeFilter } = useApp();
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [newNote, setNewNote] = useState<string>('');

  // Sync with Global Drill-Down Active Filters
  useEffect(() => {
    if (activeFilter.classGrade) {
      setSelectedClass(activeFilter.classGrade);
    }
    if (activeFilter.studentName) {
      setSearchQuery(activeFilter.studentName);
      // Auto open student modal if matched
      const found = students.find(s => s.name.toLowerCase().includes(activeFilter.studentName.toLowerCase()));
      if (found) {
        setSelectedStudent(found);
      }
    }
  }, [activeFilter]);

  const [students, setStudents] = useState([
    {
      id: 'PRE-1001',
      rollNo: '01',
      name: 'Aarav Patel',
      classGrade: 'Class 8-A',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      parentName: 'Ramesh Patel',
      parentPhone: '+91 98765 43210',
      parentEmail: 'ramesh.patel@gmail.com',
      attendanceRate: 98,
      gpa: 'A+ (96%)',
      pendingAssignments: 0,
      behaviorRemarks: 'Diligent and participates actively in mathematical proofs.',
      notes: [
        { date: '2026-09-28', teacher: 'Vikramaditya Roy', note: 'Top score in Polynomial factorization quiz.' }
      ]
    },
    {
      id: 'PRE-1002',
      rollNo: '02',
      name: 'Sneha Kulkarni',
      classGrade: 'Class 8-A',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      parentName: 'Anil Kulkarni',
      parentPhone: '+91 98220 11223',
      parentEmail: 'anil.k@gmail.com',
      attendanceRate: 95,
      gpa: 'A+ (94%)',
      pendingAssignments: 0,
      behaviorRemarks: 'Sharp analytical skills; helped peers in quadratic equations.',
      notes: []
    },
    {
      id: 'PRE-1003',
      rollNo: '03',
      name: 'Manoj Deshmukh',
      classGrade: 'Class 9-B',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      parentName: 'Sanjay Deshmukh',
      parentPhone: '+91 98450 99887',
      parentEmail: 'sanjay.deshmukh@yahoo.com',
      attendanceRate: 88,
      gpa: 'A (89%)',
      pendingAssignments: 1,
      behaviorRemarks: 'Great grasp of ray optics; needs to submit Lab Report 3 on time.',
      notes: []
    },
    {
      id: 'PRE-1004',
      rollNo: '04',
      name: 'Tanya Narang',
      classGrade: 'Class 9-B',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      parentName: 'Deepak Narang',
      parentPhone: '+91 97110 55443',
      parentEmail: 'deepak.narang@outlook.com',
      attendanceRate: 92,
      gpa: 'A (88%)',
      pendingAssignments: 0,
      behaviorRemarks: 'Very creative diagram sketches in spherical mirrors.',
      notes: []
    },
    {
      id: 'PRE-1005',
      rollNo: '05',
      name: 'Harish Chandra',
      classGrade: 'Class 10-A',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      parentName: 'B. C. Chandra',
      parentPhone: '+91 99880 77665',
      parentEmail: 'bc.chandra@gmail.com',
      attendanceRate: 82,
      gpa: 'B+ (78%)',
      pendingAssignments: 1,
      behaviorRemarks: 'Needs remedial practice in chemical equation balancing.',
      notes: [
        { date: '2026-09-24', teacher: 'Vikramaditya Roy', note: 'Advised additional tutoring for Acid-Base reactions.' }
      ]
    },
    {
      id: 'PRE-1006',
      rollNo: '06',
      name: 'Rohan Deshpande',
      classGrade: 'Class 10-A',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      parentName: 'Vikas Deshpande',
      parentPhone: '+91 98111 22334',
      parentEmail: 'vikas.deshpande@gmail.com',
      attendanceRate: 96,
      gpa: 'A+ (95%)',
      pendingAssignments: 0,
      behaviorRemarks: 'Outstanding lab technique and precise titration endpoints.',
      notes: []
    }
  ]);

  const filteredStudents = students.filter(s => {
    const matchesClass = selectedClass === 'All' || s.classGrade === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.includes(searchQuery) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedStudent) return;

    const noteObj = {
      date: new Date().toISOString().split('T')[0],
      teacher: currentUser.name,
      note: newNote.trim()
    };

    setStudents(prev =>
      prev.map(s => (s.id === selectedStudent.id ? { ...s, notes: [noteObj, ...s.notes] } : s))
    );

    setSelectedStudent((prev: any) => ({
      ...prev,
      notes: [noteObj, ...prev.notes]
    }));

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Added Academic Note for ${selectedStudent.name}`,
      details: newNote.trim(),
      category: 'academic'
    });

    setNewNote('');
    showToast(`Note added to ${selectedStudent.name}'s profile.`);
  };

  const handleSendParentAlert = (student: any) => {
    showToast(`SMS & WhatsApp attendance alert sent to parent ${student.parentName} (${student.parentPhone})`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#3d5ee1]" />
            <span>Assigned Students Roster & 360° Profiles</span>
          </h2>
          <p className="text-xs text-slate-500">
            View student attendance records, academic GPA, behavioral notes, and direct parent communications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, roll no..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3d5ee1] w-56"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            {['All', 'Class 8-A', 'Class 9-B', 'Class 10-A'].map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedClass === cls ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Parent Details</th>
                <th className="py-3 px-4 text-center">Attendance</th>
                <th className="py-3 px-4 text-center">Grade (GPA)</th>
                <th className="py-3 px-4 text-center">Pending Asg</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{student.rollNo}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                      {student.classGrade}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-900 font-medium">{student.parentName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{student.parentPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        student.attendanceRate >= 90
                          ? 'bg-emerald-50 text-emerald-700'
                          : student.attendanceRate >= 80
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {student.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">{student.gpa}</td>
                  <td className="py-3 px-4 text-center">
                    {student.pendingAssignments === 0 ? (
                      <span className="text-[11px] text-emerald-600 font-semibold">All Done</span>
                    ) : (
                      <span className="text-[11px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">
                        {student.pendingAssignments} Due
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#3d5ee1] hover:text-white rounded-lg font-semibold text-[11px] text-slate-700 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>360° Profile</span>
                      </button>
                      <button
                        onClick={() => handleSendParentAlert(student)}
                        title="Alert Parent via WhatsApp"
                        className="p-1 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student 360° Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 text-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedStudent.name}</h3>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Roll: {selectedStudent.rollNo} • {selectedStudent.id} • {selectedStudent.classGrade}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Attendance</div>
                  <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                    {selectedStudent.attendanceRate}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Academic Standing</div>
                  <div className="text-xl font-bold text-slate-900 mt-0.5">{selectedStudent.gpa}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Pending Homework</div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    {selectedStudent.pendingAssignments}
                  </div>
                </div>
              </div>

              {/* Parent Info Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800">Primary Parent / Guardian Details</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Parent: <strong>{selectedStudent.parentName}</strong></div>
                  <div>Phone: <strong>{selectedStudent.parentPhone}</strong></div>
                  <div className="col-span-2">Email: <strong>{selectedStudent.parentEmail}</strong></div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleSendParentAlert(selectedStudent)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Send WhatsApp Progress Alert</span>
                  </button>
                </div>
              </div>

              {/* Behavior & Observation Remarks */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800">Teacher's Observations & Recommendations</div>
                <p className="p-3 bg-indigo-50/60 border border-indigo-100 text-indigo-900 rounded-xl leading-relaxed">
                  {selectedStudent.behaviorRemarks}
                </p>
              </div>

              {/* Notes Log */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800">Academic History & Confidential Notes Log</div>
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a new observation, milestone or test note..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Note</span>
                  </button>
                </form>

                <div className="space-y-2">
                  {selectedStudent.notes.length === 0 ? (
                    <div className="text-slate-400 italic text-center py-2">No custom notes logged yet.</div>
                  ) : (
                    selectedStudent.notes.map((n: any, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{n.date}</span>
                          <span>Logged by: {n.teacher}</span>
                        </div>
                        <div className="text-slate-700 font-medium">{n.note}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

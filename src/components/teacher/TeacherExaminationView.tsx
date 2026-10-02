import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Search,
  Filter,
  Download,
  Printer,
  ShieldCheck,
  Users2,
  Send,
  Eye,
  X,
  Check,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface InvigilationDuty {
  id: string;
  examName: string;
  date: string;
  time: string;
  hallName: string;
  classGrade: string;
  subject: string;
  role: 'Chief Invigilator' | 'Co-Invigilator' | 'Relief Duty';
  status: 'Assigned' | 'Confirmed' | 'Reported' | 'Completed';
  totalStudents: number;
}

export interface SeatingArrangement {
  hallName: string;
  capacity: number;
  assignedClasses: string[];
  chiefInvigilator: string;
  benches: { benchNo: string; rollNo1: string; student1: string; rollNo2: string; student2: string }[];
}

export const TeacherExaminationView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'invigilation' | 'seating' | 'paper-submission' | 'verification'>('invigilation');

  // Invigilation Duties
  const [duties, setDuties] = useState<InvigilationDuty[]>([
    {
      id: 'INV-101',
      examName: 'Midterm Examination 2026',
      date: '2026-10-14',
      time: '09:00 AM - 12:00 PM',
      hallName: 'Examination Hall 1 (Auditorium)',
      classGrade: 'Class 10-A & 10-B',
      subject: 'Mathematics (Standard & Basic)',
      role: 'Chief Invigilator',
      status: 'Confirmed',
      totalStudents: 54
    },
    {
      id: 'INV-102',
      examName: 'Midterm Examination 2026',
      date: '2026-10-16',
      time: '09:00 AM - 12:00 PM',
      hallName: 'Room 204 (North Wing)',
      classGrade: 'Class 9-B',
      subject: 'Science (Physics & Chemistry)',
      role: 'Co-Invigilator',
      status: 'Assigned',
      totalStudents: 28
    },
    {
      id: 'INV-103',
      examName: 'Unit Assessment 2',
      date: '2026-10-20',
      time: '01:30 PM - 03:00 PM',
      hallName: 'Room 302',
      classGrade: 'Class 8-A',
      subject: 'Computer Applications',
      role: 'Chief Invigilator',
      status: 'Assigned',
      totalStudents: 32
    }
  ]);

  // Seating Arrangement Mock
  const seatingHall: SeatingArrangement = {
    hallName: 'Examination Hall 1 (Auditorium)',
    capacity: 60,
    assignedClasses: ['Class 10-A', 'Class 9-B'],
    chiefInvigilator: currentUser.name,
    benches: [
      { benchNo: 'Row 1 • Bench 1', rollNo1: '10A-01', student1: 'Aarav Patel', rollNo2: '9B-01', student2: 'Marcus Chen' },
      { benchNo: 'Row 1 • Bench 2', rollNo1: '10A-02', student1: 'Sneha Kulkarni', rollNo2: '9B-02', student2: 'Elena Rostova' },
      { benchNo: 'Row 1 • Bench 3', rollNo1: '10A-03', student1: 'Aditya Birla', rollNo2: '9B-03', student2: 'David Kim' },
      { benchNo: 'Row 2 • Bench 1', rollNo1: '10A-04', student1: 'Priya Sharma', rollNo2: '9B-04', student2: 'Fatima Al-Mansoor' },
      { benchNo: 'Row 2 • Bench 2', rollNo1: '10A-05', student1: 'Rahul Sen', rollNo2: '9B-05', student2: 'Leo Dupont' },
      { benchNo: 'Row 2 • Bench 3', rollNo1: '10A-06', student1: 'Kavita Nair', rollNo2: '9B-06', student2: 'Zara Qureshi' }
    ]
  };

  // Question Paper Submissions
  const [submissions, setSubmissions] = useState([
    {
      id: 'SUB-901',
      title: 'Class 10-A Mathematics Midterm Paper (Set A & B)',
      subject: 'Mathematics',
      submittedDate: '2026-09-28',
      moderator: 'Dr. Alok Verma (HOD Science & Math)',
      status: 'Approved & Sealed',
      printQuota: '60 Copies Printed'
    },
    {
      id: 'SUB-902',
      title: 'Class 9-B Physics Theory & Diagrammatic Set',
      subject: 'Physics',
      submittedDate: '2026-10-01',
      moderator: 'Dr. Sunita Rao (Examination Controller)',
      status: 'Submitted for Moderation',
      printQuota: 'Pending Moderation Approval'
    }
  ]);

  // Results Verification Status
  const [verifications, setVerifications] = useState([
    {
      id: 'VER-1',
      exam: 'Term 1 Unit Diagnostic Test',
      classGrade: 'Class 8-A',
      subject: 'Mathematics',
      evaluator: currentUser.name,
      totalScripts: 32,
      evaluated: 32,
      verified: true,
      moderatedScoreAverage: '84.2%'
    },
    {
      id: 'VER-2',
      exam: 'Term 1 Mid-Year Practicum',
      classGrade: 'Class 9-B',
      subject: 'Physics',
      evaluator: currentUser.name,
      totalScripts: 28,
      evaluated: 28,
      verified: false,
      moderatedScoreAverage: '79.6%'
    }
  ]);

  const handleConfirmDuty = (dutyId: string) => {
    setDuties(prev =>
      prev.map(d => (d.id === dutyId ? { ...d, status: 'Confirmed' } : d))
    );
    showToast('Invigilation duty confirmed with the Examination Cell.');
  };

  const handleReportDuty = (dutyId: string) => {
    setDuties(prev =>
      prev.map(d => (d.id === dutyId ? { ...d, status: 'Reported' } : d))
    );
    showToast('Reported to Examination Hall! Attendance recorded.');
  };

  const handleVerifyResult = (id: string, exam: string) => {
    setVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, verified: true } : v))
    );
    showToast(`Marks and tabulation sheet verified for ${exam}. Ready for publishing.`);
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Verified Examination Results: ${exam}`,
      details: 'Signed off on moderated scores and final grade sheet.',
      category: 'academic'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Examination & Invigilation Control Hub
              </h2>
              <p className="text-xs text-slate-500">
                Manage invigilation duties, seating plans, question paper moderation, and result verification.
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
            <span>Print Duty Roster</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        {[
          { id: 'invigilation', label: 'My Invigilation Duties', icon: ShieldCheck, badge: duties.length },
          { id: 'seating', label: 'Seating Arrangements', icon: MapPin, badge: null },
          { id: 'paper-submission', label: 'Question Paper Submissions', icon: FileText, badge: submissions.length },
          { id: 'verification', label: 'Result Verification & Sign-off', icon: CheckCircle2, badge: null },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: INVIGILATION DUTIES */}
      {activeTab === 'invigilation' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {duties.map(duty => (
              <div
                key={duty.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {duty.role}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        duty.status === 'Reported' || duty.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : duty.status === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {duty.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{duty.examName}</h3>
                    <div className="text-xs text-[#3d5ee1] font-semibold mt-0.5">{duty.subject}</div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{duty.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{duty.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{duty.hallName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{duty.classGrade} ({duty.totalStudents} Candidates)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  {duty.status === 'Assigned' && (
                    <button
                      onClick={() => handleConfirmDuty(duty.id)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm Availability</span>
                    </button>
                  )}
                  {duty.status === 'Confirmed' && (
                    <button
                      onClick={() => handleReportDuty(duty.id)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Report to Hall</span>
                    </button>
                  )}
                  {(duty.status === 'Reported' || duty.status === 'Completed') && (
                    <div className="w-full py-2 bg-slate-100 text-slate-600 font-semibold rounded-xl text-center">
                      Duty Logged & Verified
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SEATING ARRANGEMENT */}
      {activeTab === 'seating' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3d5ee1]" />
                <span>{seatingHall.hallName}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chief Invigilator: <strong>{seatingHall.chiefInvigilator}</strong> • Capacity: {seatingHall.capacity} Desks (Alternating Cohort Pattern)
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Seating Chart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {seatingHall.benches.map(bench => (
              <div
                key={bench.benchNo}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 hover:border-indigo-300 transition-colors"
              >
                <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider text-center bg-slate-200/60 py-0.5 rounded">
                  {bench.benchNo}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-indigo-600 block">{bench.rollNo1}</span>
                    <span className="font-medium text-slate-800 truncate block">{bench.student1}</span>
                    <span className="text-[10px] text-slate-400">Class 10-A</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-emerald-600 block">{bench.rollNo2}</span>
                    <span className="font-medium text-slate-800 truncate block">{bench.student2}</span>
                    <span className="text-[10px] text-slate-400">Class 9-B</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUESTION PAPER SUBMISSIONS */}
      {activeTab === 'paper-submission' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                <tr>
                  <th className="py-3 px-4">Paper Title</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Assigned Moderator</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Print Quota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{sub.title}</td>
                    <td className="py-3 px-4 text-slate-600">{sub.subject}</td>
                    <td className="py-3 px-4 text-slate-500">{sub.submittedDate}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{sub.moderator}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sub.status.includes('Approved')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{sub.printQuota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RESULT VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map(v => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{v.exam}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {v.classGrade} • {v.subject}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      v.verified
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {v.verified ? 'Verified & Locked' : 'Pending Verification'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">Scripts Evaluated</div>
                    <div className="font-bold text-slate-800">{v.evaluated}/{v.totalScripts}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Class Average</div>
                    <div className="font-bold text-indigo-600">{v.moderatedScoreAverage}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Evaluator</div>
                    <div className="font-bold text-slate-800 truncate">{v.evaluator}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  {!v.verified ? (
                    <button
                      onClick={() => handleVerifyResult(v.id, v.exam)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sign-off & Verify Results</span>
                    </button>
                  ) : (
                    <div className="w-full text-center text-slate-400 font-semibold py-1">
                      Tabulation Sealed for Report Card Generation
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

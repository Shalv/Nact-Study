import React, { useState } from 'react';
import {
  ExternalLink,
  GraduationCap,
  UserCheck,
  BookOpen,
  CreditCard,
  Calendar,
  Contact,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  Upload,
  FileText,
  User,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  ChevronRight,
  Info,
  Sliders,
  Printer,
  Download,
  Award,
  Layers,
  Check,
  X,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasterItem, SystemMasters } from '../../types';

export const PreskoolFormCenter: React.FC = () => {
  const {
    addLead,
    addCourse,
    showToast,
    users,
    courses,
    systemMasters,
    addMasterItem,
    setActiveModule,
    instituteProfile,
  } = useApp();

  const [activeFormTab, setActiveFormTab] = useState<
    'student' | 'teacher' | 'course' | 'fees' | 'exam' | 'inquiry'
  >('student');

  // Quick Master Option Modal State
  const [quickMasterCategory, setQuickMasterCategory] = useState<keyof SystemMasters | null>(null);
  const [quickMasterName, setQuickMasterName] = useState('');
  const [quickMasterCode, setQuickMasterCode] = useState('');

  // Generated receipt & ID Card preview modal state
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  // Form states: 1. Student Admission Form (PreSkool Detailed Form Style)
  const [studentForm, setStudentForm] = useState({
    // Basic Information
    firstName: 'Aarav',
    lastName: 'Patel',
    gender: 'Male',
    dob: '2004-08-14',
    rollNo: 'AI-2026-104',
    bloodGroup: 'B+',
    religion: 'General',
    category: 'Merit Fellowship Scholar (20% Waiver)',
    email: 'aarav.patel@gmail.com',
    phone: '+91 98777 88990',
    admissionDate: '2026-10-02',
    admissionNo: 'ADM-9042',
    // Academic Details
    academicYear: '2026 - 2027',
    classGrade: 'Post-Graduate Diploma (AI & Data Science)',
    section: 'Cohort Batch A (Morning 09:00 - 13:00)',
    // Parent Information
    fatherName: 'Vikram Patel',
    fatherPhone: '+91 98222 11000',
    fatherOccupation: 'Senior Mechanical Engineer',
    motherName: 'Sunita Patel',
    motherPhone: '+91 98222 11001',
    address: 'Flat 402, Royal Palms Heights, Whitefield, Bengaluru, Karnataka 560066',
    // Previous school
    prevSchool: 'National Institute of Technology, Surat',
    prevPercentage: '84.6%',
    tcNumber: 'TC-2026-881',
    // Fees & transport
    feeGroup: 'Comprehensive Tuition & Cloud Compute Quota (₹28,800)',
    hostelRequired: false,
    transportRoute: 'None (Remote Hybrid)'
  });

  // Form states: 2. Teacher Form
  const [teacherForm, setTeacherForm] = useState({
    teacherId: 'TCH-409',
    name: 'Dr. Priya Sundaram',
    gender: 'Female',
    dob: '1987-03-22',
    bloodGroup: 'O+',
    phone: '+91 98450 12399',
    email: 'priya.sundaram@nactstudy.com',
    joiningDate: '2026-08-01',
    qualification: 'Ph.D. in Quantitative Finance (IIM Bangalore), CFA Charterholder',
    experienceYears: 12,
    department: 'Department of Corporate Valuation & Financial Tech',
    designation: 'Senior Professor of Practice',
    salary: '₹1,80,000 / month',
    epfNumber: 'EPF-IND-KA-991204',
    bankAccount: 'HDFC Bank - 5010029481920',
    ifsc: 'HDFC0000128'
  });

  // Form states: 3. Course Form
  const [courseForm, setCourseForm] = useState({
    courseCode: 'NACT-MLOPS-601',
    courseTitle: 'Production MLOps, Kubernetes & Distributed AI Systems',
    category: 'Post-Graduate Diploma (AI & Data Science)',
    department: 'Department of Artificial Intelligence & Data Systems',
    credits: 8,
    facultyName: 'Vikramaditya Roy',
    durationWeeks: 16,
    maxCapacity: 80,
    price: 34000,
    labAccess: true,
    passingCriteria: 75,
    description: 'End-to-end container orchestration, model registries, CI/CD pipelines, and cloud GPU cluster optimization.'
  });

  // Form states: 4. Fees Collection Form
  const [feeForm, setFeeForm] = useState({
    studentId: 'Aarav Patel (ADM-9042)',
    feeGroup: 'Comprehensive Tuition & Cloud Compute Quota (₹28,800)',
    dueDate: '2026-10-15',
    baseAmount: 28800,
    scholarshipDiscount: 4000,
    netPayable: 24800,
    paymentMode: 'Instant UPI / QR Code (PhonePe, GooglePay, Paytm)',
    transactionRef: 'UPI-TXN-9842104992',
    paymentStatus: 'Paid'
  });

  // Form states: 5. Examination Form
  const [examForm, setExamForm] = useState({
    examName: 'Mid-Term Capstone & Mathematical Evaluation',
    classGrade: 'Post-Graduate Diploma (AI & Data Science)',
    subject: 'Transformer Architectures & Self-Attention Mechanics',
    examDate: '2026-10-24',
    startTime: '10:00 AM',
    durationHours: 3,
    room: 'High-Performance Cloud GPU Cluster 01',
    maxMarks: 100,
    passMarks: 60,
  });

  // Form states: 6. Inquiry / Lead Form
  const [inquiryForm, setInquiryForm] = useState({
    studentName: 'Rohan Deshpande',
    parentName: 'Sanjay Deshpande',
    phone: '+91 98111 44552',
    email: 'rohan.d@fintechcloud.io',
    city: 'Hyderabad',
    targetCourse: 'Post-Graduate Diploma (AI & Data Science)',
    source: 'Meta Ads (Instagram & Facebook Lead Form)',
    counselor: 'Pooja Kashyap',
    priority: 'High',
    followUpDate: '2026-10-03',
    notes: 'Inquired about GPU lab hours and Saturday live cohort flexibility.'
  });

  const handleQuickAddMaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMasterCategory || !quickMasterName.trim()) return;

    const code = quickMasterCode.trim() || `OPT-${Math.floor(100 + Math.random() * 900)}`;
    addMasterItem(quickMasterCategory, {
      code,
      name: quickMasterName.trim(),
      status: 'active',
      description: 'Created on the fly from Admission / Form Center'
    });

    showToast(`Added "${quickMasterName}" to master list!`);

    // If it was a class or section, auto-select it in current form
    if (quickMasterCategory === 'classes') {
      setStudentForm(prev => ({ ...prev, classGrade: quickMasterName }));
    } else if (quickMasterCategory === 'sections') {
      setStudentForm(prev => ({ ...prev, section: quickMasterName }));
    } else if (quickMasterCategory === 'feeGroups') {
      setStudentForm(prev => ({ ...prev, feeGroup: quickMasterName }));
    }

    setQuickMasterCategory(null);
    setQuickMasterName('');
    setQuickMasterCode('');
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Student record for ${studentForm.firstName} ${studentForm.lastName} (${studentForm.admissionNo}) saved successfully!`);
    setShowIdCardModal(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Faculty record for ${teacherForm.name} (${teacherForm.teacherId}) added to roster.`);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      id: `crs-${Date.now()}`,
      code: courseForm.courseCode,
      title: courseForm.courseTitle,
      category: courseForm.category,
      subcategory: courseForm.department,
      creatorName: 'Dr. Rajesh Sharma',
      facultyName: courseForm.facultyName,
      shortDescription: courseForm.description,
      fullDescription: courseForm.description,
      thumbnail: '/src/assets/images/course_data_science_1790950655440.jpg',
      banner: '/src/assets/images/course_data_science_1790950655440.jpg',
      introVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'Hybrid',
      isFree: false,
      price: courseForm.price,
      discountPercentage: 15,
      finalPrice: Math.round(courseForm.price * 0.85),
      installmentAvailable: true,
      validityDays: 180,
      enrollmentLimit: courseForm.maxCapacity,
      enrolledStudentsCount: 0,
      isPublished: true,
      isCertificateEnabled: true,
      modules: [],
      assignments: [],
      quizzes: [],
      liveClasses: []
    });
    showToast(`Course "${courseForm.courseTitle}" published to catalog.`);
  };

  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Fee payment of ₹${feeForm.netPayable.toLocaleString('en-IN')} recorded with receipt.`);
    setShowReceiptModal(true);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Exam schedule for "${examForm.examName}" published.`);
  };

  const handleSaveInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      name: inquiryForm.studentName,
      mobile: inquiryForm.phone,
      whatsapp: inquiryForm.phone,
      email: inquiryForm.email,
      city: inquiryForm.city,
      state: 'Telangana',
      source: 'Meta Ads',
      campaign: 'PreSkool_Detailed_Inquiry_Form',
      interestedProduct: inquiryForm.targetCourse,
      productId: 'crs-1',
      productType: 'Course',
      budget: 28800,
      stage: 'new',
      assignedCounselorId: 'usr-4',
      assignedCounselorName: inquiryForm.counselor,
      priority: 'High',
      qualification: 'B.Tech',
      experienceYears: 2,
      occupation: 'Software Engineer',
      nextFollowUpDate: inquiryForm.followUpDate,
      nextFollowUpTime: '11:00',
      followUpType: 'WhatsApp',
      remarks: inquiryForm.notes
    });
    showToast(`Inquiry captured & assigned to ${inquiryForm.counselor}.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto bg-[#f7f7fa] min-h-screen">
      {/* Consolidated ERP Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => setActiveModule('dashboard')}>Home</span>
            <span>/</span>
            <span className="text-[#3d5ee1] font-semibold">Form Reference Center</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Admissions & Academic Administration Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Nact Study detailed forms for student admission, faculty onboarding, class curriculum, fees collection, and lead inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveModule('masters')}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>All Masters Hub (15 Masters)</span>
          </button>

          <button
            onClick={() => setActiveFormTab('student')}
            className="px-3.5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>+ Student Admission</span>
          </button>
        </div>
      </div>

      {/* Form Navigation Tabs (PreSkool Detailed Form Templates) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveFormTab('student')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'student'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Admission Form (add-student.html)</span>
        </button>

        <button
          onClick={() => setActiveFormTab('teacher')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'teacher'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Teacher Onboarding (add-teacher.html)</span>
        </button>

        <button
          onClick={() => setActiveFormTab('course')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'course'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Course / Class Master (add-class.html)</span>
        </button>

        <button
          onClick={() => setActiveFormTab('fees')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'fees'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fees Collection (fees-collections.html)</span>
        </button>

        <button
          onClick={() => setActiveFormTab('exam')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'exam'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Exam Schedule (add-exam.html)</span>
        </button>

        <button
          onClick={() => setActiveFormTab('inquiry')}
          className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeFormTab === 'inquiry'
              ? 'bg-[#3d5ee1] text-white shadow-2xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Contact className="w-4 h-4" />
          <span>Admissions Inquiry & CRM Lead (add-lead.html)</span>
        </button>
      </div>

      {/* FORM 1: Student Admission Form (PreSkool Detailed Form Style with 5 Multi-Part Sections) */}
      {activeFormTab === 'student' && (
        <form onSubmit={handleSaveStudent} className="space-y-6">
          {/* Card 1: Student Basic Information */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Student Personal Information</h3>
                  <p className="text-[11px] text-slate-500">Official identity, contact, blood group, and category</p>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-400">PreSkool Reference: add-student.html</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">First Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={studentForm.firstName}
                  onChange={e => setStudentForm({ ...studentForm, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Last Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={studentForm.lastName}
                  onChange={e => setStudentForm({ ...studentForm, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Gender <span className="text-rose-500">*</span></label>
                <select
                  value={studentForm.gender}
                  onChange={e => setStudentForm({ ...studentForm, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Date of Birth <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  required
                  value={studentForm.dob}
                  onChange={e => setStudentForm({ ...studentForm, dob: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Blood Group</label>
                </div>
                <select
                  value={studentForm.bloodGroup}
                  onChange={e => setStudentForm({ ...studentForm, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-mono"
                >
                  {systemMasters.bloodGroups.map(bg => (
                    <option key={bg.id} value={bg.code}>
                      {bg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Quota / Category</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('studentCategories');
                      setQuickMasterCode('CAT-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add
                  </button>
                </div>
                <select
                  value={studentForm.category}
                  onChange={e => setStudentForm({ ...studentForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.studentCategories.map(sc => (
                    <option key={sc.id} value={sc.name}>
                      {sc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Primary Email <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  required
                  value={studentForm.email}
                  onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone / WhatsApp <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={studentForm.phone}
                  onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Admission Number</label>
                <input
                  type="text"
                  value={studentForm.admissionNo}
                  onChange={e => setStudentForm({ ...studentForm, admissionNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono bg-slate-50 font-semibold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={studentForm.rollNo}
                  onChange={e => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Academic & Cohort Allocation (Connected to Masters) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Academic Details & Cohort Allocation</h3>
                  <p className="text-[11px] text-slate-500">Live linked to Classes, Sections & Academic Year Masters</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModule('masters')}
                className="text-xs font-semibold text-[#3d5ee1] hover:underline flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure Options in Masters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Academic Year <span className="text-rose-500">*</span></label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('academicYears');
                      setQuickMasterCode('AY-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Year
                  </button>
                </div>
                <select
                  value={studentForm.academicYear}
                  onChange={e => setStudentForm({ ...studentForm, academicYear: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-mono font-semibold"
                >
                  {systemMasters.academicYears.map(ay => (
                    <option key={ay.id} value={ay.name}>
                      {ay.name} ({ay.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Class / Program <span className="text-rose-500">*</span></label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('classes');
                      setQuickMasterCode('CLS-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Class
                  </button>
                </div>
                <select
                  value={studentForm.classGrade}
                  onChange={e => setStudentForm({ ...studentForm, classGrade: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  {systemMasters.classes.map(cls => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Section / Cohort Batch</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('sections');
                      setQuickMasterCode('SEC-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Section
                  </button>
                </div>
                <select
                  value={studentForm.section}
                  onChange={e => setStudentForm({ ...studentForm, section: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.sections.map(sec => (
                    <option key={sec.id} value={sec.name}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 3: Parents & Guardian Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Parent & Guardian Information</h3>
                  <p className="text-[11px] text-slate-500">Emergency contact and billing correspondence</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Father / Primary Guardian Name</label>
                <input
                  type="text"
                  value={studentForm.fatherName}
                  onChange={e => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Father's Mobile Number</label>
                <input
                  type="text"
                  value={studentForm.fatherPhone}
                  onChange={e => setStudentForm({ ...studentForm, fatherPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Occupation</label>
                <input
                  type="text"
                  value={studentForm.fatherOccupation}
                  onChange={e => setStudentForm({ ...studentForm, fatherOccupation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-medium text-slate-700 mb-1">Residential & Permanent Address</label>
                <textarea
                  rows={2}
                  value={studentForm.address}
                  onChange={e => setStudentForm({ ...studentForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Fee Structure & Concessions (Connected to Masters) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Fee Group & Billing Plan Allocation</h3>
                  <p className="text-[11px] text-slate-500">Live linked to Fee Group & Payment Mode Masters</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuickMasterCategory('feeGroups');
                  setQuickMasterCode('FEE-');
                }}
                className="text-xs font-semibold text-[#3d5ee1] hover:underline"
              >
                + Add Fee Group Option
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Allocated Fee Structure <span className="text-rose-500">*</span></label>
                <select
                  value={studentForm.feeGroup}
                  onChange={e => setStudentForm({ ...studentForm, feeGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  {systemMasters.feeGroups.map(fg => (
                    <option key={fg.id} value={fg.name}>
                      {fg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Transport / Commute Route</label>
                <select
                  value={studentForm.transportRoute}
                  onChange={e => setStudentForm({ ...studentForm, transportRoute: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="None (Remote Hybrid)">None (Remote Hybrid)</option>
                  <option value="Route 1 (Whitefield Campus Shuttle)">Route 1 (Whitefield Campus Shuttle)</option>
                  <option value="Route 2 (Electronic City Tech Bus)">Route 2 (Electronic City Tech Bus)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>All mandatory fields marked with (<span className="text-rose-500">*</span>) are validated.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStudentForm({ ...studentForm, firstName: 'Kiran', lastName: 'Mehta', admissionNo: 'ADM-9104' })}
                className="px-3 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors"
              >
                Auto-Fill Sample
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg text-xs font-bold shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Student Record & Generate ID</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FORM 2: Teacher Onboarding Form */}
      {activeFormTab === 'teacher' && (
        <form onSubmit={handleSaveTeacher} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Faculty & Academic Staff Onboarding</h3>
                <p className="text-[11px] text-slate-500">PreSkool Reference: add-teacher.html</p>
              </div>
              <span className="font-mono text-xs text-slate-400">ID: {teacherForm.teacherId}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Faculty Full Name *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={teacherForm.email}
                  onChange={e => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Mobile Contact *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.phone}
                  onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Academic Department</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('departments');
                      setQuickMasterCode('DEPT-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Dept
                  </button>
                </div>
                <select
                  value={teacherForm.department}
                  onChange={e => setTeacherForm({ ...teacherForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.departments.map(dept => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Designation & Academic Rank</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('staffDesignations');
                      setQuickMasterCode('DES-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Rank
                  </button>
                </div>
                <select
                  value={teacherForm.designation}
                  onChange={e => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.staffDesignations.map(des => (
                    <option key={des.id} value={des.name}>
                      {des.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Monthly Remuneration</label>
                <input
                  type="text"
                  value={teacherForm.salary}
                  onChange={e => setTeacherForm({ ...teacherForm, salary: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-medium text-slate-700 mb-1">Qualifications & Industry Experience</label>
                <textarea
                  rows={2}
                  value={teacherForm.qualification}
                  onChange={e => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg text-xs font-bold transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Faculty Profile</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FORM 3: Course / Class Master Form */}
      {activeFormTab === 'course' && (
        <form onSubmit={handleSaveCourse} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Course & Class Curriculum Specification</h3>
                <p className="text-[11px] text-slate-500">PreSkool Reference: add-course.html / add-class.html</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Course Code *</label>
                <input
                  type="text"
                  required
                  value={courseForm.courseCode}
                  onChange={e => setCourseForm({ ...courseForm, courseCode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.courseTitle}
                  onChange={e => setCourseForm({ ...courseForm, courseTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Associated Class / Program</label>
                <select
                  value={courseForm.category}
                  onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.classes.map(cls => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Hosting Department</label>
                <select
                  value={courseForm.department}
                  onChange={e => setCourseForm({ ...courseForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.departments.map(dept => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Course Fee (₹) *</label>
                <input
                  type="number"
                  required
                  value={courseForm.price}
                  onChange={e => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-medium text-slate-700 mb-1">Description & Learning Outcomes</label>
                <textarea
                  rows={2}
                  value={courseForm.description}
                  onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Course & Publish</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FORM 4: Fees Collection Form & Receipt Generator */}
      {activeFormTab === 'fees' && (
        <form onSubmit={handleSaveFee} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Fee Collection & Automated Receipt Dispatch</h3>
                <p className="text-[11px] text-slate-500">PreSkool Reference: fees-collections.html</p>
              </div>
              <span className="font-mono text-emerald-600 font-bold">UPI / Gateway Live</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Student Record *</label>
                <input
                  type="text"
                  required
                  value={feeForm.studentId}
                  onChange={e => setFeeForm({ ...feeForm, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Fee Structure Allocation</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('feeGroups');
                      setQuickMasterCode('FEE-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Group
                  </button>
                </div>
                <select
                  value={feeForm.feeGroup}
                  onChange={e => setFeeForm({ ...feeForm, feeGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.feeGroups.map(fg => (
                    <option key={fg.id} value={fg.name}>
                      {fg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={feeForm.dueDate}
                  onChange={e => setFeeForm({ ...feeForm, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Base Tuition (₹)</label>
                <input
                  type="number"
                  value={feeForm.baseAmount}
                  onChange={e => setFeeForm({ ...feeForm, baseAmount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Scholarship / Waiver (₹)</label>
                <input
                  type="number"
                  value={feeForm.scholarshipDiscount}
                  onChange={e => setFeeForm({ ...feeForm, scholarshipDiscount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-emerald-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Net Payable Amount (₹)</label>
                <input
                  type="number"
                  value={feeForm.netPayable}
                  onChange={e => setFeeForm({ ...feeForm, netPayable: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 bg-slate-50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Payment Channel / Mode</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('feePaymentModes');
                      setQuickMasterCode('PAY-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Mode
                  </button>
                </div>
                <select
                  value={feeForm.paymentMode}
                  onChange={e => setFeeForm({ ...feeForm, paymentMode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.feePaymentModes.map(pm => (
                    <option key={pm.id} value={pm.name}>
                      {pm.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Transaction Ref / UTR</label>
                <input
                  type="text"
                  value={feeForm.transactionRef}
                  onChange={e => setFeeForm({ ...feeForm, transactionRef: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Confirm Fee & View Printable Receipt</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FORM 5: Exam Schedule Form */}
      {activeFormTab === 'exam' && (
        <form onSubmit={handleSaveExam} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Examination Schedule & Room Allocation</h3>
                <p className="text-[11px] text-slate-500">PreSkool Reference: add-exam.html / exam-routine.html</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Exam Type *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('examTypes');
                      setQuickMasterCode('EXAM-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Type
                  </button>
                </div>
                <select
                  value={examForm.examName}
                  onChange={e => setExamForm({ ...examForm, examName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  {systemMasters.examTypes.map(et => (
                    <option key={et.id} value={et.name}>
                      {et.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Class / Program</label>
                <select
                  value={examForm.classGrade}
                  onChange={e => setExamForm({ ...examForm, classGrade: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.classes.map(cls => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject</label>
                <select
                  value={examForm.subject}
                  onChange={e => setExamForm({ ...examForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.subjects.map(sub => (
                    <option key={sub.id} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Examination Date</label>
                <input
                  type="date"
                  value={examForm.examDate}
                  onChange={e => setExamForm({ ...examForm, examDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Room / Cloud Cluster</label>
                <select
                  value={examForm.room}
                  onChange={e => setExamForm({ ...examForm, room: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.rooms.map(rm => (
                    <option key={rm.id} value={rm.name}>
                      {rm.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Max Marks</label>
                <input
                  type="number"
                  value={examForm.maxMarks}
                  onChange={e => setExamForm({ ...examForm, maxMarks: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Publish Exam Schedule</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FORM 6: Admissions Inquiry Form */}
      {activeFormTab === 'inquiry' && (
        <form onSubmit={handleSaveInquiry} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Admissions Inquiry & Lead Registration</h3>
                <p className="text-[11px] text-slate-500">PreSkool Reference: add-lead.html / Inquiries Register</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Prospective Student Name *</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.studentName}
                  onChange={e => setInquiryForm({ ...inquiryForm, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">WhatsApp / Contact Phone *</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.phone}
                  onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={inquiryForm.email}
                  onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">City / Region</label>
                <input
                  type="text"
                  value={inquiryForm.city}
                  onChange={e => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Academic Program</label>
                <select
                  value={inquiryForm.targetCourse}
                  onChange={e => setInquiryForm({ ...inquiryForm, targetCourse: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.classes.map(cls => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-medium text-slate-700">Inbound Lead Source</label>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickMasterCategory('leadSources');
                      setQuickMasterCode('SRC-');
                    }}
                    className="text-[#3d5ee1] font-semibold text-[10px] hover:underline"
                  >
                    + Add Source
                  </button>
                </div>
                <select
                  value={inquiryForm.source}
                  onChange={e => setInquiryForm({ ...inquiryForm, source: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  {systemMasters.leadSources.map(ls => (
                    <option key={ls.id} value={ls.name}>
                      {ls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Assigned Admissions Counselor</label>
                <select
                  value={inquiryForm.counselor}
                  onChange={e => setInquiryForm({ ...inquiryForm, counselor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  <option value="Pooja Kashyap">Pooja Kashyap (Admissions Lead)</option>
                  <option value="Rohan Mehra">Rohan Mehra (Tech Counselor)</option>
                  <option value="Anita Sen">Anita Sen (Executive Dean)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Counseling Discussion Notes & Requirement</label>
                <textarea
                  rows={2}
                  value={inquiryForm.notes}
                  onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Register Inquiry in Pipeline</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* QUICK MASTER CREATION MODAL (Allows adding ANY master option right from the form!) */}
      {quickMasterCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Quick Create Master Option ({quickMasterCategory})
                </h3>
              </div>
              <button
                onClick={() => setQuickMasterCategory(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickAddMaster} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Option Code / Identifier</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CLS-AI-2027"
                  value={quickMasterCode}
                  onChange={e => setQuickMasterCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Option Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive AI Engineering Cohort"
                  value={quickMasterName}
                  onChange={e => setQuickMasterName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickMasterCategory(null)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-semibold rounded-lg shadow-sm"
                >
                  Save & Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT ID CARD MODAL */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden text-xs">
            <div className="bg-[#3d5ee1] text-white p-4 text-center relative">
              <button
                onClick={() => setShowIdCardModal(false)}
                className="absolute right-3 top-3 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-100">{instituteProfile.name}</div>
              <div className="text-sm font-bold mt-0.5">Official Student Identity Card</div>
            </div>

            <div className="p-5 space-y-4 text-center">
              <div className="w-20 h-20 rounded-full mx-auto bg-slate-100 border-2 border-[#3d5ee1] flex items-center justify-center text-slate-400 font-bold text-2xl shadow-inner">
                {studentForm.firstName[0]}{studentForm.lastName[0]}
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">{studentForm.firstName} {studentForm.lastName}</h4>
                <div className="text-[11px] text-slate-500 font-mono">{studentForm.admissionNo} · Roll: {studentForm.rollNo}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Program:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[170px]">{studentForm.classGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Year:</span>
                  <span className="font-mono text-slate-800">{studentForm.academicYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Blood Group:</span>
                  <span className="font-mono font-bold text-rose-600">{studentForm.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Contact:</span>
                  <span className="font-mono text-slate-800">{studentForm.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold flex items-center gap-1.5 text-xs shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
                <button
                  onClick={() => setShowIdCardModal(false)}
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded-lg font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEE RECEIPT MODAL */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Official Tuition Fee Receipt</h3>
                  <div className="text-[10px] text-slate-400 font-mono">Receipt No: REC-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="text-[11px] font-semibold text-slate-800">{instituteProfile.name}</div>
                <div className="text-[10px] text-slate-500">{instituteProfile.address} · GST: 29AABCU9603R1ZM</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-400">Student:</span>
                  <div className="font-semibold text-slate-900">{feeForm.studentId}</div>
                </div>
                <div>
                  <span className="text-slate-400">Payment Date:</span>
                  <div className="font-mono text-slate-800">{new Date().toISOString().split('T')[0]}</div>
                </div>
                <div>
                  <span className="text-slate-400">Fee Group:</span>
                  <div className="text-slate-800 truncate">{feeForm.feeGroup}</div>
                </div>
                <div>
                  <span className="text-slate-400">Transaction Ref:</span>
                  <div className="font-mono text-slate-800 truncate">{feeForm.transactionRef}</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="py-2 px-3">Description</th>
                      <th className="py-2 px-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 px-3">Tuition & Digital Learning Fee</td>
                      <td className="py-2 px-3 text-right font-mono">₹{feeForm.baseAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-emerald-600">Merit Scholarship Concession</td>
                      <td className="py-2 px-3 text-right font-mono text-emerald-600">-₹{feeForm.scholarshipDiscount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-slate-50/75 font-bold">
                      <td className="py-2 px-3 text-slate-900">Total Net Paid</td>
                      <td className="py-2 px-3 text-right font-mono text-slate-900">₹{feeForm.netPayable.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Payment Verified (Razorpay UPI 200 OK)</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold flex items-center gap-1 text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

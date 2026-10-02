import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
  Video,
  FileText,
  FileSpreadsheet,
  Download,
  Printer,
  Play,
  Pause,
  Maximize2,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Search,
  Filter,
  Share2,
  Award,
  ListTodo,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Languages,
  Wand2,
  Bookmark,
  Send,
  RotateCcw,
  Sliders,
  Calendar,
  UserCheck,
  Eye,
  EyeOff,
  Volume2,
  Tag,
  Hash,
  Lightbulb,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// 1. Data Models
export interface ClassGradeOption {
  id: string;
  code: string;
  name: string;
  academicYear: string;
}

export interface SectionOption {
  id: string;
  classId: string;
  name: string;
  room: string;
  classTeacher: string;
  studentCount: number;
}

export interface SubjectOption {
  id: string;
  classId: string;
  code: string;
  name: string;
  teacher: string;
  totalChapters: number;
  completedChapters: number;
}

export interface TopicOption {
  id: string;
  subjectId: string;
  chapterNumber: number;
  chapterName: string;
  chapterNameHindi?: string;
  topicName: string;
  topicNameHindi?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Revision' | 'Assessment Pending';
  durationMinutes: number;
}

export interface HubResourceItem {
  id: string;
  topicId: string;
  title: string;
  titleHindi?: string;
  category: 'video' | 'notes' | 'presentation' | 'worksheet' | 'question_bank' | 'assignment' | 'activity' | 'assessment' | 'lesson_plan' | 'reference';
  typeLabel: string;
  format: string;
  sizeOrDuration: string;
  downloads: number;
  description: string;
  descriptionHindi?: string;
  recommendedSequence: number;
  isCompleted?: boolean;
}

export const TeacherLessonDeliveryHub: React.FC = () => {
  const { showToast, addActivityLog, currentUser, setActiveModule } = useApp();

  // Language Mode: English, Hindi, or Bilingual
  const [languageMode, setLanguageMode] = useState<'en' | 'hi' | 'bilingual'>('bilingual');

  // Dependent Selectors Data
  const classesList: ClassGradeOption[] = [
    { id: 'cls-8', code: 'CLS-08', name: 'Class 8', academicYear: '2026-27' },
    { id: 'cls-9', code: 'CLS-09', name: 'Class 9', academicYear: '2026-27' },
    { id: 'cls-10', code: 'CLS-10', name: 'Class 10', academicYear: '2026-27' },
    { id: 'cls-11', code: 'CLS-11', name: 'Class 11', academicYear: '2026-27' },
    { id: 'cls-12', code: 'CLS-12', name: 'Class 12', academicYear: '2026-27' },
  ];

  const sectionsList: SectionOption[] = [
    { id: 'sec-8a', classId: 'cls-8', name: 'Section 8-A', room: 'Room 302', classTeacher: 'Vikramaditya Roy', studentCount: 32 },
    { id: 'sec-8b', classId: 'cls-8', name: 'Section 8-B', room: 'Room 303', classTeacher: 'Priyanka Sen', studentCount: 30 },
    { id: 'sec-8c', classId: 'cls-8', name: 'Section 8-C', room: 'Room 304', classTeacher: 'Arvind Saxena', studentCount: 28 },
    { id: 'sec-9a', classId: 'cls-9', name: 'Section 9-A', room: 'Room 201', classTeacher: 'Dr. Sunita Rao', studentCount: 34 },
    { id: 'sec-9b', classId: 'cls-9', name: 'Section 9-B', room: 'Science Lab 2', classTeacher: 'Marcus Chen (Rep)', studentCount: 28 },
    { id: 'sec-10a', classId: 'cls-10', name: 'Section 10-A', room: 'Chemistry Lab', classTeacher: 'Dr. Alok Verma', studentCount: 34 },
  ];

  const subjectsList: SubjectOption[] = [
    { id: 'sub-8-sci', classId: 'cls-8', code: 'SCI-08', name: 'Science', teacher: 'Vikramaditya Roy', totalChapters: 16, completedChapters: 7 },
    { id: 'sub-8-math', classId: 'cls-8', code: 'MATH-08', name: 'Mathematics', teacher: 'Vikramaditya Roy', totalChapters: 14, completedChapters: 8 },
    { id: 'sub-8-cs', classId: 'cls-8', code: 'CS-08', name: 'Computer Science & AI', teacher: 'Anita Sen', totalChapters: 10, completedChapters: 6 },
    { id: 'sub-9-phy', classId: 'cls-9', code: 'PHY-09', name: 'Physics', teacher: 'Dr. Sunita Rao', totalChapters: 12, completedChapters: 5 },
    { id: 'sub-10-chem', classId: 'cls-10', code: 'CHEM-10', name: 'Chemistry', teacher: 'Priyanka Sen', totalChapters: 14, completedChapters: 9 },
  ];

  const topicsList: TopicOption[] = [
    {
      id: 'top-light',
      subjectId: 'sub-8-sci',
      chapterNumber: 3,
      chapterName: 'Chapter 3: Light & Reflection',
      chapterNameHindi: 'अध्याय 3: प्रकाश और परावर्तन',
      topicName: 'Laws of Reflection, Regular & Diffused Reflection, Spherical Mirrors',
      topicNameHindi: 'परावर्तन के नियम, नियमित और विसरित परावर्तन, गोलीय दर्पण',
      status: 'In Progress',
      durationMinutes: 40
    },
    {
      id: 'top-force',
      subjectId: 'sub-8-sci',
      chapterNumber: 4,
      chapterName: 'Chapter 4: Force & Pressure',
      chapterNameHindi: 'अध्याय 4: बल और दाब',
      topicName: 'Contact vs Non-Contact Forces, Atmospheric Pressure & Barometer',
      topicNameHindi: 'सम्पर्क और असम्पर्क बल, वायुमंडलीय दबाव',
      status: 'Completed',
      durationMinutes: 45
    },
    {
      id: 'top-linear',
      subjectId: 'sub-8-math',
      chapterNumber: 2,
      chapterName: 'Chapter 2: Linear Equations in One Variable',
      chapterNameHindi: 'अध्याय 2: एक चर वाले रैखिक समीकरण',
      topicName: 'Solving Equations Having Variables on Both Sides & Applications',
      topicNameHindi: 'दोनों पक्षों में चर वाले समीकरणों को हल करना',
      status: 'In Progress',
      durationMinutes: 40
    },
    {
      id: 'top-algo',
      subjectId: 'sub-8-cs',
      chapterNumber: 3,
      chapterName: 'Chapter 3: Algorithms & Flowcharts',
      chapterNameHindi: 'अध्याय 3: एल्गोरिदम और फ़्लोचार्ट',
      topicName: 'Decision Trees, Conditional Branches & Iterative Loops',
      topicNameHindi: 'निर्णय वृक्ष, सशर्त शाखाएं और लूप',
      status: 'Revision',
      durationMinutes: 40
    },
    {
      id: 'top-snell',
      subjectId: 'sub-9-phy',
      chapterNumber: 5,
      chapterName: 'Chapter 5: Refraction of Light',
      chapterNameHindi: 'अध्याय 5: प्रकाश का अपवर्तन',
      topicName: 'Snell’s Law, Refractive Index, and Apparent Depth',
      topicNameHindi: 'स्नेल का नियम, अपवर्तनांक और आभासी गहराई',
      status: 'In Progress',
      durationMinutes: 45
    }
  ];

  // Selected State
  const [selectedClassId, setSelectedClassId] = useState<string>('cls-8');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec-8a');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-8-sci');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-light');

  // Resource Loaded State
  const [isResourcesLoaded, setIsResourcesLoaded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    'all' | 'video' | 'notes' | 'presentation' | 'worksheets' | 'question_bank' | 'assignments' | 'activities' | 'lesson_plan'
  >('all');

  // Search & Filters inside Resource Workspace
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Interactive View Modals
  const [deliveryModeActive, setDeliveryModeActive] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState(0); // 0 to 7
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showPptModal, setShowPptModal] = useState(false);
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);
  const [showPaperGeneratorModal, setShowPaperGeneratorModal] = useState(false);
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showAiAssistantModal, setShowAiAssistantModal] = useState(false);
  const [showCreateResourceModal, setShowCreateResourceModal] = useState(false);

  // Video Player Simulated State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoTimestamp, setVideoTimestamp] = useState('04:15');
  const [teacherVideoNotes, setTeacherVideoNotes] = useState('Pause at 04:30 to ask why incident ray and reflected ray stay in the same normal plane.');

  // Presentation State
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 18;
  const [laserPointerActive, setLaserPointerActive] = useState(false);
  const [presenterMode, setPresenterMode] = useState(false);
  const [pptTimer, setPptTimer] = useState(0);

  // Lesson Plan Duration Structure
  const lessonPlanPhases = [
    { phase: 'Phase 1: Spark & Prior Knowledge', duration: '5 min', desc: 'Ask students about mirrors in cars & vanity cabinets', status: 'Done' },
    { phase: 'Phase 2: Core Concept Exposition', duration: '10 min', desc: 'State Law 1 (Angle i = Angle r) & Normal line construct', status: 'Done' },
    { phase: 'Phase 3: Interactive Video / PPT', duration: '15 min', desc: 'Run animated optical ray tracing demo on smartboard', status: 'Current' },
    { phase: 'Phase 4: Socratic Lab Activity', duration: '10 min', desc: 'Teams of 2 verify reflection with laser pointer & plane mirror', status: 'Upcoming' },
    { phase: 'Phase 5: Quick Formative Exit Ticket', duration: '5 min', desc: '3 MCQ buzzer round to assess learning outcomes', status: 'Upcoming' },
  ];

  // Question Paper Generator State
  const [selectedPaperQuestions, setSelectedPaperQuestions] = useState<string[]>(['Q1', 'Q2', 'Q3', 'Q4']);
  const [paperTotalMarks, setPaperTotalMarks] = useState(25);
  const [paperDuration, setPaperDuration] = useState(45);

  // Filtered Options
  const availableSections = sectionsList.filter(s => s.classId === selectedClassId);
  const availableSubjects = subjectsList.filter(s => s.classId === selectedClassId);
  const availableTopics = topicsList.filter(t => t.subjectId === selectedSubjectId);

  // Current Selections
  const currentClass = classesList.find(c => c.id === selectedClassId);
  const currentSection = sectionsList.find(s => s.id === selectedSectionId);
  const currentSubject = subjectsList.find(s => s.id === selectedSubjectId);
  const currentTopic = topicsList.find(t => t.id === selectedTopicId) || topicsList[0];

  // Comprehensive Resource Registry
  const [resources, setResources] = useState<HubResourceItem[]>([
    {
      id: 'RES-VID-1',
      topicId: 'top-light',
      title: 'Laws of Reflection & Ray Tracing Masterclass',
      titleHindi: 'परावर्तन के नियम एवं किरण आरेखन मास्टरक्लास',
      category: 'video',
      typeLabel: 'Video Lecture (4K)',
      format: 'MP4 Video',
      sizeOrDuration: '14 min 30 sec',
      downloads: 84,
      recommendedSequence: 1,
      description: 'High-definition optical bench demonstration illustrating angle of incidence equality with normal perpendicular.',
      descriptionHindi: 'आपतन कोण तथा अभिलम्ब के साथ परावर्तन कोण की समानता को दर्शाने वाला विस्तृत 4K वीडियो व्याख्यान।',
      isCompleted: true
    },
    {
      id: 'RES-NOTE-1',
      topicId: 'top-light',
      title: 'Key Definitions, Formulas & Snell Ray Ray Tracing Guide',
      titleHindi: 'महत्वपूर्ण परिभाषाएं, सूत्र और आरेख हैंडआउट',
      category: 'notes',
      typeLabel: 'Structured Lecture Notes',
      format: 'PDF & HTML',
      sizeOrDuration: '12 Pages • 3.4 MB',
      downloads: 142,
      recommendedSequence: 2,
      description: 'Curated teacher notes containing Ray diagrams, common mistakes in normal angle measurements, and board exam tips.',
      descriptionHindi: 'अध्यापक नोट्स जिनमें किरण आरेख, सामान्य त्रुटियाँ एवं बोर्ड परीक्षा के महत्वपूर्ण बिंदु शामिल हैं।'
    },
    {
      id: 'RES-PPT-1',
      topicId: 'top-light',
      title: 'Interactive Smartboard Slide Deck: Light & Reflection',
      titleHindi: 'स्मार्टबोर्ड इंटरैक्टिव स्लाइड डेक: प्रकाश और परावर्तन',
      category: 'presentation',
      typeLabel: 'Presentation Slides',
      format: 'PPTX (18 Slides)',
      sizeOrDuration: '18 Slides • 16.2 MB',
      downloads: 98,
      recommendedSequence: 3,
      description: 'Animated step-by-step ray tracing visuals, embedded interactive quizzes, and speaker notes.',
      descriptionHindi: 'एनिमेटेड किरण आरेख, अंतर्निहित प्रश्नोत्तरी और वक्ता नोट्स के साथ 18 स्लाइड प्रस्तुति।'
    },
    {
      id: 'RES-WS-1',
      topicId: 'top-light',
      title: 'Classwork & Homework Worksheet: Ray Construction Drill',
      titleHindi: 'कक्षा अभ्यास और गृहकार्य कार्यपत्रक: आरेख निर्माण',
      category: 'worksheet',
      typeLabel: 'Graded Worksheet',
      format: 'Printable PDF',
      sizeOrDuration: '4 Pages • 15 Questions',
      downloads: 110,
      recommendedSequence: 4,
      description: 'Differentiated worksheet divided into Foundation, Standard, and Olympiad Level ray tracing puzzles with answer key.',
      descriptionHindi: 'आधारभूत, मानक और ओलंपियाड स्तर के प्रश्नों के साथ उत्तर कुंजी सहित कार्यपत्रक।'
    },
    {
      id: 'RES-QB-1',
      topicId: 'top-light',
      title: 'Curated Question Bank & Instant Exam Generator (60 Items)',
      titleHindi: 'प्रश्न बैंक एवं परीक्षा प्रश्न पत्र जनरेटर (60 प्रश्न)',
      category: 'question_bank',
      typeLabel: 'Institutional Question Bank',
      format: 'Q-Bank Repo',
      sizeOrDuration: '60 Questions',
      downloads: 72,
      recommendedSequence: 5,
      description: 'Includes MCQs, Assertion-Reason, Short Answer, Diagrammatic Construction, and Case-Based reasoning questions.',
      descriptionHindi: 'बहुविकल्पीय, अभिकथन-कारण, लघु उत्तरीय एवं केस-आधारित प्रश्नों का व्यापक संग्रह।'
    },
    {
      id: 'RES-ASG-1',
      topicId: 'top-light',
      title: 'Take-Home Project: Build a Periscope with 45° Plane Mirrors',
      titleHindi: 'प्रोजेक्ट: 45° समतल दर्पणों से पेरिस्कोप का निर्माण',
      category: 'assignment',
      typeLabel: 'Classroom Assignment',
      format: 'Project Rubric',
      sizeOrDuration: 'Due in 5 Days • 20 Marks',
      downloads: 65,
      recommendedSequence: 6,
      description: 'Hands-on STEM activity rubric where students build a cardboard periscope to demonstrate multiple reflection.',
      descriptionHindi: 'व्यावहारिक स्टेम परियोजना जिसमें छात्र बहुविध परावर्तन का प्रदर्शन करने के लिए पेरिस्कोप बनाते हैं।'
    },
    {
      id: 'RES-ACT-1',
      topicId: 'top-light',
      title: 'Socratic Mirror & Laser Pointer Classroom Experiment',
      titleHindi: 'दर्पण और लेज़र पॉइंटर व्यावहारिक कक्षा गतिविधि',
      category: 'activity',
      typeLabel: 'Classroom Activity',
      format: 'Activity Guide',
      sizeOrDuration: '15 min Duration',
      downloads: 54,
      recommendedSequence: 7,
      description: 'Pairs of students use protractors and safe optical laser pointers to experimentally prove Angle i = Angle r on graphing paper.',
      descriptionHindi: 'छात्र ग्राफ पेपर पर लेज़र पॉइंटर और चाँदे की सहायता से आपतन कोण और परावर्तन कोण की समानता सिद्ध करते हैं।'
    },
    {
      id: 'RES-LP-1',
      topicId: 'top-light',
      title: 'CBSE Compliant 40-Minute Daily Pedagogical Lesson Plan',
      titleHindi: '40 मिनट की दैनिक पाठ योजना (CBSE आधारित)',
      category: 'lesson_plan',
      typeLabel: 'Lesson Plan & Syllabus',
      format: 'Structured Template',
      sizeOrDuration: '40 min Breakdown',
      downloads: 89,
      recommendedSequence: 8,
      description: 'Detailed lesson structure encompassing prior knowledge hook, main exposition, lab check, and exit ticket assessment.',
      descriptionHindi: 'सीखने के उद्देश्य, शिक्षण पद्धति, गृहकार्य और मूल्यांकन सहित पूर्ण पाठ योजना।'
    }
  ]);

  // Handle Quick Curriculum Shortcuts (Requirement 16)
  const handleQuickCurriculumSelect = (classId: string, subjectId: string, topicId: string, sectionId?: string) => {
    setSelectedClassId(classId);
    if (sectionId) setSelectedSectionId(sectionId);
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(topicId);
    setIsResourcesLoaded(true);
    showToast('Loaded curriculum parameters & classroom resources.');
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: 'Curriculum Shortcut Selected',
      details: `${classId} • ${subjectId} • ${topicId}`,
      category: 'academic'
    });
  };

  // Get Lesson Resources Action
  const handleGetLessonResources = () => {
    if (!selectedClassId || !selectedSectionId || !selectedSubjectId || !selectedTopicId) {
      showToast('Please select Class, Section, Subject, and Topic to load resources.', 'warning');
      return;
    }
    setIsResourcesLoaded(true);
    showToast(`Loaded ${resources.length} teaching resources for ${currentTopic?.chapterName}!`, 'success');
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: 'Retrieved Lesson Resources',
      details: `${currentClass?.name} ${currentSection?.name} - ${currentSubject?.name} (${currentTopic?.chapterName})`,
      category: 'academic'
    });
  };

  // Lesson Delivery Stepper Steps
  const deliverySteps = [
    { title: '1. Learning Objectives', icon: Lightbulb, time: '5m' },
    { title: '2. Concept & Notes', icon: FileText, time: '10m' },
    { title: '3. Video / Animation', icon: Video, time: '15m' },
    { title: '4. Slides & Presentation', icon: FileSpreadsheet, time: '10m' },
    { title: '5. Hands-on Activity', icon: Sparkles, time: '10m' },
    { title: '6. Practice Worksheet', icon: FileCheck, time: '10m' },
    { title: '7. Formative Assessment', icon: Award, time: '5m' },
    { title: '8. Homework & Completion', icon: CheckCircle2, time: '5m' },
  ];

  // Filter resources based on tab & search
  const filteredResources = resources.filter(res => {
    const matchesTab = activeTab === 'all' || res.category === activeTab;
    const matchesSearch =
      res.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      res.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 text-xs text-slate-800 font-sans animate-in fade-in duration-150">
      {/* 1. Header Banner & Language Toggle */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-xl bg-[#3d5ee1]/10 text-[#3d5ee1]">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Lesson Delivery & Resources Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono">
                  CLASSROOM STUDIO
                </span>
              </div>
              <p className="text-xs text-slate-500">
                End-to-End Instructional Orchestrator: Select Class &rarr; Section &rarr; Subject &rarr; Topic to launch classroom delivery, interactive smartboards, worksheets, and formative assessments.
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Language Selector, AI Assistant & Start Lesson CTA */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Bilingual Switcher (Requirement 20) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <Languages className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguageMode('en')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                languageMode === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguageMode('hi')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                languageMode === 'hi' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguageMode('bilingual')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                languageMode === 'bilingual' ? 'bg-[#3d5ee1] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Bilingual (द्विभाषी)
            </button>
          </div>

          {/* AI Teaching Assistant (Requirement 19) */}
          <button
            onClick={() => setShowAiAssistantModal(true)}
            className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Teaching Assistant</span>
          </button>

          {/* Start Lesson Delivery Mode (Requirement 13) */}
          <button
            onClick={() => {
              setDeliveryModeActive(true);
              setDeliveryStep(0);
              showToast('Classroom Delivery Mode activated! Smartboard sequence loaded.');
            }}
            className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Classroom Delivery</span>
          </button>
        </div>
      </div>

      {/* 2. Four Dependent Selectors Bar (Class → Section → Subject → Topic/Chapter) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#3d5ee1]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Step 1: Select Classroom Instructional Parameters
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Academic Year 2026–27 • CBSE Term 1</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Selector 1: Class / Grade */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>1. Class / Grade</span>
              <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-bold">
                {currentClass?.code}
              </span>
            </label>
            <select
              value={selectedClassId}
              onChange={e => {
                setSelectedClassId(e.target.value);
                const secs = sectionsList.filter(s => s.classId === e.target.value);
                if (secs.length > 0) setSelectedSectionId(secs[0].id);
                const subs = subjectsList.filter(s => s.classId === e.target.value);
                if (subs.length > 0) {
                  setSelectedSubjectId(subs[0].id);
                  const tops = topicsList.filter(t => t.subjectId === subs[0].id);
                  if (tops.length > 0) setSelectedTopicId(tops[0].id);
                }
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
            >
              {classesList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.academicYear})
                </option>
              ))}
            </select>
          </div>

          {/* Selector 2: Section */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>2. Section</span>
              <span className="text-[10px] text-slate-500">
                {currentSection?.studentCount} Students
              </span>
            </label>
            <select
              value={selectedSectionId}
              onChange={e => setSelectedSectionId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
            >
              {availableSections.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} • {s.room} ({s.classTeacher})
                </option>
              ))}
            </select>
          </div>

          {/* Selector 3: Subject */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>3. Subject</span>
              <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                {currentSubject?.completedChapters}/{currentSubject?.totalChapters} Ch Done
              </span>
            </label>
            <select
              value={selectedSubjectId}
              onChange={e => {
                setSelectedSubjectId(e.target.value);
                const tops = topicsList.filter(t => t.subjectId === e.target.value);
                if (tops.length > 0) setSelectedTopicId(tops[0].id);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
            >
              {availableSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code}) • {sub.teacher}
                </option>
              ))}
            </select>
          </div>

          {/* Selector 4: Topic / Chapter */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>4. Chapter & Topic</span>
              <span className="text-[10px] text-blue-600 font-semibold">
                {currentTopic?.status}
              </span>
            </label>
            <select
              value={selectedTopicId}
              onChange={e => setSelectedTopicId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
            >
              {availableTopics.map(t => (
                <option key={t.id} value={t.id}>
                  {languageMode === 'hi' ? t.chapterNameHindi || t.chapterName : t.chapterName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CTA Button: "Get Lesson Resources" (Requirement 4) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Target: <strong>{currentClass?.name} - {currentSection?.name}</strong> • <strong>{currentSubject?.name}</strong> &rarr; <span className="text-[#3d5ee1] font-semibold">{currentTopic?.chapterName}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateResourceModal(true)}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Resource</span>
            </button>
            <button
              onClick={handleGetLessonResources}
              className="px-5 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Lesson Resources</span>
              <span className="font-mono text-xs bg-white/20 px-1.5 py-0.2 rounded">12 Ready</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick Curriculum Shortcuts (Requirement 16) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
          <span>Quick Curriculum Shortcuts (One-Click Auto-Configuration)</span>
          <span className="font-normal text-[10px] text-slate-400">Click to immediately load ready teaching kits</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            {
              title: 'Class 8 Science • Light & Reflection',
              sub: 'Laws of reflection, optical ray tracing & periscope kit',
              classId: 'cls-8',
              secId: 'sec-8a',
              subId: 'sub-8-sci',
              topId: 'top-light',
              color: 'hover:border-indigo-400 hover:bg-indigo-50/50',
              badge: 'Physics'
            },
            {
              title: 'Class 8 Science • Force & Pressure',
              sub: 'Atmospheric pressure, barometers & vacuum experiments',
              classId: 'cls-8',
              secId: 'sec-8a',
              subId: 'sub-8-sci',
              topId: 'top-force',
              color: 'hover:border-emerald-400 hover:bg-emerald-50/50',
              badge: 'Physics'
            },
            {
              title: 'Class 8 Math • Linear Equations',
              sub: 'Transposition drill, middle-term split, age word problems',
              classId: 'cls-8',
              secId: 'sec-8a',
              subId: 'sub-8-math',
              topId: 'top-linear',
              color: 'hover:border-blue-400 hover:bg-blue-50/50',
              badge: 'Algebra'
            },
            {
              title: 'Class 8 CS • Algorithms & Flowcharts',
              sub: 'Decision trees, conditional branches & Python pseudocode',
              classId: 'cls-8',
              secId: 'sec-8a',
              subId: 'sub-8-cs',
              topId: 'top-algo',
              color: 'hover:border-purple-400 hover:bg-purple-50/50',
              badge: 'Computer Science'
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickCurriculumSelect(item.classId, item.subId, item.topId, item.secId)}
              className={`p-3 bg-white rounded-xl border border-slate-200 text-left transition-all shadow-2xs group flex flex-col justify-between ${item.color}`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                  <span className="group-hover:text-[#3d5ee1]">{item.badge}</span>
                  <span className="text-[9px] font-mono bg-slate-100 group-hover:bg-[#3d5ee1] group-hover:text-white px-1.5 py-0.2 rounded transition-colors">
                    Load Kit &rarr;
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs leading-snug">{item.title}</div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Classroom Delivery Active Banner (If In Delivery Mode) */}
      {deliveryModeActive && (
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-[#3d5ee1] text-white p-5 rounded-2xl shadow-xl space-y-4 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">Classroom Live Delivery Mode Active</h3>
                  <span className="bg-emerald-500 text-white text-[9px] font-mono px-2 py-0.2 rounded-full uppercase font-bold animate-pulse">
                    LIVE IN CLASS 8-A
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200">
                  {currentTopic.chapterName} • 40-Minute Structured Instructional Flow
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCompletionModal(true)}
                className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1.5 text-xs shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Complete Lesson & Log Attendance</span>
              </button>
              <button
                onClick={() => setDeliveryModeActive(false)}
                className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10"
                title="Exit Delivery Mode"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {deliverySteps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = deliveryStep === idx;
              const isPast = deliveryStep > idx;
              return (
                <button
                  key={idx}
                  onClick={() => setDeliveryStep(idx)}
                  className={`p-2 rounded-xl text-left transition-all border ${
                    isCurrent
                      ? 'bg-white text-slate-900 border-white font-bold shadow-md'
                      : isPast
                      ? 'bg-white/10 text-emerald-300 border-emerald-500/40'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <Icon className="w-3 h-3" />
                    <span className="font-mono text-[9px]">{step.time}</span>
                  </div>
                  <div className="text-[11px] leading-tight truncate">{step.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Resource Workspace (Tabs & Global Search) */}
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Resources (8)', icon: Layers },
              { id: 'video', label: 'Video Lessons', icon: Video },
              { id: 'notes', label: 'Lecture Notes & Formulas', icon: FileText },
              { id: 'presentation', label: 'Presentation (PPT)', icon: FileSpreadsheet },
              { id: 'worksheets', label: 'Worksheets', icon: FileCheck },
              { id: 'question_bank', label: 'Question Bank', icon: HelpCircle },
              { id: 'assignments', label: 'Assignments', icon: ListTodo },
              { id: 'activities', label: 'Classroom Activities', icon: Sparkles },
              { id: 'lesson_plan', label: 'Lesson Plan Structure', icon: Clock },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search inside Resources */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search in this topic..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#3d5ee1]"
            />
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredResources.map(resource => {
            const isHindi = languageMode === 'hi';
            const displayTitle = isHindi && resource.titleHindi ? resource.titleHindi : resource.title;
            const displayDesc = isHindi && resource.descriptionHindi ? resource.descriptionHindi : resource.description;

            return (
              <div
                key={resource.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Category Pill and Recommended Sequence */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        resource.category === 'video'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : resource.category === 'presentation'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : resource.category === 'notes'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : resource.category === 'worksheet'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : resource.category === 'activity'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {resource.typeLabel}
                    </span>

                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      Seq #{resource.recommendedSequence}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#3d5ee1] transition-colors">
                      {displayTitle}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2 font-mono">
                      <span>{resource.format}</span>
                      <span>•</span>
                      <span>{resource.sizeOrDuration}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                    {displayDesc}
                  </p>
                </div>

                {/* Card Action Launchers */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{resource.downloads} Teacher Downloads</span>
                    {resource.isCompleted && (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Delivered</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        if (resource.category === 'video') setShowVideoModal(true);
                        else if (resource.category === 'presentation') setShowPptModal(true);
                        else if (resource.category === 'notes') setShowNotesModal(true);
                        else if (resource.category === 'worksheet') setShowWorksheetModal(true);
                        else if (resource.category === 'question_bank') setShowPaperGeneratorModal(true);
                        else if (resource.category === 'assignment') setShowNewAssignmentModal(true);
                        else if (resource.category === 'activity') setActiveModule('teacher-activities');
                        else if (resource.category === 'lesson_plan') setActiveModule('teacher-planner');
                        else setShowNotesModal(true);
                      }}
                      className="py-2 px-3 bg-[#3d5ee1] hover:bg-[#324ecc] text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors text-xs"
                    >
                      <Play className="w-3 h-3" />
                      <span>Launch / View</span>
                    </button>

                    <button
                      onClick={() => {
                        showToast(`Downloaded ${resource.title} (${resource.format})`);
                      }}
                      className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors text-xs"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. MODAL: Video Lesson Player (Requirement 5) */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-700 animate-in zoom-in-95 duration-150">
            {/* Top Bar */}
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white text-sm">Classroom Video: Laws of Reflection & Ray Tracing</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Canvas Simulated Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center p-8 group">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-white cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-white" />}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Angle of Incidence = Angle of Reflection (Demonstrated on Precision Optical Bench)
                </div>
                <div className="text-xs font-mono text-slate-400">Timestamp: {videoTimestamp} / 14:30</div>
              </div>

              {/* Timestamp Chapters Quick Bar */}
              <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-indigo-400">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-slate-400 text-[11px]">{videoTimestamp} / 14:30</span>
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono">
                    <button onClick={() => setVideoTimestamp('01:10')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">01:10 Normal</button>
                    <button onClick={() => setVideoTimestamp('04:30')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">04:30 Plane Mirror</button>
                    <button onClick={() => setVideoTimestamp('09:15')} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300">09:15 Multiple Reflection</button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={playbackSpeed}
                    onChange={e => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-slate-800 text-white border border-slate-700 rounded-lg px-2 py-0.5 text-[11px]"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1.0x Normal</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>
                  <button onClick={() => showToast('Full screen projection toggled.')} className="text-slate-400 hover:text-white p-1">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Teacher Notes & Actions */}
            <div className="p-4 bg-slate-800 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Teacher classroom note for this timestamp..."
                  value={teacherVideoNotes}
                  onChange={e => setTeacherVideoNotes(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => showToast('Saved teaching timestamp bookmark.')}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold flex items-center gap-1"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmark</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Marked video lesson as delivered in Class 8-A.');
                    setShowVideoModal(false);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: Lecture Notes & Formula Handout Viewer (Requirement 6) */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 text-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Lecture Notes & Optical Formula Blueprint</h3>
                <p className="text-slate-500 text-[11px]">Class 8 Science • Chapter 3: Light & Reflection</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg">
                  <Printer className="w-4 h-4" />
                </button>
                <button onClick={() => showToast('Downloaded Notes PDF')} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
                <button onClick={() => setShowNotesModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-slate-800 leading-relaxed">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                <div className="font-bold text-indigo-900 text-xs uppercase tracking-wider">Learning Objectives:</div>
                <ul className="list-disc list-inside space-y-0.5 text-indigo-800 text-[11px]">
                  <li>State and experimentally verify the two primary laws of reflection of light.</li>
                  <li>Distinguish between specular (regular) reflection and diffuse reflection with surface roughness.</li>
                  <li>Construct virtual image formation behind a plane mirror (lateral inversion).</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">1. Laws of Reflection of Light</h4>
                <p>
                  <strong>First Law:</strong> The angle of incidence (&ang;i) is equal to the angle of reflection (&ang;r). Mathematically, <span className="font-mono bg-slate-100 px-1 py-0.5 rounded font-bold">&ang;i = &ang;r</span>.
                </p>
                <p>
                  <strong>Second Law:</strong> The incident ray, the normal to the mirror at the point of incidence, and the reflected ray, all lie in the same geometric plane.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Exemplar Board Exam Mistake Alert:</h4>
                <p className="text-slate-600 text-[11px]">
                  Students frequently measure the angle between the mirror surface and the incident ray instead of measuring between the ray and the <strong>Normal</strong> (perpendicular). Remind students to always draw the dashed normal line first!
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-xs">2. Multiple Reflections Formula:</h4>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-emerald-900 font-bold text-center">
                  Number of Images (N) = (360° / &theta;) - 1
                </div>
                <p className="text-slate-500 text-[11px] text-center">Where &theta; is the angle between two inclined plane mirrors.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Close Notes Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: Presentation PPT Viewer (Requirement 7) */}
      {showPptModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-700 animate-in zoom-in-95 duration-150 flex flex-col text-xs">
            {/* PPT Top Header */}
            <div className="p-3.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                <span className="font-bold">Smartboard Presentation: Light & Reflection</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLaserPointerActive(!laserPointerActive)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    laserPointerActive ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-700 text-slate-300 border-slate-600'
                  }`}
                >
                  Laser Pointer: {laserPointerActive ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setPresenterMode(!presenterMode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                    presenterMode ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-700 text-slate-300 border-slate-600'
                  }`}
                >
                  Presenter Mode
                </button>
                <button onClick={() => setShowPptModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Stage */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-10 flex flex-col justify-between select-none">
              {laserPointerActive && (
                <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e] pointer-events-none -translate-x-1/2 animate-pulse" />
              )}

              <div className="flex items-center justify-between text-indigo-300 text-xs font-mono">
                <span>Class 8 Science • CBSE 2026-27</span>
                <span>Slide {currentSlide} of {totalSlides}</span>
              </div>

              <div className="max-w-xl mx-auto text-center space-y-4 my-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono uppercase font-bold">
                  Concept Demonstration
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {currentSlide === 1 && 'Why Does a Mirror Reverse Left & Right?'}
                  {currentSlide === 2 && 'The Geometry of Lateral Inversion'}
                  {currentSlide >= 3 && `Constructing Ray Paths on Flat Glass Surface (Slide ${currentSlide})`}
                </h2>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Notice that lateral inversion does not reverse upside down; it reverses depth front-to-back relative to the mirror plane normal.
                </p>
              </div>

              {/* Presenter Speaker Notes Drawer */}
              {presenterMode && (
                <div className="p-3 bg-slate-950/90 border border-slate-700 rounded-xl text-[11px] text-amber-300 font-mono">
                  <strong>Speaker Prompt:</strong> Ask student Sneha Kulkarni to stand and raise right hand; ask cohort which hand her mirror image raises.
                </div>
              )}
            </div>

            {/* PPT Bottom Navigation Bar */}
            <div className="p-3 bg-slate-800 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                disabled={currentSlide === 1}
                className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              <span className="font-mono text-xs font-bold text-slate-300">
                Slide {currentSlide} / {totalSlides}
              </span>

              <button
                onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
                disabled={currentSlide === totalSlides}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. MODAL: Worksheet Management (Requirement 8) */}
      {showWorksheetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 text-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Classroom Practice & Homework Worksheet</h3>
                <p className="text-slate-500 text-[11px]">Class 8 Science • Light & Reflection (15 Questions • 25 Marks)</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-1">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Copies</span>
                </button>
                <button onClick={() => setShowWorksheetModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="border border-slate-300 p-4 rounded-xl space-y-3">
                <div className="text-center border-b border-slate-200 pb-2 space-y-0.5">
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Delhi Public Global School • Term 1</h4>
                  <p className="text-slate-500 text-[11px]">Worksheet 03: Reflection of Light & Ray Tracing</p>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span>Name: ______________________</span>
                    <span>Roll No: _______</span>
                    <span>Class 8-A</span>
                    <span>Max Marks: 25</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <span className="font-bold">Q1. (2 Marks)</span> State the first and second laws of reflection of light clearly.
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold">Q2. (3 Marks)</span> An incident ray strikes a plane mirror at an angle of 35° with the mirror surface. Calculate: (a) Angle of incidence, (b) Angle of reflection, (c) Total angle between incident and reflected rays.
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold">Q3. (5 Marks)</span> Draw a neat labeled diagram showing the formation of an image of a point object O in a plane mirror.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => showToast('Assigned worksheet to Class 8-A student portals.')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Assign to Class 8-A Online</span>
              </button>
              <button
                onClick={() => setShowWorksheetModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL: AI Teaching Assistant (Requirement 19) */}
      {showAiAssistantModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 text-xs">
            <div className="p-4 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-700" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">AI Classroom Teaching Assistant</h3>
                  <p className="text-purple-700 text-[11px]">Instant pedagogical generation for lesson plans, worksheets & bilingual notes</p>
                </div>
              </div>
              <button onClick={() => setShowAiAssistantModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Select Pedagogical AI Action:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Generate 40m Lesson Plan',
                    'Generate 10 MCQs with Rubric',
                    'Hindi Bilingual Explanation',
                    'Remedial Intervention Handout',
                    'Socratic Lab Activity',
                    'Board Exam 5-Mark Question',
                  ].map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => showToast(`AI Generated: ${act} for ${currentTopic.chapterName}!`)}
                      className="p-2.5 bg-slate-50 hover:bg-purple-50 text-left border border-slate-200 hover:border-purple-300 rounded-xl font-semibold text-slate-800 transition-colors"
                    >
                      {act} &rarr;
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Custom Instructional Prompt:</label>
                <textarea
                  rows={3}
                  defaultValue="Create a differentiated 15-minute hands-on group activity for Class 8 Light & Reflection accommodating fast and slow learners."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-[11px] text-purple-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Generated Output Preview:</span>
                </div>
                <p>
                  "Activity: The Lateral Inversion Code. Students write their names in mirror-writing so that when placed in front of a handheld mirror, it reflects legible text."
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setShowAiAssistantModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('AI lesson plan added to your Classroom Hub resources.');
                  setShowAiAssistantModal(false);
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Append to Hub Resources</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. MODAL: Lesson Delivery Completion & Log (Requirement 14 & 15) */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 text-xs">
            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">Save Classroom Lesson Delivery</h3>
              </div>
              <button onClick={() => setShowCompletionModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classroom Delivery Status *</label>
                <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold">
                  <option value="completed">Completed (100% Objectives Met)</option>
                  <option value="partial">Partially Completed (Needs Follow-up)</option>
                  <option value="revision">Requires Revision / Doubt Session</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Actual Duration</label>
                  <input type="text" defaultValue="42 Minutes" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Students Participated</label>
                  <input type="text" defaultValue="31 / 32 Students" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Faculty Remarks & Observation</label>
                <textarea
                  rows={2}
                  defaultValue="Class engaged actively during lateral inversion demo. Homework worksheet assigned for Monday."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="p-2.5 bg-slate-100 rounded-xl text-[10px] text-slate-500 font-mono">
                System will auto-update: Class 8-A Syllabus Tracker &rarr; Student Academic Profile &rarr; Activity Log.
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setShowCompletionModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeliveryModeActive(false);
                  setShowCompletionModal(false);
                  showToast('Lesson Delivery successfully logged and student records updated!');
                  addActivityLog({
                    userId: currentUser.id,
                    userName: currentUser.name,
                    userRole: currentUser.role,
                    portalType: currentUser.portalType,
                    action: 'Completed Classroom Lesson Delivery',
                    details: `${currentClass?.name} ${currentSection?.name}: ${currentTopic?.chapterName}`,
                    category: 'academic'
                  });
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Complete Class</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. MODAL: Create Resource (Requirement 18) */}
      {showCreateResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 text-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#3d5ee1]" />
                <h3 className="font-bold text-slate-900 text-sm">Add New Classroom Resource</h3>
              </div>
              <button onClick={() => setShowCreateResourceModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                showToast('New classroom resource created and added to topic registry!');
                setShowCreateResourceModal(false);
              }}
              className="p-5 space-y-3"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Resource Title *</label>
                <input required placeholder="e.g. Concave Mirror Ray Diagram Practice Sheet" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category *</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold">
                    <option value="worksheet">Worksheet (PDF)</option>
                    <option value="notes">Lecture Notes</option>
                    <option value="presentation">Presentation (PPT)</option>
                    <option value="video">Video Lecture</option>
                    <option value="activity">Classroom Activity</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sequence Order</label>
                  <input type="number" defaultValue={resources.length + 1} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description & Pedagogical Objective</label>
                <textarea rows={2} placeholder="Explain how teachers or students should use this resource..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateResourceModal(false)} className="px-4 py-2 border border-slate-200 rounded-xl font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#3d5ee1] text-white rounded-xl font-bold">
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

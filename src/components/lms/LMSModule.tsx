import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Play,
  FileText,
  CheckCircle2,
  Clock,
  Award,
  Video,
  ExternalLink,
  ChevronRight,
  Download,
  Calendar,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Eye,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, CourseLesson, CourseModule } from '../../types';

export const LMSModule: React.FC = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    updateStudentLessonProgress,
    issueCertificate,
    setActiveModule,
    currentRole
  } = useApp();

  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'curriculum' | 'player' | 'quiz' | 'certificate'>('catalog');
  const [activeLesson, setActiveLesson] = useState<CourseLesson>(
    courses[0]?.modules[0]?.lessons[0] || ({} as CourseLesson)
  );

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // New Course Modal
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('NACT-AI-501');
  const [newCoursePrice, setNewCoursePrice] = useState(32000);
  const [newCourseCategory, setNewCourseCategory] = useState('Data Science & AI');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      code: newCourseCode,
      title: newCourseTitle,
      category: newCourseCategory,
      subcategory: 'Engineering & MLOps',
      creatorName: 'Dr. Rajesh Sharma',
      facultyName: 'Vikramaditya Roy',
      shortDescription: 'Comprehensive industry program with hands-on labs and placement mentorship.',
      fullDescription: 'Master modern engineering stacks with real-world architectures, live projects, and dedicated counselor support.',
      thumbnail: '/src/assets/images/course_data_science_1790950655440.jpg',
      banner: '/src/assets/images/course_data_science_1790950655440.jpg',
      introVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'Hybrid',
      isFree: false,
      price: newCoursePrice,
      discountPercentage: 20,
      finalPrice: Math.round(newCoursePrice * 0.8),
      installmentAvailable: true,
      validityDays: 365,
      enrollmentLimit: 100,
      enrolledStudentsCount: 0,
      isPublished: true,
      isCertificateEnabled: true,
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: 'Module 1: Orientation & Core Fundamentals',
          description: 'Getting started, environment installation, and basic workflows.',
          order: 1,
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: 'Introduction & Architecture Roadmap',
              description: 'Program syllabus walk-through and cloud compute account activation.',
              durationMinutes: 40,
              type: 'video',
              isPreviewFree: true,
              isDownloadAllowed: false,
              isCompleted: false,
            }
          ]
        }
      ],
      assignments: [],
      quizzes: [],
      liveClasses: []
    };

    addCourse(newCourse);
    setSelectedCourse(newCourse);
    setShowNewCourseModal(false);
    setNewCourseTitle('');
  };

  const handleTakeQuiz = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = (questions: any[]) => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });
    const calculatedPercentage = Math.round((correctCount / questions.length) * 100);
    setQuizScore(calculatedPercentage);
    setQuizSubmitted(true);
  };

  const handleCompleteCurrentLesson = () => {
    if (!activeLesson.id) return;
    updateStudentLessonProgress('usr-8', selectedCourse.id, activeLesson.id);
  };

  const handleGenerateCertificate = () => {
    issueCertificate('Aarav Patel', 'aarav.patel@gmail.com', selectedCourse.title);
    setActiveTab('certificate');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            LMS & Academic Curriculum
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Course creation wizard, interactive video classroom, assignments grading, quizzes, and certificate engine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Subview Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'curriculum' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Curriculum Editor
            </button>
            <button
              onClick={() => setActiveTab('player')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'player' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classroom Player
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'quiz' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quiz Assessment
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'certificate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Certificates
            </button>
          </div>

          <button
            onClick={() => setShowNewCourseModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Course Catalog View */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                    {course.code}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-emerald-600/90 text-white text-[10px] font-medium">
                    {course.type}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-medium text-indigo-600">{course.category}</div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{course.title}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
                    <span>Faculty: <strong className="text-slate-700">{course.facultyName}</strong></span>
                    <span className="font-mono">{course.enrolledStudentsCount} enrolled</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    ₹{course.finalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 line-through">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setActiveLesson(course.modules[0]?.lessons[0] || ({} as CourseLesson));
                      setActiveTab('player');
                    }}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    <span>Enter Class</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setActiveTab('curriculum');
                    }}
                    className="px-2.5 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Curriculum Management View */}
      {activeTab === 'curriculum' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="font-mono text-xs text-indigo-600 font-semibold">{selectedCourse.code}</span>
              <h2 className="text-base font-bold text-slate-900">{selectedCourse.title}</h2>
              <div className="text-xs text-slate-500 mt-0.5">
                {selectedCourse.modules.length} Modules · {selectedCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Total Lessons
              </div>
            </div>

            <button
              onClick={() => {
                const newMod: CourseModule = {
                  id: `mod-${Date.now()}`,
                  title: `Module ${selectedCourse.modules.length + 1}: Advanced Topics`,
                  description: 'Deep dive topics and practical production capstone.',
                  order: selectedCourse.modules.length + 1,
                  lessons: [
                    {
                      id: `les-${Date.now()}`,
                      title: 'Production Deployment & Monitoring',
                      description: 'Docker containerization and metrics collection.',
                      durationMinutes: 45,
                      type: 'video',
                      isPreviewFree: false,
                      isDownloadAllowed: false,
                      isCompleted: false,
                    }
                  ]
                };
                updateCourse(selectedCourse.id, {
                  modules: [...selectedCourse.modules, newMod]
                });
                setSelectedCourse(prev => ({
                  ...prev,
                  modules: [...prev.modules, newMod]
                }));
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="space-y-4">
            {selectedCourse.modules.map((mod, modIdx) => (
              <div key={mod.id} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{mod.title}</h3>
                    <p className="text-[11px] text-slate-500">{mod.description}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {mod.lessons.length} lessons
                  </span>
                </div>

                <div className="divide-y divide-slate-100 p-2 space-y-1">
                  {mod.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="p-2.5 flex items-center justify-between hover:bg-slate-50 rounded text-xs transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.type === 'video' ? (
                          <Video className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-amber-600" />
                        )}
                        <div>
                          <div className="font-semibold text-slate-800">{lesson.title}</div>
                          <div className="text-[11px] text-slate-400">{lesson.description}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-slate-500 text-[11px]">
                          {lesson.durationMinutes} mins
                        </span>
                        {lesson.isPreviewFree && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                            Free Preview
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setActiveLesson(lesson);
                            setActiveTab('player');
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-900"
                        >
                          Preview Player
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Classroom Player */}
      {activeTab === 'player' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Media & Notes Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 rounded-lg overflow-hidden aspect-video flex flex-col justify-between relative shadow-lg">
              {/* Simulated high-performance video player */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white bg-slate-950/80">
                <div className="w-16 h-16 rounded-full bg-indigo-600/90 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-xl">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="mt-4 font-bold text-sm tracking-wide text-white">
                  {activeLesson.title || 'Foundations of Tensors and Vector Algebra'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  {selectedCourse.title} · Faculty: {selectedCourse.facultyName}
                </p>
              </div>

              {/* Player control bar */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button className="hover:text-indigo-400">00:00 / {activeLesson.durationMinutes || 48}:00</button>
                  <span className="text-slate-500">|</span>
                  <span className="text-emerald-400 text-[11px] font-mono">1080p HD Streaming</span>
                </div>

                <button
                  onClick={handleCompleteCurrentLesson}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
              </div>
            </div>

            {/* Lesson Notes & Download Material */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{activeLesson.title}</h3>
                  <p className="text-xs text-slate-500">{activeLesson.description}</p>
                </div>
                {activeLesson.isDownloadAllowed && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded text-xs font-medium transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Notes (PDF)</span>
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Lesson Key Concepts:</strong> In this lecture we analyze multi-dimensional tensor storage, memory stride arrangements in C-contiguous versus Fortran-contiguous formats, and why vectorization minimizes Python runtime overhead by utilizing SIMD instruction sets.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-slate-800">
                  import torch<br/>
                  # Compute Scaled Dot-Product Attention<br/>
                  scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)<br/>
                  attn_weights = torch.softmax(scores, dim=-1)
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Course Modules & Lessons Queue */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-slate-900 text-xs">Course Curriculum</span>
              <span className="text-[11px] text-slate-500 font-mono">Progress: 85%</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[500px]">
              {selectedCourse.modules.map(mod => (
                <div key={mod.id} className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {mod.title}
                  </div>
                  <div className="space-y-1">
                    {mod.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left p-2 rounded text-xs flex items-center justify-between transition-colors ${
                          activeLesson.id === lesson.id
                            ? 'bg-indigo-50 text-indigo-950 font-semibold border-l-2 border-indigo-600'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {lesson.isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={handleGenerateCertificate}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Claim Verified Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Quiz & Assessment Engine */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-indigo-600 font-semibold">{selectedCourse.code}</span>
              <h2 className="text-base font-bold text-slate-900">
                Module 1 Evaluation: Tensors, PyTorch & Deep Learning
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Time Limit: 20 Minutes · Passing Score: 75% · 2 Questions
              </p>
            </div>
            {quizSubmitted && (
              <div className="text-right">
                <div className={`text-xl font-bold font-mono ${quizScore >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {quizScore}% Score
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {quizScore >= 75 ? 'Passed with Distinction' : 'Requires Re-attempt'}
                </div>
              </div>
            )}
          </div>

          {selectedCourse.quizzes[0]?.questions.map((q, qIdx) => (
            <div key={q.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div className="font-semibold text-slate-900">
                Question {qIdx + 1}: {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => handleTakeQuiz(q.id, optIdx)}
                      className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-medium'
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted ? (
            <div className="flex justify-end">
              <button
                onClick={() => handleSubmitQuiz(selectedCourse.quizzes[0]?.questions || [])}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold transition-colors"
              >
                Submit Quiz for Grading
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Evaluation record stored in student ledger</span>
              </span>
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedAnswers({});
                }}
                className="text-xs text-indigo-600 font-medium hover:underline"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Verified Certificate View (Printable) */}
      {activeTab === 'certificate' && (
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Official Accredited Digital Credential
            </span>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download Certificate</span>
            </button>
          </div>

          <div
            id="printable-certificate"
            className="p-10 bg-white border-8 border-double border-slate-800 rounded-lg shadow-xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Watermark / Seal */}
            <div className="space-y-1">
              <div className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                NACT INSTITUTE OF ADVANCED TECHNOLOGIES
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Certificate of Academic Excellence
              </h2>
              <div className="text-xs text-slate-400">
                Registered under NACT-EDU-IND-2021-9842 · ISO 9001:2015 Standards
              </div>
            </div>

            <div className="py-2 text-xs text-slate-600">
              This is to certify that
            </div>

            <div className="text-2xl font-bold font-serif text-indigo-950 underline decoration-indigo-300 underline-offset-4">
              Aarav Patel
            </div>

            <div className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              has satisfactorily completed all rigorous cohorts, capstone engineering projects, live code evaluations, and assessments for the program:
            </div>

            <div className="text-lg font-bold text-slate-900 font-serif">
              {selectedCourse.title}
            </div>

            <div className="text-xs font-mono text-emerald-700 font-semibold">
              Final Grade: A+ (Distinction) · Completed October 1, 2026
            </div>

            {/* Signatures & QR Section */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 items-end text-xs">
              <div className="text-center">
                <div className="font-serif italic font-bold text-slate-800 text-sm">Dr. Rajesh Sharma</div>
                <div className="text-[10px] text-slate-500 mt-1">Founder & Chief Academic Director</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-900 text-white rounded p-1 flex items-center justify-center font-mono text-[9px] text-center shadow-xs">
                  QR VERIFIED<br/>NACT-9042
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-1">ID: VRFY-NACT-88990-OK</div>
              </div>

              <div className="text-center">
                <div className="font-serif italic font-bold text-slate-800 text-sm">Vikramaditya Roy</div>
                <div className="text-[10px] text-slate-500 mt-1">Dean of AI & Data Engineering</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Course Modal */}
      {showNewCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-5 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Create New Certification Program</h3>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Applied LLMOps & Distributed AI Infrastructure"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Course Code</label>
                  <input
                    type="text"
                    value={newCourseCode}
                    onChange={e => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={newCourseCategory}
                    onChange={e => setNewCourseCategory(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  value={newCoursePrice}
                  onChange={e => setNewCoursePrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800"
                >
                  Create & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

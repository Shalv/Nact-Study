// In-Memory Cloud Relational Database Engine with Foreign Keys, Soft Deletes & Audit Trail
import crypto from 'crypto';

export function generateUUID(): string {
  return crypto.randomUUID ? crypto.randomUUID() : `uuid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 1. Core Interfaces
export interface AcademicYear {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface ClassGrade {
  id: string;
  academic_year_id: string;
  code: string;
  name: string;
  category: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  class_id: string;
  name: string;
  code: string;
  room: string;
  class_teacher_id?: string;
  class_teacher_name?: string;
  student_count: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  class_id: string;
  section_id?: string;
  code: string;
  name: string;
  category?: string;
  teacher_id?: string;
  teacher_name?: string;
  total_chapters: number;
  completed_chapters: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  chapter_number: number;
  name: string;
  name_hindi?: string;
  description?: string;
  completion_percentage: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  chapter_id: string;
  subject_id: string;
  topic_number: number;
  name: string;
  name_hindi?: string;
  description?: string;
  duration_minutes: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Revision' | 'Assessment Pending';
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuickCurriculum {
  id: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  display_name: string;
  icon: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type ResourceType =
  | 'VIDEO'
  | 'LECTURE_NOTE'
  | 'PRESENTATION'
  | 'WORKSHEET'
  | 'ASSIGNMENT'
  | 'QUESTION_BANK'
  | 'ACTIVITY'
  | 'QUIZ'
  | 'REFERENCE';

export type ResourceStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'ARCHIVED';

export interface LessonResource {
  id: string;
  title: string;
  title_hindi?: string;
  description: string;
  description_hindi?: string;
  resource_type: ResourceType;
  class_id: string;
  section_id?: string;
  subject_id: string;
  chapter_id?: string;
  topic_id?: string;
  file_url: string;
  file_name?: string;
  file_type?: string;
  file_size?: string;
  storage_path?: string;
  external_url?: string;
  thumbnail_url?: string;
  duration?: string;
  downloads: number;
  status: ResourceStatus;
  recommended_sequence: number;
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface LessonPlan {
  id: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  lesson_date: string;
  duration_minutes: number;
  learning_objectives: string;
  teaching_method: string;
  teaching_resources: string;
  classroom_activity: string;
  assessment_method: string;
  homework: string;
  teacher_remarks: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  teacher_id: string;
  teacher_name: string;
  created_at: string;
  updated_at: string;
}

export interface LessonDelivery {
  id: string;
  teacher_id: string;
  teacher_name: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  lesson_plan_id?: string;
  start_time: string;
  end_time?: string;
  duration_minutes: number;
  status: 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'PARTIALLY_COMPLETED' | 'RESCHEDULED';
  remarks?: string;
  step_completed: number;
  attendance_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  chapter_id?: string;
  topic_id?: string;
  title: string;
  description: string;
  due_date: string;
  total_marks: number;
  submissions_count: number;
  status: 'ACTIVE' | 'EVALUATED' | 'ARCHIVED';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionItem {
  id: string;
  class_id: string;
  subject_id: string;
  chapter_id?: string;
  topic_id?: string;
  question_text: string;
  question_type: 'MCQ' | 'Short Answer' | 'Numerical' | 'Case Study' | 'Assertion Reasoning';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
  correct_answer: string;
  solution_explanation: string;
  marks: number;
  bloom_level?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ClassroomActivity {
  id: string;
  class_id: string;
  subject_id: string;
  chapter_id?: string;
  topic_id?: string;
  title: string;
  description: string;
  activity_type: 'Lab Experiment' | 'Group Discussion' | 'Hands-on Simulation' | 'Debate' | 'Peer Review';
  duration_minutes: number;
  materials_required: string[];
  safety_instructions?: string;
  learning_outcomes: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  student_name: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  chapter_id: string;
  topic_id: string;
  completion_percentage: number;
  assessment_score?: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  last_accessed: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ARCHIVE' | 'DELIVERY_START' | 'DELIVERY_COMPLETE';
  module: string;
  record_id: string;
  old_value?: any;
  new_value?: any;
  timestamp: string;
}

// 2. Database Store with Initial Seed Data
class CloudDatabaseStore {
  academicYears: AcademicYear[] = [];
  classes: ClassGrade[] = [];
  sections: Section[] = [];
  subjects: Subject[] = [];
  chapters: Chapter[] = [];
  topics: Topic[] = [];
  quickCurriculum: QuickCurriculum[] = [];
  lessonResources: LessonResource[] = [];
  lessonPlans: LessonPlan[] = [];
  lessonDeliveries: LessonDelivery[] = [];
  assignments: Assignment[] = [];
  questionBank: QuestionItem[] = [];
  classroomActivities: ClassroomActivity[] = [];
  studentProgressList: StudentProgress[] = [];
  auditLogs: AuditLog[] = [];

  constructor() {
    this.seedDatabase();
  }

  private seedDatabase() {
    const now = new Date().toISOString();

    // 1. Academic Years
    const ay2026: AcademicYear = {
      id: 'ay-2026',
      code: 'AY-2026-27',
      name: 'Academic Year 2026-27',
      description: 'Current Active Academic Session',
      status: 'active',
      created_at: now,
      updated_at: now,
    };
    this.academicYears.push(ay2026);

    // 2. Classes
    const class8: ClassGrade = {
      id: 'cls-8',
      academic_year_id: ay2026.id,
      code: 'CLS-08',
      name: 'Class 8',
      category: 'Secondary School',
      sort_order: 1,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const class9: ClassGrade = {
      id: 'cls-9',
      academic_year_id: ay2026.id,
      code: 'CLS-09',
      name: 'Class 9',
      category: 'Secondary School',
      sort_order: 2,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const class10: ClassGrade = {
      id: 'cls-10',
      academic_year_id: ay2026.id,
      code: 'CLS-10',
      name: 'Class 10',
      category: 'High School',
      sort_order: 3,
      active: true,
      created_at: now,
      updated_at: now,
    };
    this.classes.push(class8, class9, class10);

    // 3. Sections
    const sec8A: Section = {
      id: 'sec-8a',
      class_id: class8.id,
      name: 'Section 8-A',
      code: '8A',
      room: 'Room 302',
      class_teacher_id: 'usr-3',
      class_teacher_name: 'Vikramaditya Roy',
      student_count: 32,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sec8B: Section = {
      id: 'sec-8b',
      class_id: class8.id,
      name: 'Section 8-B',
      code: '8B',
      room: 'Room 303',
      class_teacher_id: 'usr-4',
      class_teacher_name: 'Priyanka Sen',
      student_count: 30,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sec9A: Section = {
      id: 'sec-9a',
      class_id: class9.id,
      name: 'Section 9-A',
      code: '9A',
      room: 'Room 201',
      class_teacher_id: 'usr-5',
      class_teacher_name: 'Dr. Sunita Rao',
      student_count: 34,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sec10A: Section = {
      id: 'sec-10a',
      class_id: class10.id,
      name: 'Section 10-A',
      code: '10A',
      room: 'Chemistry Lab',
      class_teacher_id: 'usr-6',
      class_teacher_name: 'Dr. Alok Verma',
      student_count: 34,
      active: true,
      created_at: now,
      updated_at: now,
    };
    this.sections.push(sec8A, sec8B, sec9A, sec10A);

    // 4. Subjects
    const sub8Sci: Subject = {
      id: 'sub-8-sci',
      class_id: class8.id,
      section_id: sec8A.id,
      code: 'SCI-08',
      name: 'Science',
      category: 'Core Science',
      teacher_id: 'usr-3',
      teacher_name: 'Vikramaditya Roy',
      total_chapters: 16,
      completed_chapters: 7,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sub8Math: Subject = {
      id: 'sub-8-math',
      class_id: class8.id,
      section_id: sec8A.id,
      code: 'MATH-08',
      name: 'Mathematics',
      category: 'Pure Mathematics',
      teacher_id: 'usr-3',
      teacher_name: 'Vikramaditya Roy',
      total_chapters: 14,
      completed_chapters: 8,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sub8Cs: Subject = {
      id: 'sub-8-cs',
      class_id: class8.id,
      section_id: sec8A.id,
      code: 'CS-08',
      name: 'Computer Science & AI',
      category: 'Technology & AI',
      teacher_id: 'usr-1',
      teacher_name: 'Anita Sen',
      total_chapters: 10,
      completed_chapters: 6,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const sub9Phy: Subject = {
      id: 'sub-9-phy',
      class_id: class9.id,
      section_id: sec9A.id,
      code: 'PHY-09',
      name: 'Physics',
      category: 'Physical Sciences',
      teacher_id: 'usr-5',
      teacher_name: 'Dr. Sunita Rao',
      total_chapters: 12,
      completed_chapters: 5,
      active: true,
      created_at: now,
      updated_at: now,
    };
    this.subjects.push(sub8Sci, sub8Math, sub8Cs, sub9Phy);

    // 5. Chapters
    const chLight: Chapter = {
      id: 'ch-light',
      subject_id: sub8Sci.id,
      chapter_number: 3,
      name: 'Chapter 3: Light & Reflection',
      name_hindi: 'अध्याय 3: प्रकाश और परावर्तन',
      description: 'Optics, specular and diffused reflection, mirror formula and image formation',
      completion_percentage: 75,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const chForce: Chapter = {
      id: 'ch-force',
      subject_id: sub8Sci.id,
      chapter_number: 4,
      name: 'Chapter 4: Force & Pressure',
      name_hindi: 'अध्याय 4: बल और दाब',
      description: 'Contact and non-contact forces, atmospheric pressure and hydrostatic mechanics',
      completion_percentage: 100,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const chLinear: Chapter = {
      id: 'ch-linear',
      subject_id: sub8Math.id,
      chapter_number: 2,
      name: 'Chapter 2: Linear Equations in One Variable',
      name_hindi: 'अध्याय 2: एक चर वाले रैखिक समीकरण',
      description: 'Algebraic equations, transposition, cross-multiplication and applied problems',
      completion_percentage: 60,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const chAlgo: Chapter = {
      id: 'ch-algo',
      subject_id: sub8Cs.id,
      chapter_number: 3,
      name: 'Chapter 3: Algorithms & Flowcharts',
      name_hindi: 'अध्याय 3: एल्गोरिदम और फ़्लोचार्ट',
      description: 'Procedural problem-solving, flow charting symbols, conditional branches and loop constructs',
      completion_percentage: 85,
      active: true,
      created_at: now,
      updated_at: now,
    };
    const chSnell: Chapter = {
      id: 'ch-snell',
      subject_id: sub9Phy.id,
      chapter_number: 5,
      name: 'Chapter 5: Refraction of Light',
      name_hindi: 'अध्याय 5: प्रकाश का अपवर्तन',
      description: 'Refraction at plane interfaces, Snell’s Law, refractive index and apparent depth',
      completion_percentage: 45,
      active: true,
      created_at: now,
      updated_at: now,
    };
    this.chapters.push(chLight, chForce, chLinear, chAlgo, chSnell);

    // 6. Topics
    const topLightLaws: Topic = {
      id: 'top-light',
      chapter_id: chLight.id,
      subject_id: sub8Sci.id,
      topic_number: 1,
      name: 'Laws of Reflection, Regular & Diffused Reflection, Spherical Mirrors',
      name_hindi: 'परावर्तन के नियम, नियमित और विसरित परावर्तन, गोलीय दर्पण',
      description: 'Angle of incidence equals angle of reflection; coplanar ray geometry',
      duration_minutes: 40,
      status: 'In Progress',
      active: true,
      created_at: now,
      updated_at: now,
    };
    const topForceTypes: Topic = {
      id: 'top-force',
      chapter_id: chForce.id,
      subject_id: sub8Sci.id,
      topic_number: 1,
      name: 'Contact vs Non-Contact Forces, Atmospheric Pressure & Barometer',
      name_hindi: 'सम्पर्क और असम्पर्क बल, वायुमंडलीय दबाव',
      description: 'Gravitational, electrostatic, magnetic vs friction and normal tension',
      duration_minutes: 45,
      status: 'Completed',
      active: true,
      created_at: now,
      updated_at: now,
    };
    const topLinearSolve: Topic = {
      id: 'top-linear',
      chapter_id: chLinear.id,
      subject_id: sub8Math.id,
      topic_number: 1,
      name: 'Solving Equations Having Variables on Both Sides & Applications',
      name_hindi: 'दोनों पक्षों में चर वाले समीकरणों को हल करना',
      description: 'Elimination, substitution and practical perimeter/age word problem translation',
      duration_minutes: 40,
      status: 'In Progress',
      active: true,
      created_at: now,
      updated_at: now,
    };
    const topAlgoTrees: Topic = {
      id: 'top-algo',
      chapter_id: chAlgo.id,
      subject_id: sub8Cs.id,
      topic_number: 1,
      name: 'Decision Trees, Conditional Branches & Iterative Loops',
      name_hindi: 'निर्णय वृक्ष, सशर्त शाखाएं और लूप',
      description: 'If-else branching diagrams and while loop termination criteria',
      duration_minutes: 40,
      status: 'Revision',
      active: true,
      created_at: now,
      updated_at: now,
    };
    const topSnellLaw: Topic = {
      id: 'top-snell',
      chapter_id: chSnell.id,
      subject_id: sub9Phy.id,
      topic_number: 1,
      name: 'Snell’s Law, Refractive Index, and Apparent Depth',
      name_hindi: 'स्नेल का नियम, अपवर्तनांक और आभासी गहराई',
      description: 'Wave speed change across dielectric boundary; optical density',
      duration_minutes: 45,
      status: 'In Progress',
      active: true,
      created_at: now,
      updated_at: now,
    };
    this.topics.push(topLightLaws, topForceTypes, topLinearSolve, topAlgoTrees, topSnellLaw);

    // 7. Quick Curriculum
    this.quickCurriculum.push(
      {
        id: 'qc-1',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        display_name: 'Class 8 Science • Light & Reflection',
        icon: 'Sparkles',
        sort_order: 1,
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'qc-2',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chForce.id,
        topic_id: topForceTypes.id,
        display_name: 'Class 8 Science • Force & Pressure',
        icon: 'Layers',
        sort_order: 2,
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'qc-3',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Math.id,
        chapter_id: chLinear.id,
        topic_id: topLinearSolve.id,
        display_name: 'Class 8 Math • Linear Equations',
        icon: 'BookOpen',
        sort_order: 3,
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'qc-4',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Cs.id,
        chapter_id: chAlgo.id,
        topic_id: topAlgoTrees.id,
        display_name: 'Class 8 CS • Algorithms & Flowcharts',
        icon: 'GraduationCap',
        sort_order: 4,
        active: true,
        created_at: now,
        updated_at: now,
      }
    );

    // 8. Lesson Resources (Videos, Notes, PPTs, Worksheets, Assignments, Activities, Quizzes)
    this.lessonResources.push(
      {
        id: 'res-vid-1',
        title: 'Light Reflection & Mirror Ray Tracing 3D Smartboard Animation',
        title_hindi: 'प्रकाश परावर्तन और दर्पण किरण अनुरेखण 3डी एनिमेशन',
        description: 'Interactive visual rendering explaining specular vs diffused reflection with live angle protractor.',
        resource_type: 'VIDEO',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        file_name: 'reflection_ray_tracing_3d.mp4',
        file_type: 'video/mp4',
        file_size: '42.5 MB',
        duration: '06m 45s',
        downloads: 84,
        status: 'PUBLISHED',
        recommended_sequence: 1,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'res-ppt-1',
        title: 'NCERT Exemplar Class Presentation: Laws of Reflection & Ray Diagrams',
        title_hindi: 'कक्षा प्रस्तुति: परावर्तन के नियम और किरण चित्र',
        description: 'Structured 18-slide animated deck for projection, classroom discussion prompts, and formula proofs.',
        resource_type: 'PRESENTATION',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://cdn.nactstudy.edu/physics/light-reflection-deck.pptx',
        file_name: 'light_reflection_deck.pptx',
        file_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        file_size: '14.2 MB',
        downloads: 142,
        status: 'PUBLISHED',
        recommended_sequence: 2,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'res-note-1',
        title: 'Bilingual Comprehensive Concept Notes & Formula Cheat Sheet',
        title_hindi: 'द्विभाषी अवधारणा नोट्स और सूत्र पुस्तिका',
        description: 'Complete high-yield revision notes covering regular vs irregular reflection, lateral inversion in plane mirrors, and periscope optics.',
        resource_type: 'LECTURE_NOTE',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://cdn.nactstudy.edu/science/class8-light-notes.pdf',
        file_name: 'class8_light_notes.pdf',
        file_type: 'application/pdf',
        file_size: '3.8 MB',
        downloads: 198,
        status: 'PUBLISHED',
        recommended_sequence: 3,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'res-ws-1',
        title: 'Ray Diagram Construction & Formative Exit-Ticket Worksheet',
        title_hindi: 'किरण आरेख निर्माण और निकास टिकट कार्यपत्रक',
        description: 'Differentiated student worksheet with angle calculations, normal vector plotting, and real-life reflection problem set.',
        resource_type: 'WORKSHEET',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://cdn.nactstudy.edu/science/worksheet-light-reflection.pdf',
        file_name: 'worksheet_light_reflection.pdf',
        file_type: 'application/pdf',
        file_size: '1.9 MB',
        downloads: 76,
        status: 'PUBLISHED',
        recommended_sequence: 4,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'res-act-1',
        title: 'Hands-on Laser Mirror Reflection Alignment Laboratory Activity',
        title_hindi: 'लेजर दर्पण परावर्तन संरेखण प्रयोगशाला गतिविधि',
        description: 'Classroom 2-person experiment using diode laser, plane mirror, and graduated paper protractor to verify Law 1 and Law 2.',
        resource_type: 'ACTIVITY',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://cdn.nactstudy.edu/science/activity-laser-reflection.pdf',
        file_name: 'activity_laser_reflection.pdf',
        file_type: 'application/pdf',
        file_size: '1.2 MB',
        duration: '15 min',
        downloads: 51,
        status: 'PUBLISHED',
        recommended_sequence: 5,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'res-quiz-1',
        title: 'Socratic Concept Check & 5-Question Exit Ticket Quiz',
        title_hindi: 'अवधारणा जांच और 5-प्रश्नों की निकास प्रश्नोत्तरी',
        description: 'Quick formative check assessing angle calculation when incident ray is tilted by 15 degrees.',
        resource_type: 'QUIZ',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        file_url: 'https://cdn.nactstudy.edu/science/quiz-light-5q.json',
        file_name: 'quiz_light_5q.json',
        file_type: 'application/json',
        file_size: '45 KB',
        duration: '5 min',
        downloads: 67,
        status: 'PUBLISHED',
        recommended_sequence: 6,
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      }
    );

    // 9. Lesson Plans
    this.lessonPlans.push({
      id: 'lp-light-1',
      class_id: class8.id,
      section_id: sec8A.id,
      subject_id: sub8Sci.id,
      chapter_id: chLight.id,
      topic_id: topLightLaws.id,
      lesson_date: '2026-10-05',
      duration_minutes: 40,
      learning_objectives: '1. Define Law of Reflection (angle i = angle r)\n2. Distinguish specular reflection from diffuse reflection\n3. Construct ray diagram for plane mirror image formation',
      teaching_method: 'Socratic Dialogue + Multimedia Ray Simulation + Guided Hands-on Laser Experiment',
      teaching_resources: 'Interactive 3D Ray Tracing Video, Animated Slide Deck, Laser Pointer & Plane Mirror Kit',
      classroom_activity: 'Pairs of students verify angle i = angle r using red diode laser and optical protractor chart',
      assessment_method: 'Formative 3-Question Exit Ticket buzzer quiz + homework worksheet exercise 16.1',
      homework: 'Complete worksheet questions 1-8; draw ray diagrams in lab observation manual',
      teacher_remarks: 'Emphasize that the normal is always perpendicular to reflecting surface at the exact point of incidence.',
      status: 'PUBLISHED',
      teacher_id: 'usr-3',
      teacher_name: 'Vikramaditya Roy',
      created_at: now,
      updated_at: now,
    });

    // 10. Assignments
    this.assignments.push({
      id: 'asg-light-1',
      class_id: class8.id,
      section_id: sec8A.id,
      subject_id: sub8Sci.id,
      chapter_id: chLight.id,
      topic_id: topLightLaws.id,
      title: 'Optics Assignment 3.1: Specular Reflection and Ray Tracing Proofs',
      description: 'Solve the 6 reflection problems, determine reflected ray coordinates, and explain diffuse reflection on paper surfaces.',
      due_date: '2026-10-12',
      total_marks: 25,
      submissions_count: 24,
      status: 'ACTIVE',
      created_by: 'usr-3',
      created_at: now,
      updated_at: now,
    });

    // 11. Question Bank Items
    this.questionBank.push(
      {
        id: 'qb-101',
        class_id: class8.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        question_text: 'A ray of light strikes a smooth plane mirror at an angle of 35° with the mirror surface. What is the angle of reflection?',
        question_type: 'MCQ',
        difficulty: 'Medium',
        options: ['A) 35°', 'B) 55°', 'C) 70°', 'D) 90°'],
        correct_answer: 'B) 55°',
        solution_explanation: 'Angle of incidence is measured with the NORMAL, not the mirror surface. i = 90° - 35° = 55°. By the Law of Reflection, r = i = 55°.',
        marks: 2,
        bloom_level: 'Apply',
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'qb-102',
        class_id: class8.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        question_text: 'Explain why we can see our clear image in a calm pool of water, but cannot see an image in water that is continuously rippled.',
        question_type: 'Short Answer',
        difficulty: 'Medium',
        options: [],
        correct_answer: 'Calm water gives regular/specular reflection; rippled water causes diffused/irregular reflection as normals point in random directions.',
        solution_explanation: 'Smooth calm surface has uniform normals leading to specular reflection. Ripples create uneven local tangents causing diffused scattering.',
        marks: 3,
        bloom_level: 'Understand',
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      },
      {
        id: 'qb-103',
        class_id: class8.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        question_text: 'If a clock shows 03:25, what time will appear on the clock when viewed in a plane mirror?',
        question_type: 'Numerical',
        difficulty: 'Hard',
        options: ['A) 08:35', 'B) 09:25', 'C) 08:25', 'D) 09:35'],
        correct_answer: 'A) 08:35',
        solution_explanation: 'Lateral inversion formula for 12-hour analog clock: (11:60 - 03:25) = 08:35.',
        marks: 2,
        bloom_level: 'Analyze',
        created_by: 'usr-3',
        created_at: now,
        updated_at: now,
      }
    );

    // 12. Classroom Activities
    this.classroomActivities.push({
      id: 'act-101',
      class_id: class8.id,
      subject_id: sub8Sci.id,
      chapter_id: chLight.id,
      topic_id: topLightLaws.id,
      title: 'Verification of Laws of Reflection using Plane Mirror Strip and Optical Pins',
      description: 'Students pin paper to drawing board, draw mirror line, insert 2 incident pins, and locate images by alignment of reflected pins.',
      activity_type: 'Lab Experiment',
      duration_minutes: 20,
      materials_required: ['Drawing board', 'Soft wooden sheet', 'Plane mirror strip with wooden stand', 'Optical pins', 'Protractor and ruler'],
      safety_instructions: 'Handle mirror strips with smoothed beveled edges to prevent cuts.',
      learning_outcomes: ['Empirical verification that angle i = angle r', 'Visual understanding of the normal as the perpendicular line'],
      created_by: 'usr-3',
      created_at: now,
      updated_at: now,
    });

    // 13. Student Progress
    this.studentProgressList.push(
      {
        id: 'prog-1',
        student_id: 'usr-8',
        student_name: 'Aarav Patel',
        class_id: class8.id,
        section_id: sec8A.id,
        subject_id: sub8Sci.id,
        chapter_id: chLight.id,
        topic_id: topLightLaws.id,
        completion_percentage: 85,
        assessment_score: 92,
        status: 'IN_PROGRESS',
        last_accessed: now,
      }
    );

    // 14. Initial Lesson Delivery record
    this.lessonDeliveries.push({
      id: 'del-prev-1',
      teacher_id: 'usr-3',
      teacher_name: 'Vikramaditya Roy',
      class_id: class8.id,
      section_id: sec8A.id,
      subject_id: sub8Sci.id,
      chapter_id: chForce.id,
      topic_id: topForceTypes.id,
      start_time: new Date(Date.now() - 86400000).toISOString(),
      end_time: new Date(Date.now() - 86400000 + 45 * 60000).toISOString(),
      duration_minutes: 45,
      status: 'COMPLETED',
      remarks: 'Covered contact vs non-contact forces and atmospheric pressure barometers. Student engagement high.',
      step_completed: 7,
      attendance_count: 31,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000 + 45 * 60000).toISOString(),
    });

    // 15. Audit Log Seed
    this.auditLogs.push({
      id: 'aud-1',
      user_id: 'usr-3',
      user_name: 'Vikramaditya Roy',
      action: 'CREATE',
      module: 'Lesson Plan',
      record_id: 'lp-light-1',
      new_value: { topic: 'Laws of Reflection', class: 'Class 8-A' },
      timestamp: now,
    });
  }

  // Audit Log Helper
  logAudit(userId: string, userName: string, action: AuditLog['action'], module: string, recordId: string, oldValue?: any, newValue?: any) {
    this.auditLogs.unshift({
      id: generateUUID(),
      user_id: userId,
      user_name: userName,
      action,
      module,
      record_id: recordId,
      old_value: oldValue,
      new_value: newValue,
      timestamp: new Date().toISOString(),
    });
    // Keep max 500 logs in memory
    if (this.auditLogs.length > 500) {
      this.auditLogs.pop();
    }
  }
}

export const cloudDb = new CloudDatabaseStore();

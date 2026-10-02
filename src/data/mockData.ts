import {
  CreatorProfile,
  InstituteProfile,
  AppUser,
  Course,
  DigitalProduct,
  Lead,
  WhatsAppConversation,
  WhatsAppTemplate,
  ChatFlowNode,
  EmailCampaign,
  AutomationWorkflow,
  SalesOrder,
  StudentEnrollment,
  CertificateRecord,
  UserActivityLog
} from '../types';

export const initialCreatorProfile: CreatorProfile = {
  name: 'Dr. Rajesh Sharma',
  avatarUrl: '/src/assets/images/nact_creator_avatar_1790950637141.jpg',
  title: 'Founder & Chief Academic Director',
  bio: 'Former Senior AI Architect and visiting professor with over 16 years of industry and academic leadership. Mentored over 14,000 engineering and management professionals globally.',
  qualification: 'Ph.D. in Computer Science (IIT Bombay), M.S. Data Systems',
  experienceYears: 16,
  specialization: 'Artificial Intelligence, Distributed Systems, FinTech Architectures',
  mobile: '+91 98765 43210',
  email: 'rajesh.sharma@nactstudy.com',
  website: 'https://nactstudy.com/creator/dr-rajesh-sharma',
  socials: {
    linkedin: 'https://linkedin.com/in/rajesh-sharma-nact',
    youtube: 'https://youtube.com/@nactstudy',
    twitter: 'https://x.com/rajesh_nact',
  },
  slug: 'dr-rajesh-sharma',
};

export const initialInstituteProfile: InstituteProfile = {
  name: 'Nact Institute of Advanced Technologies',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=160&q=80',
  registrationNumber: 'NACT-EDU-IND-2021-9842',
  address: 'Level 4, Innovation Park, Sector 62, Noida, NCR 201309',
  contactNumber: '+91 120 499 8800',
  email: 'admissions@nactstudy.com',
  website: 'https://nactstudy.com',
  about: 'Nact Institute is a premier institution bridging corporate skill gaps with practical cohort-based education, continuous mentorship, and recognized industry certifications.',
  mission: 'To empower 100,000 working professionals and university graduates with elite, market-relevant tech and leadership competencies.',
  vision: 'To build India’s most outcomes-driven tech learning ecosystem integrating LMS, continuous career counseling, and hands-on production engineering.',
  primaryColor: '#0f172a',
  secondaryColor: '#4f46e5',
  emailSignature: 'Warm regards,\nDr. Rajesh Sharma & The Admissions Council\nNact Institute of Advanced Technologies\nwww.nactstudy.com',
  whatsappSignature: 'Team Nact Study | Transforming Tech Careers | Toll-free: 1800-419-NACT',
};

export const initialUsers: AppUser[] = [
  {
    id: 'usr-2',
    name: 'Anita Sen',
    email: 'anita.sen@nactstudy.com',
    username: 'admin',
    password: 'admin123',
    role: 'Super Admin',
    portalType: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    department: 'Executive Operations & Administration',
    phone: '+91 98111 22334',
    active: true,
    permissions: {
      dashboard: true,
      students: true,
      teachers: true,
      classes: true,
      lms: true,
      fees: true,
      crm: true,
      masters: true,
      reports: true,
      attendance: true,
      grading: true,
      assignments: true,
      settings: true,
      userRights: true,
    }
  },
  {
    id: 'usr-3',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@nactstudy.com',
    username: 'vikram.roy',
    password: 'teacher123',
    role: 'Faculty',
    portalType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    department: 'Department of Artificial Intelligence & Data Systems',
    phone: '+91 98222 33445',
    active: true,
    assignedClasses: [
      'Post-Graduate Diploma (AI & Data Science)',
      'Distributed Cloud & MLOps Certification'
    ],
    permissions: {
      dashboard: true,
      students: true,
      teachers: false,
      classes: true,
      lms: true,
      fees: false,
      crm: false,
      masters: false,
      reports: false,
      attendance: true,
      grading: true,
      assignments: true,
      settings: false,
      userRights: false,
    }
  },
  {
    id: 'usr-10',
    name: 'Dr. Priya Sundaram',
    email: 'priya.sundaram@nactstudy.com',
    username: 'priya.sundaram',
    password: 'teacher123',
    role: 'Faculty',
    portalType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    department: 'Department of Corporate Valuation & Financial Tech',
    phone: '+91 98450 12399',
    active: true,
    assignedClasses: [
      'Executive Financial Modeling & Valuation'
    ],
    permissions: {
      dashboard: true,
      students: true,
      teachers: false,
      classes: true,
      lms: true,
      fees: false,
      crm: false,
      masters: false,
      reports: false,
      attendance: true,
      grading: true,
      assignments: true,
      settings: false,
      userRights: false,
    }
  },
  {
    id: 'usr-8',
    name: 'Aarav Patel',
    email: 'aarav.patel@gmail.com',
    username: 'aarav.patel',
    password: 'student123',
    role: 'Student',
    portalType: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80',
    department: 'Post-Graduate Diploma (AI & Data Science)',
    phone: '+91 98777 88990',
    studentId: 'PRE-1001',
    admissionNo: 'ADM-9042',
    active: true,
    assignedClasses: ['Post-Graduate Diploma (AI & Data Science)'],
    permissions: {
      dashboard: true,
      students: false,
      teachers: false,
      classes: true,
      lms: true,
      fees: true,
      crm: false,
      masters: false,
      reports: false,
      attendance: true,
      grading: true,
      assignments: true,
      settings: false,
      userRights: false,
    }
  },
  {
    id: 'usr-11',
    name: 'Sneha Kulkarni',
    email: 'sneha.k@gmail.com',
    username: 'sneha.k',
    password: 'student123',
    role: 'Student',
    portalType: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    department: 'Executive Financial Modeling & Valuation',
    phone: '+91 98222 11044',
    studentId: 'PRE-1002',
    admissionNo: 'ADM-9043',
    active: true,
    assignedClasses: ['Executive Financial Modeling & Valuation'],
    permissions: {
      dashboard: true,
      students: false,
      teachers: false,
      classes: true,
      lms: true,
      fees: true,
      crm: false,
      masters: false,
      reports: false,
      attendance: true,
      grading: true,
      assignments: true,
      settings: false,
      userRights: false,
    }
  },
  {
    id: 'usr-1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@nactstudy.com',
    username: 'rajesh.sharma',
    password: 'admin123',
    role: 'Creator',
    portalType: 'admin',
    avatar: '/src/assets/images/nact_creator_avatar_1790950637141.jpg',
    department: 'Leadership & Academic Direction',
    phone: '+91 98765 43210',
    active: true,
    permissions: {
      dashboard: true,
      students: true,
      teachers: true,
      classes: true,
      lms: true,
      fees: true,
      crm: true,
      masters: true,
      reports: true,
      attendance: true,
      grading: true,
      assignments: true,
      settings: true,
      userRights: true,
    }
  },
  {
    id: 'usr-4',
    name: 'Pooja Kashyap',
    email: 'pooja.k@nactstudy.com',
    username: 'pooja.k',
    password: 'staff123',
    role: 'Counselor',
    portalType: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    department: 'Admissions & Student Advisory',
    phone: '+91 98333 44556',
    active: true,
    assignedLeadsCount: 42,
    salesClosedAmount: 840000,
    permissions: {
      dashboard: true,
      students: true,
      teachers: false,
      classes: false,
      lms: false,
      fees: true,
      crm: true,
      masters: false,
      reports: true,
      attendance: false,
      grading: false,
      assignments: false,
      settings: false,
      userRights: false,
    }
  }
];

export const initialActivityLogs: UserActivityLog[] = [
  // Admin Activities
  {
    id: 'act-1',
    userId: 'usr-2',
    userName: 'Anita Sen',
    userRole: 'Super Admin',
    portalType: 'admin',
    action: 'Approved Student Admission ADM-9042',
    details: 'Enrolled Aarav Patel into Post-Graduate Diploma (AI & Data Science) Cohort A',
    timestamp: 'Today at 09:15 AM',
    category: 'admissions'
  },
  {
    id: 'act-2',
    userId: 'usr-2',
    userName: 'Anita Sen',
    userRole: 'Super Admin',
    portalType: 'admin',
    action: 'Updated User Rights & Permissions',
    details: 'Configured attendance marking & grading rights for Faculty member Vikramaditya Roy',
    timestamp: 'Today at 09:45 AM',
    category: 'system'
  },
  {
    id: 'act-3',
    userId: 'usr-2',
    userName: 'Anita Sen',
    userRole: 'Super Admin',
    portalType: 'admin',
    action: 'Master Settings Sync',
    details: 'Created new Academic Term AY-2026-27 and 3 GPU compute lab rooms in Master Hub',
    timestamp: 'Yesterday at 04:30 PM',
    category: 'system'
  },

  // Teacher Vikramaditya Roy Activities (Isolated)
  {
    id: 'act-4',
    userId: 'usr-3',
    userName: 'Vikramaditya Roy',
    userRole: 'Faculty',
    portalType: 'teacher',
    action: 'Graded Transformer Capstone Assignment',
    details: 'Awarded 98/100 to Aarav Patel with feedback: Excellent PyTorch self-attention implementation.',
    timestamp: 'Today at 10:30 AM',
    category: 'grading'
  },
  {
    id: 'act-5',
    userId: 'usr-3',
    userName: 'Vikramaditya Roy',
    userRole: 'Faculty',
    portalType: 'teacher',
    action: 'Marked Daily Batch Attendance',
    details: 'Recorded attendance for AI & Data Science Cohort A (28 Students Present, 2 Absent)',
    timestamp: 'Today at 11:00 AM',
    category: 'attendance'
  },
  {
    id: 'act-6',
    userId: 'usr-3',
    userName: 'Vikramaditya Roy',
    userRole: 'Faculty',
    portalType: 'teacher',
    action: 'Published Live Lab Class Link',
    details: 'Scheduled Zoom enterprise cluster session: Distributed CUDA Kernels for Saturday 10:00 AM',
    timestamp: 'Yesterday at 03:00 PM',
    category: 'academic'
  },

  // Teacher Dr. Priya Sundaram Activities (Isolated)
  {
    id: 'act-7',
    userId: 'usr-10',
    userName: 'Dr. Priya Sundaram',
    userRole: 'Faculty',
    portalType: 'teacher',
    action: 'Graded Corporate Valuation Models',
    details: 'Evaluated Sneha Kulkarni DCF financial models and awarded 96/100.',
    timestamp: 'Today at 10:15 AM',
    category: 'grading'
  },
  {
    id: 'act-8',
    userId: 'usr-10',
    userName: 'Dr. Priya Sundaram',
    userRole: 'Faculty',
    portalType: 'teacher',
    action: 'Marked Attendance for Finance Cohort',
    details: 'Recorded attendance for Executive Valuation Batch (24 Present, 1 On Leave)',
    timestamp: 'Today at 11:30 AM',
    category: 'attendance'
  },

  // Student Aarav Patel Activities (Strictly Private & Isolated)
  {
    id: 'act-9',
    userId: 'usr-8',
    userName: 'Aarav Patel',
    userRole: 'Student',
    portalType: 'student',
    action: 'Submitted Capstone Project Repository',
    details: 'Uploaded GitHub link for Transformer Architectures & RAG Pipeline Evaluation.',
    timestamp: 'Today at 09:30 AM',
    category: 'academic'
  },
  {
    id: 'act-10',
    userId: 'usr-8',
    userName: 'Aarav Patel',
    userRole: 'Student',
    portalType: 'student',
    action: 'Completed Module 3 Video Lecture',
    details: 'Finished Multi-Head Attention Mathematics and completed practice quiz (Score: 100%).',
    timestamp: 'Today at 10:45 AM',
    category: 'academic'
  },
  {
    id: 'act-11',
    userId: 'usr-8',
    userName: 'Aarav Patel',
    userRole: 'Student',
    portalType: 'student',
    action: 'Fee Installment Paid Successfully',
    details: 'Processed payment of ₹28,800 via Razorpay UPI (Receipt REC-9821 issued).',
    timestamp: 'Yesterday at 02:20 PM',
    category: 'fees'
  },

  // Student Sneha Kulkarni Activities (Strictly Private & Isolated)
  {
    id: 'act-12',
    userId: 'usr-11',
    userName: 'Sneha Kulkarni',
    userRole: 'Student',
    portalType: 'student',
    action: 'Submitted Financial Statement Analysis',
    details: 'Submitted 3-statement model Excel sheet for evaluation.',
    timestamp: 'Today at 09:00 AM',
    category: 'academic'
  },
  {
    id: 'act-13',
    userId: 'usr-11',
    userName: 'Sneha Kulkarni',
    userRole: 'Student',
    portalType: 'student',
    action: 'Completed Valuation Quiz 2',
    details: 'Scored 96.2% on WACC and Capital Asset Pricing Model evaluation.',
    timestamp: 'Yesterday at 04:00 PM',
    category: 'academic'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'crs-1',
    code: 'NACT-AI-401',
    title: 'Full-Stack Data Science & Generative AI Masterclass',
    category: 'Data Science & AI',
    subcategory: 'Applied Machine Learning',
    creatorName: 'Dr. Rajesh Sharma',
    facultyName: 'Vikramaditya Roy',
    shortDescription: 'From Python fundamentals and PyTorch to LLM fine-tuning, RAG pipelines, and enterprise deployment.',
    fullDescription: 'An exhaustive 24-week professional program designed for software engineers and analysts looking to transition into senior AI engineering and MLOps positions. Includes 12 capstone projects, live weekly code reviews, and guaranteed placement interview assistance.',
    thumbnail: '/src/assets/images/course_data_science_1790950655440.jpg',
    banner: '/src/assets/images/course_data_science_1790950655440.jpg',
    introVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'Hybrid',
    isFree: false,
    price: 36000,
    discountPercentage: 20,
    finalPrice: 28800,
    installmentAvailable: true,
    validityDays: 365,
    enrollmentLimit: 120,
    enrolledStudentsCount: 88,
    isPublished: true,
    isCertificateEnabled: true,
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Mathematical Foundations & Advanced Python for Data',
        description: 'Linear algebra, calculus for gradients, vectorization, and Python data pipelines.',
        order: 1,
        lessons: [
          {
            id: 'les-1',
            title: 'Foundations of Tensors and Vector Algebra',
            description: 'Understanding multi-dimensional arrays, broadcasting rules, and memory layout.',
            durationMinutes: 48,
            type: 'video',
            isPreviewFree: true,
            isDownloadAllowed: false,
            isCompleted: true,
          },
          {
            id: 'les-2',
            title: 'NumPy, Pandas & Polars Performance Benchmarking',
            description: 'High-throughput data manipulation and memory-efficient querying.',
            durationMinutes: 52,
            type: 'video',
            isPreviewFree: true,
            isDownloadAllowed: true,
            isCompleted: true,
          },
          {
            id: 'les-3',
            title: 'Official Cheatsheet & Calculus Notebook (PDF)',
            description: 'Comprehensive mathematical formula reference with solved gradient examples.',
            durationMinutes: 30,
            type: 'pdf',
            isPreviewFree: false,
            isDownloadAllowed: true,
            isCompleted: true,
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Deep Learning Architectures & Transformer Mechanics',
        description: 'Multi-head self-attention, encoder-decoder transformers, and PyTorch implementations.',
        order: 2,
        lessons: [
          {
            id: 'les-4',
            title: 'Attention Is All You Need — Dissecting the Math',
            description: 'Line-by-line decomposition of scaled dot-product attention and positional encoding.',
            durationMinutes: 65,
            type: 'video',
            isPreviewFree: false,
            isDownloadAllowed: false,
            isCompleted: true,
          },
          {
            id: 'les-5',
            title: 'Building a Mini-Transformer from Scratch in PyTorch',
            description: 'Hands-on coding session implementing self-attention blocks and layer norm.',
            durationMinutes: 72,
            type: 'video',
            isPreviewFree: false,
            isDownloadAllowed: false,
            isCompleted: false,
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Enterprise RAG & Autonomous Agent Pipelines',
        description: 'Vector databases, LangChain, semantic rerankers, and production evaluation.',
        order: 3,
        lessons: [
          {
            id: 'les-6',
            title: 'Advanced Hybrid Search: BM25 + Vector Embeddings',
            description: 'Optimizing retrieval precision with reciprocal rank fusion.',
            durationMinutes: 58,
            type: 'video',
            isPreviewFree: false,
            isDownloadAllowed: false,
            isCompleted: false,
          }
        ]
      }
    ],
    assignments: [
      {
        id: 'asg-1',
        courseId: 'crs-1',
        title: 'Assignment 1: Implement Self-Attention & Positional Embedding in PyTorch',
        description: 'Write a self-contained PyTorch module that implements scaled dot-product attention with causal masking. Include unit tests asserting tensor shapes.',
        deadline: '2026-10-15',
        totalMarks: 100,
        passingMarks: 70,
        submitted: true,
        submissionDate: '2026-09-28',
        score: 94,
        feedback: 'Excellent work on vector broadcast optimization and custom attention mask handling.',
      },
      {
        id: 'asg-2',
        courseId: 'crs-1',
        title: 'Assignment 2: Production Document RAG with Hybrid Evaluation',
        description: 'Build a document analysis pipeline with PDF chunking, chunk overlap calibration, ChromaDB indexing, and RAGAS benchmark metrics.',
        deadline: '2026-10-28',
        totalMarks: 100,
        passingMarks: 70,
        submitted: false,
      }
    ],
    quizzes: [
      {
        id: 'qiz-1',
        courseId: 'crs-1',
        title: 'Module 1 Assessment: Calculus, Linear Algebra & Tensors',
        timeLimitMinutes: 20,
        passingPercentage: 75,
        completed: true,
        userScore: 90,
        attemptsCount: 1,
        questions: [
          {
            id: 'q1',
            question: 'What is the primary computational advantage of using flash attention over standard scaled dot-product attention?',
            options: [
              'It approximates the softmax to zero',
              'It performs exact softmax using SRAM tiling to avoid HBM read/write bottlenecks',
              'It reduces the number of attention heads by 50%',
              'It eliminates the need for matrix multiplications'
            ],
            correctOptionIndex: 1,
            explanation: 'Flash attention tiles Q, K, V blocks into fast GPU on-chip SRAM to minimize slow High-Bandwidth Memory roundtrips.'
          },
          {
            id: 'q2',
            question: 'In PyTorch, why do we call optimizer.zero_grad() before loss.backward()?',
            options: [
              'To reset the model weights to random values',
              'To prevent gradients from accumulating across consecutive backward passes',
              'To clear cache memory on the GPU',
              'To initialize the loss tensor'
            ],
            correctOptionIndex: 1,
            explanation: 'PyTorch accumulates gradients by default; clearing them prevents stale gradient summation.'
          }
        ]
      }
    ],
    liveClasses: [
      {
        id: 'live-1',
        courseId: 'crs-1',
        title: 'Cohort Live Office Hours: Troubleshooting CUDA Out-Of-Memory Errors',
        facultyName: 'Vikramaditya Roy',
        date: '2026-10-04',
        startTime: '19:00',
        endTime: '20:30',
        meetLink: 'https://meet.nactstudy.com/live/cohort-ai-401',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'crs-2',
    code: 'NACT-FIN-302',
    title: 'Executive Financial Modeling & Investment Banking Valuation',
    category: 'Finance & Banking',
    subcategory: 'Corporate Finance',
    creatorName: 'Dr. Rajesh Sharma',
    facultyName: 'Priya Sundaram',
    shortDescription: 'Master DCF, LBO modeling, M&A accretion/dilution, and pitch-book financial story-telling.',
    fullDescription: 'Comprehensive training for corporate finance analysts, PE associates, and startup founders. Build institutional-grade 3-statement models from scratch in Excel and Python.',
    thumbnail: '/src/assets/images/course_executive_finance_1790950669498.jpg',
    banner: '/src/assets/images/course_executive_finance_1790950669498.jpg',
    introVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'Pre-recorded',
    isFree: false,
    price: 24000,
    discountPercentage: 25,
    finalPrice: 18000,
    installmentAvailable: true,
    validityDays: 180,
    enrollmentLimit: 150,
    enrolledStudentsCount: 112,
    isPublished: true,
    isCertificateEnabled: true,
    modules: [
      {
        id: 'mod-f1',
        title: 'Module 1: Integrated 3-Statement Financial Modeling',
        description: 'Income statement, balance sheet, and cash flow statement dynamic linkage.',
        order: 1,
        lessons: [
          {
            id: 'les-f1',
            title: 'Revenue Driver Forecasting & Operating Schedules',
            description: 'Building volume-price mix models for multi-segment enterprises.',
            durationMinutes: 45,
            type: 'video',
            isPreviewFree: true,
            isDownloadAllowed: true,
            isCompleted: true,
          }
        ]
      }
    ],
    assignments: [],
    quizzes: [],
    liveClasses: []
  }
];

export const initialDigitalProducts: DigitalProduct[] = [
  {
    id: 'prod-1',
    title: 'Full-Stack Data Science & Generative AI Masterclass',
    type: 'Course',
    creatorName: 'Dr. Rajesh Sharma',
    price: 28800,
    originalPrice: 36000,
    description: '24-week live cohort covering transformers, LLMs, and enterprise deployment.',
    thumbnail: '/src/assets/images/course_data_science_1790950655440.jpg',
    salesCount: 88,
    status: 'active'
  },
  {
    id: 'prod-2',
    title: 'Executive Financial Modeling & Investment Banking Valuation',
    type: 'Course',
    creatorName: 'Dr. Rajesh Sharma',
    price: 18000,
    originalPrice: 24000,
    description: 'High-yield practical valuation and M&A financial model certification.',
    thumbnail: '/src/assets/images/course_executive_finance_1790950669498.jpg',
    salesCount: 112,
    status: 'active'
  },
  {
    id: 'prod-3',
    title: 'Next-Gen AI Systems: Architecture & Career Pivot 2026',
    type: 'Webinar',
    creatorName: 'Dr. Rajesh Sharma',
    price: 499,
    originalPrice: 1999,
    description: 'Live 2-hour interactive masterclass on modern generative stack and career transition.',
    thumbnail: '/src/assets/images/webinar_live_event_1790950685397.jpg',
    salesCount: 340,
    status: 'active',
    webinarDetails: {
      date: '2026-10-08',
      time: '18:00 - 20:00 IST',
      platform: 'Zoom Enterprise (Encrypted)',
      link: 'https://zoom.us/j/9842103984',
      capacity: 500,
      registeredCount: 340,
    }
  },
  {
    id: 'prod-4',
    title: '1:1 Executive Tech Career & Architecture Consultation',
    type: '1:1 Consultation',
    creatorName: 'Dr. Rajesh Sharma',
    price: 4500,
    originalPrice: 6000,
    description: 'Dedicated 45-minute private strategy session with Dr. Rajesh Sharma covering portfolio, architecture roadmaps, or higher education.',
    thumbnail: '/src/assets/images/nact_creator_avatar_1790950637141.jpg',
    salesCount: 125,
    status: 'active',
    consultationDetails: {
      durationMinutes: 45,
      availableDays: ['Tuesday', 'Thursday', 'Saturday'],
      availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM', '07:00 PM'],
      bufferTimeMinutes: 15,
      platform: 'Google Meet Dedicated Room'
    }
  },
  {
    id: 'prod-5',
    title: 'The Modern MLOps & Production Handbook (Digital Edition)',
    type: 'Book',
    creatorName: 'Dr. Rajesh Sharma',
    price: 1299,
    originalPrice: 2499,
    description: '380-page DRM-free technical guide with downloadable Git repositories and CI/CD pipelines.',
    thumbnail: '/src/assets/images/course_data_science_1790950655440.jpg',
    salesCount: 420,
    status: 'active'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    code: 'LD-9021',
    name: 'Aakash Verma',
    mobile: '+91 98190 12345',
    whatsapp: '+91 98190 12345',
    email: 'aakash.verma@techcorp.in',
    city: 'Bengaluru',
    state: 'Karnataka',
    source: 'Meta Ads',
    campaign: 'Q4_AI_Engineers_Retargeting',
    interestedProduct: 'Full-Stack Data Science & Generative AI Masterclass',
    productId: 'crs-1',
    productType: 'Course',
    budget: 30000,
    stage: 'payment_pending',
    assignedCounselorId: 'usr-4',
    assignedCounselorName: 'Pooja Kashyap',
    priority: 'High',
    qualification: 'B.Tech Computer Science',
    experienceYears: 4,
    occupation: 'Senior Backend Developer at Cognizant',
    nextFollowUpDate: '2026-10-02',
    nextFollowUpTime: '15:00',
    followUpType: 'WhatsApp',
    remarks: 'Attended webinar, highly impressed by syllabus. Requested link for 2-installment plan.',
    createdAt: '2026-09-29T10:30:00Z',
    timeline: [
      {
        id: 'tl-1',
        timestamp: '29-Sep 10:30 AM',
        title: 'Lead Created',
        description: 'Captured via Meta Lead Ad campaign "Q4_AI_Engineers_Retargeting".',
        author: 'System',
        type: 'created'
      },
      {
        id: 'tl-2',
        timestamp: '29-Sep 10:32 AM',
        title: 'WhatsApp Welcome Sent',
        description: 'Template "lead_welcome_brochure" dispatched automatically.',
        author: 'System (WhatsApp Engine)',
        type: 'whatsapp'
      },
      {
        id: 'tl-3',
        timestamp: '29-Sep 11:15 AM',
        title: 'Customer Replied',
        description: '"I want to know if GPU server access is included in the course fee."',
        author: 'Aakash Verma',
        type: 'whatsapp'
      },
      {
        id: 'tl-4',
        timestamp: '29-Sep 12:00 PM',
        title: 'Counselor Called',
        description: 'Explained GPU cloud quota ($200 credits), confirmed interest in evening batch.',
        author: 'Pooja Kashyap',
        type: 'call'
      },
      {
        id: 'tl-5',
        timestamp: '30-Sep 04:00 PM',
        title: 'Demo Scheduled',
        description: '1:1 Syllabus walkthrough demo booked for Oct 1st.',
        author: 'Pooja Kashyap',
        type: 'demo'
      },
      {
        id: 'tl-6',
        timestamp: '01-Oct 04:30 PM',
        title: 'Demo Completed',
        description: 'Walkthrough finished. Candidate decided on enrollment.',
        author: 'Pooja Kashyap',
        type: 'demo'
      },
      {
        id: 'tl-7',
        timestamp: '02-Oct 10:00 AM',
        title: 'Payment Link Sent',
        description: 'Razorpay installment payment link sent via WhatsApp (₹14,400 x 2).',
        author: 'Pooja Kashyap',
        type: 'proposal'
      }
    ]
  },
  {
    id: 'lead-102',
    code: 'LD-9022',
    name: 'Sneha Kulkarni',
    mobile: '+91 97654 32109',
    whatsapp: '+91 97654 32109',
    email: 'sneha.k@finanalytics.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    source: 'WhatsApp Inbound',
    campaign: 'Organic_Chatbot_Flow',
    interestedProduct: 'Executive Financial Modeling & Investment Banking Valuation',
    productId: 'crs-2',
    productType: 'Course',
    budget: 20000,
    stage: 'counselling_scheduled',
    assignedCounselorId: 'usr-5',
    assignedCounselorName: 'Rohan Mehra',
    priority: 'High',
    qualification: 'MBA Finance',
    experienceYears: 2,
    occupation: 'Equity Research Analyst',
    nextFollowUpDate: '2026-10-03',
    nextFollowUpTime: '11:00',
    followUpType: 'Video Demo',
    remarks: 'Looking to transition to Buy-Side Private Equity. Wants curriculum comparison with CFA level 2.',
    createdAt: '2026-10-01T09:15:00Z',
    timeline: [
      {
        id: 'tl-21',
        timestamp: '01-Oct 09:15 AM',
        title: 'Inbound WhatsApp Inquiry',
        description: 'Customer initiated chat via QR code on website.',
        author: 'WhatsApp Bot',
        type: 'whatsapp'
      },
      {
        id: 'tl-22',
        timestamp: '01-Oct 09:20 AM',
        title: 'Counselor Assigned',
        description: 'Auto-assigned to Rohan Mehra based on Finance domain specialty.',
        author: 'Automation Engine',
        type: 'created'
      },
      {
        id: 'tl-23',
        timestamp: '01-Oct 02:00 PM',
        title: 'Counselling Scheduled',
        description: 'Calendar invite confirmed for 3-Oct 11:00 AM.',
        author: 'Rohan Mehra',
        type: 'call'
      }
    ]
  },
  {
    id: 'lead-103',
    code: 'LD-9023',
    name: 'Manoj Deshmukh',
    mobile: '+91 99887 76655',
    whatsapp: '+91 99887 76655',
    email: 'manoj.d@cloudinfra.net',
    city: 'Pune',
    state: 'Maharashtra',
    source: 'Google Search',
    campaign: 'Search_Generative_AI_Course',
    interestedProduct: 'Full-Stack Data Science & Generative AI Masterclass',
    productId: 'crs-1',
    productType: 'Course',
    budget: 35000,
    stage: 'won',
    assignedCounselorId: 'usr-4',
    assignedCounselorName: 'Pooja Kashyap',
    priority: 'High',
    qualification: 'M.Tech Systems',
    experienceYears: 6,
    occupation: 'DevOps Lead',
    nextFollowUpDate: '2026-10-05',
    nextFollowUpTime: '10:00',
    followUpType: 'Phone Call',
    remarks: 'Payment complete! Enrolled in Batch #15. Onboarding package dispatched.',
    createdAt: '2026-09-25T14:20:00Z',
    timeline: [
      {
        id: 'tl-31',
        timestamp: '25-Sep 02:20 PM',
        title: 'Lead Captured',
        description: 'Inbound form submission from landing page.',
        author: 'System',
        type: 'created'
      },
      {
        id: 'tl-32',
        timestamp: '26-Sep 11:00 AM',
        title: 'Counseling Call',
        description: 'Detailed conversation on syllabus and cohort schedule.',
        author: 'Pooja Kashyap',
        type: 'call'
      },
      {
        id: 'tl-33',
        timestamp: '27-Sep 03:45 PM',
        title: 'Payment Received',
        description: 'Full payment of ₹28,800 received via UPI (UTR: UPI-984210499).',
        author: 'Payment Gateway',
        type: 'payment'
      },
      {
        id: 'tl-34',
        timestamp: '27-Sep 03:46 PM',
        title: 'Enrollment Created',
        description: 'Auto-provisioned student account and enrolled into NACT-AI-401.',
        author: 'Automation Engine',
        type: 'enrollment'
      }
    ]
  },
  {
    id: 'lead-104',
    code: 'LD-9024',
    name: 'Tanya Narang',
    mobile: '+91 98711 00223',
    whatsapp: '+91 98711 00223',
    email: 'tanya.narang@startupflow.io',
    city: 'Gurugram',
    state: 'Haryana',
    source: 'Webinar Reg',
    campaign: 'Webinar_NextGen_AI_Oct',
    interestedProduct: '1:1 Executive Tech Career & Architecture Consultation',
    productId: 'prod-4',
    productType: '1:1 Consultation',
    budget: 5000,
    stage: 'qualified',
    assignedCounselorId: 'usr-5',
    assignedCounselorName: 'Rohan Mehra',
    priority: 'Medium',
    qualification: 'B.E. Electronics',
    experienceYears: 5,
    occupation: 'Product Manager',
    nextFollowUpDate: '2026-10-04',
    nextFollowUpTime: '16:00',
    followUpType: 'Phone Call',
    remarks: 'Registered for upcoming webinar, expressed interest in booking 1:1 consultation with Dr. Rajesh.',
    createdAt: '2026-10-01T16:40:00Z',
    timeline: [
      {
        id: 'tl-41',
        timestamp: '01-Oct 04:40 PM',
        title: 'Webinar Registration',
        description: 'Registered for "Next-Gen AI Systems" webinar.',
        author: 'System',
        type: 'created'
      },
      {
        id: 'tl-42',
        timestamp: '01-Oct 04:41 PM',
        title: 'Confirmation WhatsApp',
        description: 'Sent webinar zoom link and calendar invitation.',
        author: 'Automation Engine',
        type: 'whatsapp'
      }
    ]
  },
  {
    id: 'lead-105',
    code: 'LD-9025',
    name: 'Harish Chandra',
    mobile: '+91 98300 44556',
    whatsapp: '+91 98300 44556',
    email: 'harish.c@kolkatatech.org',
    city: 'Kolkata',
    state: 'West Bengal',
    source: 'Organic YouTube',
    campaign: 'YouTube_LLM_RAG_Tutorial',
    interestedProduct: 'Full-Stack Data Science & Generative AI Masterclass',
    productId: 'crs-1',
    productType: 'Course',
    budget: 25000,
    stage: 'new',
    assignedCounselorId: 'usr-4',
    assignedCounselorName: 'Pooja Kashyap',
    priority: 'Medium',
    qualification: 'MCA',
    experienceYears: 1,
    occupation: 'Junior Data Analyst',
    nextFollowUpDate: '2026-10-02',
    nextFollowUpTime: '17:30',
    followUpType: 'Phone Call',
    remarks: 'Came via YouTube link in description. Needs callback regarding batch timing flexibility.',
    createdAt: '2026-10-02T06:10:00Z',
    timeline: [
      {
        id: 'tl-51',
        timestamp: '02-Oct 06:10 AM',
        title: 'Lead Captured',
        description: 'New lead from YouTube video description form.',
        author: 'System',
        type: 'created'
      }
    ]
  }
];

export const initialWhatsAppConversations: WhatsAppConversation[] = [
  {
    id: 'w-conv-1',
    contactName: 'Aakash Verma',
    phone: '+91 98190 12345',
    assignedCounselor: 'Pooja Kashyap',
    unreadCount: 0,
    lastMessage: 'Here is your direct installment checkout link: https://nactstudy.com/pay/order-8812',
    lastMessageTime: '10:00 AM',
    messages: [
      {
        id: 'm1',
        conversationId: 'w-conv-1',
        sender: 'system',
        text: 'Hi Aakash, thank you for your interest in Full-Stack Data Science & Generative AI Masterclass at Nact Study. Our counselor Pooja Kashyap will connect with you shortly.',
        timestamp: '29-Sep 10:32 AM',
        status: 'read',
        templateName: 'lead_welcome'
      },
      {
        id: 'm2',
        conversationId: 'w-conv-1',
        sender: 'customer',
        text: 'Hi, is GPU server access included in the course fee?',
        timestamp: '29-Sep 11:15 AM',
        status: 'read'
      },
      {
        id: 'm3',
        conversationId: 'w-conv-1',
        sender: 'counselor',
        text: 'Hi Aakash! Yes, every cohort member gets dedicated cloud compute ($200 GPU credits) for training models and capstone projects. Shall we schedule a quick 10-min curriculum demo?',
        timestamp: '29-Sep 11:25 AM',
        status: 'read'
      },
      {
        id: 'm4',
        conversationId: 'w-conv-1',
        sender: 'customer',
        text: 'Yes please, can we do Oct 1 at 4 PM?',
        timestamp: '29-Sep 11:30 AM',
        status: 'read'
      },
      {
        id: 'm5',
        conversationId: 'w-conv-1',
        sender: 'counselor',
        text: 'Here is your direct installment checkout link: https://nactstudy.com/pay/order-8812. You can split into 2 payments of ₹14,400.',
        timestamp: '02-Oct 10:00 AM',
        status: 'delivered',
        templateName: 'payment_reminder'
      }
    ]
  },
  {
    id: 'w-conv-2',
    contactName: 'Sneha Kulkarni',
    phone: '+91 97654 32109',
    assignedCounselor: 'Rohan Mehra',
    unreadCount: 1,
    lastMessage: 'Can you please send me the sample valuation model from Module 2?',
    lastMessageTime: '08:45 AM',
    messages: [
      {
        id: 'm21',
        conversationId: 'w-conv-2',
        sender: 'system',
        text: 'Welcome to Nact Study! How may we assist your learning goals today?',
        timestamp: '01-Oct 09:15 AM',
        status: 'read'
      },
      {
        id: 'm22',
        conversationId: 'w-conv-2',
        sender: 'customer',
        text: 'Can you please send me the sample valuation model from Module 2?',
        timestamp: '02-Oct 08:45 AM',
        status: 'delivered'
      }
    ]
  }
];

export const initialWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'lead_welcome',
    category: 'Transactional',
    body: 'Hi {{name}},\n\nThank you for your interest in {{course}} at Nact Study.\n\nOur senior counselor will contact you shortly to share the syllabus and answer your questions.\n\nBest,\nNact Study Team',
    variables: ['name', 'course']
  },
  {
    id: 'tmpl-2',
    name: 'payment_reminder',
    category: 'Transactional',
    body: 'Hi {{name}},\n\nYour enrollment for {{course}} is pending.\n\nPlease complete your payment to confirm your seat before the cohort batch closes: {{link}}\n\nWarm regards,\nNact Study Admissions',
    variables: ['name', 'course', 'link']
  },
  {
    id: 'tmpl-3',
    name: 'class_reminder',
    category: 'Utility',
    body: 'Reminder: Your {{course}} class starts at {{time}} today.\n\nJoin live session here: {{link}}\n\nPlease have your development environment ready.',
    variables: ['course', 'time', 'link']
  },
  {
    id: 'tmpl-4',
    name: 'certificate_ready',
    category: 'Transactional',
    body: 'Congratulations {{name}}! 🎓\n\nYou have officially completed {{course}}. Your verified certificate #{{certificate_number}} is now available for download: {{link}}',
    variables: ['name', 'course', 'certificate_number', 'link']
  }
];

export const initialChatFlowNodes: ChatFlowNode[] = [
  {
    id: 'node-start',
    title: 'START: Welcome Trigger',
    type: 'trigger',
    content: 'User sends any WhatsApp greeting or clicks website chat widget.',
    nextNodeId: 'node-welcome'
  },
  {
    id: 'node-welcome',
    title: 'Greeting & Intent Selection',
    type: 'message',
    content: 'Welcome to Nact Study! 🚀 Empowering modern careers in AI, Tech, and Leadership.\n\nWhat would you like to explore today?',
    options: [
      { label: '📚 Explore Courses', nextNodeId: 'node-courses' },
      { label: '🎙️ Upcoming Webinars', nextNodeId: 'node-webinars' },
      { label: '🤝 1:1 Consultation', nextNodeId: 'node-consult' },
      { label: '📞 Speak with Counselor', nextNodeId: 'node-lead' }
    ]
  },
  {
    id: 'node-courses',
    title: 'Course Catalog Menu',
    type: 'question',
    content: 'Here are our top flagship certification programs:\n\n1. Full-Stack Data Science & GenAI\n2. Executive Financial Modeling\n\nPlease select one to review syllabus and fees.',
    options: [
      { label: 'Data Science & GenAI', nextNodeId: 'node-course-ai' },
      { label: 'Financial Modeling', nextNodeId: 'node-course-fin' }
    ]
  },
  {
    id: 'node-course-ai',
    title: 'AI Course Details & Instant Enroll',
    type: 'action',
    content: 'Full-Stack Data Science & GenAI Masterclass:\n• Duration: 24 Weeks\n• Live Classes + Cloud GPU Lab\n• Fees: ₹28,800 (Save 20%)\n\nReady to enroll or schedule a counseling call?',
    actionType: 'enroll',
    options: [
      { label: '💳 Pay & Enroll Now', nextNodeId: 'node-payment' },
      { label: '📞 Request Counselor Call', nextNodeId: 'node-lead' }
    ]
  },
  {
    id: 'node-webinars',
    title: 'Upcoming Webinars',
    type: 'action',
    content: 'Next Live Masterclass:\n"Next-Gen AI Systems: Architecture & Career Pivot 2026"\nDate: Oct 8, 2026 at 6:00 PM IST.',
    actionType: 'show_webinars',
    options: [
      { label: '🎟️ Register for ₹499', nextNodeId: 'node-payment' },
      { label: '🔙 Back to Menu', nextNodeId: 'node-welcome' }
    ]
  },
  {
    id: 'node-consult',
    title: '1:1 Private Consultation',
    type: 'action',
    content: 'Book a 45-minute private architecture or career roadmap session directly with Dr. Rajesh Sharma.',
    actionType: 'book_consultation',
    options: [
      { label: '🗓️ Book Date & Slot', nextNodeId: 'node-payment' },
      { label: '🔙 Back to Menu', nextNodeId: 'node-welcome' }
    ]
  },
  {
    id: 'node-lead',
    title: 'Lead Capture & Counselor Assignment',
    type: 'action',
    content: 'Thank you! A dedicated Nact academic counselor has been assigned to your query and will contact you via WhatsApp / phone within 15 minutes.',
    actionType: 'create_lead'
  },
  {
    id: 'node-payment',
    title: 'Instant Secure Checkout',
    type: 'action',
    content: 'We have generated your secure checkout link. Complete your payment to receive immediate enrollment credentials.',
    actionType: 'enroll'
  }
];

export const initialEmailCampaigns: EmailCampaign[] = [
  {
    id: 'camp-1',
    name: 'Weekly Tech Digest: Why LLM RAG is Replacing Standard Search',
    subject: 'Why Enterprise RAG Architectures Are Booming (Free Code Repo Included)',
    sender: 'Dr. Rajesh Sharma <rajesh@nactstudy.com>',
    audience: 'All Registered Leads & Students (3,400)',
    sentCount: 3420,
    openRate: 46.2,
    clickRate: 18.4,
    status: 'Sent',
    scheduledDate: '2026-09-30',
    content: 'Over 80% of enterprise AI budgets in 2026 are shifting from basic model fine-tuning to deterministic retrieval-augmented generation pipelines...'
  },
  {
    id: 'camp-2',
    name: 'Cohort #15 Early Bird Scholarship Announcement',
    subject: 'Last 48 Hours: Claim 20% Early Bird Fellowship on GenAI Masterclass',
    sender: 'Admissions Council <admissions@nactstudy.com>',
    audience: 'Qualified & Contacted Leads (640)',
    sentCount: 640,
    openRate: 54.8,
    clickRate: 24.1,
    status: 'Sent',
    scheduledDate: '2026-10-01',
    content: 'Seats for Cohort #15 starting this month are now 80% filled. Apply your fellowship code NACT2026 at checkout before midnight.'
  }
];

export const initialAutomationWorkflows: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Instant Inbound Lead Auto-Assignment & WhatsApp Onboarding',
    trigger: 'New Lead',
    conditions: 'Lead source is Meta Ads, WhatsApp, or Google Search',
    actions: [
      'Round-robin assign to available Admissions Counselor',
      'Dispatch WhatsApp Welcome Template with course brochure',
      'Create 2-hour SLA follow-up task on counselor dashboard'
    ],
    active: true,
    runsCount: 1420
  },
  {
    id: 'wf-2',
    name: 'Payment Success -> Automatic Student Enrollment & Access Provisioning',
    trigger: 'Payment Received',
    conditions: 'Order status transitions to Paid',
    actions: [
      'Update Lead Stage to "Won"',
      'Create Student Account & Generate Login Credentials',
      'Grant LMS Course Access & Add to WhatsApp Cohort Community',
      'Send WhatsApp Congratulations + Invoice Receipt'
    ],
    active: true,
    runsCount: 210
  },
  {
    id: 'wf-3',
    name: 'Webinar Follow-Up & High-Yield Course Offer',
    trigger: 'Webinar Attendance',
    conditions: 'Attended duration >= 45 minutes',
    actions: [
      'Send Webinar Recording + Presentation Slides via Email',
      'Dispatch WhatsApp Exclusive 24-Hour Course Discount Offer',
      'Schedule Counselor Outreach Call for Next Day'
    ],
    active: true,
    runsCount: 380
  },
  {
    id: 'wf-4',
    name: 'Course Completion -> Verified Certificate Issuance & Upsell',
    trigger: 'Course Completion',
    conditions: 'Lessons >= 90% and All Assignments Passed and Fees Cleared',
    actions: [
      'Generate Cryptographically Verified Certificate with QR verification',
      'Notify Student via WhatsApp & Email with PDF download',
      'Recommend Advanced Cohort with 30% Alumnus Discount'
    ],
    active: true,
    runsCount: 165
  }
];

export const initialOrders: SalesOrder[] = [
  {
    id: 'ord-8810',
    orderNumber: 'NACT-ORD-2026-8810',
    customerName: 'Manoj Deshmukh',
    customerEmail: 'manoj.d@cloudinfra.net',
    customerPhone: '+91 99887 76655',
    productName: 'Full-Stack Data Science & Generative AI Masterclass',
    productType: 'Course',
    productId: 'crs-1',
    amount: 36000,
    discount: 7200,
    tax: 0,
    total: 28800,
    paymentMode: 'UPI',
    paymentStatus: 'paid',
    counselorName: 'Pooja Kashyap',
    date: '2026-09-27'
  },
  {
    id: 'ord-8811',
    orderNumber: 'NACT-ORD-2026-8811',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.patel@gmail.com',
    customerPhone: '+91 98777 88990',
    productName: 'Full-Stack Data Science & Generative AI Masterclass',
    productType: 'Course',
    productId: 'crs-1',
    amount: 36000,
    discount: 7200,
    tax: 0,
    total: 28800,
    paymentMode: 'Credit Card',
    paymentStatus: 'paid',
    counselorName: 'Pooja Kashyap',
    date: '2026-09-15'
  },
  {
    id: 'ord-8812',
    orderNumber: 'NACT-ORD-2026-8812',
    customerName: 'Aakash Verma',
    customerEmail: 'aakash.verma@techcorp.in',
    customerPhone: '+91 98190 12345',
    productName: 'Full-Stack Data Science & Generative AI Masterclass',
    productType: 'Course',
    productId: 'crs-1',
    amount: 36000,
    discount: 7200,
    tax: 0,
    total: 28800,
    paymentMode: 'EMI',
    paymentStatus: 'pending',
    counselorName: 'Pooja Kashyap',
    date: '2026-10-02'
  },
  {
    id: 'ord-8813',
    orderNumber: 'NACT-ORD-2026-8813',
    customerName: 'Tanya Narang',
    customerEmail: 'tanya.narang@startupflow.io',
    customerPhone: '+91 98711 00223',
    productName: 'Next-Gen AI Systems: Architecture & Career Pivot 2026',
    productType: 'Webinar',
    productId: 'prod-3',
    amount: 1999,
    discount: 1500,
    tax: 0,
    total: 499,
    paymentMode: 'UPI',
    paymentStatus: 'paid',
    counselorName: 'Rohan Mehra',
    date: '2026-10-01'
  }
];

export const initialEnrollments: StudentEnrollment[] = [
  {
    id: 'enr-1',
    studentId: 'usr-8',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.patel@gmail.com',
    studentPhone: '+91 98777 88990',
    courseId: 'crs-1',
    courseTitle: 'Full-Stack Data Science & Generative AI Masterclass',
    enrollmentDate: '2026-09-15',
    progressPercentage: 85,
    completedLessonsCount: 5,
    totalLessonsCount: 6,
    attendancePercentage: 92,
    assignmentsSubmittedCount: 1,
    totalAssignmentsCount: 2,
    quizAverageScore: 90,
    certificateIssued: true,
    certificateNumber: 'NACT-CERT-2026-9042',
    certificateDate: '2026-10-01',
    paymentStatus: 'Paid'
  },
  {
    id: 'enr-2',
    studentId: 'usr-10',
    studentName: 'Manoj Deshmukh',
    studentEmail: 'manoj.d@cloudinfra.net',
    studentPhone: '+91 99887 76655',
    courseId: 'crs-1',
    courseTitle: 'Full-Stack Data Science & Generative AI Masterclass',
    enrollmentDate: '2026-09-27',
    progressPercentage: 35,
    completedLessonsCount: 2,
    totalLessonsCount: 6,
    attendancePercentage: 100,
    assignmentsSubmittedCount: 0,
    totalAssignmentsCount: 2,
    quizAverageScore: 0,
    certificateIssued: false,
    paymentStatus: 'Paid'
  }
];

export const initialCertificates: CertificateRecord[] = [
  {
    id: 'cert-1',
    certificateNumber: 'NACT-CERT-2026-9042',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.patel@gmail.com',
    courseTitle: 'Full-Stack Data Science & Generative AI Masterclass',
    completionDate: 'October 1, 2026',
    facultyName: 'Dr. Rajesh Sharma & Vikramaditya Roy',
    instituteName: 'Nact Institute of Advanced Technologies',
    grade: 'A+ (Distinction)',
    verificationCode: 'VRFY-NACT-88990-2026-OK'
  }
];

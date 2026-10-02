export type UserRole =
  | 'Super Admin'
  | 'Institute Admin'
  | 'Creator'
  | 'Faculty'
  | 'Counselor'
  | 'Marketing User'
  | 'Accountant'
  | 'Student'
  | 'Support User';

export type LeadStage =
  | 'new'
  | 'assigned'
  | 'contacted'
  | 'interested'
  | 'qualified'
  | 'counselling_scheduled'
  | 'counselling_completed'
  | 'proposal_offer'
  | 'payment_pending'
  | 'won'
  | 'lost'
  | 'not_interested';

export type ProductType =
  | 'Course'
  | 'Webinar'
  | 'Study Material'
  | 'Book'
  | 'Pre-recorded Class'
  | 'Live Class'
  | '1:1 Consultation';

export type PaymentStatus =
  | 'pending'
  | 'partially_paid'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface CreatorProfile {
  name: string;
  avatarUrl: string;
  title: string;
  bio: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  mobile: string;
  email: string;
  website: string;
  socials: {
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
  };
  slug: string;
}

export interface InstituteProfile {
  name: string;
  logoUrl: string;
  registrationNumber: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  about: string;
  mission: string;
  vision: string;
  primaryColor: string;
  secondaryColor: string;
  emailSignature: string;
  whatsappSignature: string;
}

export type PortalType = 'admin' | 'teacher' | 'student';

export interface UserPermissions {
  dashboard: boolean;
  students: boolean;
  teachers: boolean;
  classes: boolean;
  lms: boolean;
  fees: boolean;
  crm: boolean;
  masters: boolean;
  reports: boolean;
  attendance: boolean;
  grading: boolean;
  assignments: boolean;
  settings: boolean;
  userRights: boolean;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  portalType: PortalType;
  action: string;
  details: string;
  timestamp: string;
  category: 'academic' | 'attendance' | 'grading' | 'fees' | 'admissions' | 'system';
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: UserRole;
  portalType: PortalType;
  avatar: string;
  department?: string;
  designation?: string;
  phone: string;
  active: boolean;
  assignedLeadsCount?: number;
  salesClosedAmount?: number;
  assignedClasses?: string[];
  studentId?: string;
  admissionNo?: string;
  permissions: UserPermissions;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  type: 'video' | 'pdf' | 'audio' | 'live' | 'quiz' | 'assignment';
  videoUrl?: string;
  pdfUrl?: string;
  isPreviewFree: boolean;
  isDownloadAllowed: boolean;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseAssignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  deadline: string;
  totalMarks: number;
  passingMarks: number;
  submitted?: boolean;
  submissionDate?: string;
  score?: number;
  feedback?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface CourseQuiz {
  id: string;
  courseId: string;
  title: string;
  timeLimitMinutes: number;
  passingPercentage: number;
  questions: QuizQuestion[];
  completed?: boolean;
  userScore?: number;
  attemptsCount?: number;
}

export interface LiveClassSession {
  id: string;
  courseId: string;
  title: string;
  facultyName: string;
  date: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  status: 'upcoming' | 'live' | 'completed';
  recordingUrl?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  subcategory: string;
  creatorName: string;
  facultyName: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  banner: string;
  introVideoUrl: string;
  type: 'Pre-recorded' | 'Live Cohort' | 'Hybrid';
  isFree: boolean;
  price: number;
  discountPercentage: number;
  finalPrice: number;
  installmentAvailable: boolean;
  validityDays: number;
  enrollmentLimit: number;
  enrolledStudentsCount: number;
  isPublished: boolean;
  isCertificateEnabled: boolean;
  modules: CourseModule[];
  assignments: CourseAssignment[];
  quizzes: CourseQuiz[];
  liveClasses: LiveClassSession[];
}

export interface DigitalProduct {
  id: string;
  title: string;
  type: ProductType;
  creatorName: string;
  price: number;
  originalPrice: number;
  description: string;
  thumbnail: string;
  salesCount: number;
  status: 'active' | 'draft';
  webinarDetails?: {
    date: string;
    time: string;
    platform: string;
    link: string;
    capacity: number;
    registeredCount: number;
  };
  consultationDetails?: {
    durationMinutes: number;
    availableDays: string[];
    availableSlots: string[];
    bufferTimeMinutes: number;
    platform: string;
  };
}

export interface LeadActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  author: string;
  type: 'created' | 'whatsapp' | 'call' | 'demo' | 'proposal' | 'payment' | 'enrollment' | 'note';
}

export interface Lead {
  id: string;
  code: string;
  name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  source: 'WhatsApp Inbound' | 'Meta Ads' | 'Google Search' | 'Organic YouTube' | 'Referral' | 'Webinar Reg';
  campaign: string;
  interestedProduct: string;
  productId: string;
  productType: ProductType;
  budget: number;
  stage: LeadStage;
  assignedCounselorId: string;
  assignedCounselorName: string;
  priority: 'High' | 'Medium' | 'Low';
  qualification: string;
  experienceYears: number;
  occupation: string;
  nextFollowUpDate: string;
  nextFollowUpTime: string;
  followUpType: 'WhatsApp' | 'Phone Call' | 'Video Demo' | 'Email';
  remarks: string;
  createdAt: string;
  timeline: LeadActivityItem[];
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  sender: 'counselor' | 'system' | 'customer';
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  templateName?: string;
}

export interface WhatsAppConversation {
  id: string;
  contactName: string;
  phone: string;
  assignedCounselor: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: WhatsAppMessage[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'Marketing' | 'Transactional' | 'Utility';
  body: string;
  variables: string[];
}

export interface ChatFlowNode {
  id: string;
  title: string;
  type: 'trigger' | 'message' | 'question' | 'action';
  content: string;
  options?: { label: string; nextNodeId: string }[];
  actionType?: 'create_lead' | 'show_courses' | 'show_webinars' | 'book_consultation' | 'enroll';
  nextNodeId?: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  sender: string;
  audience: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  status: 'Sent' | 'Scheduled' | 'Draft';
  scheduledDate: string;
  content: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: 'New Lead' | 'Course Registration' | 'Payment Received' | 'Payment Failed' | 'Webinar Registration' | 'Webinar Attendance' | 'Course Completion' | 'Follow-up Overdue';
  conditions: string;
  actions: string[];
  active: boolean;
  runsCount: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  productType: ProductType;
  productId: string;
  amount: number;
  discount: number;
  tax: number;
  total: number;
  paymentMode: 'UPI' | 'Credit Card' | 'Net Banking' | 'EMI' | 'Cash / Bank Transfer';
  paymentStatus: PaymentStatus;
  counselorName: string;
  date: string;
  invoiceUrl?: string;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: string;
  progressPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  attendancePercentage: number;
  assignmentsSubmittedCount: number;
  totalAssignmentsCount: number;
  quizAverageScore: number;
  certificateIssued: boolean;
  certificateNumber?: string;
  certificateDate?: string;
  paymentStatus: 'Paid' | 'Installment Active' | 'Pending';
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  completionDate: string;
  facultyName: string;
  instituteName: string;
  grade: string;
  verificationCode: string;
}

export interface MasterItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  status: 'active' | 'inactive';
  meta?: Record<string, any>;
}

export interface SystemMasters {
  academicYears: MasterItem[];
  classes: MasterItem[];
  sections: MasterItem[];
  departments: MasterItem[];
  subjects: MasterItem[];
  rooms: MasterItem[];
  studentCategories: MasterItem[];
  bloodGroups: MasterItem[];
  houses: MasterItem[];
  leadSources: MasterItem[];
  leadLostReasons: MasterItem[];
  feeGroups: MasterItem[];
  feePaymentModes: MasterItem[];
  scholarships: MasterItem[];
  staffDesignations: MasterItem[];
  examTypes: MasterItem[];
  gradingScales: MasterItem[];
}

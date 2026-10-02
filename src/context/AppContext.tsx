import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  CreatorProfile,
  InstituteProfile,
  AppUser,
  PortalType,
  UserPermissions,
  UserActivityLog,
  Course,
  DigitalProduct,
  Lead,
  LeadStage,
  WhatsAppConversation,
  WhatsAppTemplate,
  ChatFlowNode,
  EmailCampaign,
  AutomationWorkflow,
  SalesOrder,
  StudentEnrollment,
  CertificateRecord,
  LeadActivityItem,
  PaymentStatus,
  MasterItem,
  SystemMasters,
} from '../types';
import {
  initialCreatorProfile,
  initialInstituteProfile,
  initialUsers,
  initialActivityLogs,
  initialCourses,
  initialDigitalProducts,
  initialLeads,
  initialWhatsAppConversations,
  initialWhatsAppTemplates,
  initialChatFlowNodes,
  initialEmailCampaigns,
  initialAutomationWorkflows,
  initialOrders,
  initialEnrollments,
  initialCertificates,
} from '../data/mockData';
import { initialSystemMasters } from '../data/mockMasters';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'lead' | 'payment' | 'academic' | 'automation';
}

interface AppContextType {
  currentUser: AppUser;
  setCurrentUser: (user: AppUser) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  isLoggedIn: boolean;
  login: (usernameOrEmail: string, password?: string) => Promise<boolean> | boolean;
  logout: () => Promise<void> | void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  updateUserProfile: (updates: Partial<AppUser>) => Promise<void>;
  changeUserPassword: (currentPass: string, newPass: string, confirmPass: string) => Promise<{ success: boolean; error?: string }>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activityLogs: UserActivityLog[];
  addActivityLog: (log: Omit<UserActivityLog, 'id' | 'timestamp'>) => void;
  updateUserPermissions: (userId: string, permissions: Partial<UserPermissions>) => void;
  creatorProfile: CreatorProfile;
  updateCreatorProfile: (profile: Partial<CreatorProfile>) => void;
  instituteProfile: InstituteProfile;
  updateInstituteProfile: (profile: Partial<InstituteProfile>) => void;
  users: AppUser[];
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  digitalProducts: DigitalProduct[];
  addDigitalProduct: (prod: DigitalProduct) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'code' | 'createdAt' | 'timeline'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  updateLeadStage: (id: string, stage: LeadStage) => void;
  addLeadTimelineItem: (leadId: string, item: Omit<LeadActivityItem, 'id' | 'timestamp'>) => void;
  whatsAppConversations: WhatsAppConversation[];
  sendWhatsAppMessage: (conversationId: string, text: string, templateName?: string) => void;
  whatsAppTemplates: WhatsAppTemplate[];
  chatFlowNodes: ChatFlowNode[];
  emailCampaigns: EmailCampaign[];
  createEmailCampaign: (campaign: Omit<EmailCampaign, 'id' | 'sentCount' | 'openRate' | 'clickRate' | 'status'>) => void;
  automationWorkflows: AutomationWorkflow[];
  toggleWorkflow: (id: string) => void;
  simulateWorkflowTrigger: (triggerName: string) => void;
  orders: SalesOrder[];
  createOrderAndPaymentLink: (leadId: string) => SalesOrder;
  markOrderPaid: (orderId: string) => void;
  enrollments: StudentEnrollment[];
  updateStudentLessonProgress: (studentId: string, courseId: string, lessonId: string) => void;
  certificates: CertificateRecord[];
  issueCertificate: (studentName: string, studentEmail: string, courseTitle: string) => CertificateRecord;
  systemMasters: SystemMasters;
  addMasterItem: (category: keyof SystemMasters, item: Omit<MasterItem, 'id'>) => void;
  updateMasterItem: (category: keyof SystemMasters, id: string, updates: Partial<MasterItem>) => void;
  deleteMasterItem: (category: keyof SystemMasters, id: string) => void;
  notifications: AppNotification[];
  markNotificationsRead: () => void;
  selectedLeadForDetail: Lead | null;
  setSelectedLeadForDetail: (lead: Lead | null) => void;
  selectedCourseForPlayer: Course | null;
  setSelectedCourseForPlayer: (course: Course | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nact_study_app_data_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<AppUser>(initialUsers[0]); // Defaults to Anita Sen (Super Admin)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('nact_auth_token');
  });
  const [currentRole, setCurrentRole] = useState<UserRole>('Super Admin');
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>(initialActivityLogs);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>(initialCreatorProfile);
  const [instituteProfile, setInstituteProfile] = useState<InstituteProfile>(initialInstituteProfile);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>(initialDigitalProducts);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [whatsAppConversations, setWhatsAppConversations] = useState<WhatsAppConversation[]>(initialWhatsAppConversations);
  const [whatsAppTemplates, setWhatsAppTemplates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);
  const [chatFlowNodes, setChatFlowNodes] = useState<ChatFlowNode[]>(initialChatFlowNodes);
  const [emailCampaigns, setEmailCampaigns] = useState<EmailCampaign[]>(initialEmailCampaigns);
  const [automationWorkflows, setAutomationWorkflows] = useState<AutomationWorkflow[]>(initialAutomationWorkflows);
  const [orders, setOrders] = useState<SalesOrder[]>(initialOrders);
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>(initialEnrollments);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(initialCertificates);
  const [systemMasters, setSystemMasters] = useState<SystemMasters>(initialSystemMasters);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState<Course | null>(initialCourses[0]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Payment Received',
      message: '₹28,800 received from Manoj Deshmukh (NACT-AI-401)',
      time: '15m ago',
      read: false,
      type: 'payment',
    },
    {
      id: 'notif-2',
      title: 'New High-Intent Lead',
      message: 'Aakash Verma requested EMI checkout link via WhatsApp',
      time: '1h ago',
      read: false,
      type: 'lead',
    },
    {
      id: 'notif-3',
      title: 'Certificate Generated',
      message: 'Aarav Patel completed AI Masterclass with 90% score',
      time: '3h ago',
      read: true,
      type: 'academic',
    }
  ]);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.creatorProfile) setCreatorProfile(parsed.creatorProfile);
        if (parsed.instituteProfile) setInstituteProfile(parsed.instituteProfile);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.leads) setLeads(parsed.leads);
        if (parsed.orders) setOrders(parsed.orders);
        if (parsed.enrollments) setEnrollments(parsed.enrollments);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          creatorProfile,
          instituteProfile,
          courses,
          leads,
          orders,
          enrollments,
        })
      );
    } catch {
      // ignore
    }
  }, [creatorProfile, instituteProfile, courses, leads, orders, enrollments]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateCreatorProfile = (updates: Partial<CreatorProfile>) => {
    setCreatorProfile(prev => ({ ...prev, ...updates }));
    showToast('Creator profile updated successfully.');
  };

  const updateInstituteProfile = (updates: Partial<InstituteProfile>) => {
    setInstituteProfile(prev => ({ ...prev, ...updates }));
    showToast('Institute settings saved.');
  };

  const addCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Course "${newCourse.title}" created successfully!`);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    showToast('Course curriculum updated.');
  };

  const addDigitalProduct = (prod: DigitalProduct) => {
    setDigitalProducts(prev => [prod, ...prev]);
    showToast(`Digital product "${prod.title}" published.`);
  };

  const addLead = (newLeadData: Omit<Lead, 'id' | 'code' | 'createdAt' | 'timeline'>) => {
    const newId = `lead-${Date.now()}`;
    const newCode = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeString = `${now.getDate()}-Oct ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newLead: Lead = {
      ...newLeadData,
      id: newId,
      code: newCode,
      createdAt: now.toISOString(),
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: timeString,
          title: 'Lead Created',
          description: `Captured from source "${newLeadData.source}". Counselor ${newLeadData.assignedCounselorName} assigned.`,
          author: 'System',
          type: 'created'
        },
        {
          id: `tl-${Date.now() + 1}`,
          timestamp: timeString,
          title: 'WhatsApp Welcome Sent',
          description: `Template "lead_welcome" sent automatically to ${newLeadData.whatsapp}`,
          author: 'WhatsApp Bot',
          type: 'whatsapp'
        }
      ]
    };

    setLeads(prev => [newLead, ...prev]);
    
    // Add WhatsApp conversation thread
    setWhatsAppConversations(prev => [
      {
        id: `w-conv-${newId}`,
        contactName: newLead.name,
        phone: newLead.whatsapp,
        assignedCounselor: newLead.assignedCounselorName,
        unreadCount: 0,
        lastMessage: `Hi ${newLead.name}, thank you for your interest in ${newLead.interestedProduct}!`,
        lastMessageTime: 'Just now',
        messages: [
          {
            id: `m-${Date.now()}`,
            conversationId: `w-conv-${newId}`,
            sender: 'system',
            text: `Hi ${newLead.name}, thank you for your interest in ${newLead.interestedProduct} at Nact Study. Our counselor ${newLead.assignedCounselorName} will contact you shortly.`,
            timestamp: timeString,
            status: 'delivered',
            templateName: 'lead_welcome'
          }
        ]
      },
      ...prev
    ]);

    showToast(`New lead ${newCode} (${newLead.name}) captured & auto-assigned!`);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));
    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const updateLeadStage = (id: string, stage: LeadStage) => {
    const targetLead = leads.find(l => l.id === id);
    if (!targetLead) return;

    const now = new Date();
    const timeString = `${now.getDate()}-Oct ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newActivity: LeadActivityItem = {
      id: `tl-${Date.now()}`,
      timestamp: timeString,
      title: `Stage Changed to ${stage.replace('_', ' ').toUpperCase()}`,
      description: `Lead moved from "${targetLead.stage}" to "${stage}" by ${currentRole}.`,
      author: currentRole,
      type: stage === 'won' ? 'enrollment' : 'note'
    };

    const updatedTimeline = [newActivity, ...targetLead.timeline];

    setLeads(prev =>
      prev.map(l =>
        l.id === id
          ? {
              ...l,
              stage,
              timeline: updatedTimeline
            }
          : l
      )
    );

    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(prev =>
        prev
          ? {
              ...prev,
              stage,
              timeline: updatedTimeline
            }
          : null
      );
    }

    showToast(`Lead stage updated to ${stage.replace('_', ' ')}.`);
  };

  const addLeadTimelineItem = (
    leadId: string,
    item: Omit<LeadActivityItem, 'id' | 'timestamp'>
  ) => {
    const now = new Date();
    const timeString = `${now.getDate()}-Oct ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const fullItem: LeadActivityItem = {
      ...item,
      id: `tl-${Date.now()}`,
      timestamp: timeString,
    };

    setLeads(prev =>
      prev.map(l =>
        l.id === leadId
          ? {
              ...l,
              timeline: [fullItem, ...l.timeline]
            }
          : l
      )
    );

    if (selectedLeadForDetail?.id === leadId) {
      setSelectedLeadForDetail(prev =>
        prev
          ? {
              ...prev,
              timeline: [fullItem, ...prev.timeline]
            }
          : null
      );
    }

    showToast('Activity logged in timeline.');
  };

  const sendWhatsAppMessage = (
    conversationId: string,
    text: string,
    templateName?: string
  ) => {
    const now = new Date();
    const timeStr = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newMsg = {
      id: `m-${Date.now()}`,
      conversationId,
      sender: 'counselor' as const,
      text,
      timestamp: timeStr,
      status: 'sent' as const,
      templateName
    };

    setWhatsAppConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: timeStr,
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    showToast('WhatsApp message sent to customer.');
  };

  const createEmailCampaign = (campaign: Omit<EmailCampaign, 'id' | 'sentCount' | 'openRate' | 'clickRate' | 'status'>) => {
    const newCamp: EmailCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      sentCount: 1850,
      openRate: 48.5,
      clickRate: 21.2,
      status: 'Sent'
    };
    setEmailCampaigns(prev => [newCamp, ...prev]);
    showToast(`Campaign "${campaign.name}" dispatched to ${campaign.audience}!`);
  };

  const toggleWorkflow = (id: string) => {
    setAutomationWorkflows(prev =>
      prev.map(w => (w.id === id ? { ...w, active: !w.active } : w))
    );
    showToast('Automation workflow status updated.');
  };

  const simulateWorkflowTrigger = (triggerName: string) => {
    setAutomationWorkflows(prev =>
      prev.map(w =>
        w.trigger === triggerName ? { ...w, runsCount: w.runsCount + 1 } : w
      )
    );
    showToast(`Executed 3-step automation for trigger: "${triggerName}"!`, 'info');
  };

  const createOrderAndPaymentLink = (leadId: string): SalesOrder => {
    const lead = leads.find(l => l.id === leadId);
    const orderNumber = `NACT-ORD-2026-${Math.floor(8820 + Math.random() * 500)}`;
    const productPrice = lead?.budget || 28800;
    
    const newOrder: SalesOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: lead ? lead.name : 'Prospective Student',
      customerEmail: lead ? lead.email : 'student@nactstudy.com',
      customerPhone: lead ? lead.whatsapp : '+91 98000 00000',
      productName: lead ? lead.interestedProduct : 'Full-Stack Data Science & Generative AI Masterclass',
      productType: lead ? lead.productType : 'Course',
      productId: lead ? lead.productId : 'crs-1',
      amount: productPrice,
      discount: 0,
      tax: 0,
      total: productPrice,
      paymentMode: 'UPI',
      paymentStatus: 'pending',
      counselorName: lead ? lead.assignedCounselorName : 'Pooja Kashyap',
      date: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);

    if (lead) {
      updateLeadStage(leadId, 'payment_pending');
      addLeadTimelineItem(leadId, {
        title: 'Payment Link Generated',
        description: `Order ${orderNumber} created for ₹${productPrice.toLocaleString('en-IN')}. Link sent via WhatsApp.`,
        author: currentRole,
        type: 'proposal'
      });
    }

    showToast(`Payment link generated for Order #${orderNumber}!`);
    return newOrder;
  };

  const markOrderPaid = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, paymentStatus: 'paid' as PaymentStatus } : o))
    );

    // If order has matching lead, transition lead to WON
    const matchedLead = leads.find(
      l => l.email === order.customerEmail || l.whatsapp === order.customerPhone
    );

    if (matchedLead) {
      updateLeadStage(matchedLead.id, 'won');
      addLeadTimelineItem(matchedLead.id, {
        title: 'Payment Received & Enrolled',
        description: `Payment of ₹${order.total.toLocaleString('en-IN')} confirmed. Student account created.`,
        author: 'Payment Gateway',
        type: 'payment'
      });
    }

    // Auto-create Student Enrollment
    const newEnrollment: StudentEnrollment = {
      id: `enr-${Date.now()}`,
      studentId: `usr-${Date.now()}`,
      studentName: order.customerName,
      studentEmail: order.customerEmail,
      studentPhone: order.customerPhone,
      courseId: order.productId,
      courseTitle: order.productName,
      enrollmentDate: new Date().toISOString().split('T')[0],
      progressPercentage: 5,
      completedLessonsCount: 1,
      totalLessonsCount: 6,
      attendancePercentage: 100,
      assignmentsSubmittedCount: 0,
      totalAssignmentsCount: 2,
      quizAverageScore: 0,
      certificateIssued: false,
      paymentStatus: 'Paid'
    };

    setEnrollments(prev => [newEnrollment, ...prev]);

    // Send notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Student Enrolled!',
        message: `${order.customerName} successfully enrolled in ${order.productName} (₹${order.total})`,
        time: 'Just now',
        read: false,
        type: 'payment'
      },
      ...prev
    ]);

    showToast(`Payment of ₹${order.total.toLocaleString('en-IN')} confirmed! Enrollment created.`);
  };

  const updateStudentLessonProgress = (
    studentId: string,
    courseId: string,
    lessonId: string
  ) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          modules: c.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l =>
              l.id === lessonId ? { ...l, isCompleted: true } : l
            )
          }))
        };
      })
    );

    setEnrollments(prev =>
      prev.map(e => {
        if (e.studentId === studentId && e.courseId === courseId) {
          const nextCompleted = Math.min(e.completedLessonsCount + 1, e.totalLessonsCount);
          const nextProgress = Math.round((nextCompleted / e.totalLessonsCount) * 100);
          return {
            ...e,
            completedLessonsCount: nextCompleted,
            progressPercentage: nextProgress
          };
        }
        return e;
      })
    );

    showToast('Lesson marked as completed! Progress updated.');
  };

  const issueCertificate = (
    studentName: string,
    studentEmail: string,
    courseTitle: string
  ): CertificateRecord => {
    const certNum = `NACT-CERT-2026-${Math.floor(9050 + Math.random() * 500)}`;
    const newCert: CertificateRecord = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      studentName,
      studentEmail,
      courseTitle,
      completionDate: 'October 2, 2026',
      facultyName: `${creatorProfile.name} & Faculty Council`,
      instituteName: instituteProfile.name,
      grade: 'A+ (Distinction)',
      verificationCode: `VRFY-NACT-${Math.floor(10000 + Math.random() * 90000)}-OK`
    };

    setCertificates(prev => [newCert, ...prev]);

    setEnrollments(prev =>
      prev.map(e =>
        e.studentEmail === studentEmail && e.courseTitle === courseTitle
          ? {
              ...e,
              certificateIssued: true,
              certificateNumber: certNum,
              certificateDate: '2026-10-02'
            }
          : e
      )
    );

    showToast(`Certificate #${certNum} issued to ${studentName}!`);
    return newCert;
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addMasterItem = (category: keyof SystemMasters, item: Omit<MasterItem, 'id'>) => {
    const newItem: MasterItem = {
      ...item,
      id: `mst-${Date.now()}`
    };
    setSystemMasters(prev => ({
      ...prev,
      [category]: [...prev[category], newItem]
    }));
    showToast(`Added "${item.name}" to master list.`);
  };

  const updateMasterItem = (category: keyof SystemMasters, id: string, updates: Partial<MasterItem>) => {
    setSystemMasters(prev => ({
      ...prev,
      [category]: prev[category].map(m => (m.id === id ? { ...m, ...updates } : m))
    }));
    showToast('Master record updated.');
  };

  const deleteMasterItem = (category: keyof SystemMasters, id: string) => {
    setSystemMasters(prev => ({
      ...prev,
      [category]: prev[category].filter(m => m.id !== id)
    }));
    showToast('Master record removed.');
  };

  const resetAllData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCreatorProfile(initialCreatorProfile);
    setInstituteProfile(initialInstituteProfile);
    setUsers(initialUsers);
    setCourses(initialCourses);
    setDigitalProducts(initialDigitalProducts);
    setLeads(initialLeads);
    setWhatsAppConversations(initialWhatsAppConversations);
    setWhatsAppTemplates(initialWhatsAppTemplates);
    setChatFlowNodes(initialChatFlowNodes);
    setEmailCampaigns(initialEmailCampaigns);
    setAutomationWorkflows(initialAutomationWorkflows);
    setOrders(initialOrders);
    setEnrollments(initialEnrollments);
    setCertificates(initialCertificates);
    setSystemMasters(initialSystemMasters);
    setCurrentUser(initialUsers[0]);
    setIsLoggedIn(true);
    setCurrentRole('Super Admin');
    setActiveModule('dashboard');
    showToast('Application reset to default demo dataset.');
  };

  // Validate existing token with backend on mount
  useEffect(() => {
    const token = localStorage.getItem('nact_auth_token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Session invalid');
        return res.json();
      })
      .then(data => {
        if (data.authenticated && data.user) {
          const matched = users.find(u => u.id === data.user.id);
          const fullUser = matched ? { ...matched, ...data.user } : { ...currentUser, ...data.user };
          setCurrentUser(fullUser);
          setCurrentRole(fullUser.role);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('nact_auth_token');
          sessionStorage.removeItem('nact_auth_token');
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        // Fallback for offline mode: preserve session if token exists
      });
  }, []);

  // Prevent browser back navigation after logout
  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem('nact_auth_token');
      if (!token || !isLoggedIn) {
        window.history.replaceState(null, '', '/login');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoggedIn]);

  const login = async (usernameOrEmail: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('nact_auth_token', data.token);
          sessionStorage.setItem('nact_auth_token', data.token);
        }
        const fullUser = users.find(u => u.id === data.user.id) || {
          ...currentUser,
          ...data.user,
          permissions: data.user.permissions || currentUser.permissions
        };
        setCurrentUser(fullUser);
        setCurrentRole(fullUser.role);
        setIsLoggedIn(true);

        if (fullUser.portalType === 'teacher') {
          setActiveModule('teacher-dashboard');
        } else if (fullUser.portalType === 'student') {
          setActiveModule('student-portal');
        } else {
          setActiveModule('dashboard');
        }

        addActivityLog({
          userId: fullUser.id,
          userName: fullUser.name,
          userRole: fullUser.role,
          portalType: fullUser.portalType,
          action: 'Portal Authentication',
          details: `Signed into ${fullUser.portalType.toUpperCase()} portal`,
          category: 'system'
        });

        showToast(`Authenticated as ${fullUser.name} (${fullUser.role})`);
        return true;
      }
    } catch {
      // Fallback to local user search
    }

    const q = usernameOrEmail.toLowerCase().trim();
    const user = users.find(
      u => u.username?.toLowerCase() === q || u.email.toLowerCase() === q
    );
    if (!user) {
      showToast('User not found. Try "admin", "vikram.roy", or "aarav.patel"', 'warning');
      return false;
    }
    if (password && user.password && user.password !== password.trim()) {
      showToast('Incorrect password credentials.', 'warning');
      return false;
    }

    const dummyToken = 'session-token-' + Date.now();
    localStorage.setItem('nact_auth_token', dummyToken);
    sessionStorage.setItem('nact_auth_token', dummyToken);

    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsLoggedIn(true);

    if (user.portalType === 'teacher') {
      setActiveModule('teacher-dashboard');
    } else if (user.portalType === 'student') {
      setActiveModule('student-portal');
    } else {
      setActiveModule('dashboard');
    }

    addActivityLog({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      portalType: user.portalType,
      action: 'Portal Authentication',
      details: `Signed in into ${user.portalType.toUpperCase()} portal with unique credentials`,
      category: 'system'
    });

    showToast(`Authenticated as ${user.name} (${user.role})`);
    return true;
  };

  const logout = async () => {
    const token = localStorage.getItem('nact_auth_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {
        // ignore
      }
    }

    localStorage.removeItem('nact_auth_token');
    sessionStorage.removeItem('nact_auth_token');

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: 'Signed Out',
      details: `Session closed for ${currentUser.name}`,
      category: 'system'
    });

    setIsLoggedIn(false);
    setIsProfileModalOpen(false);

    // Enforce history state replacement to prevent browser Back access
    window.history.replaceState(null, '', '/login');
    window.history.pushState(null, '', '/login');

    showToast('Logged out successfully. Session closed.', 'info');
  };

  const updateUserProfile = async (updates: Partial<AppUser>) => {
    const token = localStorage.getItem('nact_auth_token');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setCurrentUser(prev => ({ ...prev, ...data.user }));
          setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, ...data.user } : u)));
          return;
        }
      }
    } catch {
      // fallback
    }

    setCurrentUser(prev => ({ ...prev, ...updates }));
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, ...updates } : u)));
  };

  const changeUserPassword = async (currentPass: string, newPass: string, confirmPass: string) => {
    const token = localStorage.getItem('nact_auth_token');
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass, confirmPassword: confirmPass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update password' };
      }
      setCurrentUser(prev => ({ ...prev, password: newPass }));
      setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, password: newPass } : u)));
      return { success: true };
    } catch {
      if (currentUser.password && currentUser.password !== currentPass) {
        return { success: false, error: 'Current password provided is incorrect.' };
      }
      setCurrentUser(prev => ({ ...prev, password: newPass }));
      setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, password: newPass } : u)));
      return { success: true };
    }
  };

  const addActivityLog = (log: Omit<UserActivityLog, 'id' | 'timestamp'>) => {
    const newLog: UserActivityLog = {
      ...log,
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: 'Just now'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const updateUserPermissions = (userId: string, perms: Partial<UserPermissions>) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const updated = { ...u.permissions, ...perms };
          if (currentUser.id === userId) {
            setCurrentUser(curr => ({ ...curr, permissions: updated }));
          }
          return { ...u, permissions: updated };
        }
        return u;
      })
    );
    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: 'Updated User Rights & Permissions',
      details: `Modified access permissions for user ID: ${userId}`,
      category: 'system'
    });
    showToast('User rights & module permissions updated successfully.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole,
        activeModule,
        setActiveModule,
        isLoggedIn,
        login,
        logout,
        activityLogs,
        addActivityLog,
        updateUserPermissions,
        creatorProfile,
        updateCreatorProfile,
        instituteProfile,
        updateInstituteProfile,
        users,
        courses,
        addCourse,
        updateCourse,
        digitalProducts,
        addDigitalProduct,
        leads,
        addLead,
        updateLead,
        updateLeadStage,
        addLeadTimelineItem,
        whatsAppConversations,
        sendWhatsAppMessage,
        whatsAppTemplates,
        chatFlowNodes,
        emailCampaigns,
        createEmailCampaign,
        automationWorkflows,
        toggleWorkflow,
        simulateWorkflowTrigger,
        orders,
        createOrderAndPaymentLink,
        markOrderPaid,
        enrollments,
        updateStudentLessonProgress,
        certificates,
        issueCertificate,
        systemMasters,
        addMasterItem,
        updateMasterItem,
        deleteMasterItem,
        notifications,
        markNotificationsRead,
        selectedLeadForDetail,
        setSelectedLeadForDetail,
        selectedCourseForPlayer,
        setSelectedCourseForPlayer,
        toast,
        showToast,
        resetAllData,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        updateUserProfile,
        changeUserPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

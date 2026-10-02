// Centralized Frontend API Service for Cloud Database Operations
// Handles API calls, authentication headers, error mapping, and typing

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeader(),
      ...((options.headers as Record<string, string>) || {}),
    },
  });

  if (!response.ok) {
    let errMsg = `API request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.error) errMsg = errorData.error;
    } catch {
      // ignore json parse error
    }
    throw new Error(errMsg);
  }

  return response.json() as Promise<T>;
}

// 1. Academic Year Service
export const academicYearService = {
  getAll: () => request<any[]>('/academic-years'),
  create: (data: { code: string; name: string; description?: string }) =>
    request<any>('/academic-years', { method: 'POST', body: JSON.stringify(data) }),
};

// 2. Class Service
export const classService = {
  getAll: (activeOnly = true) => request<any[]>(`/classes?active=${activeOnly}`),
  getSections: (classId: string) => request<any[]>(`/classes/${classId}/sections`),
  getSubjects: (classId: string) => request<any[]>(`/classes/${classId}/subjects`),
  create: (data: any) => request<any>('/classes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/classes/${id}`, { method: 'DELETE' }),
};

// 3. Section Service
export const sectionService = {
  getAll: (classId?: string) => request<any[]>(`/sections${classId ? `?classId=${classId}` : ''}`),
  getSubjects: (sectionId: string) => request<any[]>(`/sections/${sectionId}/subjects`),
  create: (data: any) => request<any>('/sections', { method: 'POST', body: JSON.stringify(data) }),
};

// 4. Subject Service
export const subjectService = {
  getAll: (classId?: string) => request<any[]>(`/subjects${classId ? `?classId=${classId}` : ''}`),
  getChapters: (subjectId: string) => request<any[]>(`/subjects/${subjectId}/chapters`),
  create: (data: any) => request<any>('/subjects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/subjects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// 5. Chapter Service
export const chapterService = {
  getAll: (subjectId?: string) => request<any[]>(`/chapters${subjectId ? `?subjectId=${subjectId}` : ''}`),
  getTopics: (chapterId: string) => request<any[]>(`/chapters/${chapterId}/topics`),
  create: (data: any) => request<any>('/chapters', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/chapters/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// 6. Topic Service
export const topicService = {
  getAll: (chapterId?: string, subjectId?: string) => {
    const params = new URLSearchParams();
    if (chapterId) params.append('chapterId', chapterId);
    if (subjectId) params.append('subjectId', subjectId);
    return request<any[]>(`/topics?${params.toString()}`);
  },
  create: (data: any) => request<any>('/topics', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/topics/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// 7. Quick Curriculum Service
export const quickCurriculumService = {
  getAll: () => request<any[]>('/quick-curriculum'),
  create: (data: any) => request<any>('/quick-curriculum', { method: 'POST', body: JSON.stringify(data) }),
};

// 8. Lesson Resource Service
export interface LessonResourceParams {
  classId?: string;
  sectionId?: string;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
}

export interface LessonResourcePayload {
  videos: any[];
  lectureNotes: any[];
  presentations: any[];
  worksheets: any[];
  assignments: any[];
  activities: any[];
  questions: any[];
  quizzes: any[];
  allResources: any[];
}

export const resourceService = {
  getLessonResources: (params: LessonResourceParams) => {
    const query = new URLSearchParams();
    if (params.classId) query.append('classId', params.classId);
    if (params.sectionId) query.append('sectionId', params.sectionId);
    if (params.subjectId) query.append('subjectId', params.subjectId);
    if (params.chapterId) query.append('chapterId', params.chapterId);
    if (params.topicId) query.append('topicId', params.topicId);
    return request<LessonResourcePayload>(`/lesson-resources?${query.toString()}`);
  },
  getAll: (filters?: { type?: string; subjectId?: string; classId?: string }) => {
    const query = new URLSearchParams();
    if (filters?.type) query.append('type', filters.type);
    if (filters?.subjectId) query.append('subjectId', filters.subjectId);
    if (filters?.classId) query.append('classId', filters.classId);
    return request<any[]>(`/resources?${query.toString()}`);
  },
  create: (data: any) => request<any>('/resources', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/resources/${id}`, { method: 'DELETE' }),
};

// 9. Lesson Plan Service
export const lessonService = {
  getAll: (params?: { topicId?: string; subjectId?: string; classId?: string }) => {
    const query = new URLSearchParams();
    if (params?.topicId) query.append('topicId', params.topicId);
    if (params?.subjectId) query.append('subjectId', params.subjectId);
    if (params?.classId) query.append('classId', params.classId);
    return request<any[]>(`/lesson-plans?${query.toString()}`);
  },
  create: (data: any) => request<any>('/lesson-plans', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/lesson-plans/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/lesson-plans/${id}`, { method: 'DELETE' }),
};

// 10. Lesson Delivery Tracking Service
export const deliveryService = {
  getAll: (params?: { teacherId?: string; classId?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.teacherId) query.append('teacherId', params.teacherId);
    if (params?.classId) query.append('classId', params.classId);
    if (params?.status) query.append('status', params.status);
    return request<any[]>(`/lesson-delivery?${query.toString()}`);
  },
  startLesson: (data: any) => request<any>('/lesson-delivery', { method: 'POST', body: JSON.stringify(data) }),
  updateLesson: (id: string, data: any) => request<any>(`/lesson-delivery/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  completeLesson: (id: string, remarks?: string) =>
    request<any>(`/lesson-delivery/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'COMPLETED', remarks }),
    }),
};

// 11. Assignment Service
export const assignmentService = {
  getAll: () => request<any[]>('/assignments'),
  create: (data: any) => request<any>('/assignments', { method: 'POST', body: JSON.stringify(data) }),
};

// 12. Question Bank Service
export const questionService = {
  getAll: (params?: { subjectId?: string; classId?: string }) => {
    const query = new URLSearchParams();
    if (params?.subjectId) query.append('subjectId', params.subjectId);
    if (params?.classId) query.append('classId', params.classId);
    return request<any[]>(`/question-bank?${query.toString()}`);
  },
  create: (data: any) => request<any>('/question-bank', { method: 'POST', body: JSON.stringify(data) }),
};

// 13. Classroom Activity Service
export const activityService = {
  getAll: () => request<any[]>('/classroom-activities'),
  create: (data: any) => request<any>('/classroom-activities', { method: 'POST', body: JSON.stringify(data) }),
};

// 14. Student Progress Service
export const studentProgressService = {
  getStats: (classId?: string, subjectId?: string) => {
    const query = new URLSearchParams();
    if (classId) query.append('classId', classId);
    if (subjectId) query.append('subjectId', subjectId);
    return request<{
      progressList: any[];
      averageChapterCompletion: number;
      totalDeliveries: number;
      completedDeliveries: number;
    }>(`/student-progress?${query.toString()}`);
  },
};

// 15. Reports & Dashboard Service
export const reportService = {
  getDashboardStats: () =>
    request<{
      todayClasses: number;
      lessonsPlanned: number;
      lessonsCompleted: number;
      assignmentsPending: number;
      assignmentsReviewed: number;
      resourcesCreated: number;
      questionsInBank: number;
      pendingAssessments: number;
      activeDeliveries: number;
    }>('/reports/dashboard'),
};

// 16. Database Search Service
export const searchService = {
  search: (query: string) => request<{ resources: any[]; plans: any[]; questions: any[]; topics: any[] }>(`/search?q=${encodeURIComponent(query)}`),
};

// 17. Audit Logs Service
export const auditLogService = {
  getAll: () => request<any[]>('/audit-logs'),
};

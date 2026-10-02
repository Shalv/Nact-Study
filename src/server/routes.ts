import { Router, Request, Response } from 'express';
import {
  cloudDb,
  generateUUID,
  LessonResource,
  LessonPlan,
  LessonDelivery,
  ClassGrade,
  Section,
  Subject,
  Chapter,
  Topic,
  QuickCurriculum,
  Assignment,
  QuestionItem,
  ClassroomActivity
} from './db.ts';

export const apiRouter = Router();

// Helper to extract user identity from headers (or fallback for demo session)
function getReqUser(req: Request) {
  const customUser = (req as any).user;
  if (customUser) return customUser;
  return {
    id: 'usr-3',
    name: 'Vikramaditya Roy',
    role: 'Faculty',
    portalType: 'teacher'
  };
}

// ==========================================
// 1. Academic Years
// ==========================================
apiRouter.get('/academic-years', (req: Request, res: Response) => {
  res.json(cloudDb.academicYears);
});

apiRouter.post('/academic-years', (req: Request, res: Response) => {
  const { code, name, description } = req.body;
  if (!name || !code) {
    return res.status(400).json({ error: 'Academic Year name and code are required' });
  }
  const now = new Date().toISOString();
  const newYear = {
    id: generateUUID(),
    code,
    name,
    description: description || '',
    status: 'active' as const,
    created_at: now,
    updated_at: now,
  };
  cloudDb.academicYears.push(newYear);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Academic Year', newYear.id, null, newYear);
  res.status(201).json(newYear);
});

// ==========================================
// 2. Classes & Dynamic Sections
// ==========================================
// GET /api/classes
apiRouter.get('/classes', (req: Request, res: Response) => {
  const activeOnly = req.query.active !== 'false';
  let list = cloudDb.classes;
  if (activeOnly) {
    list = list.filter(c => c.active);
  }
  list.sort((a, b) => a.sort_order - b.sort_order);
  res.json(list);
});

// GET /api/classes/:classId/sections
apiRouter.get('/classes/:classId/sections', (req: Request, res: Response) => {
  const { classId } = req.params;
  const sections = cloudDb.sections.filter(s => s.class_id === classId && s.active);
  res.json(sections);
});

// GET /api/classes/:classId/subjects
apiRouter.get('/classes/:classId/subjects', (req: Request, res: Response) => {
  const { classId } = req.params;
  const subjects = cloudDb.subjects.filter(s => s.class_id === classId && s.active);
  res.json(subjects);
});

// POST /api/classes
apiRouter.post('/classes', (req: Request, res: Response) => {
  const { name, code, category, academic_year_id } = req.body;
  if (!name || !code) {
    return res.status(400).json({ error: 'Class name and code are required' });
  }
  const now = new Date().toISOString();
  const newClass: ClassGrade = {
    id: generateUUID(),
    academic_year_id: academic_year_id || cloudDb.academicYears[0]?.id || 'ay-2026',
    code,
    name,
    category: category || 'Secondary School',
    sort_order: cloudDb.classes.length + 1,
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.classes.push(newClass);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Class', newClass.id, null, newClass);
  res.status(201).json(newClass);
});

// PUT /api/classes/:id
apiRouter.put('/classes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.classes.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Class not found' });
  }
  const oldVal = { ...cloudDb.classes[index] };
  cloudDb.classes[index] = {
    ...cloudDb.classes[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Class', id, oldVal, cloudDb.classes[index]);
  res.json(cloudDb.classes[index]);
});

// DELETE /api/classes/:id (Safe soft-delete)
apiRouter.delete('/classes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.classes.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Class not found' });
  }
  cloudDb.classes[index].active = false;
  cloudDb.classes[index].updated_at = new Date().toISOString();
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'ARCHIVE', 'Class', id);
  res.json({ success: true, message: 'Class archived safely' });
});

// ==========================================
// 3. Sections & Dynamic Subjects
// ==========================================
// GET /api/sections
apiRouter.get('/sections', (req: Request, res: Response) => {
  const { classId } = req.query;
  let list = cloudDb.sections.filter(s => s.active);
  if (classId) {
    list = list.filter(s => s.class_id === classId);
  }
  res.json(list);
});

// GET /api/sections/:sectionId/subjects
apiRouter.get('/sections/:sectionId/subjects', (req: Request, res: Response) => {
  const { sectionId } = req.params;
  const section = cloudDb.sections.find(s => s.id === sectionId);
  if (!section) {
    return res.status(404).json({ error: 'Section not found' });
  }
  // Subjects linked to section or class
  const subjects = cloudDb.subjects.filter(
    sub => sub.active && (sub.section_id === sectionId || sub.class_id === section.class_id)
  );
  res.json(subjects);
});

// POST /api/sections
apiRouter.post('/sections', (req: Request, res: Response) => {
  const { class_id, name, code, room, class_teacher_name, student_count } = req.body;
  if (!class_id || !name) {
    return res.status(400).json({ error: 'class_id and section name are required' });
  }
  const now = new Date().toISOString();
  const newSection: Section = {
    id: generateUUID(),
    class_id,
    name,
    code: code || name.replace(/[^0-9A-Za-z]/g, ''),
    room: room || 'Room 301',
    class_teacher_name: class_teacher_name || 'Assigned Faculty',
    student_count: student_count ? parseInt(student_count, 10) : 30,
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.sections.push(newSection);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Section', newSection.id, null, newSection);
  res.status(201).json(newSection);
});

// ==========================================
// 4. Subjects & Dynamic Chapters
// ==========================================
// GET /api/subjects
apiRouter.get('/subjects', (req: Request, res: Response) => {
  const { classId } = req.query;
  let list = cloudDb.subjects.filter(s => s.active);
  if (classId) {
    list = list.filter(s => s.class_id === classId);
  }
  res.json(list);
});

// GET /api/subjects/:subjectId/chapters
apiRouter.get('/subjects/:subjectId/chapters', (req: Request, res: Response) => {
  const { subjectId } = req.params;
  const chapters = cloudDb.chapters
    .filter(ch => ch.subject_id === subjectId && ch.active)
    .sort((a, b) => a.chapter_number - b.chapter_number);
  res.json(chapters);
});

// POST /api/subjects
apiRouter.post('/subjects', (req: Request, res: Response) => {
  const { class_id, name, code, category, teacher_name } = req.body;
  if (!class_id || !name) {
    return res.status(400).json({ error: 'class_id and subject name are required' });
  }
  const now = new Date().toISOString();
  const newSub: Subject = {
    id: generateUUID(),
    class_id,
    code: code || `SUB-${Date.now().toString().slice(-4)}`,
    name,
    category: category || 'General Academic',
    teacher_name: teacher_name || 'Assigned Teacher',
    total_chapters: 10,
    completed_chapters: 0,
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.subjects.push(newSub);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Subject', newSub.id, null, newSub);
  res.status(201).json(newSub);
});

// PUT /api/subjects/:id
apiRouter.put('/subjects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.subjects.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Subject not found' });
  }
  const oldVal = { ...cloudDb.subjects[index] };
  cloudDb.subjects[index] = {
    ...cloudDb.subjects[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Subject', id, oldVal, cloudDb.subjects[index]);
  res.json(cloudDb.subjects[index]);
});

// ==========================================
// 5. Chapters & Dynamic Topics
// ==========================================
// GET /api/chapters
apiRouter.get('/chapters', (req: Request, res: Response) => {
  const { subjectId } = req.query;
  let list = cloudDb.chapters.filter(ch => ch.active);
  if (subjectId) {
    list = list.filter(ch => ch.subject_id === subjectId);
  }
  list.sort((a, b) => a.chapter_number - b.chapter_number);
  res.json(list);
});

// GET /api/chapters/:chapterId/topics
apiRouter.get('/chapters/:chapterId/topics', (req: Request, res: Response) => {
  const { chapterId } = req.params;
  const topics = cloudDb.topics
    .filter(t => t.chapter_id === chapterId && t.active)
    .sort((a, b) => a.topic_number - b.topic_number);
  res.json(topics);
});

// POST /api/chapters
apiRouter.post('/chapters', (req: Request, res: Response) => {
  const { subject_id, name, name_hindi, chapter_number, description } = req.body;
  if (!subject_id || !name) {
    return res.status(400).json({ error: 'subject_id and chapter name are required' });
  }
  const now = new Date().toISOString();
  const existingCount = cloudDb.chapters.filter(c => c.subject_id === subject_id).length;
  const newChapter: Chapter = {
    id: generateUUID(),
    subject_id,
    chapter_number: chapter_number || existingCount + 1,
    name,
    name_hindi: name_hindi || '',
    description: description || '',
    completion_percentage: 0,
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.chapters.push(newChapter);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Chapter', newChapter.id, null, newChapter);
  res.status(201).json(newChapter);
});

// PUT /api/chapters/:id (Requirement 16: Edit Chapter)
apiRouter.put('/chapters/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.chapters.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  const oldVal = { ...cloudDb.chapters[index] };
  cloudDb.chapters[index] = {
    ...cloudDb.chapters[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Chapter', id, oldVal, cloudDb.chapters[index]);
  res.json(cloudDb.chapters[index]);
});

// ==========================================
// 6. Topics CRUD
// ==========================================
// GET /api/topics
apiRouter.get('/topics', (req: Request, res: Response) => {
  const { chapterId, subjectId } = req.query;
  let list = cloudDb.topics.filter(t => t.active);
  if (chapterId) {
    list = list.filter(t => t.chapter_id === chapterId);
  }
  if (subjectId) {
    list = list.filter(t => t.subject_id === subjectId);
  }
  res.json(list);
});

// POST /api/topics
apiRouter.post('/topics', (req: Request, res: Response) => {
  const { chapter_id, subject_id, name, name_hindi, description, duration_minutes } = req.body;
  if (!chapter_id || !name) {
    return res.status(400).json({ error: 'chapter_id and topic name are required' });
  }
  const now = new Date().toISOString();
  const chapter = cloudDb.chapters.find(c => c.id === chapter_id);
  const targetSubId = subject_id || (chapter ? chapter.subject_id : '');
  const existingCount = cloudDb.topics.filter(t => t.chapter_id === chapter_id).length;
  const newTopic: Topic = {
    id: generateUUID(),
    chapter_id,
    subject_id: targetSubId,
    topic_number: existingCount + 1,
    name,
    name_hindi: name_hindi || '',
    description: description || '',
    duration_minutes: duration_minutes ? parseInt(duration_minutes, 10) : 40,
    status: 'In Progress',
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.topics.push(newTopic);
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Topic', newTopic.id, null, newTopic);
  res.status(201).json(newTopic);
});

// PUT /api/topics/:id
apiRouter.put('/topics/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.topics.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  const oldVal = { ...cloudDb.topics[index] };
  cloudDb.topics[index] = {
    ...cloudDb.topics[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  const u = getReqUser(req);
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Topic', id, oldVal, cloudDb.topics[index]);
  res.json(cloudDb.topics[index]);
});

// ==========================================
// 7. Quick Curriculum Buttons (Requirement 9)
// ==========================================
// GET /api/quick-curriculum
apiRouter.get('/quick-curriculum', (req: Request, res: Response) => {
  const list = cloudDb.quickCurriculum
    .filter(qc => qc.active)
    .sort((a, b) => a.sort_order - b.sort_order);
  res.json(list);
});

// POST /api/quick-curriculum
apiRouter.post('/quick-curriculum', (req: Request, res: Response) => {
  const { class_id, section_id, subject_id, chapter_id, topic_id, display_name, icon } = req.body;
  if (!class_id || !display_name) {
    return res.status(400).json({ error: 'class_id and display_name are required' });
  }
  const now = new Date().toISOString();
  const newQc: QuickCurriculum = {
    id: generateUUID(),
    class_id,
    section_id: section_id || '',
    subject_id: subject_id || '',
    chapter_id: chapter_id || '',
    topic_id: topic_id || '',
    display_name,
    icon: icon || 'Sparkles',
    sort_order: cloudDb.quickCurriculum.length + 1,
    active: true,
    created_at: now,
    updated_at: now,
  };
  cloudDb.quickCurriculum.push(newQc);
  res.status(201).json(newQc);
});

// ==========================================
// 8. GET Lesson Resources (Requirement 8)
// ==========================================
// GET /api/lesson-resources?classId=...&sectionId=...&subjectId=...&chapterId=...&topicId=...
apiRouter.get('/lesson-resources', (req: Request, res: Response) => {
  const { classId, sectionId, subjectId, chapterId, topicId } = req.query as Record<string, string>;

  // Filter matching active resources
  let resources = cloudDb.lessonResources.filter(r => r.status !== 'ARCHIVED');

  if (classId) {
    resources = resources.filter(r => r.class_id === classId);
  }
  if (subjectId) {
    resources = resources.filter(r => r.subject_id === subjectId);
  }
  if (chapterId) {
    resources = resources.filter(r => !r.chapter_id || r.chapter_id === chapterId);
  }
  if (topicId) {
    resources = resources.filter(r => !r.topic_id || r.topic_id === topicId);
  }

  // Filter matching assignments, questions, activities, quizzes
  let assignments = cloudDb.assignments.filter(a => a.status === 'ACTIVE');
  if (classId) assignments = assignments.filter(a => a.class_id === classId);
  if (subjectId) assignments = assignments.filter(a => a.subject_id === subjectId);
  if (topicId) assignments = assignments.filter(a => !a.topic_id || a.topic_id === topicId);

  let questions = cloudDb.questionBank;
  if (classId) questions = questions.filter(q => q.class_id === classId);
  if (subjectId) questions = questions.filter(q => q.subject_id === subjectId);
  if (topicId) questions = questions.filter(q => !q.topic_id || q.topic_id === topicId);

  let activities = cloudDb.classroomActivities;
  if (classId) activities = activities.filter(a => a.class_id === classId);
  if (subjectId) activities = activities.filter(a => a.subject_id === subjectId);
  if (topicId) activities = activities.filter(a => !a.topic_id || a.topic_id === topicId);

  // Group resources into exact expected categories
  const payload = {
    videos: resources.filter(r => r.resource_type === 'VIDEO'),
    lectureNotes: resources.filter(r => r.resource_type === 'LECTURE_NOTE'),
    presentations: resources.filter(r => r.resource_type === 'PRESENTATION'),
    worksheets: resources.filter(r => r.resource_type === 'WORKSHEET'),
    assignments: assignments,
    activities: activities,
    questions: questions,
    quizzes: resources.filter(r => r.resource_type === 'QUIZ'),
    allResources: resources,
  };

  res.json(payload);
});

// ==========================================
// 9. Resources CRUD (Requirements 10, 11, 13, 14, 16, 17)
// ==========================================
// GET /api/resources
apiRouter.get('/resources', (req: Request, res: Response) => {
  const { type, subjectId, classId, status } = req.query as Record<string, string>;
  let list = cloudDb.lessonResources;
  if (status) {
    list = list.filter(r => r.status === status);
  } else {
    list = list.filter(r => r.status !== 'ARCHIVED');
  }
  if (type && type !== 'All') {
    list = list.filter(r => r.resource_type === type.toUpperCase());
  }
  if (subjectId && subjectId !== 'All') {
    list = list.filter(r => r.subject_id === subjectId);
  }
  if (classId && classId !== 'All') {
    list = list.filter(r => r.class_id === classId);
  }
  res.json(list);
});

// POST /api/resources
apiRouter.post('/resources', (req: Request, res: Response) => {
  const {
    title,
    title_hindi,
    description,
    description_hindi,
    resource_type,
    class_id,
    section_id,
    subject_id,
    chapter_id,
    topic_id,
    file_url,
    file_name,
    file_type,
    file_size,
    duration,
    status
  } = req.body;

  if (!title || !resource_type || !class_id || !subject_id) {
    return res.status(400).json({ error: 'Title, resource_type, class_id, and subject_id are required' });
  }

  const u = getReqUser(req);
  const now = new Date().toISOString();
  const newResource: LessonResource = {
    id: generateUUID(),
    title,
    title_hindi: title_hindi || '',
    description: description || '',
    description_hindi: description_hindi || '',
    resource_type: resource_type.toUpperCase() as any,
    class_id,
    section_id: section_id || '',
    subject_id,
    chapter_id: chapter_id || '',
    topic_id: topic_id || '',
    file_url: file_url || 'https://cdn.nactstudy.edu/resources/sample.pdf',
    file_name: file_name || 'resource_document.pdf',
    file_type: file_type || 'application/pdf',
    file_size: file_size || '3.2 MB',
    duration: duration || '',
    downloads: 0,
    status: (status as any) || 'PUBLISHED',
    recommended_sequence: cloudDb.lessonResources.length + 1,
    created_by: u.id,
    created_at: now,
    updated_at: now,
  };

  cloudDb.lessonResources.unshift(newResource);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Resource', newResource.id, null, newResource);
  res.status(201).json(newResource);
});

// PUT /api/resources/:id
apiRouter.put('/resources/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.lessonResources.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  const u = getReqUser(req);
  const oldVal = { ...cloudDb.lessonResources[index] };
  cloudDb.lessonResources[index] = {
    ...cloudDb.lessonResources[index],
    ...req.body,
    updated_by: u.id,
    updated_at: new Date().toISOString(),
  };
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Resource', id, oldVal, cloudDb.lessonResources[index]);
  res.json(cloudDb.lessonResources[index]);
});

// DELETE /api/resources/:id (Soft-delete archive)
apiRouter.delete('/resources/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.lessonResources.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  const u = getReqUser(req);
  cloudDb.lessonResources[index].status = 'ARCHIVED';
  cloudDb.lessonResources[index].updated_at = new Date().toISOString();
  cloudDb.logAudit(u.id, u.name, 'ARCHIVE', 'Resource', id);
  res.json({ success: true, message: 'Resource safely archived' });
});

// ==========================================
// 10. Lesson Plans (Requirements 11, 12, 16)
// ==========================================
// GET /api/lesson-plans
apiRouter.get('/lesson-plans', (req: Request, res: Response) => {
  const { topicId, subjectId, classId } = req.query as Record<string, string>;
  let list = cloudDb.lessonPlans.filter(lp => lp.status !== 'ARCHIVED');
  if (topicId) list = list.filter(lp => lp.topic_id === topicId);
  if (subjectId) list = list.filter(lp => lp.subject_id === subjectId);
  if (classId) list = list.filter(lp => lp.class_id === classId);
  res.json(list);
});

// POST /api/lesson-plans
apiRouter.post('/lesson-plans', (req: Request, res: Response) => {
  const {
    class_id,
    section_id,
    subject_id,
    chapter_id,
    topic_id,
    lesson_date,
    duration_minutes,
    learning_objectives,
    teaching_method,
    teaching_resources,
    classroom_activity,
    assessment_method,
    homework,
    teacher_remarks,
    status
  } = req.body;

  if (!class_id || !subject_id || !topic_id) {
    return res.status(400).json({ error: 'class_id, subject_id, and topic_id are required' });
  }

  const u = getReqUser(req);
  const now = new Date().toISOString();
  const newPlan: LessonPlan = {
    id: generateUUID(),
    class_id,
    section_id: section_id || '',
    subject_id,
    chapter_id: chapter_id || '',
    topic_id,
    lesson_date: lesson_date || now.split('T')[0],
    duration_minutes: duration_minutes ? parseInt(duration_minutes, 10) : 40,
    learning_objectives: learning_objectives || '',
    teaching_method: teaching_method || '',
    teaching_resources: teaching_resources || '',
    classroom_activity: classroom_activity || '',
    assessment_method: assessment_method || '',
    homework: homework || '',
    teacher_remarks: teacher_remarks || '',
    status: (status as any) || 'PUBLISHED',
    teacher_id: u.id,
    teacher_name: u.name,
    created_at: now,
    updated_at: now,
  };

  cloudDb.lessonPlans.unshift(newPlan);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Lesson Plan', newPlan.id, null, newPlan);
  res.status(201).json(newPlan);
});

// PUT /api/lesson-plans/:id
apiRouter.put('/lesson-plans/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.lessonPlans.findIndex(lp => lp.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lesson plan not found' });
  }
  const u = getReqUser(req);
  const oldVal = { ...cloudDb.lessonPlans[index] };
  cloudDb.lessonPlans[index] = {
    ...cloudDb.lessonPlans[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  cloudDb.logAudit(u.id, u.name, 'UPDATE', 'Lesson Plan', id, oldVal, cloudDb.lessonPlans[index]);
  res.json(cloudDb.lessonPlans[index]);
});

// DELETE /api/lesson-plans/:id
apiRouter.delete('/lesson-plans/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.lessonPlans.findIndex(lp => lp.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lesson plan not found' });
  }
  const u = getReqUser(req);
  cloudDb.lessonPlans[index].status = 'ARCHIVED';
  cloudDb.lessonPlans[index].updated_at = new Date().toISOString();
  cloudDb.logAudit(u.id, u.name, 'ARCHIVE', 'Lesson Plan', id);
  res.json({ success: true, message: 'Lesson plan archived' });
});

// ==========================================
// 11. Lesson Delivery Tracking (Requirement 22)
// ==========================================
// GET /api/lesson-delivery
apiRouter.get('/lesson-delivery', (req: Request, res: Response) => {
  const { teacherId, classId, status } = req.query as Record<string, string>;
  let list = cloudDb.lessonDeliveries;
  if (teacherId) list = list.filter(d => d.teacher_id === teacherId);
  if (classId) list = list.filter(d => d.class_id === classId);
  if (status) list = list.filter(d => d.status === status);
  res.json(list);
});

// POST /api/lesson-delivery (Start Lesson)
apiRouter.post('/lesson-delivery', (req: Request, res: Response) => {
  const {
    class_id,
    section_id,
    subject_id,
    chapter_id,
    topic_id,
    lesson_plan_id,
    duration_minutes,
    attendance_count
  } = req.body;

  const u = getReqUser(req);
  const now = new Date().toISOString();
  const delivery: LessonDelivery = {
    id: generateUUID(),
    teacher_id: u.id,
    teacher_name: u.name,
    class_id,
    section_id,
    subject_id,
    chapter_id,
    topic_id,
    lesson_plan_id,
    start_time: now,
    duration_minutes: duration_minutes || 40,
    status: 'STARTED',
    step_completed: 1,
    attendance_count: attendance_count || 32,
    created_at: now,
    updated_at: now,
  };

  cloudDb.lessonDeliveries.unshift(delivery);
  cloudDb.logAudit(u.id, u.name, 'DELIVERY_START', 'Lesson Delivery', delivery.id, null, delivery);
  res.status(201).json(delivery);
});

// PUT /api/lesson-delivery/:id (Complete or Update Lesson)
apiRouter.put('/lesson-delivery/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = cloudDb.lessonDeliveries.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Lesson delivery session not found' });
  }

  const u = getReqUser(req);
  const now = new Date().toISOString();
  const oldVal = { ...cloudDb.lessonDeliveries[index] };

  cloudDb.lessonDeliveries[index] = {
    ...cloudDb.lessonDeliveries[index],
    ...req.body,
    updated_at: now,
  };

  // If marking completed, set end_time and update chapter/subject progress
  if (req.body.status === 'COMPLETED') {
    cloudDb.lessonDeliveries[index].end_time = now;
    cloudDb.logAudit(u.id, u.name, 'DELIVERY_COMPLETE', 'Lesson Delivery', id, oldVal, cloudDb.lessonDeliveries[index]);

    // Update topic status
    const topic = cloudDb.topics.find(t => t.id === cloudDb.lessonDeliveries[index].topic_id);
    if (topic) {
      topic.status = 'Completed';
    }

    // Update chapter progress
    const chapter = cloudDb.chapters.find(c => c.id === cloudDb.lessonDeliveries[index].chapter_id);
    if (chapter) {
      chapter.completion_percentage = Math.min(100, chapter.completion_percentage + 15);
    }
  }

  res.json(cloudDb.lessonDeliveries[index]);
});

// ==========================================
// 12. Assignments CRUD
// ==========================================
// GET /api/assignments
apiRouter.get('/assignments', (req: Request, res: Response) => {
  res.json(cloudDb.assignments.filter(a => a.status !== 'ARCHIVED'));
});

// POST /api/assignments
apiRouter.post('/assignments', (req: Request, res: Response) => {
  const { class_id, section_id, subject_id, chapter_id, topic_id, title, description, due_date, total_marks } = req.body;
  if (!class_id || !subject_id || !title) {
    return res.status(400).json({ error: 'class_id, subject_id, and title are required' });
  }
  const u = getReqUser(req);
  const now = new Date().toISOString();
  const asg: Assignment = {
    id: generateUUID(),
    class_id,
    section_id: section_id || '',
    subject_id,
    chapter_id: chapter_id || '',
    topic_id: topic_id || '',
    title,
    description: description || '',
    due_date: due_date || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    total_marks: total_marks ? parseInt(total_marks, 10) : 25,
    submissions_count: 0,
    status: 'ACTIVE',
    created_by: u.id,
    created_at: now,
    updated_at: now,
  };
  cloudDb.assignments.unshift(asg);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Assignment', asg.id, null, asg);
  res.status(201).json(asg);
});

// ==========================================
// 13. Question Bank CRUD
// ==========================================
// GET /api/question-bank
apiRouter.get('/question-bank', (req: Request, res: Response) => {
  const { subjectId, classId } = req.query as Record<string, string>;
  let list = cloudDb.questionBank;
  if (subjectId) list = list.filter(q => q.subject_id === subjectId);
  if (classId) list = list.filter(q => q.class_id === classId);
  res.json(list);
});

// POST /api/question-bank
apiRouter.post('/question-bank', (req: Request, res: Response) => {
  const { class_id, subject_id, chapter_id, topic_id, question_text, question_type, difficulty, options, correct_answer, solution_explanation, marks } = req.body;
  if (!question_text || !subject_id) {
    return res.status(400).json({ error: 'question_text and subject_id are required' });
  }
  const u = getReqUser(req);
  const now = new Date().toISOString();
  const q: QuestionItem = {
    id: generateUUID(),
    class_id: class_id || 'cls-8',
    subject_id,
    chapter_id: chapter_id || '',
    topic_id: topic_id || '',
    question_text,
    question_type: question_type || 'MCQ',
    difficulty: difficulty || 'Medium',
    options: options || [],
    correct_answer: correct_answer || '',
    solution_explanation: solution_explanation || '',
    marks: marks ? parseInt(marks, 10) : 2,
    created_by: u.id,
    created_at: now,
    updated_at: now,
  };
  cloudDb.questionBank.unshift(q);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Question', q.id, null, q);
  res.status(201).json(q);
});

// ==========================================
// 14. Classroom Activities CRUD
// ==========================================
apiRouter.get('/classroom-activities', (req: Request, res: Response) => {
  res.json(cloudDb.classroomActivities);
});

apiRouter.post('/classroom-activities', (req: Request, res: Response) => {
  const { class_id, subject_id, chapter_id, topic_id, title, description, activity_type, duration_minutes, materials_required, safety_instructions, learning_outcomes } = req.body;
  const u = getReqUser(req);
  const now = new Date().toISOString();
  const act: ClassroomActivity = {
    id: generateUUID(),
    class_id: class_id || 'cls-8',
    subject_id: subject_id || 'sub-8-sci',
    chapter_id: chapter_id || '',
    topic_id: topic_id || '',
    title: title || 'New Interactive Activity',
    description: description || '',
    activity_type: activity_type || 'Lab Experiment',
    duration_minutes: duration_minutes || 20,
    materials_required: materials_required || ['Lab Manual'],
    safety_instructions: safety_instructions || '',
    learning_outcomes: learning_outcomes || [],
    created_by: u.id,
    created_at: now,
    updated_at: now,
  };
  cloudDb.classroomActivities.unshift(act);
  cloudDb.logAudit(u.id, u.name, 'CREATE', 'Activity', act.id, null, act);
  res.status(201).json(act);
});

// ==========================================
// 15. Student Progress (Requirement 23)
// ==========================================
apiRouter.get('/student-progress', (req: Request, res: Response) => {
  const { classId, subjectId } = req.query as Record<string, string>;
  let list = cloudDb.studentProgressList;
  if (classId) list = list.filter(p => p.class_id === classId);
  if (subjectId) list = list.filter(p => p.subject_id === subjectId);

  // Overall chapter and subject completion metrics
  const totalChapters = cloudDb.chapters.length;
  const avgChapterCompletion = Math.round(
    cloudDb.chapters.reduce((acc, c) => acc + c.completion_percentage, 0) / (totalChapters || 1)
  );

  res.json({
    progressList: list,
    averageChapterCompletion: avgChapterCompletion,
    totalDeliveries: cloudDb.lessonDeliveries.length,
    completedDeliveries: cloudDb.lessonDeliveries.filter(d => d.status === 'COMPLETED').length,
  });
});

// ==========================================
// 16. Dynamic Reports & Dashboard Stats (Requirements 21, 24)
// ==========================================
apiRouter.get('/reports/dashboard', (req: Request, res: Response) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const lessonsPlanned = cloudDb.lessonPlans.filter(lp => lp.status !== 'ARCHIVED').length;
  const lessonsCompleted = cloudDb.lessonDeliveries.filter(d => d.status === 'COMPLETED').length;
  const activeDeliveries = cloudDb.lessonDeliveries.filter(d => d.status === 'STARTED' || d.status === 'IN_PROGRESS').length;
  const assignmentsPending = cloudDb.assignments.filter(a => a.status === 'ACTIVE').length;
  const resourcesCreated = cloudDb.lessonResources.filter(r => r.status !== 'ARCHIVED').length;
  const questionsInBank = cloudDb.questionBank.length;

  res.json({
    todayClasses: Math.max(4, activeDeliveries + lessonsCompleted),
    lessonsPlanned,
    lessonsCompleted,
    assignmentsPending,
    assignmentsReviewed: 48,
    resourcesCreated,
    questionsInBank,
    pendingAssessments: 3,
    activeDeliveries,
  });
});

// ==========================================
// 17. Database Search (Requirement 15)
// ==========================================
apiRouter.get('/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').trim().toLowerCase();
  if (!q) {
    return res.json({ resources: [], plans: [], questions: [], topics: [] });
  }

  const resources = cloudDb.lessonResources
    .filter(r => r.status !== 'ARCHIVED' && (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.title_hindi && r.title_hindi.toLowerCase().includes(q))
    ))
    .slice(0, 10);

  const plans = cloudDb.lessonPlans
    .filter(lp => lp.learning_objectives.toLowerCase().includes(q) || lp.teaching_method.toLowerCase().includes(q))
    .slice(0, 5);

  const questions = cloudDb.questionBank
    .filter(item => item.question_text.toLowerCase().includes(q) || item.solution_explanation.toLowerCase().includes(q))
    .slice(0, 5);

  const topics = cloudDb.topics
    .filter(t => t.active && (t.name.toLowerCase().includes(q) || (t.name_hindi && t.name_hindi.toLowerCase().includes(q))))
    .slice(0, 5);

  res.json({ resources, plans, questions, topics });
});

// ==========================================
// 18. Audit Logs (Requirement 32)
// ==========================================
apiRouter.get('/audit-logs', (req: Request, res: Response) => {
  res.json(cloudDb.auditLogs.slice(0, 50));
});

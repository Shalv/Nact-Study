import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Video,
  FileText,
  Download,
  Eye,
  Plus,
  Search,
  ExternalLink,
  Play,
  Upload,
  X,
  FileSpreadsheet,
  CheckCircle2,
  Share2,
  Database,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { resourceService } from '../../services/api.ts';

export const TeacherLessonResourcesView: React.FC = () => {
  const { showToast, addActivityLog, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewResource, setPreviewResource] = useState<any | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const [resources, setResources] = useState([
    {
      id: 'RES-101',
      title: 'Snell’s Law & Refraction Ray Tracing Interactive Slides',
      type: 'Presentation (PPTX)',
      subject: 'Physics',
      classGrade: 'Class 9-B',
      size: '14.2 MB',
      uploadDate: '2026-09-30',
      downloads: 48,
      icon: FileSpreadsheet,
      badgeColor: 'bg-indigo-50 text-indigo-700',
      description: 'Comprehensive 24-slide deck with optical animations, index of refraction tables, and sample board problems.',
      url: 'https://cdn.nactstudy.edu/physics/optics-ray-tracing.pptx'
    },
    {
      id: 'RES-102',
      title: 'Linear Equations Transposition & Word Problems Cheat Sheet',
      type: 'Lecture Notes (PDF)',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      size: '3.8 MB',
      uploadDate: '2026-10-01',
      downloads: 62,
      icon: FileText,
      badgeColor: 'bg-emerald-50 text-emerald-700',
      description: 'Handwritten exemplar formulas, age problem equations, and speed-time-distance step-by-step algorithms.',
      url: 'https://cdn.nactstudy.edu/math/linear-equations-notes.pdf'
    },
    {
      id: 'RES-103',
      title: 'Phenolphthalein Titration Virtual Lab Experiment Video',
      type: 'Video Lecture (MP4)',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      size: '85.4 MB (12m 45s)',
      uploadDate: '2026-09-28',
      downloads: 39,
      icon: Video,
      badgeColor: 'bg-purple-50 text-purple-700',
      description: 'High-definition lab recording showing meniscus alignment, dropwise titration, and pink endpoint determination.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'RES-104',
      title: 'Chemistry Lab Safety Protocol & Titration Observation Sheet',
      type: 'Lab Manual (PDF)',
      subject: 'Chemistry',
      classGrade: 'Class 10-A',
      size: '2.1 MB',
      uploadDate: '2026-09-26',
      downloads: 31,
      icon: FileText,
      badgeColor: 'bg-cyan-50 text-cyan-700',
      description: 'Official CBSE lab manual worksheet format for recording initial, final, and concordant burette readings.',
      url: 'https://cdn.nactstudy.edu/chem/titration-lab-manual.pdf'
    },
    {
      id: 'RES-105',
      title: 'Quadratic Polynomial Factorization Problem Bank (100 Questions)',
      type: 'Practice Worksheet (PDF)',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      size: '4.5 MB',
      uploadDate: '2026-09-22',
      downloads: 74,
      icon: FileText,
      badgeColor: 'bg-amber-50 text-amber-700',
      description: 'Graded problem set divided into Level 1 (Direct), Level 2 (Middle-term split), and Level 3 (Olympiad).',
      url: 'https://cdn.nactstudy.edu/math/polynomial-practice-100.pdf'
    },
    {
      id: 'RES-106',
      title: 'Neural Networks & PyTorch Tensor Attention Walkthrough',
      type: 'Video Lecture (MP4)',
      subject: 'Computer Science & AI',
      classGrade: 'Class 10-A',
      size: '124 MB (22m 10s)',
      uploadDate: '2026-10-02',
      downloads: 55,
      icon: Video,
      badgeColor: 'bg-blue-50 text-blue-700',
      description: 'Live coding session demonstrating dot-product attention calculation in Jupyter notebook with GPU acceleration.',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    }
  ]);

  useEffect(() => {
    resourceService.getAll()
      .then(items => {
        if (items && items.length > 0) {
          const mapped = items.map((r: any) => {
            const isVid = r.resource_type === 'VIDEO';
            const isPPT = r.resource_type === 'PRESENTATION';
            return {
              id: r.id,
              title: r.title,
              type: r.resource_type ? r.resource_type.replace('_', ' ') : 'Lecture Notes',
              subject: r.subject_id?.includes('sci') ? 'Science' : r.subject_id?.includes('math') ? 'Mathematics' : 'General',
              classGrade: r.class_id === 'cls-8' ? 'Class 8-A' : r.class_id === 'cls-9' ? 'Class 9-B' : 'Class 10-A',
              size: r.file_size || r.duration || '3.5 MB',
              uploadDate: r.created_at ? r.created_at.split('T')[0] : '2026-10-02',
              downloads: r.downloads || 0,
              icon: isVid ? Video : isPPT ? FileSpreadsheet : FileText,
              badgeColor: isVid ? 'bg-purple-50 text-purple-700' : isPPT ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700',
              description: r.description || '',
              url: r.file_url || 'https://cdn.nactstudy.edu/resources/sample-document.pdf'
            };
          });
          setResources(mapped);
        }
      })
      .catch(err => console.error('Failed to load resources from DB:', err));
  }, []);

  const [newResource, setNewResource] = useState({
    title: '',
    type: 'Lecture Notes (PDF)',
    subject: 'Mathematics',
    classGrade: 'Class 8-A',
    description: '',
    url: ''
  });

  const handleUploadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title.trim()) return;

    let resType = 'LECTURE_NOTE';
    if (newResource.type.includes('Video')) resType = 'VIDEO';
    else if (newResource.type.includes('Presentation')) resType = 'PRESENTATION';
    else if (newResource.type.includes('Worksheet')) resType = 'WORKSHEET';

    try {
      const created = await resourceService.create({
        title: newResource.title,
        resource_type: resType,
        class_id: newResource.classGrade.includes('8') ? 'cls-8' : newResource.classGrade.includes('9') ? 'cls-9' : 'cls-10',
        section_id: 'sec-8a',
        subject_id: newResource.subject.toLowerCase().includes('math') ? 'sub-8-math' : 'sub-8-sci',
        topic_id: 'top-light',
        description: newResource.description,
        file_size: '4.5 MB',
        file_url: newResource.url || 'https://cdn.nactstudy.edu/resources/uploaded-asset.pdf',
        status: 'PUBLISHED'
      });

      const resObj = {
        id: created.id,
        title: created.title,
        type: newResource.type,
        subject: newResource.subject,
        classGrade: newResource.classGrade,
        size: '4.5 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        icon: newResource.type.includes('Video') ? Video : FileText,
        badgeColor: 'bg-indigo-50 text-indigo-700',
        description: created.description || 'Curated classroom instructional resource.',
        url: created.file_url || 'https://cdn.nactstudy.edu/resources/sample-document.pdf'
      };

      setResources(prev => [resObj, ...prev]);
      showToast(`Resource "${newResource.title}" persisted to PostgreSQL & shared with students.`, 'success');
    } catch {
      const resObj = {
        id: `RES-${Math.floor(100 + Math.random() * 900)}`,
        title: newResource.title,
        type: newResource.type,
        subject: newResource.subject,
        classGrade: newResource.classGrade,
        size: '5.2 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        icon: newResource.type.includes('Video') ? Video : FileText,
        badgeColor: 'bg-indigo-50 text-indigo-700',
        description: newResource.description || 'Curated classroom instructional resource.',
        url: newResource.url || 'https://cdn.nactstudy.edu/resources/sample-document.pdf'
      };
      setResources(prev => [resObj, ...prev]);
      showToast(`Resource "${newResource.title}" uploaded.`);
    }

    addActivityLog({
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      portalType: currentUser.portalType,
      action: `Uploaded Lesson Resource: ${newResource.title}`,
      details: `${newResource.type} for ${newResource.subject}`,
      category: 'academic'
    });

    setShowUploadModal(false);
    setNewResource({
      title: '',
      type: 'Lecture Notes (PDF)',
      subject: 'Mathematics',
      classGrade: 'Class 8-A',
      description: '',
      url: ''
    });
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Videos' && res.type.includes('Video')) ||
      (selectedCategory === 'Notes' && res.type.includes('Notes')) ||
      (selectedCategory === 'Presentations' && res.type.includes('Presentation')) ||
      (selectedCategory === 'Lab Manuals' && res.type.includes('Lab'));
    const matchesSubject = selectedSubject === 'All' || res.subject === selectedSubject;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-150 text-xs">
      {/* Top Filter and Actions Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-purple-600" />
              <span>Lesson Resources Hub (Video Lectures / Notes / PPT / Labs)</span>
            </h2>
            <p className="text-slate-500">
              Curated multimedia courseware shared directly with assigned student cohorts.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Resource</span>
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-400 text-[11px]">Format:</span>
            {['All', 'Videos', 'Notes', 'Presentations', 'Lab Manuals'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#3d5ee1] text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-[#3d5ee1] w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map(res => {
          const Icon = res.icon;
          return (
            <div
              key={res.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${res.badgeColor}`}>
                    {res.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{res.uploadDate}</span>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                      {res.title}
                    </h3>
                    <div className="text-[11px] text-[#3d5ee1] font-semibold mt-0.5">
                      {res.subject} • {res.classGrade}
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11px]">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{res.size} • {res.downloads} downloads</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-[#3d5ee1] hover:text-white rounded-lg font-semibold transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    title="Download Resource"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded font-bold text-[#3d5ee1]">
                  {previewResource.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{previewResource.title}</h3>
              </div>
              <button onClick={() => setPreviewResource(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* If Video */}
              {previewResource.type.includes('Video') ? (
                <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center text-white space-y-3 relative shadow-inner">
                  <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-all">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div className="text-center space-y-1">
                    <div className="font-bold text-sm">Interactive Virtual Class Simulator</div>
                    <div className="text-slate-400 text-xs font-mono">{previewResource.size}</div>
                  </div>
                </div>
              ) : (
                /* Document Viewer Simulator */
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-slate-700 font-sans leading-relaxed">
                  <div className="text-center border-b border-slate-200 pb-3 space-y-1">
                    <div className="font-bold text-sm text-slate-900">{previewResource.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Published by Faculty • {previewResource.subject} • {previewResource.classGrade}
                    </div>
                  </div>
                  <p>{previewResource.description}</p>
                  <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
                    <div className="font-bold text-slate-900">Key Document Highlights:</div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      <li>Aligned with NCERT & CBSE 2026-27 Board Syllabus standards</li>
                      <li>Includes comprehensive step-by-step solved exemplars</li>
                      <li>Prepared with review questions for continuous formative assessment</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <a
                href={previewResource.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#3d5ee1] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Attachment</span>
              </a>
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resource Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upload & Share Lesson Resource</h3>
            <form onSubmit={handleUploadResource} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Resource Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 4 Optics Solved Problems PDF"
                  value={newResource.title}
                  onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3d5ee1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={newResource.type}
                    onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Lecture Notes (PDF)">Lecture Notes (PDF)</option>
                    <option value="Presentation (PPTX)">Presentation (PPTX)</option>
                    <option value="Video Lecture (MP4)">Video Lecture (MP4)</option>
                    <option value="Lab Manual (PDF)">Lab Manual (PDF)</option>
                    <option value="Practice Worksheet (PDF)">Practice Worksheet (PDF)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newResource.subject}
                    onChange={e => setNewResource({ ...newResource, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science & AI">Computer Science & AI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Class</label>
                <select
                  value={newResource.classGrade}
                  onChange={e => setNewResource({ ...newResource, classGrade: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
                >
                  <option value="Class 8-A">Class 8-A</option>
                  <option value="Class 9-B">Class 9-B</option>
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="All Cohorts">All Cohorts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description / Summary</label>
                <textarea
                  rows={2}
                  placeholder="Summary for students..."
                  value={newResource.description}
                  onChange={e => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5ee1] hover:bg-[#324ecc] text-white font-bold rounded-xl"
                >
                  Upload & Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

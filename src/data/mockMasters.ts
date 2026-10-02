import { SystemMasters } from '../types';

export const initialSystemMasters: SystemMasters = {
  academicYears: [
    { id: 'ay-1', code: 'AY-2026-27', name: '2026 - 2027', description: 'Current Active Academic Year', status: 'active' },
    { id: 'ay-2', code: 'AY-2025-26', name: '2025 - 2026', description: 'Previous Academic Session', status: 'active' },
    { id: 'ay-3', code: 'AY-2027-28', name: '2027 - 2028', description: 'Upcoming Planning Year', status: 'inactive' }
  ],
  classes: [
    { id: 'cls-1', code: 'PGD-AI-401', name: 'Post-Graduate Diploma (AI & Data Science)', category: 'Higher Education', status: 'active' },
    { id: 'cls-2', code: 'EXEC-FIN-302', name: 'Executive Financial Modeling & Valuation', category: 'Finance', status: 'active' },
    { id: 'cls-3', code: 'CERT-MLOPS-601', name: 'Distributed Cloud & MLOps Certification', category: 'Engineering', status: 'active' },
    { id: 'cls-4', code: 'BOOT-FS-101', name: 'Full-Stack Modern Engineering Bootcamp', category: 'Bootcamp', status: 'active' },
    { id: 'cls-5', code: 'LEAD-TECH-501', name: 'Executive Tech Leadership & Architect Fellowship', category: 'Leadership', status: 'active' }
  ],
  sections: [
    { id: 'sec-1', code: 'SEC-A', name: 'Cohort Batch A (Morning 09:00 - 13:00)', description: 'Weekdays Morning', status: 'active' },
    { id: 'sec-2', code: 'SEC-B', name: 'Cohort Batch B (Evening 18:00 - 21:00)', description: 'Working Professionals Evening', status: 'active' },
    { id: 'sec-3', code: 'SEC-WKND', name: 'Weekend Executive Cohort (Sat-Sun)', description: 'Weekend Intensive Labs', status: 'active' }
  ],
  departments: [
    { id: 'dept-1', code: 'D-AI', name: 'Department of Artificial Intelligence & Data Systems', description: 'AI, LLMs, Neural Networks', status: 'active' },
    { id: 'dept-2', code: 'D-FIN', name: 'Department of Corporate Valuation & Financial Tech', description: 'Investment Banking, DCF, M&A', status: 'active' },
    { id: 'dept-3', code: 'D-CLOUD', name: 'Department of Cloud Infrastructure & Devops', description: 'Kubernetes, CUDA Clusters', status: 'active' },
    { id: 'dept-4', code: 'D-EXEC', name: 'Department of Executive Education & Admissions', description: 'Admissions, Counseling & Placements', status: 'active' }
  ],
  subjects: [
    { id: 'sub-1', code: 'CS-401', name: 'Linear Algebra & Tensors for Deep Learning', category: 'Theory + Lab', status: 'active' },
    { id: 'sub-2', code: 'CS-402', name: 'Transformer Architectures & Self-Attention Mechanics', category: 'Practical Lab', status: 'active' },
    { id: 'sub-3', code: 'CS-403', name: 'Enterprise Retrieval-Augmented Generation (RAG)', category: 'Applied Project', status: 'active' },
    { id: 'sub-4', code: 'FN-301', name: 'Dynamic 3-Statement Corporate Financial Modeling', category: 'Core Finance', status: 'active' },
    { id: 'sub-5', code: 'FN-302', name: 'Discounted Cash Flow (DCF) & LBO Valuation', category: 'Case Study', status: 'active' }
  ],
  rooms: [
    { id: 'rm-1', code: 'LAB-A', name: 'High-Performance Cloud GPU Cluster 01', description: 'Virtual Cloud Compute', status: 'active' },
    { id: 'rm-2', code: 'HALL-1', name: 'Virtual Keynote Amphitheater (500 Seats)', description: 'Webinars & Guest Lectures', status: 'active' },
    { id: 'rm-3', code: 'CONF-4', name: 'Executive Meeting Room B (1:1 Advisory)', description: 'Admissions & Counseling', status: 'active' }
  ],
  studentCategories: [
    { id: 'sc-1', code: 'GEN', name: 'General Professional', status: 'active' },
    { id: 'sc-2', code: 'MERIT', name: 'Merit Fellowship Scholar (20% Waiver)', status: 'active' },
    { id: 'sc-3', code: 'CORP', name: 'Corporate Sponsored Candidate', status: 'active' },
    { id: 'sc-4', code: 'ALUM', name: 'Alumnus Continuous Learner', status: 'active' },
    { id: 'sc-5', code: 'INTL', name: 'International Remote Candidate', status: 'active' }
  ],
  bloodGroups: [
    { id: 'bg-1', code: 'A+', name: 'A Positive (A+)', status: 'active' },
    { id: 'bg-2', code: 'A-', name: 'A Negative (A-)', status: 'active' },
    { id: 'bg-3', code: 'B+', name: 'B Positive (B+)', status: 'active' },
    { id: 'bg-4', code: 'B-', name: 'B Negative (B-)', status: 'active' },
    { id: 'bg-5', code: 'O+', name: 'O Positive (O+)', status: 'active' },
    { id: 'bg-6', code: 'O-', name: 'O Negative (O-)', status: 'active' },
    { id: 'bg-7', code: 'AB+', name: 'AB Positive (AB+)', status: 'active' },
    { id: 'bg-8', code: 'AB-', name: 'AB Negative (AB-)', status: 'active' }
  ],
  houses: [
    { id: 'h-1', code: 'TURING', name: 'Alan Turing House (Algorithmic Innovation)', status: 'active' },
    { id: 'h-2', code: 'CURIE', name: 'Marie Curie House (Research & Discovery)', status: 'active' },
    { id: 'h-3', code: 'RAMAN', name: 'Ramanujan House (Pure Mathematics & Quant)', status: 'active' },
    { id: 'h-4', code: 'LOVELACE', name: 'Ada Lovelace House (Software Engineering)', status: 'active' }
  ],
  leadSources: [
    { id: 'ls-1', code: 'WHATSAPP', name: 'WhatsApp Inbound Chatbot', status: 'active' },
    { id: 'ls-2', code: 'META-ADS', name: 'Meta Ads (Instagram & Facebook Lead Form)', status: 'active' },
    { id: 'ls-3', code: 'GOOGLE', name: 'Google Search PPC Campaign', status: 'active' },
    { id: 'ls-4', code: 'YOUTUBE', name: 'Organic YouTube Technical Tutorials', status: 'active' },
    { id: 'ls-5', code: 'REFERRAL', name: 'Alumni & Student Referral Program', status: 'active' },
    { id: 'ls-6', code: 'WEBINAR', name: 'Live Masterclass Webinar Registration', status: 'active' }
  ],
  leadLostReasons: [
    { id: 'lr-1', code: 'FEE-HIGH', name: 'Fee beyond current personal budget', status: 'active' },
    { id: 'lr-2', code: 'TIMING', name: 'Live class schedule conflicts with current job', status: 'active' },
    { id: 'lr-3', code: 'COMPETITOR', name: 'Enrolled in alternative university program', status: 'active' },
    { id: 'lr-4', code: 'UNRESPONSIVE', name: 'No response after 5 counseling outreach attempts', status: 'active' },
    { id: 'lr-5', code: 'POSTPONE', name: 'Deferred decision to future quarter cohort', status: 'active' }
  ],
  feeGroups: [
    { id: 'fg-1', code: 'TUITION-AI', name: 'Comprehensive Tuition & Cloud Compute Quota (₹28,800)', status: 'active' },
    { id: 'fg-2', code: 'TUITION-FIN', name: 'Executive Finance & Valuation Courseware (₹18,000)', status: 'active' },
    { id: 'fg-3', code: 'INST-2X', name: 'Two-Term Split Installment (₹14,400 x 2)', status: 'active' },
    { id: 'fg-4', code: 'CORP-BULK', name: 'Enterprise Corporate Cohort Sponsorship', status: 'active' },
    { id: 'fg-5', code: 'EXAM-CERT', name: 'External Proctored Examination & Credential Fee (₹3,500)', status: 'active' }
  ],
  feePaymentModes: [
    { id: 'fpm-1', code: 'UPI', name: 'Instant UPI / QR Code (PhonePe, GooglePay, Paytm)', status: 'active' },
    { id: 'fpm-2', code: 'GATEWAY', name: 'Razorpay / Stripe Online Gateway (Credit/Debit Cards)', status: 'active' },
    { id: 'fpm-3', code: 'NEFT', name: 'Bank Wire Transfer (NEFT / RTGS / IMPS)', status: 'active' },
    { id: 'fpm-4', code: 'EMI', name: 'No-Cost Monthly Education Loan / EMI', status: 'active' },
    { id: 'fpm-5', code: 'CHEQUE', name: 'Corporate Cheque / Demand Draft', status: 'active' }
  ],
  scholarships: [
    { id: 'sch-1', code: 'MERIT-20', name: 'Merit Academic Fellowship (20% Tuition Discount)', status: 'active' },
    { id: 'sch-2', code: 'EARLY-5K', name: 'Early Bird Cohort Registration Waiver (₹5,000 Off)', status: 'active' },
    { id: 'sch-3', code: 'WOMEN-25', name: 'Women in AI & Quant Fellowship (25% Discount)', status: 'active' },
    { id: 'sch-4', code: 'ALUM-30', name: 'Alumni Continuing Education Privilege (30% Discount)', status: 'active' }
  ],
  staffDesignations: [
    { id: 'sd-1', code: 'DEAN', name: 'Chief Academic Director & Dean', status: 'active' },
    { id: 'sd-2', code: 'PROF', name: 'Senior Professor of Practice', status: 'active' },
    { id: 'sd-3', code: 'FAC', name: 'Associate Cohort Faculty', status: 'active' },
    { id: 'sd-4', code: 'COUNS-SR', name: 'Senior Admissions & Career Advisory Lead', status: 'active' },
    { id: 'sd-5', code: 'COUNS', name: 'Admissions Counselor', status: 'active' },
    { id: 'sd-6', code: 'ACCT', name: 'Finance Controller & Lead Accountant', status: 'active' },
    { id: 'sd-7', code: 'SUPP', name: 'Student Success & Technical Support Engineer', status: 'active' }
  ],
  examTypes: [
    { id: 'et-1', code: 'MID', name: 'Mid-Term Capstone & Mathematical Evaluation', status: 'active' },
    { id: 'et-2', code: 'FINAL', name: 'End-Term Comprehensive Architecture Defense', status: 'active' },
    { id: 'et-3', code: 'CODE-LAB', name: 'Hands-on Production Code & Docker Benchmark', status: 'active' },
    { id: 'et-4', code: 'QUIZ-WK', name: 'Continuous Weekly Knowledge Check Quiz', status: 'active' }
  ],
  gradingScales: [
    { id: 'gs-1', code: 'DIST', name: 'A+ (Distinction) - 90% and above', status: 'active' },
    { id: 'gs-2', code: 'EXC', name: 'A (Excellence) - 80% to 89%', status: 'active' },
    { id: 'gs-3', code: 'GOOD', name: 'B (Good Performance) - 70% to 79%', status: 'active' },
    { id: 'gs-4', code: 'PASS', name: 'Pass Threshold - 60% to 69%', status: 'active' },
    { id: 'gs-5', code: 'FAIL', name: 'Unsatisfactory - Below 60%', status: 'active' }
  ]
};

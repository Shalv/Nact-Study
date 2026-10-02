import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { apiRouter } from './src/server/routes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory active sessions store
interface SessionData {
  userId: string;
  token: string;
  createdAt: number;
  expiresAt: number;
}

const activeSessions = new Map<string, SessionData>();

// Simple PBKDF2 password hashing helper
function hashPassword(password: string, salt = 'nact_study_salt_2026'): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

// Demo users seeded in database
interface ServerUser {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  rawPasswordForDemo?: string; // Kept only for easy verification
  role: string;
  portalType: 'admin' | 'teacher' | 'student';
  avatar: string;
  department: string;
  designation?: string;
  phone: string;
  active: boolean;
  studentId?: string;
  admissionNo?: string;
}

const serverUsers: ServerUser[] = [
  {
    id: 'usr-1',
    name: 'Anita Sen',
    email: 'anita.sen@nactstudy.com',
    username: 'admin',
    passwordHash: hashPassword('admin123'),
    rawPasswordForDemo: 'admin123',
    role: 'Super Admin',
    portalType: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    department: 'Executive Operations & Administration',
    designation: 'Director of Academic Affairs',
    phone: '+91 98111 22334',
    active: true,
  },
  {
    id: 'usr-3',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@nactstudy.com',
    username: 'vikram.roy',
    passwordHash: hashPassword('teacher123'),
    rawPasswordForDemo: 'teacher123',
    role: 'Faculty',
    portalType: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    department: 'Department of Artificial Intelligence & Data Systems',
    designation: 'Senior Lead Faculty & AI Researcher',
    phone: '+91 98222 33445',
    active: true,
  },
  {
    id: 'usr-8',
    name: 'Aarav Patel',
    email: 'aarav.patel@gmail.com',
    username: 'aarav.patel',
    passwordHash: hashPassword('student123'),
    rawPasswordForDemo: 'student123',
    role: 'Student',
    portalType: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80',
    department: 'Post-Graduate Diploma (AI & Data Science)',
    designation: 'PG Scholar (AI/ML)',
    phone: '+91 98777 88990',
    studentId: 'PRE-1001',
    admissionNo: 'ADM-9042',
    active: true,
  },
  {
    id: 'usr-4',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@nactstudy.com',
    username: 'admissions.counselor',
    passwordHash: hashPassword('admin123'),
    rawPasswordForDemo: 'admin123',
    role: 'Counselor',
    portalType: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    department: 'Admissions & Student Career Counseling',
    designation: 'Senior Admissions Lead',
    phone: '+91 98333 44556',
    active: true,
  }
];

function sanitizeUser(u: ServerUser) {
  const { passwordHash, rawPasswordForDemo, ...rest } = u;
  return rest;
}

// Authentication Middleware
interface AuthenticatedRequest extends Request {
  user?: ServerUser;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Session invalid or expired' });
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return res.status(401).json({ error: 'Unauthorized: Session has expired. Please log in again.' });
  }

  const user = serverUsers.find(u => u.id === session.userId);
  if (!user || !user.active) {
    activeSessions.delete(token);
    return res.status(401).json({ error: 'Unauthorized: User account not found or deactivated' });
  }

  req.user = user;
  next();
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Security & Cache Control headers for all API requests
  app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

  // --- Auth Endpoints ---

  // POST /api/auth/login
  app.post('/api/auth/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/Email and Password are required.' });
    }

    const q = String(usernameOrEmail).toLowerCase().trim();
    const user = serverUsers.find(
      u => u.username.toLowerCase() === q || u.email.toLowerCase() === q
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. User does not exist.' });
    }

    const hashedInput = hashPassword(password);
    const isValid = hashedInput === user.passwordHash || (user.rawPasswordForDemo && user.rawPasswordForDemo === password.trim());

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    }

    // Generate secure session token (24-hour validity)
    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    const expiresAt = now + 24 * 60 * 60 * 1000;

    activeSessions.set(token, {
      userId: user.id,
      token,
      createdAt: now,
      expiresAt
    });

    return res.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: `Welcome back, ${user.name}`
    });
  });

  // GET /api/auth/me
  app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.json({
      authenticated: true,
      user: sanitizeUser(req.user)
    });
  });

  // POST /api/auth/logout
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      activeSessions.delete(token);
    }
    return res.json({ success: true, message: 'Logged out successfully. Session invalidated.' });
  });

  // POST /api/auth/change-password
  app.post('/api/auth/change-password', requireAuth, (req: AuthenticatedRequest, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = req.user!;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required (current, new, confirm password).' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const hashedCurrent = hashPassword(currentPassword);
    const isCurrentValid = hashedCurrent === user.passwordHash || (user.rawPasswordForDemo && user.rawPasswordForDemo === currentPassword.trim());

    if (!isCurrentValid) {
      return res.status(400).json({ error: 'Current password provided is incorrect.' });
    }

    // Update password in memory
    user.passwordHash = hashPassword(newPassword);
    user.rawPasswordForDemo = newPassword;

    // Invalidate other sessions except current if wanted, or clear all
    return res.json({ success: true, message: 'Password changed successfully.' });
  });

  // PUT /api/auth/profile
  app.put('/api/auth/profile', requireAuth, (req: AuthenticatedRequest, res) => {
    const { name, email, phone, avatar, department, designation } = req.body;
    const user = req.user!;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    user.name = name.trim();
    user.email = email.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (avatar !== undefined) user.avatar = avatar.trim();
    if (department !== undefined) user.department = department.trim();
    if (designation !== undefined) user.designation = designation.trim();

    return res.json({
      success: true,
      user: sanitizeUser(user),
      message: 'Profile updated successfully.'
    });
  });

  // Mount Education Relational Database REST API
  app.use('/api', apiRouter);

  // Heartbeat / health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Development: Vite middleware mode
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nact Study ERP full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

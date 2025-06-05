import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Database } from 'sqlite3';
import path from 'path';
import chatRouter from './routes/chat';
import projectsRouter from './routes/projects';
import { configureSecurityMiddleware } from './middleware/security';
import { errorHandler, AppError } from './middleware/errorHandler';
import { validateApiKey } from './middleware/auth';
import logger, { logRequest } from './utils/logger';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const app = express();
const port = process.env.PORT || 3002;

// Configure security middleware
configureSecurityMiddleware(app);

// Request logging
app.use(logRequest);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Portfolio API Server!');
});

// Middleware
app.use(express.json({ limit: '10kb' })); // Body limit of 10kb

// API Key authentication for all /api routes
// Commenting out API key validation for development
// app.use('/api', validateApiKey);

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

// Database setup
const db = new Database(path.join(__dirname, '../data/portfolio.db'));

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      githubUrl TEXT NOT NULL,
      technologies TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `);
});

// Routes
app.use('/api/chat', chatRouter);
app.use('/api/projects', projectsRouter);

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  db.close(() => {
    logger.info('💽 Database connection closed.');
    process.exit(0);
  });
});

// Start server
const server = app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...', {
    error: err.name,
    message: err.message,
    stack: err.stack
  });
  server.close(() => {
    process.exit(1);
  });
}); 
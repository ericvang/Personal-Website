import express, { Request, Response, NextFunction } from 'express';
import { Database } from 'sqlite3';
import path from 'path';
import { projectValidation } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = express.Router();
const db = new Database(path.join(__dirname, '../../data/portfolio.db'));

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

// Get all projects
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  db.all('SELECT id, title, description, githubUrl, technologies, date FROM projects', (err, rows: Project[]) => {
    if (err) {
      logger.error('Error fetching projects', { error: err });
      return next(new AppError('Error fetching projects', 500));
    }
    // Parse technologies JSON string back to array
    const projects = rows.map(project => ({
      ...project,
      technologies: JSON.parse(project.technologies as unknown as string)
    }));
    res.json(projects);
  });
});

// Get single project
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  db.get(
    'SELECT id, title, description, githubUrl, technologies, date FROM projects WHERE id = ?',
    [req.params.id],
    (err, row: Project) => {
      if (err) {
        logger.error('Error fetching project', { error: err, projectId: req.params.id });
        return next(new AppError('Error fetching project', 500));
      }
      if (!row) {
        return next(new AppError('Project not found', 404));
      }
      // Parse technologies JSON string back to array
      const project = {
        ...row,
        technologies: JSON.parse(row.technologies as unknown as string)
      };
      res.json(project);
    }
  );
});

// Create new project
router.post('/', projectValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, githubUrl, technologies, date } = req.body as Project;
    const id = Date.now().toString();
    
    db.run(
      'INSERT INTO projects (id, title, description, githubUrl, technologies, date) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title, description, githubUrl, JSON.stringify(technologies), date],
      (err) => {
        if (err) {
          logger.error('Error creating project', { error: err, project: req.body });
          return next(new AppError('Error creating project', 500));
        }
        res.status(201).json({
          id,
          title,
          description,
          githubUrl,
          technologies,
          date
        });
      }
    );
  } catch (error) {
    logger.error('Error creating project', { error });
    next(new AppError('Error creating project', 500));
  }
});

// Update project
router.put('/:id', projectValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, githubUrl, technologies, date } = req.body as Project;

    db.run(
      'UPDATE projects SET title = ?, description = ?, githubUrl = ?, technologies = ?, date = ? WHERE id = ?',
      [title, description, githubUrl, JSON.stringify(technologies), date, req.params.id],
      function(err) {
        if (err) {
          logger.error('Error updating project', { error: err, projectId: req.params.id });
          return next(new AppError('Error updating project', 500));
        }
        if (this.changes === 0) {
          return next(new AppError('Project not found', 404));
        }
        res.json({
          id: req.params.id,
          title,
          description,
          githubUrl,
          technologies,
          date
        });
      }
    );
  } catch (error) {
    logger.error('Error updating project', { error });
    next(new AppError('Error updating project', 500));
  }
});

// Delete project
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      logger.error('Error deleting project', { error: err, projectId: req.params.id });
      return next(new AppError('Error deleting project', 500));
    }
    if (this.changes === 0) {
      return next(new AppError('Project not found', 404));
    }
    res.status(204).send();
  });
});

export default router; 
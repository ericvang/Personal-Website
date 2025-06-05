import { Router, Request, Response } from 'express';
import { Database } from 'sqlite3';
import path from 'path';
import logger from '../utils/logger';

const router = Router();
const db = new Database(path.join(__dirname, '../../data/portfolio.db'));

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    
    // Get projects from database
    db.all<Project>('SELECT * FROM projects', (err, projects) => {
      if (err) {
        logger.error('Error fetching projects for chat', { error: err });
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Parse technologies for each project
      const parsedProjects = projects.map(project => ({
        ...project,
        technologies: JSON.parse(project.technologies as unknown as string)
      }));

      // Generate response based on projects and question
      const response = generateResponse(question.toLowerCase(), parsedProjects);
      res.json({ answer: response });
    });
  } catch (error) {
    logger.error('Chat error:', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateResponse(question: string, projects: Project[]): string {
  // Get all unique technologies from projects
  const allTechnologies = Array.from(new Set(
    projects.flatMap(p => p.technologies)
  )).join(', ');

  // Get all project titles
  const projectTitles = projects.map(p => p.title).join(', ');

  if (question.includes('technologies') || question.includes('tech stack') || question.includes('built with')) {
    return `I work with various technologies including: ${allTechnologies}`;
  }
  
  if (question.includes('ai') || question.includes('machine learning') || question.includes('ml')) {
    const aiProjects = projects.filter(p => 
      p.technologies.some(tech => 
        tech.toLowerCase().includes('ai') || 
        tech.toLowerCase().includes('ml') || 
        tech.toLowerCase().includes('machine learning')
      )
    );
    if (aiProjects.length > 0) {
      return `I specialize in AI and machine learning applications. Some relevant projects include: ${aiProjects.map(p => p.title).join(', ')}`;
    }
  }

  if (question.includes('project') || question.includes('work')) {
    return `Here are some of my key projects: ${projectTitles}. Which one would you like to know more about?`;
  }

  if (question.includes('contact') || question.includes('reach') || question.includes('email')) {
    return 'You can reach me at ericvang100@gmail.com or connect with me on GitHub and LinkedIn. I\'m always interested in discussing new projects and opportunities!';
  }

  // Default response
  return 'I\'d be happy to help you learn more about my projects! Try asking about specific technologies or ask about particular project types you\'re interested in.';
}

export default router; 
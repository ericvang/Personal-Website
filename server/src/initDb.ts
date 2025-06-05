import { Database } from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

const db = new Database(path.join(__dirname, '../data/portfolio.db'));

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Pinterest MVP',
    description: 'Flask/React site using CLIP for zero-shot auto-tagging and FAISS for image similarity search.',
    githubUrl: 'https://github.com/ericvang/ai-pinterest-mvp',
    technologies: ['Flask', 'React', 'CLIP', 'FAISS'],
    date: '2025'
  },
  {
    id: '2',
    title: 'UserPredictor Demo',
    description: 'Machine learning model that predicts user behavior patterns using advanced analytics.',
    githubUrl: 'https://github.com/ericvang/user-predictor',
    technologies: ['Python', 'scikit-learn', 'TensorFlow'],
    date: '2025'
  },
  {
    id: '3',
    title: 'Manduca Tracker',
    description: 'Computer vision application for tracking and analyzing Manduca moth behavior in research environments.',
    githubUrl: 'https://github.com/ericvang/manduca-tracker',
    technologies: ['OpenCV', 'Python', 'TensorFlow'],
    date: '2025'
  },
];

async function initializeDatabase() {
  try {
    // Create projects table
    await new Promise<void>((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          githubUrl TEXT NOT NULL,
          technologies TEXT NOT NULL,
          date TEXT NOT NULL
        )
      `, (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Insert projects
    for (const project of sampleProjects) {
      await new Promise<void>((resolve, reject) => {
        db.run(
          'INSERT OR REPLACE INTO projects (id, title, description, githubUrl, technologies, date) VALUES (?, ?, ?, ?, ?, ?)',
          [
            project.id,
            project.title,
            project.description,
            project.githubUrl,
            JSON.stringify(project.technologies),
            project.date
          ],
          (err: Error | null) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      console.log(`Added project: ${project.title}`);
    }

    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 
import { Database } from 'sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, '../../data/portfolio.db'));

const initialProjects = [
  {
    id: '1',
    title: 'Eric Vang Portfolio',
    description: 'Built a personal portfolio website to showcase my projects and skills. This is the website you are currently on!',
    githubUrl: '',
    technologies: ['React', 'HTML/CSS', 'JavaScript', 'Vite'],
    date: '2025'
  },
  {
    id: '2',
    title: 'Smart Email Targeting Classifier',
    description: 'Built a machine learning model to classify and target marketing emails based on user behavior and preferences.',
    githubUrl: 'https://github.com/ericvang/email-classifier',
    technologies: ['Python', 'scikit-learn', 'Pandas', 'ML'],
    date: '2025'
  },
  {
    id: '3',
    title: 'Madison Water Usage Dashboard',
    description: 'Created an interactive dashboard to visualize and analyze water usage patterns in Madison.',
    githubUrl: 'https://github.com/ericvang/water-dashboard',
    technologies: ['React', 'Flask', 'HTML/CSS', 'Matplotlib', 'Pandas'],
    date: '2025'
  },
  {
    id: '4',
    title: 'ElevateJobs - Hackathon Project',
    description: 'Developed a job matching platform using AI to connect students with relevant internship opportunities.',
    githubUrl: 'https://github.com/ericvang/elevate-jobs',
    technologies: ['Python', 'OpenAI API', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    date: '2025'
  }
];

// Create the projects table if it doesn't exist
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

  // Clear existing projects
  db.run('DELETE FROM projects');

  // Insert initial projects
  const stmt = db.prepare('INSERT INTO projects (id, title, description, githubUrl, technologies, date) VALUES (?, ?, ?, ?, ?, ?)');
  
  initialProjects.forEach(project => {
    stmt.run(
      project.id,
      project.title,
      project.description,
      project.githubUrl,
      JSON.stringify(project.technologies),
      project.date
    );
  });
  
  stmt.finalize();

  console.log('Database initialized with sample projects!');
  db.close();
}); 
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
    title: "Smart Email Targeting Classifier",
    description: "Built a predictive classifier to identify users likely to engage with laptop promotion emails using historical browsing and interaction data. Engineered custom features from raw user logs and implemented a machine learning pipeline with imputation, scaling, and logistic regression. Achieved strong accuracy by integrating behavioral metrics such as total session time and visit frequency into model training.",
    githubUrl: "https://github.com/ericvang/smart-email-classifier",
    technologies: ["Python", "pandas", "scikit-learn", "Machine Learning", "Data Analysis"],
    date: "Spring 2025"
  },
  {
    id: '2',
    title: "Madison Water Usage Dashboard",
    description: "Developed an interactive web application using Flask to visualize water usage data across Madison. Parsed a city-wide dataset (CSV) and implemented dynamic data display in HTML and JSON. Built three SVG dashboards using matplotlib, including a histogram, boxplot, and scatter plot, served through Flask routes. Implemented A/B testing to optimize donation page engagement and added email validation with regex. Included rate limiting and IP tracking for secure JSON access.",
    githubUrl: "https://github.com/ericvang/madison-water-dashboard",
    technologies: ["Python", "Flask", "HTML/CSS", "JavaScript", "Pandas", "Matplotlib", "Regex", "Data Visualization"],
    date: "Spring 2025"
  },
  {
    id: '3',
    title: "ElevateJobs - Hackathon Project",
    description: "Developed a web application that mimics the functionality of Hinge to help students discover internship and job opportunities. Integrates Google Gemini's AI voice capable of communicating with users and answering common interview questions to enhance engagement and preparation. Responsible for developing the front-end portion of the website, designing the UI/UX. Winner of the Mercie J. Lee Hackathon.",
    githubUrl: "https://github.com/ericvang/elevate-jobs",
    technologies: ["Python", "JavaScript", "HTML", "CSS", "Google Gemini AI", "UI/UX Design"],
    date: "February 17, 2025"
  },
  {
    id: '4',
    title: "Sip n' Play 3D Website",
    description: "Designed and developed a 3D interactive website for a board-game café, simulating a game piece navigating a board. Built with React and Three.js, featuring a rotating menu system and immersive 3D navigation to showcase the café's offerings. Created during the CodeDex Summer Hackathon.",
    githubUrl: "https://github.com/ericvang/sip-n-play-3d",
    technologies: ["JSX", "JavaScript", "HTML", "CSS", "Three.js", "React", "3D Graphics"],
    date: "July 2024"
  },
  {
    id: '5',
    title: "Badger Valley - Unity Game",
    description: "Built a Unity-based game with features like character movement and inventory management. Led UX/UI design, earning the 'Best UX/UI Award' for interface clarity and player accessibility. Runner-Up in the Mercie J. Lee Hackathon.",
    githubUrl: "https://github.com/ericvang/badger-valley",
    technologies: ["C#", "Unity", "Game Development", "UI/UX Design"],
    date: "February 18, 2024"
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
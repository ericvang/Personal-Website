export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

export const projects: Project[] = [
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
    githubUrl: "https://github.com/ericvang/Madison-Water-Usage-Dashboard",
    technologies: ["Python", "Flask", "HTML/CSS", "JavaScript", "Pandas", "Matplotlib", "Regex", "Data Visualization"],
    date: "Spring 2025"
  },
  {
    id: '3',
    title: "ElevateJobs - Hackathon Project",
    description: "Developed a web application that mimics the functionality of Hinge to help students discover internship and job opportunities. Integrates Google Gemini's AI voice capable of communicating with users and answering common interview questions to enhance engagement and preparation. Responsible for developing the front-end portion of the website, designing the UI/UX. Winner of the Mercie J. Lee Hackathon.",
    githubUrl: "https://github.com/ericvang/Elevate.jobs",
    technologies: ["Python", "JavaScript", "HTML", "CSS", "Google Gemini AI", "UI/UX Design"],
    date: "February 17, 2025"
  },
  {
    id: '4',
    title: "Sip n' Play 3D Website",
    description: "Designed and developed a 3D interactive website for a board-game café, simulating a game piece navigating a board. Built with React and Three.js, featuring a rotating menu system and immersive 3D navigation to showcase the café's offerings. Created during the CodeDex Summer Hackathon.",
    githubUrl: "https://github.com/ericvang/Sip-N-Play-Website",
    technologies: ["JSX", "JavaScript", "HTML", "CSS", "Three.js", "React", "3D Graphics"],
    date: "July 2024"
  },
  {
    id: '5',
    title: "Badger Valley - Unity Game",
    description: "Built a Unity-based game with features like character movement and inventory management. Led UX/UI design, earning the 'Best UX/UI Award' for interface clarity and player accessibility. Runner-Up in the Mercie J. Lee Hackathon.",
    githubUrl: "https://github.com/ericvang/badgervalley",
    technologies: ["C#", "Unity", "Game Development", "UI/UX Design"],
    date: "February 18, 2024"
  },
]; 
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies: string[];
  date: string;
}

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        console.log('Fetching projects...');
        const response = await axios.get('/api/projects');
        console.log('Projects response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
        }
        // Fallback data
        return [
          {
            id: '1',
            title: 'Eric Vang Portfolio',
            description: 'Built a personal portfolio website to showcase my projects and skills. This is the website you are currently on! ',
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
      }
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-24 section-light">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light text-gray-400 mb-16 fade-in-up">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 section-light">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light text-gray-400 mb-16 fade-in-up">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-sm text-gray-500">{project.date}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                View on GitHub
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;


import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  technologies?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {project.description}
      </p>
      
      {project.technologies && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
      >
        View on GitHub
        <svg 
          className="w-4 h-4 ml-2" 
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
  );
};

export default ProjectCard;

import React from 'react';
import { projects } from '../data/projects';

const Projects = () => {
  if (!projects) {
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
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                  View on GitHub →
                </a>
              )}
              <div className="mt-2 text-sm text-gray-500">{project.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

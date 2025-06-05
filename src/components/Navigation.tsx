import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-12">
          <li>
            <a href="#portfolio" className="nav-link text-gray-400 hover:text-gray-600">
              portfolio
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link text-gray-400 hover:text-gray-600">
              projects
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link text-gray-400 hover:text-gray-600">
              about
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link text-gray-400 hover:text-gray-600">
              contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

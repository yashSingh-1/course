tsx
// src/pages/ProjectsPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'CS' | 'Astrophysics';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A computer science project focusing on algorithm optimization.',
    category: 'CS',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'An astrophysics project exploring stellar evolution.',
    category: 'Astrophysics',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'Another computer science project on data structures.',
    category: 'CS',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'A project in astrophysics about galaxy formation.',
    category: 'Astrophysics',
  },
  // Add more projects as needed
];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'CS' | 'Astrophysics' | 'All'>('All');

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Projects</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore a variety of projects in Computer Science and Astrophysics.
      </p>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === 'CS' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2`}
          onClick={() => setFilter('CS')}
        >
          CS
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === 'Astrophysics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setFilter('Astrophysics')}
        >
          Astrophysics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <Link
              to={`/projects/${project.id}`} // Assuming you have a route for project details
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
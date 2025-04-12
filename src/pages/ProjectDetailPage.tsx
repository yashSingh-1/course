tsx
import React from 'react';

interface ProjectDetails {
  title: string;
  description: string;
  category: 'CS' | 'Astrophysics';
  submissionRequirements: {
    github: boolean;
    pdf: boolean;
  };
  // Add other relevant project information here
  [key: string]: any; 
}

const ProjectDetailPage: React.FC<ProjectDetails> = ({
  title,
  description,
  category,
  submissionRequirements,
  ...otherDetails
}) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Project Overview */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
          <p>{description}</p>
          <p><strong>Category:</strong> {category}</p>
          {/* Display other relevant information from otherDetails */}
          {Object.entries(otherDetails).map(([key, value]) => (
            <p key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </p>
          ))}
        </section>

        {/* Submission Guidelines */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Submission Guidelines</h2>
          <p>This project accepts submissions via:</p>
          <ul className="list-disc list-inside">
            {submissionRequirements.github && <li>GitHub Repository</li>}
            {submissionRequirements.pdf && <li>PDF Document</li>}
            {!(submissionRequirements.github || submissionRequirements.pdf) && <li>No specific submission method specified.</li>}
          </ul>
          {/* Add more detailed submission instructions if needed */}
        </section>

        {/* Interesting Aspects (Example) */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Why This Project Rocks!</h2>
          <p>This project offers a unique opportunity to...</p> 
          {/* Add specific details to attract users, e.g., learning outcomes, challenges, etc. */}
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
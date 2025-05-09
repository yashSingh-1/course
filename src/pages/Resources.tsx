import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Users, Award, Telescope } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      title: "Open Science Training",
      description: "Professional training, coaching, and consulting services since 2016. We deliver comprehensive virtual training sessions as part of the NASA Open Science initiative.",
      icon: <Rocket className="w-12 h-12 text-purple-500" />,
      link: "https://www.opensciencetraining.org/",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "NASA Open Science Initiative",
      description: "Awarded a three-year NASA grant under the F.14 NASA Open Science initiative, delivering cutting-edge virtual training sessions as part of this multi-year initiative.",
      icon: <Award className="w-12 h-12 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Asteroid Hunting",
      description: "Join our exciting asteroid hunting program where you can contribute to real scientific research and help discover new asteroids in our solar system.",
      icon: <Telescope className="w-12 h-12 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Resources</h1>
          <p className="text-xl text-gray-600">Discover our comprehensive range of training and research resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {resource.icon}
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">{resource.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Users, Clock, Atom, Brain, Database, ChevronDown, ChevronUp } from 'lucide-react';

const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Quantum Astrophysics: Advanced Concepts",
      category: "Astrophysics",
      instructor: "Dr. Neil Thompson",
      level: "Advanced",
      duration: "12 weeks",
      students: 1284,
      rating: 4.9,
      price: 599,
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      description: "Explore the intersection of quantum mechanics and astrophysics with cutting-edge research and theories."
    },
    {
      id: 2,
      title: "Advanced Neural Networks & Deep Learning",
      category: "Machine Learning",
      instructor: "Dr. Maya Patel",
      level: "Advanced",
      duration: "10 weeks",
      students: 2156,
      rating: 4.8,
      price: 699,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Master the latest techniques in neural networks and deep learning with hands-on projects and real-world applications."
    },
    {
      id: 3,
      title: "Cosmology & Dark Matter Research",
      category: "Astrophysics",
      instructor: "Prof. James Wilson",
      level: "Intermediate",
      duration: "8 weeks",
      students: 943,
      rating: 4.7,
      price: 549,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      description: "Dive into the mysteries of the universe, exploring dark matter, dark energy, and the evolution of cosmic structures."
    },
    {
      id: 4,
      title: "Natural Language Processing & Transformers",
      category: "Machine Learning",
      instructor: "Dr. Sarah Johnson",
      level: "Intermediate",
      duration: "9 weeks",
      students: 1756,
      rating: 4.9,
      price: 649,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Learn how to build and implement state-of-the-art NLP models using transformer architectures like BERT and GPT."
    },
    {
      id: 5,
      title: "Stellar Evolution & Nucleosynthesis",
      category: "Astrophysics",
      instructor: "Prof. Elena Rodriguez",
      level: "Intermediate",
      duration: "7 weeks",
      students: 823,
      rating: 4.6,
      price: 499,
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      description: "Understand the life cycles of stars, from formation to supernova, and the creation of elements in the universe."
    },
    {
      id: 6,
      title: "Computer Vision & Convolutional Networks",
      category: "Machine Learning",
      instructor: "Dr. Michael Chen",
      level: "Advanced",
      duration: "11 weeks",
      students: 1892,
      rating: 4.8,
      price: 679,
      image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Master computer vision techniques and build powerful CNN models for image recognition, object detection, and more."
    },
    {
      id: 7,
      title: "Exoplanet Detection & Characterization",
      category: "Astrophysics",
      instructor: "Dr. Thomas Wright",
      level: "Advanced",
      duration: "10 weeks",
      students: 756,
      rating: 4.7,
      price: 599,
      image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      description: "Learn advanced techniques for detecting and studying planets outside our solar system, including habitability analysis."
    },
    {
      id: 8,
      title: "Reinforcement Learning & Game AI",
      category: "Machine Learning",
      instructor: "Prof. David Kim",
      level: "Intermediate",
      duration: "9 weeks",
      students: 1432,
      rating: 4.8,
      price: 629,
      image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Explore reinforcement learning algorithms and their applications in game AI, robotics, and decision-making systems."
    }
  ];

  // Filter courses based on category and search query
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeFilter === 'all' || course.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Courses</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
            Discover advanced courses in Astrophysics and Machine Learning taught by world-class experts
          </p>
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search for courses, topics, or instructors..." 
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                All Courses
              </button>
              <button 
                onClick={() => setActiveFilter('astrophysics')}
                className={`px-4 py-2 rounded-full flex items-center ${activeFilter === 'astrophysics' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <Atom className="h-4 w-4 mr-2" /> Astrophysics
              </button>
              <button 
                onClick={() => setActiveFilter('machine learning')}
                className={`px-4 py-2 rounded-full flex items-center ${activeFilter === 'machine learning' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <Brain className="h-4 w-4 mr-2" /> Machine Learning
              </button>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Filter className="h-4 w-4 mr-2" /> 
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>
          </div>

          {/* Advanced Filters (collapsible) */}
          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Any Duration</option>
                  <option>Under 6 weeks</option>
                  <option>6-10 weeks</option>
                  <option>Over 10 weeks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Prices</option>
                  <option>Under $500</option>
                  <option>$500 - $600</option>
                  <option>$600 - $700</option>
                  <option>Over $700</option>
                </select>
              </div>
            </div>
          )}

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {course.category === "Astrophysics" ? (
                      <Atom className="h-5 w-5 text-purple-600 mr-2" />
                    ) : (
                      <Brain className="h-5 w-5 text-blue-600 mr-2" />
                    )}
                    <span className={`text-sm font-medium ${course.category === "Astrophysics" ? "text-purple-600" : "text-blue-600"}`}>
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="ml-1 text-gray-700">{course.rating}</span>
                    </div>
                    <span className="font-bold text-gray-900">${course.price}</span>
                  </div>
                  <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <Database className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {setActiveFilter('all'); setSearchQuery('');}}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Knowledge?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of students who are already expanding their horizons with our cutting-edge courses.
          </p>
          <Link to="/contact" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Contact Our Advisors
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
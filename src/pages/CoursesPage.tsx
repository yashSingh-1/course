import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Users, Clock, Atom, Brain, Database, ChevronDown, ChevronUp, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';
import { fetchCourses } from '../backendCalls/courses';

// New interfaces for detailed course content
interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

interface CourseFAQ {
  id: number;
  question: string;
  answer: string;
}

interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  level: string;
  status: string;
  duration: number;
  price: number;
  rating: number;
  studentsEnrolled: number;
  instructorName: string;
  instructorTitle?: string | null;
  instructorBio?: string | null;
  instructorImage?: string | null;
  learningOutcomes: string[];
  prerequisites: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prevExpanded => 
      prevExpanded.includes(moduleId) 
        ? prevExpanded.filter(id => id !== moduleId)
        : [...prevExpanded, moduleId]
    );
  };
  
  const toggleFaq = (faqId: number) => {
    setExpandedFaqs(prevExpanded => 
      prevExpanded.includes(faqId) 
        ? prevExpanded.filter(id => id !== faqId)
        : [...prevExpanded, faqId]
    );
  };
  
  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch((err) => {
        // Optionally handle error
        setCourses([]);
      });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeFilter === 'all' || course.level.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

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
                onClick={() => setActiveFilter('beginner')}
                className={`px-4 py-2 rounded-full flex items-center ${activeFilter === 'beginner' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <Atom className="h-4 w-4 mr-2" /> Beginner
              </button>
              <button 
                onClick={() => setActiveFilter('advanced')}
                className={`px-4 py-2 rounded-full flex items-center ${activeFilter === 'advanced' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                <Brain className="h-4 w-4 mr-2" /> Advanced
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
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Atom className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-purple-600">
                      {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration} weeks</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.studentsEnrolled.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="ml-1 text-gray-700">{course.rating}</span>
                    </div>
                    <span className="font-bold text-gray-900">${course.price}</span>
                  </div>
                  <button 
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                    onClick={() => handleCourseClick(course.id)}
                  >
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
    </div>
  );
};

export default CoursesPage;
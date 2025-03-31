import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Clock, Atom, Brain, ChevronDown, ChevronUp, BookOpen, HelpCircle, CheckCircle, ArrowLeft } from 'lucide-react';

// Use the same interfaces from CoursesPage
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
  id: number;
  title: string;
  category: string;
  instructor: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  description: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  modules?: CourseModule[];
  faqs?: CourseFAQ[];
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  // Mock data - in a real app, you'd fetch this from an API using the courseId
  const courses: Course[] = [
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
      description: "Explore the intersection of quantum mechanics and astrophysics with cutting-edge research and theories.",
      learningOutcomes: [
        "Understand quantum field theory in curved spacetime",
        "Analyze black hole thermodynamics and information paradox",
        "Apply quantum principles to cosmological models",
        "Develop research methodologies for theoretical astrophysics",
        "Model quantum effects in extreme gravitational environments"
      ],
      prerequisites: [
        "Bachelor's degree in Physics or related field",
        "Strong understanding of quantum mechanics",
        "Knowledge of general relativity",
        "Proficiency in advanced mathematics (calculus, linear algebra, differential equations)"
      ],
      modules: [
        {
          id: 1,
          title: "Foundations of Quantum Mechanics in Curved Spacetime",
          description: "Introduction to quantum field theory in curved spacetime and its implications for astrophysical phenomena",
          duration: "2 weeks",
          topics: [
            "Review of quantum field theory",
            "Quantum fields in curved spacetime",
            "The equivalence principle and quantum effects",
            "Path integral formulation in curved backgrounds",
            "Casimir effect in varying gravitational fields"
          ]
        },
        {
          id: 2,
          title: "Black Hole Quantum Mechanics",
          description: "Explore quantum properties of black holes, including Hawking radiation and information paradox",
          duration: "3 weeks",
          topics: [
            "Classical black hole thermodynamics",
            "Hawking radiation derivation and properties",
            "Black hole information paradox",
            "Holographic principle and AdS/CFT correspondence",
            "Recent developments in firewall paradox resolution"
          ]
        },
        // Additional modules omitted for brevity
      ],
      faqs: [
        {
          id: 1,
          question: "How much mathematics background do I need for this course?",
          answer: "This course requires proficiency in advanced mathematics, including differential geometry, complex analysis, and functional analysis. Familiarity with group theory and topology is also beneficial."
        },
        {
          id: 2,
          question: "Will this course involve computational work?",
          answer: "Yes, several modules include computational projects using Python and specialized physics libraries. Basic programming knowledge is expected, though tutorials will be provided."
        },
        // Additional FAQs omitted for brevity
      ]
    },
    // Additional courses would be defined here
  ];
  
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    if (courseId) {
      const foundCourse = courses.find(c => c.id.toString() === courseId);
      setCourse(foundCourse || null);
    }
  }, [courseId]);
  
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
          <Link to="/courses" className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Course Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link to="/courses" className="inline-flex items-center text-purple-200 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                course.category === "Astrophysics" ? "bg-purple-600" : "bg-blue-600"
              }`}>
                {course.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-purple-200 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium text-white">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                  {/* Replace with actual instructor image */}
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500"></div>
                </div>
                <div>
                  <p className="text-sm text-purple-200">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Enroll Now - ${course.price}
              </button>
            </div>
            
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{course.duration} of instruction</span>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{course.modules?.length || 0} modules</span>
                  </li>
                  <li className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{course.faqs?.length || 0} frequently asked questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-purple-600 text-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('syllabus')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'syllabus' 
                  ? 'border-b-2 border-purple-600 text-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Syllabus
            </button>
            <button 
              onClick={() => setActiveTab('faqs')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'faqs' 
                  ? 'border-b-2 border-purple-600 text-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQs
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">About this Course</h2>
              <p className="text-gray-700 mb-8">{course.description}</p>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites?.map((prerequisite, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                      </div>
                      <span>{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setActiveTab('syllabus')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  View Full Syllabus
                </button>
              </div>
            </div>
          )}
          
          {/* Syllabus Tab */}
          {activeTab === 'syllabus' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
              <p className="text-gray-700 mb-8">
                This course contains {course.modules?.length} modules covering all aspects of {course.title}.
              </p>
              
              <div className="space-y-6">
                {course.modules?.map((module, index) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.duration}</p>
                        </div>
                      </div>
                      {expandedModules.includes(module.id) ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </div>
                    
                    {expandedModules.includes(module.id) && (
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-gray-700 mb-4">{module.description}</p>
                        <h4 className="font-bold mb-2">Topics covered:</h4>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Enroll Now - ${course.price}
                </button>
              </div>
            </div>
          )}
          
          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {course.faqs?.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <h3 className="font-bold">{faq.question}</h3>
                      {expandedFaqs.includes(faq.id) ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </div>
                    
                    {expandedFaqs.includes(faq.id) && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Clock, Atom, Brain, ChevronDown, ChevronUp, BookOpen, HelpCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { fetchCourseDetail } from '../backendCalls/courseDetail';


interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface Topic {
  id: string;
  title: string;
  description?: string | null;
  duration?: string | null;
  order: number;
  content?: {
    subtopics?: string[];
    activities?: string[];
  };
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  topics: Topic[];
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
  faqs: FAQ[];
  syllabus: Module[];
}

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      fetchCourseDetail(courseId)
        .then((data) => {
          setCourse(data);
          setLoading(false);
        })
        .catch(() => {
          setCourse(null);
          setLoading(false);
        });
    }
  }, [courseId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(faqId) ? prev.filter((id) => id !== faqId) : [...prev, faqId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

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
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 bg-purple-600">
                {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              {course.subtitle && <p className="text-lg text-purple-200 mb-2">{course.subtitle}</p>}
              <p className="text-xl text-purple-200 mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium text-white">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{course.studentsEnrolled.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration} weeks</span>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                  {/* Instructor image or fallback */}
                  {course.instructorImage ? (
                    <img src={course.instructorImage} alt={course.instructorName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-purple-200">Instructor</p>
                  <p className="font-medium">{course.instructorName}</p>
                  {course.instructorTitle && <p className="text-xs text-purple-100">{course.instructorTitle}</p>}
                </div>
              </div>
              <div className='flex justify-start items-center gap-4'>
              <button disabled className="bg-blue-600 disabled:bg-gray-400 cursor-not-allowed hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Enroll Now {course.price > 0 ? `- $${course.price}` : ''}
              </button>
              <div className='bg-red-600 animate-pulse text-white px-8 py-3 rounded-lg font-medium transition-colors'>
                Upcoming
              </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{course.duration} weeks of instruction</span>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{course.syllabus?.length || 0} modules</span>
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
                This course contains {course.syllabus?.length || 0} modules covering all aspects of {course.title}.
              </p>
              <div className="space-y-6">
                {course.syllabus?.map((module, index) => (
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
                          {module.topics?.map((topic) => (
                            <li key={topic.id} className="mb-2">
                              <span className="font-semibold">{topic.title}</span>
                              {topic.description && <span className="ml-2 text-gray-600">- {topic.description}</span>}
                              {topic.content?.subtopics && (
                                <ul className="list-disc list-inside ml-6 mt-1">
                                  {topic.content.subtopics.map((sub, i) => (
                                    <li key={i}>{sub}</li>
                                  ))}
                                </ul>
                              )}
                              {topic.content?.activities && (
                                <ul className="list-disc list-inside ml-6 mt-1">
                                  {topic.content.activities.map((act, i) => (
                                    <li key={i}>{act}</li>
                                  ))}
                                </ul>
                              )}
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
                  Enroll Now {course.price > 0 ? `- $${course.price}` : ''}
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
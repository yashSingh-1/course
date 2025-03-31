import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Users, Clock, Atom, Brain, Database, ChevronDown, ChevronUp, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';

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
  // New fields for detailed view
  learningOutcomes?: string[];
  prerequisites?: string[];
  modules?: CourseModule[];
  faqs?: CourseFAQ[];
}

const CoursesPage = () => {
  const navigate = useNavigate();
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
  
  // Mock course data with additional fields
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
        {
          id: 3,
          title: "Quantum Cosmology",
          description: "Study quantum effects in the early universe and their observational signatures",
          duration: "2 weeks",
          topics: [
            "Wheeler-DeWitt equation and quantum cosmology",
            "Inflationary universe from quantum perspective",
            "Quantum origin of cosmic microwave background fluctuations",
            "String theory cosmology",
            "Loop quantum cosmology and bouncing universes"
          ]
        },
        {
          id: 4,
          title: "Quantum Gravity Approaches",
          description: "Compare different theoretical frameworks for quantum gravity and their astrophysical implications",
          duration: "3 weeks",
          topics: [
            "String theory and cosmological applications",
            "Loop quantum gravity in astrophysical contexts",
            "Causal set theory",
            "Asymptotic safety and renormalization",
            "Emergent gravity paradigms"
          ]
        },
        {
          id: 5,
          title: "Research Methods and Final Project",
          description: "Develop research skills and complete an original project in quantum astrophysics",
          duration: "2 weeks",
          topics: [
            "Research methodologies in theoretical physics",
            "Computational techniques for quantum simulations",
            "Scientific communication and paper writing",
            "Project development and mentorship",
            "Final presentation of research findings"
          ]
        }
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
        {
          id: 3,
          question: "Is this course purely theoretical or are there observational components?",
          answer: "While the course focuses on theoretical aspects, we do connect theories to observational evidence where possible, particularly in modules on black holes and cosmology."
        },
        {
          id: 4,
          question: "How is the final grade determined?",
          answer: "The grade consists of weekly problem sets (40%), two midterm exams (15% each), and a final research project (30%). Active participation in discussions is also considered."
        }
      ]
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
      description: "Master the latest techniques in neural networks and deep learning with hands-on projects and real-world applications.",
      learningOutcomes: [
        "Design and implement advanced neural network architectures",
        "Apply deep learning to complex problems across various domains",
        "Optimize neural networks for performance and efficiency",
        "Develop expertise in modern frameworks like PyTorch and TensorFlow",
        "Create production-ready deep learning solutions"
      ],
      prerequisites: [
        "Intermediate knowledge of Python programming",
        "Basic understanding of machine learning concepts",
        "Familiarity with linear algebra and calculus",
        "Experience with data analysis and preparation"
      ],
      modules: [
        {
          id: 1,
          title: "Advanced Neural Network Architectures",
          description: "Explore cutting-edge architectures beyond standard feedforward networks",
          duration: "2 weeks",
          topics: [
            "Residual networks and skip connections",
            "Attention mechanisms and transformers",
            "Graph neural networks",
            "Memory networks and neural Turing machines",
            "Neural architecture search"
          ]
        },
        {
          id: 2,
          title: "Deep Learning Optimization",
          description: "Master techniques for training deep networks efficiently and effectively",
          duration: "2 weeks",
          topics: [
            "Advanced gradient descent algorithms",
            "Regularization techniques",
            "Batch normalization and layer normalization",
            "Learning rate scheduling strategies",
            "Distributed training approaches"
          ]
        },
        {
          id: 3,
          title: "Computer Vision with Deep Learning",
          description: "Apply deep learning to state-of-the-art computer vision tasks",
          duration: "2 weeks",
          topics: [
            "Advanced convolutional architectures",
            "Object detection and instance segmentation",
            "3D computer vision and depth estimation",
            "Generative models for image synthesis",
            "Vision transformers and beyond CNNs"
          ]
        },
        {
          id: 4,
          title: "Natural Language Processing with Deep Learning",
          description: "Implement advanced NLP models using deep learning techniques",
          duration: "2 weeks",
          topics: [
            "Transformer architectures in depth",
            "BERT, GPT, and their derivatives",
            "Question answering and summarization",
            "Neural machine translation",
            "Multimodal learning with text and images"
          ]
        },
        {
          id: 5,
          title: "Deploying Deep Learning Systems",
          description: "Build production-ready deep learning applications",
          duration: "2 weeks",
          topics: [
            "Model compression and quantization",
            "Inference optimization",
            "Deployment to cloud, edge, and mobile",
            "Monitoring and maintaining deep learning systems",
            "Capstone project implementation"
          ]
        }
      ],
      faqs: [
        {
          id: 1,
          question: "What hardware is recommended for this course?",
          answer: "While cloud-based GPUs will be provided for assignments, having a CUDA-capable NVIDIA GPU with at least 8GB memory is recommended for smoother development. Alternatives include using Google Colab or other cloud providers."
        },
        {
          id: 2,
          question: "How programming-intensive is this course?",
          answer: "Very. You'll be writing code in nearly every lecture and assignment. Strong Python skills are essential, and you should be comfortable with PyTorch or TensorFlow before starting."
        },
        {
          id: 3,
          question: "Are there any group projects?",
          answer: "Yes, the final capstone project can be completed individually or in groups of up to 3 students. Group projects typically have higher expectations for scope and quality."
        },
        {
          id: 4,
          question: "How much math is involved?",
          answer: "This course involves substantial mathematical content, including calculus, linear algebra, probability theory, and optimization. While derivations will be explained, familiarity with these areas is important for success."
        }
      ]
    },
    // Simplified versions for other courses (can be expanded as needed)
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

  // Handle click on a course card
  const handleCourseClick = (courseId: number) => {
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
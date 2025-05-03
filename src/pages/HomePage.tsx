import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  BookOpen,
  Brain,
  Atom,
} from "lucide-react";
import { fetchCourses } from "../backendCalls/courses";

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

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setLoading(false);
      });
  }, []);

  // Function to handle course card clicks
  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Space background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-purple-500">Explore</span> the Universe{" "}
                <br />
                <span className="text-purple-500">Master</span> Technology
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Advanced courses in Astrophysics and Machine Learning taught by
                world-class experts. Expand your knowledge and unlock new career
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                >
                  Explore Courses <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <Link
                to="/events"
                className="inline-block mt-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-semibold"
              >
                View Hackathons & Events 🚀
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute inset-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Neural network visualization"
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses designed to take your knowledge
              to the next level
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading...</div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500" />
                        <span className="ml-1 text-gray-700">{course.rating}</span>
                        <span className="ml-1 text-gray-500">
                          ({course.studentsEnrolled})
                  </span>
                </div>
                      <span className="font-bold text-gray-900">
                        {course.price > 0 ? `$${course.price}` : "Free"}
                  </span>
                </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to={`/courses`}
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors"
            >
              View All Courses <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Propagation Academy
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              We combine cutting-edge research with practical applications to
              provide you with the best educational experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-purple-200">
                Learn from world-renowned scientists and researchers at the
                forefront of their fields.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Cutting-Edge Curriculum
              </h3>
              <p className="text-purple-200">
                Our courses are regularly updated to include the latest
                discoveries and technological advancements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Access</h3>
              <p className="text-purple-200">
                Join a global community of like-minded learners and
                professionals in your field.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hands-On Projects</h3>
              <p className="text-purple-200">
                Apply your knowledge through practical projects using
                industry-standard tools and techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our students who have transformed their careers through
              our courses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1598346762291-aee88549193f?ixlib=rb-4.0.3"
                  alt="Priya Sharma"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-gray-600 text-sm">
                    ML Engineer at Google
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The Computer Vision course helped me transition from backend to ML. The PyTorch projects and real-world assignments were exactly what I needed for my portfolio. Landed my dream role within months."
              </p>
              <div className="flex text-yellow-500">
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3"
                  alt="David Kim"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">David Kim</h4>
                  <p className="text-gray-600 text-sm">
                    Data Scientist at Amazon
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The NLP specialization exceeded my expectations. From basic concepts to advanced transformers, everything was explained clearly. The capstone project became a key talking point in my interviews."
              </p>
              <div className="flex text-yellow-500">
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3"
                  alt="Rajesh Venkataraman"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Rajesh Venkataraman</h4>
                  <p className="text-gray-600 text-sm">
                    AI Lead at Microsoft
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The Advanced AI course struck the perfect balance between theory and practice. The hands-on labs and expert sessions were invaluable for my career growth."
              </p>
              <div className="flex text-yellow-500">
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
                <Star className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Expand Your Knowledge?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of students who are already advancing their
                careers with our cutting-edge courses in Astrophysics and
                Machine Learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                >
                  Browse Courses
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                alt="Space exploration"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


import { Award, BookOpen, Users, Brain, Atom, Star, ArrowRight } from 'lucide-react';
import jituImage from '../assets/jitu.jpeg';
import yashImage from '../assets/yash.jpeg';

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Jitendra Yadav",
      role: "Physics & Student Scientist at Esro",
      image: jituImage,
      bio: "A citizen scientist and space educator committed to making science accessible. With a background in physics and a passion for cosmology, I design learning experiences that ignite curiosity and empower the next generation of explorers."
    },
    {
      name: "Yash Raj Singh",
      role: "AI & ML Engineer at AmplifyXLabs",
      image: yashImage,
      bio: "Skilled AI and Machine Learning engineer at AmplifyXLabs, focusing on developing cutting-edge AI solutions and applications."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Propagation</h1>
              <p className="text-xl text-gray-300 mb-6">
                We're on a mission to make advanced education in Astrophysics and Machine Learning accessible to passionate learners worldwide.
              </p>
              {/* <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10,000+</p>
                    <p className="text-gray-400">Students</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">25+</p>
                    <p className="text-gray-400">Courses</p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Space telescope" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <img 
                  src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" 
                  alt="Space" 
                  className="rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Propagation was founded in 2025 by two passionate students - Jitendra Yadav, a physicist at Esro, and Yash Raj Singh, an AI/ML engineer at AmplifyXLabs. After experiencing firsthand the gap between traditional education and industry demands, they decided to create the platform they wished they had during their learning journey.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a shared vision has evolved into a comprehensive learning platform that combines theoretical foundations with practical industry experience. Our courses bridge the gap between academic knowledge and real-world applications in Physics and Machine Learning.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is simple: provide high-quality, advanced technical education that we ourselves would want to learn from. We focus on cutting-edge topics in Physics and AI/ML, designed for learners who want to go beyond the basics and develop industry-relevant skills.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Atom className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Industry-Driven Content</h3>
                    <p className="text-gray-600">Courses designed from real-world experience and current industry practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Practical Excellence</h3>
                    <p className="text-gray-600">Focus on hands-on projects and real-world problem solving that actually matters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              The principles that guide everything we do at Propagation Academy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-purple-200">
                We are committed to providing the highest quality education, pushing the boundaries of what's possible in online learning.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-purple-200">
                We foster a collaborative environment where students and instructors can connect, share ideas, and grow together.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-purple-200">
                We embrace cutting-edge research and technologies, constantly evolving our curriculum to stay at the forefront of scientific advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Instructors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from world-renowned scientists and researchers at the forefront of their fields
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-purple-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
              <p className="text-gray-700 mb-8">
                Since our founding, we've helped students advance their careers and contribute to groundbreaking research in their fields.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Educational Excellence</h3>
                    <p className="text-gray-600">Recognized for innovation in specialized online education</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">74+ Graduates</h3>
                    <p className="text-gray-600">Working at leading research institutions and tech companies</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">12+ Research Publications</h3>
                    <p className="text-gray-600">Contributed to by our instructors and students</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" 
                alt="Team member" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Students collaborating" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Instructor" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Award ceremony" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community of Learners</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Take the next step in your educational journey with Propagation Academy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/courses" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
              Browse Courses <ArrowRight size={18} className="ml-2" />
            </a>
            <a href="/contact" className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
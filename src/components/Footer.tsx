import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">Propagation</span>
            </div>
            <p className="text-gray-400 mb-4">
              Expanding minds through advanced education in Astrophysics and Machine Learning.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a> */}
              <a href="https://x.com/Propagationn" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/propagation.in/?hl=en" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/propagationconnect/" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>
          
          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-gray-400 hover:text-white transition-colors">Comprehensive Astronomy Program</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-white transition-colors">AI & Machine Learning</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-white transition-colors">Asteroid Hunting with IASC</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Neural Networks</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Deep Learning Applications</a></li> */}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">NIMS, Jaipur, Rajasthan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Twitter size={20} className="text-purple-500 flex-shrink-0" />
                <a href="https://x.com/Propagationn" target='_blank' className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-gray-400">Propagation</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-purple-500 flex-shrink-0" />
                <a href="mailto:propagation.connect@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <span className="text-gray-400">propagation.connect@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Propagation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
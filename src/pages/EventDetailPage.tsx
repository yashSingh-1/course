import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, HelpCircle, CheckCircle, ChevronUp } from 'lucide-react';
import { fetchEventById } from '../backendCalls/fetchEvents';
import { RegistrationForm } from '../components/RegistrationForm';
import { useCurrentUser } from "../lib/currentUser";
import { useClerk } from "@clerk/clerk-react";

interface EventResource {
  title: string;
  url: string;
  description: string;
}

interface EventModule {
  title: string;
  description: string;
}

interface EventFAQ {
  question: string;
  answer: string;
}

interface EventDetails {
  fullDescription: string;
  schedule: any[];
  requirements: string[];
  prerequisites: string[];
  outcomes: string[];
  techStack: string[];
  tools: string[];
  resources: EventResource[];
  registrationUrl: string | null;
  prizes: any;
  modules: EventModule[];
  instructor: any;
  faqs: EventFAQ[];
  guidelines: string[];
  contactEmail: string;
  contactPhone: string | null;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  additionalUrls: any;
}

interface Event {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  thumbnail: string;
  shortDesc: string;
  location: string;
  organizer: string;
  price: number | null;
  capacity: number | null;
  createdAt: string;
  updatedAt: string;
  details: EventDetails;
}

interface User {
  id: string;
  email: string;
}

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'faqs'>('overview');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  const currentUser = useCurrentUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    if (eventId) {
      setLoading(true);
      fetchEventById(eventId)
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [eventId]);

  useEffect(() => {
    if (!currentUser) { 
      navigate("/");
    }
    setUser({
      id: currentUser.id,
      email: currentUser.email,
    });
  }, [currentUser.isLoaded]);

  const toggleFaq = (faqIdx: number) => {
    setExpandedFaqs((prev) =>
      prev.includes(faqIdx) ? prev.filter((i) => i !== faqIdx) : [...prev, faqIdx]
    );
  };

  const handleRegisterClick = () => {
    openSignIn({
      redirectUrl: `https://propogation.co.in${window.location.pathname}${window.location.search}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Event not found</h2>
          <Link to="/events" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // Helper for date formatting
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Event Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link to="/events" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 bg-blue-600">
                {event.type}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-blue-200 mb-6">{event.shortDesc}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {formatDate(event.startDate)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                  {/* Placeholder for organizer logo */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Organized by</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
              </div>
              
              <button
                onClick={handleRegisterClick}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
              >
                Register Now
              </button>
            </div>
            
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={event.thumbnail} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Event Details:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">
                      {formatDate(event.startDate)}
                      {event.endDate && ` - ${formatDate(event.endDate)}`}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{event.location}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">Registration required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('modules')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'modules' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Event Schedule & Process
            </button>
            <button 
              onClick={() => setActiveTab('faqs')}
              className={`px-8 py-4 font-medium ${
                activeTab === 'faqs' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
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
              <h2 className="text-2xl font-bold mb-6">About this Event</h2>
              <p className="text-gray-700 mb-8 text-lg">{event.details?.fullDescription}</p>
            </div>
          )}
          
          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Event Schedule & Process</h2>
              <div className="space-y-8">
                {event.details?.modules?.map((module, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6 bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                          {idx + 1}
                        </div>
                        <h3 className="text-xl font-bold">{module.title}</h3>
                      </div>
                      <p className="mt-3 text-gray-700">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleRegisterClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                >
                  Register Now
                </button>
              </div>
            </div>
          )}
          
          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              {event.details?.faqs && event.details.faqs.length > 0 ? (
                <div className="space-y-4">
                  {event.details.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleFaq(idx)}
                      >
                        <h3 className="font-bold">{faq.question}</h3>
                        {expandedFaqs.includes(idx) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      
                      {expandedFaqs.includes(idx) && (
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No FAQs Available</h3>
                  <p className="text-gray-500">
                    If you have any questions about this event, please contact the organizers directly.
                  </p>
                </div>
              )}
              
              <div className="text-center mt-12">
                <p className="text-gray-700 mb-4">Still have questions?</p>
                <a 
                  href={`mailto:${event.details?.contactEmail || 'info@example.com'}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact the event organizers
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl md:w-3/5 max-h-[80vh] overflow-y-auto relative mx-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => {
                setShowRegisterModal(false);
                setRegisterSuccess(null);
                setRegisterError(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6">Event Registration</h2>
            {registerSuccess ? (
              <div className="text-green-600 font-semibold text-center mb-4">{registerSuccess}</div>
            ) : (
              user?.email && user?.id && (
                <RegistrationForm
                  email={user.email}
                  id={user.id}
                  eventId={event.id}
                  onSuccess={(msg: string) => setRegisterSuccess(msg)}
                  onError={(msg: string) => setRegisterError(msg)}
                loading={registerLoading}
                setLoading={setRegisterLoading}
                />
              )
            )}
            {registerError && <div className="text-red-600 text-center mt-2">{registerError}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage; 
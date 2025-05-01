import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { fetchEvents } from '../backendCalls/fetchEvents';

interface HackathonModule {
  id: number;
  title: string;
  description: string;
  steps: string[];
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface Hackathon {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  registrationLink: string;
  imageUrl: string;
  category: string;
  organizer: string;
  participants: number;
  duration: string;
  modules: HackathonModule[];
  faqs: FAQ[];
}

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  shortDesc: string;
  thumbnail: string;
  organizer: string;
}

const Events: React.FC = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle navigation to event detail page
  const navigateToEventDetail = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Upcoming Events
      </h1>
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-20">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-gray-600">
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-gray-600">{event.location}</p>
                </div>
                <p className="text-gray-700 mb-4">{event.shortDesc}</p>
                <button
                  onClick={() => navigateToEventDetail(event.id)}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Event Modal */}
      {selectedHackathon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-auto max-w-4xl w-full max-h-[90vh]">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-800">{selectedHackathon.title}</h2>
                <button 
                  onClick={() => setSelectedHackathon(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="my-4">
                <img 
                  src={selectedHackathon.imageUrl} 
                  alt={selectedHackathon.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <p className="text-gray-600 flex items-center">
                  <span className="mr-2">📅</span> {selectedHackathon.date}
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="mr-2">📍</span> {selectedHackathon.location}
                </p>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg">{selectedHackathon.description}</p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Registration Process & Event Details</h3>
              
              <div className="space-y-8">
                {selectedHackathon.modules.map((module) => (
                  <div key={module.id} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h4>
                    <p className="text-gray-700 mb-4">{module.description}</p>
                    <ul className="list-disc pl-6 space-y-2">
                      {module.steps.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href={selectedHackathon.registrationLink} 
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proceed to Registration
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
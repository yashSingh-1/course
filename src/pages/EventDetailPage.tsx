import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink, HelpCircle, CheckCircle, ChevronUp } from 'lucide-react';

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

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Hackathon | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'faqs'>('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  // Mock data - in a real app, you'd fetch this from an API using the eventId
  const hackathons: Hackathon[] = [
    {
      id: 1,
      title: "EcoHacks 2024",
      date: "June 15-16, 2024",
      location: "Virtual",
      description: "A 48-hour hackathon focused on developing sustainable solutions for environmental challenges.",
      registrationLink: "#",
      imageUrl: "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Environmental",
      organizer: "EcoTech Foundation",
      participants: 1500,
      duration: "48 hours",
      modules: [
        {
          id: 1,
          title: "Registration & Team Formation",
          description: "Steps to register and form your team for the hackathon",
          steps: [
            "Create an account on our platform",
            "Complete your profile with required information",
            "Join as an individual or create a team (2-5 members)",
            "Submit your team's preliminary idea"
          ]
        },
        {
          id: 2,
          title: "Pre-Hackathon Workshops",
          description: "Preparatory sessions to equip you with necessary skills",
          steps: [
            "Attend 'Sustainable Tech 101' workshop (June 10)",
            "Join 'Design Thinking for Climate Solutions' session (June 12)",
            "Participate in 'Technical Stack Overview' (June 14)"
          ]
        },
        {
          id: 3,
          title: "Hackathon Timeline",
          description: "Schedule for the main hackathon event",
          steps: [
            "Kickoff and theme announcement (June 15, 9:00 AM)",
            "Ideation phase (June 15, 10:00 AM - 2:00 PM)",
            "Development sprint (June 15, 2:00 PM - June 16, 12:00 PM)",
            "Project submissions (June 16, 12:00 PM)",
            "Presentations and judging (June 16, 2:00 PM - 5:00 PM)",
            "Awards ceremony (June 16, 6:00 PM)"
          ]
        }
      ],
      faqs: [
        {
          id: 1,
          question: "Do I need to have prior experience with environmental technologies?",
          answer: "No, participants of all experience levels are welcome. We'll provide resources and mentorship to help you succeed."
        },
        {
          id: 2,
          question: "What kind of projects can I work on?",
          answer: "Any technology solution addressing environmental challenges, including climate change, pollution, conservation, sustainable agriculture, renewable energy, and more."
        },
        {
          id: 3,
          question: "Can I participate as an individual?",
          answer: "Yes, you can participate individually or as a team of up to 5 members. We also offer team matching services for those looking to join forces with others."
        },
        {
          id: 4,
          question: "What platforms or technologies should I use?",
          answer: "You're free to use any technology stack that best suits your project. We encourage innovation and creativity in your technical approach."
        }
      ]
    },
    {
      id: 2,
      title: "GreenTech Innovation",
      date: "July 20-21, 2024",
      location: "San Francisco, CA",
      description: "Build innovative solutions for climate change and sustainability.",
      registrationLink: "#",
      imageUrl: "https://placehold.co/600x400/4682B4/FFFFFF?text=GreenTech+Innovation",
      category: "Environmental",
      organizer: "GreenTech Foundation",
      participants: 1200,
      duration: "48 hours",
      modules: [
        {
          id: 1,
          title: "Application Process",
          description: "Steps to apply for this selective hackathon",
          steps: [
            "Submit your resume and portfolio",
            "Provide a brief proposal of your project idea",
            "Complete a technical assessment",
            "Interview with the organizing committee (if shortlisted)"
          ]
        },
        {
          id: 2,
          title: "Pre-Event Resources",
          description: "Resources to prepare for the hackathon",
          steps: [
            "Access to sustainable technology research papers",
            "GreenTech API documentation and sandbox environments",
            "Mentorship matching with industry experts",
            "Environmental data sets and visualization tools"
          ]
        },
        {
          id: 3,
          title: "On-Site Schedule",
          description: "Agenda for the in-person hackathon",
          steps: [
            "Check-in and networking breakfast (July 20, 8:00 AM)",
            "Opening keynote and challenge presentation (July 20, 9:30 AM)",
            "Hacking period with scheduled breaks (July 20, 11:00 AM - July 21, 2:00 PM)",
            "Final submissions and deployment (July 21, 2:00 PM)",
            "Demo session and judging (July 21, 3:30 PM - 6:00 PM)",
            "Awards and closing reception (July 21, 7:00 PM)"
          ]
        }
      ],
      faqs: []
    },
    {
      id: 3,
      title: "Sustainable Future Hackathon",
      date: "August 5-6, 2024",
      location: "Hybrid",
      description: "Create solutions for renewable energy and sustainable living.",
      registrationLink: "#",
      imageUrl: "https://placehold.co/600x400/2E8B57/FFFFFF?text=Sustainable+Future",
      category: "Environmental",
      organizer: "Sustainable Future Foundation",
      participants: 1000,
      duration: "48 hours",
      modules: [
        {
          id: 1,
          title: "Registration & Onboarding",
          description: "Get started with the hackathon",
          steps: [
            "Register through the official website",
            "Select your participation mode (in-person or virtual)",
            "Complete team registration (1-4 members)",
            "Attend mandatory orientation session (August 1)"
          ]
        },
        {
          id: 2,
          title: "Challenge Tracks",
          description: "Choose your focus area",
          steps: [
            "Renewable Energy Solutions",
            "Sustainable Urban Planning",
            "Circular Economy Innovations",
            "Climate Change Mitigation",
            "Select your track during registration"
          ]
        },
        {
          id: 3,
          title: "Event Structure",
          description: "How the hackathon will unfold",
          steps: [
            "Opening ceremony and track presentations (August 5, 10:00 AM)",
            "Team strategy session with mentors (August 5, 11:30 AM)",
            "Development period (August 5, 1:00 PM - August 6, 12:00 PM)",
            "Submission deadline (August 6, 12:00 PM)",
            "Pitch preparation workshop (August 6, 12:30 PM)",
            "Final presentations (August 6, 2:00 PM - 4:00 PM)",
            "Judging and awards (August 6, 5:00 PM)"
          ]
        }
      ],
      faqs: []
    }
  ];
  
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    if (eventId) {
      const foundEvent = hackathons.find(h => h.id.toString() === eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId]);
  
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
                {event.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-blue-200 mb-6">{event.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.participants.toLocaleString()} participants</span>
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
              
              <a 
                href={event.registrationLink}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
            
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Event Details:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{event.date}</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{event.location}</span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <span className="text-gray-700">{event.duration}</span>
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
              <h2 className="text-2xl font-bold mb-6">About this Hackathon</h2>
              <p className="text-gray-700 mb-8 text-lg">{event.description}</p>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Learning Experience</h4>
                    <p className="text-gray-700">Gain hands-on experience with cutting-edge technologies and learn from industry experts throughout the event.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Networking Opportunities</h4>
                    <p className="text-gray-700">Connect with like-minded innovators, mentors, and sponsors who share your passion for sustainability.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Prizes & Recognition</h4>
                    <p className="text-gray-700">Compete for valuable prizes and gain recognition for your innovative solutions to environmental challenges.</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">Post-Event Support</h4>
                    <p className="text-gray-700">Top projects will receive continued support through incubation programs, mentorship, and funding opportunities.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setActiveTab('modules')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  View Event Schedule & Process
                </button>
              </div>
            </div>
          )}
          
          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Event Schedule & Process</h2>
              <p className="text-gray-700 mb-8">
                This hackathon includes {event.modules.length} key phases. Follow each stage carefully to maximize your experience.
              </p>
              
              <div className="space-y-8">
                {event.modules.map((module, index) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6 bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold">{module.title}</h3>
                      </div>
                      <p className="mt-3 text-gray-700">{module.description}</p>
                    </div>
                    
                    <div className="p-6 border-t border-gray-200">
                      <h4 className="font-bold mb-3">Key Steps:</h4>
                      <ul className="space-y-2">
                        {module.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <a 
                  href={event.registrationLink}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          )}
          
          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              {event.faqs && event.faqs.length > 0 ? (
                <div className="space-y-4">
                  {event.faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <h3 className="font-bold">{faq.question}</h3>
                        {expandedFaqs.includes(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      
                      {expandedFaqs.includes(faq.id) && (
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
                  href="mailto:info@example.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact the event organizers
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 
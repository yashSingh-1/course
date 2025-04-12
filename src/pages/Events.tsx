import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

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

const Events: React.FC = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'faqs'>('overview');
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
  
  const navigate = useNavigate();
  
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
          answer: "You're free to use any technology stack that best suits your project. We encourage"
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

  // Handle navigation to event detail page
  const navigateToEventDetail = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Upcoming Hackathons
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200">
            <img 
              src={hackathon.imageUrl} 
              alt={hackathon.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{hackathon.title}</h2>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-600">{hackathon.date}</p>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-gray-600">{hackathon.location}</p>
              </div>
              <p className="text-gray-700 mb-4">{hackathon.description}</p>
              <button
                onClick={() => navigateToEventDetail(hackathon.id)}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

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
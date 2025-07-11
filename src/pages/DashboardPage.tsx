import { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, BarChart2, Calendar, Settings, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getUserRegistrations, UserRegistrations, type CourseRegistration, type EventRegistration } from '@/lib/beCalls/userRegistrations';
import { Link } from 'react-router-dom';
import PremiumCertificate from '@/components/PremiumCertificate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

type ContinueLearningItem = (CourseRegistration & { _type: 'course' }) | (EventRegistration & { _type: 'event' });

const ALLOWED_EMAILS = [
  "adithyas27072001@gmail.com",
  "astronmer07@gmail.com",
  "Am.shiats@gmail.com",
  "mamidalarekha994@gmail.com",
  "aasha2004asha@gmail.com",
  "adhithyasumesh2003@gmail.com",
  "bhattacharyapiyas0018@gmail.com",
  "dharshikclt@gmail.com",
  "goel.tejas46@gmail.com",
  "dipak15pal@gmail.com",
  "prachiguptaa18@gmail.com",
  "raidamini107@gmail.com",
  "yogsingh996@gmail.com",
  "komalmehta133@gmail.com",
  "ayaansinghal2805@gmail.com",
  "scratch2805@gmail.com",
  "miradilraja@gmail.com",
  "priyashidutta10@gmail.com",
  "reshmacs.rcs@gmail.com",
  "jasnaa2002@gmail.com",
  "sd4752368@gmail.com",
  "sirius06200306@gmail.com",
  "arindamisro1@gmail.com",
  "paviniaf@gmail.com",
  "ppsouvikpg762@gmail.com",
  "shirkea445@gmail.com",
  "rizanar23@gmail.com",
  "indhumathi7471@gmail.com",
  "tusarnaik2024@gmail.com",
  "yogeshmalviya369@gmail.com",
  "Sumukhkumar8@gmail.com",
  "talib.mirza.mtb@gmail.com",
  "shivamsingh28699@gmail.com",
  "shabanajara18@gmail.com",
  "gunjanverma1508@gmail.com",
  "www.aryan9545@gmail.com",
  "deeya.pokhriyal@gmail.com",
  "lifehaschallengez@gmail.com",
  "aerox.org@gmail.com",
  "jainastrobee@gmail.com",
  "tsk2317563@yahoo.com",
  "mohdaltaf.aftab786@gmail.com",
  "simran999598@gmail.com",
  "ghoshurbi238@gmail.com",
  "jitenjitu1729@gmail.com"
];

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<UserRegistrations>({
    courses: [],
    events: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const data = await getUserRegistrations(user.id);
          console.log('Fetched registrations:', data);
          setRegistrations({
            courses: data?.courses || [],
            events: data?.events || []
          });
        } catch (error) {
          console.error('Error fetching registrations:', error);
          setRegistrations({ courses: [], events: [] });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRegistrations();
  }, [user?.id]);

  const continueLearningItems: ContinueLearningItem[] = [
    ...registrations.courses.map(course => ({ ...course, _type: 'course' as const })),
    ...registrations.events.map(event => ({ ...event, _type: 'event' as const })),
  ];

  const filteredContinueLearningItems = continueLearningItems.filter(item => {
    const text = item._type === 'event'
      ? `${item.event.title} ${item.event.shortDesc} ${item.event.location}`
      : `${item.courseName} ${item.category}`;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleDownloadCertificate = async () => {
    const certElem = document.getElementById('certificate-content');
    if (!certElem) return;
    const canvas = await html2canvas(certElem, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  };

  const generatePersonalizedPDF = async (user: { name: string; email: string }) => {
    // Fetch the template PDF
    const templateBytes = await fetch('/certificate/template.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    // Load a standard font
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Draw the name centered over the wiggling pen structure
    const name = user.name;
    const fontSize = 36;
    const textWidth = font.widthOfTextAtSize(name, fontSize);
    const x = 421.1 - textWidth / 2;
    const y = 380;
    page.drawText(name, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.1, 0.2, 0.5),
    });

    // Save and trigger download
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'personalized-certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
              <p className="text-purple-200">Welcome back,
                 <span className='font-bold mx-1'>
                  {user.email}
                  </span> Continue your learning journey.</p>
                 
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 border-2 border-purple-500 rounded-full px-4 py-2">
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'overview' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('continue-learning')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'continue-learning' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Continue Learning</span>
                </button>
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'calendar' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </button>
                <button 
                disabled
                  onClick={() => setActiveTab('settings')}
                  className={`w-full cursor-not-allowed flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('certificate')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'certificate' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Award className="h-5 w-5" />
                  <span>Certificate</span>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, lessons, or resources..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'certificate' && (
              <>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl shadow-lg px-8 py-10 max-w-xl w-full flex flex-col items-center">
                    <div className="flex items-center mb-3">
                      <Award className="w-8 h-8 text-purple-600 mr-2" />
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent" style={{ letterSpacing: '0.01em' }}>
                        {user.name}
                      </span>
                    </div>
                    <div className="text-lg text-gray-700 font-semibold mb-2 text-center">
                      Certificate for participation in <span className="text-purple-700 font-bold">Workshop of Citizen Science Projects</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-6 text-center">
                      Download your official certificate recognizing your valuable participation and contribution.
                    </div>
                      <button
                        onClick={() => generatePersonalizedPDF(user)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                      >
                        <span className="inline-flex items-center"><Award className="w-5 h-5 mr-2" /> Download your certificate</span>
                      </button>
                    <div className="mt-8 text-xs text-gray-500 text-center">
                      If your name is not right, dispute it and please email us at <a href="mailto:propagation.connect@gmail.com" className="underline text-purple-700">propagation.connect@gmail.com</a>.
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                        <p className="text-2xl font-bold text-gray-900">{registrations.courses.length}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Registered Events</p>
                        <p className="text-2xl font-bold text-gray-900">{registrations.events.length}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                        <p className="text-2xl font-bold text-gray-900">24</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  {continueLearningItems.length > 0 ? (
                    <div className="space-y-4">
                      {continueLearningItems.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={item._type === 'event' ? item.event.thumbnail : item.courseImage}
                            alt={item._type === 'event' ? item.event.title : item.courseName}
                            className="h-12 w-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item._type === 'event' ? item.event.title : item.courseName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item._type === 'event' ? item.event.shortDesc : item.category}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {item._type === 'event' ? 'Event' : 'Course'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'continue-learning' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
                  {filteredContinueLearningItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredContinueLearningItems.map(item => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                        >
                          <img
                            src={item._type === 'event' ? item.event.thumbnail : item.courseImage}
                            alt={item._type === 'event' ? item.event.title : item.courseName}
                            className="h-40 w-full object-cover"
                          />
                          <div className="p-4 flex-1 flex flex-col">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {item._type === 'event' ? item.event.title : item.courseName}
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 flex-1">
                              {item._type === 'event' ? item.event.shortDesc : item.category}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                {item._type === 'event' ? 'Event' : 'Course'}
                              </span>
                              <Link
                                to={item._type === 'event' ? `/events/${item.event.id}` : `/courses/${item.id}`}
                                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                              >
                                Continue →
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No courses or events yet</h3>
                      <p className="text-gray-500 mb-6">Start your learning journey by enrolling in courses or registering for events.</p>
                      <div className="space-x-4">
                        <Link
                          to="/courses"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                        >
                          Browse Courses
                        </Link>
                        <Link
                          to="/events"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View Events
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events & Courses</h3>
                  {(() => {
                    const upcomingEvents = registrations.events
                      .filter(event => new Date(event.event.endDate) > new Date())
                      .map(event => ({ ...event, _type: 'event' as const }));

                    const enrolledCourses = registrations.courses
                      .map(course => ({ ...course, _type: 'course' as const }));

                    const calendarItems = [...upcomingEvents, ...enrolledCourses];

                    return calendarItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {calendarItems.map(item => (
                          <div
                            key={item.id}
                            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                          >
                            <img
                              src={item._type === 'event' ? item.event.thumbnail : item.courseImage}
                              alt={item._type === 'event' ? item.event.title : item.courseName}
                              className="h-40 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {item._type === 'event' ? item.event.title : item.courseName}
                              </h4>
                              <p className="text-sm text-gray-600 mb-4 flex-1">
                                {item._type === 'event' ? item.event.shortDesc : item.category}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                  {item._type === 'event' ? 'Event' : 'Course'}
                                </span>
                                <Link
                                  to={item._type === 'event' ? `/events/${item.event.id}` : `/courses/${item.id}`}
                                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                  View Details →
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
                        <p className="text-gray-500 mb-6">Register for events or enroll in courses to see them here.</p>
                        <Link
                          to="/events"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                        >
                          Browse Events
                        </Link>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
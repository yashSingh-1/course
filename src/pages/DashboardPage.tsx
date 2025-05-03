import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, BarChart2, Calendar, Settings, LogOut, Bell, Search, Play, CheckCircle } from 'lucide-react';
import { SignedIn, useClerk, UserButton } from '@clerk/clerk-react';
import { useCurrentUser } from '@/lib/currentUser';
import { getUserRegistrations, UserRegistrations, type CourseRegistration, type EventRegistration } from '@/lib/beCalls/userRegistrations';
import { Link } from 'react-router-dom';

type ContinueLearningItem = (CourseRegistration & { _type: 'course' }) | (EventRegistration & { _type: 'event' });

const DashboardPage = () => {
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<UserRegistrations>({
    courses: [],
    events: []
  });
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (user.id) {
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
  }, [user.id]);

  // Combine courses and events into a single array with a type tag
  const continueLearningItems: ContinueLearningItem[] = [
    ...registrations.courses.map(course => ({ ...course, _type: 'course' as const })),
    ...registrations.events.map(event => ({ ...event, _type: 'event' as const })),
  ];

  const filteredContinueLearningItems = continueLearningItems.filter(item => {
    const text = item._type === 'event'
      ? `${item.title} ${item.shortDesc} ${item.location}`
      : `${item.courseName} ${item.category}`;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // const calendarItems = [
  //   ...registrations.events.map(event => ({ ...event, _type: 'event' as const })),
  //   ...registrations.courses.map(course => ({ ...course, _type: 'course' as const })),
  // ];

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
              <div className="flex items-center space-x-2 border-2 border-purple-500 rounded-full ">
              <SignedIn>
                  <UserButton />
                 </SignedIn>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'overview' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button 
                disabled
                  onClick={() => setActiveTab('courses')}
                  className={`w-full cursor-not-allowed flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'courses' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>My Courses</span>
                </button>
                <button 
                disabled
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full cursor-not-allowed flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'calendar' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </button>
                <button 
                disabled
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full cursor-not-allowed flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'achievements' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </button>
                <button 
                disabled
                  onClick={() => setActiveTab('settings')}
                  className={`w-full cursor-not-allowed flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50" onClick={ async () => {
                  await signOut();
                }}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search Bar */}
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

            {activeTab === 'overview' && (
              <>
                {/* Progress Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-500">Courses Enrolled</h3>
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    {loading ? (
                      <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
                    ) : (
                      <>
                        <p className="text-3xl font-bold">{registrations?.courses?.length}</p>
                        <p className="text-sm text-gray-500 mt-2">Enrolled Courses</p>
                      </>
                    )}
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-500">Hours Studied</h3>
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-500">Achievements</h3>
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-gray-500 mt-2">0 earned this month</p>
                  </div>
                </div>

                {/* Continue Learning */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="text-xl font-bold">Continue Learning</h2>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {registrations.courses.length} Course{registrations.courses.length !== 1 ? 's' : ''} Enrolled
                      </span>
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {registrations.events.length} Event{registrations.events.length !== 1 ? 's' : ''} Registered
                      </span>
                    </div>
                  </div>
                  {loading ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex space-x-4">
                          <div className="w-48 h-32 bg-gray-200 rounded"></div>
                          <div className="flex-1 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredContinueLearningItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredContinueLearningItems.map((item, index) => (
                        <Link to={`/events/${item.id}`} key={index}>
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                        >
                          <img
                            src={item._type === 'event' ? item.thumbnail : item.courseImage}
                            alt={item._type === 'event' ? item.title : item.courseName}
                            className="h-40 w-full object-cover"
                          />
                          <div className="p-4 flex-1 flex flex-col">
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 w-fit
                              ${item._type === 'event' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {item._type === 'event' ? 'Event' : 'Course'}
                            </span>
                            <h3 className="text-lg font-bold mb-2">{item._type === 'event' ? item.title : item.courseName}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-1">{item._type === 'event' ? item.shortDesc : item.category}</p>
                          </div>
                        </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No events or courses match your search.
                    </div>
                  )}
                </div>

                {/* Upcoming Events */}
                {/* <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex space-x-4">
                          <div className="h-12 w-12 bg-gray-200 rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (() => {
                    const upcomingEvents = registrations.events.filter(
                      event => new Date(event.endDate) > new Date()
                    );
                    return upcomingEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents.map((event, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                          >
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="h-40 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                              <span className="inline-block px-2 py-1 text-xs font-bold rounded mb-2 w-fit bg-blue-100 text-blue-700">
                                Event
                              </span>
                              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                              <p className="text-gray-600 text-sm mb-2">{event.shortDesc}</p>
                              <div className="text-xs text-gray-500 mt-auto">
                                <span>
                                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                                </span>
                                <span className="ml-2">{event.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No upcoming events
                      </div>
                    );
                  })()}
                </div> */}
              </>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">My Courses</h2>
                {loading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex space-x-4">
                        <div className="w-48 h-32 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : registrations?.courses?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registrations.courses.map((course, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                      >
                        <img
                          src={course.courseImage}
                          alt={course.courseName}
                          className="h-40 w-full object-cover"
                        />
                        <div className="p-4 flex-1 flex flex-col">
                          <span className="inline-block px-2 py-1 text-xs font-bold rounded mb-2 w-fit bg-green-100 text-green-700">
                            Course
                          </span>
                          <h3 className="text-lg font-bold mb-2">{course.courseName}</h3>
                          <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
                          {/* Optionally, add progress bar or continue button here */}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No courses enrolled yet
                  </div>
                )}
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Upcoming Events & Courses</h2>
                {loading ? (
                  <div className="space-y-4">
                    {registrations.events.map((stuff , index) => (
                      <div key={index} className="animate-pulse flex space-x-4">
                        <div className="h-12 w-12 bg-gray-200 rounded">{stuff.title}</div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4">{stuff.shortDesc}</div>
                          <div className="h-4 bg-gray-200 rounded w-1/2">{stuff.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (() => {
                  // Filter upcoming events
                  const upcomingEvents = registrations.events
                    .filter(event => new Date(event.endDate) > new Date())
                    .map(event => ({ ...event, _type: 'event' as const }));

                  // All courses (or filter by progress if you want)
                  const enrolledCourses = registrations.courses
                    .map(course => ({ ...course, _type: 'course' as const }));

                  // Combine for display
                  const calendarItems = [...upcomingEvents, ...enrolledCourses];

                  return calendarItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {calendarItems.map(item => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col overflow-hidden"
                        >
                          <img
                            src={item._type === 'event' ? item.thumbnail : item.courseImage}
                            alt={item._type === 'event' ? item.title : item.courseName}
                            className="h-40 w-full object-cover"
                          />
                          <div className="p-4 flex-1 flex flex-col">
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 w-fit
                              ${item._type === 'event' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {item._type === 'event' ? 'Event' : 'Course'}
                            </span>
                            <h3 className="text-lg font-bold mb-2">{item._type === 'event' ? item.title : item.courseName}</h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {item._type === 'event' ? item.shortDesc : item.category}
                            </p>
                            {item._type === 'event' ? (
                              <div className="text-xs text-gray-500 mt-auto">
                                <span>
                                  {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                                </span>
                                <span className="ml-2">{item.location}</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming events or courses
                    </div>
                  );
                })()}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Achievements content will be populated here */}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
                  <p className="text-gray-600">This section is under development. Check back later!</p>
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
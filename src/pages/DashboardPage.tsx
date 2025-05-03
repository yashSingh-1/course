import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, BarChart2, Calendar, Settings, LogOut, Bell, Search, Play, CheckCircle } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import { useCurrentUser } from '@/lib/currentUser';
import { getUserRegistrations, UserRegistrations } from '@/lib/beCalls/userRegistrations';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [registrations, setRegistrations] = useState<UserRegistrations>({
    courses: [],
    events: []
  });
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (user.id) {
        setLoading(true);
        try {
          const data = await getUserRegistrations(user.id);
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
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'courses' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>My Courses</span>
                </button>
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'calendar' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </button>
                <button 
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'achievements' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50">
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
                        <p className="text-3xl font-bold">{registrations?.courses?.length || 0}</p>
                        <p className="text-sm text-gray-500 mt-2">Enrolled Courses</p>
                      </>
                    )}
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-500">Hours Studied</h3>
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold">42.5</p>
                    <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-500">Achievements</h3>
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-3xl font-bold">7</p>
                    <p className="text-sm text-gray-500 mt-2">3 earned this month</p>
                  </div>
                </div>

                {/* Continue Learning */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold mb-6">Continue Learning</h2>
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
                    <div className="space-y-6">
                      {registrations.courses.map(course => (
                        <div key={course.id} className="flex flex-col md:flex-row md:items-center">
                          <img 
                            src={course.courseImage} 
                            alt={course.courseName} 
                            className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                          />
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <div>
                                <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                                <h3 className="font-bold">{course.courseName}</h3>
                              </div>
                              <button className="mt-2 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors">
                                <Play className="h-4 w-4 mr-2" /> Continue
                              </button>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">{course.progress}% complete</span>
                                <span className="text-sm text-gray-600">{course.progress}/100</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-purple-600 h-2.5 rounded-full" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
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

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                    <Link to="/calendar" className="text-purple-600 hover:text-purple-800 text-sm font-medium">View Calendar</Link>
                  </div>
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
                  ) : registrations?.events?.length > 0 ? (
                    <div className="space-y-4">
                      {registrations.events.map(event => (
                        <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="bg-purple-100 text-purple-800 rounded-lg p-3 mr-4">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold">{event.eventName}</h3>
                            <p className="text-sm text-gray-600">{event.courseName}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <span>{event.eventDate}</span>
                              <span className="mx-2">•</span>
                              <span>{event.eventTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming events
                    </div>
                  )}
                </div>
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
                  <div className="space-y-6">
                    {registrations.courses.map(course => (
                      <div key={course.id} className="flex flex-col md:flex-row md:items-center">
                        <img 
                          src={course.courseImage} 
                          alt={course.courseName} 
                          className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                        />
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div>
                              <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                              <h3 className="font-bold">{course.courseName}</h3>
                            </div>
                            <button className="mt-2 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors">
                              <Play className="h-4 w-4 mr-2" /> Continue
                            </button>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">{course.progress}% complete</span>
                              <span className="text-sm text-gray-600">{course.progress}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-purple-600 h-2.5 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
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
                ) : registrations?.events?.length > 0 ? (
                  <div className="space-y-4">
                    {registrations.events.map(event => (
                      <div key={event.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="bg-purple-100 text-purple-800 rounded-lg p-3 mr-4">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold">{event.eventName}</h3>
                          <p className="text-sm text-gray-600">{event.courseName}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span>{event.eventDate}</span>
                            <span className="mx-2">•</span>
                            <span>{event.eventTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No upcoming events
                  </div>
                )}
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
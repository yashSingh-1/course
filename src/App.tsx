import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Events from './pages/Events';
import CourseDetailPage from './pages/CourseDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Admin from './pages/Admin';
import AllBlogs from './pages/AllBlogs';
import BlogPost from './pages/BlogPost';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<AllBlogs />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <DashboardPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn signInForceRedirectUrl={`https://propogation.co.in${window.location.pathname}${window.location.search}`} />
                  </SignedOut>
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage title={''} description={''} category={'Astrophysics'} submissionRequirements={{
              github: false,
              pdf: false
            }} />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
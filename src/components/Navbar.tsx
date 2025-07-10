import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Rocket, BookOpen } from "lucide-react";
import { useAuth } from "@/lib/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-black text-white py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Rocket className="h-8 w-8 text-purple-500" />
          <span className="text-2xl font-bold tracking-tight">Propagation</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/events" className="hover:text-purple-400 transition-colors">
            Training
          </Link>
          <Link
            to="/courses"
            className="hover:text-purple-400 transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/resources"
            className="hover:text-purple-400 transition-colors"
          >
            Resources
          </Link>
          <Link
            to="/blog"
            className="hover:text-purple-400 transition-colors"
          >
            Blogs
          </Link>
          <Link to="/speakers" className="hover:text-purple-400 transition-colors">Speakers</Link>
          <Link to="/about" className="hover:text-purple-400 transition-colors">
            About
          </Link>

          <div className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
            {user ? (
              <Link to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link to="/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4 mt-4">
            <Link
              to="/events"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Training
            </Link>
            <Link
              to="/courses"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/resources"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/blog"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/speakers"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Speakers
            </Link>
            <Link
              to="/about"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

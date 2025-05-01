import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Rocket, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* //blogs */}
          <Link to="/about" className="hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-purple-400 transition-colors"
          >
            Contact
          </Link>

          <div className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Link
                to="/dashboard"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>
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
        <div className="md:hidden mt-4 px-6 pb-4 space-y-4">
          <Link
            to="/"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/dashboard"
            className="block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

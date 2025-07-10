import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const speakers = [
  {
    name: 'Amoli Kakkar',
    image: 'https://res.cloudinary.com/da0lgcbdu/image/upload/v1752162871/1_wijkk1.png',
    designation: 'Astronomy Educator, Citizen Scientist',
    details: [
      'Certified asteroid hunter and AAVSO observer',
      'Dedicated astrophotographer with a passion for science outreach',
      'Inspires young minds through citizen science and astronomy education',
    ],
  },
  {
    name: 'Dr. Gourav Banerjee',
    image: 'https://res.cloudinary.com/da0lgcbdu/image/upload/v1752162871/2_a1sg9j.png',
    designation: 'Post Doctoral Fellow, Indian Institute of Astrophysics',
    affiliation: 'Vainu Bappu Observatory, IIA, Bangalore',
    email: 'gouravbanerjeegb@gmail.com',
    details: [
      'Specializes in spectroscopic studies of stars',
      'PhD and MPhil in Astrophysics (CHRIST University), M.Tech in Astronomy & Space Engineering (Manipal University)',
      'Life member of IAU, ASI, and IPS',
      'Delivered 500+ astronomy talks across India',
      'Author of two books:',
      'Becoming an Astronomer (career guide in astronomy)',
      "Mars: A Celestial Show's Topper (history of Mars studies)",
    ],
  },
  {
    name: 'Shourjya Pal',
    image: 'https://res.cloudinary.com/da0lgcbdu/image/upload/v1752162870/3_sgxyhr.png',
    designation: 'Citizen Scientist, Student (Grade 9)',
    affiliation: 'SA Citizen Science Group',
    details: [
      'Founder, SA Citizen Science Lab, Malda',
      'Author of Citizen Science – for Juniors',
      'Created astroart at international level',
      'Discovered: 3 provisional asteroids, 4 supernovas',
      'Classified 12,000+ galaxies',
      'Bengali translator for NASA-Zooniverse project Burst Chaser',
    ],
  },
  {
    name: 'Vikrant Vivek Kurmude',
    image: 'https://res.cloudinary.com/da0lgcbdu/image/upload/v1752162873/4_ykwagw.png',
    designation: 'Project Engineer & Lab-in-charge, Electrical Engineering Dept., IIT Bombay',
    email: 'vikrantkurmude@gmail.com',
    details: [
      'Active in citizen science since 2012',
      'Contributor to Zooniverse projects: Disk Detective, Burst Chaser',
      'Member of Japanese Galaxy Cruise and International Astronomical Search Collaboration (IASC)',
      'Promotes public participation in science through hands-on collaboration',
    ],
  },
];

const Speakers: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0a1020] to-[#181f2a] py-16 px-2 md:px-6">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight">Our Speakers</h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">Meet the inspiring minds leading our events, workshops, and citizen science initiatives.</p>
    </div>
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
      {speakers.map((s, i) => (
        <div
          key={i}
          className="relative bg-[#181f2a] rounded-3xl shadow-xl mt-10 flex flex-col items-center px-8 pt-20 pb-10 text-center border border-[#232b3b]"
          style={{boxShadow: '0 4px 32px 0 rgba(80, 80, 180, 0.10)'}}
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="rounded-full p-1 bg-gradient-to-tr from-purple-500 via-blue-400 to-purple-700 shadow-lg" style={{boxShadow: '0 0 0 6px #181f2a'}}>
              <img
                src={s.image}
                alt={s.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-transparent"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{s.name}</h2>
            <div className="text-lg text-purple-200 font-medium mb-1 leading-tight">{s.designation}</div>
            {s.affiliation && <div className="text-base text-blue-200 mb-1 leading-tight">{s.affiliation}</div>}
            {s.email && (
              <div className="flex items-center gap-1 text-sm text-blue-200 mb-2 justify-center mt-1">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${s.email}`} className="underline hover:text-purple-200">{s.email}</a>
              </div>
            )}
            <ul className="list-disc pl-6 text-gray-200 space-y-2 mt-4 text-left mx-auto max-w-xs">
              {s.details.map((d, idx) => (
                <li key={idx} className="leading-snug text-base">
                  {d.startsWith('Becoming an Astronomer') || d.startsWith('Mars:') ? (
                    <span className="italic">{d}</span>
                  ) : d.startsWith('Citizen Science – for Juniors') ? (
                    <span className="italic">{d}</span>
                  ) : d.startsWith('Disk Detective') || d.startsWith('Burst Chaser') || d.startsWith('Galaxy Cruise') || d.startsWith('International Astronomical Search Collaboration (IASC)') ? (
                    <span className="italic">{d}</span>
                  ) : d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-16">
      <Link to="/" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg">Back to Home</Link>
    </div>
  </div>
);

export default Speakers; 
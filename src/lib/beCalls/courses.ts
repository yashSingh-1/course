import prisma from "../prisma"

export async function createAstronomyCourse() {
  const course = await prisma.course.create({
    data: {
      title: "Comprehensive Astronomy Program",
      subtitle: "Equivalent to Bachelor in Astrophysics",
      description: "A comprehensive astronomy program exploring celestial objects, space, and the universe, progressing from basic to advanced concepts.",
      thumbnail: "https://images.pexels.com/photos/2034892/pexels-photo-2034892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      level: "BEGINNER", // Starts from beginner but progresses to advanced
      duration: 40, // Total weeks (6-10 + 12-16 + 12-16)
      price: 0, // Can be updated based on pricing strategy
      instructorName: "Department of Astronomy",
      features: [
        "Three-tier progressive learning structure",
        "Hands-on observational astronomy",
        "Computational tools and simulations",
        "Certificate of completion",
        "Interactive learning materials"
      ],
      
      syllabus: {
        create: [
          // Basic Astronomy Module
          {
            title: "Basic Astronomy",
            description: "Introduction to fundamental astronomical concepts and observational techniques",
            duration: "6-10 weeks",
            order: 1,
            topics: {
              create: [
                {
                  title: "Observational Astronomy",
                  description: "Practical sky observation and astrophotography",
                  order: 1,
                  content: {
                    subtopics: [
                      "Sky observation, star maps, and constellations",
                      "Telescopes and binoculars",
                      "Optical and radio astronomy"
                    ],
                    activities: ["Astrophotography competition", "Quiz events", "Real-time constellation tracking"]
                  }
                },
                {
                  title: "Solar System",
                  description: "Exploration of our cosmic neighborhood",
                  order: 2,
                  content: {
                    subtopics: [
                      "The Sun, planets, moons, asteroids, and comets",
                      "Planetary orbits and Kepler's laws",
                      "Space missions (MOM, ISS, Voyager, Juno, Perseverance)"
                    ]
                  }
                },
                {
                  title: "Stellar Astronomy",
                  description: "Understanding the life and death of stars",
                  order: 3,
                  content: {
                    subtopics: [
                      "Star formation and life cycle",
                      "Spectral classification of stars"
                    ]
                  }
                },
                {
                  title: "Celestial Mechanics",
                  description: "Basic physics of celestial motion",
                  order: 4,
                  content: {
                    subtopics: [
                      "Newton's laws of motion and gravity",
                      "Orbital mechanics, escape velocity, and tides"
                    ]
                  }
                }
              ]
            }
          },
          // Intermediate Astronomy Module
          {
            title: "Intermediate Astronomy",
            description: "Advanced concepts in astrophysics and computational methods",
            duration: "12-16 weeks",
            order: 2,
            topics: {
              create: [
                {
                  title: "Astrophysics",
                  order: 1,
                  content: {
                    subtopics: [
                      "Radiation laws and blackbody radiation",
                      "Nuclear fusion in stars",
                      "Spectroscopy and Doppler effect"
                    ]
                  }
                },
                {
                  title: "Galactic and Extragalactic Astronomy",
                  order: 2,
                  content: {
                    subtopics: [
                      "The Milky Way and other galaxies",
                      "Dark matter and galaxy rotation curves",
                      "The structure of the universe"
                    ]
                  }
                },
                {
                  title: "Exoplanetary Science",
                  order: 3,
                  content: {
                    subtopics: [
                      "Methods of detecting exoplanets",
                      "Habitable zones and biosignatures"
                    ]
                  }
                },
                {
                  title: "Computational Astronomy",
                  order: 4,
                  content: {
                    subtopics: [
                      "Simulations and numerical modeling",
                      "AI and machine learning in astronomy"
                    ]
                  }
                }
              ]
            }
          },
          // Advanced Astronomy Module
          {
            title: "Advanced Astronomy",
            description: "Cutting-edge concepts in modern astrophysics",
            duration: "12-16 weeks",
            order: 3,
            topics: {
              create: [
                {
                  title: "Cosmology",
                  order: 1,
                  content: {
                    subtopics: [
                      "The Big Bang Theory and cosmic inflation",
                      "Dark energy and the expansion of the universe",
                      "Cosmic microwave background radiation"
                    ]
                  }
                },
                {
                  title: "High-Energy Astrophysics",
                  order: 2,
                  content: {
                    subtopics: [
                      "Neutron stars, black holes, pulsars, quasars",
                      "Gamma-ray bursts and gravitational waves"
                    ]
                  }
                },
                {
                  title: "General Relativity and Quantum Cosmology",
                  order: 3,
                  content: {
                    subtopics: [
                      "Einstein's equations and spacetime curvature",
                      "Time dilation, gravitational lensing, wormholes",
                      "Multiverse and string theory"
                    ]
                  }
                },
                {
                  title: "Astrobiology and Space Exploration",
                  order: 4,
                  content: {
                    subtopics: [
                      "Search for extraterrestrial life",
                      "Mars colonization and interstellar travel concepts",
                      "Space telescopes and future missions"
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      
      // Prerequisites for each level
      prerequisites: [
        "Basic Physics (High school level) for Basic Astronomy",
        "Basic Astronomy completion for Intermediate level",
        "12th level Physics and Mathematics for Advanced level"
      ],
      
      // FAQs
      faqs: {
        create: [
          {
            question: "What prerequisites do I need for the basic astronomy course?",
            answer: "Basic high school level physics and mathematics is sufficient for the basic astronomy course.",
            order: 1
          },
          {
            question: "Can I take individual modules separately?",
            answer: "Yes, each module (Basic, Intermediate, Advanced) can be taken separately, provided you meet the prerequisites.",
            order: 2
          },
          {
            question: "Are there practical observations included?",
            answer: "Yes, the Basic Astronomy module includes hands-on observational sessions, astrophotography, and real-time constellation tracking.",
            order: 3
          },
          {
            question: "What career opportunities does this course prepare me for?",
            answer: "This comprehensive program prepares you for careers in astronomical research, space agencies, observatories, educational institutions, and space technology companies.",
            order: 4
          }
        ]
      }
    }
  })
  
  return course
} 
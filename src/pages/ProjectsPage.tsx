import Card from "../components/Card";

export const Projects = () => {
    const techProjects = [
        { 
            title: 'AI Chatbot', 
            description: 'Learn to build an AI-powered chatbot using Python and NLP. Learn to build an AI-powered chatbot using Python and NLP.', 
            image: '/images/ai-chatbot.jpg', 
            link: '/projects/ai-chatbot' 
        },
        { 
            title: 'Web Development', 
            description: 'Create responsive websites using React and Tailwind CSS. Learn to build an AI-powered chatbot using Python and NLP.', 
            image: '/images/web-development.jpg', 
            link: '/projects/web-development' 
        },
    ];

    const astrophysicsProjects = [
        { 
            title: 'Exoplanet Detection', 
            description: 'Analyze data to detect exoplanets using machine learning. Learn to build an AI-powered chatbot using Python and NLP.', 
            image: '/images/exoplanet-detection.jpg', 
            link: '/projects/exoplanet-detection' 
        },
        { 
            title: 'Stellar Evolution', 
            description: 'Simulate the lifecycle of stars using computational models. Learn to build an AI-powered chatbot using Python and NLP.', 
            image: '/images/stellar-evolution.jpg', 
            link: '/projects/stellar-evolution' 
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 p-6 px-12 md:px-16">
           {
            techProjects.map((project, index) => (
                <Card
                    key={index}
                    title={project.title}
                    desc={project.description}
                    // img={project.image}
                />
            ))
           }
           {
            astrophysicsProjects.map((project, index) => (
                <Card
                    key={index}
                    title={project.title}
                    desc={project.description}
                    // img={project.image}
                />
            ))
           }
        </div>
    );
};
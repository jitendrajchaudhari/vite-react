import React, { useState, useEffect, useRef } from 'react';
// Chart.js imports removed as requested

// Define TypeScript Interfaces for data structures
interface TimelineItem {
    type: 'work' | 'education';
    title: string;
    company: string;
    date: string;
    details: string[];
}

interface Project {
    id: number;
    company: string;
    title: string;
    description: string;
    techStack: string[];
}

interface EducationItem {
    degree: string;
    institution: string;
    year: string;
}

interface Certification {
    name: string;
    url: string;
}

// Main App Component
const App = () => {
    // IMPORTANT: Ensure Tailwind CSS is correctly set up in your project's public/index.html or build process.
    // E.g., via CDN: <script src="https://cdn.tailwindcss.com"></script> in public/index.html
    // Or via PostCSS: configure tailwind.config.js and import index.css (containing @tailwind directives) in main.tsx

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');

    // Data for the resume
    const timelineData: TimelineItem[] = [
        {
            type: 'work',
            title: 'Senior Software Developer',
            company: 'HCL Software, Pune',
            date: 'October 2024 – Present',
            details: [
                'Leading the development of enterprise-grade applications for banking and finance.',
                'Collaborating with cross-functional teams to architect cloud-native solutions and streamline deployments.',
                'Integrating customer data across banking platforms to support marketing and analytics workflows.'
            ]
        },
        {
            type: 'work',
            title: 'Software Developer',
            company: 'Heaptrace Technology Pvt. Ltd., Pune',
            date: 'April 2021 – July 2024',
            details: [
                'Developed and maintained web and mobile applications using modern JavaScript frameworks.',
                'Collaborated with DevOps to manage CI/CD pipelines and cloud deployments.',
                'Delivered scalable solutions in energy, ecosystem mapping, and content analytics domains.'
            ]
        },
        {
            type: 'education',
            title: 'Post Graduate Diploma in Advanced Computing',
            company: 'CDAC, Sunbeam Institute, Karad',
            date: '2020',
            details: []
        },
        {
            type: 'education',
            title: 'Bachelor of Engineering (B.E.) – Mechanical Engineering',
            company: 'RCPIT, Shirpur – North Maharashtra University',
            date: '2013–2017',
            details: []
        }
    ];

    const projectsData: Project[] = [
        {
            id: 1,
            company: 'HCL Software',
            title: 'Customer Data Platform (CDP) for Banking',
            description: 'Developed a centralized data platform to aggregate, cleanse, and unify customer profiles across multiple banking channels, enabling advanced segmentation, consent management, and real-time personalization.',
            techStack: ['React.js', 'Node.js', 'MongoDB', 'Kafka', 'AWS', 'Docker', 'Jenkins']
        },
        {
            id: 2,
            company: 'Heaptrace Technology',
            title: 'Audience Genomics',
            description: 'Built a social media analytics platform to detect user interests, emotions, and values. Integrated OpenAI and DALL·E for content and image generation.',
            techStack: ['Next.js', 'MongoDB', 'RavenDB', 'Docker', 'Firebase', 'AWS']
        },
        {
            id: 3,
            company: 'Heaptrace Technology',
            title: 'MotKraft',
            description: 'Developed a mobile app for electricity consumption and pricing visibility in the Norwegian market. Integrated invoicing, push notifications, and real-time analytics.',
            techStack: ['React Native', 'Expo', 'Redux', 'Axios', 'Victory Charts']
        },
        {
            id: 4,
            company: 'Heaptrace Technology',
            title: 'Enterprise Ecosystem Tool',
            description: 'Created a SaaS tool to support business ecosystem visualization and strategy workshops for enterprise clients, enabling collaborative mapping and analysis.',
            techStack: ['React.js', 'Chart.js', 'Chakra UI', 'Docker', 'Jenkins']
        }
    ];

    const educationData: EducationItem[] = [
        {
            degree: 'Post Graduate Diploma in Advanced Computing',
            institution: 'CDAC, Sunbeam Institute, Karad',
            year: '2020'
        },
        {
            degree: 'Bachelor of Engineering (B.E.) – Mechanical Engineering',
            institution: 'RCPIT, Shirpur – North Maharashtra University',
            year: '2013–2017'
        }
    ];

    const certificationsData: Certification[] = [
        { name: 'CDAC – Diploma in Advanced Computing', url: 'https://drive.google.com/file/d/1eIt6NmB91c967ViV8PsxAEhLd2qUjOQl/view' },
        { name: 'React Native – Udemy', url: 'https://www.udemy.com/certificate/UC-39a83d59-191e-4fd3-86e1-12c9e1aef06c/' },
        { name: 'React JS – Udemy', url: 'https://www.udemy.com/certificate/UC-bf33d4aa-47a6-4f7d-84bb-776e6389bba4' }
    ];

    // Intersection Observer for section animations
    useEffect(() => {
        const sections = document.querySelectorAll('section.fade-in');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Initial animation for Hero section if it's already in view on load
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('appear');
        }
    }, []);

    return (
        <div className="bg-zinc-900 text-zinc-200 font-inter">
            {/* Header & Navigation */}
            <header id="header" className="bg-zinc-800/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="#hero" className="text-zinc-50 hover:text-cyan-400 transition-colors duration-200 text-lg font-bold">Jitendra Chaudhari</a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#timeline" className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Timeline</a>
                                <a href="#projects" className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Projects</a>
                                <a href="#skills" className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Skills</a>
                                <a href="#education" className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Education</a>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-50 hover:bg-zinc-700 focus:outline-none transition-colors duration-200">
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
                <div id="mobile-menu" className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#timeline" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Timeline</a>
                        <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Projects</a>
                        <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Skills</a>
                        <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Education</a>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* Hero Section */}
                <section id="hero" className="text-center py-16 md:py-24 rounded-2xl shadow-inner-lg shadow-zinc-800 mb-16 fade-in bg-gradient-to-t from-zinc-950 to-zinc-800">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-50">JITENDRA CHAUDHARI</h1>
                    <p className="mt-3 text-lg md:text-xl text-cyan-400 font-semibold">Senior Software Developer</p>
                    <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-zinc-300">
                        Senior Software Developer with 4.5+ years of experience in full-stack development, cloud platforms, and scalable enterprise systems. Proven expertise in delivering high-quality, performant applications across diverse domains including energy, media, and banking.
                    </p>
                    <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-zinc-400">
                         <a href="mailto:jitendra.chaudhari.980@gmail.com" className="hover:text-cyan-400 transition-colors duration-200">jitendra.chaudhari.980@gmail.com</a>
                         <span>&bull;</span>
                         <a href="tel:+919421326461" className="hover:text-cyan-400 transition-colors duration-200">+91 9421326461</a>
                    </div>
                </section>

                {/* Timeline Section */}
                <TimelineSection data={timelineData} />

                {/* Projects Section */}
                <ProjectsSection projectsData={projectsData} activeFilter={activeProjectFilter} setActiveFilter={setActiveProjectFilter} />

                {/* Skills Section (Text-based replacement) */}
                <TextSkillsSection />

                {/* Education Section */}
                <EducationCertificationsSection educationData={educationData} certificationsData={certificationsData} />

            </main>

            <footer className="bg-zinc-950 text-zinc-400 py-6">
                <div className="container mx-auto text-center text-sm">
                    <p>&copy; 2024 Jitendra Chaudhari. Interactive resume created with React, Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
};

// Timeline Section Component
interface TimelineSectionProps {
    data: TimelineItem[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ data }) => {
    const [openItem, setOpenItem] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <section id="timeline" className="py-16 md:py-24 fade-in">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-50">Career Timeline</h2>
                <p className="mt-4 text-lg text-center text-zinc-300">
                    An interactive overview of my professional journey and educational milestones. Click on any item to see more details.
                </p>
                <div id="timeline-container" className="mt-12 relative border-l-2 border-zinc-700 ml-4 md:ml-0">
                    {data.map((item: TimelineItem, index: number) => (
                        <div key={index} className="mb-8 flex justify-between items-start w-full right-timeline">
                            <div className="order-1 w-full px-4 py-4 ml-8">
                                <div onClick={() => toggleItem(index)} className="p-4 bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer timeline-item-header">
                                    <p className="text-sm font-medium text-zinc-400">{item.date}</p>
                                    <h3 className="font-bold text-lg text-zinc-50">{item.title}</h3>
                                    <p className="text-md text-zinc-300">{item.company}</p>
                                    {item.details.length > 0 && (
                                        <div className={`timeline-item-content ${openItem === index ? 'open' : ''}`}>
                                            <ul className="space-y-2 list-disc list-inside text-zinc-400">
                                                {item.details.map((d: string, i: number) => <li key={i}>{d}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`z-20 flex items-center order-1 ${item.type === 'work' ? 'bg-cyan-600' : 'bg-green-600'} shadow-xl w-8 h-8 rounded-full absolute -ml-4`}>
                                <svg className="w-5 h-5 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {item.type === 'work' ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.494h18" transform="scale(0.8) translate(3, 1)"></path>
                                    )}
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Projects Section Component
interface ProjectsSectionProps {
    projectsData: Project[];
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectsData, activeFilter, setActiveFilter }) => {
    const projectGridRef = useRef<HTMLDivElement>(null);

    const companies = ['All', ...new Set(projectsData.map((p: Project) => p.company))];

    const filteredProjects = activeFilter === 'All' ? projectsData : projectsData.filter((p: Project) => p.company === activeFilter);

    useEffect(() => {
        // Trigger animations for newly rendered cards
        if (projectGridRef.current) {
            const cards = projectGridRef.current.querySelectorAll('.project-card');
            cards.forEach((card: Element, index: number) => {
                card.classList.remove('appear'); // Reset for re-animation
                (card as HTMLElement).style.setProperty('--delay', `${index * 0.1}s`);
            });
            setTimeout(() => {
                cards.forEach((card: Element) => card.classList.add('appear'));
            }, 50); // Small delay to ensure reset
        }
    }, [filteredProjects]); // Re-run effect when filteredProjects changes

    return (
        <section id="projects" className="py-16 md:py-24 bg-zinc-800 rounded-2xl shadow-lg my-16 fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-50">Project Portfolio</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-center text-zinc-300">
                    A collection of key projects I've developed. Use the filters to explore my work at different companies and see the technologies I used to build them.
                </p>
                <div className="mt-8 flex justify-center space-x-2 md:space-x-4">
                    {companies.map((company: string) => (
                        <button
                            key={company}
                            onClick={() => setActiveFilter(company)}
                            className={`filter-btn px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                ${activeFilter === company ? 'bg-cyan-600 text-white' : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'}`}
                        >
                            {company}
                        </button>
                    ))}
                </div>
                <div ref={projectGridRef} id="project-grid" className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project: Project) => (
                        <div key={project.id} className="bg-zinc-700 rounded-lg shadow-md overflow-hidden project-card fade-in-item">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-zinc-50">{project.title}</h3>
                                <p className="text-sm font-semibold text-cyan-400">{project.company}</p>
                                <p className="mt-2 text-zinc-300">{project.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string, i: number) => (
                                        <span key={i} className="bg-zinc-600 text-zinc-200 px-2 py-1 text-xs font-medium rounded-full">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Skills Section Component (Text-based replacement)
const TextSkillsSection: React.FC = () => {
    const skillDetails: { [key: string]: string } = {
        'Languages': 'JavaScript, TypeScript, Java',
        'Frontend': 'React.js, React Native, Next.js, Redux, Context API, Hooks',
        'Backend': 'Node.js, Java, Spring Boot',
        'Database': 'MySQL, MongoDB, RavenDB, PostgreSQL, GraphQL',
        'DevOps & Cloud': 'AWS, GCP, Docker, Jenkins',
        'Version Control': 'Git, GitHub, GitLab, Bitbucket',
        'Tools': 'Jira, Slack, Teamwork, Notion, Vercel, Expo',
        'Operating Systems': 'Windows, Linux',
        'IDEs': 'Visual Studio Code, WebStorm'
    };

    return (
        <section id="skills" className="py-16 md:py-24 fade-in">
            <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-50">Technical Skills</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-center text-zinc-300">
                A comprehensive list of my technical proficiencies across various domains.
            </p>
            <div className="mt-12 max-w-4xl mx-auto bg-zinc-800 p-8 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {Object.entries(skillDetails).map(([category, skills], index) => (
                    <div key={index} className="flex flex-col">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-1">{category}</h3>
                        <p className="text-zinc-300 text-base">{skills}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Education and Certifications Section Component
interface EducationCertificationsSectionProps {
    educationData: EducationItem[];
    certificationsData: Certification[];
}

const EducationCertificationsSection: React.FC<EducationCertificationsSectionProps> = ({ educationData, certificationsData }) => {
    return (
        <section id="education" className="py-16 md:py-24 bg-zinc-950 rounded-2xl my-16 fade-in">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-50">Education & Certifications</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-center text-zinc-300">
                    My foundational education and the key certifications that supplement my hands-on experience.
                </p>
                <div className="mt-12 space-y-8">
                    <div id="education-container">
                        {educationData.map((item: EducationItem, index: number) => (
                            <div key={index} className="bg-zinc-800 p-6 rounded-lg shadow-sm">
                                <p className="text-lg font-semibold text-zinc-50">{item.degree}</p>
                                <p className="text-zinc-300">{item.institution}</p>
                                <p className="text-sm text-zinc-400">{item.year}</p>
                            </div>
                        ))}
                    </div>
                    <div id="certifications-container" className="mt-10">
                        <h3 className="text-xl font-bold text-center text-zinc-50 mb-4">Certifications</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {certificationsData.map((cert: Certification, index: number) => (
                                <a key={index} href={cert.url} target="_blank" rel="noopener noreferrer" className="bg-zinc-800 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-cyan-400 hover:bg-zinc-700 hover:shadow-md transition-all duration-200">
                                    {cert.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default App;

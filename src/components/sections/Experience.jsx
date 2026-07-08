import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaLaptopCode, 
  FaServer, 
  FaTools, 
  FaRobot, 
  FaCertificate, 
  FaGraduationCap,
  FaCheckCircle,
  FaIdBadge,
  FaLayerGroup,
  FaArrowUp,
  FaExternalLinkAlt,
  FaProjectDiagram
} from 'react-icons/fa';

// --- DATA: CAREER PROJECTS (Vercel-style cards) ---
const careerProjects = [
  {
    id: 'p1',
    title: 'SOLFIX WEBSITE ',
    description: 'SOLFIX Tech is a professional board-level repair training platform providing practical laptop and motherboard diagnostics education, hands-on repair training, firmware recovery, soldering skills, and real-world troubleshooting guidance for aspiring technicians.',
    url: 'https://solfix-1.onrender.com/',
    previewImage: 'https://api.microlink.io/?url=https://solfix-1.onrender.com/&screenshot=true&meta=false&embed=screenshot.url',
    company: 'SOLFIX COMPANY',
    date: 'MARCH 2026',
    technologies: ['React', 'Node.js', 'MONGODB', 'Tailwind CSS'],
    link: 'https://solfix-1.onrender.com/',
  },
 {
    id: 'p2',
    title: 'UMURAVA HR MANAGEMENT SYSTEM',
    description: 'An AI-powered HR management platform for talent screening, candidate tracking, and streamlined recruitment workflows with real-time analytics.',
    url: 'https://umurava-talentscreen-ai.vercel.app/dashboard',
    previewImage: 'https://api.microlink.io/?url=https://umurava-talentscreen-ai.vercel.app/dashboard&screenshot=true&meta=false&embed=screenshot.url',
    company: 'UMURAVA',
    date: 'FEBRUARY 2026',
    technologies: ['NEXT.JS', 'MONGODB', 'Tailwind CSS'],
    link: 'https://umurava-talentscreen-ai.vercel.app/dashboard',
  },
  {
    id: 'p3',
    title: 'UNICHAIN DAPP',
    description: 'A decentralized application built for the Cardano Africa Hackathon 2026, featuring blockchain integration, smart contracts, and Web3 wallet connectivity.',
    url: 'https://unichain-dun.vercel.app/',
    previewImage: 'https://api.microlink.io/?url=https://unichain-dun.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    company: 'CARDANO AFRICA HACKATHON ',
    date: 'JAN 2026',
    technologies: ['CARDANO', 'FIRESTORE', 'Tailwind CSS', 'JAVASCRIPT', 'HASKELL', 'AIKEN', 'MESH SDK', 'BLOCKFROST', 'ANGULAR', 'HTML'],
    link: 'https://unichain-dun.vercel.app/',
  },
];

// --- DATA: PROFESSIONAL EXPERIENCE ---
const professionalWork = [
  // --- WORK: ¡GITREE (Current Role - Promoted) ---
  {
    id: 1,
    title: 'Web Developer (Fullstack)',
    company: '¡GITREE',
    type: 'Hybrid (Promoted)',
    duration: 'Oct 2025 - Present',
    location: 'Kigali, Rwanda',
    description: "Promoted from Web Designer to lead Fullstack development. Expanded scope to handle end-to-end architecture.",
    achievements: [
      "Transitioned from design-only to full lifecycle development.",
      "Spearheading backend integration with frontend architectures.",
      "Optimizing database queries and API response times."
    ],
    stack: ['React', 'Node.js', 'Firebase', 'Rest API','MongoDb', 'Tailwind','Express.js'],
    icon: FaArrowUp,
  },
  // --- WORK: ¡GITREE (Previous Role) ---
  {
    id: 2,
    title: 'Web Designer',
    company: '¡GITREE',
    type: 'Hybrid',
    duration: 'July 2024 - Oct 2025',
    location: 'Kigali, Rwanda',
    description: "Laid the visual foundation for the company's digital products, focusing on UI/UX and visual consistency.",
    achievements: [
      "Created high-fidelity mockups in Figma and converted them to HTML/CSS.",
      "Established the company's design system and brand guidelines.",
      "Ensured WCAG accessibility compliance across all layouts."
    ],
    stack: ['Figma', 'UI/UX'],
    icon: FaLaptopCode,
  },
  // --- WORK: Elco ---
  {
    id: 3,
    title: 'Technical Support Specialist',
    company: 'Elco.ltd',
    type: 'Part-time',
    duration: 'Aug 2023 - Aug 2024',
    location: 'Kigali, Rwanda',
    description: "Managed critical IT infrastructure and provided tier-2 technical support.",
    achievements: [
      "Diagnosed component-level hardware issues.",
      "Maintained 99% uptime for internal office networks."
    ],
    stack: ['Hardware Diagnostics', 'Network Config', 'System Admin'],
    icon: FaTools,
  },

  // --- INTERNSHIP: NATCOM PHASE 3 ---
  {
    id: 101,
    title: 'Phase III: Advanced Full Stack & DevOps',
    company: 'NATCOM SERVICES RWANDA',
    type: 'Internship (Year 3)',
    duration: 'Mar 2025',
    location: 'Kigali, Rwanda',
    description: "Final phase of intensive internship. Focusing on complex system integrations, emerging tech, and deployment pipelines.",
    achievements: [
      "Mastering React.js for complex state management.",
      "Introduction to Python for Web3 and Machine Learning integrations.",
      "Implementing CI/CD pipelines and DevOps best practices.",
      "Mobile intro with Dart/Flutter."
    ],
    stack: ['React.js', 'Python (Web3/ML)', 'DevOps', 'MongoDB', 'Dart'],
    icon: FaRobot,
  },
  // --- INTERNSHIP: NATCOM PHASE 2 ---
  {
    id: 102,
    title: 'Phase II: Backend Development',
    company: 'NATCOM SERVICES RWANDA',
    type: 'Internship (Year 2)',
    duration: 'Mar 2024 - Mar 2025',
    location: 'Kigali, Rwanda',
    description: "Dedicated year to server-side logic, database management, and system flow architecture.",
    achievements: [
      "Built robust backends using Node.js and PHP (Laravel).",
      "Designed relational database schemas in MySQL.",
      "Mapped out System Logic Flows for enterprise data handling."
    ],
    stack: ['Node.js', 'PHP', 'Laravel', 'MySQL', 'System Logic'],
    icon: FaServer,
  },
  // --- INTERNSHIP: NATCOM PHASE 1 ---
  {
    id: 103,
    title: 'Phase I: Frontend Foundations',
    company: 'NATCOM SERVICES RWANDA',
    type: 'Internship (Year 1)',
    duration: 'Mar 2023 - Mar 2024',
    location: 'Kigali, Rwanda',
    description: "Initial intensive training focused on the visual layer and user requirements.",
    achievements: [
      "Mastered the core web trio: HTML, CSS, and JavaScript.",
      "Analyzed client project requirements to create technical specs.",
      "Developed responsive layouts from scratch."
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Graphic Design ', 'Requirements','Web Design'],
    icon: FaLayerGroup,
  }
];

// --- DATA: CERTIFICATIONS ---
const certifications = [
  {
    id: 4,
    title: 'Computer Systems Technician',
    issuer: 'Technology Channel (Training)',
    date: 'July 2024 - Sept 2024',
    note: "Advanced hardware & software diagnostics training.",
    icon: FaTools
  },
  {
    id: 5,
    title: 'Robotics & Automation',
    issuer: 'Boeing (ThinkYoung)',
    date: 'Apr 2023',
    note: "Programming autonomous systems, drones, and sensor logic.",
    icon: FaRobot
  },
  {
    id: 6,
    title: 'Software Development Bootcamp',
    issuer: 'ThinkYoung',
    date: 'Apr 2023',
    note: "Intensive Python & Arduino prototyping course.",
    icon: FaGraduationCap
  }
];

// --- ANIMATION ---
const itemVar = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

// --- COMPONENT: PROJECT CARD (Vercel-style) ---
const ProjectCard = ({ data, isDarkMode }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
  <motion.a
    href={data.link}
    target="_blank"
    rel="noopener noreferrer"
    variants={itemVar}
    initial="hidden"
    animate="show"
    className={`block rounded-2xl border overflow-hidden transition-all duration-300 group
      ${isDarkMode 
        ? 'bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-500/5' 
        : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-xl'}`}
  >
    {/* Preview Image */}
    <div className={`relative w-full h-48 sm:h-52 overflow-hidden
      ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Loading shimmer */}
      {!imgLoaded && !imgError && (
        <div className={`absolute inset-0 animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className={`absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent`} />
        </div>
      )}
      <img
        src={data.previewImage}
        alt={`${data.title} preview`}
        loading="lazy"
        className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
      {/* Fallback when image fails to load */}
      {imgError && (
        <div className={`w-full h-full absolute inset-0 flex items-center justify-center
          ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="text-center px-4">
            <FaProjectDiagram className={`mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} size={36} />
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {data.title}
            </p>
          </div>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex items-center gap-2 text-white text-sm font-medium">
          <FaExternalLinkAlt size={12} />
          <span>View Live →</span>
        </div>
      </div>
    </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-base font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.title}
          </h3>
          <FaExternalLinkAlt 
            className={`shrink-0 ml-2 mt-0.5 transition-colors ${isDarkMode ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'}`} 
            size={13} 
          />
        </div>

        <p className={`text-[13px] leading-relaxed mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {data.description}
        </p>

        {/* Meta: Company + Date */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
            ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
            {data.company}
          </span>
          <span className={`text-[11px] ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {data.date}
          </span>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1">
          {data.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className={`text-[10px] font-medium px-1.5 py-0.5 rounded
              ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {tech}
            </span>
          ))}
          {data.technologies.length > 5 && (
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded
              ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              +{data.technologies.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
};

// --- COMPONENT: JOB CARD ---
const JobCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    initial="hidden"
    animate="show"
    className={`relative pl-8 pb-12 border-l-2 last:border-0 last:pb-0 
    ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
  >
    {/* Timeline Dot */}
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 box-content transition-colors
      ${isDarkMode ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-600'}`}>
    </div>

    {/* Card Body */}
    <div className={`p-6 rounded-xl border shadow-sm transition-all hover:shadow-md group
      ${isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-blue-200'}`}>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
        <div>
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <data.icon className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} size={20}/> 
            {data.title}
          </h3>
          <p className={`font-semibold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {data.company}
          </p>
        </div>
        <div className="sm:text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1
            ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
            {data.duration}
          </span>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{data.type}</p>
        </div>
      </div>

      <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {data.description}
      </p>

      {/* Achievements */}
      <div className="mb-5">
        <ul className="space-y-2">
          {data.achievements.map((item, idx) => (
            <li key={idx} className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaCheckCircle className={`mt-1 shrink-0 text-[10px] ${isDarkMode ? 'text-green-500' : 'text-green-600'}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/20">
        {data.stack.map((tech, i) => (
          <span key={i} className={`text-xs font-medium px-2 py-1 rounded 
            ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- COMPONENT: CERTIFICATE CARD ---
const CertCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    initial="hidden"
    animate="show"
    className={`relative pl-8 pb-12 border-l-2 last:border-0 last:pb-0 
    ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
  >
     {/* Timeline Dot */}
     <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 box-content transition-colors
      ${isDarkMode ? 'bg-gray-900 border-purple-500' : 'bg-white border-purple-600'}`}>
    </div>

    <div className={`flex flex-col sm:flex-row gap-4 p-5 rounded-xl border transition-colors
      ${isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-purple-200'}`}>
      
      {/* Icon Box */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0
        ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
        <data.icon size={22} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {data.title}
          </h4>
          <span className={`text-xs font-mono px-2 py-0.5 rounded
             ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            {data.date}
          </span>
        </div>
        
        <p className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          {data.issuer}
        </p>
        
        <p className={`text-sm mt-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {data.note}
        </p>
      </div>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
const Experience = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('work');

  // Filter Data Logic
  const workData = professionalWork.filter(job => !job.type.toLowerCase().includes('internship'));
  const internData = professionalWork.filter(job => job.type.toLowerCase().includes('internship'));

  const tabItems = [
    { id: 'projects', label: 'Career Projects', icon: FaProjectDiagram },
    { id: 'work', label: 'Work Experience', icon: FaBriefcase },
    { id: 'internship', label: 'Internships', icon: FaIdBadge },
    { id: 'certificates', label: 'Certificates', icon: FaCertificate },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Roadmap</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            My professional journey, practical internships, and technical qualifications.
          </motion.p>
        </div>

        {/* --- INLINE NAVIGATION (TABS) --- */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1 rounded-xl border flex-wrap gap-1
            ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm font-bold transition-all
                    ${isActive 
                      ? (isDarkMode ? 'bg-gray-700 text-white shadow-md' : 'bg-gray-100 text-blue-600 shadow-sm') 
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800')
                    }`}
                >
                  <tab.icon className={isActive ? 'text-blue-500' : ''} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="min-h-[400px]">
            
            {/* Career Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div 
                key="projects" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careerProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      data={project} 
                      isDarkMode={isDarkMode}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Work Experience Tab */}
            {activeTab === 'work' && (
              <motion.div 
                key="work" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.3 }}
              >
                {workData.map(job => (
                  <JobCard key={job.id} data={job} isDarkMode={isDarkMode} />
                ))}
              </motion.div>
            )}

            {/* Internships Tab */}
            {activeTab === 'internship' && (
              <motion.div 
                key="internship" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.3 }}
              >
                {internData.map(job => (
                  <JobCard key={job.id} data={job} isDarkMode={isDarkMode} />
                ))}
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div 
                key="certs" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
              >
                {certifications.map(cert => (
                  <CertCard key={cert.id} data={cert} isDarkMode={isDarkMode} />
                ))}
              </motion.div>
            )}
        </div>

      </div>
    </section>
  );
};

export default Experience;
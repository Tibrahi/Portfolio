import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaLaptopCode, 
  FaServer, 
  FaTools, 
  FaRobot, 
  FaCertificate, 
  FaGraduationCap,
  FaCheckCircle,
  FaIdBadge
} from 'react-icons/fa';

// --- DATA: PROFESSIONAL EXPERIENCE ---
const professionalWork = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: '¡GITREE',
    type: 'Hybrid',
    duration: 'July 2024 - Present',
    location: 'Kigali, Rwanda',
    description: "Spearheading the frontend architecture for health-sector digital solutions. Focusing on scalability, accessibility (WCAG), and performance optimization.",
    achievements: [
      "Translating complex UX requirements into responsive, pixel-perfect React interfaces.",
      "Optimizing load times and component re-usability for large-scale applications.",
      "Mentoring junior team members on modern JavaScript best practices."
    ],
    stack: ['React', 'Redux', 'Tailwind', 'Figma', 'Rest API'],
    icon: FaLaptopCode,
  },
  {
    id: 2,
    title: 'Technical Support Specialist',
    company: 'Elco.ltd',
    type: 'Part-time',
    duration: 'Aug 2023 - Aug 2024',
    location: 'Kigali, Rwanda',
    description: "Managed critical IT infrastructure and provided tier-2 technical support for enterprise hardware and networks.",
    achievements: [
      "Diagnosed and repaired component-level hardware issues, reducing equipment replacement costs.",
      "Streamlined software installation workflows for new employee onboarding.",
      "Maintained 99% uptime for internal office networks."
    ],
    stack: ['Hardware Diagnostics', 'Network Config', 'System Admin'],
    icon: FaTools,
  },
  {
    id: 3,
    title: 'Full Stack Engineering Intern',
    company: 'NATCOM SERVICES RWANDA',
    type: 'Internship (Project-Based)',
    duration: 'Mar 2022 - Mar 2025',
    location: 'Kigali, Rwanda',
    description: "Intensive 3-year practical engagement focusing on end-to-end web development, culminating in the deployment of the MEMO system.",
    achievements: [
      "Built 'MEMO' (Memorize), a complete full-stack system for data management.",
      "Designed database schemas (MongoDB) and implemented secure server-side logic (Node.js).",
      "🏆 Earned Official Natcom Certification for successful project delivery."
    ],
    stack: ['Node.js', 'MongoDB', 'React', 'Express', 'Deployment'],
    icon: FaServer,
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

// --- COMPONENT: JOB CARD (Work & Internships) ---
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

// --- COMPONENT: CERTIFICATE CARD (Redesigned as Timeline) ---
const CertCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    initial="hidden"
    animate="show"
    className={`relative pl-8 pb-12 border-l-2 last:border-0 last:pb-0 
    ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
  >
     {/* Timeline Dot (Purple for certs) */}
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
  const [activeTab, setActiveTab] = useState('work'); // 'work', 'internship', 'certificates'

  // Filter Data Logic
  const workData = professionalWork.filter(job => !job.type.toLowerCase().includes('internship'));
  const internData = professionalWork.filter(job => job.type.toLowerCase().includes('internship'));

  const tabItems = [
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
          <div className={`inline-flex p-1 rounded-xl border 
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
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span> {/* Mobile short label */}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="min-h-[400px]"> {/* Min-height prevents jumpiness */}
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
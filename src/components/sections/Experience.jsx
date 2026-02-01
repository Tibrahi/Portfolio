import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaLaptopCode, 
  FaServer, 
  FaTools, 
  FaRobot, 
  FaCertificate, 
  FaGraduationCap,
  FaExternalLinkAlt,
  FaCheckCircle
} from 'react-icons/fa';

// --- DATA: PROFESSIONAL EXPERIENCE (The "Real" Jobs) ---
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
    color: 'blue'
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
    color: 'emerald'
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
    color: 'indigo'
  }
];

// --- DATA: CERTIFICATIONS & TRAINING (The Skills/Education) ---
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
    icon: FaGraduationCap // Using generic cap for bootcamp
  }
];

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
};

// --- COMPONENT: JOB CARD ---
const JobCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    className={`relative pl-8 pb-12 border-l-2 last:border-0 last:pb-0 
    ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
  >
    {/* Timeline Dot */}
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 box-content
      ${isDarkMode ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-600'}`}>
    </div>

    {/* Card Body */}
    <div className={`p-6 rounded-xl border shadow-sm transition-all hover:shadow-md
      ${isDarkMode ? 'bg-gray-800/60 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-blue-200'}`}>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
        <div>
          <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.title}
          </h3>
          <p className={`font-semibold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {data.company}
          </p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-1
            ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            {data.duration}
          </span>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{data.type}</p>
        </div>
      </div>

      <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {data.description}
      </p>

      {/* Key Achievements List */}
      <div className="mb-5">
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Key Achievements
        </h4>
        <ul className="space-y-2">
          {data.achievements.map((item, idx) => (
            <li key={idx} className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaCheckCircle className={`mt-1 shrink-0 text-[10px] ${isDarkMode ? 'text-green-500' : 'text-green-600'}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/20">
        {data.stack.map((tech, i) => (
          <span key={i} className={`text-xs font-medium px-2 py-1 rounded 
            ${isDarkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
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
    className={`flex gap-4 p-4 rounded-xl border mb-4 transition-colors
      ${isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-purple-200'}`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
      ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
      <data.icon size={18} />
    </div>
    <div>
      <h4 className={`font-bold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {data.title}
      </h4>
      <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
        {data.issuer}
      </p>
      <p className={`text-xs mt-1 mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {data.date}
      </p>
      <p className={`text-xs leading-snug ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {data.note}
      </p>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
const Experience = ({ isDarkMode }) => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-4xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Experience</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            A track record of building scalable web systems and maintaining technical infrastructure.
          </motion.p>
        </div>

        {/* Grid Layout: 2/3 Jobs, 1/3 Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Employment History */}
          <div className="lg:col-span-8">
            <h3 className={`text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2 
              ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <FaBriefcase /> Employment History
            </h3>
            <motion.div 
              variants={containerVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {professionalWork.map(job => (
                <JobCard key={job.id} data={job} isDarkMode={isDarkMode} />
              ))}
            </motion.div>
          </div>

          {/* Right Column: Training & Certs */}
          <div className="lg:col-span-4">
            <h3 className={`text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2 
              ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <FaCertificate /> Professional Training
            </h3>
            <motion.div 
              variants={containerVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="sticky top-8"
            >
              {certifications.map(cert => (
                <CertCard key={cert.id} data={cert} isDarkMode={isDarkMode} />
              ))}
              
              {/* Optional: Add a 'Download Resume' or 'View LinkedIn' block here later */}
              <div className={`mt-6 p-4 rounded-xl border text-center
                 ${isDarkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Verified references available upon request.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
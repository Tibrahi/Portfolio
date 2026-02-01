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
  FaCheckCircle,
  FaAward
} from 'react-icons/fa';

// --- DATA: PROFESSIONAL EXPERIENCE (Main Timeline) ---
const professionalWork = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: '¡GITREE',
    type: 'Full-time',
    duration: 'July 2024 - Present',
    location: 'Kigali, Rwanda',
    description: "Leading the frontend architecture for high-impact health and human services applications. Focused on building scalable, accessible (WCAG), and performant user interfaces.",
    achievements: [
      "Architected pixel-perfect, responsive UI systems using React & Tailwind.",
      "Optimized frontend performance, reducing load times for data-heavy dashboards.",
      "Collaborated with backend teams to integrate complex REST APIs seamlessly."
    ],
    stack: ['React', 'Redux', 'Figma', 'System Design'],
    icon: FaLaptopCode,
  },
  {
    id: 2,
    title: 'Full Stack Developer (Internship)',
    company: 'NATCOM SERVICES RWANDA',
    type: 'Professional Internship',
    duration: 'Mar 2022 - Mar 2025',
    location: 'Kigali, Rwanda',
    description: "A comprehensive 3-year technical engagement culminating in the development and deployment of the 'MEMO' data management system.",
    achievements: [
      "Built and deployed 'MEMO', a full-stack system for optimized data handling.",
      "Managed server-side logic (Node.js) and database architecture (MongoDB).",
      "🏆 Received Official Natcom Certification for successful project delivery."
    ],
    stack: ['Node.js', 'MongoDB', 'React', 'Express'],
    icon: FaServer,
  },
  {
    id: 3,
    title: 'Technical Support Specialist',
    company: 'Elco.ltd',
    type: 'Full-time',
    duration: 'Aug 2023 - Aug 2024',
    location: 'Kigali, Rwanda',
    description: "Provided critical IT infrastructure support, diagnostics, and network maintenance for enterprise environments.",
    achievements: [
      "Diagnosed component-level hardware issues to minimize equipment downtime.",
      "Configured local networks and managed software installations for staff.",
      "Resolved 50+ technical tickets weekly with a 98% resolution rate."
    ],
    stack: ['Hardware Repair', 'Network Config', 'IT Support'],
    icon: FaTools,
  }
];

// --- DATA: CERTIFICATIONS (Sidebar) ---
const certifications = [
  {
    id: 4,
    title: 'Computer Systems Technician',
    issuer: 'Technology Channel',
    date: 'Issued Sep 2024',
    icon: FaTools
  },
  {
    id: 5,
    title: 'Robotics & Automation',
    issuer: 'Boeing (ThinkYoung)',
    date: 'Issued Apr 2024',
    icon: FaRobot
  },
  {
    id: 6,
    title: 'Software Development Trainee',
    issuer: 'ThinkYoung Coding School',
    date: 'Issued Apr 2023',
    icon: FaGraduationCap
  }
];

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVar = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

// --- COMPONENTS ---

const JobCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    className={`relative pl-8 pb-10 border-l-2 last:border-0 last:pb-0 
    ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
  >
    {/* Timeline Dot */}
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 box-content
      ${isDarkMode ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-600'}`}>
    </div>

    {/* Card Content */}
    <div className={`group p-5 rounded-xl border transition-all duration-300 hover:shadow-lg
      ${isDarkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-blue-200'}`}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.title}
          </h3>
          <p className={`text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {data.company}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded border 
          ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          {data.duration}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
        {data.description}
      </p>

      {/* Achievements (Bullet points) */}
      <ul className="space-y-2 mb-4">
        {data.achievements.map((item, idx) => (
          <li key={idx} className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <FaCheckCircle className={`mt-1 shrink-0 text-[10px] ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`} />
            <span className="text-xs sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-dashed border-gray-500/30">
        {data.stack.map((tech, i) => (
          <span key={i} className={`text-[11px] font-medium px-2 py-0.5 rounded 
            ${isDarkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const CertificateCard = ({ data, isDarkMode }) => (
  <motion.div 
    variants={itemVar}
    className={`flex items-center gap-3 p-3 mb-3 rounded-lg border transition-colors
      ${isDarkMode ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:border-purple-200'}`}
  >
    {/* Icon Box */}
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
      ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
      <data.icon size={16} />
    </div>
    
    {/* Text Info */}
    <div>
      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {data.title}
      </h4>
      <div className="flex items-center gap-2 text-xs mt-0.5">
        <span className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          {data.issuer}
        </span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          {data.date}
        </span>
      </div>
    </div>
  </motion.div>
);

// --- MAIN EXPERIENCE COMPONENT ---
const Experience = ({ isDarkMode }) => {
  return (
    // Reduced padding-top to 'pt-10' to start content higher up
    <section className="pt-10 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header */}
        <div className="mb-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-3xl font-extrabold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <FaBriefcase className="text-blue-500" />
            Experience <span className="text-gray-400 font-light">&</span> Credentials
          </motion.h2>
        </div>

        {/* Asymmetric Grid: 8 cols for Jobs, 4 cols for Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Job History (Professional) */}
          <div className="lg:col-span-8">
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

          {/* RIGHT COLUMN: Certificates (Sticky Sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-500/20">
                <FaAward className="text-purple-500" />
                <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Certificates & Training
                </h3>
              </div>
              
              <motion.div 
                variants={containerVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {certifications.map(cert => (
                  <CertificateCard key={cert.id} data={cert} isDarkMode={isDarkMode} />
                ))}

                {/* Optional "More" indicator */}
                <div className={`mt-4 text-center text-xs italic ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  Additional references available on request
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
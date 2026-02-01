import React from 'react';
import { motion } from 'framer-motion';
// Keeping your existing icons
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCodeBranch, FaExternalLinkAlt, FaTools, FaLaptopCode, FaRobot, FaMicrochip, FaCertificate } from 'react-icons/fa';

// --- REFINED DATA STRUCTURE ---
// 1. Professional Experience (Real Jobs/Internships)
const workHistory = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: '¡GITREE',
    duration: 'July 2024 - Present',
    location: 'Kigali City, Rwanda',
    // Converted to bullet points for readability and impact
    description: [
      "Architecting high-performance frontend systems for health and human services sectors.",
      "Leading UX/UI implementation to ensure WCAG accessibility compliance and mobile responsiveness.",
      "Collaborating with backend teams to integrate complex APIs into seamless user flows."
    ],
    technologies: ['React.js', 'Redux', 'Tailwind CSS', 'Figma', 'Rest API'],
    type: 'Full-time',
    icon: FaLaptopCode,
    link: '#' 
  },
  { 
    id: 2,
    title: 'Full-stack Developer',
    company: 'NATCOM SERVICES RWANDA',
    duration: 'Mar 2022 - Mar 2025',
    location: 'Kigali City, Rwanda (Hybrid)',
    description: [
      "Built and deployed scalable full-stack web applications, managing both server-side logic and client-side rendering.",
      "Developed 'MEMO', a certified system for optimized data management.",
      "Managed database architecture and server deployment pipelines."
    ],
    technologies: ['Node.js', 'MongoDB', 'Express', 'React', 'System Design'],
    type: 'Internship -> Contract',
    icon: FaCodeBranch,
    link: '#'
  },
  {
    id: 3,
    title: 'Technical Support Specialist',
    company: 'Elco.ltd',
    duration: 'Aug 2023 - Aug 2024',
    location: 'Kigali City, Rwanda',
    description: [
      "Provided critical IT infrastructure support, reducing hardware downtime by 20%.",
      "Managed network configurations and software troubleshooting for enterprise environments.",
      "Executed hardware diagnostics and component-level repairs."
    ],
    technologies: ['IT Operations', 'Network Config', 'Hardware Repair', 'System Admin'],
    type: 'Full-time',
    icon: FaTools,
    link: '#' 
  },
];

// 2. Training & Certifications (Workshops, Bootcamps, Short Courses)
// Separating this makes your actual work history look much more legitimate.
const trainingHistory = [
  {
    id: 4,
    title: 'Computer Systems Technician',
    company: 'Technology Channel Nepal',
    duration: 'July 2024 - Sept 2024',
    description: "Intensive training on advanced hardware troubleshooting and software diagnostics.",
    icon: FaMicrochip
  },
  {
    id: 5,
    title: 'Robotics Automation Developer',
    company: 'Boeing (ThinkYoung)',
    duration: 'Apr 2023 - Apr 2024',
    description: "Hands-on robotics programming, drone flight algorithms, and sensor integration logic.",
    icon: FaRobot
  },
  {
    id: 6,
    title: 'Software Development Trainee',
    company: 'ThinkYoung',
    duration: 'Apr 2023 (1 Month)',
    description: "Rapid prototyping bootcamp using Python and Arduino for embedded systems.",
    icon: FaCertificate
  }
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

// --- COMPONENTS ---

const ExperienceCard = ({ item, isDarkMode }) => {
  return (
    <motion.div 
      variants={cardVariants}
      className={`relative pl-8 md:pl-0`}
    >
      {/* Timeline Line (Mobile/Desktop consistent) */}
      <div className={`absolute top-0 left-0 md:left-[21px] h-full w-[2px] 
        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} z-0`}>
      </div>

      {/* Timeline Dot */}
      <div className={`absolute top-6 left-[-5px] md:left-[16px] w-3 h-3 rounded-full z-10 border-2
        ${isDarkMode ? 'bg-blue-500 border-gray-900' : 'bg-blue-600 border-white'}`}>
      </div>

      {/* Card Content */}
      <div className={`relative ml-4 md:ml-12 mb-10 p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl
        ${isDarkMode 
          ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
          : 'bg-white border-gray-100 hover:border-blue-100 shadow-sm'
        }`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {item.company}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border 
                ${isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
                {item.type}
              </span>
            </div>
          </div>
          
          <div className={`flex flex-col text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-xs" /> {item.duration}
            </span>
            <span className="flex items-center gap-2 mt-1">
              <FaMapMarkerAlt className="text-xs" /> {item.location}
            </span>
          </div>
        </div>

        {/* Description: Bullet Points for Scannability */}
        <ul className={`list-disc list-outside ml-4 space-y-2 mb-6 text-sm leading-relaxed
          ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {item.description.map((point, idx) => (
            <li key={idx} className="pl-1">{point}</li>
          ))}
        </ul>

        {/* Footer: Tech Stack */}
        <div className={`flex flex-wrap gap-2 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          {item.technologies.map((tech, i) => (
            <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-md 
              ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TrainingCard = ({ item, isDarkMode }) => (
  <motion.div variants={cardVariants} className={`flex items-start gap-4 mb-6`}>
    <div className={`p-3 rounded-lg shrink-0 ${isDarkMode ? 'bg-gray-800 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
      <item.icon />
    </div>
    <div>
      <h4 className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</h4>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {item.company} • {item.duration}
      </p>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {item.description}
      </p>
    </div>
  </motion.div>
);

const Experience = ({ isDarkMode }) => {
  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 tracking-tight 
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Professional <span className="text-blue-600">Experience</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A timeline of my professional roles, technical contributions, and career milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Professional Timeline (Left Side / Top - 2/3 width) */}
          <motion.div 
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
             <h3 className={`text-xl font-bold mb-8 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
               <FaBriefcase className="text-blue-500" /> Career History
             </h3>
            
            <div className="pl-2">
              {workHistory.map((item) => (
                <ExperienceCard key={item.id} item={item} isDarkMode={isDarkMode} />
              ))}
            </div>
          </motion.div>

          {/* Education & Training Sidebar (Right Side / Bottom - 1/3 width) */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className={`sticky top-8 p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <FaCertificate className="text-purple-500" /> Certifications & Training
              </h3>
              
              <div className="flex flex-col">
                {trainingHistory.map((item) => (
                  <TrainingCard key={item.id} item={item} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
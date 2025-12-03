import React from 'react';
// Imported all necessary icons
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCodeBranch, FaLink, FaTools, FaLaptopCode, FaRobot, FaMicrochip } from 'react-icons/fa';


const timelineData = [
  {
    id: 1,
    title: 'Senior Frontend Developer || Web Design Specialist',
    company: '¡GITREE',
    duration: 'July 2024 - Present (1 year 5 months)',
    location: 'Nyarugenge District, Kigali City, Rwanda',
    description: "Led the design and development of high-impact, user-centered digital solutions for the health and human services sector. Focused on building intuitive, accessible, and scalable user interfaces, collaborating with cross-functional teams to transform complex requirements into clean, functional web products. Responsibilities include designing seamless UX flows, developing high-performance frontend systems, and translating product needs into modern web experiences.",
    technologies: ['React/Modern JS', 'UX Design', 'Optimized Frontend Architecture', 'Responsive/Accessible UI', 'Analytics'],
    type: 'Professional', 
    icon: FaLaptopCode,
    link: '#' 
  },
  {
    id: 5,
    title: 'Computer Technician',
    company: 'Technology Channel (Training Company)',
    duration: 'July 2024 - September 2024 (3 months) - Note: This overlaps with Igitree/Elco dates in source.',
    location: 'Nepal',
    description: "Developed strong computer literacy and technical skills through comprehensive training in software applications, hardware basics, and troubleshooting. Enhanced ability to quickly learn and adapt to new technologies and apply practical IT knowledge in real-world scenarios.",
    technologies: ['Computer Literacy', 'Hardware Basics', 'Software Training', 'Troubleshooting', 'Adaptability'],
    type: 'Education/Field',
    icon: FaTools,
    link: '#'
  },
  {
    id: 2,
    title: 'Technical Assistant',
    company: 'Elco.ltd',
    duration: 'August 2023 - August 2024 (1 year 1 month)',
    location: 'Kicukiro District, Kigali City, Rwanda',
    description: "Managed a wide range of hardware and software technical tasks, including fixing and replacing components in computers and printers, diagnosing issues, and ensuring devices ran smoothly. Provided software support (installations, updates, troubleshooting errors) and handled basic network configuration, significantly strengthening problem-solving and adaptability.",
    technologies: ['Hardware Troubleshooting', 'Software Installation/Configuration', 'Network Basics', 'IT Support', 'Problem-Solving'],
    type: 'Professional',
    icon: FaTools,
    link: '#' 
  },
  {
    id: 3,
    title: 'Robotics Developer',
    company: 'Boeing (ThinkYoung & Boeing Coding School)',
    duration: 'April 2023 - April 2024 (1 year 1 month)',
    location: 'Kimihurura, Kigali City, Rwanda',
    description: "Gained hands-on exposure to core principles of robotics, automation, and drone systems. Learned robot programming (commands, sensor data interpretation, control mechanisms) and explored drone technology, studying flight control, navigation algorithms, and motor coordination. Experience significantly strengthened problem-solving, logical reasoning, and analytical thinking.",
    technologies: ['Robotics Programming', 'Drone Technology', 'Automation', 'Flight Control', 'System Integration'],
    type: 'Education/Field',
    icon: FaRobot,
    link: '#' 
  },
  {
    id: 4,
    title: 'Software Developer',
    company: 'ThinkYoung (Coding Class)',
    duration: 'April 2023 - April 2023 (1 month)',
    location: 'Kimihurura, Kigali City, Rwanda',
    description: "Engaged in an intensive, hands-on program, gaining practical experience coding with JavaScript, Python, HTML/CSS, PictoBlox, and Arduino. Designed and programmed a functional robotic car, integrating sensors and automation logic. Strengthened critical skills like problem-solving, logical reasoning, and technical adaptability in combining software and hardware.",
    technologies: ['JavaScript', 'Python', 'HTML/CSS', 'Arduino', 'Robotic Car Design', 'System Integration'],
    type: 'Education/Field',
    icon: FaMicrochip,
    link: '#' 
  },
  { 
    id: 6,
    title: 'Full-stack Developer',
    company: 'NATCOM SERVICES RWANDA',
    duration: 'Mar 2022 - Mar 2025 (3 yrs 1 mo)',
    location: 'Kimihurura, Kigali City, Rwanda · Hybrid',
    description: "During this internship, I strengthened my technical foundation and grew into a capable full-stack developer, gaining practical experience on both the frontend and backend of web applications. My responsibilities included building UIs, developing server-side logic, managing databases, and deploying websites. The internship concluded with my final full-stack project, MEMO (Memorize), a complete system that earned official certification from Natcom.",
    technologies: ['Front-End Development', 'Back-End Web Development', 'Web Design', 'Web Hosting'],
    type: 'Professional',
    icon: FaLaptopCode,
    link: '#'
  },
];

// --- Experience Card Component (MODIFIED for Left-Aligned Text in Alternating Layout) ---
const ExperienceCard = ({ item, isDarkMode, index }) => {
  const isProfessional = item.type === 'Professional';
  
  // Custom colors: Blue for Professional, Purple for Education/Field
  const iconColor = isProfessional ? 'text-blue-500' : 'text-purple-500';
  const borderColor = isProfessional ? 'border-blue-500' : 'border-purple-500';

  // Fallback to FaBriefcase if no icon is specified
  const DynamicIcon = item.icon || FaBriefcase; 

  // Determine alignment: even index is LEFT, odd index is RIGHT
  const isRightAligned = index % 2 !== 0;

  // Base classes for the card container (uses flex-col for mobile, responsive classes for desktop)
  const baseCardClasses = `flex flex-col relative group mb-12 lg:mb-16`;
  
  // Alignment classes for large screens (S-Curve - NO CHANGE HERE)
  const alignmentClasses = isRightAligned 
    ? 'lg:flex-row-reverse lg:justify-start' 
    : 'lg:flex-row lg:justify-start';

  // Card body margins and width (NO CHANGE HERE)
  const cardBodyClasses = isRightAligned
    ? 'w-full lg:w-4/5 lg:pl-4 lg:pr-0 lg:ml-auto lg:mr-0' 
    : 'w-full lg:w-4/5 lg:pr-4 lg:pl-0 lg:ml-0 lg:mr-auto'; 

  // --- START OF TEXT ALIGNMENT CHANGES ---
  // Text alignment for the card content is now always left
  const textAlignmentClasses = 'lg:text-left'; 
  // --- END OF TEXT ALIGNMENT CHANGES ---


  return (
    <div className={`${baseCardClasses} ${alignmentClasses}`}>
      
      {/* --- Central Timeline Icon & Connector (Only visible on large screens) --- */}
      <div className="hidden lg:flex lg:flex-col lg:items-center absolute left-1/2 top-0 transform -translate-x-1/2 h-full z-10">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-20 
          ${isDarkMode ? 'bg-gray-900 border-4 border-gray-700' : 'bg-white border-4 border-gray-200'}
          ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
          <DynamicIcon className={`text-base ${iconColor}`} /> 
        </div>
        {/* Horizontal Connector Line for alternating view */}
        <div className={`absolute top-4 w-4 h-0.5 z-10 
            ${isRightAligned ? 'right-full' : 'left-full'} 
            ${isProfessional ? 'bg-blue-500' : 'bg-purple-500'}`}>
        </div>
      </div>
      
      {/* --- Card Body --- */}
      <div className={`p-0 transition-all duration-300 ${cardBodyClasses}`}>
        <div className={`rounded-xl p-5 shadow-lg border-t-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} ${borderColor}`}>
          
          {/* Title & Company - Now always left-aligned */}
          <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${textAlignmentClasses}`}>
            {item.title}
          </h3>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} ${textAlignmentClasses}`}>
            {item.company}
          </p>

          {/* Details - Now always justify-start (left-aligned) */}
          {/* Removed the ${isRightAligned ? 'lg:justify-end' : 'lg:justify-start'} logic */}
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} lg:justify-start`}>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" /> {item.duration}
            </span>
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-xs" /> {item.location}
            </span>
            {item.type && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isProfessional ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                  {item.type}
                </span>
            )}
          </div>
          
          {/* Description - Now always left-aligned */}
          <p className={`mt-4 text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${textAlignmentClasses}`}>
            {item.description}
          </p>

          {/* Technologies & Link - Now always justify-start (left-aligned) */}
          <div className={`mt-4 pt-3 border-t border-gray-700 dark:border-gray-600`}>
            {/* Removed the ${isRightAligned ? 'lg:justify-end' : 'lg:justify-start'} logic */}
            <div className={`flex flex-wrap items-center gap-2 lg:justify-start`}>
              <span className={`text-sm font-semibold mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FaCodeBranch className="inline-block mr-1" /> Stack:
              </span>
              {/* Removed the ${isRightAligned ? 'lg:order-last' : ''} logic for technology tags */}
              {item.technologies.map((tech, i) => (
                <span key={i} className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? 'text-gray-200 bg-gray-600/50' : 'text-gray-800 bg-gray-200'}`}>
                  {tech}
                </span>
              ))}
              {item.link !== '#' && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  // Removed the alignment classes for the link
                  className={`text-sm font-semibold flex items-center gap-1 ml-auto ${isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>
                  <FaLink /> View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Small Screen/Mobile Vertical Line (Preserved) --- */}
      {/* On small screens, use the old vertical timeline effect on the side */}
      <div className="flex flex-col items-center ml-6 lg:hidden">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
          ${isDarkMode ? 'bg-gray-900 border-4 border-gray-700' : 'bg-white border-4 border-gray-200'}
          ${borderColor} group-hover:scale-110 transition-transform duration-300 absolute -left-10`}>
          <DynamicIcon className={`text-base ${iconColor}`} /> 
        </div>
        {/* Only show the line if it's not the last item */}
        <div className={`w-0.5 h-full ${isProfessional ? 'bg-blue-500' : 'bg-purple-500'} opacity-50 group-last:h-0 absolute -left-6 top-0`}></div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Experience = ({ isDarkMode }) => {
  const professionalExperience = timelineData.filter(item => item.type === 'Professional').length;
  const educationExperience = timelineData.filter(item => item.type.includes('Education')).length;

  return (
    <div className="p-2 xs:p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Summary */}
        <div className="text-center mb-10">
          <h1 className={`text-3xl xs:text-4xl sm:text-5xl font-extrabold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Professional Journey & Milestones 🚀
          </h1>
        </div>

        {/* Timeline Layout (S-Curve with Left-Aligned Text) */}
        <div className={`relative ${isDarkMode ? 'before:bg-gray-700' : 'before:bg-gray-300'} 
          lg:before:content-[''] lg:before:absolute lg:before:top-0 lg:before:bottom-0 lg:before:left-1/2 lg:before:w-0.5 lg:before:transform lg:before:-translate-x-1/2`}>
          
          {timelineData.map((item, index) => (
            <ExperienceCard 
              key={item.id} 
              item={item} 
              isDarkMode={isDarkMode} 
              index={index} // Pass index to alternate card alignment
            />
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default Experience;
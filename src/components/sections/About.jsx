import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion' // Requires: npm install framer-motion
import IBRAResume from '../../Resume/IBRAResume.pdf'
import ProfileImage from '../../images/Profile.jpg'
import { 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaBriefcase, 
  FaDownload, 
  FaCheck, 
  FaSpinner, 
  FaAward,
  FaUniversity 
} from 'react-icons/fa' 

const About = ({ isDarkMode }) => { 
  // --- Animation Variants (The "High Value" feel) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Staggers the animation of children
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.2 },
  };

  // --- Download Logic ---
  const [downloadState, setDownloadState] = useState('initial');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadLinkRef = useRef(null); 

  const handleDownload = (e) => {
    e.preventDefault(); 
    if (downloadState === 'initial' || downloadState === 'complete') {
      setDownloadState('loading');
      setDownloadProgress(0);
      const duration = 1500; 
      const interval = 100;
      let progress = 0;

      const loadingInterval = setInterval(() => {
        progress += (interval / duration) * 100;
        if (progress < 100) {
          setDownloadProgress(Math.min(99, Math.round(progress)));
        } else {
          clearInterval(loadingInterval);
          setDownloadProgress(100);
          setDownloadState('complete');
          if (downloadLinkRef.current) downloadLinkRef.current.click();
          setTimeout(() => {
            setDownloadState('initial');
            setDownloadProgress(0);
          }, 3000); 
        }
      }, interval);
    }
  };

  // --- Professional Data ---
  
  const highlights = [
    {
      label: 'Professional Experience',
      value: '3+ Years',
      desc: 'Full-Stack Engineering',
      color: 'border-l-4 border-blue-500'
    },
    {
      label: 'Community Leadership',
      value: 'Founder',
      desc: 'Code4Impact Rwanda',
      color: 'border-l-4 border-purple-500'
    },
    {
      label: 'Strategic Focus',
      value: 'Social Impact',
      desc: 'Scalable Architecture',
      color: 'border-l-4 border-emerald-500'
    }
  ]
  
  // Updated with SOD (High School) and Degree
  const educationDetails = [
    { 
        type: 'Degree (In Progress)', 
        title: 'B.S. Software Engineering', 
        place: 'University Level',
        icon: <FaGraduationCap /> 
    },
    { 
        type: 'Technical Diploma', 
        title: 'Software Development (SOD)', 
        place: 'Advanced Technical Completion',
        icon: <FaAward /> 
    }
  ];

  const personalDetails = [
    { label: 'Location', value: 'Kigali, Rwanda', icon: <FaMapMarkerAlt /> },
    { label: 'Languages', value: 'English (Pro), Kinyarwanda, Swahili', icon: <FaGlobe /> },
  ];

  // --- Render Download Button ---
  const renderDownloadButtonContent = () => {
    switch (downloadState) {
      case 'loading':
        return (
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin" /> 
            <span>Processing... {downloadProgress}%</span>
          </div>
        );
      case 'complete':
        return (
          <span className="flex items-center gap-2">
            <FaCheck /> Success
          </span>
        );
      case 'initial':
      default:
        return (
          <span className="flex items-center gap-2">
            <FaDownload /> Download Professional CV
          </span>
        );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 lg:p-12 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      
      {/* Main Animated Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12`}
      >

        {/* --- LEFT COLUMN: Profile Identity (md:col-span-4) --- */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col items-center md:items-start space-y-8">
            
            {/* Image container with subtle pulse animation */}
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
            >
                <div className={`w-48 h-48 rounded-2xl overflow-hidden border-[3px] ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-2xl`}>
                    <img 
                        src={ProfileImage} 
                        alt="Tuyizere Ibrahim" 
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Status Dot */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900" title="Available for Hire"></div>
            </motion.div>

            {/* Name & Title */}
            <div className="text-center md:text-left space-y-2">
                <h1 className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tuyizere Ibrahim
                </h1>
                <p className={`text-xl font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Software Engineer
                </p>
            </div>

            {/* Info Cards (Education & Location) */}
            <div className="w-full space-y-6">
                
                {/* Education Block - Pro Look */}
                <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest opacity-50 font-bold mb-2">Education History</h4>
                    {educationDetails.map((item, idx) => (
                         <div key={idx} className={`flex items-start gap-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/40' : 'bg-gray-100/50'}`}>
                            <span className={`mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.icon}</span>
                            <div>
                                <span className={`block font-bold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.title}</span>
                                <span className="block text-xs opacity-70">{item.place}</span>
                                <span className="block text-[10px] uppercase opacity-50 mt-1 font-semibold">{item.type}</span>
                            </div>
                         </div>
                    ))}
                </div>

                {/* Personal Details */}
                <div className="space-y-3">
                     {personalDetails.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                            <span className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.icon}</span>
                            <div>
                                <span className="block font-semibold text-[10px] opacity-60 uppercase tracking-wider">{item.label}</span>
                                <span className="block">{item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Download Button */}
            <motion.div whileTap={{ scale: 0.95 }} className="w-full pt-2">
                 <button 
                    onClick={handleDownload}
                    disabled={downloadState === 'loading'}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all shadow-lg flex justify-center items-center gap-2
                      ${downloadState === 'complete' 
                        ? 'bg-emerald-600 text-white' 
                        : isDarkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                    {renderDownloadButtonContent()}
                  </button>
                  <a href={IBRAResume} download="Tuyizere_Ibrahim_CV.pdf" ref={downloadLinkRef} className="hidden" />
            </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: Narrative & Impact (md:col-span-8) --- */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-10">
            
            {/* Professional Summary */}
            <motion.div variants={itemVariants} className={`p-8 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-gray-800/20 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                   <FaBriefcase /> Executive Profile
                </h2>
                <div className="space-y-4 text-lg leading-relaxed opacity-90">
                    <p>
                        I am a Software Engineer focused on translating complex business requirements into robust, production-grade architectures. My expertise lies in full-stack development, where I prioritize clean code, scalability, and system security.
                    </p>
                    <p>
                        My technical journey is grounded in a strong academic foundation, holding a <span className="font-semibold">Technical Diploma in Software Development (SOD)</span> and currently advancing through a <span className="font-semibold">Bachelor’s in Software Engineering</span>. This blend of formal education and practical experience ensures my solutions are both innovative and theoretically sound.
                    </p>
                    <p>
                        Beyond individual contribution, I founded <span className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} font-bold`}>Code4Impact Rwanda</span>, demonstrating my ability to lead teams, mentor talent, and drive community-centric technological solutions.
                    </p>
                </div>
            </motion.div>

            {/* Impact Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {highlights.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        whileHover={hoverEffect}
                        className={`p-6 rounded-xl shadow-sm border-t-4 ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-100'} ${item.color.replace('border-l-4', 'border-t-4')}`}
                    >
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{item.label}</p>
                        <p className="text-2xl font-bold mb-1">{item.value}</p>
                        <p className="text-sm opacity-80">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Value Proposition */}
            <motion.div variants={itemVariants} className={`p-6 rounded-xl border-l-4 ${isDarkMode ? 'bg-blue-900/10 border-blue-500' : 'bg-blue-50 border-blue-600'}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                        <FaUniversity className="text-xl" />
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Hire Me?</h3>
                        <p className="text-sm mt-1 opacity-80 leading-relaxed">
                            I bridge the gap between "academic theory" and "market reality." I don't just write syntax; I engineer solutions that solve business problems, backed by a verified history of leadership and technical education.
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>

      </motion.div>
    </div>
  )
}

export default About
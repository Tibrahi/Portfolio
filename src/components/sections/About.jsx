import React, { useState, useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IBRAResume from '../../Resume/IBRAResume.pdf';
import ProfileImage from '../../images/Profile.jpg';
import CompanyLogo from '../../images/logo.png';
import { 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaBriefcase, 
  FaDownload, 
  FaCheck, 
  FaSpinner, 
  FaAward,
  FaRocket,
  FaCode,
  FaServer
} from 'react-icons/fa';

// --- Static Data Moved Outside Component to Prevent Re-creation ---
const HIGHLIGHTS = [
  {
    label: 'Experience',
    value: '4+ Years',
    desc: 'Full-Stack Engineering',
    icon: <FaCode className="text-blue-500" />,
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    label: 'Leadership',
    value: 'Founder',
    desc: 'TIXLOGIC',
    icon: <FaRocket className="text-purple-500" />,
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    label: 'Expertise',
    value: 'System Arch',
    desc: 'Scalable Solutions',
    icon: <FaServer className="text-emerald-500" />,
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500/10'
  }
];

const EDUCATION_DETAILS = [
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

const LANGUAGES = ['English', 'Kinyarwanda', 'Swahili'];

// --- Animation Variants ---
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60, damping: 15 } },
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  }
};

const About = ({ isDarkMode }) => { 
  // --- State & Refs ---
  const [downloadState, setDownloadState] = useState('initial');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadLinkRef = useRef(null); 

  // --- Optimized Handlers ---
  const handleDownload = useCallback((e) => {
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
          
          if (downloadLinkRef.current) {
            downloadLinkRef.current.click();
          }
          
          setTimeout(() => {
            setDownloadState('initial');
            setDownloadProgress(0);
          }, 3000); 
        }
      }, interval);
    }
  }, [downloadState]);

  // --- Memoized UI Components ---
  const DownloadButtonContent = useMemo(() => {
    if (downloadState === 'loading') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-lg" /> 
          <span>Processing... {downloadProgress}%</span>
        </motion.div>
      );
    }
    if (downloadState === 'complete') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <FaCheck className="text-lg" /> <span>Download Success</span>
        </motion.div>
      );
    }
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
        <FaDownload className="text-lg" /> <span>Download Resume</span>
      </motion.div>
    );
  }, [downloadState, downloadProgress]);

  return (
    <section 
      aria-label="About Me" 
      className={`min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
    >
      <motion.div 
        variants={ANIMATIONS.container}
        initial="hidden"
        animate="show"
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
      >
        
        {/* ================= LEFT COLUMN: Personal Identity (col-span-4) ================= */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8">
            
            {/* Profile Image */}
            <motion.div variants={ANIMATIONS.item} whileHover={{ scale: 1.03 }} className="relative group">
                <div className={`w-56 h-56 rounded-3xl overflow-hidden border-4 ${isDarkMode ? 'border-gray-800 shadow-blue-900/20' : 'border-white shadow-xl'} shadow-2xl transition-all duration-300`}>
                    <img 
                        src={ProfileImage} 
                        alt="Tuyizere Ibrahim - Profile" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                <div 
                  className={`absolute -bottom-3 -right-3 w-8 h-8 rounded-full border-4 ${isDarkMode ? 'border-gray-900 bg-emerald-500' : 'border-white bg-emerald-500'}`} 
                  title="Available for Opportunities"
                  aria-label="Available Status Indicator"
                />
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={ANIMATIONS.item} className="text-center lg:text-left space-y-2 w-full">
                <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tuyizere Ibrahim
                </h1>
                <p className={`text-xl font-semibold tracking-wide ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    Software Engineer
                </p>
            </motion.div>

            {/* Quick Details */}
            <motion.div variants={ANIMATIONS.item} className="w-full space-y-5">
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest opacity-60 mb-0.5">Location</span>
                    <span className="text-base">Kigali, Rwanda</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <FaGlobe className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest opacity-60 mb-0.5">Languages</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {LANGUAGES.map((lang) => (
                        <span key={lang} className={`px-2 py-0.5 text-xs rounded-md ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            </motion.div>

            {/* Download Button */}
            <motion.div variants={ANIMATIONS.item} className="w-full pt-4">
                 <button 
                    onClick={handleDownload}
                    disabled={downloadState === 'loading'}
                    aria-label="Download Professional CV"
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg flex justify-center items-center gap-2
                      ${downloadState === 'complete' 
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25' 
                        : isDarkMode 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white shadow-gray-900/20'} 
                      focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
                  >
                    <AnimatePresence mode="wait">
                      {DownloadButtonContent}
                    </AnimatePresence>
                  </button>
                  <a href={IBRAResume} download="Tuyizere_Ibrahim_CV.pdf" ref={downloadLinkRef} className="hidden" aria-hidden="true" />
            </motion.div>
        </div>

        {/* ================= RIGHT COLUMN: Narrative & Impact (col-span-8) ================= */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-8">
            
            {/* Executive Profile */}
            <motion.div variants={ANIMATIONS.item}>
                <div className="flex items-center gap-3 mb-6">
                  <FaBriefcase className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h2 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                     Executive Profile
                  </h2>
                </div>
                <div className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white border-gray-100 shadow-sm'} space-y-5 text-base sm:text-lg leading-relaxed`}>
                    <p>
                        I am a <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Software Engineer and Full Stack Developer</strong> dedicated to translating complex business requirements into robust, production-grade architectures. My expertise lies in building scalable software systems that drive modern web experiences while strictly adhering to high-level engineering standards.
                    </p>
                    <p>
                        Beyond my individual technical contributions, I am the <strong className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>Founder of TIXLOGIC</strong>. Through my company, I architect and deliver enterprise software solutions, focusing on clean code, system security, and resolving complex, real-world business challenges.
                    </p>
                    <p>
                        My practical market experience is reinforced by a strong academic foundation. Holding a Technical Diploma in Software Development and advancing through a Bachelor’s in Software Engineering, I consistently bridge the gap between rigorous academic theory and fast-paced market reality.
                    </p>
                </div>
            </motion.div>

            {/* Dedicated TIXLOGIC Section */}
            <motion.div variants={ANIMATIONS.item} className={`relative overflow-hidden p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-md'}`}>
               {/* Decorative background accent */}
               <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 rounded-full blur-3xl opacity-30 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-300'}`} aria-hidden="true" />
               
               <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className={`shrink-0 p-4 rounded-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white shadow-sm border border-gray-100'}`}>
                    <img src={CompanyLogo} alt="TIXLOGIC Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                      Company Founder
                    </span>
                    <h3 className={`text-2xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TIXLOGIC</h3>
                    <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Building enterprise-grade applications, providing scalable system architecture, and delivering comprehensive technical solutions for modern businesses.
                    </p>
                  </div>
               </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div variants={ANIMATIONS.item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {HIGHLIGHTS.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        whileHover="hover"
                        variants={ANIMATIONS.hover}
                        className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-800/60 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'} transition-colors relative overflow-hidden`}
                    >
                        {/* Top color bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.bgColor}`} />
                        
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item.label}</p>
                          <div className={`p-2 rounded-lg ${item.bgColor}`}>{item.icon}</div>
                        </div>
                        <p className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                        <p className="text-sm font-medium opacity-80">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Education History */}
            <motion.div variants={ANIMATIONS.item} className="pt-4">
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Academic Foundation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EDUCATION_DETAILS.map((item, idx) => (
                       <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-50 border-gray-100'}`}>
                          <div className={`p-3 rounded-xl mt-1 ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-white shadow-sm text-blue-600'}`}>
                            {item.icon}
                          </div>
                          <div>
                              <span className={`block font-bold text-base mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.title}</span>
                              <span className="block text-sm opacity-70 mb-2">{item.place}</span>
                              <span className={`inline-block px-2 py-1 text-[10px] uppercase font-bold rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                {item.type}
                              </span>
                          </div>
                       </div>
                  ))}
                </div>
            </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

// Memoize to prevent unnecessary re-renders if parent state changes (e.g., layout shifts outside of dark mode toggle)
export default memo(About);
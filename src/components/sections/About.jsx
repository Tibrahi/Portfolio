import React, { useState, useRef } from 'react' 
import IBRAResume from '../../Resume/IBRAResume.pdf'
import ProfileImage from '../../images/Profile.jpg'
import { FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaBriefcase, FaDownload, FaCheck, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa' 

const About = ({ isDarkMode, setActiveSection }) => { 
  // --- Download Logic (Kept exactly as is for functionality) ---
  const [downloadState, setDownloadState] = useState('initial');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadLinkRef = useRef(null); 

  const handleDownload = (e) => {
    e.preventDefault(); 
    if (downloadState === 'initial' || downloadState === 'complete') {
      setDownloadState('loading');
      setDownloadProgress(0);
      const duration = 2000; // Slightly faster for professional feel
      const interval = 200;
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

  // --- Refined Data for Professional Context ---
  
  // Focused on "Impact" rather than "Stats"
  const highlights = [
    {
      label: 'Experience',
      value: '3+ Years',
      desc: 'Full-Stack Development',
      color: 'border-l-4 border-blue-500'
    },
    {
      label: 'Leadership',
      value: 'Founder',
      desc: 'Code4Impact Rwanda',
      color: 'border-l-4 border-purple-500'
    },
    {
      label: 'Focus',
      value: 'Social Impact',
      desc: 'Scalable Tech Solutions',
      color: 'border-l-4 border-emerald-500'
    }
  ]
  
  // Concise details
  const professionalDetails = [
    { label: 'Location', value: 'Kigali, Rwanda', icon: <FaMapMarkerAlt /> },
    { label: 'Languages', value: 'English (Professional), Kinyarwanda, Swahili', icon: <FaGlobe /> },
    { label: 'Education', value: 'B.S. Software Engineering (In Progress)', icon: <FaGraduationCap /> },
  ]

  // --- Render Logic for Download Button ---
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
            <FaDownload /> Download Resume / CV
          </span>
        );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 lg:p-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
      
      {/* Main Card Container - Clean and Centered */}
      <div className={`max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8`}>

        {/* --- LEFT COLUMN: Profile & Action (md:col-span-4) --- */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6">
            
            {/* Image container - Minimalist Circle */}
            <div className="relative group">
                <div className={`w-40 h-40 rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-lg`}>
                    <img 
                        src={ProfileImage} 
                        alt="Tuyizere Ibrahim" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Name & Title */}
            <div className="text-center md:text-left">
                <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tuyizere Ibrahim
                </h1>
                <p className={`text-lg font-medium mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Software Engineer
                </p>
                <p className="text-sm opacity-75 mt-1">Full-Stack Architecture & Community Leadership</p>
            </div>

            {/* Professional Details List */}
            <div className="w-full space-y-3 pt-2">
                {professionalDetails.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                        <span className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.icon}</span>
                        <div>
                            <span className="block font-semibold text-xs opacity-60 uppercase tracking-wider">{item.label}</span>
                            <span className="block">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action Area */}
            <div className="w-full pt-4">
                 <button 
                    onClick={handleDownload}
                    disabled={downloadState === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-sm transition-all shadow-sm flex justify-center items-center
                      ${downloadState === 'complete' 
                        ? 'bg-green-600 text-white' 
                        : isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                          : 'bg-gray-900 hover:bg-black text-white'}`}>
                    {renderDownloadButtonContent()}
                  </button>
                  {/* Hidden Link */}
                  <a href={IBRAResume} download="Tuyizere_Ibrahim_CV.pdf" ref={downloadLinkRef} className="hidden" />
            </div>
        </div>

        {/* --- RIGHT COLUMN: Narrative & Impact (md:col-span-8) --- */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-8">
            
            {/* Professional Summary */}
            <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <h2 className={`text-xl font-bold uppercase tracking-widest border-b pb-2 ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'}`}>
                    Professional Summary
                </h2>
                <p className="leading-relaxed text-base md:text-lg">
                    I am a results-oriented Software Engineer dedicated to building robust digital infrastructure. With a strong foundation in full-stack development, I transition complex requirements into scalable, production-ready applications. 
                </p>
                <p className="leading-relaxed text-base md:text-lg">
                    Beyond code, I am the founder of <span className="font-semibold text-blue-500">Code4Impact Rwanda</span>, where I lead a community of developers focused on solving real-world challenges through technology. I balance active professional contributions with my academic pursuit of a Bachelor's in Software Engineering, ensuring my work is grounded in both theoretical principles and modern industry standards.
                </p>
            </div>

            {/* High Level Stats / Impact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-r-lg shadow-sm ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'} ${item.color}`}>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-50 mb-1">{item.label}</p>
                        <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                        <p className="text-sm opacity-80 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* "Why Me" Section - Replaces the Skills Cloud */}
            <div className={`p-5 rounded-lg border ${isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-blue-50/50 border-blue-100'}`}>
                <div className="flex items-start gap-3">
                    <FaBriefcase className={`mt-1 text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div>
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Value Proposition</h3>
                        <p className="text-sm mt-1 opacity-90">
                            I focus on clean architecture, maintainable codebases, and user-centric design. I don't just write code; I build solutions that align with business goals and drive social impact.
                        </p>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  )
}

export default About
import React, { useState, useRef } from 'react' 
import IBRAResume from '../../Resume/IBRAResume.pdf'
import ProfileImage from '../../images/Profile.jpg'
import { FaGraduationCap, FaMapMarkerAlt, FaGlobe, FaCodeBranch, FaTachometerAlt, FaHammer, FaDownload, FaEnvelope, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaCheck, FaSpinner } from 'react-icons/fa' 

const About = ({ isDarkMode, setActiveSection }) => { 
  // State for the Resume download button: 'initial', 'loading', 'complete'
  const [downloadState, setDownloadState] = useState('initial');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadLinkRef = useRef(null); // Ref to manually trigger the <a> tag download

  // --- Functions ---
  // handleContactClick is no longer used, but kept for context/to avoid errors if it's called elsewhere.
  const handleContactClick = () => {
    setActiveSection('contact')
  }

  const handleDownload = (e) => {
    // Prevent default browser download on click to manage it manually
    e.preventDefault(); 
    
    if (downloadState === 'initial' || downloadState === 'complete') {
      setDownloadState('loading');
      setDownloadProgress(0);
      
      const duration = 3000; // 3 seconds download simulation
      const interval = 300;
      let progress = 0;

      // Simulate loading progress
      const loadingInterval = setInterval(() => {
        progress += (interval / duration) * 100;
        if (progress < 100) {
          setDownloadProgress(Math.min(99, Math.round(progress)));
        } else {
          clearInterval(loadingInterval);
          setDownloadProgress(100);
          setDownloadState('complete');
          
          // CRITICAL: Manually trigger the download link after simulation
          if (downloadLinkRef.current) {
            downloadLinkRef.current.click();
          }
          
          // Reset button state after a short delay
          setTimeout(() => {
            setDownloadState('initial');
            setDownloadProgress(0);
          }, 2000); // Show "Complete" for 2 seconds
        }
      }, interval);
    }
  };

  // --- Data Arrays ---
  const stats = [
    {
      label: 'Projects Completed',
      value: '9+',
      icon: <FaHammer className="text-xl" />,
      color: 'text-indigo-500'
    },
    {
      label: 'Years Experience',
      value: '3',
      icon: <FaTachometerAlt className="text-xl" />,
      color: 'text-emerald-500'
    },
    {
      label: 'Open Source Contributions',
      value: '10+',
      icon: <FaCodeBranch className="text-xl" />,
      color: 'text-pink-500'
    }
  ]
  
  const skills = [
    { name: 'JavaScript', icon: <FaJs className="text-yellow-500" /> },
    { name: 'React', icon: <FaReact className="text-blue-400" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS/Tailwind', icon: <FaCss3Alt className="text-blue-500" /> },
  ]
  
  const keyFacts = [
    { title: 'Education', value: 'Certified Software Developer', icon: <FaGraduationCap /> },
    { title: 'Location', value: 'Kigali, Rwanda', icon: <FaMapMarkerAlt /> },
    { title: 'Languages', value: 'English, Kinyarwanda, Swahili', icon: <FaGlobe /> }
  ]

  const achievements = [
    { title: 'Founder of Code4Impact Rwanda', description: 'Leading a community of developers focused on social impact through technology.', icon: '🏆' },
    { title: 'Open Source Contributor', description: 'Active contributor to various open-source projects.', icon: '🌟' }
  ]

  // --- Render Logic for Download Button ---
  const renderDownloadButtonContent = () => {
    switch (downloadState) {
      case 'loading':
        const progressWidth = `${downloadProgress}%`;
        return (
          <div className="relative w-full h-full flex items-center justify-center text-sm">
            {/* Progress Bar Background */}
            <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-emerald-600/30' : 'bg-emerald-300/50'}`}></div>
            {/* Actual Progress Bar */}
            <div 
              style={{ width: progressWidth }}
              className={`absolute left-0 top-0 bottom-0 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'}`}>
            </div>
            {/* Content Overlay */}
            <span className={`relative flex items-center gap-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FaSpinner className="animate-spin" /> Downloading... {downloadProgress}%
            </span>
          </div>
        );
      case 'complete':
        return (
          <span className="flex items-center justify-center gap-2 text-white bg-green-500 p-2 rounded-xl w-full">
            <FaCheck /> Download Complete!
          </span>
        );
      case 'initial':
      default:
        return (
          <span className="flex items-center justify-center gap-2">
            <FaDownload /> Download Resume
          </span>
        );
    }
  };

  return (
    // Base layout: Full screen height, vertical flex container
    <div className={`p-4 h-screen flex flex-col ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>

      {/* 🚀 1. HERO HEADER (2-Column Layout for Image/Name vs Title/Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-shrink-0">
        
        {/* LEFT SIDE: Image and Name (Centered on small screens, left-aligned on MD+) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left relative">
            {/* Profile Image */}
            <div className="relative mx-auto md:mx-0 w-28 xs:w-32 sm:w-40 h-28 xs:h-32 sm:h-40 mb-3"> 
                <div className={`absolute inset-0 rounded-full border-4 ${
                    isDarkMode ? 'border-blue-500' : 'border-blue-400'
                } overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300`}>
                    <img 
                        src={ProfileImage} 
                        alt="Tuyizere Ibrahim" 
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center -10%', transform: 'scale(1.1)' }}
                    />
                </div>
                <div className={`absolute -inset-2 rounded-full border-2 ${
                    isDarkMode ? 'border-blue-400/30' : 'border-blue-300/30'
                } animate-pulse`}></div>
            </div>

            {/* Name */}
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl font-extrabold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'} relative z-10`}>
                TUYIZERE IBRAHIM
            </h1>
            <p className={`text-md xs:text-lg sm:text-xl font-medium relative z-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Full-Stack Developer | Impact-Driven
            </p>
        </div>
        
        {/* RIGHT SIDE: Title/Tagline and Metrics (Visible on MD+ screens) */}
        <div className="flex flex-col justify-center items-stretch space-y-3">
          
        
          {/* 📊 METRICS/STATISTICS BAR */}
          <div className={`grid grid-cols-3 gap-2 p-3 rounded-xl shadow-inner ${isDarkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-gray-100 border border-gray-200'} max-w-5xl mx-auto flex-shrink-0`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-1">
                <div className={`flex justify-center items-center mb-0.5 ${stat.color}`}>
                  {stat.icon}
                  <p className="text-2xl xs:text-3xl font-extrabold ml-1">{stat.value}</p>
                </div>
                <p className="text-xs xs:text-sm font-medium opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className={`my-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} flex-shrink-0`} />

      {/* 💻 3. MAIN CONTENT (Two-Column Layout for better flow) - Takes up the REMAINING vertical space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto flex-grow overflow-hidden">
        
        {/* LEFT COLUMN: About & Skills (Scrollable within column if content overflows) */}
        <div className="lg:col-span-2 space-y-3 overflow-y-auto pr-2"> {/* Added overflow-y-auto here */}
          
          {/* About Me Card (Elevated) */}
          <div className={`rounded-xl p-4 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About Me
            </h2>
            <p className="text-sm xs:text-base leading-snug">
              I'm a certified full-stack developer dedicated to building applications that don't just work, but solve real-world problems. My expertise spans modern web frameworks, giving me the ability to transform abstract ideas into polished, high-performance digital products, from front-end user experience to scalable back-end architecture.
              <br/>
              My commitment goes beyond coding; I founded Code4Impact Rwanda to foster a community focused on driving social change through technology, ensuring my work is always meaningful and focused on positive growth.
            </p>
          </div>

          {/* Key Achievements (Grid for clarity) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((item, index) => (
              <div key={index} className={`rounded-xl p-3 shadow-md ${isDarkMode ? 'bg-gray-800/70' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-start">
                  <span className="text-2xl mr-2">{item.icon}</span>
                  <div>
                    <h3 className={`text-md font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className="text-xs opacity-80 mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack / Skills (Visual Badges) */}
          <div className={`rounded-xl p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Primary Toolkit 🛠️
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs
                  ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}>
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Key Info & CTA (Fixed height content) */}
        <div className="lg:col-span-1 space-y-4 flex flex-col justify-start flex-shrink-0">

          {/* Quick Facts Card */}
          <div className={`rounded-xl p-4 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Facts</h3>
            <div className="space-y-3">
              {keyFacts.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold opacity-80 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{info.title}</p>
                    <p className="text-sm font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 📞 4. CALL TO ACTION (Highly Visible) */}
          <div className={`rounded-xl p-4 shadow-xl text-center border-2 border-dashed transition-all duration-300 group hover:border-solid ${
            isDarkMode ? 'bg-purple-900/30 border-purple-600 hover:bg-purple-900/50' : 'bg-purple-100 border-purple-400 hover:bg-purple-200'
          }`}>
            <h2 className={`text-lg font-extrabold mb-3 ${isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-700'} transition-colors duration-300`}>
              Ready to build something impactful?
            </h2>
            
            <div className="space-y-2">
              {/* Download Resume Button with Animation Logic (The ONLY button remaining) */}
              <button 
                onClick={handleDownload}
                disabled={downloadState === 'loading'}
                // Increased the height slightly to 12 to center the content better when only one button is present
                className={`w-full h-12 px-4 py-2 rounded-xl font-semibold text-sm transition-colors relative overflow-hidden
                  ${downloadState === 'loading' 
                    ? 'bg-transparent text-gray-500 cursor-wait' 
                    : downloadState === 'complete' 
                      ? 'bg-green-500 text-white' 
                      : isDarkMode 
                        ? 'bg-transparent border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10' 
                        : 'bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50'}`}>
                {renderDownloadButtonContent()}
              </button>

              {/* Hidden <a> tag used to actually trigger the file download */}
              <a 
                href={IBRAResume}
                download="Tuyizere_Ibrahim_Resume.pdf"
                ref={downloadLinkRef}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'none' }} // Keep this hidden!
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
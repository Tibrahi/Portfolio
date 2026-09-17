import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaStar, 
  FaExternalLinkAlt, FaCircle, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  
  // Loading state starting explicitly at 3 instead of 1, pacing out safely to 100
  const [loadingProgress, setLoadingProgress] = useState(3);
  const [showDashboard, setShowDashboard] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Personal Info
  const personalInfo = {
    name: "TUYIZERE Ibrahim",
    role: "Full Stack Developer",
    status: "Open to Work",
    bio: "I build scalable, user-centric applications. Specializing in the MERN stack and modern web technologies to solve real-world business problems.",
    location: "Kigali, Rwanda",
    email: "ibrahimtuyizere2@gmail.com",
    github: "Tibrahi",
    linkedin: "tuyizere-ibrahim-89ba8b275",
  };

  // Background Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${personalInfo.github}`),
          fetch(`https://api.github.com/users/${personalInfo.github}/repos?per_page=100&sort=updated`)
        ]);
        
        if (!userRes.ok || !reposRes.ok) throw new Error("Failed to fetch GitHub data");

        const userData = await userRes.json();
        const data = await reposRes.json();
        
        setProfileData(userData);
        const cleanData = data
          .filter(repo => !repo.fork && !repo.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        setGithubData(cleanData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Timer mapping execution to scale from 3% to 100% cleanly
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // Adjust interval speed as needed (500ms * ~97 steps ≈ 48 seconds total duration)

    return () => clearInterval(timer);
  }, []);

  // Reveal dashboard smoothly when counter hits 100%
  useEffect(() => {
    if (loadingProgress === 100) {
      const timeout = setTimeout(() => setShowDashboard(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = githubData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(githubData.length / itemsPerPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Intro Loading Screen */}
      <AnimatePresence>
        {!showDashboard && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-4 ${
              isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
            }`}
          >
            {/* Name */}
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Tooltip Intro Under Name */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`max-w-md text-center px-6 py-4 rounded-xl mb-8 text-sm md:text-base font-medium shadow-lg ${
                isDarkMode ? 'bg-slate-900 border border-slate-800 text-slate-300' : 'bg-gray-100 border border-gray-200 text-slate-700'
              }`}
            >
              hello i'm T.ibrahim welcome to my portfolio and i'm happy to see you foshua .
            </motion.div>

            {/* 10 Cube Boxes Animation: Left 5 are solid black, Right 5 are solid blue */}
            <div className="flex items-center justify-center gap-1.5 mb-6 w-full max-w-xs overflow-hidden py-2">
              {[...Array(10)].map((_, i) => {
                const isFromLeft = i < 5;
                const cubeColorClass = isFromLeft 
                  ? 'bg-black border border-slate-700' 
                  : 'bg-blue-600 dark:bg-blue-500';

                return (
                  <motion.div
                    key={i}
                    initial={{ x: isFromLeft ? -300 : 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05, 
                      type: "spring", 
                      stiffness: 120 
                    }}
                    className={`w-5 h-5 rounded-md ${cubeColorClass} shadow-md`}
                  />
                );
              })}
            </div>

            {/* Countdown Counter (3 to 100) */}
            <div className="font-mono text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-400">
              {loadingProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDashboard ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}></div>
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                <img
                  src={profileData?.avatar_url || `https://github.com/${personalInfo.github}.png`}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <h2 className="text-blue-500 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mt-1">
                  {personalInfo.status} • Full Stack Developer
                </h2>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{personalInfo.name}</span>
                </h1>
              </div>
              
              <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {profileData?.bio || personalInfo.bio}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex gap-4 items-center">
                  {[
                    { icon: <FaGithub />, href: `https://github.com/${personalInfo.github}` },
                    { icon: <FaLinkedin />, href: `https://linkedin.com/in/${personalInfo.linkedin}` }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full text-xl transition-all hover:scale-110 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-gray-100 text-slate-700 shadow-md'}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">GitHub Projects</h2>
              <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Selected repositories showcasing my capabilities
              </p>
            </div>
            <a 
              href={`https://github.com/${personalInfo.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
            >
              View all on GitHub <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>

          {error ? (
            <div className="text-center p-8 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-xl">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((repo) => (
                <motion.article
                  key={repo.id}
                  whileHover={{ y: -5 }}
                  className={`group relative flex flex-col justify-between rounded-xl overflow-hidden border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50 hover:shadow-blue-900/20' 
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <FaGithub className={`text-2xl ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`} />
                        <h3 className="font-bold text-lg truncate pr-2">{repo.name}</h3>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        <FaStar className="text-yellow-500" /> {repo.stargazers_count}
                      </span>
                    </div>
                    
                    <p className={`text-sm line-clamp-3 mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {repo.description || "A comprehensive project demonstrating modern web development practices and clean architecture."}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          <FaCircle className="text-[8px]" /> {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {(repo.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  </div>

                  <div className={`px-6 py-4 border-t flex justify-between items-center ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-100 bg-gray-50'}`}>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      Code <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {githubData.length > itemsPerPage && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-3 rounded-full transition-all flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white disabled:bg-slate-800/50 disabled:text-slate-600 hover:bg-slate-700' 
                    : 'bg-white text-slate-800 shadow-md border border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50'
                }`}
              >
                <FaChevronLeft />
              </button>
              
              <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full transition-all flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white disabled:bg-slate-800/50 disabled:text-slate-600 hover:bg-slate-700' 
                    : 'bg-white text-slate-800 shadow-md border border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50'
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

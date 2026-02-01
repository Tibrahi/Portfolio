import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaStar, 
  FaCodeBranch, 
  FaExternalLinkAlt, 
  FaCircle,
  FaGlobe,
  FaCode
} from 'react-icons/fa';

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(9);

  // Configuration
  const personalInfo = {
    name: "Tuyizere Ibrahim",
    role: "Full Stack Developer",
    status: "Open to Work",
    bio: "Passionate developer focused on creating efficient and user-friendly applications. Specializing in modern web technologies to solve real-world business problems.",
    github: "Tibrahi", 
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const fetchGithubData = async () => {
    try {
      setLoading(true);
      // Fetching repos sorted by 'updated' to ensure real-time relevance
      const response = await fetch(
        `https://api.github.com/users/${personalInfo.github}/repos?per_page=100&sort=updated&direction=desc`
      );
      
      if (!response.ok) throw new Error("Failed to fetch GitHub data");

      const data = await response.json();
      
      // Filter out forks to show only original work, and ensure we have descriptions
      const validRepos = data.filter(repo => !repo.fork && !repo.archived);

      setGithubData(validRepos);
    } catch (error) {
      console.error(error);
      setError("Could not load repositories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  const loadMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  // Helper to get favicon from homepage URL
  const getFavicon = (url) => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
      return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Streamlined Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 pb-12 px-4 max-w-5xl mx-auto text-center"
      >
        <div className="relative inline-block mb-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
            <img
              src={`https://github.com/${personalInfo.github}.png`}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {personalInfo.name}
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {personalInfo.bio}
        </p>

        {/* Only GitHub Link remains */}
        <div className="mt-8 flex justify-center">
          <a
            href={`https://github.com/${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                : 'bg-white hover:bg-gray-100 text-slate-800 shadow-md border border-gray-200'
            }`}
          >
            <FaGithub className="text-xl" />
            <span>Visit GitHub Profile</span>
          </a>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-4 mb-8 border-b pb-4 border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold">Latest Repositories</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-200 text-gray-600'}`}>
            {githubData.length} Projects
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`h-48 rounded-xl animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {githubData.slice(0, visibleProjects).map((repo) => {
                const faviconUrl = getFavicon(repo.homepage);
                
                return (
                  <motion.article
                    key={repo.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`flex flex-col h-full rounded-xl overflow-hidden border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20' 
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Real Favicon Logic */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                            {faviconUrl ? (
                              <img src={faviconUrl} alt="logo" className="w-6 h-6 object-contain" />
                            ) : (
                              <FaCode className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-tight line-clamp-1" title={repo.name}>
                              {repo.name}
                            </h3>
                            {repo.language && (
                              <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                {repo.language}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm line-clamp-3 mb-4 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {repo.description || "No description provided for this project."}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className={`px-6 py-4 border-t flex justify-between items-center ${
                      isDarkMode ? 'border-slate-700 bg-slate-900/30' : 'border-gray-100 bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-500 text-xs" /> 
                          <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeBranch className="text-slate-500 text-xs" /> 
                          <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{repo.forks_count}</span>
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors ${
                            isDarkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-black'
                          }`}
                          title="View Code"
                        >
                          <FaGithub />
                        </a>
                        {repo.homepage && (
                          <a 
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/30"
                            title="View Live Deployment"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {visibleProjects < githubData.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              className={`px-8 py-3 rounded-full font-semibold transition-all transform active:scale-95 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                  : 'bg-white hover:bg-gray-50 text-slate-800 shadow-md border border-gray-200'
              }`}
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
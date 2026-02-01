import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaCode, FaStar, FaCodeBranch,
  FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaGitAlt, FaPhp,
  FaHtml5, FaCss3Alt, FaFigma, FaLaravel, FaBootstrap, FaEye,
  FaExternalLinkAlt, FaDownload, FaCircle
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiVercel, SiTailwindcss, SiBulma, 
  SiPreact, SiNextdotjs, SiSass, SiLess
} from 'react-icons/si';

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Personal Info - Centralized for easy editing
  const personalInfo = {
    name: "Tuyizere Ibrahim",
    role: "Full Stack Developer",
    status: "Open to Work",
    bio: "I build scalable, user-centric applications. Specializing in the MERN stack and modern web technologies to solve real-world business problems.",
    location: "Kigali, Rwanda",
    email: "ibrahimtuyizere2@gmail.com",
    github: "Tibrahi",
    linkedin: "tuyizere-ibrahim-89ba8b275",
    resumeLink: "#", // Add your actual resume link here
  };

  // Categorized Skills for better readability
  const skillCategories = {
    Frontend: [
      { name: "React", icon: <FaReact className="text-blue-500" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    ],
    Backend: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Python", icon: <FaPython className="text-blue-600" /> },
      { name: "Laravel", icon: <FaLaravel className="text-red-500" /> },
      { name: "PHP", icon: <FaPhp className="text-purple-600" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "MySQL", icon: <FaDatabase className="text-blue-700" /> },
    ],
    Tools: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "Vercel", icon: <SiVercel className="text-black dark:text-white" /> },
      { name: "Figma", icon: <FaFigma className="text-pink-500" /> },
    ]
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
      // Fetching all repos sorted by updated to filter client-side
      const response = await fetch(
        `https://api.github.com/users/${personalInfo.github}/repos?per_page=100&sort=updated`
      );
      
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      
      // Smart Filtering: Recruiters don't want to see forks or archived projects usually
      const cleanData = data
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars (quality)

      setGithubData(cleanData);
    } catch (error) {
      setError(error.message);
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Avatar with Status Ring */}
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <img
                src={`https://github.com/${personalInfo.github}.png`}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border-2 border-white dark:border-slate-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              {personalInfo.status}
            </div>
          </div>

          {/* Intro Text */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h2 className="text-blue-500 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm">Full Stack Developer</h2>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{personalInfo.name}</span>
              </h1>
            </div>
            
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href={personalInfo.resumeLink}
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
              >
                <FaDownload /> Download CV
              </a>
              <div className="flex gap-4 items-center">
                {[
                  { icon: <FaGithub />, href: `https://github.com/${personalInfo.github}` },
                  { icon: <FaLinkedin />, href: `https://linkedin.com/in/${personalInfo.linkedin}` },
                  { icon: <FaEnvelope />, href: `mailto:${personalInfo.email}` }
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
      </motion.div>

      {/* Skills Section - Categorized */}
      <div className={`py-12 ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, skills], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50 border border-gray-200'}`}
              >
                <h4 className="text-lg font-semibold mb-4 text-blue-500">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, sIdx) => (
                    <div key={sIdx} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-slate-700' : 'bg-white shadow-sm'}`}>
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Selected repositories showcasing my capabilities
            </p>
          </div>
          <a 
            href={`https://github.com/${personalInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
          >
            View all on GitHub <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={`h-64 rounded-xl animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-xl">
            {error}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {githubData.slice(0, visibleProjects).map((repo) => (
                <motion.article
                  key={repo.id}
                  variants={itemVariants}
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
                      {repo.description || "A comprehensive project demonstrating modern web development practices and clean code architecture."}
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
            </AnimatePresence>
          </motion.div>
        )}

        {visibleProjects < githubData.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-slate-800 shadow-md border border-gray-200'
              }`}
            >
              Show More Projects
            </button>
          </div>
        )}
      </div>

      {/* Footer / CTA */}
      <footer className={`py-12 text-center ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-gray-50 border-t border-gray-200'}`}>
        <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Interested in working together?
        </p>
        <a 
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80"
        >
          Let's connect <FaEnvelope className="text-blue-600" />
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
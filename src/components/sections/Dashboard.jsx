import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaCode, FaStar, FaCircle, 
  FaChevronLeft, FaChevronRight, FaExternalLinkAlt,
  FaJs, FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, 
  FaChrome, FaGitAlt, FaUsers, FaChartLine, FaComments, FaDatabase
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiFirebase, 
  SiVercel, SiRender 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const personalInfo = {
    name: "Tuyizere Ibrahim",
    role: "Full Stack Developer",
    status: "Open to Work",
    bio: "I build scalable, user-centric applications. Specializing in the MERN stack and modern web technologies to solve real-world business problems.",
    location: "Kigali, Rwanda",
    email: "ibrahimtuyizere2@gmail.com",
    github: "Tibrahi",
    linkedin: "tuyizere-ibrahim-89ba8b275",
    resumeLink: "#",
  };

  // Updated to match Skills.jsx strictly
  const skillCategories = {
    Frontend: [
      { name: 'JavaScript', icon: <FaJs className="text-yellow-500" /> },
      { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
    ],
    Backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <SiExpress className="text-gray-600 dark:text-gray-300" /> },
      { name: 'Firebase', icon: <SiFirebase className="text-orange-500" /> },
    ],
    Databases: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
      { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
      { name: 'Browser DB', icon: <FaChrome className="text-green-500" /> },
    ],
    Tools: [
      { name: 'VS Code', icon: <VscVscode className="text-blue-500" /> },
      { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white" /> },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const fetchGithubData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${personalInfo.github}/repos?per_page=100&sort=updated`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      const cleanData = data.filter(repo => !repo.fork && !repo.archived).sort((a, b) => b.stargazers_count - a.stargazers_count);
      setGithubData(cleanData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGithubData(); }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = githubData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(githubData.length / itemsPerPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#f8fafc] text-gray-900'}`}>
      
      {/* Background Orbs to make Glassmorphism pop */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <img src={`https://github.com/${personalInfo.github}.png`} alt={personalInfo.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">{personalInfo.role}</h2>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{personalInfo.name}</span>
              </h1>
            </div>
            <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{personalInfo.bio}</p>
            <div className="flex justify-center md:justify-start gap-4">
              {[{ icon: <FaGithub />, href: `https://github.com/${personalInfo.github}` }, { icon: <FaLinkedin />, href: `https://linkedin.com/in/${personalInfo.linkedin}` }].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full text-xl transition-all hover:scale-110 ${isDarkMode ? 'bg-white/10 border border-white/10 hover:bg-white/20' : 'bg-white border border-gray-200 shadow-md hover:bg-gray-50'}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Synchronized Skills Section */}
      <div className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-3xl font-bold mb-12 text-center">Tech Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillCategories).map(([category, skills], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg
                  ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/50'}`}
              >
                <h4 className="text-lg font-bold mb-5 text-blue-500 uppercase tracking-wider text-sm">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, sIdx) => (
                    <div key={sIdx} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all
                      ${isDarkMode ? 'bg-white/5 border border-white/5 hover:bg-white/10' : 'bg-white/60 border border-white/80 hover:bg-white/90 shadow-sm'}`}>
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
            <h2 className="text-3xl font-bold">GitHub Projects</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Showcasing {githubData.length} repositories</p>
          </div>
          <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-blue-500 font-bold hover:underline">
            View All <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`h-64 rounded-3xl animate-pulse ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20">{error}</div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='wait'>
              {currentProjects.map((repo) => (
                <motion.article
                  key={repo.id}
                  variants={itemVariants}
                  className={`group flex flex-col justify-between rounded-3xl border backdrop-blur-lg transition-all duration-500 hover:shadow-2xl
                    ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/40 border-white/50 hover:bg-white/60'}`}
                >
                  <div className="p-7">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <FaGithub className="text-2xl opacity-70" />
                        <h3 className="font-bold text-lg truncate max-w-[150px]">{repo.name}</h3>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500">
                        <FaStar /> {repo.stargazers_count}
                      </span>
                    </div>
                    <p className={`text-sm line-clamp-3 mb-6 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {repo.description || "Modern web application built with focus on performance and scalable architecture."}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500">
                          <FaCircle className="text-[6px]" /> {repo.language}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`px-7 py-4 border-t flex justify-between items-center rounded-b-3xl ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-white/20 bg-white/20'}`}>
                    <span className="text-[10px] font-medium opacity-50">Updated {new Date(repo.updated_at).getFullYear()}</span>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase text-blue-500 tracking-widest hover:underline">View Code</a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {githubData.length > itemsPerPage && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-4 rounded-2xl transition-all border ${isDarkMode ? 'bg-white/5 border-white/10 text-white disabled:opacity-20' : 'bg-white border-gray-200 text-slate-800 disabled:opacity-40'}`}>
              <FaChevronLeft />
            </button>
            <span className="font-black text-sm uppercase tracking-widest opacity-60">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-4 rounded-2xl transition-all border ${isDarkMode ? 'bg-white/5 border-white/10 text-white disabled:opacity-20' : 'bg-white border-gray-200 text-slate-800 disabled:opacity-40'}`}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaCode, FaStar, FaCodeBranch, FaJs, FaReact, 
  FaNodeJs, FaPython, FaDatabase, FaGitAlt, FaPhp, FaHtml5, FaCss3Alt, FaFigma, 
  FaLaravel, FaBootstrap, FaEye, FaChevronRight, FaMapMarkerAlt, FaExternalLinkAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiVercel, SiTailwindcss, SiBulma, SiPreact, 
  SiNextdotjs, SiSass, SiLess 
} from 'react-icons/si';

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const technologies = [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" />, proficiency: 95 },
    { name: "React", icon: <FaReact className="text-blue-400" />, proficiency: 90 },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, proficiency: 85 },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, proficiency: 80 },
    { name: "Next.js", icon: <SiNextdotjs />, proficiency: 88 },
    { name: "Laravel", icon: <FaLaravel className="text-red-500" />, proficiency: 75 },
    { name: "Python", icon: <FaPython className="text-blue-500" />, proficiency: 70 },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400" />, proficiency: 95 }
  ];

  const personalInfo = {
    name: "Tuyizere Ibrahim",
    role: "Senior Full Stack Engineer",
    bio: "Architecting scalable digital solutions with a focus on performance, security, and exceptional user experience.",
    location: "Kigali, Rwanda",
    email: "ibrahimtuyizere2@gmail.com",
    github: "Tibrahi",
    linkedin: "tuyizere-ibrahim-89ba8b275",
  };

  const fetchGithubData = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${personalInfo.github}/repos?page=${pageNum}&per_page=10&sort=updated`
      );
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      
      const linkHeader = response.headers.get('Link');
      setHasMore(linkHeader && linkHeader.includes('rel="next"'));
      
      setGithubData(pageNum === 1 ? data : prev => [...prev, ...data]);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGithubData(page); }, [page]);

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* EXPERT PROFILE HEADER */}
      <header className={`max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl mb-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 w-full" />
        <div className="px-6 pb-8 -mt-16 flex flex-col md:flex-row items-end gap-6">
          <div className="relative">
            <img
              src={`https://github.com/${personalInfo.github}.png`}
              alt="Profile"
              className="w-40 h-40 rounded-2xl border-4 border-gray-900 shadow-xl object-cover"
            />
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 mb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                <p className="text-blue-500 font-medium tracking-wide uppercase text-sm">{personalInfo.role}</p>
                <div className="flex items-center gap-3 mt-2 text-sm opacity-75">
                  <span className="flex items-center gap-1"><FaMapMarkerAlt /> {personalInfo.location}</span>
                  <span className="flex items-center gap-1"><FaEnvelope /> {personalInfo.email}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`https://github.com/${personalInfo.github}`} className="p-3 rounded-xl bg-gray-700 hover:bg-blue-600 transition-colors"><FaGithub size={20} /></a>
                <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} className="p-3 rounded-xl bg-gray-700 hover:bg-blue-600 transition-colors"><FaLinkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SYSTEM FLOW STATS */}
        <aside className="space-y-6">
          <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Skill Matrix Progress
            </h2>
            <div className="space-y-5">
              {technologies.map((tech) => (
                <div key={tech.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">{tech.icon} {tech.name}</span>
                    <span className="font-mono text-blue-400">{tech.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="font-bold mb-4">Quick Insights</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-2xl font-bold text-blue-500">{githubData.length}+</p>
                <p className="text-xs uppercase opacity-60">Repositories</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <p className="text-2xl font-bold text-purple-500">24/7</p>
                <p className="text-xs uppercase opacity-60">Deployment</p>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: PROJECT ROW REPRESENTATION */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Project Feed</h2>
            <button onClick={() => fetchGithubData(1)} className="text-sm text-blue-500 hover:underline">Sync Data</button>
          </div>

          {githubData.map((repo) => (
            <div 
              key={repo.id}
              className={`group flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl transition-all border ${
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:shadow-xl'
              }`}
            >
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <FaCode size={24} className="text-blue-500" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg group-hover:text-blue-500 transition-colors">{repo.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${repo.private ? 'border-gray-500 text-gray-500' : 'border-green-500 text-green-500'}`}>
                    {repo.private ? 'Private' : 'Public'}
                  </span>
                </div>
                <p className="text-sm opacity-70 line-clamp-1">{repo.description || "No description provided for this architectural build."}</p>
                
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs"><FaStar className="text-yellow-500" /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1 text-xs"><FaCodeBranch className="text-blue-400" /> {repo.forks_count}</span>
                  <span className="flex items-center gap-1 text-xs opacity-60 italic">{repo.language}</span>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 w-full md:w-auto">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all"
                >
                  <FaExternalLinkAlt size={12} /> View
                </a>
              </div>
            </div>
          ))}

          {hasMore && (
            <button 
              onClick={() => setPage(p => p + 1)}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-700 hover:border-blue-500 text-gray-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Initializing..." : <>Load More Projects <FaChevronRight /></>}
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
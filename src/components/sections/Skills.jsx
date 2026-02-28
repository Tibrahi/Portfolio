import React from 'react';
import { VscVscode } from 'react-icons/vsc';

import { 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaBootstrap, 
  FaNodeJs, 
  FaChrome, 
  FaGitAlt, 
  FaRust, 
  FaJava, 
  FaGamepad, 
  FaMobileAlt, 
  FaNetworkWired, 
  FaUsers, 
  FaChartLine, 
  FaComments 
} from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiMysql, 
  SiFirebase, 
  SiVercel, 
  SiRender 
} from 'react-icons/si';
const Skills = ({ isDarkMode }) => {
  
  // Custom curated data based strictly on your requirements
  const techStack = {
    frontend: [
      { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
      { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-500" /> },
    ],
    backend: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <SiExpress className="text-gray-500 dark:text-gray-300" /> },
    ],
    databases: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
      { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
      { name: 'Firebase', icon: <SiFirebase className="text-orange-500" /> },
      { name: 'Browser DB', icon: <FaChrome className="text-green-400" /> },
    ],
    tools: [
      // Update this line:
      { name: 'VS Code', icon: <VscVscode className="text-blue-500" /> },
      { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white" /> },
      { name: 'Render', icon: <SiRender className="text-black dark:text-white" /> },
    ],
    softSkills: [
      { name: 'Team Lead', icon: <FaUsers className="text-indigo-500" /> },
      { name: 'Project Analysis', icon: <FaChartLine className="text-emerald-500" /> },
      { name: 'Communication', icon: <FaComments className="text-blue-400" /> },
    ]
  };

  const roadmap = {
    inProgress: [
      { name: 'Rust', icon: <FaRust className="text-orange-700" /> },
      { name: 'Java', icon: <FaJava className="text-red-500" /> },
    ],
    future: [
      { name: 'Game Development', icon: <FaGamepad className="text-purple-500" /> },
      { name: 'Mobile Apps', icon: <FaMobileAlt className="text-blue-500" /> },
      { name: 'Advanced JS Ecosystem', icon: <FaNetworkWired className="text-yellow-500" /> },
    ]
  };

  // Reusable Pill Component for individual skills
  const SkillPill = ({ skill }) => (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm hover:-translate-y-1 transition-transform duration-300 cursor-default
      ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>
      <span className="text-lg">{skill.icon}</span>
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );

  // Reusable Bento Box Card
  const BentoCard = ({ title, items, className = "" }) => (
    <div className={`p-6 rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-md 
      ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'} ${className}`}>
      <h3 className={`text-xl font-bold mb-5 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((skill, index) => (
          <SkillPill key={index} skill={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <section className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Tech Arsenal</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Technologies I use to build robust, scalable applications, alongside the tools that streamline my workflow.
          </p>
        </div>

        {/* Current Stack Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <BentoCard 
            title="Frontend Development" 
            items={techStack.frontend} 
            className="lg:col-span-2" 
          />
          <BentoCard 
            title="Backend" 
            items={techStack.backend} 
          />
          <BentoCard 
            title="Databases" 
            items={techStack.databases} 
          />
          <BentoCard 
            title="Tools & Platforms" 
            items={techStack.tools} 
          />
          <BentoCard 
            title="Professional Skills" 
            items={techStack.softSkills} 
          />
        </div>

        {/* Roadmap / Future Focus Section */}
        <div className={`mt-16 p-8 md:p-10 rounded-3xl border relative overflow-hidden
          ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'}`}>
          
          {/* Decorative background blur */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <FaNetworkWired className="text-blue-500" />
              Learning Roadmap & Future Focus
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  Upcoming (In Progress)
                </h4>
                <div className="flex flex-wrap gap-3">
                  {roadmap.inProgress.map((skill, index) => (
                    <SkillPill key={index} skill={skill} />
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  Post-JS Exploration
                </h4>
                <div className="flex flex-wrap gap-3">
                  {roadmap.future.map((skill, index) => (
                    <SkillPill key={index} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
import React, { memo } from 'react';
import { VscVscode } from 'react-icons/vsc';
import { 
  FaJs, FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, 
  FaChrome, FaGitAlt, FaRust, FaJava, FaGamepad, FaMobileAlt, 
  FaNetworkWired, FaUsers, FaChartLine, FaComments 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiFirebase, 
  SiVercel, SiRender 
} from 'react-icons/si';

// ============================================================================
// 1. STATIC DATA EXTRACTION
// Moved completely OUTSIDE the component. It evaluates once at parse-time.
// O(1) memory allocation instead of O(N) re-allocations on every render.
// ============================================================================
const techStack = {
  frontend: [
    { name: 'JavaScript', icon: <FaJs className="text-yellow-500" /> },
    { name: 'React.js', icon: <FaReact className="text-blue-500" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-500" /> },
  ],
  backend: [
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'Express.js', icon: <SiExpress className="text-gray-600 dark:text-gray-300" /> },
  ],
  databases: [
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" /> },
    { name: 'MySQL', icon: <SiMysql className="text-blue-700" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-orange-500" /> },
    { name: 'Browser DB', icon: <FaChrome className="text-green-500" /> },
  ],
  tools: [
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
    { name: 'Advanced JS', icon: <FaNetworkWired className="text-yellow-500" /> },
  ]
};

// ============================================================================
// 2. SUB-COMPONENT EXTRACTION & MEMOIZATION
// Extracted to prevent React from unmounting/remounting the DOM nodes on render.
// Wrapped in React.memo() so they ONLY re-render if their specific props change.
// ============================================================================
const SkillPill = memo(({ skill, isDarkMode }) => (
  <li className={`flex items-center gap-2 px-4 py-2 rounded-full border hover:-translate-y-1 transition-transform duration-300 cursor-default backdrop-blur-md will-change-transform
    ${isDarkMode 
      ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]' 
      : 'bg-white/30 border-white/40 text-gray-700 hover:bg-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.05)]'}`}>
    <span className="text-lg drop-shadow-sm">{skill.icon}</span>
    <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
  </li>
));

// Added displayName for React DevTools debugging
SkillPill.displayName = 'SkillPill';

const BentoCard = memo(({ title, items, className = "", isDarkMode }) => (
  <article className={`p-7 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-xl will-change-transform
    ${isDarkMode 
      ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
      : 'bg-white/20 border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.07)]'} 
    ${className}`}>
    <h3 className={`text-xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {title}
    </h3>
    <ul className="flex flex-wrap gap-3 m-0 p-0 list-none">
      {items.map((skill) => (
        <SkillPill key={skill.name} skill={skill} isDarkMode={isDarkMode} />
      ))}
    </ul>
  </article>
));

BentoCard.displayName = 'BentoCard';

// ============================================================================
// 3. MAIN COMPONENT
// Now lean, fast, and only handles layout and prop passing.
// ============================================================================
const Skills = ({ isDarkMode }) => {
  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      
      {/* Background Decorative Orbs - Using will-change to offload to GPU */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none -z-10 will-change-transform" aria-hidden="true" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none -z-10 will-change-transform" aria-hidden="true" />
      <div className="absolute top-[30%] right-[20%] w-[25%] h-[25%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none -z-10 will-change-transform" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header section */}
        <header className="mb-16 text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 drop-shadow-sm">Tech Arsenal</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Technologies I use to build robust, scalable applications, alongside the tools that streamline my workflow.
          </p>
        </header>

        {/* Glassmorphism Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <BentoCard 
            title="Frontend Development" 
            items={techStack.frontend} 
            className="lg:col-span-2"
            isDarkMode={isDarkMode}
          />
          <BentoCard 
            title="Backend Systems" 
            items={techStack.backend}
            isDarkMode={isDarkMode} 
          />
          <BentoCard 
            title="Databases" 
            items={techStack.databases}
            isDarkMode={isDarkMode} 
          />
          <BentoCard 
            title="Tools & Platforms" 
            items={techStack.tools}
            isDarkMode={isDarkMode} 
          />
          <BentoCard 
            title="Professional Skills" 
            items={techStack.softSkills}
            isDarkMode={isDarkMode} 
          />
        </div>

        {/* Roadmap / Future Focus Section */}
        <article className={`mt-16 p-8 md:p-10 rounded-3xl border backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl will-change-transform
          ${isDarkMode 
            ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
            : 'bg-white/20 border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.1)]'}`}>
          
          <div className="relative z-10">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/40 border-white/60 shadow-sm'}`}>
                <FaNetworkWired className="text-blue-500" aria-hidden="true" />
              </div>
              Learning Roadmap
            </h3>
            
            <div className="grid md:grid-cols-2 gap-10">
              <section>
                <h4 className={`text-sm font-bold uppercase tracking-widest mb-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Currently Mastering
                </h4>
                <ul className="flex flex-wrap gap-3 m-0 p-0 list-none">
                  {roadmap.inProgress.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} isDarkMode={isDarkMode} />
                  ))}
                </ul>
              </section>
              
              <section>
                <h4 className={`text-sm font-bold uppercase tracking-widest mb-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  Future Horizons
                </h4>
                <ul className="flex flex-wrap gap-3 m-0 p-0 list-none">
                  {roadmap.future.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} isDarkMode={isDarkMode} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Skills;
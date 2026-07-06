import React, { memo } from 'react';
import { VscVscode } from 'react-icons/vsc';
import { 
  FaJs, FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, 
  FaChrome, FaGitAlt, FaRust, FaJava, FaGamepad, FaMobileAlt, 
  FaNetworkWired, FaUsers, FaChartLine, FaComments, FaPython, 
  FaWindows, FaGitlab, FaDatabase, FaProjectDiagram, FaPalette, 
  FaPaintBrush, FaLinux, FaCode, FaCloud
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiFirebase, 
  SiVercel, SiNextdotjs, SiTypescript, SiPostgresql
} from 'react-icons/si';

// ============================================================================
// 1. STATIC DATA EXTRACTION & MEMORY OPTIMIZATION
// Storing component references instead of instantiated React elements.
// This defers VDOM allocation to the render phase, reducing baseline memory.
// ============================================================================
const techStack = {
  frontend: [
    { name: 'HTML5', Icon: FaHtml5, color: 'text-orange-500' },
    { name: 'CSS3', Icon: FaCss3Alt, color: 'text-blue-500' },
    { name: 'JavaScript', Icon: FaJs, color: 'text-yellow-500' },
    { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-600' },
    { name: 'React.js', Icon: FaReact, color: 'text-blue-500' },
    { name: 'Next.js', Icon: SiNextdotjs, color: 'text-black dark:text-white' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'Bootstrap', Icon: FaBootstrap, color: 'text-purple-500' },
  ],
  backend: [
    { name: 'Node.js', Icon: FaNodeJs, color: 'text-green-500' },
    { name: 'Express.js', Icon: SiExpress, color: 'text-gray-600 dark:text-gray-300' },
    { name: 'Next.js', Icon: SiNextdotjs, color: 'text-black dark:text-white' },
    { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-600' },
  ],
  databases: [
    { name: 'MongoDB', Icon: SiMongodb, color: 'text-green-600' },
    { name: 'MySQL', Icon: SiMysql, color: 'text-blue-700' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-400' },
    { name: 'CockroachDB', Icon: FaDatabase, color: 'text-purple-600' },
    { name: 'Neo4j', Icon: FaProjectDiagram, color: 'text-blue-500' },
    { name: 'Firebase', Icon: SiFirebase, color: 'text-orange-500' },
    { name: 'Browser DB', Icon: FaChrome, color: 'text-green-500' },
  ],
  languages: [
    { name: 'JavaScript', Icon: FaJs, color: 'text-yellow-500' },
    { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-600' },
    { name: 'C', Icon: FaCode, color: 'text-blue-600' },
    { name: 'Python', Icon: FaPython, color: 'text-yellow-400' },
    { name: 'Rust', Icon: FaRust, color: 'text-orange-700' },
    { name: 'Java', Icon: FaJava, color: 'text-red-500' },
  ],
  tools: [
    { name: 'VS Code', Icon: VscVscode, color: 'text-blue-500' },
    { name: 'Git', Icon: FaGitAlt, color: 'text-orange-500' },
    { name: 'GitLab', Icon: FaGitlab, color: 'text-orange-600' },
    { name: 'GIMP', Icon: FaPalette, color: 'text-gray-500' },
    { name: 'Adobe Photoshop', Icon: FaPaintBrush, color: 'text-blue-600' },
    { name: 'Vercel', Icon: SiVercel, color: 'text-black dark:text-white' },
    { name: 'Render', Icon: FaCloud, color: 'text-black dark:text-white' },
  ],
  os: [
    { name: 'Kali Linux', Icon: FaLinux, color: 'text-blue-400' },
    { name: 'Linux Mint', Icon: FaLinux, color: 'text-green-500' },
    { name: 'Windows Server', Icon: FaWindows, color: 'text-blue-500' },
  ],
  softSkills: [
    { name: 'Team Lead', Icon: FaUsers, color: 'text-indigo-500' },
    { name: 'Project Analysis', Icon: FaChartLine, color: 'text-emerald-500' },
    { name: 'Communication', Icon: FaComments, color: 'text-blue-400' },
  ]
};

const roadmap = {
  inProgress: [
    { name: 'Rust', Icon: FaRust, color: 'text-orange-700' },
    { name: 'Java', Icon: FaJava, color: 'text-red-500' },
    { name: 'C', Icon: FaCode, color: 'text-blue-600' },
    { name: 'Python', Icon: FaPython, color: 'text-yellow-400' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: 'text-blue-400' },
    { name: 'Neo4j', Icon: FaProjectDiagram, color: 'text-blue-500' },
    { name: 'CockroachDB', Icon: FaDatabase, color: 'text-purple-600' },
  ],
  future: [
    { name: 'Game Development', Icon: FaGamepad, color: 'text-purple-500' },
    { name: 'Mobile Apps', Icon: FaMobileAlt, color: 'text-blue-500' },
    { name: 'Advanced JS', Icon: FaNetworkWired, color: 'text-yellow-500' },
  ]
};

// ============================================================================
// 2. STATIC CSS CLASS EXTRACTION
// Prevents string concatenation and garbage collection pressure on every render.
// ============================================================================
const PILL_BASE_CLASS = "flex items-center gap-2 px-4 py-2 rounded-full border hover:-translate-y-1 transition-transform duration-300 cursor-default backdrop-blur-md will-change-transform";
const PILL_DARK_CLASS = "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]";
const PILL_LIGHT_CLASS = "bg-white/30 border-white/40 text-gray-700 hover:bg-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.05)]";

const CARD_BASE_CLASS = "p-7 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-xl will-change-transform";
const CARD_DARK_CLASS = "bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
const CARD_LIGHT_CLASS = "bg-white/20 border-white/30 shadow-[0_8px_32px_rgba(31,38,135,0.07)]";

// ============================================================================
// 3. COMPONENT OPTIMIZATION & DEFENSIVE RENDERING
// Added null-checks to ensure missing icons do not cause a white-screen crash.
// ============================================================================
const SkillPill = ({ skill, isDarkMode }) => {
  const Icon = skill?.Icon;
  
  // Failsafe: If the icon import failed or is undefined, do not render to prevent crash.
  if (!Icon) return null;

  return (
    <li className={`${PILL_BASE_CLASS} ${isDarkMode ? PILL_DARK_CLASS : PILL_LIGHT_CLASS}`}>
      <span className="text-lg drop-shadow-sm">
        <Icon className={skill.color} />
      </span>
      <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
    </li>
  );
};

const BentoCard = memo(({ title, items, className = "", isDarkMode }) => {
  // Failsafe: Prevent crash if items array is corrupted or undefined
  if (!items || !Array.isArray(items)) return null;

  return (
    <article className={`${CARD_BASE_CLASS} ${isDarkMode ? CARD_DARK_CLASS : CARD_LIGHT_CLASS} ${className}`}>
      <h3 className={`text-xl font-bold mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <ul className="flex flex-wrap gap-3 m-0 p-0 list-none">
        {items.map((skill) => (
          <SkillPill key={skill.name} skill={skill} isDarkMode={isDarkMode} />
        ))}
      </ul>
    </article>
  );
});

BentoCard.displayName = 'BentoCard';

// ============================================================================
// 4. MAIN COMPONENT
// ============================================================================
const Skills = ({ isDarkMode }) => {
  return (
    <section className="relative min-h-screen pt-10 pb-20 lg:pt-12 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      
      {/* Background Decorative Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute top-[30%] right-[20%] w-[25%] h-[25%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

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
            title="Programming Languages" 
            items={techStack.languages}
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
            title="Operating Systems" 
            items={techStack.os}
            isDarkMode={isDarkMode} 
          />
          <BentoCard 
            title="Professional Skills" 
            items={techStack.softSkills}
            className="lg:col-span-2"
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

export default memo(Skills);
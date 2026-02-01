import React from 'react'
import { 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaPython, 
  FaPhp, 
  FaGitAlt, 
  FaFigma,
  FaEnvelope,
  FaLaravel,
  FaReact
} from 'react-icons/fa'
import { SiVercel, SiRender, SiMongodb, SiFirebase, SiMysql, SiExpress } from 'react-icons/si'

const Skills = ({ isDarkMode }) => {
  
  // Professional Data Structure:
  // Level: Beginner, Intermediate, Advanced, Expert
  // Years: Actual time spent using the tech
  const skillsData = {
    frontend: [
      { name: 'HTML5', years: '4+ Years', level: 'Expert', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3 / Tailwind', years: '4+ Years', level: 'Expert', icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'JavaScript (ES6+)', years: '3+ Years', level: 'Advanced', icon: <FaJs className="text-yellow-400" /> },
      { name: 'TypeScript', years: '1+ Years', level: 'Intermediate', icon: <FaJs className="text-blue-600" /> } 
      // Note: Added TS icon here as placeholder if SiTypescript isn't working, or import it if you have it
    ],
    backend: [
      { name: 'Node.js', years: '3 Years', level: 'Advanced', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Python', years: '2 Years', level: 'Intermediate', icon: <FaPython className="text-blue-600" /> },
      { name: 'PHP', years: '2 Years', level: 'Intermediate', icon: <FaPhp className="text-purple-600" /> }
    ],
    databases: [
      { name: 'MySQL', years: '3 Years', level: 'Advanced', icon: <SiMysql className="text-blue-700" /> },
      { name: 'MongoDB', years: '2 Years', level: 'Intermediate', icon: <SiMongodb className="text-green-600" /> },
      { name: 'Firebase', years: '1 Year', level: 'Intermediate', icon: <SiFirebase className="text-orange-500" /> }
    ],
    frameworks: [
      { name: 'React.js', years: '3 Years', level: 'Advanced', icon: <FaReact className="text-blue-500" /> },
      { name: 'Express.js', years: '3 Years', level: 'Advanced', icon: <SiExpress className="text-gray-800 dark:text-white" /> },
      { name: 'Laravel', years: '1 Year', level: 'Intermediate', icon: <FaLaravel className="text-red-500" /> },
    ],
    tools: [
      { name: 'Git & GitHub', years: '4 Years', level: 'Expert', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'Vercel/Render', years: '2 Years', level: 'Intermediate', icon: <SiVercel className="text-black dark:text-white" /> },
      { name: 'Figma', years: '2 Years', level: 'Intermediate', icon: <FaFigma className="text-pink-500" /> }
    ]
  }

  // A reusable badge component for the proficiency level
  const LevelBadge = ({ level }) => {
    let colorClass = ''
    switch(level) {
      case 'Expert': colorClass = 'bg-purple-100 text-purple-800 border-purple-200'; break;
      case 'Advanced': colorClass = 'bg-green-100 text-green-800 border-green-200'; break;
      case 'Intermediate': colorClass = 'bg-blue-100 text-blue-800 border-blue-200'; break;
      default: colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
    }
    
    return (
      <span className={`text-[10px] xs:text-xs font-medium px-2 py-0.5 rounded border ${colorClass}`}>
        {level}
      </span>
    )
  }

  const SkillCategory = ({ title, items }) => (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5`}>
      <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} pb-2`}>
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((skill, index) => (
          <div key={index} className="flex items-center justify-between group">
            {/* Left side: Icon and Name */}
            <div className="flex items-center gap-3">
              <div className={`text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110`}>
                {skill.icon}
              </div>
              <div className="flex flex-col">
                <span className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {skill.name}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} sm:hidden`}>
                  {skill.years}
                </span>
              </div>
            </div>

            {/* Right side: Years (hidden on tiny screens) and Level Badge */}
            <div className="flex items-center gap-3">
              <span className={`hidden sm:block text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {skill.years}
              </span>
              <LevelBadge level={skill.level} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Proficiency
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A breakdown of my technical skills and years of production experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCategory title="Frontend Development" items={skillsData.frontend} />
          <SkillCategory title="Backend Infrastructure" items={skillsData.backend} />
          <SkillCategory title="Database Management" items={skillsData.databases} />
          <SkillCategory title="Frameworks & Libraries" items={skillsData.frameworks} />
          <SkillCategory title="DevOps & Tools" items={skillsData.tools} />
        </div>
      </div>
    </div>
  )
}

export default Skills
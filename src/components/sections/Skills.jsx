import React, { useState, useEffect } from 'react'
import { 
  FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaPhp, 
  FaGitAlt, FaFigma, FaLaravel, FaReact, FaDocker, FaAws 
} from 'react-icons/fa'
import { 
  SiTypescript, SiVercel, SiRender, SiMongodb, 
  SiFirebase, SiMysql, SiExpress, SiTailwindcss, SiPostgresql 
} from 'react-icons/si'

const Skills = ({ isDarkMode }) => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // --- CONFIGURATION ---
  // Adjust these years/levels to match your actual reality.
  // Proficiency: Beginner, Intermediate, Advanced, Expert
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: 'React.js', years: '3+ Years', level: 'Advanced', icon: <FaReact className="text-[#61DAFB]" /> },
        { name: 'TypeScript', years: '2+ Years', level: 'Intermediate', icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: 'Tailwind CSS', years: '3+ Years', level: 'Expert', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        { name: 'JavaScript (ES6+)', years: '4+ Years', level: 'Expert', icon: <FaJs className="text-[#F7DF1E]" /> },
      ]
    },
    {
      title: "Backend Infrastructure",
      skills: [
        { name: 'Node.js', years: '3 Years', level: 'Advanced', icon: <FaNodeJs className="text-[#339933]" /> },
        { name: 'Express.js', years: '3 Years', level: 'Advanced', icon: <SiExpress className="text-gray-500 dark:text-gray-300" /> },
        { name: 'Python', years: '2 Years', level: 'Intermediate', icon: <FaPython className="text-[#3776AB]" /> },
        { name: 'PHP / Laravel', years: '2 Years', level: 'Intermediate', icon: <FaLaravel className="text-[#FF2D20]" /> },
      ]
    },
    {
      title: "Database Management",
      skills: [
        { name: 'MySQL', years: '3 Years', level: 'Advanced', icon: <SiMysql className="text-[#4479A1]" /> },
        { name: 'MongoDB', years: '2 Years', level: 'Intermediate', icon: <SiMongodb className="text-[#47A248]" /> },
        { name: 'PostgreSQL', years: '1 Year', level: 'Beginner', icon: <SiPostgresql className="text-[#4169E1]" /> },
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: 'Git & GitHub', years: '4 Years', level: 'Expert', icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: 'Docker', years: '1 Year', level: 'Beginner', icon: <FaDocker className="text-[#2496ED]" /> },
        { name: 'Figma', years: '2 Years', level: 'Intermediate', icon: <FaFigma className="text-[#F24E1E]" /> },
        { name: 'Vercel / AWS', years: '2 Years', level: 'Intermediate', icon: <SiVercel className="text-black dark:text-white" /> },
      ]
    }
  ]

  // Reusable Badge Component for "Level"
  const LevelBadge = ({ level }) => {
    const colors = {
      Expert: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
      Advanced: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
      Intermediate: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
      Beginner: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600',
    }
    
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-semibold border ${colors[level] || colors.Beginner}`}>
        {level}
      </span>
    )
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className={`text-center mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Expertise
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A comprehensive overview of my technical stack, focused on scalable backend solutions and responsive frontend interfaces.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.title}
              className={`
                group relative overflow-hidden rounded-2xl p-6 sm:p-8 
                transition-all duration-500 ease-out
                ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-100 hover:shadow-xl'}
                border shadow-md hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${catIndex * 150}ms` }} // Staggered delay
            >
              {/* Decorative Gradient Background on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>

              {/* Category Title */}
              <h3 className={`relative text-xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                <span className={`w-2 h-8 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="space-y-4 relative">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name}
                    className={`
                      flex items-center justify-between p-3 rounded-xl transition-all duration-300
                      ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50/80'}
                    `}
                  >
                    {/* Left: Icon & Name */}
                    <div className="flex items-center gap-4">
                      <div className="text-2xl sm:text-3xl transition-transform duration-300 group-hover/item:scale-110">
                        {skill.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                        {/* Mobile-only years view */}
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} sm:hidden`}>
                          {skill.years}
                        </span>
                      </div>
                    </div>

                    {/* Right: Years & Level Badge */}
                    <div className="flex items-center gap-4 text-right">
                      <span className={`hidden sm:block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {skill.years}
                      </span>
                      <LevelBadge level={skill.level} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
import React, { useState, useEffect } from 'react'
import { 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaPython, 
  FaPhp, 
  FaGitAlt, 
  FaFigma,
  FaDatabase,
  FaEnvelope,
  FaLaravel,
  FaReact
} from 'react-icons/fa'
import { SiTypescript, SiVercel, SiRender, SiMongodb, SiFirebase, SiMysql, SiExpress } from 'react-icons/si'
import { BsFillChatDotsFill, BsPeopleFill, BsLightbulbFill, BsClockFill } from 'react-icons/bs'

const Skills = ({ isDarkMode }) => {
  const [animatedSkills, setAnimatedSkills] = useState({
    frontend: [],
    backend: [],
    databases: [],
    frameworks: [],
    additional: [],
    soft: []
  })

  const skills = {
    frontend: [
      { name: 'HTML', level: 100, icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS', level: 100, icon: <FaCss3Alt className="text-blue-500" /> },
      { name: 'JavaScript', level: 89, icon: <FaJs className="text-yellow-400" /> }
    ],
    backend: [
      { name: 'Node.js', level: 95, icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Python', level: 89, icon: <FaPython className="text-blue-600" /> },
      { name: 'PHP', level: 92, icon: <FaPhp className="text-purple-600" /> }
    ],
    databases: [
      { name: 'MySQL', level: 95, icon: <SiMysql className="text-blue-700" /> },
      { name: 'MongoDB', level: 90, icon: <SiMongodb className="text-green-600" /> },
      { name: 'Firebase', level: 85, icon: <SiFirebase className="text-orange-500" /> }
    ],
    frameworks: [
      { name: 'React', level: 90, icon: <FaReact className="text-blue-500" /> },
      { name: 'Express.js', level: 88, icon: <SiExpress className="text-gray-800 dark:text-white" /> },
      { name: 'Laravel', level: 85, icon: <FaLaravel className="text-red-500" /> },
      { name: 'EmailJS', level: 88, icon: <FaEnvelope className="text-blue-600" /> }
    ],
    additional: [
      { name: 'Git', level: 90, icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'Vercel', level: 80, icon: <SiVercel className="text-black dark:text-white" /> },
      { name: 'Render', level: 75, icon: <SiRender className="text-blue-500" /> },
      { name: 'Figma', level: 80, icon: <FaFigma className="text-pink-500" /> }
    ],
    soft: [
      { name: 'Communication', level: 95, icon: <BsFillChatDotsFill className="text-green-500" /> },
      { name: 'Teamwork', level: 90, icon: <BsPeopleFill className="text-blue-500" /> },
      { name: 'Problem Solving', level: 95, icon: <BsLightbulbFill className="text-yellow-500" /> },
      { name: 'Time Management', level: 90, icon: <BsClockFill className="text-purple-500" /> }
    ]
  }

  useEffect(() => {
    const animateSkills = () => {
      const frontendSkills = skills.frontend.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      const backendSkills = skills.backend.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      const databasesSkills = skills.databases.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      const frameworksSkills = skills.frameworks.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      const additionalSkills = skills.additional.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      const softSkills = skills.soft.map(skill => ({
        ...skill,
        currentLevel: 0
      }))
      setAnimatedSkills({ 
        frontend: frontendSkills, 
        backend: backendSkills,
        databases: databasesSkills,
        frameworks: frameworksSkills,
        additional: additionalSkills,
        soft: softSkills
      })

      const interval = setInterval(() => {
        setAnimatedSkills(prevSkills => {
          const newFrontend = prevSkills.frontend.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newBackend = prevSkills.backend.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newDatabases = prevSkills.databases.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newFrameworks = prevSkills.frameworks.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newAdditional = prevSkills.additional.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newSoft = prevSkills.soft.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))

          const isComplete = [
            ...newFrontend, 
            ...newBackend, 
            ...newDatabases,
            ...newFrameworks,
            ...newAdditional, 
            ...newSoft
          ].every(skill => skill.currentLevel === skill.level)

          if (isComplete) {
            clearInterval(interval)
          }

          return { 
            frontend: newFrontend, 
            backend: newBackend,
            databases: newDatabases,
            frameworks: newFrameworks,
            additional: newAdditional,
            soft: newSoft
          }
        })
      }, 30)

      return () => clearInterval(interval)
    }

    animateSkills()
  }, [])

  const SkillCard = ({ title, skills }) => (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-3 xs:p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-lg`}>
      <h2 className={`text-base xs:text-lg sm:text-xl font-semibold mb-3 xs:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center sm:text-left`}>{title}</h2>
      <div className="space-y-2 xs:space-y-3 sm:space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="transform transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-1 xs:mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 min-w-0">
                <span className="flex-shrink-0 text-sm xs:text-base sm:text-lg">{skill.icon}</span>
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xs xs:text-sm sm:text-base truncate`}>
                  {skill.name}
                </span>
              </div>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs xs:text-sm sm:text-base ml-2`}>
                {skill.currentLevel}%
              </span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-1.5 xs:h-2 sm:h-2.5 overflow-hidden`}>
              <div
                className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} h-1.5 xs:h-2 sm:h-2.5 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${skill.currentLevel}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-[2000px] mx-auto">
        <h1 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center sm:text-left`}>
          Technical Skills
        </h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <SkillCard title="Frontend" skills={animatedSkills.frontend} />
          <SkillCard title="Backend" skills={animatedSkills.backend} />
          <SkillCard title="Databases" skills={animatedSkills.databases} />
          <SkillCard title="Frameworks & Services" skills={animatedSkills.frameworks} />
          <SkillCard title="Additional Tools" skills={animatedSkills.additional} />
          <SkillCard title="Soft Skills" skills={animatedSkills.soft} />
        </div>
      </div>
    </div>
  )
}

export default Skills 
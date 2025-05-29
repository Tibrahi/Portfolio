import React, { useState, useEffect } from 'react'

const Skills = ({ isDarkMode }) => {
  const [animatedSkills, setAnimatedSkills] = useState({
    frontend: [],
    backend: [],
    additional: [],
    soft: []
  })

  const skills = {
    frontend: [
      { name: 'React/Emailjs', level: 80 },
      { name: 'JavaScript', level: 89 },
      { name: 'HTML/CSS', level: 100 },
      { name: 'TypeScript', level: 90 }
    ],
    backend: [
      { name: 'Node.js/Mysql/MongoDB/Firebase', level: 95 },
      { name: 'Python/Mysql', level: 89 },
      { name: 'PHP/Mysql', level: 92 },
      { name: 'Laravel/Mysql', level: 85 }
    ],
    additional: [
      { name: 'Git', level: 90 },
      { name: 'Vercel', level: 80 },
      { name: 'Render', level: 75 },
      { name: 'Figma', level: 80 }
    ],
    soft: [
      { name: 'Communication', level: 95 },
      { name: 'Teamwork', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Time Management', level: 90 }
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
          const newAdditional = prevSkills.additional.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))
          const newSoft = prevSkills.soft.map(skill => ({
            ...skill,
            currentLevel: skill.currentLevel < skill.level ? skill.currentLevel + 1 : skill.level
          }))

          const isComplete = [...newFrontend, ...newBackend, ...newAdditional, ...newSoft].every(
            skill => skill.currentLevel === skill.level
          )

          if (isComplete) {
            clearInterval(interval)
          }

          return { 
            frontend: newFrontend, 
            backend: newBackend,
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
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{skill.name}</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{skill.currentLevel}%</span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
              <div
                className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} h-2 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${skill.currentLevel}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Technical Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillCard title="Frontend" skills={animatedSkills.frontend} />
        <SkillCard title="Backend" skills={animatedSkills.backend} />
        <SkillCard title="Additional Skills" skills={animatedSkills.additional} />
        <SkillCard title="Soft Skills" skills={animatedSkills.soft} />
      </div>
    </div>
  )
}

export default Skills 
import React, { useState, useEffect } from 'react'
import { 
  FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaPhp, FaGitAlt, 
  FaFigma, FaLaravel, FaReact, FaCode 
} from 'react-icons/fa'
import { 
  SiVercel, SiMongodb, SiFirebase, SiMysql, SiExpress, 
  SiTypescript, SiTailwindcss, SiNextdotjs 
} from 'react-icons/si'

const Skills = ({ isDarkMode }) => {
  const [skillsData, setSkillsData] = useState({
    frontend: [],
    backend: [],
    databases: [],
    tools: []
  })
  const [loading, setLoading] = useState(true)

  // Map of technology names to their icons and categories
  const techMap = {
    'javascript': { icon: <FaJs className="text-yellow-400" />, cat: 'frontend' },
    'typescript': { icon: <SiTypescript className="text-blue-600" />, cat: 'frontend' },
    'react': { icon: <FaReact className="text-blue-500" />, cat: 'frontend' },
    'next.js': { icon: <SiNextdotjs className="text-black dark:text-white" />, cat: 'frontend' },
    'tailwind': { icon: <SiTailwindcss className="text-cyan-500" />, cat: 'frontend' },
    'html': { icon: <FaHtml5 className="text-orange-500" />, cat: 'frontend' },
    'css': { icon: <FaCss3Alt className="text-blue-500" />, cat: 'frontend' },
    'nodejs': { icon: <FaNodeJs className="text-green-500" />, cat: 'backend' },
    'python': { icon: <FaPython className="text-blue-600" />, cat: 'backend' },
    'php': { icon: <FaPhp className="text-purple-600" />, cat: 'backend' },
    'laravel': { icon: <FaLaravel className="text-red-500" />, cat: 'backend' },
    'express': { icon: <SiExpress className="text-gray-500" />, cat: 'backend' },
    'mongodb': { icon: <SiMongodb className="text-green-600" />, cat: 'databases' },
    'mysql': { icon: <SiMysql className="text-blue-700" />, cat: 'databases' },
    'firebase': { icon: <SiFirebase className="text-orange-500" />, cat: 'databases' },
    'vercel': { icon: <SiVercel className="text-black dark:text-white" />, cat: 'tools' },
    'git': { icon: <FaGitAlt className="text-orange-500" />, cat: 'tools' },
    'figma': { icon: <FaFigma className="text-pink-500" />, cat: 'tools' },
  }

  useEffect(() => {
    const fetchGithubSkills = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.github.com/users/Tibrahi/repos?per_page=100')
        const repos = await response.json()

        const stats = {}
        const totalRepos = repos.length

        repos.forEach(repo => {
          // 1. Check Primary Language
          if (repo.language) {
            const lang = repo.language.toLowerCase()
            stats[lang] = (stats[lang] || 0) + 1
          }
          // 2. Check Topics (for Frameworks like React/Tailwind)
          repo.topics?.forEach(topic => {
            const t = topic.toLowerCase()
            stats[t] = (stats[t] || 0) + 1
          })
        })

        // Format and Categorize
        const categorized = { frontend: [], backend: [], databases: [], tools: [] }
        
        Object.keys(stats).forEach(key => {
          const tech = techMap[key] || techMap[key.replace('.js', '')]
          if (tech) {
            const count = stats[key]
            const percentage = (count / totalRepos) * 100
            
            // Logic: More projects = Higher proficiency
            let level = 'Beginner'
            if (percentage > 30 || count > 8) level = 'Expert'
            else if (percentage > 15 || count > 4) level = 'Advanced'
            else if (count >= 2) level = 'Intermediate'

            categorized[tech.cat].push({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              level: level,
              projects: `${count} Projects`,
              icon: tech.icon
            })
          }
        })

        // Sort by level (Expert first)
        Object.keys(categorized).forEach(cat => {
          categorized[cat].sort((a, b) => (a.level === 'Expert' ? -1 : 1))
        })

        setSkillsData(categorized)
      } catch (err) {
        console.error("Failed to sync skills:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGithubSkills()
  }, [])

  const LevelBadge = ({ level }) => {
    const colors = {
      Expert: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
      Advanced: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
      Intermediate: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
      Beginner: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300'
    }
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[level]}`}>{level}</span>
  }

  const SkillCategory = ({ title, items }) => (
    <div className={`p-5 rounded-xl border transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
      <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-100'}`}>
        {title}
      </h3>
      <div className="space-y-4">
        {items.length > 0 ? items.map((skill, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="text-2xl group-hover:scale-110 transition-transform">{skill.icon}</div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">{skill.projects}</span>
              </div>
            </div>
            <LevelBadge level={skill.level} />
          </div>
        )) : <p className="text-xs text-gray-500 italic">No public data found yet.</p>}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center sm:text-left">
          <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Verified Expertise</h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Proficiency levels are automatically calculated based on my 
            <span className="text-blue-500 font-bold"> real-time GitHub activity</span>.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => <div key={n} className={`h-64 rounded-xl animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCategory title="Frontend" items={skillsData.frontend} />
            <SkillCategory title="Backend" items={skillsData.backend} />
            <SkillCategory title="Databases" items={skillsData.databases} />
            <SkillCategory title="Tools" items={skillsData.tools} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills
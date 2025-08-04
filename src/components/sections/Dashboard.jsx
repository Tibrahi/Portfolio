import React, { useState, useEffect } from 'react'
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaCode, 
  FaStar, 
  FaCodeBranch,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaFigma,
  FaLaravel,
  FaBootstrap,
  FaEye,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'
import { 
  SiTypescript, 
  SiMongodb, 
  SiVercel, 
  SiTailwindcss, 
  SiBulma, 
  SiPreact,
  SiNextdotjs,
  SiSass,
  SiLess
} from 'react-icons/si'

const Dashboard = ({ isDarkMode }) => {
  const [githubData, setGithubData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [projectCount, setProjectCount] = useState(0)
  const [totalRepos, setTotalRepos] = useState(0)
  const reposPerPage = 12

  const technologies = [
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "React", icon: <FaReact className="text-blue-500" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Python", icon: <FaPython className="text-blue-600" /> },
    { name: "MySQL", icon: <FaDatabase className="text-blue-700" /> },
    { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    { name: "Vercel", icon: <SiVercel className="text-black dark:text-white" /> },
    { name: "PHP", icon: <FaPhp className="text-purple-600" /> },
    { name: "Laravel", icon: <FaLaravel className="text-red-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
    { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Sass", icon: <SiSass className="text-pink-500" /> },
    { name: "Less", icon: <SiLess className="text-blue-400" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: "Bulma", icon: <SiBulma className="text-blue-500" /> },
    { name: "Preact", icon: <SiPreact className="text-purple-500" /> },
    { name: "Figma", icon: <FaFigma className="text-pink-500" /> }
  ]

  const personalInfo = {
    name: "Tuyizere Ibrahim",
    role: "Full Stack Developer",
    bio: "Passionate developer focused on creating efficient and user-friendly applications",
    location: "Rwanda , Kigali , Kicukiro , Gatenga , KK595st",
    email: "ibrahimtuyizere2@gmail.com",
    github: "Tibrahi",
    linkedin: "tuyizere-ibrahim-89ba8b275",
    skills: technologies
  }

  const fetchGithubData = async (pageNum = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(
        `https://api.github.com/users/${personalInfo.github}/repos?page=${pageNum}&per_page=${reposPerPage}&sort=updated`
      )
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      
      // Check if we have more repos to fetch
      const linkHeader = response.headers.get('Link')
      const hasMorePages = linkHeader && linkHeader.includes('rel="next"')
      setHasMore(hasMorePages)

      // Get total count from headers if available
      const totalCount = response.headers.get('X-Total-Count')
      if (totalCount) {
        setTotalRepos(parseInt(totalCount))
      }

      if (pageNum === 1) {
        setGithubData(data)
      } else {
        setGithubData(prev => [...prev, ...data])
      }
      
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGithubData(page)
  }, [page])

  // Animated project count
  useEffect(() => {
    let interval
    if (projectCount < githubData.length) {
      interval = setInterval(() => {
        setProjectCount(prev => {
          if (prev < githubData.length) return prev + 1
          clearInterval(interval)
          return prev
        })
      }, 20)
    } else if (projectCount > githubData.length) {
      setProjectCount(githubData.length)
    }
    return () => clearInterval(interval)
  }, [githubData.length])

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500'
      case 'in progress':
        return 'bg-blue-500'
      case 'planned':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTechnologyIcon = (techName) => {
    const tech = technologies.find(t => 
      t.name.toLowerCase() === techName.toLowerCase() ||
      t.name.toLowerCase().replace('.', '') === techName.toLowerCase()
    )
    return tech ? tech.icon : <FaCode className="text-gray-500" />
  }

  return (
    <div className={`p-2 xs:p-4 sm:p-6 space-y-4 xs:space-y-6 sm:space-y-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Personal Information Section */}
      <div className={`max-w-7xl mx-auto rounded-lg p-4 xs:p-6 sm:p-8 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row items-center gap-4 xs:gap-6 sm:gap-8">
          <div className="w-32 xs:w-40 sm:w-48 h-32 xs:h-40 sm:h-48 rounded-full overflow-hidden">
            <img
              src={`https://github.com/${personalInfo.github}.png`}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150'
              }}
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {personalInfo.name}
        </h1>
            <p className={`text-lg xs:text-xl mb-3 xs:mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {personalInfo.role}
            </p>
            <p className={`text-base xs:text-lg mb-4 xs:mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <a
                href={`https://github.com/${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaEnvelope /> Email
              </a>
            </div>
              <div className="flex flex-wrap gap-2">
              {personalInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                  className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                  {skill.icon}
                  {skill.name}
                  </span>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={`max-w-7xl mx-auto rounded-lg p-4 xs:p-6 ${
          isDarkMode ? 'bg-red-900' : 'bg-red-100'
        }`}>
          <p className={`text-center text-sm xs:text-base ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
            Error loading GitHub data: {error}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className={`max-w-7xl mx-auto rounded-lg p-4 xs:p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={`text-center text-sm xs:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading GitHub data...
          </p>
        </div>
      )}

      {/* Projects Grid with Infinite Scroll */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 xs:gap-6 mb-4 xs:mb-6">
          <h2 className={`text-xl xs:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>All Projects ({githubData.length})</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchGithubData(1)}
              className={`px-3 xs:px-4 py-2 rounded-lg flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <FaGithub className="text-base xs:text-lg" />
              Refresh Projects
            </button>
            {lastUpdated && (
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
          {githubData.map((repo) => (
            <a 
              key={repo.id} 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg p-4 xs:p-6 shadow-lg transform transition-all hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3 xs:mb-4">
                <h3 className={`text-lg xs:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{repo.name}</h3>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm text-white ${repo.private ? 'bg-gray-500' : 'bg-green-500'}`}>{repo.private ? 'Private' : 'Public'}</span>
                  <span className={`px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm text-white ${repo.archived ? 'bg-red-500' : 'bg-blue-500'}`}>{repo.archived ? 'Archived' : 'Active'}</span>
                </div>
              </div>
              <p className={`text-sm xs:text-base mb-3 xs:mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{repo.description || 'No description available'}</p>
              <div className="flex flex-wrap gap-2 mb-3 xs:mb-4">
                {repo.topics?.map((topic) => (
                  <span
                    key={topic}
                    className={`px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-3 xs:mt-4 flex items-center justify-between text-sm xs:text-base">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCodeBranch className="text-green-500" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEye className="text-purple-500" />
                  <span>{repo.watchers_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:bg-gray-800'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-300'
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div>
              ) : (
                <>
                  Load More
                  <FaChevronRight />
                </>
              )}
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 
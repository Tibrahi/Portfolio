import React, { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'

const Projects = ({ isDarkMode }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.github.com/users/Tibrahi/repos?sort=updated&per_page=100')
        
        if (!response.ok) throw new Error('Failed to fetch projects')
        
        const data = await response.json()

        // Filter: Keep only projects that have a "homepage" (Live URL)
        const liveProjects = data.filter(repo => repo.homepage && repo.homepage.trim() !== '')

        // Map GitHub data to our project structure
        const formattedProjects = liveProjects.map(repo => ({
          id: repo.id,
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Clean up names like "my-project" to "my project"
          description: repo.description || 'No description available.',
          technologies: repo.topics.length > 0 ? repo.topics : [repo.language || 'Code'], // Use GitHub topics or fallback to main language
          link: repo.homepage,
          github: repo.html_url,
          // Use Microlink API to generate a screenshot of the live site on the fly
          screenshot: `https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`,
          status: 'live' // Since it has a homepage, we consider it live
        }))

        setProjects(formattedProjects)
      } catch (err) {
        console.error("GitHub Fetch Error:", err)
        setError("Failed to load live projects.")
      } finally {
        setLoading(false)
      }
    }

    fetchLiveProjects()
  }, [])

  // Dynamic Stats
  const totalProjects = projects.length

  if (error) {
    return (
      <div className={`p-6 text-center ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-2 xs:p-4 sm:p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className={`text-2xl xs:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Live Deployments
        </h1>
        {/* Live Project Counter Badge */}
        {!loading && (
          <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
            isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {totalProjects} Active Sites
          </span>
        )}
      </div>
      
      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className={`h-80 rounded-xl animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      ) : (
        /* Project Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`group flex flex-col h-full rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
              
              {/* Project Image Area */}
              <div className="w-full h-48 overflow-hidden relative bg-gray-900">
                <img 
                  src={project.screenshot}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if screenshot fails
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex'; // Show fallback icon
                  }}
                />
                {/* Fallback Icon (Hidden unless image fails) */}
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-800 text-gray-600">
                  <FaCode size={40} />
                </div>

                {/* Overlay Links */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-gray-900 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                    title="Visit Live Site"
                  >
                    <FaExternalLinkAlt />
                  </a>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-all transform hover:scale-110 shadow-lg border border-gray-700"
                    title="View Source Code"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-bold capitalize ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                </div>

                <p className={`text-sm mb-4 line-clamp-3 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className={`px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wide ${
                        isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`text-xs px-2 py-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className={`text-center py-20 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No Live Projects Found</h3>
          <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Add a "Homepage" URL to your GitHub repositories to display them here.
          </p>
        </div>
      )}
    </div>
  )
}

export default Projects
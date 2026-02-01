import React, { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaCode, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Projects = ({ isDarkMode }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6 // 3 above, 3 under per page

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.github.com/users/Tibrahi/repos?sort=updated&per_page=100')
        const data = await response.json()

        // 1. Filter for Live projects & 2. Remove Duplicates by HTML_URL
        const uniqueLiveRepos = []
        const seenUrls = new Set()

        data.forEach(repo => {
          if (repo.homepage && repo.homepage.trim() !== '' && !seenUrls.has(repo.homepage)) {
            seenUrls.add(repo.homepage)
            uniqueLiveRepos.push({
              id: repo.id,
              title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
              description: repo.description || 'Modern web application built with clean architecture.',
              technologies: repo.topics.length > 0 ? repo.topics : [repo.language || 'Software'],
              link: repo.homepage,
              github: repo.html_url,
              screenshot: `https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false&embed=screenshot.url`,
            })
          }
        })

        setProjects(uniqueLiveRepos)
      } catch (err) {
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveProjects()
  }, [])

  // Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Deployed Projects
          </h1>
          <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, projects.length)} of {projects.length}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className={`h-80 rounded-2xl animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        ) : (
          <>
            {/* Grid: 3 Above, 3 Under */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentProjects.map((project) => (
                <div 
                  key={project.id}
                  className={`group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-xl'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img 
                      src={project.screenshot} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <a href={project.link} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full text-black hover:bg-blue-500 hover:text-white transition-colors"><FaExternalLinkAlt /></a>
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-3 bg-gray-900 rounded-full text-white hover:bg-gray-700 transition-colors border border-gray-600"><FaGithub /></a>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`text-xl font-bold mb-2 capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                    <p className={`text-sm line-clamp-2 mb-4 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Pagination UI */}
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-full transition-all ${isDarkMode ? 'hover:bg-gray-800 text-white disabled:opacity-20' : 'hover:bg-gray-100 text-gray-900 disabled:opacity-20'}`}
                >
                  <FaChevronLeft />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-full font-bold transition-all ${
                        currentPage === i + 1 
                        ? 'bg-blue-600 text-white' 
                        : (isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100')
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-full transition-all ${isDarkMode ? 'hover:bg-gray-800 text-white disabled:opacity-20' : 'hover:bg-gray-100 text-gray-900 disabled:opacity-20'}`}
                >
                  <FaChevronRight />
                </button>
              </div>
              <p className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Projects
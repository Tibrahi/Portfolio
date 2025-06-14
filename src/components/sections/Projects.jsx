import React, { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa'

// images 
import Elearning from '../../images/Elearning.png'
import XEBtrade from '../../images/XEBtrade.png'
import CommunityConnect from '../../images/CommunityConnect.png'

const Projects = ({ isDarkMode }) => {
  const projects = [
    {
      id: 1,
      title: 'CineVault',
      description: 'web-based movie discovery and streaming info platform that lets users explore popular, trending, and top-rated movies and TV shows.',
      technologies: ['React','TailwindCSS','VanillaJs'],
      // image: XEBtrade,
      link: 'https://cine-vault-two.vercel.app/',
      github: 'https://github.com/Tibrahi/CineVault',
      screenshot: 'https://cine-vault-two.vercel.app/',
      status: 'under-construction'
    },
    {
      id: 2,
      title: 'RocketGame',
      description: 'An interactive space-themed game where players control a rocket through various challenges and obstacles in space.',
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
      link: 'https://rocket-game-opal.vercel.app/',
      github: 'https://github.com/Tibrahi/RocketGame',
      screenshot: 'https://rocket-game-opal.vercel.app/',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Elearning Platform Based Memorize',
      description: 'Memorize is a minimalist e-learning platform where users strengthen their coding memory by writing code from scratch.',
      technologies: ['React', 'Emailjs'],
      image: Elearning,
      link: 'https://elearning-taupe.vercel.app/',
      github: 'https://github.com/Tibrahi/Elearning',
      screenshot: 'https://elearning-taupe.vercel.app/api/og',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Txlogic',
      description: " txlogic is a web-based cargo tracking system that logs, monitors, and updates cargo movement across logistics channels in real time.",
      technologies: ['React','Typescript', 'Node.js','Firebase','Emailjs'],
      image: CommunityConnect,
      link: 'https://txlogic.vercel.app/',
      github: 'https://github.com/Tibrahi/Txlogic',
      screenshot: 'https://txlogic.vercel.app/',
      status: 'under-construction'
    }
  ]

  // Calculate actual counts based on projects array
  const finalProjectCount = projects.length // Total number of projects
  const finalCollaboratorCount = projects.filter(p => p.status === 'completed').length // Number of completed projects
  const finalFeaturedCount = projects.filter(p => p.status === 'under-construction').length // Number of projects under construction

  const [projectCount, setProjectCount] = useState(0)
  const [collaboratorCount, setCollaboratorCount] = useState(0)
  const [featuredCount, setFeaturedCount] = useState(0)

  useEffect(() => {
    // Project count animation
    let projectInterval
    if (projectCount < finalProjectCount) {
      projectInterval = setInterval(() => {
        setProjectCount(prevCount => prevCount + 1)
      }, 10) // Adjust interval for speed
    }
    return () => clearInterval(projectInterval)
  }, [projectCount, finalProjectCount])

  useEffect(() => {
    // Collaborator count animation
    let collaboratorInterval
    if (collaboratorCount < finalCollaboratorCount) {
      collaboratorInterval = setInterval(() => {
        setCollaboratorCount(prevCount => prevCount + 1)
      }, 50) // Adjust interval for speed
    }
    return () => clearInterval(collaboratorInterval)
  }, [collaboratorCount, finalCollaboratorCount])

  useEffect(() => {
    // Featured count animation
    let featuredInterval
    if (featuredCount < finalFeaturedCount) {
      featuredInterval = setInterval(() => {
        setFeaturedCount(prevCount => prevCount + 1)
      }, 30) // Adjust interval for speed
    }
    return () => clearInterval(featuredInterval)
  }, [featuredCount, finalFeaturedCount])

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return isDarkMode ? 'bg-green-500' : 'bg-green-400'
      case 'in-progress':
        return isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
      case 'under-construction':
        return isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400'
      default:
        return isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'under-construction':
        return 'Under Construction'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="p-2 xs:p-4 sm:p-6">
      <h1 className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`rounded-lg shadow-md overflow-hidden block relative
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            hover:shadow-lg transition-shadow duration-300`}>
            {/* Status Badge */}
            <div className="absolute top-2 right-2 z-10">
              <span className={`${getStatusColor(project.status)} text-white px-2 xs:px-3 py-1 rounded-full text-xs font-medium`}>
                {getStatusText(project.status)}
              </span>
            </div>
            {/* Project Image Container */}
            <div className="w-full h-48 xs:h-56 sm:h-64 overflow-hidden relative group">
              <img 
                src={project.screenshot}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to a default image if the OG image fails to load
                  e.target.src = `https://api.microlink.io/?url=${project.link}&screenshot=true&meta=false&embed=screenshot.url`
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors"
                  title="View Live Demo"
                >
                  <FaExternalLinkAlt />
                </a>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors"
                  title="View Source Code"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
            {/* Project Content Container */}
            <div className="p-3 xs:p-4 sm:p-6">
              <h3 className={`text-lg xs:text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h3>
              <p className={`text-sm xs:text-base mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Live Demo
                </a>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
                  }`}
                >
                  <FaGithub className="text-xs" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project Count Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Projects</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {projectCount}
          </p>
        </div>

        {/* Featured Count Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Featured Count</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {featuredCount}
          </p>
        </div>

        {/* Collaborator Appreciation Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Collaborators</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {collaboratorCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Projects
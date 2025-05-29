import React, { useState, useEffect } from 'react'

// images 
import Elearning from '../../images/Elearning.png'
import XEBtrade from '../../images/XEBtrade.png'
import CommunityConnect from '../../images/CommunityConnect.png'

const Projects = ({ isDarkMode }) => {
  const projects = [
    {
      id: 1,
      title: 'XEBtrade Platform',
      description: 'XEBTrade is a user-friendly cryptocurrency trading platform designed for ease, speed, and clarity. ',
      technologies: ['React', 'Node.js','Firebase','Emailjs'],
      image: XEBtrade,
      link: 'https://xebtrade.com',
      status: 'under-construction'
    },
    {
      id: 2,
      title: 'Elearning Platform Based Memorize',
      description: 'Memorize is a minimalist e-learning platform where users strengthen their coding memory by writing code from scratch.',
      technologies: ['React', 'Emailjs'],
      image: Elearning,
      link: 'https://elearning-taupe.vercel.app/',
      status: 'completed'
    },
    {
      id: 3,
      title: 'CommunityConnect Platform',
      description: "CommunityConnect is a vibrant platform designed to bring people together through shared interests, discussions, and collaboration.",
      technologies: ['Preact', 'Node.js','Mysql','Emailjs'],
      image: CommunityConnect,
      link: 'https://communityconnect.com',
      status: 'under-construction'
    }
  ]

  const finalProjectCount = 15 // Set your final project count here
  const finalCollaboratorCount = 50 // Set your final collaborator count here
  const finalFeaturedCount = 10 // Set your final featured project related count here

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
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project) => (
          <a 
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg shadow-md overflow-hidden block relative
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            hover:shadow-lg transition-shadow duration-300`}>
            {/* Status Badge */}
            <div className="absolute top-2 right-2 z-10">
              <span className={`${getStatusColor(project.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {getStatusText(project.status)}
              </span>
            </div>
            {/* Project Image Container */}
            {project.image && (
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={`Image for ${project.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Project Content Container */}
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {project.title}
              </h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${isDarkMode 
                      ? (tech === 'React' 
                          ? 'bg-blue-900/80 text-blue-200' 
                          : tech === 'Node.js'
                            ? 'bg-green-900/80 text-green-200'
                            : tech === 'Mysql'
                              ? 'bg-orange-900/80 text-orange-200'
                              : 'bg-purple-900/80 text-purple-200')
                      : (tech === 'React'
                          ? 'bg-blue-100 text-blue-800'
                          : tech === 'Node.js'
                            ? 'bg-green-100 text-green-800'
                            : tech === 'Mysql'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-purple-100 text-purple-800')
                    }`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
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
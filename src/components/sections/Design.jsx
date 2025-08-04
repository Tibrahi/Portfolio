import React, { useState, useEffect } from 'react'
import { FaFigma, FaExternalLinkAlt, FaEye } from 'react-icons/fa'

const Design = ({ isDarkMode }) => {
  const designs = [
    {
      id: 1,
      title: 'Portfolio Website Design',
      description: 'Modern and responsive portfolio website design with dark/light theme support and interactive elements.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/Portfolio-Design',
      previewImage: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Portfolio+Design',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX',
      description: 'Complete mobile application design with user interface and user experience considerations.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/Mobile-App-Design',
      previewImage: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Mobile+App+Design',
      status: 'completed'
    },
    {
      id: 3,
      title: 'E-commerce Platform',
      description: 'Comprehensive e-commerce platform design with product listings, cart, and checkout flows.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/E-commerce-Design',
      previewImage: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=E-commerce+Design',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Dashboard Interface',
      description: 'Analytics dashboard design with data visualization components and interactive charts.',
      category: 'Dashboard Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/Dashboard-Design',
      previewImage: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Dashboard+Design',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Landing Page Design',
      description: 'High-converting landing page design with call-to-action elements and user flow optimization.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/Landing-Page-Design',
      previewImage: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Landing+Page+Design',
      status: 'under-construction'
    },
    {
      id: 6,
      title: 'Social Media App',
      description: 'Social networking application design with profile, feed, and messaging features.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/file/your-figma-file-id/Social-App-Design',
      previewImage: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Social+App+Design',
      status: 'completed'
    }
  ]

  // Calculate actual counts based on designs array
  const finalDesignCount = designs.length
  const finalCompletedCount = designs.filter(d => d.status === 'completed').length
  const finalInProgressCount = designs.filter(d => d.status === 'in-progress').length

  const [designCount, setDesignCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [inProgressCount, setInProgressCount] = useState(0)

  useEffect(() => {
    // Design count animation
    let designInterval
    if (designCount < finalDesignCount) {
      designInterval = setInterval(() => {
        setDesignCount(prevCount => prevCount + 1)
      }, 100)
    }
    return () => clearInterval(designInterval)
  }, [designCount, finalDesignCount])

  useEffect(() => {
    // Completed count animation
    let completedInterval
    if (completedCount < finalCompletedCount) {
      completedInterval = setInterval(() => {
        setCompletedCount(prevCount => prevCount + 1)
      }, 150)
    }
    return () => clearInterval(completedInterval)
  }, [completedCount, finalCompletedCount])

  useEffect(() => {
    // In progress count animation
    let inProgressInterval
    if (inProgressCount < finalInProgressCount) {
      inProgressInterval = setInterval(() => {
        setInProgressCount(prevCount => prevCount + 1)
      }, 200)
    }
    return () => clearInterval(inProgressInterval)
  }, [inProgressCount, finalInProgressCount])

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

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Web Design':
        return isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
      case 'Mobile Design':
        return isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
      case 'Dashboard Design':
        return isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'
      default:
        return isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
    }
  }

  return (
    <div className="p-2 xs:p-4 sm:p-6">
      <h1 className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Designs</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
        {designs.map((design) => (
          <div 
            key={design.id}
            className={`rounded-lg shadow-md overflow-hidden block relative
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            hover:shadow-lg transition-shadow duration-300`}>
            {/* Status Badge */}
            <div className="absolute top-2 right-2 z-10">
              <span className={`${getStatusColor(design.status)} text-white px-2 xs:px-3 py-1 rounded-full text-xs font-medium`}>
                {getStatusText(design.status)}
              </span>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span className={`${getCategoryColor(design.category)} text-white px-2 xs:px-3 py-1 rounded-full text-xs font-medium`}>
                {design.category}
              </span>
            </div>
            
            {/* Design Image Container */}
            <div className="w-full h-48 xs:h-56 sm:h-64 overflow-hidden relative group">
              <img 
                src={design.previewImage}
                alt={`Preview of ${design.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a 
                  href={design.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors"
                  title="View in Figma"
                >
                  <FaFigma />
                </a>
                <a 
                  href={design.previewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-colors"
                  title="View Full Preview"
                >
                  <FaEye />
                </a>
              </div>
            </div>
            
            {/* Design Content Container */}
            <div className="p-3 xs:p-4 sm:p-6">
              <h3 className={`text-lg xs:text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {design.title}
              </h3>
              <p className={`text-sm xs:text-base mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {design.description}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href={design.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  <FaFigma className="text-xs" />
                  View in Figma
                </a>
                <a 
                  href={design.previewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'
                  }`}
                >
                  <FaEye className="text-xs" />
                  Preview
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Designs Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Designs</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {designCount}
          </p>
        </div>

        {/* Completed Designs Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Completed</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {completedCount}
          </p>
        </div>

        {/* In Progress Card */}
        <div className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>In Progress</h2>
          <p className={`text-5xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {inProgressCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Design 
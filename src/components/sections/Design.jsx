import React, { useState } from 'react' // Re-added useState for lazy loading
import { FaFigma, FaEye, FaCodeBranch, FaClock, FaCheckCircle, FaPlayCircle } from 'react-icons/fa' 

const Design = ({ isDarkMode }) => {
  // Designs array remains the same (using embedLink)
  const designs = [
    {
      id: 1,
      title: 'Maidlink',
      description: 'Service connection platform connecting households with professional help.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/rWGDaOqDxj0WoEbdqF5hmJ/Maidlink?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FrWGDaOqDxj0WoEbdqF5hmJ%2FMaidlink',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Igitree',
      description: 'Digital platform focused on growth and environmental tracking.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/bV180n1Sd2axqkJrnEEjss/igitree?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FbV180n1Sd2axqkJrnEEjss%2Figitree',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Umudugudu Connect',
      description: 'Community engagement platform for local connectivity and updates.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/PvRrhuUZes6sjsAjb5TY4A/Umudugu-connect?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FPvRrhuUZes6sjsAjb5TY4A%2FUmudugu-connect',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Sawapay',
      description: 'Fintech mobile application design for seamless payments and transfers.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/design/qkwCvVuhl0j0qBLEakwBNO/Sawapay_Design?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FqkwCvVuhl0j0qBLEakwBNO%2FSawapay_Design',
      status: 'completed'
    },
    {
      id: 5,
      title: 'We Donate',
      description: 'Charity and volunteering platform connecting donors with causes.',
      category: 'Web Design',
      figmaLink: 'https://www.figma.com/design/Cf3gkh0KAAUqNFsUywKiqw/WeDonateTime?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FCf3gkh0KAAUqNFsUywKiqw%2FWeDonateTime',
      status: 'under-construction'
    },
    {
      id: 6,
      title: 'Equalynk',
      description: 'Social impact platform promoting equality and resource sharing.',
      category: 'Mobile Design',
      figmaLink: 'https://www.figma.com/design/aHnKAbZc4SQIujxoE7w9jM/Equalynk?m=auto&t=So1Oj6OHJ2MIj1Oo-6',
      embedLink: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FaHnKAbZc4SQIujxoE7w9jM%2FEqualynk',
      status: 'completed'
    }
  ];

  // State to track which embeds have been loaded by the user
  const [loadedEmbeds, setLoadedEmbeds] = useState({});

  const handleLoadEmbed = (id) => {
    setLoadedEmbeds(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Remaining static data and helper functions (getStatusColor, etc.)
  const finalDesignCount = designs.length
  const finalCompletedCount = designs.filter(d => d.status === 'completed').length
  const finalInProgressCount = designs.filter(d => d.status === 'in-progress').length

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return isDarkMode ? 'bg-green-600' : 'bg-green-500'
      case 'in-progress': return isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
      case 'under-construction': return isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500'
      default: return isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed'
      case 'in-progress': return 'In Progress'
      case 'under-construction': return 'Building'
      default: return 'Unknown'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Web Design': return isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
      case 'Mobile Design': return isDarkMode ? 'bg-pink-600' : 'bg-pink-500'
      default: return isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
    }
  }


  return (
    <div className="p-2 xs:p-4 sm:p-6">
      <h1 className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        ✨ My Live Figma Portfolio
      </h1>
      
      {/* Design Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-8 xs:mb-10 sm:mb-12">
        {designs.map((design) => {
          const isLoaded = loadedEmbeds[design.id];

          return (
            <div 
              key={design.id}
              className={`rounded-xl shadow-lg border relative
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
              hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
              
              {/* Design Preview (Lazy Loading Implementation) */}
              <div className="w-full h-56 rounded-t-xl overflow-hidden relative">
                
                {/* 1. PLACEHOLDER (Loads Instantly) */}
                {!isLoaded && (
                  <div className={`w-full h-full flex flex-col items-center justify-center p-4 cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                       onClick={() => handleLoadEmbed(design.id)}
                       role="button"
                       aria-label={`Load live preview for ${design.title}`}>
                    
                    <FaPlayCircle className={`text-5xl mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Click to Load Live Figma Preview
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      (Loads faster this way!)
                    </p>
                  </div>
                )}
                
                {/* 2. IFRAME (Only renders after click) */}
                {isLoaded && (
                  <iframe 
                    src={design.embedLink} 
                    title={`${design.title} Live Preview`}
                    className="w-full h-full border-none"
                    allowFullScreen
                    // The 'loading="lazy"' attribute here is generally ignored by iframes on initial render 
                    // which is why the conditional rendering above is essential for maximum speed.
                    loading="eager" 
                  ></iframe>
                )}

                {/* Badges remain on top of both placeholder and iframe */}
                <div className="absolute top-0 right-0 z-10 p-2">
                  <span className={`${getStatusColor(design.status)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                    {getStatusText(design.status)}
                  </span>
                </div>
                <div className="absolute top-0 left-0 z-10 p-2">
                  <span className={`${getCategoryColor(design.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                    {design.category}
                  </span>
                </div>
              </div>
              
              {/* Design Content */}
              <div className="p-4 xs:p-5">
                <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {design.title}
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {design.description}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={design.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium ${
                      isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                    } transition-colors`}
                    title="Open Figma File"
                  >
                    <FaFigma className="text-base" />
                    View File
                  </a>
                  <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                      ID: {design.id}
                  </span>
                </div>
              </div>
            </div>
          )})}
      </div>

      ---

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Designs Card */}
        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCodeBranch className={`text-4xl mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Designs</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mt-1`}>
            {finalDesignCount}
          </p>
        </div>

        {/* Completed Designs Card */}
        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaCheckCircle className={`text-4xl mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Completed</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-1`}>
            {finalCompletedCount}
          </p>
        </div>

        {/* In Progress Card */}
        <div className={`rounded-xl shadow-lg p-6 flex flex-col items-start ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaClock className={`text-4xl mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>In Progress</h2>
          <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-1`}>
            {finalInProgressCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Design
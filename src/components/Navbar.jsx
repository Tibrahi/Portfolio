import React from 'react'

const Navbar = ({ isDarkMode, toggleDarkMode, activeSection, setActiveSection }) => {
  return (
    <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tuyizere Ibrahim
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveSection('about')}
              className={`${
                activeSection === 'about'
                  ? isDarkMode
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`${
                activeSection === 'dashboard'
                  ? isDarkMode
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`${
                activeSection === 'projects'
                  ? isDarkMode
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className={`${
                activeSection === 'contact'
                  ? isDarkMode
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Contact
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 
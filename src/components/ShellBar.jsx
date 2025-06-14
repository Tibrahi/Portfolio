import React from 'react'
import Logo from './Logo'
import { FaBars } from 'react-icons/fa'

const ShellBar = ({ isDarkMode, toggleTheme, isMobile, toggleSideNav }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
    } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={toggleSideNav}
                className={`p-2 rounded-lg mr-2 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaBars className="w-5 h-5" />
              </button>
            )}
            <Logo isDarkMode={isDarkMode} />
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default ShellBar 
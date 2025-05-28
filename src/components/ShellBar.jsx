import React from 'react'
import Logo from './Logo'

const ShellBar = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className={`h-16 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo isDarkMode={isDarkMode} />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
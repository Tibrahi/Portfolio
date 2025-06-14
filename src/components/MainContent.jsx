import React from 'react'

const MainContent = ({ children, isDarkMode, isMobile }) => {
  return (
    <main className={`flex-1 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-20`}>
        {children}
      </div>
    </main>
  )
}

export default MainContent
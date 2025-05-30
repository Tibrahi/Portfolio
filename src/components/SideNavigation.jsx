import React, { useState, useEffect } from 'react'

const SideNavigation = ({ isCollapsed, setIsCollapsed, activeSection, setActiveSection, isDarkMode, isMobile }) => {
  const [title, setTitle] = useState('About Me')

  const navItems = [
    { id: 'about', label: 'About', icon: '👨‍💻', title: 'About Me' },
    { id: 'skills', label: 'Skills', icon: '⚡', title: 'My Skills' },
    { id: 'projects', label: 'Projects', icon: '🚀', title: 'My Projects' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊', title: 'Project Stats' },
    { id: 'contact', label: 'Contact', icon: '📧', title: 'Contact Me' }
  ]

  useEffect(() => {
    const activeItem = navItems.find(item => item.id === activeSection)
    if (activeItem) {
      setTitle(activeItem.title)
    }
  }, [activeSection])

  return (
    <>
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      <nav 
        className={`fixed md:relative z-30 transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } ${
          isCollapsed 
            ? 'w-16 md:w-20' 
            : 'w-64'
        } ${
          isMobile 
            ? (isCollapsed ? '-translate-x-full' : 'translate-x-0')
            : ''
        } h-full border-r ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="p-4">
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'} ${isCollapsed ? 'hidden' : 'block'}`}>
            {title}
          </h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id)
                    if (isMobile) {
                      setIsCollapsed(true)
                    }
                  }}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default SideNavigation
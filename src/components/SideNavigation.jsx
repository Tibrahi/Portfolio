import React, { useState, useEffect } from 'react'

const SideNavigation = ({ isCollapsed, setIsCollapsed, activeSection, setActiveSection, isDarkMode }) => {
  const [title, setTitle] = useState('Portfolio')

  const navItems = [
    { id: 'about', label: 'About', icon: '👤', title: 'About Me' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊', title: 'Project Dashboard' },
    { id: 'projects', label: 'Projects', icon: '💼', title: 'My Projects' },
    { id: 'skills', label: 'Skills', icon: '⚡', title: 'Technical Skills' },
    { id: 'contact', label: 'Contact', icon: '📧', title: 'Get in Touch' }
  ]

  useEffect(() => {
    const currentItem = navItems.find(item => item.id === activeSection)
    if (currentItem) {
      setTitle(currentItem.title)
    } else {
      setTitle('Portfolio')
    }
  }, [activeSection])

  return (
    <nav className={`flex flex-col h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-r ${
      isDarkMode ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} transition-all duration-300`}>
            {title}
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:bg-gray-800 hover:text-emerald-400' 
              : 'text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'
          }`}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-4 py-3 transition-colors ${
              activeSection === item.id
                ? isDarkMode
                  ? 'bg-gray-800 text-emerald-400'
                  : 'bg-emerald-50 text-emerald-700'
                : isDarkMode
                ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default SideNavigation
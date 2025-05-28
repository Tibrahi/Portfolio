import React, { useState, useEffect } from 'react'
import ShellBar from './components/ShellBar'
import SideNavigation from './components/SideNavigation'
import MainContent from './components/MainContent'
import Loading from './components/Loading'

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }

    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <ShellBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex-1 flex overflow-hidden">
        <SideNavigation 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isDarkMode={isDarkMode}
        />
        <MainContent 
          activeSection={activeSection} 
          isDarkMode={isDarkMode} 
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  )
}

export default App

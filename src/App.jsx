import React, { useState, useEffect } from 'react'
import SideNavigation from './components/SideNavigation'
import ShellBar from './components/ShellBar'
import MainContent from './components/MainContent'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Dashboard from './components/sections/Dashboard'
import Design from './components/sections/Design'
import Loading from './components/Loading'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener('change', handleChange)

    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} />
      case 'about':
        return <About isDarkMode={isDarkMode} />
      case 'projects':
        return <Projects isDarkMode={isDarkMode} />
      case 'skills':
        return <Skills isDarkMode={isDarkMode} />
      case 'design':
        return <Design isDarkMode={isDarkMode} />
      case 'contact':
        return <Contact isDarkMode={isDarkMode} />
      default:
        return <Dashboard isDarkMode={isDarkMode} />
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <ShellBar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        isMobile={isMobile}
        toggleSideNav={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex flex-1 relative">
      <SideNavigation
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
          isMobile={isMobile}
      />
        <MainContent isDarkMode={isDarkMode} isMobile={isMobile}>
          {renderSection()}
        </MainContent>
      </div>
    </div>
  )
}

export default App

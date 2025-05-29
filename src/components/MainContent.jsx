import React from 'react'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Dashboard from './sections/Dashboard'

const MainContent = ({ activeSection, isDarkMode, setActiveSection }) => {
  return (
    <main className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'about' && <About isDarkMode={isDarkMode} setActiveSection={setActiveSection} />}
        {activeSection === 'projects' && <Projects isDarkMode={isDarkMode} />}
        {activeSection === 'skills' && <Skills isDarkMode={isDarkMode} />}
        {activeSection === 'contact' && <Contact isDarkMode={isDarkMode} />}
        {activeSection === 'dashboard' && <Dashboard isDarkMode={isDarkMode} />}
      </div>
    </main>
  )
}

export default MainContent
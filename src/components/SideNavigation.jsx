import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, 
  FaBriefcase, 
  FaLaptopCode, 
  FaProjectDiagram, 
  FaPalette, 
  FaChartPie, 
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa'

const SideNavigation = ({ isCollapsed, setIsCollapsed, activeSection, setActiveSection, isDarkMode, isMobile }) => {
  const [headerTitle, setHeaderTitle] = useState('Overview')

  // Refined Data with Professional Icons
  const navItems = [
    { id: 'about', label: 'Overview', icon: <FaUser />, title: 'Professional Profile' },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase />, title: 'Career History' }, // Fixed typo 'experience '
    { id: 'skills', label: 'Expertise', icon: <FaLaptopCode />, title: 'Technical Stack' },
    { id: 'projects', label: 'Portfolio', icon: <FaProjectDiagram />, title: 'Selected Works' },
    { id: 'design', label: 'UI/UX', icon: <FaPalette />, title: 'Design Gallery' },
    { id: 'dashboard', label: 'Metrics', icon: <FaChartPie />, title: 'Performance Stats' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, title: 'Get in Touch' }
  ]

  // Sync Header Title with Active Section
  useEffect(() => {
    const activeItem = navItems.find(item => item.id === activeSection)
    if (activeItem) {
      setHeaderTitle(activeItem.title)
    }
  }, [activeSection])

  // --- Animations ---
  const sidebarVariants = {
    expanded: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
    collapsed: { width: "5rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
    mobileHidden: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    mobileVisible: { x: 0, width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -10, display: "none" },
    visible: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1 } }
  }

  return (
    <>
      {/* Mobile Overlay (Backdrop) */}
      <AnimatePresence>
        {isMobile && !isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.nav 
        variants={sidebarVariants}
        initial={isMobile ? "mobileHidden" : "expanded"}
        animate={
            isMobile 
            ? (!isCollapsed ? "mobileVisible" : "mobileHidden") 
            : (isCollapsed ? "collapsed" : "expanded")
        }
        className={`fixed md:relative z-50 h-full shadow-2xl flex flex-col justify-between
          ${isDarkMode 
            ? 'bg-gray-900 border-r border-gray-800' 
            : 'bg-white border-r border-gray-200'
          }`}
      >
        {/* Top Section: Header / Toggle */}
        <div className="p-5 flex items-center justify-between">
           {/* Dynamic Title (Only visible when expanded) */}
           <motion.div 
             variants={textVariants}
             initial="visible"
             animate={isCollapsed ? "hidden" : "visible"}
           >
              <h2 className={`font-bold text-sm uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {headerTitle}
              </h2>
           </motion.div>

           {/* Mobile Close Button (Only visible on Mobile) */}
           {isMobile && !isCollapsed && (
             <button onClick={() => setIsCollapsed(true)} className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <FaTimes />
             </button>
           )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 space-y-2 overflow-y-auto py-4 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    if (isMobile) setIsCollapsed(true)
                  }}
                  className={`relative group w-full flex items-center p-3 rounded-xl transition-all duration-200 ease-in-out
                    ${isActive 
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-blue-900/40 to-blue-800/20 text-blue-400' 
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {/* Active Indicator Line (Left Side) */}
                  {isActive && (
                    <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" 
                    />
                  )}

                  {/* Icon Area */}
                  <span className={`text-xl z-10 ${isCollapsed ? 'mx-auto' : 'mr-4'} transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </span>

                  {/* Label (Hidden when collapsed) */}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="whitespace-nowrap font-medium text-sm z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for Collapsed Mode (Desktop Only) */}
                  {isCollapsed && !isMobile && (
                    <div className={`absolute left-16 px-3 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-xl border border-gray-700`}>
                      {item.label}
                    </div>
                  )}
                </button>
              )
            })}
        </div>

        {/* Footer / Branding Area */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                    ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
                    TI
                </div>
                {!isCollapsed && (
                    <motion.div 
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col"
                    >
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>T. Ibrahim</span>
                        <span className="text-[10px] opacity-60">v2.0.0</span>
                    </motion.div>
                )}
            </div>
        </div>

      </motion.nav>
    </>
  )
}

export default SideNavigation
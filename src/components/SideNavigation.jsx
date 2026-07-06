import React, { useEffect } from 'react';
import { 
  FaUserTie, 
  FaBriefcase, 
  FaCode, 
  FaFolderOpen, 
  FaPalette, 
  FaChartLine, 
  FaEnvelope 
} from 'react-icons/fa';

const navItems = [
  { id: 'about', label: 'Intro', icon: FaUserTie, title: 'Intro' },
  { id: 'experience', label: 'Experience', icon: FaBriefcase, title: 'Experience' },
  { id: 'skills', label: 'Skills', icon: FaCode, title: 'My Skills' },
  { id: 'projects', label: 'Projects', icon: FaFolderOpen, title: 'My Projects' },
  { id: 'design', label: 'Design', icon: FaPalette, title: 'My Designs' },
  { id: 'dashboard', label: 'Dashboard', icon: FaChartLine, title: 'Project Stats' },
  { id: 'contact', label: 'Contact', icon: FaEnvelope, title: 'Contact Me' }
];

const SideNavigation = ({ isCollapsed, setIsCollapsed, activeSection, setActiveSection, isDarkMode, isMobile }) => {
  
  const activeItem = navItems.find(item => item.id === activeSection);
  const title = activeItem ? activeItem.title : 'Navigation';

  return (
    <>
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 transition-opacity"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <nav 
        className={`fixed md:relative z-30 transition-all duration-300 ease-in-out ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } ${isCollapsed ? 'w-16 md:w-20' : 'w-64'} 
        ${isMobile ? (isCollapsed ? '-translate-x-full' : 'translate-x-0') : ''} 
        h-full border-r`}
      >
        <div className="p-4">
          <h2 className={`text-sm font-semibold mb-6 px-2 uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isCollapsed ? 'hidden' : 'block'}`}>
            {title}
          </h2>
          
          <ul className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      setActiveSection(id);
                      if (isMobile) setIsCollapsed(true);
                    }}
                    aria-label={label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center p-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? isDarkMode
                          ? 'bg-gray-700 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-900 shadow-sm'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center w-6">
                      <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    </div>
                    
                    {!isCollapsed && (
                      <span className="ml-3 font-medium text-sm truncate">
                        {label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideNavigation;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, Search, Command } from 'lucide-react';
import Logo from './Logo';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 1. Utility for clean class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 2. Component Definition
// Added 'isAdmin' prop to control the visibility of your private search
const ShellBar = ({ isDarkMode, toggleTheme, isMobile, toggleSideNav, isAdmin = false }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        "border-b backdrop-blur-md",
        isDarkMode 
          ? "bg-gray-900/80 border-gray-800/60 shadow-lg shadow-black/10" 
          : "bg-white/80 border-gray-200/60 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LEFT: Mobile Trigger & Identity --- */}
          <div className="flex items-center gap-4">
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleSideNav}
                className={cn(
                  "p-2 rounded-xl transition-colors",
                  isDarkMode 
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            )}
            <Logo isDarkMode={isDarkMode} />
          </div>

          {/* --- CENTER: Admin-Only "Stealth" Search --- */}
          {/* This section only renders if isAdmin is true */}
          {isAdmin ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex flex-1 max-w-sm mx-8"
            >
              <div 
                className={cn(
                  "relative w-full group flex items-center transition-all duration-300 rounded-full border px-3 py-1.5",
                  isSearchFocused
                    ? (isDarkMode ? "bg-gray-800 border-blue-500/50 ring-2 ring-blue-500/20" : "bg-white border-blue-400 ring-2 ring-blue-500/20")
                    : (isDarkMode ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800" : "bg-gray-100/50 border-gray-200/50 hover:bg-white hover:border-gray-300")
                )}
              >
                <Command className={cn("w-4 h-4 mr-2", isDarkMode ? "text-gray-500" : "text-gray-400")} />
                <input
                  type="text"
                  placeholder="Admin Command / Search..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    "bg-transparent border-none outline-none text-sm w-full placeholder-gray-500/50",
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  )}
                />
                {/* Visual indicator that this is private */}
                <div className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500">
                  ADM
                </div>
              </div>
            </motion.div>
          ) : (
             // Spacer to keep layout balanced if no search
             <div className="flex-1" />
          )}

          {/* --- RIGHT: Theme Toggle --- */}
          <div className="flex items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.90 }}
              onClick={toggleTheme}
              className={cn(
                "p-2.5 rounded-full transition-all duration-300",
                isDarkMode 
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:shadow-lg hover:shadow-yellow-500/10" 
                  : "bg-gray-100 text-slate-600 hover:bg-white hover:shadow-md"
              )}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? "dark" : "light"}
                  initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default ShellBar;
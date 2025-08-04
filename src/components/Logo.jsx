import React from 'react'

const Logo = ({ isDarkMode }) => {
  return (
    <div className="flex items-center">
      <code className={`text-xl font-mono ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        &lt;TI /&gt;
      </code>
    </div>
  )
}

export default Logo
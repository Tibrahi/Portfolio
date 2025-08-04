import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="relative">
          {/* Animated TI Logo */}
          <code className="text-4xl font-mono text-gray-800 dark:text-gray-200 animate-pulse">
            &lt;TI/&gt;
          </code>
          {/* Loading dots */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading 
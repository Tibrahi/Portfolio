import React, { useEffect, useState } from 'react'

const Loading = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 1
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    // Updated: Removed solid bg-colors. Using backdrop-blur and semi-transparent glass
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden backdrop-blur-2xl transition-all duration-500">
      
      {/* Background Orbs: These provide the color for the glass to "catch" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-bounce" style={{ animationDuration: '8s' }}></div>

      {/* --- Glassmorphic Container --- */}
      <div className="relative p-12 rounded-[40px] border border-white/20 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col items-center">
        
        {/* --- 3D GYROSCOPE CONTAINER --- */}
        <div className="relative w-32 h-32 mb-8" style={{ perspective: '1000px' }}>
          {/* Outer Ring */}
          <div className="absolute inset-0 border-[3px] border-transparent border-t-blue-500 border-b-emerald-500 rounded-full animate-spin-slow"></div>
          
          {/* 3D Middle Ring */}
          <div className="absolute inset-2 border-[2px] border-transparent border-l-purple-500 border-r-blue-400 rounded-full animate-reverse-spin opacity-70"></div>
          
          {/* Inner Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <code className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 animate-pulse">
              &lt;TI/&gt;
            </code>
          </div>
        </div>

        {/* --- TEXT & STATUS --- */}
        <div className="text-center space-y-4">
          <h2 className="text-sm font-black tracking-[0.3em] text-blue-500 uppercase">
            System Initializing
          </h2>
          
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-xs font-bold text-gray-400 dark:text-gray-500">
              ASSETS_LOADED: {Math.min(progress, 100)}%
            </span>

            {/* Glassmorphic Progress Bar */}
            <div className="w-48 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(60deg) rotateY(360deg) rotateZ(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Loading
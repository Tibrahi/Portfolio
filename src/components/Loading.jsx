import React, { useEffect, useState } from 'react'

const Loading = () => {
  const [progress, setProgress] = useState(0)

  // Simulate a loading progress for the "Pro" feel
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // Randomize speed to make it look like real data loading
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      
      {/* Background Ambient Glow (Optimization: CSS Gradient instead of heavy image) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      {/* --- 3D GYROSCOPE CONTAINER --- */}
      <div className="relative w-40 h-40 mb-12" style={{ perspective: '1000px' }}>
        
        {/* Ring 1: Outer Vertical Spin */}
        <div className="absolute inset-0 border-[3px] border-transparent border-t-blue-500 border-b-purple-500 rounded-full animate-spin-slow shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        
        {/* Ring 2: Middle Horizontal Spin (3D) */}
        <div className="absolute inset-2 border-[2px] border-transparent border-l-cyan-400 border-r-blue-600 rounded-full animate-reverse-spin shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        
        {/* Ring 3: Inner Fast Spin */}
        <div className="absolute inset-6 border-[2px] border-dashed border-gray-400 dark:border-gray-600 rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}></div>

        {/* CENTER LOGO */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group">
            {/* Logo Glow */}
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <code className="relative text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-pulse">
              &lt;TI/&gt;
            </code>
          </div>
        </div>
      </div>

      {/* --- TEXT & STATUS --- */}
      <div className="z-10 text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-widest">
          INITIALIZING
        </h2>
        
        <div className="flex items-center gap-2 text-sm font-mono text-blue-600 dark:text-blue-400">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
          <span>LOADING ASSETS... {Math.min(progress, 100)}%</span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-64 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4 mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Custom Styles for 3D Animations */}
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
          animation: spin-slow 3s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Loading
import React, { useEffect, useState } from 'react'

const statusMessages = [
  "INITIALIZING CORE",
  "SYNCING INTERFACE",
  "ESTABLISHING HANDSHAKE",
  "ENCRYPTING TUNNEL",
  "DECODING ASSETS",
  "OPTIMIZING RENDER",
  "FINALIZING ENVIRONMENT"
];

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        // Organic progress: faster at first, slower as it nears 100
        const increment = prev > 80 ? Math.random() * 2 : Math.random() * 12 + 2;
        return Math.min(prev + increment, 100)
      })
    }, 180)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Cycle messages based on progress percentage
    const idx = Math.min(Math.floor((progress / 100) * statusMessages.length), statusMessages.length - 1);
    setMessageIndex(idx);
  }, [progress])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#030712] transition-all duration-500">
      
      {/* --- BACKGROUND AMBIANCE --- */}
      {/* Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Cinematic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      {/* --- MAIN GLASS CONTAINER --- */}
      <div className="relative group">
        {/* Outer Glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative px-10 py-12 rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex flex-col items-center min-w-[320px]">
          
          {/* --- 3D HOLOGRAPHIC LOADER --- */}
          <div className="relative w-36 h-36 mb-10" style={{ perspective: '1000px' }}>
            {/* Orbital Ring 1 (Y-Axis) */}
            <div className="absolute inset-0 border-[2px] border-blue-500/30 rounded-full animate-orbit-y"></div>
            
            {/* Orbital Ring 2 (X-Axis) */}
            <div className="absolute inset-2 border-[2px] border-emerald-500/30 rounded-full animate-orbit-x"></div>
            
            {/* Spinning Neon Border */}
            <div className="absolute inset-0 border-t-2 border-l-2 border-blue-400 rounded-full animate-spin shadow-[0_0_15px_rgba(96,165,250,0.4)]"></div>
            
            {/* Inner Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  TI
                </span>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping mt-1"></div>
              </div>
            </div>
          </div>

          {/* --- TEXT & STATUS --- */}
          <div className="text-center w-full space-y-6">
            <div className="space-y-1">
              <h2 className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase opacity-80">
                {statusMessages[messageIndex]}
              </h2>
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                Protocol: 0x{Math.floor(progress * 1337).toString(16)}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              {/* Modern Progress Bar */}
              <div className="relative w-56 h-[3px] bg-white/5 rounded-full overflow-hidden">
                {/* Active Progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-emerald-400 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  {/* Leading Light Spark */}
                  <div className="absolute right-0 top-0 h-full w-4 bg-white shadow-[0_0_15px_#fff] animate-pulse"></div>
                </div>
              </div>

              {/* Counter */}
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-light text-white/90">
                  {Math.floor(progress)}
                </span>
                <span className="text-[10px] font-bold text-blue-500/80">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CUSTOM ANIMATIONS --- */}
      <style jsx>{`
        @keyframes orbit-y {
          0% { transform: rotateY(0deg) rotateX(45deg); }
          100% { transform: rotateY(360deg) rotateX(45deg); }
        }
        @keyframes orbit-x {
          0% { transform: rotateX(0deg) rotateY(45deg); }
          100% { transform: rotateX(360deg) rotateY(45deg); }
        }
        .animate-orbit-y {
          animation: orbit-y 4s linear infinite;
        }
        .animate-orbit-x {
          animation: orbit-x 3s linear infinite;
        }
        .animate-spin {
          animation: spin 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default Loading
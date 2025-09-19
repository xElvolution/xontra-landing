"use client"

import { useEffect, useState } from "react"

interface NeonTrailsProps {
  isActive: boolean
}

export function NeonTrails({ isActive }: NeonTrailsProps) {
  const [trails, setTrails] = useState<Array<{ id: number; color: string; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      const newTrails = [
        { id: 1, color: "from-purple-700 to-purple-300", delay: 0 },
        { id: 2, color: "from-purple-500 to-purple-300", delay: 200 },
        { id: 3, color: "from-purple-500 to-purple-300", delay: 400 },
        { id: 4, color: "from-red-500 to-red-300", delay: 600 },
        { id: 5, color: "from-purple-600 to-purple-400", delay: 800 },
      ]
      setTrails(newTrails)
    } else {
      setTrails([])
    }
  }, [isActive])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trails.map((trail) => (
        <div key={trail.id} className="absolute inset-0">
          {/* Horizontal trails */}
          <div
            className={`absolute top-1/2 left-1/2 w-96 h-0.5 bg-gradient-to-r ${trail.color} opacity-60 animate-pulse`}
            style={{
              transform: `translate(-50%, -50%) rotate(${trail.id * 72}deg)`,
              animationDelay: `${trail.delay}ms`,
            }}
          />

          {/* Particle dots */}
          <div
            className={`absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r ${trail.color} rounded-full animate-ping`}
            style={{
              transform: `translate(-50%, -50%) translateX(${100 + trail.id * 20}px) rotate(${trail.id * 72}deg)`,
              animationDelay: `${trail.delay + 100}ms`,
            }}
          />
        </div>
      ))}

      {/* Central glow */}
      {isActive && (
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-purple-700/30 via-purple-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  )
}

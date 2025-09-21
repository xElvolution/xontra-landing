"use client"

import { useEffect, useRef } from "react"

export function FlowingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Enhanced gradient colors for dark theme
    const trails = [
      {
        points: [],
        colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"], // purple gradient
        width: 4,
        opacity: 0.8,
        speed: 0.02,
        amplitude: 120,
        frequency: 0.01,
        offset: 0,
      },
      {
        points: [],
        colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"], // purple gradient
        width: 3,
        opacity: 0.7,
        speed: 0.015,
        amplitude: 100,
        frequency: 0.008,
        offset: Math.PI / 3,
      },
      {
        points: [],
        colors: ["#8b5cf6", "#a78bfa", "#c4b5fd"], // purple gradient
        width: 3.5,
        opacity: 0.6,
        speed: 0.018,
        amplitude: 140,
        frequency: 0.012,
        offset: (Math.PI * 2) / 3,
      },
    ]

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      trails.forEach((trail, trailIndex) => {
        trail.points = []
        const currentColors = trail.colors

        // Create flowing curved path
        for (let i = 0; i <= canvas.width + 200; i += 4) {
          const x = i
          const baseY =
            canvas.height / 2 + Math.sin(i * trail.frequency + time * trail.speed + trail.offset) * trail.amplitude
          const y = baseY + Math.sin(i * 0.003 + time * 0.3 + trailIndex) * 40

          trail.points.push({ x, y })
        }

        // Draw the flowing trail with enhanced gradients
        if (trail.points.length > 1) {
          ctx.beginPath()
          ctx.moveTo(trail.points[0].x, trail.points[0].y)

          // Create smooth curves
          for (let i = 1; i < trail.points.length - 2; i++) {
            const xc = (trail.points[i].x + trail.points[i + 1].x) / 2
            const yc = (trail.points[i].y + trail.points[i + 1].y) / 2
            ctx.quadraticCurveTo(trail.points[i].x, trail.points[i].y, xc, yc)
          }

          // Create multi-stop gradient
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
          gradient.addColorStop(0, `${currentColors[0]}00`)
          gradient.addColorStop(
            0.2,
            `${currentColors[0]}${Math.floor(trail.opacity * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )
          gradient.addColorStop(
            0.5,
            `${currentColors[1]}${Math.floor(trail.opacity * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )
          gradient.addColorStop(1, `${currentColors[2]}00`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = trail.width
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

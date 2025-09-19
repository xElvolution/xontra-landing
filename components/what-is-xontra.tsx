"use client"

import { Brain, Sparkles } from "lucide-react"

export function WhatIsXontra() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              What is{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Xontra?
              </span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed">
              Xontra is an AI-powered decentralized exchange that turns simple prompts into complex DeFi actions. Just
              type your intent — like{" "}
              <span className="text-purple-300 font-mono bg-slate-900/50 px-2 py-1 rounded">
                "swap 10 USDC to SOMI on Somnia"
              </span>{" "}
              — and Xontra takes care of the rest.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              It combines natural language processing, smart routing, and privacy-preserving execution to make trading
              effortless and intelligent.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-purple-300">
                <Brain className="w-5 h-5" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Intent-Based</span>
              </div>
            </div>
          </div>

          {/* Animated Graphics */}
          <div className="relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Central Node */}
              <div className="w-24 h-24 bg-gradient-to-r from-purple-700 to-purple-500 rounded-full flex items-center justify-center relative z-10">
                <Brain className="w-12 h-12 text-white" />
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-400 rounded-full transform -translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-purple-600 rounded-full transform -translate-x-1/2 animate-pulse" />
                <div className="absolute left-0 top-1/2 w-4 h-4 bg-purple-400 rounded-full transform -translate-y-1/2 animate-pulse" />
                <div className="absolute right-0 top-1/2 w-4 h-4 bg-red-400 rounded-full transform -translate-y-1/2 animate-pulse" />
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle
                    cx="200"
                    cy="200"
                    r="150"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/10 via-purple-500/10 to-purple-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


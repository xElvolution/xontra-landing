"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [inputValue, setInputValue] = useState("")

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          One Prompt, Infinite <br />
          <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
            On-Chain Power
          </span>
        </h1>

        {/* Subheading */}
        <div className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed space-y-2">
          <p>Speak the intent.</p>
          <p>Xontra routes and settles it.</p>
          <p>Users feel Web2-simple, Web3-secure.</p>
        </div>

        {/* Central Prompt Input with Enhanced Glow */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Input
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-16 px-8 text-lg bg-card/50 border-2 border-primary/30 rounded-full text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 backdrop-blur-xl transition-all duration-300 shadow-lg"
            />
            {/* Enhanced Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-purple-600/20 to-purple-700/20 blur-xl -z-10 opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 via-purple-600/10 to-purple-700/10 blur-2xl -z-20 opacity-40"></div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
          <p>
            Future apps are AI-native by default; Xontra is the rail set that turns each AI decision into trustless,
            cross-chain execution and lets anyone earn for supplying compute or data — turnkey for builders, seamless
            for users.
          </p>
        </div>
      </div>
    </section>
  )
}

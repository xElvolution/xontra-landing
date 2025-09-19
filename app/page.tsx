"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WhyXontra } from "@/components/why-xontra"
import { WhatIsXontra } from "@/components/what-is-xontra"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { FlowingBackground } from "@/components/flowing-background"
import { ThemeProvider } from "@/components/theme-provider"

export default function XontraLanding() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />
        <main className="relative z-10">
          <HeroSection />
          <WhyXontra />
          <WhatIsXontra />
          <HowItWorks />
          <Features />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

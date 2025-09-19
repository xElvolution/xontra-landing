"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Shield, Target, Layers, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Trading",
    description: "Natural language processing turns your trading intent into optimized execution across multiple DEXs",
    gradient: "from-purple-600 to-purple-600",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Lightning-fast trade execution with smart routing to get you the best prices across Somnia Chain",
    gradient: "from-purple-700 to-purple-700",
  },
  {
    icon: Shield,
    title: "Zero Knowledge Privacy",
    description: "Your trading patterns and wallet data remain completely private with advanced ZK technology",
    gradient: "from-purple-600 to-purple-600",
  },
  {
    icon: Target,
    title: "Smart Routing",
    description: "AI algorithms find the optimal path for your trades, minimizing slippage and maximizing returns",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: Layers,
    title: "Cross-Chain Ready",
    description: "Seamlessly trade across multiple blockchains with our advanced bridging technology",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "Predictive Analytics",
    description: "Get AI-powered insights and predictions to make smarter trading decisions",
    gradient: "from-purple-400 to-purple-600",
  },
]

export function WhyXontra() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              Xontra?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of decentralized trading with cutting-edge AI technology and unmatched user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-500 hover:scale-105 hover:border-primary/40 cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="relative mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


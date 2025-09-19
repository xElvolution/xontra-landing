"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Brain, Zap, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Speak Your Intent",
    description: "Simply type what you want to do: 'Swap 100 USDC for SOMI' or 'Buy $50 worth of BTC'",
    gradient: "from-purple-600 to-purple-600",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "Our advanced AI understands your request and finds the optimal execution strategy",
    gradient: "from-purple-600 to-purple-600",
  },
  {
    icon: Zap,
    title: "Smart Execution",
    description: "Xontra routes your trade across multiple DEXs to get you the best price and lowest fees",
    gradient: "from-purple-600 to-purple-600",
  },
  {
    icon: CheckCircle,
    title: "Instant Settlement",
    description: "Your trade is executed instantly on Somnia Chain with full transparency and security",
    gradient: "from-purple-400 to-purple-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trading made simple with AI. Just tell us what you want, and we'll handle the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 mx-auto bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-2xl blur-xl opacity-30`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2 translate-x-1"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

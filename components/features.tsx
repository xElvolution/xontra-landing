"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Zap } from "lucide-react"

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From beginners to professional traders, Xontra makes DeFi accessible to all
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* For Beginners */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Beginners</h3>
                  <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50">Easy to Use</Badge>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  No complex interfaces or technical jargon
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  AI guides you through every trade
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Educational tips and market insights
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Start with small amounts and learn
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* For Professionals */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Professionals</h3>
                  <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50">Advanced Tools</Badge>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Advanced trading strategies and automation
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Real-time market data and analytics
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  API access for algorithmic trading
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  Custom risk management tools
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-card/30 border-border/30 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-foreground mb-2">$2.4B+</div>
              <div className="text-sm text-muted-foreground">Total Volume Traded</div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/30 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-foreground mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/30 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-foreground mb-2">0.1s</div>
              <div className="text-sm text-muted-foreground">Average Trade Time</div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 border-border/30 backdrop-blur-xl text-center">
            <CardContent className="p-6">
              <DollarSign className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-foreground mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

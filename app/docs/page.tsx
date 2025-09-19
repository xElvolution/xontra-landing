"use client"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Code, Zap, Brain, Shield, ArrowRight, Terminal, Layers, Globe } from "lucide-react"

export default function DocsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Everything you need to build, integrate, and use the Xontra AI-powered DEX
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-12 h-12 bg-card/50 border-border/50 backdrop-blur-xl"
                />
              </div>
            </div>

            {/* Quick Start */}
            <div className="mb-16">
              <Card className="bg-gradient-to-r from-purple-700/10 via-purple-700/10 to-purple-700/10 border-primary/20 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Quick Start</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">Get started with Xontra in less than 5 minutes</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <span className="text-foreground">Connect your Somnia wallet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <span className="text-foreground">Type your trading intent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <span className="text-foreground">Let AI execute your trade</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Documentation Grid */}
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl sticky top-32">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Getting Started", active: true },
                      { name: "AI Prompts", active: false },
                      { name: "API Reference", active: false },
                      { name: "SDK Integration", active: false },
                      { name: "Smart Contracts", active: false },
                      { name: "Troubleshooting", active: false },
                    ].map((item, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          item.active
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Getting Started */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-2xl text-foreground">Getting Started</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-purple-700/10 border border-purple-700/20 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">What is Xontra?</h3>
                      <p className="text-muted-foreground">
                        Xontra is an AI-powered decentralized exchange that allows you to trade using natural language.
                        Simply tell Xontra what you want to do, and our AI will handle the complex routing and
                        execution.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Prerequisites</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>A Web3 wallet (MetaMask, Coinbase
                          Wallet, etc.)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          SOMI on Somnia network for gas fees
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          Tokens to trade (USDC, SOMI, etc.)
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Prompts */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Brain className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-2xl text-foreground">AI Prompt Examples</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-sm text-foreground">
                        "Swap 100 USDC for SOMI on Somnia"
                      </div>
                      <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-sm text-foreground">
                        "Buy $50 worth of BTC with the best price"
                      </div>
                      <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-sm text-foreground">
                        "Convert all my USDT to SOMI when price hits $2500"
                      </div>
                      <div className="p-3 bg-background/50 border border-border/50 rounded-lg font-mono text-sm text-foreground">
                        "Show me the best yield farming opportunities"
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Xontra understands natural language and can execute complex trading strategies with simple
                      commands.
                    </p>
                  </CardContent>
                </Card>

                {/* API Reference */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Code className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-2xl text-foreground">API Reference</CardTitle>
                      <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50">Coming Soon</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Integrate Xontra's AI trading capabilities into your applications with our REST API and WebSocket
                      feeds.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-background/30 border border-border/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Terminal className="w-4 h-4 text-purple-600" />
                          <span className="font-medium text-foreground">REST API</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Execute trades and get market data</p>
                      </div>
                      <div className="p-3 bg-background/30 border border-border/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-4 h-4 text-purple-600" />
                          <span className="font-medium text-foreground">WebSocket</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Real-time price feeds and updates</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* SDK Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">JavaScript SDK</h3>
                  <p className="text-muted-foreground mb-4">Build web applications with our TypeScript SDK</p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  >
                    View Docs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Smart Contracts</h3>
                  <p className="text-muted-foreground mb-4">Interact directly with our Somnia contracts</p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  >
                    View Contracts <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Security Guide</h3>
                  <p className="text-muted-foreground mb-4">Best practices and security considerations</p>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

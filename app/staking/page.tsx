"use client"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, TrendingUp, Shield, Zap, Lock, Unlock } from "lucide-react"

export default function StakingPage() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Lex Staking
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stake your LEX tokens to earn rewards and participate in the future of AI-powered trading
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-foreground mb-1">24.5%</div>
                  <div className="text-sm text-muted-foreground">Current APY</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Coins className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-foreground mb-1">2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Staked</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-2xl font-bold text-foreground mb-1">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Stakers</div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl font-bold text-foreground mb-1">7 Days</div>
                  <div className="text-sm text-muted-foreground">Unstaking Period</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Staking Interface */}
              <div className="lg:col-span-2">
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">Stake LEX Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="stake" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="stake" className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Stake
                        </TabsTrigger>
                        <TabsTrigger value="unstake" className="flex items-center gap-2">
                          <Unlock className="w-4 h-4" />
                          Unstake
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="stake" className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-foreground">Amount to Stake</label>
                            <span className="text-sm text-muted-foreground">Balance: 1,000 LEX</span>
                          </div>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                              className="h-14 pr-20 text-lg bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setStakeAmount("1000")}>
                                MAX
                              </Button>
                              <span className="text-muted-foreground">LEX</span>
                            </div>
                          </div>

                          <div className="p-4 bg-purple-700/10 border border-purple-700/20 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-muted-foreground">Estimated Annual Rewards</span>
                              <span className="text-sm font-medium text-purple-600">
                                {stakeAmount ? (Number.parseFloat(stakeAmount) * 0.245).toFixed(2) : "0"} LEX
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Monthly Rewards</span>
                              <span className="text-sm font-medium text-purple-600">
                                {stakeAmount ? ((Number.parseFloat(stakeAmount) * 0.245) / 12).toFixed(2) : "0"} LEX
                              </span>
                            </div>
                          </div>

                          <Button className="w-full h-12 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white font-medium text-lg">
                            Stake LEX
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="unstake" className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-foreground">Amount to Unstake</label>
                            <span className="text-sm text-muted-foreground">Staked: 500 LEX</span>
                          </div>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={unstakeAmount}
                              onChange={(e) => setUnstakeAmount(e.target.value)}
                              className="h-14 pr-20 text-lg bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setUnstakeAmount("500")}>
                                MAX
                              </Button>
                              <span className="text-muted-foreground">LEX</span>
                            </div>
                          </div>

                          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-medium text-purple-400">Unstaking Period</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your tokens will be available for withdrawal after 7 days
                            </p>
                          </div>

                          <Button className="w-full h-12 bg-gradient-to-r from-purple-400 to-purple-500 hover:opacity-90 text-white font-medium text-lg">
                            Unstake LEX
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Staking Info */}
              <div className="space-y-6">
                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Your Staking Position</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Staked Amount</span>
                      <span className="font-medium text-foreground">500 LEX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending Rewards</span>
                      <span className="font-medium text-purple-600">12.5 LEX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Earned</span>
                      <span className="font-medium text-purple-600">45.2 LEX</span>
                    </div>
                    <Button className="w-full bg-purple-700 hover:bg-purple-700 text-white">Claim Rewards</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

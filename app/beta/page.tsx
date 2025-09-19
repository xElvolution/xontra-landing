"use client"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Clock, Bell } from "lucide-react"
import Link from "next/link"

export default function BetaPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Xontra App{" "}
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're excited to announce the launch of Xontra, the most innovative AI-driven decentralized exchange.
                Trade seamlessly with just your thoughts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Q4 2025</h3>
                  <p className="text-muted-foreground text-sm">Expected launch timeline</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Early Access</h3>
                  <p className="text-muted-foreground text-sm">Join waitlist for priority access</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Rocket className="w-8 h-8 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Somnia Chain</h3>
                  <p className="text-muted-foreground text-sm">Built on Xontra's cutting-edge blockchain technology</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Link href="/waitlist">
                <Button className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white px-8 py-3 rounded-full text-lg">
                  Join Waitlist
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Be among the first to experience the future of decentralized trading with Xontra
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

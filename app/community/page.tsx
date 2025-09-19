"use client"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, FileText, Users, ExternalLink } from "lucide-react"

export default function CommunityPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />
        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Xontra Community
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with builders, traders, and AI enthusiasts shaping the future of decentralized finance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* X (formerly Twitter) */}
              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {/* X Logo SVG */}
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <CardTitle className="text-foreground">X</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Stay updated with the latest news, announcements, and insights from the Xontra team
                  </p>
                  <Button className="w-full bg-gray-800 hover:bg-black text-white">
                    Follow @Xontra
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Discord */}
              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-foreground">Discord</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Join real-time discussions, get support, and connect with fellow community members
                  </p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Join Discord
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Blog */}
              <Card className="group bg-card/50 border-border/50 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-foreground">Blog</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Deep dives into AI trading, technical updates, and the future of decentralized exchanges
                  </p>
                  <Button className="w-full bg-purple-700 hover:bg-purple-600 text-white">
                    Read Blog
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Community Stats */}
            <Card className="bg-card/30 border-border/30 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Community Highlights</h2>
                  <p className="text-muted-foreground">What's happening in the Xontra ecosystem</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">20K+</div>
                    <div className="text-muted-foreground text-sm">Total Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-muted-foreground text-sm">Daily Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-muted-foreground text-sm">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                    <div className="text-muted-foreground text-sm">Community Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

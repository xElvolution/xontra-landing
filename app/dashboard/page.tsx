"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedPositionTracker } from "@/components/enhanced-position-tracker"
import { ReferralSystem } from "@/components/referral-system"
import { useWaitlist } from "@/hooks/use-waitlist"
import { useSocialConnections } from "@/hooks/use-social-connections"
import { WaitlistService } from "@/lib/waitlist-service"
import { CheckCircle, Users, Gift, Zap, Shield } from "lucide-react"

export default function DashboardPage() {
  const [previousPosition, setPreviousPosition] = useState<number>()
  const [verifiedUserData, setVerifiedUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successTimeout, setSuccessTimeout] = useState<NodeJS.Timeout | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { stats, loadStats } = useWaitlist()
  
  // Get user email for social connections
  const userEmail = searchParams.get("email")
  const { connections } = useSocialConnections(userEmail || undefined)

  // Load user data on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const email = searchParams.get("email")
        const success = searchParams.get("success")
        
        if (!email) {
          // If no email in URL, redirect to waitlist
          router.push("/waitlist")
          return
        }

        // Handle success messages
        if (success === "discord_connected") {
          setSuccessMessage("Discord connected successfully! +100 points earned!")
          setShowSuccessMessage(true)
          // Clear any existing timeout
          if (successTimeout) clearTimeout(successTimeout)
          // Auto-dismiss after 10 seconds
          const timeout = setTimeout(() => {
            setShowSuccessMessage(false)
          }, 10000)
          setSuccessTimeout(timeout)
        } else if (success === "twitter_connected") {
          setSuccessMessage("Twitter connected successfully! +100 points earned!")
          setShowSuccessMessage(true)
          // Clear any existing timeout
          if (successTimeout) clearTimeout(successTimeout)
          // Auto-dismiss after 10 seconds
          const timeout = setTimeout(() => {
            setShowSuccessMessage(false)
          }, 10000)
          setSuccessTimeout(timeout)
        }

        const result = await WaitlistService.verifyUserByEmail(email)
        if (result.success && result.data) {
          setVerifiedUserData(result.data)
          loadStats(email)
        } else {
          setError("User not found. Please register first.")
        }
      } catch (error) {
        console.error("Failed to load user data:", error)
        setError("Failed to load dashboard data.")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [searchParams, router, loadStats])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeout) {
        clearTimeout(successTimeout)
      }
    }
  }, [successTimeout])

  // Track position changes for animations
  useEffect(() => {
    const currentRank = stats.userPosition
    if (currentRank && previousPosition && currentRank !== previousPosition) {
      setPreviousPosition(currentRank)
    } else if (currentRank && !previousPosition) {
      setPreviousPosition(currentRank)
    }
  }, [stats.userPosition, previousPosition])

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background relative overflow-hidden">
          <FlowingBackground />
          <Navigation />
          <main className="relative z-10 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-700 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Loading Dashboard...</h1>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  if (error || !verifiedUserData) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background relative overflow-hidden">
          <FlowingBackground />
          <Navigation />
          <main className="relative z-10 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-600 via-red-700 to-red-700 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
              <p className="text-muted-foreground mb-6">{error || "User not found"}</p>
              <button
                onClick={() => router.push("/waitlist")}
                className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white px-6 py-3 rounded-lg"
              >
                Join Waitlist
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />

        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-700 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Xontra!</h1>
              <p className="text-xl text-muted-foreground mb-4">
                You're now part of the future of AI-powered trading.
              </p>
              
              {/* Success Message */}
              {successMessage && showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg relative">
                  <p className="text-green-400 font-medium pr-8">{successMessage}</p>
                  <button
                    onClick={() => {
                      setShowSuccessMessage(false)
                      if (successTimeout) {
                        clearTimeout(successTimeout)
                        setSuccessTimeout(null)
                      }
                    }}
                    className="absolute top-2 right-2 text-green-400 hover:text-green-300 transition-colors"
                    aria-label="Close notification"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="bg-purple-700/20 text-white border border-purple-700/50 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Registered: {verifiedUserData.email}
                </div>
                <div className="bg-purple-500/20 text-white border border-purple-500/50 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
                {verifiedUserData.referredBy && (
                  <div className="bg-purple-700/20 text-white border border-purple-700/50 text-sm px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Referred by: {verifiedUserData.referredBy}
                  </div>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <EnhancedPositionTracker
                currentPosition={verifiedUserData.position}
                leaderboardRank={verifiedUserData.leaderboardRank || verifiedUserData.position}
                previousPosition={previousPosition}
                totalCount={verifiedUserData.totalCount || stats.totalUsers}
                referralCount={verifiedUserData.referralCount || stats.referralCount}
                lastUpdated={verifiedUserData.updatedAt}
                onRefresh={() => loadStats(verifiedUserData.email)}
                refreshing={false}
                userEmail={verifiedUserData.email}
                connections={connections}
              />

              <ReferralSystem
                referralCode={verifiedUserData.referralCode}
                referralCount={verifiedUserData.referralCount || stats.referralCount}
                connections={connections}
                onShare={() => {
                  console.log("User shared referral link")
                }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/30 border-border/30 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-semibold text-foreground mb-2">Early Access</h3>
                  <p className="text-sm text-muted-foreground">Get priority access when we launch</p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/30 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-semibold text-foreground mb-2">Exclusive Community</h3>
                  <p className="text-sm text-muted-foreground">Join our private Discord for early users</p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/30 backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-semibold text-foreground mb-2">Launch Rewards</h3>
                  <p className="text-sm text-muted-foreground">Special bonuses for early supporters</p>
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

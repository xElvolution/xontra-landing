"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { FlowingBackground } from "@/components/flowing-background"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EnhancedPositionTracker } from "@/components/enhanced-position-tracker"
import { ReferralSystem } from "@/components/referral-system"
import { EmailVerification } from "@/components/email-verification"
import { NotificationSystem } from "@/components/notification-system"
import { ReferralCodeInput } from "@/components/referral-code-input"
import { ReCaptchaWrapper } from "@/components/recaptcha-wrapper"
import { useWaitlist } from "@/hooks/use-waitlist"
import { useRecaptcha } from "@/hooks/use-recaptcha"
import { WaitlistService } from "@/lib/waitlist-service"
import { Mail, Wallet, CheckCircle, Users, Zap, Gift, AlertCircle, Loader2, Info, Shield } from "lucide-react"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [previousPosition, setPreviousPosition] = useState<number>()
  const [showVerification, setShowVerification] = useState(false)
  const [totalUsers, setTotalUsers] = useState<number | null>(null)
  const [verifiedUserData, setVerifiedUserData] = useState<any>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { isLoading, error, success, waitlistData, stats, joinWaitlist, loadStats, reset } = useWaitlist()

  const {
    token: recaptchaToken,
    isVerified: isRecaptchaVerified,
    error: recaptchaError,
    isVerifying: isRecaptchaVerifying,
    handleVerify: handleRecaptchaVerify,
    handleExpire: handleRecaptchaExpire,
    handleError: handleRecaptchaError,
    reset: resetRecaptcha,
  } = useRecaptcha()

  // Load total user count
  useEffect(() => {
    const loadTotalCount = async () => {
      try {
        const count = await WaitlistService.getTotalCount()
        setTotalUsers(count)
      } catch (error) {
        console.error("Failed to load total count:", error)
      }
    }
    loadTotalCount()
    loadStats()
  }, [loadStats])

  useEffect(() => {
    const refCode = searchParams.get("ref")
    if (refCode) {
      setReferralCode(refCode)
    }
  }, [searchParams])

  // Track position changes for animations
  useEffect(() => {
    const currentRank = stats.userPosition
    if (currentRank && previousPosition && currentRank !== previousPosition) {
      setPreviousPosition(currentRank)
    } else if (currentRank && !previousPosition) {
      setPreviousPosition(currentRank)
    }
  }, [stats.userPosition, previousPosition])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!email) {
      return
    }

    if (!isRecaptchaVerified || !recaptchaToken) {
      return
    }

    const result = await joinWaitlist({
      email,
      walletAddress: address,
      referralCode: referralCode || undefined,
      recaptchaToken,
    })

    if (result.success) {
      // Redirect to dashboard with email parameter
      router.push(`/dashboard?email=${encodeURIComponent(email)}`)
    } else {
      // Reset reCAPTCHA on error to allow retry
      resetRecaptcha()
    }
  }

  const handleEmailVerification = async (emailToVerify: string) => {
    try {
      console.log("🔍 Verifying email:", emailToVerify)
      const result = await WaitlistService.verifyUserByEmail(emailToVerify)
      console.log("📋 Verification result:", result)

      if (result.success && result.data) {
        console.log("✅ Email verified successfully, redirecting to dashboard")
        router.push(`/dashboard?email=${encodeURIComponent(emailToVerify)}`)
        return true
      } else {
        console.log("❌ Email verification failed:", result.error)
        return false
      }
    } catch (error) {
      console.error("❌ Email verification error:", error)
      return false
    }
  }


  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FlowingBackground />
        <Navigation />

        <NotificationSystem notifications={[]} onDismiss={() => {}} onClearAll={() => {}} />

        <main className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                  Waitlist
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Be among the first to experience the future of AI-powered decentralized trading on Somnia Chain
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                {!showVerification ? (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowVerification(true)}
                      className="bg-transparent border-border/50 hover:bg-card/50"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Already registered? Check your position
                    </Button>
                  </div>
                ) : (
                  <EmailVerification onVerify={handleEmailVerification} loading={isLoading} error={error} />
                )}

                <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground text-center">Reserve Your Spot</CardTitle>
                    {searchParams.get("ref") && (
                      <div className="text-center">
                        <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50">
                          <Gift className="w-3 h-3 mr-1" />
                          Invited via referral link
                        </Badge>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert className="mb-6 border-red-500/50 bg-red-500/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-400">{error}</AlertDescription>
                      </Alert>
                    )}

                    {recaptchaError && (
                      <Alert className="mb-6 border-red-500/50 bg-red-500/10">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-400">{recaptchaError}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Wallet Address (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="0x..."
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          disabled={isLoading}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <p className="text-xs text-muted-foreground">
                          Provide your Somnia Chain wallet for priority access and potential rewards
                        </p>
                      </div>

                      <ReferralCodeInput
                        value={referralCode}
                        onChange={setReferralCode}
                        disabled={isLoading}
                        initialReferralCode={searchParams.get("ref") || undefined}
                      />

                      {/* reCAPTCHA Section */}
                      <div className="space-y-3">
                        <ReCaptchaWrapper
                          onVerify={handleRecaptchaVerify}
                          onExpired={handleRecaptchaExpire}
                          onError={handleRecaptchaError}
                          theme="dark"
                          size="normal"
                          className="flex justify-center"
                        />
                        {!isRecaptchaVerified && !recaptchaError && (
                          <p className="text-xs text-muted-foreground text-center">
                            Please complete the security verification above to continue
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !email || !isRecaptchaVerified || isRecaptchaVerifying}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white font-medium text-lg disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Join Waitlist"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Early Access Benefits</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-card/30 border border-border/30 rounded-lg backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-700/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Priority Access</h3>
                      <p className="text-muted-foreground text-sm">Be among the first to use Xontra when we launch</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card/30 border border-border/30 rounded-lg backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-700/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Exclusive Community</h3>
                      <p className="text-muted-foreground text-sm">Join our private Discord channel for early users</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card/30 border border-border/30 rounded-lg backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-700/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Referral Rewards</h3>
                      <p className="text-muted-foreground text-sm">Invite friends and move up the waitlist faster</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-purple-700/10 border border-purple-500/20 rounded-lg backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Spam Protection</h3>
                      <p className="text-muted-foreground text-sm">
                        Advanced security measures ensure fair access for everyone
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-700/10 to-purple-500/10 border border-purple-700/20 rounded-lg backdrop-blur-sm">
                    <div className="w-10 h-10 bg-purple-700/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Referral Code Bonus</h3>
                      <p className="text-muted-foreground text-sm">
                        Have a referral code? Enter it above to get 50 points boost in the queue!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-purple-700/10 via-purple-700/10 to-purple-700/10 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {isLoading ? (
                      <Loader2 className="w-8 h-8 mx-auto animate-spin" />
                    ) : (
                      `${totalUsers?.toLocaleString() || stats.totalUsers.toLocaleString() || "2,847"}+`
                    )}
                  </div>
                  <div className="text-muted-foreground">People already joined</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

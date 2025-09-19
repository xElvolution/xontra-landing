"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Share2, Gift, Zap, Twitter } from "lucide-react"
import { ReferralUtils } from "@/lib/referral-utils"

interface ReferralSystemProps {
  referralCode: string
  referralCount: number
  onShare?: () => void
}

export function ReferralSystem({ referralCode, referralCount, onShare }: ReferralSystemProps) {
  const [copied, setCopied] = useState(false)
  const [shareMethod, setShareMethod] = useState<"link" | "code">("link")

  const referralLink = referralCode ? ReferralUtils.generateReferralLink(referralCode) : ""

  // Calculate points gained: 50 for joining + 10 per referral
  const pointsGained = 50 + referralCount * 10

  const shareText =
    "🚀 Join me on the Xontra waitlist for early access to AI-powered trading! Get exclusive benefits and be part of the future of DeFi. 💎"

  const copyToClipboard = async (text: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareNatively = async () => {
    if (!referralLink) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Xontra Waitlist",
          text: shareText,
          url: referralLink,
        })
        onShare?.()
      } catch (err) {
        console.error("Share failed:", err)
        // Fallback to copying
        copyToClipboard(`${shareText}\n\n${referralLink}`)
      }
    } else {
      // Fallback to copying the full message
      copyToClipboard(`${shareText}\n\n${referralLink}`)
    }
  }

  const shareOnTwitter = () => {
    if (!referralLink) return

    const tweetText = encodeURIComponent(`${shareText}\n\n${referralLink}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
    onShare?.()
  }

  const getReferralTier = () => {
    if (referralCount >= 50) return { name: "Diamond", color: "from-purple-600 to-purple-500", bonus: "50 points" }
    if (referralCount >= 25) return { name: "Gold", color: "from-purple-400 to-purple-500", bonus: "25 points" }
    if (referralCount >= 10) return { name: "Silver", color: "from-gray-300 to-gray-500", bonus: "10 points" }
    if (referralCount >= 5) return { name: "Bronze", color: "from-purple-600 to-purple-800", bonus: "5 points" }
    return { name: "Starter", color: "from-purple-600 to-purple-600", bonus: "0 points" }
  }

  const tier = getReferralTier()

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Gift className="w-5 h-5 text-purple-600" />
            Referral Rewards
          </CardTitle>
          <Badge className={`bg-gradient-to-r ${tier.color} text-white border-0`}>{tier.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{referralCount}</div>
            <div className="text-xs text-muted-foreground">Referrals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{pointsGained}</div>
            <div className="text-xs text-muted-foreground">Points Gained</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{Math.max(0, 50 - referralCount)}</div>
            <div className="text-xs text-muted-foreground">To Diamond</div>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={shareMethod === "link" ? "default" : "outline"}
              size="sm"
              onClick={() => setShareMethod("link")}
              className="flex-1"
            >
              Share Link
            </Button>
            <Button
              variant={shareMethod === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => setShareMethod("code")}
              className="flex-1"
            >
              Share Code
            </Button>
          </div>

          <div className="space-y-3">
            {referralCode && (
              <div className="flex gap-2">
                <Input
                  value={shareMethod === "link" ? referralLink : referralCode}
                  readOnly
                  className="bg-background/50 border-border/50 font-mono text-sm"
                />
                <Button
                  onClick={() => copyToClipboard(shareMethod === "link" ? referralLink : referralCode)}
                  variant="outline"
                  size="sm"
                  className="px-3"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
            {!referralCode && (
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground text-sm">
                  Your referral code will appear here once you're registered
                </p>
              </div>
            )}

            {/* Share Message Preview */}
            {referralCode && (
              <div className="p-3 bg-background/30 border border-border/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Share message preview:</p>
                <p className="text-sm text-foreground">{shareText}</p>
                <p className="text-xs text-primary mt-1 font-mono">{referralLink}</p>
              </div>
            )}

            {/* Share Buttons */}
            {referralCode && (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={shareNatively}
                  className="bg-gradient-to-r from-purple-700 to-purple-500 hover:opacity-90 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Now
                </Button>
                <Button
                  onClick={shareOnTwitter}
                  variant="outline"
                  className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Points Breakdown */}
        <div className="p-4 bg-gradient-to-r from-purple-700/10 to-purple-500/10 border border-purple-700/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-foreground">Points Gained Breakdown</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joining Bonus:</span>
              <span className="text-purple-600 font-medium">+50 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Referral Rewards ({referralCount} × 10):</span>
              <span className="text-purple-600 font-medium">+{referralCount * 10} points</span>
            </div>
            <div className="border-t border-border/30 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">Total Points Gained:</span>
                <span className="text-primary">{pointsGained} points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="p-4 bg-gradient-to-r from-purple-700/10 to-purple-700/10 border border-purple-700/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-foreground">How It Works</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You get 50 points for joining the waitlist</li>
            <li>• Each referral gives you 10 more points</li>
            <li>• Your referrals get 50 point boost</li>
            <li>• Higher points = better leaderboard ranking</li>
          </ul>
        </div>

        {/* Next Tier Progress */}
        {tier.name !== "Diamond" && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Progress to{" "}
                {tier.name === "Starter"
                  ? "Bronze"
                  : tier.name === "Bronze"
                    ? "Silver"
                    : tier.name === "Silver"
                      ? "Gold"
                      : "Diamond"}
              </span>
              <span>
                {referralCount}/
                {tier.name === "Starter" ? 5 : tier.name === "Bronze" ? 10 : tier.name === "Silver" ? 25 : 50}
              </span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, (referralCount / (tier.name === "Starter" ? 5 : tier.name === "Bronze" ? 10 : tier.name === "Silver" ? 25 : 50)) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

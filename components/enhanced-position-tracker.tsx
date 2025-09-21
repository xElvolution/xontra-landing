"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SocialConnections } from "@/components/social-connections"
import { TrendingUp, TrendingDown, Trophy, RefreshCw, Clock, Crown } from "lucide-react"

interface SocialConnection {
  twitter?: {
    id: string
    username: string
    connected_at: string
  }
  discord?: {
    id: string
    username: string
    connected_at: string
  }
}

interface EnhancedPositionTrackerProps {
  currentPosition: number
  leaderboardRank?: number
  previousPosition?: number
  totalCount: number
  referralCount: number
  lastUpdated: string
  onRefresh: () => Promise<void>
  refreshing?: boolean
  userEmail?: string
  connections?: SocialConnection | null
}

export function EnhancedPositionTracker({
  currentPosition,
  leaderboardRank,
  previousPosition,
  totalCount,
  referralCount,
  lastUpdated,
  onRefresh,
  refreshing = false,
  userEmail,
  connections,
}: EnhancedPositionTrackerProps) {
  const [positionChange, setPositionChange] = useState<"up" | "down" | "same" | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [timeAgo, setTimeAgo] = useState("")

  // Calculate social connection points
  const socialConnectionPoints = (connections?.twitter ? 100 : 0) + (connections?.discord ? 100 : 0)
  
  // Calculate points gained: 50 for joining + 10 per referral + 100 per social connection
  const pointsGained = 50 + referralCount * 10 + socialConnectionPoints

  // Use leaderboard rank if available, otherwise fall back to queue position
  const displayPosition = leaderboardRank || currentPosition

  useEffect(() => {
    if (previousPosition && previousPosition !== displayPosition) {
      if (displayPosition < previousPosition) {
        setPositionChange("up")
      } else if (displayPosition > previousPosition) {
        setPositionChange("down")
      }

      setShowAnimation(true)
      const timer = setTimeout(() => setShowAnimation(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [displayPosition, previousPosition])

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const updated = new Date(lastUpdated)
      const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000)

      if (diffInSeconds < 60) {
        setTimeAgo("Just now")
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        setTimeAgo(`${minutes}m ago`)
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        setTimeAgo(`${hours}h ago`)
      } else {
        const days = Math.floor(diffInSeconds / 86400)
        setTimeAgo(`${days}d ago`)
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [lastUpdated])

  const getPositionColor = () => {
    if (displayPosition === 1) return "text-cyan-300" // Diamond - Real diamond color
    if (displayPosition <= 10) return "text-yellow-500" // Gold
    if (displayPosition <= 50) return "text-gray-300" // Silver
    if (displayPosition <= 100) return "text-amber-600" // Bronze
    if (displayPosition <= 500) return "text-purple-600"
    if (displayPosition <= 1000) return "text-purple-600"
    return "text-muted-foreground"
  }

  const getPositionBadge = () => {
    if (displayPosition === 1) return { text: "Diamond", color: "bg-gradient-to-r from-cyan-200 to-cyan-400" }
    if (displayPosition <= 10) return { text: "Gold", color: "bg-gradient-to-r from-yellow-500 to-yellow-600" }
    if (displayPosition <= 50) return { text: "Silver", color: "bg-gradient-to-r from-gray-300 to-gray-400" }
    if (displayPosition <= 100) return { text: "Bronze", color: "bg-gradient-to-r from-amber-600 to-amber-700" }
    if (displayPosition <= 500) return { text: "Priority", color: "bg-gradient-to-r from-purple-600 to-purple-700" }
    return { text: "Standard", color: "bg-gradient-to-r from-purple-600 to-purple-500" }
  }

  const badge = getPositionBadge()
  const positionGain = previousPosition ? previousPosition - displayPosition : 0

  const handleRefresh = async () => {
    if (!refreshing && onRefresh) {
      try {
        await onRefresh()
      } catch (error) {
        console.error("Failed to refresh:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-400" />
              Your Leaderboard Rank
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Position Display */}
          <div className="text-center relative">
            <div
              className={`text-5xl font-bold ${getPositionColor()} transition-all duration-500 ${
                showAnimation ? "scale-110" : "scale-100"
              }`}
            >
              #{displayPosition.toLocaleString()}
            </div>

            {/* Position Change Indicator */}
            {positionChange && showAnimation && (
              <div
                className={`absolute -top-2 -right-8 flex items-center gap-1 text-sm font-medium ${
                  positionChange === "up" ? "text-purple-600" : "text-red-400"
                } animate-bounce`}
              >
                {positionChange === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {Math.abs(positionGain)}
              </div>
            )}

            <div className="text-muted-foreground text-sm mt-2">on the leaderboard</div>

            {/* Status Badge */}
            <Badge className={`${badge.color} text-white border-0 px-4 py-1 mt-3`}>
              <Trophy className="w-3 h-3 mr-1" />
              {badge.text}
            </Badge>
          </div>

          {/* Position Change Summary */}
          {positionGain !== 0 && (
            <div
              className={`text-center p-3 rounded-lg border ${
                positionGain > 0
                  ? "bg-purple-700/10 border-purple-700/20 text-purple-600"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {positionGain > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium text-white">
                  {positionGain > 0 ? "Moved up" : "Moved down"} {Math.abs(positionGain)} rank
                  {Math.abs(positionGain) > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{referralCount}</div>
              <div className="text-xs text-white">Referrals Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{pointsGained}</div>
              <div className="text-xs text-white">Points Gained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalCount.toLocaleString()}</div>
              <div className="text-xs text-white">Total Users</div>
            </div>
          </div>

          {/* Queue Position Info */}
          {leaderboardRank && leaderboardRank !== currentPosition && (
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Waitlist Queue Position:</span>
                <span className="text-purple-400 font-medium">#{currentPosition}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your leaderboard rank is based on points gained, while queue position is based on join order
              </p>
            </div>
          )}

          {/* Progress to Launch */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress to Launch</span>
              <span>{Math.min(100, Math.round((totalCount / 10000) * 100))}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalCount / 10000) * 100)}%` }}
              />
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <Clock className="w-3 h-3" />
            <span>Updated {timeAgo}</span>
          </div>
        </CardContent>
      </Card>

      {/* Social Connections */}
      <SocialConnections userEmail={userEmail} />
    </div>
  )
}

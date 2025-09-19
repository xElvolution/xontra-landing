"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Trophy } from "lucide-react"

interface PositionTrackerProps {
  currentPosition: number
  previousPosition?: number
  totalCount: number
  referralCount: number
}

export function PositionTracker({
  currentPosition,
  previousPosition,
  totalCount,
  referralCount,
}: PositionTrackerProps) {
  const [positionChange, setPositionChange] = useState<"up" | "down" | "same" | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (previousPosition && previousPosition !== currentPosition) {
      if (currentPosition < previousPosition) {
        setPositionChange("up")
      } else if (currentPosition > previousPosition) {
        setPositionChange("down")
      }

      setShowAnimation(true)
      const timer = setTimeout(() => setShowAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [currentPosition, previousPosition])

  const getPositionColor = () => {
    if (currentPosition <= 100) return "text-purple-600"
    if (currentPosition <= 500) return "text-purple-600"
    if (currentPosition <= 1000) return "text-purple-600"
    return "text-muted-foreground"
  }

  const getPositionBadge = () => {
    if (currentPosition <= 10) return { text: "VIP", color: "bg-gradient-to-r from-purple-400 to-purple-500" }
    if (currentPosition <= 100) return { text: "Early Access", color: "bg-gradient-to-r from-purple-600 to-purple-700" }
    if (currentPosition <= 500) return { text: "Priority", color: "bg-gradient-to-r from-purple-600 to-purple-700" }
    return { text: "Standard", color: "bg-gradient-to-r from-purple-600 to-purple-500" }
  }

  const badge = getPositionBadge()

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Position Display */}
          <div className="relative">
            <div
              className={`text-4xl font-bold ${getPositionColor()} transition-all duration-500 ${
                showAnimation ? "scale-110" : "scale-100"
              }`}
            >
              #{currentPosition.toLocaleString()}
            </div>

            {/* Position Change Indicator */}
            {positionChange && showAnimation && (
              <div
                className={`absolute -top-2 -right-8 flex items-center gap-1 text-sm font-medium ${
                  positionChange === "up" ? "text-purple-600" : "text-red-400"
                } animate-bounce`}
              >
                {positionChange === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {Math.abs((previousPosition || 0) - currentPosition)}
              </div>
            )}
          </div>

          <div className="text-muted-foreground text-sm">Your position in queue</div>

          {/* Status Badge */}
          <Badge className={`${badge.color} text-white border-0 px-4 py-1`}>
            <Trophy className="w-3 h-3 mr-1" />
            {badge.text}
          </Badge>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{referralCount}</div>
              <div className="text-xs text-muted-foreground">Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
          </div>

          {/* Progress Bar */}
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
        </div>
      </CardContent>
    </Card>
  )
}

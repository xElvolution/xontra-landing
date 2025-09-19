"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, Gift, X, Bell } from "lucide-react"

interface Notification {
  id: string
  type: "position_up" | "position_down" | "new_referral" | "milestone" | "update"
  title: string
  message: string
  timestamp: string
  data?: any
}

interface NotificationSystemProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  onClearAll: () => void
}

export function NotificationSystem({ notifications, onDismiss, onClearAll }: NotificationSystemProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      setIsVisible(true)
    }
  }, [notifications])

  if (!isVisible || notifications.length === 0) return null

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "position_up":
        return <TrendingUp className="w-4 h-4 text-purple-600" />
      case "position_down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      case "new_referral":
        return <Gift className="w-4 h-4 text-purple-600" />
      case "milestone":
        return <Users className="w-4 h-4 text-purple-600" />
      default:
        return <Bell className="w-4 h-4 text-purple-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "position_up":
        return "border-purple-700/50 bg-purple-700/10"
      case "position_down":
        return "border-red-500/50 bg-red-500/10"
      case "new_referral":
        return "border-purple-700/50 bg-purple-700/10"
      case "milestone":
        return "border-purple-700/50 bg-purple-700/10"
      default:
        return "border-purple-500/50 bg-purple-500/10"
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <Badge className="bg-primary/20 text-primary border-primary/50">{notifications.length} Updates</Badge>
        <Button variant="ghost" size="sm" onClick={onClearAll} className="text-muted-foreground hover:text-foreground">
          Clear All
        </Button>
      </div>

      {notifications.slice(0, 5).map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 backdrop-blur-xl border ${getNotificationColor(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      ))}

      {notifications.length > 5 && (
        <Card className="p-2 text-center backdrop-blur-xl border-border/50 bg-card/50">
          <p className="text-xs text-muted-foreground">+{notifications.length - 5} more updates</p>
        </Card>
      )}
    </div>
  )
}

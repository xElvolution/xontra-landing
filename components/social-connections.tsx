"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Twitter, MessageSquare, CheckCircle, ExternalLink, Loader2 } from "lucide-react"
import { useSocialConnections } from "@/hooks/use-social-connections"

interface SocialConnectionsProps {
  userEmail?: string
}

export function SocialConnections({ userEmail }: SocialConnectionsProps) {
  const { connections, isLoading, connectTwitter, connectDiscord, disconnect } = useSocialConnections(userEmail)
  const [loadingStates, setLoadingStates] = useState({
    twitter: false,
    discord: false,
  })

  const handleConnect = async (platform: "twitter" | "discord") => {
    setLoadingStates((prev) => ({ ...prev, [platform]: true }))
    try {
      if (platform === "twitter") {
        await connectTwitter()
      } else {
        await connectDiscord()
      }
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [platform]: false }))
    }
  }

  const handleDisconnect = async (platform: "twitter" | "discord") => {
    setLoadingStates((prev) => ({ ...prev, [platform]: true }))
    try {
      await disconnect(platform)
    } catch (error) {
      console.error(`Failed to disconnect ${platform}:`, error)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [platform]: false }))
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded w-full"></div>
            <div className="h-8 bg-muted rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-purple-400" />
          Social Connections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Twitter Connection */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Twitter className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-medium text-white">Twitter</div>
              {connections?.twitter ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-white">@{connections.twitter.username}</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Not connected</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={connections?.twitter ? "outline" : "default"}
              size="sm"
              onClick={() => (connections?.twitter ? handleDisconnect("twitter") : handleConnect("twitter"))}
              disabled={loadingStates.twitter}
              className={
                connections?.twitter
                  ? "text-muted-foreground hover:text-foreground"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }
            >
              {loadingStates.twitter ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : connections?.twitter ? (
                "Disconnect"
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </div>

        {/* Discord Connection */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-medium text-white">Discord</div>
              {connections?.discord ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-white">{connections.discord.username}</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Not connected</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={connections?.discord ? "outline" : "default"}
              size="sm"
              onClick={() => (connections?.discord ? handleDisconnect("discord") : handleConnect("discord"))}
              disabled={loadingStates.discord}
              className={
                connections?.discord
                  ? "text-muted-foreground hover:text-foreground"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }
            >
              {loadingStates.discord ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : connections?.discord ? (
                "Disconnect"
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </div>

        {/* Connection Benefits */}
      </CardContent>
    </Card>
  )
}

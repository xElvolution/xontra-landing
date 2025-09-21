"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSocialConnections } from "@/hooks/use-social-connections"

export function SocialConnectionsDebug() {
  const [email, setEmail] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const { connections, isLoading, connectTwitter, connectDiscord, disconnect } = useSocialConnections(testEmail)

  const handleTest = () => {
    setTestEmail(email)
  }

  const handleConnect = async (platform: "twitter" | "discord") => {
    try {
      if (platform === "twitter") {
        await connectTwitter()
      } else {
        await connectDiscord()
      }
    } catch (error) {
      console.error(`Failed to connect ${platform}:`, error)
      alert(`Failed to connect ${platform}: ${error}`)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Social Connections Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Test Email:</label>
          <Input
            type="email"
            placeholder="Enter email to test"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
          <Button onClick={handleTest} className="mt-2 w-full">
            Test with Email
          </Button>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Current test email: {testEmail || "None"}
          </p>
          <p className="text-sm text-muted-foreground">
            Loading: {isLoading ? "Yes" : "No"}
          </p>
          <p className="text-sm text-muted-foreground">
            Connections: {connections ? JSON.stringify(connections, null, 2) : "None"}
          </p>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={() => handleConnect("twitter")} 
            className="w-full"
            disabled={!testEmail}
          >
            Test Twitter Connection
          </Button>
          <Button 
            onClick={() => handleConnect("discord")} 
            className="w-full"
            disabled={!testEmail}
          >
            Test Discord Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


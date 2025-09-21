"use client"

import { useState, useEffect } from "react"

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

export function useSocialConnections(userEmail?: string) {
  const [connections, setConnections] = useState<SocialConnection | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchConnections = async () => {
    if (!userEmail) {
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch(`/api/social-connections?email=${encodeURIComponent(userEmail)}`)
      if (response.ok) {
        const data = await response.json()
        setConnections(data.connections)
      }
    } catch (error) {
      console.error("Failed to fetch social connections:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const connectTwitter = async () => {
    if (!userEmail) {
      throw new Error("User email required for social connections")
    }
    
    try {
      const response = await fetch(`/api/social-connections/twitter/auth?email=${encodeURIComponent(userEmail)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.authUrl) {
          window.location.href = data.authUrl
        }
      }
    } catch (error) {
      console.error("Failed to initiate Twitter connection:", error)
      throw error
    }
  }

  const connectDiscord = async () => {
    if (!userEmail) {
      throw new Error("User email required for social connections")
    }
    
    try {
      const response = await fetch(`/api/social-connections/discord/auth?email=${encodeURIComponent(userEmail)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.authUrl) {
          window.location.href = data.authUrl
        }
      }
    } catch (error) {
      console.error("Failed to initiate Discord connection:", error)
      throw error
    }
  }

  const disconnect = async (platform: "twitter" | "discord") => {
    try {
      const response = await fetch(`/api/social-connections/${platform}/disconnect`, {
        method: "POST",
      })
      if (response.ok) {
        await fetchConnections() // Refresh connections
      }
    } catch (error) {
      console.error(`Failed to disconnect ${platform}:`, error)
      throw error
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [userEmail])

  return {
    connections,
    isLoading,
    connectTwitter,
    connectDiscord,
    disconnect,
    refetch: fetchConnections,
  }
}

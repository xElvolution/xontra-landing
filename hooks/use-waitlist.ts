"use client"

import { useState, useCallback } from "react"
import { WaitlistService, type WaitlistEntry, type WaitlistStats } from "@/lib/waitlist-service"

export function useWaitlist() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry | null>(null)
  const [stats, setStats] = useState<WaitlistStats>({
    totalUsers: 0,
    userPosition: null,
    referralCount: 0,
  })

  const joinWaitlist = useCallback(
    async (params: {
      email: string
      walletAddress?: string
      referralCode?: string
      recaptchaToken: string
    }) => {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      try {
        const result = await WaitlistService.joinWaitlist(params)

        if (result.success && result.data) {
          setWaitlistData(result.data)
          setSuccess(true)

          // Update stats
          const newStats = await WaitlistService.getWaitlistStats(params.email)
          setStats(newStats)
        } else {
          setError(result.error || "Failed to join waitlist")
        }

        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Network error occurred"
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const loadStats = useCallback(async (email?: string) => {
    try {
      const newStats = await WaitlistService.getWaitlistStats(email)
      setStats(newStats)
    } catch (err) {
      console.error("Error loading stats:", err)
    }
  }, [])

  const loadUserData = useCallback(async (email: string) => {
    try {
      const userData = await WaitlistService.getUserByEmail(email)
      setWaitlistData(userData)
      if (userData) {
        const newStats = await WaitlistService.getWaitlistStats(email)
        setStats(newStats)
      }
    } catch (err) {
      console.error("Error loading user data:", err)
    }
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
    setWaitlistData(null)
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    success,
    waitlistData,
    stats,
    joinWaitlist,
    loadStats,
    loadUserData,
    reset,
  }
}

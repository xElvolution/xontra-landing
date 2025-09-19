"use client"

import { useState, useCallback } from "react"

export function useRecaptcha() {
  const [token, setToken] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = useCallback((recaptchaToken: string) => {
    console.log("🔐 reCAPTCHA verification received in hook")
    console.log("Token length:", recaptchaToken?.length)
    console.log("Token preview:", recaptchaToken?.substring(0, 50) + "...")

    if (!recaptchaToken || recaptchaToken.length === 0) {
      console.error("❌ Invalid or empty token received in hook")
      setError("Invalid reCAPTCHA token")
      setIsVerified(false)
      setToken(null)
      return
    }

    setToken(recaptchaToken)
    setIsVerified(true)
    setError(null)
    setIsVerifying(false)
    console.log("✅ reCAPTCHA token stored in hook successfully")
  }, [])

  const handleExpire = useCallback(() => {
    console.log("⏰ reCAPTCHA expired in hook")
    setToken(null)
    setIsVerified(false)
    setError("reCAPTCHA expired. Please verify again.")
    setIsVerifying(false)
  }, [])

  const handleError = useCallback((errorMessage: string) => {
    console.error("❌ reCAPTCHA error in hook:", errorMessage)
    setToken(null)
    setIsVerified(false)
    setError(errorMessage)
    setIsVerifying(false)
  }, [])

  const reset = useCallback(() => {
    console.log("🔄 Resetting reCAPTCHA hook state")
    setToken(null)
    setIsVerified(false)
    setError(null)
    setIsVerifying(false)
  }, [])

  return {
    token,
    isVerified,
    error,
    isVerifying,
    handleVerify,
    handleExpire,
    handleError,
    reset,
  }
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface EmailVerificationProps {
  onVerify: (email: string) => Promise<boolean>
  loading?: boolean
  error?: string | null
}

export function EmailVerification({ onVerify, loading = false, error }: EmailVerificationProps) {
  const [email, setEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setVerificationError("Please enter your email address")
      return
    }

    setIsVerifying(true)
    setVerificationError(null)

    try {
      const result = await onVerify(email)
      if (result) {
        setSuccess(true)
        // The parent component should handle the redirect/state change
      } else {
        setVerificationError("Email not found in waitlist. Please check your email or join the waitlist.")
      }
    } catch (error) {
      setVerificationError("Failed to verify email. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  if (success) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Email Verified!</h3>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-foreground text-center">Check Your Position</CardTitle>
      </CardHeader>
      <CardContent>
        {(error || verificationError) && (
          <Alert className="mb-4 border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error || verificationError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isVerifying || loading}
              className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isVerifying || loading || !email}
            className="w-full h-12 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white font-medium disabled:opacity-50"
          >
            {isVerifying || loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Check Position"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

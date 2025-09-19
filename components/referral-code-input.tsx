"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WaitlistService } from "@/lib/waitlist-service"
import { Gift, CheckCircle, AlertCircle, X, Loader2, Users, Info } from "lucide-react"

interface ReferralCodeInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  initialReferralCode?: string
}

export function ReferralCodeInput({ value, onChange, disabled = false, initialReferralCode }: ReferralCodeInputProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    error?: string
    referrerInfo?: any
  } | null>(null)
  const [showValidation, setShowValidation] = useState(false)

  // Auto-validate when value changes (with debounce)
  useEffect(() => {
    if (!value.trim()) {
      setValidationResult(null)
      setShowValidation(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsValidating(true)
      try {
        const result = await WaitlistService.validateReferralCodeExists(value)
        setValidationResult(result)
        setShowValidation(true)
      } catch (error) {
        setValidationResult({
          isValid: false,
          error: "Unable to validate referral code. Please try again.",
        })
        setShowValidation(true)
      } finally {
        setIsValidating(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [value])

  // Set initial referral code if provided
  useEffect(() => {
    if (initialReferralCode && !value) {
      onChange(initialReferralCode)
    }
  }, [initialReferralCode, value, onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    onChange(inputValue)
  }

  const clearInput = () => {
    onChange("")
    setValidationResult(null)
    setShowValidation(false)
  }

  const formatDisplayValue = (val: string) => {
    if (!val) return ""
    // Add space after LEX for better readability
    if (val.length > 3) {
      return val.slice(0, 3) + " " + val.slice(3)
    }
    return val
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Referral Code (Optional)
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder="LEX123ABC"
            value={formatDisplayValue(value)}
            onChange={handleInputChange}
            disabled={disabled || isValidating}
            maxLength={10} // LEX + space + 6 chars
            className="h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 pr-20 font-mono"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isValidating && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
            {value && !isValidating && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="h-8 w-8 p-0 hover:bg-background/50"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Have a referral code? You'll get 50 points boost and give your referrer 10 points
        </p>
      </div>

      {/* Validation Results */}
      {showValidation && validationResult && (
        <div className="space-y-2">
          {validationResult.isValid && validationResult.referrerInfo ? (
            <Alert className="border-purple-700/50 bg-purple-700/10">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-600">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">✅ Valid referral code!</span>
                    <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50 text-xs">Verified</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-3 h-3" />
                    <span>Referrer: {validationResult.referrerInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="w-3 h-3" />
                    <span>
                      You get 50 points for joining with referral code and the person that referred you gets 10 points!
                    </span>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            validationResult.error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">{validationResult.error}</AlertDescription>
              </Alert>
            )
          )}
        </div>
      )}
    </div>
  )
}

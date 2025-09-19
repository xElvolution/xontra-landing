"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Loader2 } from "lucide-react"

interface ReCaptchaWrapperProps {
  onVerify: (token: string) => void
  onError?: (error: string) => void
  onExpired?: () => void
  theme?: "light" | "dark"
  size?: "compact" | "normal"
  className?: string
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      render: (container: string | HTMLElement, parameters: any) => number
      reset: (widgetId?: number) => void
      getResponse: (widgetId?: number) => string
      execute: (widgetId?: number) => void
    }
  }
}

export function ReCaptchaWrapper({
  onVerify,
  onError,
  onExpired,
  theme = "dark",
  size = "normal",
  className = "",
}: ReCaptchaWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [siteKey, setSiteKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRendered, setIsRendered] = useState(false)
  const mountedRef = useRef(true)

  // Fetch site key from server
  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        console.log("🔑 Fetching reCAPTCHA site key from server...")
        const response = await fetch("/api/recaptcha-config")

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.siteKey) {
          console.log("✅ reCAPTCHA site key fetched successfully")
          console.log("Site key preview:", data.siteKey.substring(0, 20) + "...")
          setSiteKey(data.siteKey)
        } else {
          console.error("❌ No site key in server response:", data)
          setError("reCAPTCHA configuration not available")
        }
      } catch (err) {
        console.error("❌ Failed to fetch reCAPTCHA site key:", err)
        setError("Failed to load reCAPTCHA configuration")
      }
    }

    fetchSiteKey()
  }, [])

  const cleanupWidget = useCallback(() => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        console.log("🧹 Cleaning up reCAPTCHA widget ID:", widgetIdRef.current)
        window.grecaptcha.reset(widgetIdRef.current)
      } catch (e) {
        console.log("Widget cleanup failed (may not exist):", e)
      }
      widgetIdRef.current = null
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    setIsRendered(false)
  }, [])

  const renderRecaptcha = useCallback(() => {
    if (!containerRef.current || !window.grecaptcha || !siteKey || !mountedRef.current) {
      return
    }

    console.log("🎨 Rendering reCAPTCHA widget...")
    console.log("Site key:", siteKey.substring(0, 20) + "...")
    console.log("Theme:", theme, "Size:", size)

    window.grecaptcha.ready(() => {
      if (!mountedRef.current || !containerRef.current) {
        console.log("Component unmounted, skipping render")
        return
      }

      try {
        // Clean up any existing widget
        cleanupWidget()

        // Small delay to ensure cleanup is complete
        setTimeout(() => {
          if (!mountedRef.current || !containerRef.current) return

          console.log("🎨 Creating new reCAPTCHA widget...")

          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            theme: theme,
            size: size,
            callback: (token: string) => {
              console.log("✅ reCAPTCHA completed successfully!")
              console.log("Token length:", token.length)
              console.log("Token preview:", token.substring(0, 50) + "...")

              if (token && token.length > 0) {
                onVerify(token)
              } else {
                console.error("❌ Empty or invalid token received")
                onError?.("Invalid reCAPTCHA response")
              }
            },
            "expired-callback": () => {
              console.log("⏰ reCAPTCHA token expired")
              onExpired?.()
            },
            "error-callback": () => {
              console.error("❌ reCAPTCHA widget error occurred")
              onError?.("reCAPTCHA widget error")
            },
          })

          console.log("✅ reCAPTCHA widget created with ID:", widgetIdRef.current)
          setIsRendered(true)
          setIsLoading(false)
          setError(null)
        }, 100)
      } catch (err) {
        console.error("❌ Failed to render reCAPTCHA widget:", err)
        setError("Failed to render reCAPTCHA widget")
        setIsLoading(false)
      }
    })
  }, [siteKey, theme, size, onVerify, onError, onExpired, cleanupWidget])

  // Load reCAPTCHA script and render widget
  useEffect(() => {
    if (!siteKey) return

    const loadRecaptcha = () => {
      // Check if script is already loaded
      if (window.grecaptcha) {
        console.log("📜 reCAPTCHA script already loaded, rendering widget...")
        renderRecaptcha()
        return
      }

      console.log("📜 Loading reCAPTCHA script from Google...")

      // Load reCAPTCHA script
      const script = document.createElement("script")
      script.src = "https://www.google.com/recaptcha/api.js"
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log("✅ reCAPTCHA script loaded successfully")
        renderRecaptcha()
      }
      script.onerror = () => {
        console.error("❌ Failed to load reCAPTCHA script")
        setError("Failed to load reCAPTCHA script")
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    loadRecaptcha()
  }, [siteKey, renderRecaptcha])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🔄 Component unmounting, cleaning up...")
      mountedRef.current = false
      cleanupWidget()
    }
  }, [cleanupWidget])

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/20 rounded-lg ${className}`}>
        <p className="text-red-400 text-sm">❌ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-red-300 underline hover:text-red-200"
        >
          Refresh page to retry
        </button>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-400">Loading reCAPTCHA...</span>
        </div>
      )}
      <div
        ref={containerRef}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  )
}

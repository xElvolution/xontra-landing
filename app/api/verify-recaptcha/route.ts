import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    console.log("🔍 reCAPTCHA verification request received")
    console.log("Token length:", token?.length)

    if (!token || token.length === 0) {
      console.log("❌ No valid token provided")
      return NextResponse.json({ success: false, error: "reCAPTCHA token is required" }, { status: 400 })
    }

    // Use the provided secret key directly
    const secretKey = "6Lc7pqQrAAAAABTIMUmBkCORBmVfFE8-u1SfGXSe"

    console.log("🌐 Sending verification request to Google...")

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
    })

    if (!verifyResponse.ok) {
      console.error("❌ Google API request failed:", verifyResponse.status)
      return NextResponse.json({ success: false, error: "reCAPTCHA service unavailable" }, { status: 503 })
    }

    const verifyData = await verifyResponse.json()

    console.log("📋 Google reCAPTCHA response:")
    console.log("Success:", verifyData.success)
    console.log("Error codes:", verifyData["error-codes"])
    console.log("Hostname:", verifyData.hostname)

    if (verifyData.success) {
      console.log("✅ reCAPTCHA verification successful!")
      return NextResponse.json({ success: true })
    } else {
      const errorCodes = verifyData["error-codes"] || []
      console.log("❌ reCAPTCHA verification failed:", errorCodes)

      let errorMessage = "reCAPTCHA verification failed"

      if (errorCodes.includes("missing-input-secret")) {
        errorMessage = "reCAPTCHA configuration error"
      } else if (errorCodes.includes("invalid-input-secret")) {
        errorMessage = "reCAPTCHA configuration error"
      } else if (errorCodes.includes("missing-input-response")) {
        errorMessage = "Please complete the reCAPTCHA"
      } else if (errorCodes.includes("invalid-input-response")) {
        errorMessage = "reCAPTCHA token expired. Please try again."
      } else if (errorCodes.includes("timeout-or-duplicate")) {
        errorMessage = "reCAPTCHA token expired. Please try again."
      }

      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 })
    }
  } catch (error) {
    console.error("❌ reCAPTCHA verification exception:", error)
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 })
  }
}

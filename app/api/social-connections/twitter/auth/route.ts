import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("🐦 Starting Twitter OAuth flow...")

    // Get environment variables
    const clientId = process.env.TWITTER_CLIENT_ID
    const clientSecret = process.env.TWITTER_CLIENT_SECRET
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    console.log("🔑 Twitter Client ID:", clientId ? "✅ Set" : "❌ Missing")
    console.log("🔑 Twitter Client Secret:", clientSecret ? "✅ Set" : "❌ Missing")
    console.log("🌐 Base URL:", baseUrl)

    if (!clientId || !clientSecret) {
      console.log("❌ Missing Twitter OAuth credentials")
      return NextResponse.json({ success: false, error: "Twitter OAuth not configured" }, { status: 500 })
    }

    // Get user email from query params
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get("email")

    if (!userEmail) {
      console.log("❌ No user email provided")
      return NextResponse.json({ success: false, error: "User email required" }, { status: 400 })
    }

    // Twitter OAuth 2.0 authorization URL
    const redirectUri = `${baseUrl}/api/social-connections/twitter/callback`
    const state = Buffer.from(JSON.stringify({ email: userEmail })).toString("base64")

    const authUrl = new URL("https://twitter.com/i/oauth2/authorize")
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("scope", "tweet.read users.read")
    authUrl.searchParams.set("state", state)
    authUrl.searchParams.set("code_challenge", "challenge")
    authUrl.searchParams.set("code_challenge_method", "plain")

    console.log("🔗 Generated Twitter auth URL:", authUrl.toString())

    return NextResponse.json({
      success: true,
      authUrl: authUrl.toString(),
    })
  } catch (error) {
    console.error("❌ Twitter auth error:", error)
    return NextResponse.json({ success: false, error: "Failed to initiate Twitter authentication" }, { status: 500 })
  }
}

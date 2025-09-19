import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("💬 Starting Discord OAuth flow...")

    // Get environment variables
    const clientId = process.env.DISCORD_CLIENT_ID
    const clientSecret = process.env.DISCORD_CLIENT_SECRET
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    console.log("🔑 Discord Client ID:", clientId ? "✅ Set" : "❌ Missing")
    console.log("🔑 Discord Client Secret:", clientSecret ? "✅ Set" : "❌ Missing")
    console.log("🌐 Base URL:", baseUrl)

    if (!clientId || !clientSecret) {
      console.log("❌ Missing Discord OAuth credentials")
      return NextResponse.json({ success: false, error: "Discord OAuth not configured" }, { status: 500 })
    }

    // Get user email from query params
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get("email")

    if (!userEmail) {
      console.log("❌ No user email provided")
      return NextResponse.json({ success: false, error: "User email required" }, { status: 400 })
    }

    // Discord OAuth 2.0 authorization URL
    const redirectUri = `${baseUrl}/api/social-connections/discord/callback`
    const state = Buffer.from(JSON.stringify({ email: userEmail })).toString("base64")

    const authUrl = new URL("https://discord.com/api/oauth2/authorize")
    authUrl.searchParams.set("client_id", clientId)
    authUrl.searchParams.set("redirect_uri", redirectUri)
    authUrl.searchParams.set("response_type", "code")
    authUrl.searchParams.set("scope", "identify")
    authUrl.searchParams.set("state", state)

    console.log("🔗 Generated Discord auth URL:", authUrl.toString())

    return NextResponse.json({
      success: true,
      authUrl: authUrl.toString(),
    })
  } catch (error) {
    console.error("❌ Discord auth error:", error)
    return NextResponse.json({ success: false, error: "Failed to initiate Discord authentication" }, { status: 500 })
  }
}

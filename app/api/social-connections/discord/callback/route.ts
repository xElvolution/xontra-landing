import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    console.log("💬 Discord OAuth callback received...")

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    if (error) {
      console.log("❌ Discord OAuth error:", error)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=discord_auth_failed`)
    }

    if (!code || !state) {
      console.log("❌ Missing code or state parameter")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=invalid_callback`)
    }

    // Decode state to get user email
    let userEmail: string
    try {
      const stateData = JSON.parse(Buffer.from(state, "base64").toString())
      userEmail = stateData.email
    } catch (e) {
      console.log("❌ Invalid state parameter")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=invalid_state`)
    }

    console.log("👤 Processing callback for user:", userEmail)

    // Exchange code for access token
    const clientId = process.env.DISCORD_CLIENT_ID!
    const clientSecret = process.env.DISCORD_CLIENT_SECRET!
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/social-connections/discord/callback`

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      console.log("❌ Failed to exchange code for token:", await tokenResponse.text())
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=token_exchange_failed`)
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Token exchange successful")

    // Get user info from Discord
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.log("❌ Failed to fetch Discord user info")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=user_info_failed`)
    }

    const discordUser = await userResponse.json()
    console.log("✅ Discord user info fetched:", discordUser.username)

    // Get user from waitlist
    const { data: waitlistUser, error: userError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", userEmail)
      .single()

    if (userError || !waitlistUser) {
      console.log("❌ User not found in waitlist")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=user_not_found`)
    }

    // Save Discord connection to database
    try {
      const { error: upsertError } = await supabase.from("social_connections").upsert(
        {
          user_id: waitlistUser.id,
          discord_id: discordUser.id,
          discord_username: discordUser.username,
          discord_connected_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )

      if (upsertError) {
        console.log("❌ Failed to save Discord connection:", upsertError)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=save_failed`)
      }

      console.log("✅ Discord connection saved successfully")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?email=${encodeURIComponent(userEmail)}&success=discord_connected`)
    } catch (dbError) {
      console.log("⚠️ Database table might not exist:", dbError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=database_not_ready`)
    }
  } catch (error) {
    console.error("❌ Discord callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=callback_failed`)
  }
}

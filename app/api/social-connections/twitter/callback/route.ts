import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    console.log("🐦 Twitter OAuth callback received...")

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    if (error) {
      console.log("❌ Twitter OAuth error:", error)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=twitter_auth_failed`)
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
    const clientId = process.env.TWITTER_CLIENT_ID!
    const clientSecret = process.env.TWITTER_CLIENT_SECRET!
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/social-connections/twitter/callback`

    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: "challenge",
      }),
    })

    if (!tokenResponse.ok) {
      console.log("❌ Failed to exchange code for token:", await tokenResponse.text())
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=token_exchange_failed`)
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Token exchange successful")

    // Get user info from Twitter
    const userResponse = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.log("❌ Failed to fetch Twitter user info")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=user_info_failed`)
    }

    const twitterUser = await userResponse.json()
    console.log("✅ Twitter user info fetched:", twitterUser.data.username)

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

    // Save Twitter connection to database
    try {
      const { error: upsertError } = await supabase.from("social_connections").upsert(
        {
          user_id: waitlistUser.id,
          twitter_id: twitterUser.data.id,
          twitter_username: twitterUser.data.username,
          twitter_connected_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )

      if (upsertError) {
        console.log("❌ Failed to save Twitter connection:", upsertError)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=save_failed`)
      }

      console.log("✅ Twitter connection saved successfully")
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?email=${encodeURIComponent(userEmail)}&success=twitter_connected`)
    } catch (dbError) {
      console.log("⚠️ Database table might not exist:", dbError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=database_not_ready`)
    }
  } catch (error) {
    console.error("❌ Twitter callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/waitlist?error=callback_failed`)
  }
}

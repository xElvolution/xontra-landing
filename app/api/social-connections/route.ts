import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching social connections...")

    // Get user email from query params (you might want to get this from session/auth)
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get("email")

    if (!userEmail) {
      console.log("❌ No user email provided")
      return NextResponse.json({ success: false, error: "User email required" }, { status: 400 })
    }

    console.log("👤 Looking up user:", userEmail)

    // First get the user from waitlist
    const { data: user, error: userError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", userEmail)
      .single()

    if (userError || !user) {
      console.log("❌ User not found in waitlist:", userError)
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    console.log("✅ User found, fetching social connections...")

    // Check if social_connections table exists and get connections
    try {
      const { data: connections, error: connectionsError } = await supabase
        .from("social_connections")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (connectionsError && connectionsError.code !== "PGRST116") {
        console.log("⚠️ Social connections table error:", connectionsError)
        // If table doesn't exist, return null connections
        return NextResponse.json({
          success: true,
          connections: null,
        })
      }

      const formattedConnections = connections
        ? {
            twitter: connections.twitter_id
              ? {
                  id: connections.twitter_id,
                  username: connections.twitter_username,
                  connected_at: connections.twitter_connected_at,
                }
              : null,
            discord: connections.discord_id
              ? {
                  id: connections.discord_id,
                  username: connections.discord_username,
                  connected_at: connections.discord_connected_at,
                }
              : null,
          }
        : null

      console.log("✅ Social connections fetched successfully")
      return NextResponse.json({
        success: true,
        connections: formattedConnections,
      })
    } catch (tableError) {
      console.log("⚠️ Social connections table doesn't exist yet:", tableError)
      return NextResponse.json({
        success: true,
        connections: null,
      })
    }
  } catch (error) {
    console.error("❌ Social connections fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch social connections" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    console.log("🐦 Disconnecting Twitter...")

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "User email required" }, { status: 400 })
    }

    // Get user from waitlist
    const { data: user, error: userError } = await supabase.from("waitlist").select("id").eq("email", email).single()

    if (userError || !user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Update social connections to remove Twitter
    const { error: updateError } = await supabase
      .from("social_connections")
      .update({
        twitter_id: null,
        twitter_username: null,
        twitter_connected_at: null,
      })
      .eq("user_id", user.id)

    if (updateError) {
      console.log("❌ Failed to disconnect Twitter:", updateError)
      return NextResponse.json({ success: false, error: "Failed to disconnect Twitter" }, { status: 500 })
    }

    console.log("✅ Twitter disconnected successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Twitter disconnect error:", error)
    return NextResponse.json({ success: false, error: "Failed to disconnect Twitter" }, { status: 500 })
  }
}

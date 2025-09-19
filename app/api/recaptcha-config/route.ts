import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use the provided site key directly
    const siteKey = "6Lc7pqQrAAAAAM_iedrvn8dWpAS7vl-HSeyOIKoJ"

    console.log("✅ Returning reCAPTCHA site key")
    return NextResponse.json({ siteKey })
  } catch (error) {
    console.error("❌ Error in recaptcha-config route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

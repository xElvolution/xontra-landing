import { type NextRequest, NextResponse } from "next/server"
import { WaitlistService } from "@/lib/waitlist-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, walletAddress, referralCode, recaptchaToken } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    if (!recaptchaToken) {
      return NextResponse.json({ success: false, error: "reCAPTCHA verification is required" }, { status: 400 })
    }

    // Join waitlist
    const result = await WaitlistService.joinWaitlist({
      email,
      walletAddress,
      referralCode,
      recaptchaToken,
    })

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const totalCount = await WaitlistService.getTotalCount()
    return NextResponse.json({ totalCount })
  } catch (error) {
    console.error("Error fetching waitlist stats:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist statistics" }, { status: 500 })
  }
}

import { supabase } from "./supabase"
import type { Database } from "@/lib/supabase"

type WaitlistEntry = Database["public"]["Tables"]["waitlist"]["Row"]
type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"]

export interface WaitlistSubmission {
  email: string
  walletAddress?: string
  referredBy?: string
  recaptchaToken: string
}

export interface WaitlistData {
  id: string
  email: string
  walletAddress?: string
  position: number
  leaderboardRank?: number
  totalCount: number
  referralCode: string
  referralCount: number
  referredBy?: string
  createdAt: string
  updatedAt: string
  referrals?: Array<{
    email: string
    position: number
    created_at: string
  }>
}

export interface WaitlistResponse {
  success: boolean
  data?: WaitlistData
  error?: string
  isExisting?: boolean
}

export interface WaitlistStats {
  totalUsers: number
  userPosition: number | null
  referralCount: number
}

export interface JoinWaitlistParams {
  email: string
  walletAddress?: string
  referralCode?: string
  recaptchaToken: string
}

export class WaitlistService {
  // Generate unique referral code
  static generateReferralCode(): string {
    const prefix = "LEX"
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = prefix
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Verify reCAPTCHA token
  static async verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log("🔍 Starting reCAPTCHA verification...")
      console.log("Token length:", token?.length)
      console.log("Token preview:", token?.substring(0, 50) + "...")

      const response = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      console.log("📡 Verification API response status:", response.status)

      const data = await response.json()
      console.log("📋 Verification API response data:", data)

      if (data.success) {
        console.log("✅ reCAPTCHA verification successful!")
        return { success: true }
      } else {
        console.log("❌ reCAPTCHA verification failed:", data.error)
        console.log("Error codes:", data.errorCodes)
        console.log("Hostname:", data.hostname)
        return { success: false, error: data.error || "reCAPTCHA verification failed" }
      }
    } catch (error) {
      console.error("❌ reCAPTCHA verification network error:", error)
      return { success: false, error: "Network error during verification" }
    }
  }

  // Validate referral code format
  static validateReferralCodeFormat(code: string): { isValid: boolean; error?: string } {
    if (!code) {
      return { isValid: true } // Empty is valid (optional field)
    }

    // Remove whitespace and convert to uppercase
    const cleanCode = code.trim().toUpperCase()

    // Check format: LEX followed by 6 alphanumeric characters
    const referralCodeRegex = /^LEX[A-Z0-9]{6}$/

    if (!referralCodeRegex.test(cleanCode)) {
      return {
        isValid: false,
        error: "Referral code must be in format: LEX followed by 6 characters (e.g., LEXABC123)",
      }
    }

    return { isValid: true }
  }

  // Get user by email with full data
  static async getUserByEmail(email: string): Promise<WaitlistEntry | null> {
    try {
      const { data, error } = await supabase.from("waitlist").select("*").eq("email", email).single()

      if (error || !data) {
        return null
      }

      return data
    } catch (error) {
      console.error("Error fetching user:", error)
      return null
    }
  }

  // Get user's leaderboard rank based on points
  static async getUserLeaderboardRank(referralCode: string): Promise<number> {
    try {
      // Get all users with their points calculated
      const { data: allUsers } = await supabase.from("waitlist").select(`
          referral_code,
          position,
          created_at
        `)

      if (!allUsers) return 1

      // Calculate points for each user and sort
      const usersWithPoints = await Promise.all(
        allUsers.map(async (user) => {
          const { count: referralCount } = await supabase
            .from("waitlist")
            .select("*", { count: "exact", head: true })
            .eq("referred_by", user.referral_code)

          return {
            referralCode: user.referral_code,
            position: user.position,
            createdAt: user.created_at,
            referralCount: referralCount || 0,
            pointsGained: 50 + (referralCount || 0) * 10,
          }
        }),
      )

      // Sort by points (descending) then by position (ascending) for ties
      usersWithPoints.sort((a, b) => {
        if (b.pointsGained !== a.pointsGained) {
          return b.pointsGained - a.pointsGained
        }
        return a.position - b.position
      })

      // Find the rank of the specified user
      const userRank = usersWithPoints.findIndex((user) => user.referralCode === referralCode) + 1
      return userRank || 1
    } catch (error) {
      console.error("Error getting leaderboard rank:", error)
      return 1
    }
  }

  // Validate referral code exists in database
  static async validateReferralCodeExists(
    code: string,
  ): Promise<{ isValid: boolean; error?: string; referrerInfo?: any }> {
    if (!code) {
      return { isValid: true } // Empty is valid (optional field)
    }

    const cleanCode = code.trim().toUpperCase()

    // First check format
    const formatCheck = this.validateReferralCodeFormat(cleanCode)
    if (!formatCheck.isValid) {
      return formatCheck
    }

    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("referral_code, email, position, created_at")
        .eq("referral_code", cleanCode)
        .single()

      if (error || !data) {
        return {
          isValid: false,
          error: "Referral code not found. Please check the code and try again.",
        }
      }

      return {
        isValid: true,
        referrerInfo: {
          referralCode: data.referral_code,
          email: data.email.replace(/(.{2}).*(@.*)/, "$1***$2"), // Mask email for privacy
          position: data.position,
          joinedDate: new Date(data.created_at).toLocaleDateString(),
        },
      }
    } catch (error) {
      console.error("Referral validation error:", error)
      return {
        isValid: false,
        error: "Unable to validate referral code. Please try again.",
      }
    }
  }

  // Add user to waitlist with reCAPTCHA verification
  static async addToWaitlist(entry: WaitlistSubmission): Promise<WaitlistResponse> {
    try {
      console.log("📝 Starting waitlist addition process...")
      console.log("Email:", entry.email)
      console.log("Has reCAPTCHA token:", !!entry.recaptchaToken)
      console.log("Token length:", entry.recaptchaToken?.length)

      // Verify reCAPTCHA token FIRST
      if (!entry.recaptchaToken) {
        console.log("❌ No reCAPTCHA token provided")
        return {
          success: false,
          error: "reCAPTCHA verification required",
        }
      }

      console.log("🔍 Verifying reCAPTCHA token...")
      const recaptchaResult = await this.verifyRecaptcha(entry.recaptchaToken)

      if (!recaptchaResult.success) {
        console.log("❌ reCAPTCHA verification failed:", recaptchaResult.error)
        return {
          success: false,
          error: recaptchaResult.error || "reCAPTCHA verification failed",
        }
      }

      console.log("✅ reCAPTCHA verified successfully, proceeding with database operations...")

      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("waitlist")
        .select("*")
        .eq("email", entry.email)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError
      }

      if (existingUser) {
        console.log("👤 User already exists, returning existing data")
        // User exists, return their data
        const userData = await this.getUserStats(existingUser.referral_code)
        return {
          success: true,
          data: userData,
          isExisting: true,
        }
      }

      // Generate referral code
      const referralCode = this.generateReferralCode()
      console.log("🎫 Generated referral code:", referralCode)

      // Calculate bonus points for referral
      let bonusPoints = 0
      if (entry.referredBy) {
        console.log("🔗 Checking referral code:", entry.referredBy)
        // Verify referral code exists
        const { data: referrer } = await supabase
          .from("waitlist")
          .select("id, email")
          .eq("referral_code", entry.referredBy)
          .single()

        if (referrer) {
          bonusPoints = 50 // Bonus points for being referred
          console.log("✅ Valid referral code, bonus points:", bonusPoints)
        } else {
          console.log("❌ Invalid referral code, continuing without bonus")
          // Invalid referral code, continue without bonus
          entry.referredBy = undefined
        }
      }

      // Get current position (total count + 1)
      const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true })
      const position = (count || 0) + 1
      console.log("📍 Assigned position:", position)

      // Insert new user
      console.log("💾 Inserting new user into database...")
      const { data: newUser, error: insertError } = await supabase
        .from("waitlist")
        .insert({
          email: entry.email,
          wallet_address: entry.walletAddress,
          referral_code: referralCode,
          referred_by: entry.referredBy,
          position: position,
          bonus_points: bonusPoints,
        })
        .select()
        .single()

      if (insertError) {
        console.error("❌ Database insert error:", insertError)
        throw insertError
      }

      console.log("✅ User inserted successfully")

      // Get complete user data
      const userData = await this.getUserStats(referralCode)
      console.log("✅ Waitlist addition completed successfully")

      return {
        success: true,
        data: userData,
        isExisting: false,
      }
    } catch (error) {
      console.error("❌ Error in addToWaitlist:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to join waitlist",
      }
    }
  }

  // Get user statistics with enhanced data including leaderboard rank
  static async getUserStats(referralCode: string): Promise<WaitlistData> {
    try {
      // Get user data with position
      const { data: userData } = await supabase.from("waitlist").select("*").eq("referral_code", referralCode).single()

      if (!userData) {
        throw new Error("User not found")
      }

      // Get referral count
      const { count: referralCount } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("referred_by", referralCode)

      // Get total waitlist count
      const { count: totalCount } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

      // Get leaderboard rank based on points
      const leaderboardRank = await this.getUserLeaderboardRank(referralCode)

      // Get referrals data for detailed tracking
      const { data: referrals } = await supabase
        .from("waitlist")
        .select("email, created_at, position")
        .eq("referred_by", referralCode)
        .order("created_at", { ascending: false })

      return {
        id: userData.id,
        email: userData.email,
        walletAddress: userData.wallet_address,
        position: userData.position,
        leaderboardRank: leaderboardRank,
        referralCount: referralCount || 0,
        totalCount: totalCount || 0,
        referralCode: userData.referral_code,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
        referredBy: userData.referred_by,
        referrals: referrals || [],
      }
    } catch (error) {
      console.error("Stats error:", error)
      throw error
    }
  }

  // Subscribe to real-time position updates with enhanced tracking
  static subscribeToPositionUpdates(referralCode: string, callback: (data: any) => void) {
    return supabase
      .channel(`waitlist-updates-${referralCode}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "waitlist",
        },
        async (payload) => {
          try {
            // Always refetch stats when any change occurs
            const stats = await this.getUserStats(referralCode)
            callback({
              type: payload.eventType,
              data: stats,
              timestamp: new Date().toISOString(),
            })
          } catch (error) {
            console.error("Real-time update error:", error)
          }
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status)
      })
  }

  // Get user by email for login/verification - FIXED VERSION
  static async verifyUserByEmail(email: string) {
    try {
      console.log("🔍 Verifying user by email:", email)

      const userData = await this.getUserByEmail(email)
      if (!userData) {
        console.log("❌ User not found in database")
        return { success: false, error: "Email not found in waitlist" }
      }

      console.log("✅ User found, getting stats...")
      const stats = await this.getUserStats(userData.referral_code)
      console.log("📊 User stats retrieved:", stats)

      return { success: true, data: stats }
    } catch (error) {
      console.error("❌ Verification error:", error)
      return { success: false, error: "Failed to verify email" }
    }
  }

  // Get leaderboard data - ranked by points gained (50 for joining + 10 per referral)
  static async getLeaderboard(limit = 10) {
    try {
      // Use a more explicit query to ensure proper ordering
      const { data, error } = await supabase.rpc("get_leaderboard", {
        limit_count: limit,
      })

      if (error) {
        console.error("Leaderboard RPC error:", error)
        // Fallback to direct query if RPC fails
        const { data: fallbackData } = await supabase
          .from("waitlist")
          .select(`
            referral_code,
            position,
            created_at,
            email
          `)
          .order("created_at", { ascending: true })
          .limit(limit)

        // Calculate referral counts and points manually for fallback
        const enrichedData = await Promise.all(
          (fallbackData || []).map(async (user) => {
            const { count: referralCount } = await supabase
              .from("waitlist")
              .select("*", { count: "exact", head: true })
              .eq("referred_by", user.referral_code)

            return {
              ...user,
              referral_count: referralCount || 0,
              points_gained: 50 + (referralCount || 0) * 10,
            }
          }),
        )

        // Sort by points gained (descending) then by position (ascending)
        return enrichedData.sort((a, b) => {
          if (b.points_gained !== a.points_gained) {
            return b.points_gained - a.points_gained
          }
          return a.position - b.position
        })
      }

      return data || []
    } catch (error) {
      console.error("Leaderboard error:", error)
      return []
    }
  }

  // Get total waitlist count for display
  static async getTotalCount(): Promise<number> {
    const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true })
    return count || 0
  }

  // Join waitlist with reCAPTCHA verification and referral code validation
  static async joinWaitlist({ email, walletAddress, referralCode, recaptchaToken }: JoinWaitlistParams): Promise<{
    success: boolean
    data?: WaitlistEntry
    error?: string
  }> {
    try {
      console.log("🚀 Joining waitlist:", { email, hasToken: !!recaptchaToken })

      // Verify reCAPTCHA token first
      if (!recaptchaToken) {
        console.log("❌ No reCAPTCHA token provided")
        return {
          success: false,
          error: "reCAPTCHA verification required",
        }
      }

      const recaptchaResult = await this.verifyRecaptcha(recaptchaToken)
      if (!recaptchaResult.success) {
        console.log("❌ reCAPTCHA verification failed:", recaptchaResult.error)
        return {
          success: false,
          error: recaptchaResult.error || "reCAPTCHA verification failed",
        }
      }

      console.log("✅ reCAPTCHA verified successfully")

      // Check if email already exists
      const { data: existingUser } = await supabase.from("waitlist").select("*").eq("email", email).single()

      if (existingUser) {
        return {
          success: false,
          error: "Email already registered in waitlist",
        }
      }

      // Validate referral code if provided
      let referredBy: string | null = null
      if (referralCode) {
        const { data: referrer } = await supabase
          .from("waitlist")
          .select("referral_code")
          .eq("referral_code", referralCode)
          .single()

        if (!referrer) {
          return {
            success: false,
            error: "Invalid referral code",
          }
        }
        referredBy = referrer.referral_code
      }

      // Generate unique referral code
      const newReferralCode = this.generateReferralCode()

      // Get current position (total count + 1)
      const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

      const position = (count || 0) + 1

      // Insert new user
      const { data, error } = await supabase
        .from("waitlist")
        .insert({
          email,
          wallet_address: walletAddress || null,
          referral_code: newReferralCode,
          referred_by: referredBy,
          position,
        })
        .select()
        .single()

      if (error) {
        console.error("Database error:", error)
        return {
          success: false,
          error: "Failed to join waitlist. Please try again.",
        }
      }

      console.log("✅ User successfully joined waitlist")
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error("Waitlist service error:", error)
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      }
    }
  }

  // Get waitlist statistics
  static async getWaitlistStats(email?: string): Promise<WaitlistStats> {
    try {
      // Get total users
      const { count: totalUsers } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

      let userPosition: number | null = null
      let referralCount = 0

      if (email) {
        // Get user's position
        const { data: user } = await supabase
          .from("waitlist")
          .select("position, referral_code")
          .eq("email", email)
          .single()

        if (user) {
          userPosition = user.position

          // Get referral count
          const { count } = await supabase
            .from("waitlist")
            .select("*", { count: "exact", head: true })
            .eq("referred_by", user.referral_code)

          referralCount = count || 0
        }
      }

      return {
        totalUsers: totalUsers || 0,
        userPosition,
        referralCount,
      }
    } catch (error) {
      console.error("Error fetching waitlist stats:", error)
      return {
        totalUsers: 0,
        userPosition: null,
        referralCount: 0,
      }
    }
  }
}

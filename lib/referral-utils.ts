/**
 * Utility functions for generating referral links and managing referral codes
 */

export class ReferralUtils {
  // Base domain for the application
  private static readonly BASE_DOMAIN = "https://xontra.xyz"

  /**
   * Generate a complete referral link for a given referral code
   * @param referralCode - The referral code (e.g., "XONABC123")
   * @returns Complete referral URL (e.g., "https://xontra.xyz/waitlist?ref=XONABC123")
   */
  static generateReferralLink(referralCode: string): string {
    if (!referralCode) {
      throw new Error("Referral code is required")
    }

    return `${this.BASE_DOMAIN}/waitlist?ref=${referralCode}`
  }

  /**
   * Extract referral code from a referral link
   * @param link - The referral link
   * @returns The referral code or null if not found
   */
  static extractReferralCode(link: string): string | null {
    try {
      const url = new URL(link)
      return url.searchParams.get("ref")
    } catch {
      return null
    }
  }

  /**
   * Validate if a link is a valid Xontra referral link
   * @param link - The link to validate
   * @returns True if valid, false otherwise
   */
  static isValidReferralLink(link: string): boolean {
    try {
      const url = new URL(link)
      return url.hostname === "xontra.xyz" && url.pathname === "/waitlist" && url.searchParams.has("ref")
    } catch {
      return false
    }
  }

  /**
   * Get the current domain (useful for development vs production)
   * @returns The base domain
   */
  static getBaseDomain(): string {
    return this.BASE_DOMAIN
  }
}

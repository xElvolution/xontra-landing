import { ReferralUtils } from "../referral-utils"

describe("ReferralUtils", () => {
  describe("generateReferralLink", () => {
    it("should generate correct referral link format", () => {
      const referralCode = "XONABC123"
      const expectedLink = "https://xontra.xyz/waitlist?ref=XONABC123"

      const result = ReferralUtils.generateReferralLink(referralCode)

      expect(result).toBe(expectedLink)
    })

    it("should throw error for empty referral code", () => {
      expect(() => {
        ReferralUtils.generateReferralLink("")
      }).toThrow("Referral code is required")
    })
  })

  describe("extractReferralCode", () => {
    it("should extract referral code from valid link", () => {
      const link = "https://xontra.xyz/waitlist?ref=XONABC123"
      const result = ReferralUtils.extractReferralCode(link)

      expect(result).toBe("XONABC123")
    })

    it("should return null for invalid link", () => {
      const link = "https://example.com/invalid"
      const result = ReferralUtils.extractReferralCode(link)

      expect(result).toBeNull()
    })
  })

  describe("isValidReferralLink", () => {
    it("should validate correct Xontra referral links", () => {
      const validLink = "https://xontra.xyz/waitlist?ref=XONABC123"
      const result = ReferralUtils.isValidReferralLink(validLink)

      expect(result).toBe(true)
    })

    it("should reject invalid domain", () => {
      const invalidLink = "https://example.com/waitlist?ref=XONABC123"
      const result = ReferralUtils.isValidReferralLink(invalidLink)

      expect(result).toBe(false)
    })

    it("should reject missing ref parameter", () => {
      const invalidLink = "https://xontra.xyz/waitlist"
      const result = ReferralUtils.isValidReferralLink(invalidLink)

      expect(result).toBe(false)
    })
  })

  describe("getBaseDomain", () => {
    it("should return correct base domain", () => {
      const result = ReferralUtils.getBaseDomain()

      expect(result).toBe("https://xontra.xyz")
    })
  })
})

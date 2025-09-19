-- Fix the leaderboard ranking to properly order by points gained
-- This ensures users with higher points are ranked first

-- Create a view for leaderboard with proper ranking
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT 
  referral_code,
  position,
  created_at,
  (SELECT COUNT(*) FROM waitlist w2 WHERE w2.referred_by = waitlist.referral_code) as referral_count,
  (50 + (SELECT COUNT(*) FROM waitlist w2 WHERE w2.referred_by = waitlist.referral_code) * 10) as points_gained
FROM waitlist
ORDER BY points_gained DESC, position ASC;

-- Update the leaderboard query to use proper ordering
-- This will be used in the WaitlistService.getLeaderboard method

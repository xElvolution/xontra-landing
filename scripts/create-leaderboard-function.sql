-- Create a PostgreSQL function to get leaderboard with proper ranking
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  referral_code VARCHAR(20),
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  email VARCHAR(255),
  referral_count BIGINT,
  points_gained BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.referral_code,
    w.position,
    w.created_at,
    w.email,
    COALESCE(ref_counts.referral_count, 0) as referral_count,
    (50 + COALESCE(ref_counts.referral_count, 0) * 10) as points_gained
  FROM waitlist w
  LEFT JOIN (
    SELECT 
      referred_by,
      COUNT(*) as referral_count
    FROM waitlist 
    WHERE referred_by IS NOT NULL
    GROUP BY referred_by
  ) ref_counts ON w.referral_code = ref_counts.referred_by
  ORDER BY 
    (50 + COALESCE(ref_counts.referral_count, 0) * 10) DESC,  -- Points gained (descending)
    w.position ASC                                             -- Position (ascending for ties)
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

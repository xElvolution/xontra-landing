-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  wallet_address VARCHAR(42),
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referred_by VARCHAR(20),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on referral_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);

-- Create index on referred_by for referral tracking
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);

-- Create function to update position based on creation order
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Update positions for all entries based on creation time
  UPDATE waitlist 
  SET position = subquery.row_num
  FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num
    FROM waitlist
  ) AS subquery
  WHERE waitlist.id = subquery.id;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update positions
DROP TRIGGER IF EXISTS trigger_update_positions ON waitlist;
CREATE TRIGGER trigger_update_positions
  AFTER INSERT OR DELETE ON waitlist
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_waitlist_positions();

-- Create function to handle referral bonuses
CREATE OR REPLACE FUNCTION handle_referral_bonus()
RETURNS TRIGGER AS $$
BEGIN
  -- If user was referred, move the referrer up 10 positions and new user gets 50 position boost
  IF NEW.referred_by IS NOT NULL THEN
    -- Move referrer up 10 positions
    UPDATE waitlist 
    SET position = GREATEST(1, position - 10),
        updated_at = NOW()
    WHERE referral_code = NEW.referred_by;
    
    -- Move new user up 50 positions
    UPDATE waitlist 
    SET position = GREATEST(1, position - 50),
        updated_at = NOW()
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for referral bonuses
DROP TRIGGER IF EXISTS trigger_referral_bonus ON waitlist;
CREATE TRIGGER trigger_referral_bonus
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION handle_referral_bonus();

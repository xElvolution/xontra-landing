-- Update the referral bonus from 10 to 50 positions
CREATE OR REPLACE FUNCTION handle_referral_bonus()
RETURNS TRIGGER AS $$
BEGIN
  -- If user was referred, move the referrer up 50 positions
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist 
    SET position = GREATEST(1, position - 50),
        updated_at = NOW()
    WHERE referral_code = NEW.referred_by;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
DROP TRIGGER IF EXISTS trigger_referral_bonus ON waitlist;
CREATE TRIGGER trigger_referral_bonus
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION handle_referral_bonus();

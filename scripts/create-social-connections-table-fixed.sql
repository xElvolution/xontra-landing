-- Create social_connections table with proper error handling
CREATE TABLE IF NOT EXISTS social_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    twitter_id TEXT,
    twitter_username TEXT,
    twitter_connected_at TIMESTAMP WITH TIME ZONE,
    discord_id TEXT,
    discord_username TEXT,
    discord_connected_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraints with error handling
DO $$ 
BEGIN
    -- Add foreign key if waitlist table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'waitlist') THEN
        BEGIN
            ALTER TABLE social_connections 
            ADD CONSTRAINT fk_social_connections_user_id 
            FOREIGN KEY (user_id) REFERENCES waitlist(id) ON DELETE CASCADE;
        EXCEPTION
            WHEN duplicate_object THEN NULL;
        END;
    END IF;
    
    -- Add unique constraints
    BEGIN
        ALTER TABLE social_connections ADD CONSTRAINT unique_user_id UNIQUE (user_id);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE social_connections ADD CONSTRAINT unique_twitter_id UNIQUE (twitter_id);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE social_connections ADD CONSTRAINT unique_discord_id UNIQUE (discord_id);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_social_connections_twitter_id ON social_connections(twitter_id) WHERE twitter_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_social_connections_discord_id ON social_connections(discord_id) WHERE discord_id IS NOT NULL;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_social_connections_updated_at') THEN
        CREATE TRIGGER update_social_connections_updated_at
            BEFORE UPDATE ON social_connections
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

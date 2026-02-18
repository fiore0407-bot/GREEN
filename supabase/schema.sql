-- Supabase Schema for EcoBuddy

-- Waste history table
CREATE TABLE waste_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    waste_name TEXT NOT NULL,
    waste_category TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User stats table
CREATE TABLE user_stats (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    total_points INTEGER DEFAULT 0,
    searches_count INTEGER DEFAULT 0,
    plastic_count INTEGER DEFAULT 0,
    wet_count INTEGER DEFAULT 0,
    multi_material_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE user_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    badge_id TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waste_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own searches" ON waste_searches
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches" ON waste_searches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own badges" ON user_badges
    FOR SELECT USING (auth.uid() = user_id);

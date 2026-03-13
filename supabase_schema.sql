-- SQL for creating the portfolios table in Supabase

CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    username TEXT UNIQUE NOT NULL,
    style TEXT NOT NULL,
    content JSONB NOT NULL,
    github_data JSONB NOT NULL,
    focus_role TEXT,
    target_job TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own records
CREATE POLICY "Users can insert their own portfolios" 
ON portfolios FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own records
CREATE POLICY "Users can update their own portfolios" 
ON portfolios FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy to allow anyone to view portfolios (public)
CREATE POLICY "Portfolios are publicly viewable" 
ON portfolios FOR SELECT 
USING (true);

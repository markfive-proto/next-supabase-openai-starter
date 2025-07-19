-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table (for future phases)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vibe_boards table (MVP focus)
CREATE TABLE vibe_boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for anonymous users
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  colors JSONB NOT NULL, -- Array of hex color codes
  font_pairing JSONB NOT NULL, -- Font names and categories
  image_urls JSONB NOT NULL, -- Array of generated image URLs
  ai_concept TEXT, -- AI-generated style concept description
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_vibe_boards_user_id ON vibe_boards(user_id);
CREATE INDEX idx_vibe_boards_created_at ON vibe_boards(created_at);
CREATE INDEX idx_projects_user_id ON projects(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE vibe_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vibe_boards

-- Allow all users (authenticated and anonymous) to view boards
CREATE POLICY "Allow public read access to vibe boards" ON vibe_boards
  FOR SELECT USING (true);

-- Allow anonymous users to create boards (MVP requirement)
CREATE POLICY "Allow anonymous vibe board creation" ON vibe_boards
  FOR INSERT WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Allow authenticated users to create their own boards  
CREATE POLICY "Allow authenticated vibe board creation" ON vibe_boards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own boards
CREATE POLICY "Users can update own vibe boards" ON vibe_boards
  FOR UPDATE USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- Allow users to delete their own boards
CREATE POLICY "Users can delete own vibe boards" ON vibe_boards
  FOR DELETE USING (auth.uid() = user_id AND auth.uid() IS NOT NULL);

-- RLS Policies for projects

-- Allow authenticated users to view their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to create projects
CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own projects
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to delete their own projects
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on vibe_boards
CREATE TRIGGER update_vibe_boards_updated_at 
    BEFORE UPDATE ON vibe_boards 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 
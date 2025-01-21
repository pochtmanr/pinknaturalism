/*
  # Media Management Schema

  1. New Tables
    - `media_items`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `category` (text) - 'editorial', 'commercial', 'video'
      - `url` (text)
      - `thumbnail_url` (text)
      - `type` (text) - 'image' or 'video'
      - `duration` (text) - for videos only
      - `order` (integer)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `media_items` table
    - Add policies for authenticated users to manage their media
*/

-- Create media_items table
CREATE TABLE media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('editorial', 'commercial', 'video')),
  url text NOT NULL,
  thumbnail_url text,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  duration text,
  "order" integer DEFAULT 0,
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all media"
  ON media_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own media"
  ON media_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own media"
  ON media_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own media"
  ON media_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_media_items_updated_at
  BEFORE UPDATE ON media_items
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
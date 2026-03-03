/*
  # Create messages table for contact form

  1. New Tables
    - `messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Name of the person sending the message
      - `email` (text) - Email address of the sender
      - `message` (text) - The message content
      - `created_at` (timestamptz) - Timestamp when the message was created
      - `read` (boolean) - Whether the message has been read (defaults to false)
  
  2. Security
    - Enable RLS on `messages` table
    - Add policy for anyone to insert messages (public contact form)
    - Add policy for authenticated users to view all messages (site owner)
    - Add policy for authenticated users to update read status
  
  3. Notes
    - The contact form is public, so anyone can submit a message
    - Only authenticated users (site owner) can view and manage messages
    - Messages are ordered by creation date (newest first)
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update read status"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
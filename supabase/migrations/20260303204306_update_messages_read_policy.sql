/*
  # Update messages read policy to allow anonymous access

  1. Changes
    - Drop the existing restrictive read policy
    - Create a new policy that allows both anonymous and authenticated users to view messages
  
  2. Security Notes
    - This allows anyone who accesses the Messages panel to view submitted messages
    - Consider adding authentication later for production use
    - Insert policy remains unchanged (anyone can submit messages)
    - Update policy remains unchanged (only authenticated users can update)
*/

DROP POLICY IF EXISTS "Authenticated users can view all messages" ON messages;

CREATE POLICY "Anyone can view messages"
  ON messages
  FOR SELECT
  TO anon, authenticated
  USING (true);
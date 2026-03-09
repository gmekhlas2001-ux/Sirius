/*
  # Add DELETE policy for messages table

  1. Changes
    - Add DELETE policy to allow authenticated users (admin) to delete messages
  
  2. Security
    - Only authenticated users can delete messages
    - This ensures only logged-in admins can remove messages from the system
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'messages' 
    AND policyname = 'Authenticated users can delete messages'
  ) THEN
    CREATE POLICY "Authenticated users can delete messages"
      ON messages FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;

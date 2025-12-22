-- Fix RLS policy for newsletter_subscriptions table
-- Run this in Supabase SQL Editor

-- First, check if RLS is enabled (it should be)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public inserts for newsletter" ON newsletter_subscriptions;

-- Create a policy that allows anonymous users to insert
CREATE POLICY "Allow public inserts for newsletter" 
ON newsletter_subscriptions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Optional: Also allow authenticated users to insert
DROP POLICY IF EXISTS "Allow authenticated inserts for newsletter" ON newsletter_subscriptions;

CREATE POLICY "Allow authenticated inserts for newsletter" 
ON newsletter_subscriptions
FOR INSERT 
TO authenticated
WITH CHECK (true);


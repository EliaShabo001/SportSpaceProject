# Supabase Setup for SportSpace

This document provides instructions on how to set up Supabase for the SportSpace application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Create a Supabase Project

1. Log in to your Supabase account
2. Create a new project
3. Note your project URL and anon key (public)

### 2. Set Up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql` from this repository
3. Paste the SQL into the editor and run it

### 3. Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Under Email Auth, make sure "Enable Email Signup" is turned on
3. Configure any additional auth providers as needed (Google, Facebook, etc.)

### 4. Set Up Storage (Optional)

If you want to allow users to upload profile pictures or field images:

1. Go to Storage in your Supabase dashboard
2. Create the following buckets:
   - `profile-images` (for user profile pictures)
   - `field-images` (for football field images)
3. Set the bucket privacy to "Public" for field images and "Private" for profile images

### 5. Update Environment Variables

Update the `.env` file in the project root with your Supabase credentials:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

The Supabase database includes the following tables:

1. **profiles** - User profile information
   - Linked to Supabase Auth users
   - Stores user type (customer, owner, admin)
   - Stores personal information (name, business name, etc.)

2. **fields** - Football field information
   - Stores field details (name, location, capacity, etc.)
   - Linked to owner's user ID

3. **bookings** - Field booking information
   - Links users to fields with booking details
   - Includes booking status and payment status

4. **reviews** - Field reviews
   - Links users to fields with review details
   - Includes rating and comments

5. **offers** - Special offers for fields
   - Stores discount information
   - Linked to specific fields

6. **subscriptions** - User subscription information
   - Stores subscription plan details
   - Includes payment and status information

## Row Level Security (RLS)

The database uses Row Level Security to ensure users can only access data they're authorized to see:

- Users can only view and edit their own profiles
- Anyone can view fields
- Only field owners can update their fields
- Users can only view and manage their own bookings
- Field owners can view bookings for their fields
- Anyone can view reviews
- Users can only create and edit their own reviews
- Anyone can view offers
- Only field owners can create and edit offers for their fields
- Users can only view and manage their own subscriptions

## API Reference

The Supabase JavaScript client is used to interact with the database. See the services in the `src/services` directory for examples of how to use the Supabase client to perform CRUD operations.

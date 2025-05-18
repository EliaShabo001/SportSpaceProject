-- Create profiles table to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'owner', 'admin')),
  first_name TEXT,
  last_name TEXT,
  business_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fields table to store football field information
CREATE TABLE IF NOT EXISTS fields (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  hourly_rate DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  amenities JSONB,
  availability_hours TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table to store field bookings
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  field_id BIGINT REFERENCES fields(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table to store field reviews
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  field_id BIGINT REFERENCES fields(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  booking_id BIGINT REFERENCES bookings(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offers table to store special offers
CREATE TABLE IF NOT EXISTS offers (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_percentage INTEGER CHECK (discount_percentage BETWEEN 1 AND 100),
  discount_amount DECIMAL(10, 2),
  field_id BIGINT REFERENCES fields(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table to store user subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'premium')),
  price DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Row Level Security (RLS) policies

-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow insert during signup
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Fields table policies
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;

-- Anyone can view fields
CREATE POLICY "Anyone can view fields" ON fields
  FOR SELECT USING (true);

-- Only field owners can update their fields
CREATE POLICY "Owners can update own fields" ON fields
  FOR UPDATE USING (auth.uid() = owner_id);

-- Only field owners can insert fields
CREATE POLICY "Owners can insert fields" ON fields
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Bookings table policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Field owners can view bookings for their fields
CREATE POLICY "Owners can view field bookings" ON bookings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT owner_id FROM fields WHERE id = field_id
    )
  );

-- Users can insert their own bookings
CREATE POLICY "Users can insert own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Reviews table policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Offers table policies
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Anyone can view offers
CREATE POLICY "Anyone can view offers" ON offers
  FOR SELECT USING (true);

-- Only field owners can insert offers for their fields
CREATE POLICY "Owners can insert offers" ON offers
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT owner_id FROM fields WHERE id = field_id
    )
  );

-- Only field owners can update offers for their fields
CREATE POLICY "Owners can update offers" ON offers
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT owner_id FROM fields WHERE id = field_id
    )
  );

-- Subscriptions table policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own subscriptions
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

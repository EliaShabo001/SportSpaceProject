import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key (public)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://jymuckkrzxuwbksqmade.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bXVja2tyenh1d2Jrc3FtYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjI0NzcsImV4cCI6MjAzMTUzODQ3N30.Yd-Yk-Wd_Yd-Yk-Wd_Yd-Yk-Wd';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

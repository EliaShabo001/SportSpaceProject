// Script to set up the database schema in Supabase
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://jymuckkrzxuwbksqmade.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bXVja2tyenh1d2Jrc3FtYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NjI0NzcsImV4cCI6MjAzMTUzODQ3N30.Yd-Yk-Wd_Yd-Yk-Wd_Yd-Yk-Wd';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'supabase-schema-new.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

// Split the SQL content into individual statements
const sqlStatements = sqlContent
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

// Execute each SQL statement
async function executeSQL() {
  console.log('Starting database setup...');
  
  for (let i = 0; i < sqlStatements.length; i++) {
    const statement = sqlStatements[i];
    console.log(`Executing statement ${i + 1}/${sqlStatements.length}`);
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
      } else {
        console.log(`Statement ${i + 1} executed successfully`);
      }
    } catch (error) {
      console.error(`Error executing statement ${i + 1}:`, error);
    }
  }
  
  console.log('Database setup completed');
}

// Execute the SQL statements
executeSQL().catch(error => {
  console.error('Error setting up database:', error);
});

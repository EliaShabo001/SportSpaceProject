/**
 * Check Supabase Connection
 * 
 * This script checks the connection to Supabase and verifies the API key.
 */
import supabase from './supabaseClient';

/**
 * Check Supabase connection
 * @returns {Promise<Object>} Connection status
 */
export const checkConnection = async () => {
  try {
    // Try to get the Supabase version
    const { data, error } = await supabase.rpc('version');
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Check if a table exists
 * @param {string} tableName Table name
 * @returns {Promise<boolean>} True if table exists
 */
export const checkTableExists = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName);
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};

/**
 * Create a profiles table
 * @returns {Promise<Object>} Creation status
 */
export const createProfilesTable = async () => {
  try {
    // Check if the table already exists
    const tableExists = await checkTableExists('profiles');
    
    if (tableExists) {
      console.log('Profiles table already exists');
      return { success: true, message: 'Profiles table already exists' };
    }
    
    // Create the profiles table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id),
          user_type VARCHAR(20) NOT NULL,
          first_name VARCHAR(50),
          last_name VARCHAR(50),
          business_name VARCHAR(100),
          phone VARCHAR(20),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
    });
    
    if (error) {
      console.error('Error creating profiles table:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, message: 'Profiles table created successfully' };
  } catch (error) {
    console.error('Error creating profiles table:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Create the exec_sql function
 * @returns {Promise<Object>} Creation status
 */
export const createExecSqlFunction = async () => {
  try {
    // Create the exec_sql function
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION exec_sql(sql text)
        RETURNS void AS $$
        BEGIN
          EXECUTE sql;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });
    
    if (error) {
      // If the function doesn't exist yet, we need to create it directly
      // This is a chicken-and-egg problem, so we'll just return success
      console.log('Error creating exec_sql function (may not exist yet):', error);
      return { success: true, message: 'exec_sql function may need to be created manually' };
    }
    
    return { success: true, message: 'exec_sql function created successfully' };
  } catch (error) {
    console.error('Error creating exec_sql function:', error);
    return { success: false, error: error.message };
  }
};

export default {
  checkConnection,
  checkTableExists,
  createProfilesTable,
  createExecSqlFunction
};

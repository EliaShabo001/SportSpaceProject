import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
  Container,
  TextField,
  Grid,
} from '@mui/material';
import { checkConnection, checkTableExists, createProfilesTable, createExecSqlFunction } from '../../services/checkSupabase';
import supabase from '../../services/supabaseClient';

const CheckSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Get the current Supabase URL and API key
    setUrl(process.env.REACT_APP_SUPABASE_URL || 'https://jymuckkrzxuwbksqmade.supabase.co');
    setApiKey(process.env.REACT_APP_SUPABASE_ANON_KEY || '');
  }, []);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, { id: Date.now(), message }]);
  };

  const handleCheckConnection = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setLogs([]);

    try {
      addLog('Checking Supabase connection...');

      // Check connection
      const connectionResult = await checkConnection();
      
      if (!connectionResult.success) {
        throw new Error(`Connection failed: ${connectionResult.error}`);
      }
      
      addLog('Connection successful!');
      
      // Check if the profiles table exists
      addLog('Checking if profiles table exists...');
      const profilesTableExists = await checkTableExists('profiles');
      
      if (profilesTableExists) {
        addLog('Profiles table exists');
      } else {
        addLog('Profiles table does not exist');
        
        // Try to create the profiles table
        addLog('Attempting to create profiles table...');
        const createProfilesResult = await createProfilesTable();
        
        if (createProfilesResult.success) {
          addLog(`Profiles table created: ${createProfilesResult.message}`);
        } else {
          addLog(`Failed to create profiles table: ${createProfilesResult.error}`);
        }
      }
      
      // Check if the Owner table exists
      addLog('Checking if Owner table exists...');
      const ownerTableExists = await checkTableExists('Owner');
      
      if (ownerTableExists) {
        addLog('Owner table exists');
      } else {
        addLog('Owner table does not exist. Please run the database setup.');
      }
      
      // Check if the Field table exists
      addLog('Checking if Field table exists...');
      const fieldTableExists = await checkTableExists('Field');
      
      if (fieldTableExists) {
        addLog('Field table exists');
      } else {
        addLog('Field table does not exist. Please run the database setup.');
      }
      
      // Try to create the exec_sql function
      addLog('Attempting to create exec_sql function...');
      const createExecSqlResult = await createExecSqlFunction();
      
      if (createExecSqlResult.success) {
        addLog(`exec_sql function: ${createExecSqlResult.message}`);
      } else {
        addLog(`Failed to create exec_sql function: ${createExecSqlResult.error}`);
      }
      
      addLog('Supabase check completed');
      setSuccess(true);
    } catch (error) {
      console.error('Error checking Supabase:', error);
      setError(error.message);
      addLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateApiKey = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);

    try {
      addLog('Updating Supabase API key...');
      
      // Update the API key in localStorage
      localStorage.setItem('supabase_api_key', apiKey);
      localStorage.setItem('supabase_url', url);
      
      addLog('API key updated. Please restart the application.');
      
      setSuccess(true);
    } catch (error) {
      console.error('Error updating API key:', error);
      setError(error.message);
      addLog(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Supabase Connection Check
        </Typography>
        <Typography variant="body1" paragraph>
          This page allows you to check the connection to Supabase and update the API key.
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Supabase Configuration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supabase URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supabase API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateApiKey}
                disabled={loading}
                sx={{ mr: 2 }}
              >
                Update API Key
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckConnection}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            {loading ? 'Checking...' : 'Check Connection'}
          </Button>
          {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Supabase connection check completed successfully!
          </Alert>
        )}

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Connection Logs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {logs.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No logs yet. Click the Check Connection button to start.
            </Typography>
          ) : (
            <List dense>
              {logs.map((log) => (
                <ListItem key={log.id}>
                  <ListItemText
                    primary={log.message}
                    secondary={new Date(log.id).toLocaleTimeString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CheckSupabase;

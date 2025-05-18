import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    const logoutTimer = setTimeout(() => {
      // In a real app, you would clear auth tokens, cookies, etc.
      console.log('User logged out');
      
      // Redirect to home page after logout
      navigate('/');
    }, 2000);

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <CircularProgress color="primary" sx={{ mb: 3 }} />
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Logging Out...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thank you for using SportSpace. You are being securely logged out of your account.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Logout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import ScrollToTop from '../components/ScrollToTop';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <ScrollToTop />
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Logo size="large" />
          </Box>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Outlet />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthLayout;

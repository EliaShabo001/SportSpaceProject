import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import ScrollToTop from '../components/ScrollToTop';

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <ScrollToTop />
      <AdminSidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <AdminHeader onMenuClick={toggleSidebar} />
        <Box sx={{ flexGrow: 1, p: 3, pt: 10 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;

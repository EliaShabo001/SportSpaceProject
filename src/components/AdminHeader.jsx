import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Tooltip,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { useLocation } from 'react-router-dom';

const AdminHeader = ({ onMenuClick }) => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  // Get page title from location
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/dashboard/fields') return 'Manage Fields';
    if (path === '/dashboard/bookings') return 'Manage Bookings';
    if (path === '/dashboard/services') return 'Manage Services';
    if (path === '/dashboard/offers') return 'Manage Offers';
    if (path === '/dashboard/reviews') return 'Customer Reviews';
    return 'Dashboard';
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>

        {/* Notifications */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleOpenNotificationsMenu}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-notifications"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
          >
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography variant="body2">New booking request from John Doe</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography variant="body2">New review for Downtown Field</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography variant="body2">Payment confirmed for Booking #1234</Typography>
            </MenuItem>
          </Menu>

          {/* Help */}
          <Tooltip title="Help">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <HelpIcon />
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Account Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

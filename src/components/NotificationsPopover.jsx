import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Badge,
  Button,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking for Downtown Stadium on May 15 has been confirmed.',
    time: new Date(2023, 4, 14, 10, 30),
    read: false,
    icon: <EventAvailableIcon />,
    color: '#4caf50',
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your payment of $100 for Downtown Stadium booking has been processed.',
    time: new Date(2023, 4, 14, 10, 35),
    read: false,
    icon: <PaymentIcon />,
    color: '#2196f3',
  },
  {
    id: 3,
    type: 'booking',
    title: 'Booking Reminder',
    message: 'Reminder: You have a booking at Riverside Field tomorrow at 6:00 PM.',
    time: new Date(2023, 4, 13, 15, 0),
    read: true,
    icon: <EventAvailableIcon />,
    color: '#4caf50',
  },
  {
    id: 4,
    type: 'system',
    title: 'New Field Available',
    message: 'Elite Sports Complex is now available for booking in your area.',
    time: new Date(2023, 4, 12, 9, 15),
    read: true,
    icon: <NotificationsIcon />,
    color: '#ff9800',
  },
  {
    id: 5,
    type: 'payment',
    title: 'Special Offer',
    message: 'Get 20% off on your next booking with code SPORT20.',
    time: new Date(2023, 4, 11, 11, 45),
    read: true,
    icon: <PaymentIcon />,
    color: '#2196f3',
  },
];

const NotificationsPopover = ({ anchorEl, open, onClose }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleRemoveNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = activeTab === 0
    ? notifications
    : activeTab === 1
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.read);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 360,
          maxHeight: 500,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: 'secondary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge badgeContent={unreadCount} color="primary" sx={{ mr: 1 }}>
            <NotificationsIcon />
          </Badge>
          <Typography variant="subtitle1" fontWeight={600}>
            Notifications
          </Typography>
        </Box>
        <IconButton color="inherit" size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          '& .MuiTab-root': {
            minHeight: 48,
            fontWeight: 600,
            fontSize: '0.875rem',
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        <Tab label="All" />
        <Tab 
          label="Unread" 
          icon={unreadCount > 0 ? <Badge badgeContent={unreadCount} color="primary" /> : null}
          iconPosition="end"
        />
        <Tab label="Read" />
      </Tabs>

      <Box sx={{ 
        overflowY: 'auto', 
        maxHeight: 350,
        bgcolor: 'background.default',
      }}>
        {filteredNotifications.length > 0 ? (
          <List disablePadding>
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      py: 1.5,
                      px: 2,
                      bgcolor: notification.read ? 'transparent' : 'rgba(255, 106, 0, 0.05)',
                      '&:hover': {
                        bgcolor: 'background.paper',
                      },
                      position: 'relative',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: notification.color }}>
                        {notification.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight={notification.read ? 400 : 600}>
                          {notification.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ 
                              display: 'block',
                              mb: 0.5,
                              fontWeight: notification.read ? 400 : 500,
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {format(notification.time, 'MMM d, h:mm a')}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ 
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 0.5,
                    }}>
                      {!notification.read && (
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleMarkAsRead(notification.id)}
                          sx={{ p: 0.5 }}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton 
                        size="small" 
                        color="default"
                        onClick={() => handleRemoveNotification(notification.id)}
                        sx={{ p: 0.5 }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < filteredNotifications.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        ) : (
          <Box sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="subtitle1" color="text.secondary" align="center">
              {activeTab === 0 
                ? "You don't have any notifications yet" 
                : activeTab === 1 
                  ? "You don't have any unread notifications" 
                  : "You don't have any read notifications"}
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
      }}>
        <Button 
          size="small" 
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some(n => !n.read)}
        >
          Mark all as read
        </Button>
        <Button 
          size="small" 
          color="primary"
          onClick={onClose}
        >
          View all
        </Button>
      </Box>
    </Popover>
  );
};

export default NotificationsPopover;

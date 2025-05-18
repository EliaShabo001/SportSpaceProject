import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Profile = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    bio: 'Football enthusiast and team captain with over 10 years of experience organizing matches and tournaments.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  });
  
  // Mock booking history
  const bookingHistory = [
    {
      id: 'B1234',
      fieldName: 'Downtown Stadium',
      date: '2023-05-15',
      time: '18:00 - 20:00',
      status: 'Completed',
      amount: '$100',
    },
    {
      id: 'B1235',
      fieldName: 'Riverside Field',
      date: '2023-05-22',
      time: '16:00 - 18:00',
      status: 'Completed',
      amount: '$90',
    },
    {
      id: 'B1236',
      fieldName: 'Green Valley Pitch',
      date: '2023-05-29',
      time: '19:00 - 21:00',
      status: 'Upcoming',
      amount: '$110',
    },
  ];
  
  // Form state for edit mode
  const [formData, setFormData] = useState({...userData});
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleEditToggle = () => {
    if (editMode) {
      // Cancel edit mode
      setFormData({...userData});
    }
    setEditMode(!editMode);
  };
  
  const handleSaveProfile = () => {
    setUserData({...formData});
    setEditMode(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'flex-start' },
                  gap: 4,
                }}
              >
                <Avatar
                  src={userData.avatar}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  sx={{ width: 120, height: 120, border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                />
                
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                      {userData.firstName} {userData.lastName}
                    </Typography>
                    
                    {!editMode ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleEditToggle}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={handleEditToggle}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                        >
                          Save
                        </Button>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {userData.bio}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon color="primary" />
                        <Typography variant="body2">{userData.email}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon color="primary" />
                        <Typography variant="body2">{userData.phone}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon color="primary" />
                        <Typography variant="body2">{userData.address}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Profile Tabs */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    py: 2,
                    fontWeight: 600,
                  },
                  '& .Mui-selected': {
                    color: 'primary.main',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <Tab icon={<PersonIcon />} label="Personal Info" iconPosition="start" />
                <Tab icon={<HistoryIcon />} label="Booking History" iconPosition="start" />
                <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
                <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
              </Tabs>
              
              <Box sx={{ p: 4 }}>
                {/* Personal Info Tab */}
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Personal Information
                    </Typography>
                    
                    {editMode ? (
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            multiline
                            rows={4}
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              First Name
                            </Typography>
                            <Typography variant="body1">{userData.firstName}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Last Name
                            </Typography>
                            <Typography variant="body1">{userData.lastName}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Email
                            </Typography>
                            <Typography variant="body1">{userData.email}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Phone
                            </Typography>
                            <Typography variant="body1">{userData.phone}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Address
                            </Typography>
                            <Typography variant="body1">{userData.address}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Bio
                            </Typography>
                            <Typography variant="body1">{userData.bio}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                )}
                
                {/* Booking History Tab */}
                {tabValue === 1 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Booking History
                    </Typography>
                    
                    <List sx={{ width: '100%' }}>
                      {bookingHistory.map((booking, index) => (
                        <React.Fragment key={booking.id}>
                          <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                              <Chip
                                label={booking.status}
                                color={booking.status === 'Completed' ? 'success' : 'primary'}
                                size="small"
                              />
                            }
                            sx={{
                              py: 2,
                              px: 3,
                              borderRadius: 2,
                              mb: 2,
                              bgcolor: 'background.paper',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                {booking.id.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {booking.fieldName}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Typography component="span" variant="body2" color="text.primary">
                                    Booking ID: {booking.id}
                                  </Typography>
                                  <br />
                                  <Typography component="span" variant="body2">
                                    {booking.date} • {booking.time}
                                  </Typography>
                                  <br />
                                  <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    {booking.amount}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          {index < bookingHistory.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}
                
                {/* Security Tab */}
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Security Settings
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Change Password
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            name="newPassword"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" color="primary">
                            Update Password
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Divider sx={{ my: 4 }} />
                    
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Two-Factor Authentication
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </Typography>
                      <Button variant="outlined" color="primary">
                        Enable 2FA
                      </Button>
                    </Box>
                  </Box>
                )}
                
                {/* Notifications Tab */}
                {tabValue === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Notification Preferences
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Email Notifications"
                          secondary="Receive booking confirmations, reminders, and updates via email"
                        />
                        <Chip label="Enabled" color="success" />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText
                          primary="SMS Notifications"
                          secondary="Receive booking confirmations and reminders via SMS"
                        />
                        <Chip label="Disabled" color="default" />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText
                          primary="Push Notifications"
                          secondary="Receive real-time updates and alerts on your device"
                        />
                        <Chip label="Enabled" color="success" />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText
                          primary="Marketing Communications"
                          secondary="Receive offers, promotions, and newsletters"
                        />
                        <Chip label="Disabled" color="default" />
                      </ListItem>
                    </List>
                    
                    <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                      Update Preferences
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;

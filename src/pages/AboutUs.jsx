import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutUs = () => {
  const theme = useTheme();

  // Team members data
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Former professional football player with a passion for making sports accessible to everyone.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sarah Williams',
      role: 'CTO',
      bio: 'Tech enthusiast with over 10 years of experience in building scalable platforms.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      bio: 'Operations expert who ensures smooth field bookings and customer satisfaction.',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      bio: 'Creative marketer who loves connecting sports enthusiasts with the perfect venues.',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
  ];

  // Company values
  const values = [
    {
      title: 'Passion for Sports',
      description: 'We are sports enthusiasts who understand the importance of quality playing fields.',
      icon: <SportsSoccerIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Community Building',
      description: 'We believe in bringing people together through sports and creating lasting connections.',
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our platform to customer service.',
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Global Vision',
      description: 'We aim to make field booking accessible worldwide, breaking down geographical barriers.',
      icon: <PublicIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Box sx={{ pt: 12, pb: 10 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'secondary.main', 
          color: 'white', 
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: -100,
            bottom: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 106, 0, 0.1)',
            zIndex: 0,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: -50,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 106, 0, 0.1)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textAlign: 'center',
                }}
              >
                About <span style={{ color: theme.palette.primary.main }}>SportSpace</span>
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  maxWidth: 800, 
                  mx: 'auto', 
                  textAlign: 'center',
                  opacity: 0.9,
                }}
              >
                We're on a mission to make booking football fields as easy as possible, 
                connecting players with the perfect venues for their games.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h2" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                SportSpace was founded in 2020 by a group of football enthusiasts who were frustrated with the 
                complicated process of finding and booking fields for their weekly games.
              </Typography>
              <Typography variant="body1" paragraph>
                What started as a simple solution for a local community has grown into a comprehensive platform 
                serving thousands of players and field owners across multiple cities.
              </Typography>
              <Typography variant="body1" paragraph>
                Today, we're proud to be the leading football field booking platform, with a mission to make 
                sports more accessible to everyone, everywhere.
              </Typography>
              <List>
                {['Founded in 2020', 'Serving 50+ cities', '25,000+ active users', '1,200+ fields available'].map((item, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                component="img"
                src="https://source.unsplash.com/random/600x400/?football,team"
                alt="Our team"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 2, 
                textAlign: 'center' 
              }}
            >
              Our Values
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                textAlign: 'center',
                color: 'text.secondary',
                mb: 6,
              }}
            >
              The principles that guide everything we do at SportSpace
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{value.icon}</Box>
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              textAlign: 'center' 
            }}
          >
            Meet Our Team
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              textAlign: 'center',
              color: 'text.secondary',
              mb: 6,
            }}
          >
            The passionate people behind SportSpace
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 3,
                      border: '4px solid white',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main" sx={{ mb: 2, fontWeight: 500 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: -50,
            bottom: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: -50,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Ready to Join the SportSpace Community?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
                Start booking football fields today and experience the easiest way to organize your games.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Sign Up Now
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;

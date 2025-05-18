import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  Tooltip,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Field Booking', path: '/fields' },
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Training', path: '/training' },
        { name: 'Equipment Rental', path: '/equipment' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Logo color="white" />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              SportSpace is the premier platform for booking football fields. 
              Find and reserve the perfect pitch for your game, tournament, or training session.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Facebook">
                <IconButton
                  aria-label="facebook"
                  sx={{
                    color: 'white',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton
                  aria-label="twitter"
                  sx={{
                    color: 'white',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton
                  aria-label="instagram"
                  sx={{
                    color: 'white',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  aria-label="linkedin"
                  sx={{
                    color: 'white',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.8,
                      transition: 'opacity 0.3s ease, color 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = 1;
                      e.target.style.color = theme.palette.primary.main;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = 0.8;
                      e.target.style.color = 'white';
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  123 Stadium Street, Sports City, SC 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +1 (123) 456-7890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: theme.palette.primary.main }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@sportspace.com
                </Typography>
              </Box>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                startIcon={<EmailIcon />}
                sx={{
                  mt: 1,
                  color: 'white',
                  borderColor: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: { xs: 'center', sm: 'left' } }}>
            © {new Date().getFullYear()} SportSpace. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/terms"
              style={{
                color: 'white',
                opacity: 0.6,
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              style={{
                color: 'white',
                opacity: 0.6,
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              style={{
                color: 'white',
                opacity: 0.6,
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

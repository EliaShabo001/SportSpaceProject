import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 10,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '4rem', md: '6rem' },
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                404
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                }}
              >
                Oops! The page you are looking for doesn't exist or has been moved.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Back to Home
                </Button>
                <Button
                  component={Link}
                  to="/fields"
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Browse Fields
                </Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <SentimentVeryDissatisfiedIcon
                sx={{
                  fontSize: { xs: 150, md: 250 },
                  color: 'secondary.main',
                  opacity: 0.7,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;

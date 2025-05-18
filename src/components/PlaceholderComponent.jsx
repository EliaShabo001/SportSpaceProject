import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';

const PlaceholderComponent = ({ title, description, linkTo, linkText }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {title || 'Under Construction'}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {description || 'This page is currently under development. Please check back later.'}
        </Typography>
        {linkTo && linkText && (
          <Button
            component={Link}
            to={linkTo}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {linkText}
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default PlaceholderComponent;

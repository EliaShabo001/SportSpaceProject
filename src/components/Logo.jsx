import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const Logo = ({ size = 'medium', color = 'primary', withText = true }) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 40;
      case 'medium':
      default:
        return 32;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '1.2rem';
      case 'large':
        return '2rem';
      case 'medium':
      default:
        return '1.5rem';
    }
  };

  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <SportsSoccerIcon
          sx={{
            fontSize: getIconSize(),
            color: color === 'primary' ? 'primary.main' : 'white',
          }}
        />
        {withText && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: getFontSize(),
              color: color === 'primary' ? 'primary.main' : 'white',
              letterSpacing: '-0.5px',
            }}
          >
            SportSpace
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default Logo;

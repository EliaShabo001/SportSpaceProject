import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6A00', // Orange
      light: '#FF8A3D',
      dark: '#CC5500',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#121212', // Black
      light: '#2C2C2C',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
      dark: '#121212',
    },
    text: {
      primary: '#121212',
      secondary: '#757575',
      disabled: '#9E9E9E',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#FF8A3D',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#2C2C2C',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;

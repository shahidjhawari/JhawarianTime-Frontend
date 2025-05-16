import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Blue
    },
    secondary: {
      main: '#FFD600', // Yellow
    },
    background: {
      default: 'rgba(255, 255, 255, 0.9)', // Transparent white
      paper: 'rgba(255, 255, 255, 0.8)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
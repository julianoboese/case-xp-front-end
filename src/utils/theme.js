import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc000',
    },
    secondary: {
      main: '#ffc000',
    },
    neutral: {
      main: '#595959',
    },
  },
  typography: {
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '0.8rem',
    },
  },
});

export default theme;

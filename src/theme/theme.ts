import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const createAppTheme = (mode: 'light' | 'dark') => {
  let theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
      error: {
        main: red.A400,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return theme;
};
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#505050',
      light: '#646464',
      dark: '#404040',
    },
    secondary: {
      main: '#FFF1E6',
      light: '#fee2cc',
      dark: '#ffa966',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FD1010',
      light: '#F87168',
      dark: '#E2483D',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '2.75rem',
      fontFamily: poppins.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '23px',
      fontFamily: poppins.style.fontFamily,
    },
    h3: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '23px',
      fontFamily: poppins.style.fontFamily,
    },
    h4: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '23px',
      fontFamily: poppins.style.fontFamily,
    },
    h5: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '23px',
      fontFamily: poppins.style.fontFamily,
    },
    h6: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '23px',
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334rem',
    },
    body2: {
      fontSize: '0.75rem',
      letterSpacing: '0rem',
      fontWeight: 400,
      lineHeight: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            padding: '11px 14px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          input: {
            padding: '11px 14px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 20px',
          borderRadius: '8px',
          boxShadow: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#70E798',
          color: '#505050',
          '&:hover': {
            backgroundColor: '#00d768',
            color: '#505050',
            boxShadow: 'none',
          },
        },
        containedInherit: {
          backgroundColor: '#E7E7E7',
          color: '#505050',
          '&:hover': {
            backgroundColor: '#b8b8b8',
            color: '#505050',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '8px 20px',
          borderRadius: '8px',
          '.MuiChip-label': {
            paddingLeft: 0,
            fontSize: '14px',
          },
        },
      },
    },
  },
});

export { baselightTheme };

import { createTheme } from '@material-ui/core/styles';

export const appTheme = createTheme({
  typography: {
    fontFamily: [
      'IRANSansWeb',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#7955C5',
            contrastText: '#e4e4fa',
        },
        secondary: {
            main: '#54C6EB',
           contrastText: '#30323D'
        },
        text: {
            white: '#fff',
            black: '#2B363E',
        }
    }
});

export default theme;

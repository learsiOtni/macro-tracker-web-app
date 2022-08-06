import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
    },
    palette: {
        primary: {
            main: '#7955C5',
            contrastText: '#fff',
        },
        secondary: {
            main: '#54C6EB',
           contrastText: '#30323D'
        },
        text: {
            primary: '#2B363E',
            white: '#fff',
        }
    }
});

export default theme;

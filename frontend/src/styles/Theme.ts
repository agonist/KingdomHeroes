import {createTheme} from '@mui/material/styles';

const FONT_PRIMARY = "VT323, monospace"; // Google Font

export const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                sx: {borderRadius: 0, borderColor: 'white', borderWidth: 2}
            }
        }
    },
    palette: {
        primary: {
            main: "#6A5495"
        },
        error: {
            main: "#FF5959"
        }
    },
    typography: {
        h1: {
            fontSize: 42,
            fontFamily: FONT_PRIMARY
        },
        h2: {
            fontSize: 28,
            fontFamily: FONT_PRIMARY,
        },
        h3: {
            fontSize: 22,
            fontFamily: FONT_PRIMARY
        },
        body1: {
            fontSize: 22,
            fontFamily: FONT_PRIMARY
        },
        caption: {
            fontSize: 18,
            fontFamily: FONT_PRIMARY
        },
        button: {
            fontSize: 20,
            fontFamily: FONT_PRIMARY
        }
    }
});


export const Custom = {
    grey: '#828282'
}
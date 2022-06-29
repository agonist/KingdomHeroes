import {createTheme} from '@mui/material/styles';

const FONT_PRIMARY = "VT323, monospace"; // Google Font
const FONT_SECONDAY = "Roboto, sans-serif"
const FUGAL = "Fugaz One, cursive"

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
            fontSize: 38,
            fontFamily: FONT_PRIMARY,
        },
        h3: {
            fontSize: 34,
            fontFamily: FONT_PRIMARY
        },
        h4: {
            fontSize: 25,
            fontFamily: FUGAL
        },
        h5: {
            fontSize: 23,
            fontFamily: FUGAL
        },
        body1: {
            fontSize: 18,
            fontFamily: FONT_SECONDAY
        },
        body2: {
            fontSize: 16,
            fontFamily: FONT_SECONDAY
        },
        caption: {
            fontSize: 14,
            fontFamily: FONT_SECONDAY
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

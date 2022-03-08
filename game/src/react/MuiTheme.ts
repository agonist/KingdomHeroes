import {createTheme} from '@mui/material/styles'

const FONT_PRIMARY = "VT323, monospace"; // Google Font

const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#426dea',
        },
        secondary: {
            main: '#42eacb',
        },
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
            fontSize: 28,
            fontFamily: FONT_PRIMARY
        },
        body1: {
            fontSize: 22,
            fontFamily: FONT_PRIMARY
        },
        body2: {
            fontSize: 18,
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
})

export default muiTheme

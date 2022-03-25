import {createTheme} from '@mui/material/styles'

const FONT_SECONDARY = "VT323, monospace"; // Google Font
const FONT_PRIMARY = "Roboto, sans-serif"; // Google Font

const muiTheme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                sx: {borderRadius: 0, borderColor: 'white', borderWidth: 2}
            }
        }
    },

    palette: {
        mode: "dark",
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
            fontWeight: 700,
            fontFamily: FONT_PRIMARY
        },
        h2: {
            fontSize: 38,
            fontFamily: FONT_PRIMARY,
        },
        h3: {
            fontSize: 34,
            fontWeight: 500,
            fontFamily: FONT_PRIMARY
        },
        h4: {
            fontSize: 28,
            fontWeight: 500,
            fontFamily: FONT_PRIMARY
        },
        h5: {
            fontSize: 22,
            fontWeight: 500,
            fontFamily: FONT_PRIMARY
        },
        body1: {
            fontSize: 18,
            fontWeight: 500,
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
            fontWeight: 700,
            fontFamily: FONT_PRIMARY
        }
    }
})

export const CustomColor = {
    darkBg: "#0c0f27",
    midBg: "#1C2262",
    fontYellow: "#FBE24D"
}

export default muiTheme

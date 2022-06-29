import {makeStyles} from "@mui/styles";
import {CustomColor} from "../MuiTheme";

export const GuiStyles = makeStyles((theme) => ({

    content: () => ({
        border: "solid",
        borderWidth: "2px",
        borderColor: "white",
    }),

    frame: () => ({
        border: "solid",
        borderWidth: "1px",
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to bottom, #579AF7, #092274)',
        padding: 2,
        paddingX: 3
    }),

    button: () => ({
        border: "solid",
        backgroundColor: "#276690",
        borderWidth: "4px",
        boxShadow: "inset 0 1px 10px black, inset 0 -2px 10px black",
        borderRadius: 0,
        borderColor: "#579AF7"
    })

}));

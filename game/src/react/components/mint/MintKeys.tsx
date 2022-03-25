import {Stack} from "@mui/material";
import MintKeysRoot from "./MintKeysRoot";
import {GuiStyles} from "../Styles";

export default function MintKeys() {
    const classes = GuiStyles();

    return (
        <Stack className={classes.frame} >
            <MintKeysRoot/>
        </Stack>
    )
}

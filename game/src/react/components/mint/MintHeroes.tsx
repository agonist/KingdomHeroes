import {Stack} from "@mui/material";
import MintHeroesRoot from "./MintHeroesRoot";
import {GuiStyles} from "../Styles";

export default function MintHeroes() {
    const classes = GuiStyles();

    return (
        <Stack className={classes.frame}>
            <MintHeroesRoot/>
        </Stack>
    )
}

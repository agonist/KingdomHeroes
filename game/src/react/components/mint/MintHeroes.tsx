import {Stack} from "@mui/material";
import MintHeroesRoot from "./MintHeroesRoot";
import dialogBorderBox from "../dialog/dialogbox.png";

export default function MintHeroes() {

    return (
        <Stack sx={{
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>
            <MintHeroesRoot/>
        </Stack>
    )
}

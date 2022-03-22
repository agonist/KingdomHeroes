import {Stack} from "@mui/material";
import MintHeroesRoot from "./MintHeroesRoot";
import bgui from "../bgui.png";

export default function MintHeroes() {

    return (
        <Stack sx={{
            backgroundColor: "#273047",
            border: "solid",
            borderImage: `url("${bgui}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>
            <MintHeroesRoot/>
        </Stack>
    )
}

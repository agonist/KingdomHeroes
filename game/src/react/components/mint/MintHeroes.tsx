import {Stack} from "@mui/material";
import MintRoot from "./MintRoot";
import dialogBorderBox from "../dialog/dialogbox.png";

export default function MintHeroes() {

    return (
        <Stack sx={{
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 15
        }}>
            <MintRoot/>
        </Stack>
    )
}

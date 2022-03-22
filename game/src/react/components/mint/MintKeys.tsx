import {Stack} from "@mui/material";
import MintKeysRoot from "./MintKeysRoot";
import bgui from "../bgui.png";

export default function MintKeys() {

    return (
        <Stack sx={{
            backgroundColor: "#273047",
            border: "solid",
            borderImage: `url("${bgui}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>
            <MintKeysRoot/>
        </Stack>
    )
}

import {Stack} from "@mui/material";
import dialogBorderBox from "../dialog/dialogbox.png";
import MintKeysRoot from "./MintKeysRoot";

export default function MintKeys() {

    return (
        <Stack sx={{
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>
            <MintKeysRoot/>
        </Stack>
    )
}

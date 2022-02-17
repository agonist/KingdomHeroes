import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import MintRoot from "../mint/MintRoot";

function HeadSection() {

    return (
        <Stack sx={{backgroundColor: 'aliceblue'}} height={550} justifyContent="center"
               alignItems="center" id="Home">
            {/*<Typography>Head section</Typography>*/}

            <MintRoot/>
        </Stack>
    )

}

export default HeadSection

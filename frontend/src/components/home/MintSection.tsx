import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import MintRoot from "../mint/MintRoot";

function MintSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2}
               alignItems="center" id="Concept">
            <Stack maxWidth={700} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Mint</Typography>


                <MintRoot/>

            </Stack>


        </Stack>
    )

}

export default MintSection

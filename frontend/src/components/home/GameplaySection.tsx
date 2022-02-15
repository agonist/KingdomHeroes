import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function GameplaySection() {

    return (
        <Stack sx={{backgroundColor: 'beige'}} height={550}
               alignItems="center" id="Gameplay">
            <Typography variant={"h1"}>Gameplay section</Typography>
        </Stack>
    )

}

export default GameplaySection

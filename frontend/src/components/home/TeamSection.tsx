import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function TeamSection() {

    return (
        <Stack sx={{backgroundColor: 'lawngreen'}} height={550}
               alignItems="center" id="Team">
            <Typography variant={"h1"}>Team section</Typography>
        </Stack>
    )

}

export default TeamSection

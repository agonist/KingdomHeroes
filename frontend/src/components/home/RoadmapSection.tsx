import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function RoadmapSection() {

    return (
        <Stack sx={{backgroundColor: 'indianred'}} height={550}
               alignItems="center" id="Roadmap">
            <Typography variant={"h1"}>Roadmap section</Typography>
        </Stack>
    )

}

export default RoadmapSection

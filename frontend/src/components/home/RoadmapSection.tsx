import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function RoadmapSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6}
               alignItems="center" id="Concept">
            <Stack maxWidth={700} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Roadmap</Typography>

                <Typography >

                    <b>V1:</b> Users will be able to begin staking their Heroes to earn $CGLD as well as begin training their
                    team against the monsters surrounding Creeth. Users will be able to begin using $CGLD to
                    improve/heal their team after battles.
                    <br/><br/>
                    <b>V2:</b> Items will begin to be introduced, allowing users to spend their hard earned $CGLD to improve
                    their team&apos;s abilities
                    <br/><br/>
                    <b>V3:</b> Project Hosted Tournaments will begin and be regularly hosted for community members to battle
                    each other for glory and Eth prizes!


                </Typography>

            </Stack>


        </Stack>
    )

}

export default RoadmapSection

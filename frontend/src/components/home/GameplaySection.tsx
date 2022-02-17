import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function GameplaySection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6}
               alignItems="center" id="Concept">
            <Stack maxWidth={700} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Gameplay</Typography>

                <Typography textAlign={"center"}>

                    Community members will train their staked NFTs- Knights, Wizards, and Elves- against the monsters
                    that lurk outside the walls of Creeth. Battling against Goblins, Dragons, and Beasts, winning teams
                    will gain Experience Points (XP) that improves their skills, and at times, find additional $CGLD
                    that can be used to further improve their in-game experience. After building the skills of your
                    team, test your strategy and their strength against other community members in hosted tournaments to
                    claim all of the glory and prizes!

                </Typography>

            </Stack>


        </Stack>
    )

}

export default GameplaySection

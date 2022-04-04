import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function ConceptSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2}
               alignItems="center" id="Concept">
            <Stack maxWidth={800} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Concept</Typography>

                <Typography>

                    Kingdom Heroes is an NFT based game located in The Royal Kingdom of Creeth, specifically beginning
                    in the Town of Castreia, the capital of Creeth.
                    <br/><br/>Kingdom Heroes brings back all the feels and nostalgia of your RPG/strategy based games
                    and puts them into a collectible NFT. <br/><br/>
                    Community members will train their NFTs- Knights, Wizards, and Elves- against the monsters that lurk
                    outside the walls of Castreia.
                    Battling against Orcs, Dragons, and Beasts, winning teams will gain Experience Points (XP) that
                    improves their skills, and at times,
                    find Creeth Gold ($CGLD) that can be used to further improve their in-game experience.

                    <br/><br/>After
                    building the skills of your team,
                    test your strategy and their strength against other community members in hosted tournaments to claim
                    all of the glory and prizes!

                </Typography>

            </Stack>


        </Stack>
    )

}

export default ConceptSection

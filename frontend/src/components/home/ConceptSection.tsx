import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function ConceptSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2}
               alignItems="center" id="Concept">
            <Stack maxWidth={700} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Concept</Typography>

                <Typography>

                    Kingdom Heroes is an NFT based game located in The Royal Kingdom of Creeth where knights, wizards,
                    and elves battle monsters to train and gain experience to battle other users, earning Creeth Gold
                    ($CGLD) and additional prizes. $CGLD is a utility token used to improve the attributes of knights,
                    wizards, and elves by trading $CGLD for items such as hats, armor, shoes, accessories, and food.

                </Typography>

                <Typography>

                    Kingdom Heroes brings back all the feels and nostalgia of your RPG/strategy based games and puts
                    them into a collectible NFT. The game focuses on the strategy of training and battling your team
                    against wild monsters which will allow you as trainers to improve your team&apos;s skills before
                    taking
                    to the Creeth Tiltyard where Project Tournaments are hosted for Eth prizes!

                </Typography>

            </Stack>


        </Stack>
    )

}

export default ConceptSection

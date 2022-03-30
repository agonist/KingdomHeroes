import {Stack, Typography} from "@mui/material";

function GameplaySection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2}
               alignItems="center" id="Gameplay">
            <Stack maxWidth={800} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Gameplay</Typography>

                <Typography variant={"body1"}>

                    Kingdom Heroes is an NFT based game located in The Royal Kingdom of Creeth.
                    Kingdom Heroes brings back all the feels and nostalgia of your RPG/strategy
                    based games and puts them into a collectible NFT. Community members will train
                    their NFTs- Knights, Wizards, and Elves- against the monsters that lurk outside
                    the walls of Creeth. Battling against Orcs, Dragons, and Beasts, winning teams will
                    gain Experience Points (XP) that improves their skills, and at times, find additional
                    Creeth Gold ($CGLD) that can be used to further improve their in-game experience. After
                    building the skills of your team, test your strategy and their strength against other community
                    members in hosted tournaments to claim all of the glory and prizes!
                    New challenges await and will come as you achieve greater success within the game, so be ready
                    as your mission will not be soon over.


                </Typography>

            </Stack>


        </Stack>
    )

}

export default GameplaySection

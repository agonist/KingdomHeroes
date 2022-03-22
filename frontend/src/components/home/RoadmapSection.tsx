import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import Image from "next/image";
import PIC from "../../../public/map.webp";

function RoadmapSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2} width={"100%"}
               alignItems="center" id="Concept">
            <Stack width={"100%"} alignItems="center" spacing={3}>
                <Typography variant={"h1"} paddingBottom={2}>Roadmap</Typography>

                <Image src={PIC} width={700} height={550}/>

                <Stack width={"100%"} alignItems="center">
                    <Stack maxWidth={700}>

                        <Typography paddingTop={2} variant={"h2"}>Phase 1: In-Game Minting + Training</Typography>

                        <Typography paddingTop={2} variant={"h4"}>Kingdom Keys</Typography>

                        <Typography>

                            • 500 genesis Passes. limit 1 per wallet <br/>
                            • Owning a Kingdom Key will: <br/>
                            &emsp;• Allow the holder of the Key to mint 2 Kingdom Heroes for free + gas<br/>
                            &emsp;• Increase $CGLD staking rewards<br/>

                        </Typography>

                        <Typography paddingTop={2} variant={"h4"}>Kingdom Heroes Mint</Typography>

                        <Typography>

                            • Collection of 10,000 unique Heroes containing 1 special and rare 1/1 <br/>
                            • Minting will broken into 2 phases: Kingdom Key Holders/Whitelist + Public <br/>

                        </Typography>

                        <Typography paddingTop={2} variant={"h4"}>Train Your Heroes</Typography>
                        <Typography>

                            • Immediately take your Heroes outside the gates of the Kingdom to battle and train to gain
                            strength and experience to one
                            day battle against your fellow Creethens and claim the spoils of project hosted tournaments

                        </Typography>
                    </Stack>

                    <Stack maxWidth={700}>

                        <Typography paddingTop={2} variant={"h2"}>Phase 2: Utility Expansion</Typography>

                        <Typography paddingTop={2} variant={"h4"}>The Kingdom Shop</Typography>

                        <Typography>

                            • Consumables and new items, acquired in-game with $CGLD or on secondary markets, will
                            enable
                            your Heroes to become stronger and battle for longer periods of time before needing rest

                        </Typography>

                        <Typography paddingTop={2} variant={"h4"}>The Traveling Market</Typography>

                        <Typography>

                            • As a holder of at least one Hero and one NFT from our partner communities, you will be
                            able to
                            purchase community specific items that only fellow partner community holders may obtain,
                            providing a very unique utility to these holders

                        </Typography>

                    </Stack>

                    <Stack maxWidth={700}>

                        <Typography paddingTop={2} variant={"h2"}>Phase 3: The Creeth Tilt Yard</Typography>

                        <Typography paddingTop={2} variant={"h4"}>Project Hosted Tournaments</Typography>

                        <Typography>

                            • Take your best Heroes to the Tilt yard and battle against other Creethens with the winner
                            taking home the spoils of Eth

                        </Typography>

                    </Stack>

                    <Stack maxWidth={700}>

                        <Typography paddingTop={2} variant={"h2"}>Phase 4: The Kingdom Expands</Typography>

                        <Typography paddingTop={2} variant={"h4"}>Expanded Gameplay</Typography>

                        <Typography>

                            • As the community within the Kingdom of Creeth grows, so must the Kingdom to house all of
                            the Creethens.
                            Your journey and gameplay expands as you venture outside of Creeth towards other neighboring
                            kingdoms to face new challenges and expand Creeth’s footprint

                        </Typography>

                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )

}

export default RoadmapSection

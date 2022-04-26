import {Grid, Stack, Typography} from "@mui/material";
import Image from "next/image";
import separator from "../../../public/separator.png";
import Carousel from "react-material-ui-carousel";

var items = [
    {
        title: "1st Saga: The Kingdom Beta",
    },
    {
        title: "2nd Saga",
    }
]

function RoadmapSection() {

    function sagaForIndex(index: number) {
        console.log(index)
        if (index === 0) {
            return (firstSaga())
        }
        if (index === 1) {
            return secondSaga()
        }
    }

    function firstSaga(): JSX.Element {
        return (
            <Stack alignItems={"center"}
                   width={"100%"} height={500}>
                <Typography variant={"h4"} color={"#F6CB4C"}>1st Saga: The Kingdom Beta</Typography>

                <Grid container rowSpacing={6} columnSpacing={{xs: 1, sm: 2, md: 3}}
                      paddingTop={6}>
                    <Grid item xs={6}>
                        <Stack>
                            <Typography variant={"h5"} color={"#F6CB4C"}>Minting</Typography>
                            <Typography variant={"body2"} color={"white"}>

                                • 500 genesis Kingdom Keys. limit 1 per wallet <br/>
                                • Owning a Kingdom Key will: <br/>
                                &emsp;• Give 2 Kingdom Heroes mint for
                                free + gas<br/>
                                &emsp;• Increase $CGLD staking rewards<br/>
                                • Collection of 10,000 unique Heroes to build your team<br/>

                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"h5"} color={"#F6CB4C"}>PVE</Typography>
                        <Typography variant={"body2"} color={"white"}>

                            • Take your Heroes outside the gates of the Kingdom to battle and
                            train in dungeon to gain strength and experience
                            to one day battle against your fellow Creethens in project hosted
                            tournaments.<br/>

                            • Make the story unfold and take part into the first story oriented
                            quests.

                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"h5"} color={"#F6CB4C"}>Casteria Town</Typography>
                        <Typography variant={"body2"} color={"white"}>

                            • Buy Consumables and new items at the shop, acquired in-game with
                            $CGLD or on secondary markets,
                            will enable your Heroes to become stronger and battle for longer
                            periods of time before needing rest.<br/>
                            • Stake your Heroes and earn $CGLD

                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"h5"} color={"#F6CB4C"}>Partnership & Community
                            building</Typography>
                        <Typography variant={"body2"} color={"white"}>
                            • Development in town of partner dedicated building with exclusive
                            features for their holders.
                            <br/>
                            • As a holder of at least one Hero and one NFT from our partner
                            communities, you will be able to purchase community
                            specific items that only fellow partner community holders may
                            obtain, providing a very unique utility to these holders.

                        </Typography>
                    </Grid>
                </Grid>

            </Stack>
        )
    }

    function secondSaga() {
        return (
            <Stack alignItems={"center"}
                   width={"100%"} height={500}>
                <Typography variant={"h4"} color={"#F6CB4C"}>2nd Saga: Kingdom Expansion</Typography>

                <Grid container rowSpacing={6} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent={"center"}
                      paddingTop={6}>
                    <Grid item xs={6}>
                        <Stack>
                            <Typography variant={"h5"} color={"#F6CB4C"}>PVE</Typography>
                            <Typography variant={"body2"} color={"white"}>

                                • Generative dungeons with different themes and more enemies <br/>
                                • New skills to be unlocked for your heroes <br/>
                                • Story progression through new quests<br/>

                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"h5"} color={"#F6CB4C"}>PVP Tournaments</Typography>
                        <Typography variant={"body2"} color={"white"}>

                            • Take your best Heroes to the Tilt yard and battle against other Creethens with the winner
                            taking home the spoils of Eth.<br/>

                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant={"h5"} color={"#F6CB4C"}>Determine your destiny</Typography>
                        <Typography variant={"body2"} color={"white"}>
                            • We are being very strategic in terms of what we are releasing at this time,
                            but we currently have plans defined for users to determine which path they wish to follow,
                            and allow them to define their own destiny and gameplay as we expand and continue
                            development.
                            More to come here, but be very aware that future decisions you make in game will lead to
                            alternative story lines.

                        </Typography>
                    </Grid>
                </Grid>

            </Stack>
        )
    }

    return (
        <Stack paddingY={16} sx={{
            backgroundImage: `url("/bg.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'

        }}>

            <Stack paddingTop={6} paddingX={2}
                   alignItems="center" id="Concept"
                   height={650}
                   sx={{
                       backgroundImage: `url("/bg_crack.png")`,
                       backgroundRepeat: 'no-repeat',
                       backgroundPosition: 'center',
                       backgroundSize: 'contain'

                   }}>

                <Typography variant={"h4"} color={"white"} sx={{
                    textShadow: "-1px 2px #000000"

                }}>ROADMAP</Typography>
                <Image src={separator}/>


                <Stack maxWidth={1000} height={600} paddingTop={2} spacing={0} justifyContent={"center"}
                       alignItems={"center"}>

                    <Stack width={1000} height={"100%"} justifyContent={"center"}>
                        <Carousel
                            navButtonsProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    borderRadius: 0
                                }
                            }}
                            autoPlay={false}
                            NextIcon={<img src="arrow_right.png"/>}
                            PrevIcon={<img src="arrow_left.png"/>}
                        >
                            {
                                items.map((item, i) =>
                                    sagaForIndex(i)
                                )
                            }
                        </Carousel>
                    </Stack>

                </Stack>

            </Stack>

        </Stack>



        // <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2} width={"100%"}
        //        alignItems="center" id="Roadmap">
        //     <Stack width={"100%"} alignItems="center" spacing={3}>
        //         <Typography variant={"h1"} paddingBottom={2}>Roadmap</Typography>
        //
        //         <Image src={PIC} width={700} height={550}/>
        //
        //         <Stack width={"100%"} alignItems="center">
        //             <Stack maxWidth={700}>
        //
        //                 <Typography paddingTop={2} variant={"h2"}>Phase 1: In-Game Minting + Training</Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Kingdom Keys</Typography>
        //
        //                 <Typography>
        //
        //                     • 500 genesis Passes. limit 1 per wallet <br/>
        //                     • Owning a Kingdom Key will: <br/>
        //                     &emsp;• Allow the holder of the Key to mint 2 Kingdom Heroes for free + gas<br/>
        //                     &emsp;• Increase $CGLD staking rewards<br/>
        //
        //                 </Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Kingdom Heroes Mint</Typography>
        //
        //                 <Typography>
        //
        //                     • Collection of 10,000 unique Heroes containing 1 special and rare 1/1 <br/>
        //                     • Minting will broken into 2 phases: Kingdom Key Holders/Whitelist + Public <br/>
        //
        //                 </Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Train Your Heroes</Typography>
        //                 <Typography>
        //
        //                     • Immediately take your Heroes outside the gates of the Kingdom to battle and train to gain
        //                     strength and experience to one
        //                     day battle against your fellow Creethens and claim the spoils of project hosted tournaments
        //
        //                 </Typography>
        //             </Stack>
        //
        //             <Stack maxWidth={700}>
        //
        //                 <Typography paddingTop={2} variant={"h2"}>Phase 2: Utility Expansion</Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>The Kingdom Shop</Typography>
        //
        //                 <Typography>
        //
        //                     • Consumables and new items, acquired in-game with $CGLD or on secondary markets, will
        //                     enable
        //                     your Heroes to become stronger and battle for longer periods of time before needing rest
        //
        //                 </Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>The Traveling Market</Typography>
        //
        //                 <Typography>
        //
        //                     • As a holder of at least one Hero and one NFT from our partner communities, you will be
        //                     able to
        //                     purchase community specific items that only fellow partner community holders may obtain,
        //                     providing a very unique utility to these holders
        //
        //                 </Typography>
        //
        //             </Stack>
        //
        //             <Stack maxWidth={700}>
        //
        //                 <Typography paddingTop={2} variant={"h2"}>Phase 3: The Creeth Tilt Yard</Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Project Hosted Tournaments</Typography>
        //
        //                 <Typography>
        //
        //                     • Take your best Heroes to the Tilt yard and battle against other Creethens with the winner
        //                     taking home the spoils of Eth
        //
        //                 </Typography>
        //
        //             </Stack>
        //
        //             <Stack maxWidth={700}>
        //
        //                 <Typography paddingTop={2} variant={"h2"}>Phase 4: The Kingdom Expands</Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Expanded Gameplay</Typography>
        //
        //                 <Typography>
        //
        //                     • As the community within the Kingdom of Creeth grows, so must the Kingdom to house all of
        //                     the Creethens.
        //                     Your journey and gameplay expands as you venture outside of Creeth towards other neighboring
        //                     kingdoms to face new challenges and expand Creeth’s footprint
        //
        //                 </Typography>
        //
        //             </Stack>
        //
        //
        //             <Stack maxWidth={700}>
        //
        //                 <Typography paddingTop={2} variant={"h2"}>Phase 5: Rival Kingdoms</Typography>
        //
        //                 <Typography paddingTop={2} variant={"h4"}>Determine your destiny</Typography>
        //
        //                 <Typography>
        //
        //                     • We are being very strategic in terms of what we are releasing at this time,
        //                     but we currently have plans defined for users to determine which path they wish to follow,
        //                     and allow them to define their own destiny and gameplay as we expand and continue
        //                     development.
        //                     More to come here, but be very aware that future decisions you make in game will lead to
        //                     alternative story lines
        //
        //                 </Typography>
        //
        //             </Stack>
        //         </Stack>
        //
        //     </Stack>
        // </Stack>


    )

}

export default RoadmapSection

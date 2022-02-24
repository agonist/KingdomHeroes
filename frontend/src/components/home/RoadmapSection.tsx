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
                    <Stack width={700}>

                        <Typography paddingTop={2} variant={"h3"}>V1: Protect the Kingdom</Typography>

                        <Typography>

                            • Stake your heroes and earn $CGLD <br/>
                            • Visit Creeth town <br/>
                            • Go out of town to fight monsters and train your heroes in PVE turn based combats <br/>
                            • Spend your hard earned $CGLD to boost/heal your heroes<br/>

                        </Typography>
                    </Stack>
                </Stack>

                <Stack width={"100%"} alignItems="center">
                    <Stack marginLeft={{md: 0, lg: 10}} maxWidth={700}>
                        <Typography paddingTop={2} variant={"h3"}>V2: Reinforcements Arrive</Typography>

                        <Typography>

                            • Improve your heroes buying powerful items with $CGLD<br/>
                            • Enhanced training<br/>

                        </Typography>
                    </Stack>
                </Stack>

                <Stack width={"100%"} alignItems="center">
                    <Stack width={700}>

                        <Typography paddingTop={2} variant={"h3"}>V3: Battle for Glory</Typography>

                        <Typography>

                            • Project Hosted Tournaments for Prizes and to be The Defender of Creeth<br/>
                            • Community decide<br/>

                        </Typography>
                    </Stack>

                </Stack>

            </Stack>


        </Stack>
    )

}

export default RoadmapSection

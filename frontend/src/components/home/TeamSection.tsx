import {NextPage} from "next";
import {Grid, Stack, Typography} from "@mui/material";
import Image from 'next/image'
import TEAM1 from '../../../public/16.png';
import TEAM2 from '../../../public/1.png';
import TEAM3 from '../../../public/team3.png';
import TEAM4 from '../../../public/team4.png';
import WIZ from '../../../public/wizz.png';
import twitter from "../../../public/twitter.png";

function TeamSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingY={6}
               alignItems="center" id="Team">
            <Typography variant={"h1"}>Team</Typography>

            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} maxWidth={800} paddingY={6}>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={WIZ} width={150} height={150}/>
                        <Typography variant={"h3"}>JB</Typography>
                        <Typography variant={"caption"}>Game Creator</Typography>
                        <a href={"https://twitter.com/jonbodin10"} target="_blank" rel="noreferrer">
                            <Image src={twitter} width={22} height={22}/>
                        </a>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM2} width={150} height={150}/>
                        <Typography variant={"h3"}>Candycanehulk</Typography>
                        <Typography variant={"caption"} align={"center"}>Community Manager</Typography>
                        <a href={"https://twitter.com/candycanehulk"} target="_blank" rel="noreferrer">
                            <Image src={twitter} width={22} height={22}/>
                        </a>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM1} width={150} height={150}/>
                        <Typography variant={"h3"}>Agonist</Typography>
                        <Typography variant={"caption"}>Developer</Typography>
                        <a href={"https://twitter.com/agonist42"} target="_blank" rel="noreferrer">
                            <Image src={twitter} width={22} height={22}/>
                        </a>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM2} width={150} height={150}/>
                        <Typography variant={"h3"}>LePlancton</Typography>
                        <Typography variant={"caption"}>Game/NFT Artist</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )

}

export default TeamSection

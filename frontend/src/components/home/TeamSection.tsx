import {NextPage} from "next";
import {Grid, Stack, Typography} from "@mui/material";
import Image from 'next/image'
import TEAM1 from '../../../public/team1.png';
import TEAM2 from '../../../public/team2.png';
import TEAM3 from '../../../public/team3.png';
import TEAM4 from '../../../public/team4.png';

function TeamSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingY={6}
               alignItems="center" id="Team">
            <Typography variant={"h1"}>Team</Typography>

            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} maxWidth={800} paddingY={6}>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM3} width={150} height={150}/>
                        <Typography variant={"body1"}>JB</Typography>
                        <Typography variant={"caption"}>Game Creator</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM2} width={150} height={150}/>
                        <Typography variant={"body1"}>Candycanehulk</Typography>
                        <Typography variant={"caption"}>Community Manager</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM4} width={150} height={150}/>
                        <Typography variant={"body1"}>Agonist</Typography>
                        <Typography variant={"caption"}>Developer</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center">
                        <Image src={TEAM1} width={170} height={150}/>
                        <Typography variant={"body1"}>Falcone.eth</Typography>
                        <Typography variant={"caption"}>Artist</Typography>
                    </Stack>
                </Grid>

            </Grid>
        </Stack>
    )

}

export default TeamSection

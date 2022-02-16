import {NextPage} from "next";
import {Grid, Stack, Typography} from "@mui/material";
import Image from 'next/image'
import PIC from '../../../public/pic.png';

function TeamSection() {

    return (
        <Stack sx={{backgroundColor: 'beige'}} paddingY={6}
               alignItems="center" id="Team">
            <Typography variant={"h1"}>Team</Typography>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} maxWidth={800} paddingY={6}>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center" >
                        <Image src={PIC} width={150} height={150}/>
                        <Typography variant={"body1"}>Johnny</Typography>
                        <Typography variant={"caption"}>founder</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center" >
                        <Image src={PIC} width={150} height={150}/>
                        <Typography variant={"body1"}>Johnny</Typography>
                        <Typography variant={"caption"}>founder</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center" >
                        <Image src={PIC} width={150} height={150}/>
                        <Typography variant={"body1"}>Johnny</Typography>
                        <Typography variant={"caption"}>founder</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Stack direction={"column"} alignItems="center" >
                        <Image src={PIC} width={150} height={150}/>
                        <Typography variant={"body1"}>Johnny</Typography>
                        <Typography variant={"caption"}>founder</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )

}

export default TeamSection

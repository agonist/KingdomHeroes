import {NextPage} from "next";
import {Grid, Stack, Typography} from "@mui/material";
import Image from 'next/image'
import TEAM1 from '../../../public/16.png';
import TEAM2 from '../../../public/1.png';
import TEAM3 from '../../../public/11.png';
import TEAM4 from '../../../public/team4.png';
import WIZ from '../../../public/wizz.png';
import twitter from "../../../public/twitter.png";
import separator from "../../../public/separator.png";
import Carousel from "react-material-ui-carousel";
import Footer from "../footer/Footer";

function TeamSection() {

    return (

        <Stack paddingY={16} sx={{
            backgroundImage: `url("/b4.jpg")`,
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

                }}>TEAM</Typography>
                <Image src={separator}/>


                <Stack maxWidth={1000} paddingTop={2} spacing={0} justifyContent={"center"} alignItems={"center"}>
                    <Typography paddingTop={2} color={"white"} variant={"body1"}>Meet our team with years of experience
                        in their
                        respective field.</Typography>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} maxWidth={800} paddingY={6}>
                        <Grid item xs={3}>
                            <Stack direction={"column"} alignItems="center" spacing={1}>
                                <Image src={WIZ} width={150} height={150}/>
                                <Typography color={"white"} variant={"h4"}>JB</Typography>
                                <Typography color={"white"} variant={"caption"}>Game Creator</Typography>
                                <a href={"https://twitter.com/jonbodin10"} target="_blank" rel="noreferrer">
                                    <Image src={twitter} width={22} height={22}/>
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} alignItems="center" spacing={1}>
                                <Image src={TEAM2} width={150} height={150}/>
                                <Typography color={"white"} variant={"h4"}>Candycanehulk</Typography>
                                <Typography color={"white"} variant={"caption"} align={"center"}>Community
                                    Manager</Typography>
                                <a href={"https://twitter.com/candycanehulk"} target="_blank" rel="noreferrer">
                                    <Image src={twitter} width={22} height={22}/>
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} alignItems="center" spacing={1}>
                                <Image src={TEAM1} width={150} height={150}/>
                                <Typography color={"white"} variant={"h4"}>Agonist</Typography>
                                <Typography color={"white"} variant={"caption"}>Developer</Typography>
                                <a href={"https://twitter.com/agonist42"} target="_blank" rel="noreferrer">
                                    <Image src={twitter} width={22} height={22}/>
                                </a>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack direction={"column"} alignItems="center" spacing={1}>
                                <Image src={TEAM3} width={150} height={150}/>
                                <Typography color={"white"} variant={"h4"}>LePlancton</Typography>
                                <Typography color={"white"} variant={"caption"}>Game/NFT Artist</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                </Stack>

            </Stack>

            <Footer/>

        </Stack>


    )

}

export default TeamSection

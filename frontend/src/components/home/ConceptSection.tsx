import {NextPage} from "next";
import {Button, Paper, Stack, Typography} from "@mui/material";
import PIC from '../../../public/bg_crack.png';

import {Box} from "@mui/system";
import Image from "next/image";
import separator from "../../../public/separator.png"
import knight from "../../../public/Knight.png"
import Carousel from 'react-material-ui-carousel'

function ConceptSection() {
    var items = [
        {
            image: "/Knight.png",
        },
        {
            image: "/Wizard.png",
        },
        {
            image: "/Elf.png",
        }
    ]

    return (

        <Stack paddingY={16} sx={{
            backgroundImage: `url("/b1.jpg")`,
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

                }}>WHAT IS KINGDOM HEROES?</Typography>
                <Image src={separator}/>

                <Stack direction={"row"} maxWidth={1000} paddingTop={2} spacing={0} justifyContent={"center"}>

                    <Stack width={500} height={500} justifyContent={"center"}>
                        <Carousel
                            navButtonsProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    borderRadius: 0
                                }
                            }}
                            navButtonsAlwaysVisible={true}
                            NextIcon={<img src="arrow_right.png"/>}
                            PrevIcon={<img src="arrow_left.png"/>}
                        >
                            {
                                items.map((item, i) =>
                                    <Stack alignItems={"center"} justifyContent={"center"} alignContent={"center"}
                                           width={"100%"} key={i}>
                                        <Stack width={382} height={299} justifyContent={"center"}>
                                            <Image src={item.image} width={382} height={299}/>
                                        </Stack>
                                    </Stack>
                                )
                            }
                        </Carousel>
                    </Stack>

                    <Stack maxWidth={500} height={500} justifyContent={"center"}>
                        <Typography display="inline" variant={"body1"} color={"white"}>
                            Kingdom Heroes brings back all the feels and nostalgia of your old
                            JRPG games.
                            Community members will train their Knights, Wizards, and Elves NFTs against monsters that
                            lurk
                            outside the kingom walls.
                            In battles your team will gain Experience Points to improves their skills, and at times,
                            find
                            gold
                            that can be used to further improve their in-game experience. <br/><br/>

                            To claim all the glory and prizes, you must build your team, test your skills and battle
                            other
                            community members in hosted tournaments.
                            <br/><br/>
                            Will you have what it takes to defeat these monsters and face challenges emerging across the
                            Kingdom
                            of Creeth?
                        </Typography>
                    </Stack>

                </Stack>

            </Stack>

        </Stack>
    )

}

export default ConceptSection

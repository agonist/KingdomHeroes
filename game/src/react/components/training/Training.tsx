import {
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import React, {useState} from "react";
import Stake from "./Stake";
import UnStake from "./UnStake";
import {GuiStyles} from "../Styles";
import {useAppSelector} from "../../store/hooks";


export default function Training() {
    const training = useAppSelector((state) => state.training)

    const classes = GuiStyles();

    return (
        <Stack
            width={window.innerWidth / 1.1} height={window.innerHeight / 1.1}
            spacing={3}
            alignItems={"center"}
            className={classes.frame}>

            <Typography variant={"h1"} color={CustomColor.fontYellow}>TRAINING</Typography>

            {training.stateLoading ?

                <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <CircularProgress/>
                </Stack>

                :

                <Stack spacing={3}
                       alignItems={"center"}>
                    <Stack className={classes.content} width={"30%"}>
                        <Typography paddingY={1} variant={"h5"} color={"white"}>DAILY $CGLD BONUS</Typography>
                        <Stack paddingY={1} width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}}>
                            <Typography color={"white"}>42 $CGLD</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={3} width={"100%"} justifyContent={"center"}>

                        <Stake/>

                        <UnStake/>

                    </Stack>
                </Stack>
            }


        </Stack>
    )
}

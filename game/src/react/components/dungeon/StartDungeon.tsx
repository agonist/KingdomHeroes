import {GuiStyles} from "../Styles";
import {Button, Stack, Typography} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import React from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/hooks";
import {startNewDungeon} from "../../store/slices/dungeon-slice";
import {hideUi} from "../../store/slices/ui-slice";

export default function Startdungeon() {

    const classes = GuiStyles();
    const dispatch = useDispatch();

    const dungeon = useAppSelector((state) => state.dungeon)

    async function startDungeonClicked() {
        console.log("HELLO")
        await dispatch(startNewDungeon())
    }

    function hideUI() {
        dispatch(hideUi())
    }

    return (
        <Stack width={window.innerWidth / 2.7} height={window.innerHeight / 2.2} className={classes.frame}
               justifyContent={"center"} alignItems={"center"} spacing={2}>

            <Typography variant={"h3"} color={CustomColor.fontYellow} paddingY={2}>START DUNGEON</Typography>

            <Stack sx={{backgroundColor: CustomColor.midBg}} width={"100%"} height={"100%"} paddingY={4}
                   alignItems={"center"} spacing={2}>

                <Typography paddingBottom={2} variant={"body1"} color={"white"}>Starting a new Dungeon will consume 1 BC<br/>
                    for each heroes in your team.
                </Typography>

                <Button className={classes.button} variant={"contained"} onClick={startDungeonClicked}>
                    LET'S GO
                </Button>

                <Button className={classes.button} variant={"contained"} onClick={hideUI}>
                    MAYBE LATER
                </Button>
            </Stack>


        </Stack>
    )
}

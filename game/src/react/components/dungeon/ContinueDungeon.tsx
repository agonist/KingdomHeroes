import {GuiStyles} from "../Styles";
import {Button, Stack, Typography} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import React from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/hooks";
import {hideUi} from "../../store/slices/ui-slice";
import {endDungeon, launchDungeon, loadCurrentDungeon} from "../../store/slices/dungeon-slice";

export default function ContinueDungeon() {

    const classes = GuiStyles();
    const dispatch = useDispatch();

    const dungeon = useAppSelector((state) => state.dungeon)

    async function continueDungeonClicked() {
        await dispatch(loadCurrentDungeon())
        await dispatch(hideUi())
    }

    async function giveUpClick() {
        await dispatch(endDungeon())
        await dispatch(hideUi())
    }

    function hideUI() {
        dispatch(hideUi())
    }

    return (
        <Stack width={window.innerWidth / 2.7} height={window.innerHeight / 2.2} className={classes.frame}
               justifyContent={"center"} alignItems={"center"} spacing={2}>

            <Typography variant={"h3"} color={CustomColor.fontYellow} paddingY={2}>CONTINUE DUNGEON</Typography>

            <Stack sx={{backgroundColor: CustomColor.midBg}} width={"100%"} height={"100%"} paddingY={4}
                   alignItems={"center"} spacing={2}>

                <Typography paddingBottom={2} variant={"body1"} color={"white"}>You have an unfinished dungeon. Do you
                    want to continue it?
                </Typography>

                <Button className={classes.button} variant={"contained"} onClick={continueDungeonClicked}>
                    CONTINUE
                </Button>

                <Button className={classes.button} variant={"contained"} onClick={giveUpClick}>
                    GIVE UP
                </Button>
            </Stack>


        </Stack>
    )
}

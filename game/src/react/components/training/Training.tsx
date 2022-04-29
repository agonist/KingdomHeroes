import {
    Box,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";
import  {useState} from "react";
import Stake from "./Stake";
import UnStake from "./UnStake";
import {GuiStyles} from "../Styles";
import {useAppSelector} from "../../store/hooks";
import {TabContext} from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import {CustomeTabs, CustomTab} from "../menu/MainMenu";


export default function Training() {
    const training = useAppSelector((state) => state.training)
    const [value, setValue] = useState("1");

    const classes = GuiStyles();

    return (
        <Box height={"100%"} width={"100%"} sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)"
        }} paddingTop={8}>
            <TabContext value={value}>
                <CustomeTabs value={value} centered>
                    <CustomTab label="STAKING" value={"1"}/>
                </CustomeTabs>
                <TabPanel value={"1"}>
                    {training.stateLoading ?

                        <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <CircularProgress/>
                        </Stack>

                        :

                        <Stack spacing={3}
                               alignItems={"center"}>
                            <Stack className={classes.content} width={"30%"}>
                                <Stack sx={{
                                    backgroundColor: "#8A2439",
                                    borderBottom: "solid",
                                    borderWidth: "2px",
                                    borderColor: "white"
                                }}>
                                    <Typography paddingY={1} variant={"h5"} color={"white"}>DAILY $CGLD
                                        BONUS</Typography>
                                </Stack>
                                <Stack paddingY={1} width={"100%"} height={"100%"}>
                                    <Typography color={"white"}>{training.currentYield} $CGLD</Typography>
                                </Stack>
                            </Stack>

                            <Stack direction={"row"} spacing={3} width={"100%"} justifyContent={"center"}>

                                <Stake/>

                                <UnStake/>

                            </Stack>
                        </Stack>
                    }

                </TabPanel>
            </TabContext>

            <Box sx={{p: 3}}/>
        </Box>

    )
}

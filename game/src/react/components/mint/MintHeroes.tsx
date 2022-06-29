import {Box, Stack} from "@mui/material";
import MintHeroesRoot from "./MintHeroesRoot";
import {TabContext} from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import {CustomeTabs, CustomTab} from "../menu/MainMenu";
import {useState} from "react";

export default function MintHeroes() {
    const [value, setValue] = useState("1");

    return (
        <Box height={"100%"} width={"100%"} sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)"
        }} paddingTop={8}>
            <TabContext value={value}>
                <CustomeTabs value={value} centered>
                    <CustomTab label="MINT HEROES" value={"1"}/>
                </CustomeTabs>
                <TabPanel value={"1"}>
                    <MintHeroesRoot/>
                </TabPanel>

            </TabContext>
        </Box>
)
}

import {Box, Stack} from "@mui/material";
import MintKeysRoot from "./MintKeysRoot";
import {TabContext} from "@mui/lab";
import {CustomeTabs, CustomTab} from "../menu/MainMenu";
import TabPanel from "@mui/lab/TabPanel";
import {useState} from "react";

export default function MintKeys() {
    const [value, setValue] = useState("1");

    return (
        <Box height={"100%"} width={"100%"} sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)"
        }} paddingTop={8}>
            <TabContext value={value}>
                <CustomeTabs value={value} centered>
                    <CustomTab label="MINT KEYS" value={"1"}/>
                </CustomeTabs>
                <TabPanel value={"1"}>
                    <MintKeysRoot/>
                </TabPanel>

            </TabContext>
        </Box>
    )
}

import {Box, Stack, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {styled} from "@mui/styles";
import Heroes from "../heroes/Heroes";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext} from "@mui/lab";
import Inventory from "../inventory/Inventory";
import Team from "../team/Team";

const CustomeTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#8A2439',
    },
});

const CustomTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        textTransform: 'none',
        minWidth: 0,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
            color: '#8A2439',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: 'white',
            backgroundImage: "linear-gradient(transparent, #8A2439)"
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
    label: string;
    value: string
}

export default function MainMenu() {
    const [value, setValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box height={"100%"} width={"100%"} sx={{
            backgroundColor: "rgba(0, 0, 0, 0.9)"
        }} paddingTop={8}>
            <TabContext value={value}>
                <CustomeTabs value={value} onChange={handleChange} centered>
                    <CustomTab label="TEAM" value={"1"}/>
                    <CustomTab label="HEROES" value={"2"}/>
                    <CustomTab label="INVENTORY" value={"3"}/>
                    <CustomTab label="SKILLS" value={"4"}/>
                </CustomeTabs>
                <TabPanel value={"1"}>
                    <Team/>
                </TabPanel>
                <TabPanel value={"2"}>
                    <Heroes/>
                </TabPanel>
                <TabPanel value={"3"}>
                    <Inventory/>
                </TabPanel>
            </TabContext>

            <Box sx={{p: 3}}/>
        </Box>
    )
}

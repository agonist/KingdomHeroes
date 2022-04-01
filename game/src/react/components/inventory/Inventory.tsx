import {Box, Grid, Stack, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import key from "../../../img/key.gif";

import {styled} from "@mui/styles";
import React from "react";
import {GuiStyles} from "../Styles";
import {CustomColor} from "../../MuiTheme";


export default function Inventory() {
    const classes = GuiStyles();

    const user = useAppSelector((state) => state.user)


    const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: CustomColor.darkBg,
            border: "solid",
            borderWidth: "8px",
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to bottom, #579AF7, #092274)',
            padding: 2,
            paddingX: 3,
            maxWidth: 420,
        },
    }));


    return (
        <Stack maxWidth={500} className={classes.frame} justifyContent={"center"} alignItems={"center"}
        >

            <Typography variant={"h3"} color={CustomColor.fontYellow} paddingY={2}>INVENTORY</Typography>

            <Box paddingBottom={2}>
                <Grid container spacing={1} padding={1} justifyContent={"center"} alignItems={"center"}>

                    {user.inventory.map((item, index) => (
                        <Grid item key={index}
                        >
                            <Stack sx={{backgroundColor: "#213D73"}} width={64} height={64} alignItems="center"
                                   justifyContent={"center"}>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Stack padding={2}>
                                                <Typography color={CustomColor.fontYellow} variant={"h5"}>Kingdom
                                                    Key</Typography>
                                                <Typography color={"white"} variant={"body1"}>A rare item for the
                                                    bravest adventurer</Typography>
                                            </Stack>
                                        </React.Fragment>
                                    }
                                >
                                    <Stack width={64} height={64}>
                                        <img src={key} alt={"kingdom key"}/>
                                    </Stack>

                                </HtmlTooltip>
                            </Stack>
                        </Grid>
                    ))

                    }

                    {Array.from(Array(24 - user.inventory.length)).map((_, index) => (
                        <Grid item key={index}>
                            <Box sx={{backgroundColor: "#579AF7"}} width={64} height={64}>
                                <Typography></Typography>
                            </Box>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </Stack>
    )

}

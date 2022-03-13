import {Box, Grid, Stack, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import dialogBorderBox from "../dialog/dialogbox.png";
import key from "../../../img/key.png";

import {styled} from "@mui/styles";
import React from "react";



export default function Inventory() {

    const user = useAppSelector((state) => state.user)


    const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3,
            maxWidth: 420,
        },
    }));


    return (
        <Stack maxWidth={500} sx={{
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>

            <Typography variant={"h1"} paddingBottom={2}>Inventory</Typography>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={1}>

                    {user.inventory.map((item, index) => (
                        <Grid item key={index} xs={2}>
                            <Stack sx={{backgroundColor: "pink"}} width={64} height={64} alignItems="center"
                                   justifyContent={"center"}>
                                <HtmlTooltip
                                    title={
                                        <React.Fragment>
                                            <Stack padding={2}>
                                                <Typography color={"black"} variant={"h4"}>Kingdom Key</Typography>
                                                <Typography color={"black"} variant={"body1"}>A rare item for the
                                                    bravest adventurer</Typography>
                                            </Stack>
                                        </React.Fragment>
                                    }
                                >
                                    <img src={key} alt={"kingdom key"}/>
                                </HtmlTooltip>
                            </Stack>
                        </Grid>
                    ))

                    }

                    {Array.from(Array(24 - user.inventory.length)).map((_, index) => (
                        <Grid item key={index} xs={2}>
                            <Box sx={{backgroundColor: "rosybrown"}} width={64} height={64}>
                                <Typography></Typography>
                            </Box>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </Stack>
    )

}

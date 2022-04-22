import {Box, Grid, Stack, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import key from "../../../img/key.gif";

import {styled} from "@mui/styles";
import {CustomColor} from "../../MuiTheme";
import {Fragment} from "react";


export default function Inventory() {

    const user = useAppSelector((state) => state.user)


    const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            border: "solid",
            borderWidth: "1px",
            borderImageSlice: 1,
            padding: 2,
            paddingX: 3,
            maxWidth: 420,
        },
    }));


    return (
        <Stack width={window.innerWidth} height={window.innerHeight / 1.3} alignItems={"center"}>
            <Box paddingBottom={2} maxWidth={700}>
                <Grid container padding={1} justifyContent={"center"} alignItems={"center"}>

                    {user.inventory.map((item, index) => (
                        <Grid item key={index}>
                            <Stack width={64} height={64} alignItems="center"
                                   justifyContent={"center"}>
                                <HtmlTooltip
                                    title={
                                        <Fragment>
                                            <Stack padding={2}>
                                                <Typography color={CustomColor.fontYellow} variant={"h5"}>Kingdom
                                                    Key</Typography>
                                                <Typography color={"white"} variant={"body1"}>A rare item for the
                                                    bravest adventurer</Typography>
                                            </Stack>
                                        </Fragment>
                                    }
                                >
                                    <Stack width={64} height={64} sx={{
                                        border: "solid",
                                        borderWidth: "1px",
                                        borderColor: "white"
                                    }}>
                                        < img src={key} alt={"kingdom key"}/>
                                    </Stack>

                                </HtmlTooltip>
                            </Stack>
                        </Grid>
                    ))

                    }

                    {Array.from(Array(40 - user.inventory.length)).map((_, index) => (
                        <Grid item key={index}>
                            <Box sx={{
                                border: "solid",
                                borderWidth: "1px",
                                borderColor: "white"
                            }} width={64} height={64}>
                                <Typography></Typography>
                            </Box>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </Stack>
    )

}

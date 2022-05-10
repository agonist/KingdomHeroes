import {Container, Icon, Stack, SvgIcon, Typography} from "@mui/material";
import {NextRouter, useRouter} from "next/router";
import {Link as ScrollLink} from "react-scroll";

export const frgMenuData = [
    {
        href: "/",
        tabContent: "GAME"
    },
    {
        href: "/concept",
        tabContent: "NFT"
    },
    {
        href: "/gameplay",
        tabContent: "Gameplay"
    },
    {
        href: "/roadmap",
        tabContent: "Roadmap"
    },
    {
        href: "/team",
        tabContent: "Team"
    }
]

function MenuDesktop() {

    const router = useRouter();

    return (

        <Stack
            width={"100%"}
            direction="row"
            alignItems="center"
            justifyItems="center"
            justifyContent={"center"}
        >
            <Stack width={160} alignItems={"center"}>
                <Typography variant="h4" color={'white'} component={ScrollLink} to={"/"} spy
                            smooth offset={-100} sx={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textShadow: "-1px 1px 4px  #000000"
                }}>
                    GAME
                </Typography>
            </Stack>
            <Stack width={160} alignItems={"center"}>
                <Typography variant="h4" color={'white'} component={ScrollLink} to={"/concept"} spy
                            smooth offset={-100} sx={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textShadow: "-1px 1px 4px  #000000"

                }}>
                    NFT
                </Typography>
            </Stack>

            <Stack maxWidth={170}>
                <img src={"crown.png"}/>
            </Stack>

            <Stack width={160} alignItems={"center"}>
                <Typography variant="h4" color={'white'} component={ScrollLink} to={"/roadmap"} spy
                            smooth offset={-100} sx={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textShadow: "-1px 1px 4px  #000000"
                }}>
                    ROADMAP
                </Typography>
            </Stack>
            <Stack width={160} alignItems={"center"}>
                <Typography variant="h4" color={'white'} component={ScrollLink} to={"/team"} spy
                            smooth offset={-100} sx={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textShadow: "-1px 1px 4px  #000000"
                }}>
                    TEAM
                </Typography>
            </Stack>
        </Stack>


    )

}

export default MenuDesktop

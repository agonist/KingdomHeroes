import {Container, Icon, Stack, SvgIcon, Typography} from "@mui/material";
import ConnectButton from "./ConnectButton";
import {useState} from "react";
import Link from 'next/link'
import {Custom} from "../../styles/Theme";
import {NextRouter, useRouter} from "next/router";
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import {Link as ScrollLink} from "react-scroll";

export const frgMenuData = [
    {
        href: "/",
        tabContent: "Home"
    },
    {
        href: "/concept",
        tabContent: "Concept"
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
        <Container>

            <Stack alignItems="center" justifyItems="center">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    justifyItems="center"
                >
                    {
                        frgMenuData.map((menu, index) => (
                            <Typography variant="h2" color={'black'} component={ScrollLink} to={menu.tabContent} spy
                                        smooth offset={-100} sx={{
                                cursor: "pointer",
                                textTransform: "uppercase",
                            }} key={index}>
                                {menu.tabContent}
                            </Typography>

                            // <Link href={menu.href} key={index}>
                            //     {router.pathname === menu.href ?
                            //         <a style={{
                            //             textDecoration: 'none',
                            //         }}>
                            //             <Typography variant="h2" color={'black'} component={ScrollLink}  to={menu.tabContent} spy smooth>
                            //                 {menu.tabContent}
                            //             </Typography>
                            //         </a>
                            //
                            //         :
                            //
                            //         <a style={{
                            //             textDecoration: 'none',
                            //         }}>
                            //             <Typography variant="h2"  color={'black'}>
                            //                 {menu.tabContent}
                            //             </Typography>
                            //         </a>
                            //     }
                            // </Link>
                        ))
                    }
                </Stack>
            </Stack>


        </Container>
    )

}

export default MenuDesktop
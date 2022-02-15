import {Button, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {list} from "postcss";
import {Fragment, useState} from "react";
import {frgMenuData} from "./MenuDesktop";
import Link from "next/link";
import {Custom} from "../../styles/Theme";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectButton from "./ConnectButton";
import {useRouter} from "next/router";


function MenuMobile() {
    const [state, setState] = useState(false);
    const router = useRouter();

    const [selected, setSelected] = useState(0)

    function handleSelect(index: number) {
        console.log(index)
        setState(false)
        setSelected(index)
    }

    function toggleDrawer() {
        setState(!state)
    }

    return (
        <Fragment key={'right'}>

            <IconButton
                onClick={toggleDrawer}
                sx={{
                    ml: 1,
                }}
            >
                <MenuIcon sx={{color: "black"}}/>
            </IconButton>

            <Drawer
                anchor={'right'}
                open={state}
                onClose={() => toggleDrawer()}
            >

                <Stack paddingTop={8} width={250} maxHeight={100} alignItems="center"
                       spacing={5}
                       justifyItems="center"
                       flex={1}>

                    {
                        frgMenuData.map((menu, index) => (
                            <Link href={menu.href} key={index}>
                                {router.pathname === menu.href ?
                                    <a><Typography
                                    >
                                        {menu.tabContent}
                                    </Typography></a>

                                    :
                                    <a><Typography
                                    >
                                        {menu.tabContent}
                                    </Typography></a>
                                }
                            </Link>

                        ))
                    }

                    <ConnectButton/>
                </Stack>


            </Drawer>
        </Fragment>
    )

}

export default MenuMobile
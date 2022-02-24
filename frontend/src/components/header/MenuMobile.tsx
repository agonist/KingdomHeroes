import {Button, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {list} from "postcss";
import {Fragment, useState} from "react";
import {frgMenuData} from "./MenuDesktop";
import Link from "next/link";
import {Custom} from "../../styles/Theme";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectButton from "./ConnectButton";
import {useRouter} from "next/router";
import {Link as ScrollLink} from "react-scroll/modules";


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
                            <Typography variant="h3" color={'black'} component={ScrollLink} to={menu.tabContent} spy
                                        smooth offset={-100} sx={{
                                cursor: "pointer",
                                textTransform: "uppercase",
                            }} key={index}>
                                {menu.tabContent}
                            </Typography>
                        ))
                    }

                    {/*<ConnectButton/>*/}
                </Stack>


            </Drawer>
        </Fragment>
    )

}

export default MenuMobile
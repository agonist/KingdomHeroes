import {AppBar, Container, Hidden, makeStyles, Stack, Toolbar, Typography} from "@mui/material";
import MenuDesktop from "./MenuDesktop";
import {color, styled} from "@mui/system";
import MenuMobile from "./MenuMobile";
import {useRouter} from "next/router";
import Image from "next/image";
import PIC from "../../../public/logo.webp";

export const DRAWER_WIDTH = 280;
export const TRANSITION_DURATION = 969;

interface IHeader {
    handleDrawerToggle: () => void;
    drawe: boolean;
}

const APP_BAR_MOBILE = 40;
const APP_BAR_DESKTOP = 100;

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    height: APP_BAR_MOBILE,
    [theme.breakpoints.up("md")]: {
        height: APP_BAR_DESKTOP,
    },
}));


function MenuBar(): JSX.Element {

    return (
        <AppBar position="sticky" elevation={0} sx={{
            justifyContent: "space-between", backgroundColor: "rgba(0, 0, 0, 0.6)"

        }}>
            <ToolbarStyle>

                <Container
                    maxWidth="xl"
                >
                    <Hidden mdDown>
                        <MenuDesktop/>
                    </Hidden>
                    <Hidden mdUp>
                        <MenuMobile/>
                    </Hidden>

                </Container>
            </ToolbarStyle>
        </AppBar>
    )

}

export default MenuBar

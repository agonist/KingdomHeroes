import {AppBar, Container, Hidden, makeStyles, Stack, Toolbar, Typography} from "@mui/material";
import MenuDesktop from "./MenuDesktop";
import {color, styled} from "@mui/system";
import MenuMobile from "./MenuMobile";
import {useRouter} from "next/router";
import ConnectButton from "./ConnectButton";

export const DRAWER_WIDTH = 280;
export const TRANSITION_DURATION = 969;

interface IHeader {
    handleDrawerToggle: () => void;
    drawe: boolean;
}

const APP_BAR_MOBILE = 40;
const APP_BAR_DESKTOP = 70;

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    height: APP_BAR_MOBILE,
    [theme.breakpoints.up("md")]: {
        height: APP_BAR_DESKTOP,
    },
}));


function MenuBar(): JSX.Element {
    const router = useRouter();

    return (
        <AppBar position="sticky" elevation={0} sx={{
            justifyContent: "space-between", backgroundColor: "#f1f1f1"
        }}>
            <ToolbarStyle>
                <Stack width={350}>
                    <Typography>Logo</Typography>
                </Stack>
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
                <Hidden mdDown>
                    <Stack width={350}>
                        <ConnectButton/>
                    </Stack>
                </Hidden>


            </ToolbarStyle>
        </AppBar>
    )

}

export default MenuBar
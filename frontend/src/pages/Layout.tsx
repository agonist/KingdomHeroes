import Head from "next/head";
import {Box, Stack} from "@mui/material";
import MenuBar from "../components/header/AppBar";
import Footer from "../components/footer/Footer";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Head>
                <title>Kingdom Heroes</title>
                <meta name="" content="Kingdom Heroes"/>
                <link rel="icon" href="/favicon.ico"/>

            </Head>

            <MenuBar/>
            <Stack sx={{flexGrow: 1}}>

                <main>
                    {children}
                </main>

            </Stack>

            <footer>
            </footer>
        </Box>
    )

}

export default Layout

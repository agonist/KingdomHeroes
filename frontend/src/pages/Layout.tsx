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
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"/>
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

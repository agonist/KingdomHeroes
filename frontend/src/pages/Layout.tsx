import Head from "next/head";
import {useEffect, useState} from "react";
import {Box, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {enableMapSet} from "immer";
import {useAddress, useWeb3Context} from "../web3/web3-context";
import MenuBar from "../components/header/AppBar";
import Footer from "../components/footer/Footer";
import {loadApp} from "../store/heroes-mint-slice";
import {Web3Params} from "../store/utils/params";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    const dispatch = useDispatch();
    const address = useAddress();
    const {connect, provider, hasCachedProvider, chainID, connected, web3Modal} = useWeb3Context();
    const [walletChecked, setWalletChecked] = useState(false);


    useEffect(() => {

        if (web3Modal === undefined) return

        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    }, [web3Modal]);

    useEffect(() => {
        enableMapSet()

        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        if (connected) {
            dispatch(loadApp(p))
        }

    }, [connected])

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Head>
                <title>Kingdom Heroes</title>
                <meta name="" content="Kingdom Heroes"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>
            </Head>

            <MenuBar/>
            <Stack sx={{flexGrow: 1}}>

                <main>
                    {children}
                </main>

            </Stack>

            <footer>
                <Footer/>
            </footer>
        </Box>
    )

}

export default Layout

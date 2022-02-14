import Head from "next/head";
import {useEffect, useState} from "react";
import {Box, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {enableMapSet} from "immer";
import {useAddress, useWeb3Context} from "../web3/web3-context";

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

        if (connected) {
            // dispatch(loadAppState({networkID: chainID, provider: provider}))
        }

    }, [connected])

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <Head>
                <title>Frog Nation DAO</title>
                <meta name="" content="Royal Kingdom"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {/*<MenuBar/>*/}
            <Stack sx={{flexGrow: 1}} marginX={2}>

                <main>
                    {children}
                </main>

            </Stack>

            <footer>
                {/*<Footer/>*/}
            </footer>
        </Box>
    )

}

export default Layout
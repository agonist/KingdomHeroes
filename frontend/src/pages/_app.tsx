import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "@mui/system";
import {theme} from "../styles/Theme";
import {Provider} from "react-redux";
import store from "../store/store";
import {Web3ContextProvider} from "../web3/web3-context";
import Layout from "./Layout";

function MyApp({Component, pageProps}: AppProps) {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Web3ContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Web3ContextProvider>
            </Provider>
        </ThemeProvider>
    )

}

export default MyApp

import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from "@mui/system";
import {theme} from "../styles/Theme";
import Layout from "./Layout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps}: AppProps) {

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Layout>
        </ThemeProvider>
    )

}

export default MyApp

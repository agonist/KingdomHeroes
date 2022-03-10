import React, {useEffect, useState} from 'react'
import './App.css'
import {Box, Stack} from "@mui/material";
import DialogBox from "./react/components/dialog/Dialog";
import {useAppSelector} from "./react/store/hooks";
import store from "./react/store/store";
import Login from "./react/components/login/Login";
import {BottomDialogActionParams, UI} from "./react/store/ui/UiAction";
import {hideUi} from "./react/store/slices/ui-slice";
import MintHeroes from "./react/components/mint/MintHeroes";
import {ToastContainer} from "react-toastify";
import Layout from "./react/components/Layout";
import {useDispatch} from "react-redux";
import {useAddress, useWeb3Context} from "./react/web3/web3-context";
import phaserGame from "./phaser/PhaserGame";
import {Constants} from "./phaser/Constants";
import Preloader from "./phaser/scenes/Preloader";
import {Web3Params} from "./react/store/utils/params";

function App() {
    const dispatch = useDispatch();
    const address = useAddress();
    const {connect, provider, hasCachedProvider, chainID, connected, web3Modal} = useWeb3Context();
    const [walletChecked, setWalletChecked] = useState(false);

    useEffect(() => {
        if (web3Modal === undefined) return

        console.log(connected)

        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
            console.log("has cached wallet and connected")


        } else {
            setWalletChecked(true);
            console.log("not cached and connected")

        }
    }, [web3Modal]);

    useEffect(() => {
        console.log("address " + address)
        console.log("Connected " + connected)
        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        if (connected) {
            //dispatch(loadApp(p))
        } else {
            // const preloader = phaserGame.scene.getScene(Constants.SCENE_PRELOADER) as Preloader
            // preloader.startMenu()
        }

    }, [connected])


    const uiAction = useAppSelector((state) => state.ui)

    let ui: JSX.Element = <div/>

    function bottomDialog(params: BottomDialogActionParams) {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="flex-end"
                   alignItems="center" paddingBottom={8}>
                <DialogBox messages={params.messages} onClose={() => store.dispatch(hideUi())}/>
            </Stack>
        )
    }

    function login() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="flex-end"
                   alignItems="center" paddingBottom={8}>
                <Login/>
            </Stack>
        )
    }

    function mintHeroes() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <MintHeroes/>
            </Stack>
        )
    }

    if (uiAction.show && uiAction.current) {
        switch (uiAction.current.show) {
            case UI.BOTTOM_DIALOG:
                ui = bottomDialog(uiAction.current.params as BottomDialogActionParams)
                break
            case UI.LOGIN:
                ui = login()
                break
            case UI.MINT_HEROES:
                ui = mintHeroes()
                break
        }
    }

    return (

        <div className="App">
            <Box height="100vh" display="flex" flexDirection="column">


                {ui}


            </Box>
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
        </div>
    )
}

export default App

import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import {Box, Stack} from "@mui/material";
import DialogBox from "./react/components/dialog/Dialog";
import {useAppSelector} from "./react/store/hooks";
import store from "./react/store/store";
import Login from "./react/components/login/Login";
import {BottomDialogActionParams, UI, UiAction} from "./react/store/ui/UiAction";
import {hideUi, showUi} from "./react/store/slices/ui-slice";
import MintHeroes from "./react/components/mint/MintHeroes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAddress, useWeb3Context} from "./react/web3/web3-context";
import {Web3Params} from "./react/store/utils/params";
import MintKeys from "./react/components/mint/MintKeys";
import Inventory from "./react/components/inventory/Inventory";
import Heroes from "./react/components/heroes/Heroes";

function App() {
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
        console.log("address " + address)
        console.log("Connected " + connected)
        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        if (connected) {
            //dispatch(loadApp(p))
        } else {
            // const preloader = phaserGame.scene.getScene(Constants.SCENE_PRELOADER) as PreloaderScene
            // preloader.startMenu()
        }

    }, [connected])

    const uiAction = useAppSelector((state) => state.ui)

    const handleClick = useCallback((e) => {
        if (e.key === 'i') {
            console.log(uiAction)
            if (uiAction.show) {
                store.dispatch(hideUi())
            } else {
                const a: UiAction = {
                    show: UI.INVENTORY,
                    params: undefined
                }
                store.dispatch(showUi(a))
            }
        }

        if (e.key === 'h') {
            console.log(uiAction)
            if (uiAction.show) {
                store.dispatch(hideUi())
            } else {
                const a: UiAction = {
                    show: UI.HEROES,
                    params: undefined
                }
                store.dispatch(showUi(a))
            }
        }

    }, [uiAction]);

    useEffect(() => {
        document.addEventListener("keydown", handleClick, false);

        return () => {
            document.removeEventListener("keydown", handleClick, false);
        };
    }, [uiAction]);


    let ui: JSX.Element = <div/>

    function bottomDialog(params: BottomDialogActionParams) {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="flex-end"
                   alignItems="center" paddingBottom={8}>
                <DialogBox messages={params.messages} title={params.title} onClose={() => store.dispatch(hideUi())}/>
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

    function mintKeys() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <MintKeys/>
            </Stack>
        )
    }

    function inventory() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <Inventory/>
            </Stack>
        )

    }

    function heroes() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <Heroes/>
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
            case UI.MINT_KEYS:
                ui = mintKeys()
                break
            case UI.INVENTORY:
                ui = inventory()
                break
            case UI.HEROES:
                ui = heroes()
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

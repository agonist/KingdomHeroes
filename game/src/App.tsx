/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect} from 'react'
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
import MintKeys from "./react/components/mint/MintKeys";
import Training from "./react/components/training/Training";
import {useDispatch} from "react-redux";
import {Web3Params} from "./react/store/utils/params";
import {initTraining} from "./react/store/slices/training-slice";
import PIC from "./img/banner.webp";
import Startdungeon from "./react/components/dungeon/StartDungeon";
import ContinueDungeon from "./react/components/dungeon/ContinueDungeon";
import {CombatUi} from "./react/components/combat/CombatUi";
import MainMenu from "./react/components/menu/MainMenu";

function App() {
    const {connect, hasCachedProvider, web3Modal, provider, chainID} = useWeb3Context();
    const address = useAddress();
    const dispatch = useDispatch();

    useEffect(() => {
        if (web3Modal === undefined) return

        if (hasCachedProvider()) {
            connect().then(() => {
                // setWalletChecked(true);
            });
        } else {
            // setWalletChecked(true);

        }
    }, [web3Modal]);


    const uiAction = useAppSelector((state) => state.ui)

    const handleClick = useCallback((e) => {
        if (e.key === 'r') {
            if (uiAction.show) {
                store.dispatch(hideUi())
            }
        }

        if (e.key === 'm') {
            if (uiAction.show) {
                store.dispatch(hideUi())
            } else {
                const a: UiAction = {
                    show: UI.MENU,
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
    }, [handleClick, uiAction]);


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
                <div className="video-wrapper">
                    <video
                        width="100%"
                        autoPlay
                        loop
                        muted
                        src={"/intro.webm"}
                    >
                    </video>
                    <div className="header">
                        <Stack>
                            <img src={"logo.webp"}/>
                            <Login/>
                        </Stack>

                    </div>
                </div>
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

    function newDungeon() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <Startdungeon/>
            </Stack>
        )
    }

    function continueDungeon() {
        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <ContinueDungeon/>
            </Stack>
        )
    }

    function training() {
        let web3: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        dispatch(initTraining(web3))

        return (
            <Stack height={"100%"} direction="column"
                   justifyContent="center"
                   alignItems="center">
                <Training/>
            </Stack>
        )
    }

    function combat() {
        return (
            <Stack height={"100%"} width={"100%"} direction="column"
            >
                <CombatUi combatId={1}/>
            </Stack>
        )
    }

    function menu() {
        return (
            <Stack height={"100%"} width={"100%"} direction="column"
            >
                <MainMenu/>
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
            case UI.TRAINING:
                ui = training()
                break
            case UI.NEW_DUNGEON:
                ui = newDungeon()
                break
            case UI.CONTINUE_DUNGEON:
                ui = continueDungeon()
                break
            case UI.COMBAT:
                ui = combat()
                break
            case UI.MENU:
                ui = menu()
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

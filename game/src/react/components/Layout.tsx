import {Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useAddress, useWeb3Context} from "../web3/web3-context";
import {Web3Params} from "../store/utils/params";
import phaserGame from "../../phaser/PhaserGame";
import MainMenu from "../../phaser/scenes/MainMenu";
import Preloader from "../../phaser/scenes/Preloader";
import {Constants} from "../../phaser/Constants";

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

        if (hasCachedProvider() && connected) {
            connect().then(() => {
                setWalletChecked(true);
            });
            console.log("has cached wallet and connected")
            // redirect to login

        } else {
            setWalletChecked(false);
            console.log("not cached and connected")
            const preloader = phaserGame.scene.getScene(Constants.SCENE_PRELOADER) as Preloader
            preloader.startMenu()
        }
    }, [web3Modal, connected]);

    // useEffect(() => {
    //     let p: Web3Params = {
    //         networkID: chainID, provider: provider, address: address
    //     }
    //     if (connected) {
    //         console.log("connected")
    //         //dispatch(loadApp(p))
    //     } else {
    //         console.log("not connected")
    //     }
    //
    // }, [connected])


    return (
        {children}
    )
}

export default Layout

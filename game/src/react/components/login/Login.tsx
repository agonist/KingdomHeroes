import {Button, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {initUser} from "../../store/slices/user-slice";
import ConnectButton from "./ConnectButton";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useEffect, useState} from "react";
import {DEFAULD_NETWORK} from "../../web3/blockchain";
import {Web3Params} from "../../store/utils/params";


export default function Login() {

    const address = useAddress();

    const {connect, disconnect, connected, web3, providerChainID, chainID, provider} = useWeb3Context();
    const [isConnected, setConnected] = useState(connected);

    const dispatch = useDispatch()

    async function login() {
        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        await dispatch(initUser(p))
    }

    if (isConnected && providerChainID !== DEFAULD_NETWORK) {

    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);


    if (isConnected) {
        return (
            <Stack>
                <Button
                    variant="contained"
                    sx={{borderRadius: 0, borderColor: 'white', borderWidth: 2}}
                    onClick={() => login()}>
                    <Typography variant={"button"}>Play game</Typography>
                </Button>

                <Button
                    onClick={() => disconnect()}>
                    <Typography variant={"button"}>Logout</Typography>
                </Button>
            </Stack>
        )
    }

    if (!isConnected) {
        return (
            <Stack>
                <Button
                    variant="contained"
                    sx={{borderRadius: 0, borderColor: 'white', borderWidth: 2}}
                    onClick={() => connect()}>
                    <Typography variant={"button"}>Connect Wallet</Typography>
                </Button>
            </Stack>
        )
    }


    return (
        <Stack>

        </Stack>

    );

}

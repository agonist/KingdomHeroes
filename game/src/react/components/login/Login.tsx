import {Button, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {initUser} from "../../store/slices/user-slice";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useEffect, useState} from "react";
import {DEFAULT_NETWORK} from "../../web3/blockchain";
import {Web3Params} from "../../store/utils/params";
import PIC from "../../../img/banner.webp";

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

    if (isConnected && providerChainID !== DEFAULT_NETWORK) {

    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    if (isConnected) {
        return (
            <Stack paddingBottom={14} alignItems={"center"} spacing={2}>
                <Button
                    variant="contained"
                    sx={{
                        border: "solid",
                        backgroundColor: "#276690",
                        borderWidth: "4px",
                        boxShadow: "inset 0 1px 10px black, inset 0 -2px 10px black",
                        borderRadius: 0,
                        borderColor: "#579AF7",
                        width: 300,
                        height: 70
                    }}

                    onClick={() => login()}>
                    <Typography variant={"button"} fontSize={24}>Play game</Typography>
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        border: "solid",
                        backgroundColor: "#276690",
                        borderWidth: "4px",
                        boxShadow: "inset 0 1px 10px black, inset 0 -2px 10px black",
                        borderRadius: 0,
                        borderColor: "#579AF7",
                        width: 200,
                        height: 50
                    }}
                    onClick={() => disconnect()}>
                    <Typography variant={"button"}>Logout</Typography>
                </Button>
            </Stack>
        )
    }

    if (!isConnected) {
        return (
            <Stack paddingBottom={18}>
                <Button
                    variant="contained"
                    sx={{
                        border: "solid",
                        backgroundColor: "#276690",
                        borderWidth: "4px",
                        boxShadow: "inset 0 1px 10px black, inset 0 -2px 10px black",
                        borderRadius: 0,
                        borderColor: "#579AF7",
                        width: 300,
                        height: 70
                    }}
                    onClick={() => connect()}>
                    <Typography fontSize={24} variant={"button"}>Connect Wallet</Typography>
                </Button>
            </Stack>
        )
    }


    return (
        <Stack>

        </Stack>

    );

}

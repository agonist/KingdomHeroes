import {Button, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {initUser} from "../../store/slices/user-slice";
import ConnectButton from "./ConnectButton";
import {useWeb3Context} from "../../web3/web3-context";
import {useEffect} from "react";
import {Web3Params} from "../../../../../frontend/src/store/utils/params";


export default function Login() {
    const {address, provider, chainID, connected, web3Modal} = useWeb3Context();

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(connected)
        if (connected) {
            let p: Web3Params = {
                networkID: chainID, provider: provider, address: address
            }

            login(p).then(r => {
            })
        }
    }, [connected])

    async function login(p: Web3Params) {
        console.log("tooooo")
        await dispatch(initUser(p))
    }

    return (
        <Stack>

            <ConnectButton/>

        </Stack>
    )

}

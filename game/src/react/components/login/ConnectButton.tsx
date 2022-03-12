import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import {DEFAULT_NETWORK} from "../../web3/blockchain";
import {useWeb3Context} from "../../web3/web3-context";

function ConnectMenu() {
    const {connect, disconnect, connected, web3, providerChainID, checkWrongNetwork} = useWeb3Context();
    const [isConnected, setConnected] = useState(connected);

    let buttonText = "Connect Wallet";
    let clickFunc: any = connect;
    let error = false;

    if (isConnected) {
        buttonText = "Disconnect";
        clickFunc = disconnect;
    }

    if (isConnected && providerChainID !== DEFAULT_NETWORK) {
        buttonText = "Wrong network";
        error = true
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        <Button
            variant="contained"
            color={error ? 'error' : 'primary'}
            sx={{borderRadius: 0, borderColor: 'white', borderWidth: 2}}
            onClick={() => clickFunc()}>
            <Typography variant={"button"}>{buttonText}</Typography>
        </Button>
    );
}

export default ConnectMenu;

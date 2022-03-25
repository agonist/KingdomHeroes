import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../store/hooks";
import {useDispatch} from "react-redux";
import {mintKeys, mintKeysPresale} from "../../store/slices/keys-mint-slice";
import {Web3Params} from "../../store/utils/params";
import {hideUi} from "../../store/slices/ui-slice";
import {CustomColor} from "../../MuiTheme";
import {GuiStyles} from "../Styles";


function MintHeroesRoot() {
    const dispatch = useDispatch();
    const classes = GuiStyles();

    const {provider, chainID} = useWeb3Context();
    const address = useAddress();

    const keysMint = useAppSelector((state) => state.keysMint)

    async function mintSale() {
        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        if (keysMint.presaleActive) await dispatch(mintKeysPresale(p))
        if (keysMint.saleActive) await dispatch(mintKeys(p))
    }

    if (keysMint.loading) {
        return (
            <CircularProgress/>
        )
    }

    // presale active but not whitelisted
    if (keysMint.presaleActive && !keysMint.whitelisted) {
        return (
            <Stack alignItems="center" spacing={3}>
                <Typography color={"white"}>Sorry you are not whitelisted for presale</Typography>
                <Button onClick={() => dispatch(hideUi())}>Close</Button>
            </Stack>
        )
    }

    if (keysMint.saleActive || (keysMint.presaleActive && keysMint.whitelisted)) {
        let saletxt = "PRE-SALE"
        if (keysMint.saleActive) {
            saletxt = "SALE"
        }

        return (
            <Stack alignItems="center" width={window.innerWidth / 2.7}
                   height={window.innerHeight / 1.3}>
                <Typography color={CustomColor.fontYellow} variant={"h3"} paddingY={2}>KEYS {saletxt}</Typography>

                <Stack sx={{backgroundColor: CustomColor.midBg}} width={"100%"} height={"100%"} paddingY={3}
                       alignItems={"center"} spacing={2}>
                    <Typography variant={"body1"} color={"white"}>
                        GM ADVENTURER, <br/>WELCOME TO THE KINGDOM KEYS MINT. <br/> MINTING A KEY WILL GUARANTEE YOU
                        ACCESS TO THE HEROES WHITELIST,<br/> TWO FREE HEROES, A BONUS YIELD AND MUCH MORE.
                    </Typography>

                    <Typography color={"white"} paddingTop={4} variant={"h4"}>{keysMint.currentMinted} / 500 KEYS
                        MINTED</Typography>

                    <Stack direction={"row"} spacing={2} paddingTop={4} paddingBottom={4}>

                        <Typography color={"white"}>1 MAX PER WALLET</Typography>

                    </Stack>

                    <Button className={classes.button} variant={"contained"} onClick={mintSale}>Mint
                        for {keysMint.mintTotalPrice.toFixed(2)} ETH</Button>

                    <Button onClick={() => dispatch(hideUi())}>
                        <Typography variant={"button"} color={"white"}>NO THANKS</Typography>
                    </Button>
                </Stack>


            </Stack>
        )
    }

    // No sale active
    return (
        <Stack>
            <Typography color={"white"}>No sale currently active</Typography>
            <Button onClick={() => dispatch(hideUi())}>Close</Button>
        </Stack>
    )
}

export default MintHeroesRoot

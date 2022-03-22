import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../store/hooks";
import {useDispatch} from "react-redux";
import {mintKeys, mintKeysPresale} from "../../store/slices/keys-mint-slice";
import {Web3Params} from "../../store/utils/params";
import {hideUi} from "../../store/slices/ui-slice";


function MintHeroesRoot() {
    const dispatch = useDispatch();

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
        let saletxt = "Pre-Sale"
        if (keysMint.saleActive) {
            saletxt = "Sale"
        }

        return (
            <Stack alignItems="center" spacing={2}>
                <Typography color={"white"} variant={"h2"}>Keys {saletxt}</Typography>
                <Typography variant={"body1"} color={"white"}>
                    GM adventurer, <br/>welcome to the Kingdom Keys mint. <br/> Minting a key will give you guaranteed
                    access to the Heroes Whitelist,<br/> a bonus yield and much more.
                </Typography>

                <Typography color={"white"} paddingTop={2} variant={"h4"}>{keysMint.currentMinted} / 500 Keys
                    minted</Typography>

                <Stack direction={"row"} spacing={2}>

                    <Typography color={"white"}>1 per wallet max</Typography>

                </Stack>

                <Button variant="contained" onClick={mintSale}>Mint
                    for {keysMint.mintTotalPrice.toFixed(2)} ETH</Button>
                <Button onClick={() => dispatch(hideUi())}>Close</Button>
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

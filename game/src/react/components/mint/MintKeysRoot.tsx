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
                <Typography>Sorry you are not whitelisted for presale</Typography>
            </Stack>
        )
    }

    if (keysMint.saleActive || (keysMint.presaleActive && keysMint.whitelisted)) {
        return (
            <Stack alignItems="center" spacing={2}>
                <Typography variant={"h2"}>Keys Pre-Sale</Typography>
                <Typography variant={"body1"}>
                    GM adventurer, <br/>I'm the cool NPC that will sell you keys
                </Typography>

                <Typography paddingTop={2} variant={"h4"}>{keysMint.currentMinted} / 500 Keys minted</Typography>

                <Stack direction={"row"} spacing={2}>


                    <Typography>1 per wallet</Typography>


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
            <Typography>No sale currently active</Typography>
        </Stack>
    )
}

export default MintHeroesRoot

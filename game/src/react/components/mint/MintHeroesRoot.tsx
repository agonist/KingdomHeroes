import {Button, CircularProgress, Fab, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../store/hooks";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from "react-redux";
import {mint, mintAmountMinus, mintAmountPlus, mintPresale} from "../../store/slices/heroes-mint-slice";
import {Web3Params} from "../../store/utils/params";
import {hideUi} from "../../store/slices/ui-slice";


function MintHeroesRoot() {
    const dispatch = useDispatch();

    const {provider, chainID} = useWeb3Context();
    const address = useAddress();

    const heroesMint = useAppSelector((state) => state.heroesMint)


    async function mintPlus() {
        let maxMint = 10
        if (heroesMint.presaleActive) {
            maxMint = 2
        }

        if (heroesMint.mintAmount < maxMint)
            await dispatch(mintAmountPlus())
    }

    async function mintMinus() {
        await dispatch(mintAmountMinus())
    }

    async function mintSale() {
        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        if (heroesMint.presaleActive) await dispatch(mintPresale(p))
        if (heroesMint.saleActive) await dispatch(mint(p))
    }

    if (heroesMint.loading) {
        return (
            <CircularProgress/>
        )
    }

    // presale active but not whitelisted
    if (heroesMint.presaleActive && !heroesMint.whitelisted) {
        return (
            <Stack alignItems="center" spacing={3}>
                <Typography color={"white"}>Sorry you are not whitelisted for presale</Typography>
                <Button onClick={() => dispatch(hideUi())}>Close</Button>

            </Stack>
        )
    }

    if (heroesMint.saleActive || (heroesMint.presaleActive && heroesMint.whitelisted)) {
        let saletxt = "Pre-Sale"
        if (heroesMint.saleActive) {
            saletxt = "Sale"
        }

        return (
            <Stack alignItems="center" spacing={2}>
                <Typography color={"white"} variant={"h2"}>Heroes {saletxt}</Typography>
                <Typography color={"white"} variant={"body1"}>
                    GM adventurer, <br/>Welcome to the Heroes mint.<br/>Kingdom Keys holders will get a free hero<br/>
                    automatically during the presale.
                </Typography>

                <Typography color={"white"} paddingTop={2} variant={"h4"}>{heroesMint.currentMinted} / 10000 Heroes
                    minted</Typography>

                <Stack direction={"row"} spacing={2}>
                    <Fab size="small" aria-label="remove" onClick={mintMinus}>
                        <RemoveIcon/>
                    </Fab>

                    <Typography color={"white"}>{heroesMint.mintAmount}</Typography>

                    <Fab size="small" aria-label="add" onClick={mintPlus}>
                        <AddIcon/>
                    </Fab>
                </Stack>

                <Button variant="contained" onClick={mintSale}>Mint
                    for {heroesMint.mintTotalPrice.toFixed(2)} ETH</Button>
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

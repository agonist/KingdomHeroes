import {Button, CircularProgress, Fab, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../hooks/hooks";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from "react-redux";
import {mint, mintAmountMinus, mintAmountPlus, mintPresale} from "../../store/heroes-mint-slice";
import {Web3Params} from "../../store/utils/params";


function MintRoot() {
    const dispatch = useDispatch();

    const {provider, chainID} = useWeb3Context();
    const address = useAddress();

    const heroesMint = useAppSelector((state) => state.heroesMint)


    async function mintPlus() {
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
                <Typography>Sorry you are not whitelisted for presale</Typography>
            </Stack>
        )
    }

    if (heroesMint.saleActive || (heroesMint.presaleActive && heroesMint.whitelisted)) {
        return (
            <Stack alignItems="center" spacing={3}>
                <Typography variant={"h4"}>Pre-Sale</Typography>

                <Typography variant={"h4"}>{heroesMint.currentMinted} / 10000 Heroes minted</Typography>
                <Stack direction={"row"} spacing={2}>
                    <Fab size="small" aria-label="remove" onClick={mintMinus}>
                        <RemoveIcon/>
                    </Fab>

                    <Typography>{heroesMint.mintAmount}</Typography>

                    <Fab size="small" aria-label="add" onClick={mintPlus}>
                        <AddIcon/>
                    </Fab>
                </Stack>

                <Button variant="contained" onClick={mintSale}>Mint
                    for {heroesMint.mintTotalPrice.toFixed(2)} ETH</Button>
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

export default MintRoot

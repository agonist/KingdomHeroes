import {Button, CircularProgress, Fab, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../hooks/hooks";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from "react-redux";
import {mintKeys, mintAmountMinus, mintAmountPlus, mintPresaleKeys} from "../../store/keys-mint-slice";
import {Web3Params} from "../../store/utils/params";


function MintKeysRoot() {
    const dispatch = useDispatch();

    const {provider, chainID} = useWeb3Context();
    const address = useAddress();

    const keysMint = useAppSelector((state) => state.keysMint)


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
        if (keysMint.presaleActive) await dispatch(mintPresaleKeys(p))
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
            <Stack alignItems="center" spacing={3}>
                <Typography variant={"h4"}>Pre-Sale</Typography>

                <Typography variant={"h4"}>{keysMint.currentMinted} / 500 Kingdom Keys minted</Typography>
                <Stack direction={"row"} spacing={2}>
                    <Fab size="small" aria-label="remove" onClick={mintMinus}>
                        <RemoveIcon/>
                    </Fab>

                    <Typography>{keysMint.mintAmount}</Typography>

                    <Fab size="small" aria-label="add" onClick={mintPlus}>
                        <AddIcon/>
                    </Fab>
                </Stack>

                <Button variant="contained" onClick={mintSale}>Mint
                    for {keysMint.mintTotalPrice.toFixed(2)} ETH</Button>
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

export default MintKeysRoot

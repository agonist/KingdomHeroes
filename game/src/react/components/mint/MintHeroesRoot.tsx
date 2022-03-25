import {Button, CircularProgress, Fab, Stack, Typography} from "@mui/material";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useAppSelector} from "../../store/hooks";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from "react-redux";
import {mint, mintAmountMinus, mintAmountPlus, mintPresale} from "../../store/slices/heroes-mint-slice";
import {Web3Params} from "../../store/utils/params";
import {hideUi} from "../../store/slices/ui-slice";
import {CustomColor} from "../../MuiTheme";
import {GuiStyles} from "../Styles";


function MintHeroesRoot() {
    const dispatch = useDispatch();
    const classes = GuiStyles();

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
        let saletxt = "PRE-SALE"
        if (heroesMint.saleActive) {
            saletxt = "SALE"
        }

        return (
            <Stack alignItems="center" width={window.innerWidth / 2.7}
                   height={window.innerHeight / 1.3}>
                <Typography color={CustomColor.fontYellow} variant={"h3"} paddingY={2}>HEROES {saletxt}</Typography>

                <Stack sx={{backgroundColor: CustomColor.midBg}} width={"100%"} height={"100%"} paddingY={3}
                       alignItems={"center"} spacing={2}>
                    <Typography color={"white"} variant={"body1"}>
                        GM ADVENTURER, <br/>WELCOME TO THE HEROES MINT.<br/>KINGDOM KEYS HOLDERS WILL GET TWO FREE
                        HEROES<br/>
                        AUTOMATICALLY DURING THE PRESALE.
                    </Typography>

                    <Typography color={"white"} paddingTop={4} variant={"h4"}>{heroesMint.currentMinted} / 10000 HEROES
                        MINTED</Typography>

                    <Stack direction={"row"} spacing={2} paddingY={3}>
                        <Fab size="small" aria-label="remove" onClick={mintMinus}>
                            <RemoveIcon/>
                        </Fab>

                        <Typography color={"white"}>{heroesMint.mintAmount}</Typography>

                        <Fab size="small" aria-label="add" onClick={mintPlus}>
                            <AddIcon/>
                        </Fab>
                    </Stack>

                    <Button className={classes.button} variant={"contained"} onClick={mintSale}>Mint
                        for {heroesMint.mintTotalPrice.toFixed(2)} ETH</Button>
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

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Web3Params} from "../utils/params";
import {setAll} from "../utils/set-all";
import {getAddresses} from "../../web3/contractsAddresses";
import {ethers} from "ethers";
import {default as KingdomKeys} from '../../abi/KingdomKeys.json';
import store, {RootState} from "../store";
import {toast} from "react-toastify";
import {sleep} from "../utils/sleep";
import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";
import {refreshUser} from "./user-slice";
import {hideUi} from "./ui-slice";

const whitelist = ["0xE032d90BE017B57118eAafaA5826De494D73E39b", "0xE032d90BE017B57118eAafaA5826De494D73E392", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
});

export interface KeysMintSlice {
    loading: boolean,
    presaleActive: boolean,
    saleActive: boolean,
    currentMinted: number,
    whitelisted: boolean,
    mintAmount: number,
    mintTotalPrice: number,
    mintPrice: number
}

const initialState: KeysMintSlice = {
    loading: true,
    presaleActive: false,
    saleActive: false,
    currentMinted: 0,
    whitelisted: false,
    mintAmount: 1,
    mintTotalPrice: 0,
    mintPrice: 0
}

export const loadKeysMintDetails = createAsyncThunk("keysMint/init",
    async (params: Web3Params): Promise<KeysMintSlice> => {

        const contracts = getAddresses(params.networkID);

        let presaleActive = false
        let saleActive = false
        let currentMinted = 0
        let whitelisted = false
        let mintPrice = 0


        try {
            const keysContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider)

            presaleActive = await keysContract.presaleActive()
            saleActive = await keysContract.saleActive()
            const minted = await keysContract.totalSupply()
            currentMinted = minted.toNumber()

            if (presaleActive) mintPrice = 0.03
            if (saleActive) mintPrice = 0.05

            const hexProof = merkleTree.getHexProof(keccak256(params.address.toString()));
            whitelisted = hexProof.length > 0

        } catch (e) {
            console.log(e)
        }

        return {
            loading: false,
            presaleActive: presaleActive,
            saleActive: saleActive,
            currentMinted: currentMinted,
            whitelisted: whitelisted,
            mintAmount: initialState.mintAmount,
            mintTotalPrice: mintPrice,
            mintPrice: mintPrice
        }
    }
)

export const mintKeysPresale = createAsyncThunk("keysMint/mintPresale",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const root = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Heroes')
            const hexProof = merkleTree.getHexProof(keccak256(params.address.toString()));

            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(root.heroesMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await royalKingdomContract.mintPresale(hexProof, {value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(2);
        await thunkApi.dispatch(loadKeysMintDetails({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        await sleep(2);
        await thunkApi.dispatch(refreshUser({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        store.dispatch(hideUi())

        toast.dismiss()
        toast.success('Minting success')

    })

export const mintKeys = createAsyncThunk("keysMint/mint",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const state = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Heroes')

            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(state.heroesMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await royalKingdomContract.mint({value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(5);
        await thunkApi.dispatch(loadKeysMintDetails({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Minting success')

    })


const keysMintSlice = createSlice({
    name: "keysMint",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadKeysMintDetails.pending, state => {
                state.loading = true
            })
            .addCase(loadKeysMintDetails.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(loadKeysMintDetails.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})
export const {} = keysMintSlice.actions

export default keysMintSlice.reducer

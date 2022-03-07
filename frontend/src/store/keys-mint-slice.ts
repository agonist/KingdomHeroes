import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Web3Params} from "./utils/params";
import {setAll} from "./utils/set-all";
import {getAddresses} from "../web3/contractsAddresses";
import {ethers} from "ethers";
import {default as KingdomKeys} from '../abi/KingdomKeys.json';
import {RootState} from "./store";
import {toast} from "react-toastify";
import {sleep} from "./utils/sleep";
import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";


type Data = {
    proof: string
}

const whitelist = ["0xE032d90BE017B57118eAafaA5826De494D73E39b", "0xE032d90BE017B57118eAafaA5826De494D73E392", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
});

export interface keysMintSlice {
    loading: boolean,
    presaleActive: boolean,
    saleActive: boolean,
    currentMinted: number,
    whitelisted: boolean,
    mintAmount: number,
    mintTotalPrice: number,
    mintPrice: number
}

const initialState: keysMintSlice = {
    loading: true,
    presaleActive: false,
    saleActive: false,
    currentMinted: 0,
    whitelisted: false,
    mintAmount: 1,
    mintTotalPrice: 0,
    mintPrice: 0
}

export const loadKeysMintInfos = createAsyncThunk("keysMint/init",
    async (params: Web3Params): Promise<keysMintSlice> => {

        const contracts = getAddresses(params.networkID);

        let presaleActive = false
        let saleActive = false
        let currentMinted = 0
        let whitelisted = false
        let mintPrice = 0

        try {
            const kingdomKeysContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider)

            presaleActive = await kingdomKeysContract.presaleActive()
            saleActive = await kingdomKeysContract.saleActive()
            const minted = await kingdomKeysContract.totalSupply()
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

export const mintPresaleKeys = createAsyncThunk("keysMint/mintPresaleKeys",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const state = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Keys')
            const hexProof = merkleTree.getHexProof(keccak256(params.address.toString()));

            const kingdomKeysContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(state.keysMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await kingdomKeysContract.mintPresale(state.keysMint.mintAmount, hexProof, {value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(5);
        await thunkApi.dispatch(loadKeysMintInfos({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Minting success')

    })

export const mintKeys = createAsyncThunk("keysMint/mintKeys",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const state = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Keys')

            const kingdomKeysContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(state.keysMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await kingdomKeysContract.mint(state.keysMint.mintAmount, {value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(5);
        await thunkApi.dispatch(loadKeysMintInfos({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Minting success')

    })


const keysMintSlice = createSlice({
    name: "keys",
    initialState,
    reducers: {
        mintAmountPlus: (state) => {
            if (state.mintAmount < 10)
                state.mintAmount += 1

            state.mintTotalPrice = (state.mintAmount * state.mintPrice)
        },
        mintAmountMinus: (state) => {
            if (state.mintAmount > 1)
                state.mintAmount -= 1


            state.mintTotalPrice = (state.mintAmount * state.mintPrice)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadKeysMintInfos.pending, state => {
                state.loading = true
            })
            .addCase(loadKeysMintInfos.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(loadKeysMintInfos.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})
export const {mintAmountPlus, mintAmountMinus} = keysMintSlice.actions

export default keysMintSlice.reducer

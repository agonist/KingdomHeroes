import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Web3Params} from "../utils/params";
import {setAll} from "../utils/set-all";
import {getAddresses} from "../../web3/contractsAddresses";
import {ethers} from "ethers";
import {default as KingdomHeroes} from '../../abi/KingdomHeroes.json';
import store, {RootState} from "../store";
import {toast} from "react-toastify";
import {sleep} from "../utils/sleep";
import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";
import {refreshUser} from "./user-slice";
import {hideUi} from "./ui-slice";

const whitelist = [
    "0xCBaE0841D72C6e1BDC4e3a85Dea5497822F27d18",
    "0xE032d90BE017B57118eAafaA5826De494D73E392",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0xcF6c12BC62604207eBF7c95efd77c8B18519a6e1",
    "0xE032d90BE017B57118eAafaA5826De494D73E39b",
];
const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
});

export interface HeroesMintSlice {
    loading: boolean,
    presaleActive: boolean,
    saleActive: boolean,
    currentMinted: number,
    whitelisted: boolean,
    mintAmount: number,
    mintTotalPrice: number,
    mintPrice: number
}

const initialState: HeroesMintSlice = {
    loading: true,
    presaleActive: false,
    saleActive: false,
    currentMinted: 0,
    whitelisted: false,
    mintAmount: 1,
    mintTotalPrice: 0,
    mintPrice: 0
}

export const loadHeroesMintDetails = createAsyncThunk("heroesMint/init",
    async (params: Web3Params): Promise<HeroesMintSlice> => {

        const contracts = getAddresses(params.networkID);

        let presaleActive = false
        let saleActive = false
        let currentMinted = 0
        let whitelisted = false
        let mintPrice = 0


        try {
            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider)

            presaleActive = await royalKingdomContract.presaleActive()
            saleActive = await royalKingdomContract.saleActive()
            const minted = await royalKingdomContract.totalSupply()
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

export const mintPresale = createAsyncThunk("heroesMint/mintPresale",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const root = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Heroes')
            const hexProof = merkleTree.getHexProof(keccak256(params.address.toString()));

            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(root.heroesMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await royalKingdomContract.mintPresale(root.heroesMint.mintAmount, hexProof, {value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(2);
        await thunkApi.dispatch(loadHeroesMintDetails({
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

export const mint = createAsyncThunk("heroesMint/mint",
    async (params: Web3Params, thunkApi) => {
        const contracts = getAddresses(params.networkID);
        const state = thunkApi.getState() as RootState

        try {
            toast.loading('Minting Kingdom Heroes')

            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider.getSigner())
            let price = ethers.utils.parseUnits(state.heroesMint.mintTotalPrice.toFixed(2), 'ether');
            let tx;
            tx = await royalKingdomContract.mint(state.heroesMint.mintAmount, {value: price})
            await tx.wait()

        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Minting Failed')
            return
        }

        await sleep(5);
        await thunkApi.dispatch(loadHeroesMintDetails({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Minting success')

    })


const heroesMintSlice = createSlice({
    name: "heroesMint",
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
            .addCase(loadHeroesMintDetails.pending, state => {
                state.loading = true
            })
            .addCase(loadHeroesMintDetails.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(loadHeroesMintDetails.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})
export const {mintAmountPlus, mintAmountMinus} = heroesMintSlice.actions

export default heroesMintSlice.reducer

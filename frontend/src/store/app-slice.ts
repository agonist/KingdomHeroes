import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Web3Params} from "./utils/params";
import {setAll} from "./utils/set-all";
import {getAddresses} from "../web3/contractsAddresses";
import {ethers} from "ethers";
import {default as RoyalKingdom} from '../../src/abi/RoyalKingdom.json';

export interface AppSlice {
    loading: boolean,
    presaleActive: boolean,
    saleActive: boolean,
    currentMinted: number
}

const initialState: AppSlice = {
    loading: true,
    presaleActive: false,
    saleActive: false,
    currentMinted: 0
}

export const loadApp = createAsyncThunk("app/init",
    async (params: Web3Params): Promise<AppSlice> => {

        const contracts = getAddresses(params.networkID);

        let presaleActive = false
        let saleActive = false
        let currentMinted = 0


        try {
            const royalKingdomContract = new ethers.Contract(contracts.ROYAL_KINGDOM, RoyalKingdom.abi, params.provider)

            presaleActive = await royalKingdomContract.presaleActive()
            saleActive = await royalKingdomContract.saleActive()
            currentMinted = await royalKingdomContract.totalSupply()

        } catch (e) {
            console.log(e)
        }

        return {
            loading: false,
            presaleActive: presaleActive,
            saleActive: saleActive,
            currentMinted: currentMinted
        }
    }
)


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadApp.pending, state => {
                state.loading = true
            })
            .addCase(loadApp.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(loadApp.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})

export default appSlice.reducer
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TrainParams, Web3Params} from "../utils/params";
import {getAddresses} from "../../web3/contractsAddresses";
import {default as KingdomTraining} from "../../abi/KingdomTrainingETH.json";
import {ethers} from "ethers";
import {toast} from "react-toastify";
import {sleep} from "../utils/sleep";
import {refreshUser} from "./user-slice";
import {default as KingdomHeroes} from "../../abi/KingdomHeroes.json";
import {default as KingdomKeys} from "../../abi/KingdomKeys.json";
import {setAll} from "../utils/set-all";

interface TrainingState {
    stateLoading: boolean,
    heroesNeedApproval: boolean,
    keysNeedApproval: boolean,
    heroesSelected: number[],
    keyAmount: number
}

const initialState: TrainingState = {
    stateLoading: true,
    heroesNeedApproval: true,
    keysNeedApproval: true,
    heroesSelected: [],
    keyAmount: 0,
}

export const initTraining = createAsyncThunk("training/init",
    async (params: Web3Params, thunkApi): Promise<TrainingState> => {
        const contracts = getAddresses(params.networkID);
        console.log("Pass here")

        let heroesApproved
        let keysApproved

        try {
            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider.getSigner())
            const keyContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())

            heroesApproved = await royalKingdomContract.isApprovedForAll(params.address, contracts.KINGDOM_TRAINING_ETH)
            keysApproved = await keyContract.isApprovedForAll(params.address, contracts.KINGDOM_TRAINING_ETH)

        } catch (e) {
            console.log(e)
        }

        return {
            stateLoading: false,
            heroesNeedApproval: !heroesApproved,
            keysNeedApproval: !keysApproved,
            heroesSelected: [],
            keyAmount: 0
        }
    })

export const approveHeroes = createAsyncThunk("training/approveHeroes",
    async (params: Web3Params, thunkApi): Promise<void> => {
        const contracts = getAddresses(params.networkID);
        try {
            toast.loading('Approving Heroes')

            const royalKingdomContract = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider.getSigner())
            let tx = await royalKingdomContract.setApprovalForAll(contracts.KINGDOM_TRAINING_ETH, true)
            await tx.wait()
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Approving Failed')
            return
        }

        await sleep(3);
        await thunkApi.dispatch(initTraining({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Approving success')
    })

export const approveKeys = createAsyncThunk("training/approveKeys",
    async (params: Web3Params, thunkApi): Promise<void> => {
        const contracts = getAddresses(params.networkID);

        try {
            toast.loading('Approving Keys')

            const keyContract = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKeys.abi, params.provider.getSigner())
            let tx = await keyContract.setApprovalForAll(contracts.KINGDOM_TRAINING_ETH, true)
            await tx.wait()
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Approving Failed')
            return
        }

        await sleep(3);
        await thunkApi.dispatch(initTraining({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        toast.dismiss()
        toast.success('Approving success')
    })


export const trainNFT = createAsyncThunk("training/train",
    async (params: TrainParams, thunkApi): Promise<void> => {
        const contracts = getAddresses(params.web3.networkID);


        try {
            toast.loading('Training')

            const trainingContract = new ethers.Contract(contracts.KINGDOM_TRAINING_ETH, KingdomTraining.abi, params.web3.provider.getSigner())

            let tx = await trainingContract.bulkStake(params.heroes, params.keys)
            await tx.wait()
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('Training Failed')
            return
        }

        await sleep(3);
        await thunkApi.dispatch(refreshUser({
            address: params.web3.address,
            networkID: params.web3.networkID,
            provider: params.web3.provider
        }))

        toast.dismiss()
        toast.success('Training success')
    })

export const untrainNFT = createAsyncThunk("training/untrain",
    async (params: TrainParams, thunkApi): Promise<void> => {
        const contracts = getAddresses(params.web3.networkID);


        try {
            toast.loading('UnTraining')

            const trainingContract = new ethers.Contract(contracts.KINGDOM_TRAINING_ETH, KingdomTraining.abi, params.web3.provider.getSigner())

            let tx = await trainingContract.bulkUnstake(params.heroes, params.keys)
            await tx.wait()
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error('UnTraining Failed')
            return
        }

        await sleep(3);
        await thunkApi.dispatch(refreshUser({
            address: params.web3.address,
            networkID: params.web3.networkID,
            provider: params.web3.provider
        }))

        toast.dismiss()
        toast.success('UnTraining success')
    })

const trainingSlice = createSlice({
    name: 'training-slice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initTraining.pending, state => {
                state.stateLoading = true
            })
            .addCase(initTraining.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.stateLoading = false
            })
            .addCase(initTraining.rejected, (state, {error}) => {
                state.stateLoading = false
                console.log(error)
            })
    }
})


export default trainingSlice.reducer

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {default as KingdomHeroes} from "../../abi/KingdomHeroes.json";
import {default as KingdomKey} from "../../abi/KingdomKeys.json";
import {BigNumber, ethers} from "ethers";
import {setAll} from "../utils/set-all";
import phaserGame from "../../../phaser/PhaserGame";
import MainMenuScene from "../../../phaser/scenes/MainMenuScene";
import {getAddresses} from "../../web3/contractsAddresses";
import {Web3Params} from "../utils/params";
import axios from "axios";
import store, {RootState} from "../store";
import {hideUi} from "./ui-slice";
import {loadHeroesMintDetails} from "./heroes-mint-slice";
import {Constants} from "../../../phaser/Constants";
import {loadKeysMintDetails} from "./keys-mint-slice";
import {buildInventory, InventoryItem} from "../../model/inventory";
import {MetadataModel} from "../../model/metadata";
import {default as KingdomTraining} from "../../abi/KingdomTrainingETH.json";

interface UserState {
    loading: boolean,
    address: String,
    heroesIds: number[],
    keysAmount: number,
    stakedHeroesIds: number[],
    stakedKeysAmount: number,
    canMint: boolean,
    inventory: Array<InventoryItem>,
    heroes: Array<MetadataModel>
}

const initialState: UserState = {
    loading: false,
    address: "",
    heroesIds: [],
    keysAmount: 0,
    stakedHeroesIds: [],
    stakedKeysAmount: 0,
    canMint: false,
    inventory: [],
    heroes: []
}


export class API {

    BASE_RUL?: string = process.env.REACT_APP_API

    async getNonce(address: string): Promise<string | undefined> {
        try {
            const response = await axios.get(this.BASE_RUL + "/auth/" + address + "/nonce")
            return response.data.nonce
        } catch (error) {
            console.log(error)
        }

    }

    async login(address: string, signature: string): Promise<string | undefined> {
        try {
            const response = await axios.post(this.BASE_RUL + "/auth/login", {
                address: address,
                signature: signature
            })
            return response.data.access_token
        } catch (e) {
            console.log(e)
        }
    }

    async getMetadata(ids: number[]): Promise<MetadataModel[] | undefined> {
        try {
            const response = await axios.post<MetadataModel[]>(this.BASE_RUL + "/metadata/ids", {ids: ids})
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getYield(address: string) : Promise<string | undefined> {
        try {
            const response = await axios.get(this.BASE_RUL + "/metadata/yield/" + address)
            return response.data.totalYield
        } catch (e) {
            console.log(e)
        }
    }
}

const api = new API()

export const initUser = createAsyncThunk("user/init",
    async (params: Web3Params
        , thunkAPI): Promise<UserState> => {

        const contracts = getAddresses(params.networkID);

        let idsArray: number[] = []
        let inventory: Array<InventoryItem> = []
        let heroes: Array<MetadataModel> = []
        let stakedHeroesIds = []
        let stakedKeysAmout = 0
        let keyAmount

        try {

            const token = localStorage.getItem("auth_token")
            if (!token) {

                const nonce = await api.getNonce(params.address)
                if (!nonce) {
                    return Promise.reject("Get nonce error")
                }

                let signature = await params.provider.getSigner(params.address).signMessage(nonce)

                const authToken = await api.login(params.address, signature)
                console.log(authToken)
                if (!authToken) {
                    return Promise.reject()
                }

                localStorage.setItem("auth_token", authToken)

            }

            const kingdomHeroes = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider);
            const trainingContract = new ethers.Contract(contracts.KINGDOM_TRAINING_ETH, KingdomTraining.abi, params.provider)

            const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(params.address)
            const stakedTokens = await trainingContract.getStakedTokens(params.address)

            stakedHeroesIds = stakedTokens[0].map((id: BigNumber) => {
                return id.toNumber()
            })

            idsArray = ids.map((id: BigNumber) => {
                return id.toNumber()
            })

            const metadata = await api.getMetadata(idsArray.concat(stakedHeroesIds))
            if (metadata) {
                heroes = metadata
            }

            const kingdomKeys = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKey.abi, params.provider);
            keyAmount = await kingdomKeys.balanceOf(params.address, 1)
            stakedKeysAmout = stakedTokens[1].toNumber()
            inventory = buildInventory(keyAmount.toNumber() + stakedKeysAmout)

        } catch (e) {
            console.log(e)
        }

        store.dispatch(hideUi())

        // remove this once mint is done
        await thunkAPI.dispatch(loadHeroesMintDetails({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        await thunkAPI.dispatch(loadKeysMintDetails({
            address: params.address,
            networkID: params.networkID,
            provider: params.provider
        }))

        return {
            loading: false,
            address: params.address,
            heroesIds: idsArray,
            stakedHeroesIds: stakedHeroesIds,
            stakedKeysAmount: stakedKeysAmout,
            keysAmount: keyAmount.toNumber(),
            canMint: (thunkAPI.getState() as RootState).keysMint.whitelisted,
            inventory: inventory,
            heroes: heroes
        }
    })

export const refreshUser = createAsyncThunk("user/refresh",
    async (params: Web3Params
        , thunkAPI): Promise<UserState> => {
        const contracts = getAddresses(params.networkID);

        let inventory: Array<InventoryItem> = []
        let heroes: Array<MetadataModel> = []
        let stakedHeroesIds = []
        let stakedKeysAmout = 0
        let keyAmount

        const kingdomHeroes = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider);
        const trainingContract = new ethers.Contract(contracts.KINGDOM_TRAINING_ETH, KingdomTraining.abi, params.provider)
        const stakedTokens = await trainingContract.getStakedTokens(params.address)

        const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(params.address)

        stakedHeroesIds = stakedTokens[0].map((id: BigNumber) => {
            return id.toNumber()
        })

        const idsArray = ids.map((id) => {
            return id.toNumber()
        })

        const metadata = await api.getMetadata(idsArray.concat(stakedHeroesIds))
        if (metadata) {
            heroes = metadata
        }

        const kingdomKeys = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKey.abi, params.provider);
        keyAmount = await kingdomKeys.balanceOf(params.address, 1)
        stakedKeysAmout = stakedTokens[1].toNumber()
        inventory = buildInventory(stakedKeysAmout + keyAmount.toNumber())

        return {
            loading: false,
            address: params.address,
            heroesIds: idsArray,
            stakedHeroesIds: stakedHeroesIds,
            stakedKeysAmount: stakedKeysAmout,
            keysAmount: keyAmount.toNumber(),
            canMint: (thunkAPI.getState() as RootState).heroesMint.whitelisted,
            inventory: inventory,
            heroes: heroes
        }
    })

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initUser.pending, state => {
                state.loading = true
            })
            .addCase(initUser.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false

                const menu = phaserGame.scene.getScene(Constants.SCENE_MENU) as MainMenuScene
                menu.startGame(state.canMint)

            })
            .addCase(initUser.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })

            .addCase(refreshUser.pending, state => {
                state.loading = true
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(refreshUser.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})

export default userSlice.reducer


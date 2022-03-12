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
import PreloaderScene from "../../../phaser/scenes/PreloaderScene";
import {loadKeysMintDetails} from "./keys-mint-slice";
import {buildInventory, InventoryItem} from "../../model/inventory";

interface UserState {
    loading: boolean,
    address: String,
    heroesIds: number[],
    canMint: boolean,
    inventory: Array<InventoryItem>
}

const initialState: UserState = {
    loading: false,
    address: "",
    heroesIds: [],
    canMint: false,
    inventory: []
}


export class API {

    BASE_RUL: string = "http://localhost:3002"

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
            console.log(response)
            return response.data.access_token
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

            const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(params.address)

            idsArray = ids.map((id) => {
                return id.toNumber()
            })

            const kingdomKeys = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKey.abi, params.provider);
            const keysBalance = await kingdomKeys.balanceOf(params.address, 1)
            console.log("KEYS " + keysBalance)
            inventory = buildInventory(keysBalance)

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
            canMint: (thunkAPI.getState() as RootState).keysMint.whitelisted,
            inventory: inventory
        }
    })

export const refreshUser = createAsyncThunk("user/refresh",
    async (params: Web3Params
        , thunkAPI): Promise<UserState> => {
        const contracts = getAddresses(params.networkID);

        let root = thunkAPI.getState() as RootState
        let inventory: Array<InventoryItem> = []

        const kingdomHeroes = new ethers.Contract(contracts.KINGDOM_HEROES, KingdomHeroes.abi, params.provider);
        const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(params.address)
        console.log("tokens " + ids)
        const idsArray = ids.map((id) => {
            return id.toNumber()
        })
        console.log("tokens " + idsArray)

        const kingdomKeys = new ethers.Contract(contracts.KINGDOM_KEY, KingdomKey.abi, params.provider);
        const keysBalance = kingdomKeys.balanceOf(params.address, 1)
        inventory = buildInventory(keysBalance)

        return {
            loading: false,
            address: params.address,
            heroesIds: idsArray,
            canMint: (thunkAPI.getState() as RootState).heroesMint.whitelisted,
            inventory: inventory
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

export const {} = userSlice.actions

export default userSlice.reducer


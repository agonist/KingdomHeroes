import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {default as KingdomHeroes} from "../../abi/KingdomHeroes.json";
import {default as KingdomKey} from "../../abi/KingdomKeys.json";
import {BigNumber, ethers} from "ethers";
import {setAll} from "../utils/set-all";
import phaserGame from "../../../phaser/PhaserGame";
import MainMenuScene from "../../../phaser/scenes/MainMenuScene";
import {getAddresses} from "../../web3/contractsAddresses";
import {UpdateTeamParams, Web3Params} from "../utils/params";
import store, {RootState} from "../store";
import {hideUi} from "./ui-slice";
import {loadHeroesMintDetails} from "./heroes-mint-slice";
import {Constants} from "../../../phaser/Constants";
import {loadKeysMintDetails} from "./keys-mint-slice";
import {buildInventory, InventoryItem} from "../../model/inventory";
import {MetadataModel} from "../../model/metadata";
import {default as KingdomTraining} from "../../abi/KingdomTrainingETH.json";
import {BC, User} from "../../model/user";
import {Gameinfos} from "../../model/gameinfos";
import {Api} from "../Api";
import {loadCurrentDungeon} from "./dungeon-slice";

interface UserState {
    firstInit: boolean,
    loading: boolean,
    pendingUpdate: boolean,
    address: String,
    heroesIds: number[],
    keysAmount: number,
    stakedHeroesIds: number[],
    stakedKeysAmount: number,
    canMint: boolean,
    inventory: Array<InventoryItem>,
    heroes: Array<MetadataModel>,
    user: User | undefined,
    game: Gameinfos | undefined,
    dungeonInProgress: boolean
}

const initialState: UserState = {
    firstInit: true,
    loading: false,
    pendingUpdate: false,
    address: "",
    heroesIds: [],
    keysAmount: 0,
    stakedHeroesIds: [],
    stakedKeysAmount: 0,
    canMint: false,
    inventory: [],
    heroes: [],
    user: undefined,
    game: undefined,
    dungeonInProgress: false
}

const api = new Api()

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
        let user
        let bc: BC[]
        let game: Gameinfos
        let dungeonInProgress = false
        const state = thunkAPI.getState() as RootState

        try {

            const token = localStorage.getItem("auth_token")

            if (token) {
                user = await api.getUser()
            }

            if (!user) {

                const nonce = await api.getNonce(params.address)
                if (!nonce) {
                    return Promise.reject("Get nonce error")
                }

                let signature = await params.provider.getSigner(params.address).signMessage(nonce)

                const authToken = await api.login(params.address, signature)
                if (!authToken) {
                    return Promise.reject()
                }

                localStorage.setItem("auth_token", authToken)

                user = await api.getUser()

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

            bc = await api.getRemainingBc(idsArray.concat(stakedHeroesIds)) as BC[]

            const currentDungeon = await api.currentDungeon()
            if (currentDungeon) {
                dungeonInProgress = true
            }

        } catch (e) {
            console.log(e)
        }

        game = {
            bc: bc!
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
            firstInit: state.user.firstInit,
            loading: false,
            pendingUpdate: false,
            address: params.address,
            heroesIds: idsArray,
            stakedHeroesIds: stakedHeroesIds,
            stakedKeysAmount: stakedKeysAmout,
            keysAmount: keyAmount.toNumber(),
            canMint: (thunkAPI.getState() as RootState).keysMint.whitelisted,
            inventory: inventory,
            heroes: heroes,
            user: user,
            game: game,
            dungeonInProgress: dungeonInProgress
        }
    })

export const updateTeam = createAsyncThunk("user/updateteam",
    async (params: UpdateTeamParams
        , thunkAPI): Promise<User | undefined> => {

        let user
        try {
            user = await api.updateTeam(params.heroes)
        } catch (e) {
            console.log(e)
        }

        return user
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

                if (state.firstInit) {
                    const menu = phaserGame.scene.getScene(Constants.SCENE_MENU) as MainMenuScene

                    menu.startGame(state.dungeonInProgress)
                    state.firstInit = false
                }

            })
            .addCase(initUser.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })

            .addCase(updateTeam.pending, state => {
                state.pendingUpdate = true
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                state.pendingUpdate = false
                state.user = action.payload
            })
            .addCase(updateTeam.rejected, (state, {error}) => {
                state.pendingUpdate = false
                console.log(error)
            })
    }
})

export default userSlice.reducer


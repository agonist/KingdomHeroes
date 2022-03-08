import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Moralis} from "moralis";
import {default as KingdomHeroes} from "../../abi/KingdomHeroes.json";
import {BigNumber} from "ethers";
import {setAll} from "../set-all";
import phaserGame from "../../../phaser/PhaserGame";
import {Game} from "phaser";
import MainMenu from "../../../phaser/scenes/MainMenu";
import {getAddresses} from "../../web3/contractsAddresses";

const ethers = Moralis.web3Library


interface UserState {
    show: boolean,
    loading: boolean,
    address: String,
    heroesIds: number[]
}

const initialState: UserState = {
    show: false,
    loading: false,
    address: "",
    heroesIds: []
}

export const initUser = createAsyncThunk("user/init",
    async (userId: number
        , thunkAPI): Promise<UserState> => {
        let user = Moralis.User.current();

        if (!user) {
            user = await Moralis.Web3.authenticate();
        }
        const web3Provider = await Moralis.enableWeb3();

        const kingdomHeroes = new ethers.Contract(getAddresses(0).KINGDOM_HEROES, KingdomHeroes.abi, web3Provider);

        const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(user!.attributes.ethAddress)

        const idsArray = ids.map((id) => {
            return id.toNumber()
        })

        return {
            show: false,
            loading: false,
            address: user!.attributes.ethAddress,
            heroesIds: idsArray
        }
    })

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        showLogin: (state) => {
            state.show = true
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initUser.pending, state => {
                state.loading = true
            })
            .addCase(initUser.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
                const menu = phaserGame.scene.keys.mainmenu as MainMenu
                menu.startGame()
            })
            .addCase(initUser.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })
    }
})

export const {showLogin} = userSlice.actions

export default userSlice.reducer

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Moralis} from "moralis";
import {default as KingdomHeroes} from "../../abi/KingdomHeroes.json";
import {BigNumber, ethers} from "ethers";
import {setAll} from "../set-all";
import phaserGame from "../../../phaser/PhaserGame";
import {Game} from "phaser";
import MainMenu from "../../../phaser/scenes/MainMenu";
import {getAddresses} from "../../web3/contractsAddresses";
import {Web3Params} from "../params";
import axios from "axios";

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
    async (params: Web3Params
        , thunkAPI): Promise<UserState> => {


        const {data, status} = await axios.get("http://localhost:3002/auth/" + params.address + "/nonce")

        console.log(data.nonce)


        let signature = await params.provider.getSigner(params.address).signMessage(data.nonce)

        const res = await axios.post("http://localhost:3002/auth/login", {
            address: params.address,
            signature: signature
        })

        console.log(res)


        const kingdomHeroes = new ethers.Contract(getAddresses(0).KINGDOM_HEROES, KingdomHeroes.abi, params.provider);

        const ids: Array<BigNumber> = await kingdomHeroes.tokensOfOwner(params.address)

        const idsArray = ids.map((id) => {
            return id.toNumber()
        })

        return {
            show: false,
            loading: false,
            address: params.address,
            heroesIds: idsArray
        }
    })

function toHex(stringToConvert: string) {
    return stringToConvert
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}

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


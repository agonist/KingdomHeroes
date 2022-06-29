import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Combat, Dungeon} from "../../model/dungeon";
import {Api} from "../Api";
import {setAll} from "../utils/set-all";
import phaserGame from "../../../phaser/PhaserGame";
import {Constants} from "../../../phaser/Constants";
import GameScene from "../../../phaser/scenes/GameScene";
import {toast} from "react-toastify";
import DungeonScene from "../../../phaser/scenes/DungeonScene";
import {RootState} from "../store";


interface DungeonState {
    loading: boolean,
    currentDungeon: Dungeon | undefined
}

const initialState: DungeonState = {
    loading: false,
    currentDungeon: undefined
}
const api = new Api()

export const loadCurrentDungeon = createAsyncThunk("dungeon/load",
    async (): Promise<DungeonState> => {

        let currentDungeon

        try {
            currentDungeon = await api.currentDungeon()
        } catch (e) {
            console.log(e)
        }

        return {
            loading: false,
            currentDungeon: currentDungeon
        }

    })

export const startNewDungeon = createAsyncThunk("dungeon/start",
    async (): Promise<DungeonState> => {

        let currentDungeon

        currentDungeon = await api.newDungeon()

        if (!currentDungeon) {
            toast.dismiss()
            toast.error('Failed to start dungeon')
            throw Error("Failed to start dungeon")
        }

        return {
            loading: false,
            currentDungeon: currentDungeon
        }

    })


export const endDungeon = createAsyncThunk("dungeon/end",
    async (): Promise<DungeonState> => {

        let currentDungeon

        try {
            currentDungeon = await api.endtDungeon()
            if (currentDungeon && !currentDungeon.inProgress) {
                currentDungeon = undefined
            }
        } catch (e) {
            console.log(e)
        }

        return {
            loading: false,
            currentDungeon: currentDungeon
        }

    })

export const startNextCombat = createAsyncThunk("dungeon/nextfight", async (params, thunkApi): Promise<DungeonState> => {

    const root = thunkApi.getState() as RootState

    const combats: Combat[] = root.dungeon.currentDungeon!!.combats
        .filter(c => !c.won)
    const sorted = combats.sort((a, b) => {
        return a.order - b.order
    })
    console.log(combats[0])

    return {
        loading: false,
        currentDungeon: root.dungeon.currentDungeon
    }
})


const dungeonSlice = createSlice({
    name: 'dungeon-slice',
    initialState,
    reducers: {
        launchDungeon: (state) => {
            const game = phaserGame.scene.getScene(Constants.SCENE_GAME) as GameScene
            game.startDungeon()
        },
        // pushAction: (state, action: PayloadAction<Action>) => {
        //
        //     state.currentCombat?.addActionForHeroTurn(action.payload.from, action.payload.type, action.payload.targetEnemy, action.payload.targetAlly)
        //
        //     console.log(state.currentCombat?.turn)
        //
        //     if (state.currentCombat?.heroTurnOk()) {
        //         state.currentCombat?.playFight()
        //     }
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(loadCurrentDungeon.pending, state => {
                state.loading = true
            })
            .addCase(loadCurrentDungeon.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false

                const game = phaserGame.scene.getScene(Constants.SCENE_GAME) as GameScene
                game.startDungeon()
            })
            .addCase(loadCurrentDungeon.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })

            .addCase(startNewDungeon.pending, state => {
                state.loading = true
            })
            .addCase(startNewDungeon.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false

                const game = phaserGame.scene.getScene(Constants.SCENE_GAME) as GameScene
                game.startDungeon()

            })
            .addCase(startNewDungeon.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })

            .addCase(endDungeon.pending, state => {
                state.loading = true
            })
            .addCase(endDungeon.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(endDungeon.rejected, (state, {error}) => {
                state.loading = false
                console.log(error)
            })

            .addCase(startNextCombat.fulfilled, (state, action) => {
                setAll(state, action.payload)
                const game = phaserGame.scene.getScene(Constants.SCENE_DUNGEON) as DungeonScene
                game.startCombat()
            })
    }
})
export const {launchDungeon} = dungeonSlice.actions

export default dungeonSlice.reducer

import {createSlice} from "@reduxjs/toolkit";
import CombatsManager, {Action, ActionType} from "../../../phaser/core/CombatsManager";


export interface CombatState {

    pendingActions: Action[]

}

const initialState: CombatState ={
    pendingActions: []
}

const combatSlice = createSlice({
    name: "combat",
    initialState,
    reducers: {
        init(state, action) {


        }
    }
})

export default combatSlice.reducer

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UiAction} from "../ui/UiAction";

interface UiState {
    current?: UiAction,
    show: boolean,
}

const initialState: UiState = {
    current: undefined,
    show: false,
}

const uiSlice = createSlice({
    name: 'ui-slice',
    initialState,
    reducers: {
        showUi: (state, action: PayloadAction<UiAction>) => {
            state.current = action.payload
            state.show = true

        },
        hideUi: (state) => {
            state.current = undefined
            state.show = false
        }
    }
})

export const {showUi, hideUi} = uiSlice.actions

export default uiSlice.reducer

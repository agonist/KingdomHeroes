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

            if (state.current) {
                if (action.payload.show !== state.current.show) {
                    state.current = action.payload
                    state.show = true
                }
            } else {
                state.current = action.payload
                state.show = true
            }
        },
        hideUi: (state) => {
            state.current = undefined
            state.show = false
        }
    }
})

export const {showUi, hideUi} = uiSlice.actions

export default uiSlice.reducer

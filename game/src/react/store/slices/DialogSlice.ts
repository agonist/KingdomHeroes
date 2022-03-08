import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DIALOG} from "../../components/dialog/DialogConstant";

interface DialogState {
    show: boolean,
    messages: string[]
}

const initialState: DialogState = {
    show: false,
    messages: []
}

const dialogSlice = createSlice({
    name: 'dialog-slice',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<number>) => {

            switch (action.payload) {
                case 1:
                    state.messages = DIALOG.D1
                    break
                case 2:
                    state.messages = DIALOG.D2
                    break
            }
            state.show = true

        },
        hide: (state) => {
            state.show = false
        }
    }
})

export const {show, hide} = dialogSlice.actions

export default dialogSlice.reducer

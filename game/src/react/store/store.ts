import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import heroesMintSlice from "./slices/heroes-mint-slice";
import uiSlice from "./slices/ui-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        heroesMint: heroesMintSlice,
        ui: uiSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


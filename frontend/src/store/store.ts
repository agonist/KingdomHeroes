import {configureStore} from "@reduxjs/toolkit";
import heroesMintSlice from "./heroes-mint-slice";
import keysMintSlice from "./keys-mint-slice";

const store = configureStore({
    reducer: {
        heroesMint: heroesMintSlice,
        keysMint: keysMintSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


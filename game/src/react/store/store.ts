import {configureStore} from "@reduxjs/toolkit";
import dialogReducer from "./slices/DialogSlice";
import userReducer from "./slices/user-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        dialog: dialogReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


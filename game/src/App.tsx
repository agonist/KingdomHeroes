import React from 'react'
import './App.css'
import {Box, Stack} from "@mui/material";
import DialogBox from "./react/components/dialog/Dialog";
import {useAppSelector} from "./react/store/hooks";
import store from "./react/store/store";
import {hide} from "./react/store/slices/DialogSlice";
import Login from "./react/components/login/Login";

function App() {
    const bottomDialog = useAppSelector((state) => state.dialog)
    const login = useAppSelector((state) => state.user)

    let ui: JSX.Element = <div/>

    if (bottomDialog.show) {
        ui = <Stack height={"100%"} direction="column"
                    justifyContent="flex-end"
                    alignItems="center" paddingBottom={8}>
            <DialogBox messages={bottomDialog.messages} onClose={() => store.dispatch(hide())}/>
        </Stack>
    }

    if (login.show) {
        ui = <Stack height={"100%"} direction="column"
                    justifyContent="flex-end"
                    alignItems="center" paddingBottom={8}>
            <Login/>
        </Stack>
    }

    return (

        <div className="App">
            <Box height="100vh" display="flex" flexDirection="column">


                {ui}


            </Box>
        </div>
    )
}

export default App

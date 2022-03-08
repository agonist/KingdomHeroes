import {Button, Stack} from "@mui/material";
import {useDispatch} from "react-redux";
import {initUser} from "../../store/slices/user-slice";
import {useAppDispatch} from "../../store/hooks";


export default function Login() {

    const dispatch = useDispatch()

    async function login() {
        console.log("tooooo")
        await dispatch(initUser(1))
    }

    return (
        <Stack>

            <Button onClick={login}>Login</Button>

        </Stack>
    )

}

import dialogBorderBox from "../dialog/dialogbox.png";
import {Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import React from "react";

export default function Heroes() {

    const user = useAppSelector((state) => state.user)

    return (
        <Stack width={500} sx={{
            backgroundColor: "#e2b27e",
            border: "solid",
            borderImage: `url("${dialogBorderBox}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}>
            <Typography variant={"h1"} paddingBottom={2}>Heroes</Typography>

            <Stack spacing={2}>

                {user.heroes.length === 0 &&
                    <Typography>You don't own any heroes</Typography>
                }

                {user.heroes.map((item, index) => (
                    <Stack sx={{backgroundColor: "pink"}} key={index} width={200}>
                        <Typography>{item.name}</Typography>
                    </Stack>
                ))}

            </Stack>


        </Stack>
    )
}

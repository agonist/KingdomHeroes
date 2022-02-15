import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function Footer() {

    return (
        <Stack sx={{backgroundColor: 'white'}} height={250}
               alignItems="center">
            <Typography variant={"h1"}>Footer</Typography>
        </Stack>
    )

}

export default Footer

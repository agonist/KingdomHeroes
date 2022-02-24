import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import MintRoot from "../mint/MintRoot";
import Image from "next/image";
import PIC from "../../../public/banner_rk.webp";

function HeadSection() {

    return (
        <Stack sx={{backgroundColor: 'aliceblue'}} justifyContent="center"
               alignItems="center" id="Home">
            <Image src={PIC}/>


            {/*<MintRoot/>*/}
        </Stack>
    )

}

export default HeadSection

import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import MintRoot from "../mint/MintRoot";
import Image from "next/image";
import PIC from "../../../public/banner.webp";

function HeadSection() {

    return (
        <Stack sx={{backgroundColor: 'aliceblue'}} justifyContent="center"
               alignItems="center" id="Home">
            <Image src={PIC}/>


            {/*<MintHeroesRoot/>*/}
        </Stack>
    )

}

export default HeadSection

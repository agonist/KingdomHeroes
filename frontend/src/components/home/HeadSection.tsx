import {Stack} from "@mui/material";
import Image from "next/image";
import PIC from "../../../public/banner.webp";

function HeadSection() {

    return (
        <Stack sx={{backgroundColor: 'aliceblue'}} justifyContent="center"
               alignItems="center" id="Home">
            <Image src={PIC}/>
        </Stack>
    )

}

export default HeadSection

import {Stack} from "@mui/material";
import Image from "next/image";
import PIC from "../../../public/banner.webp";
import ReactPlayer from "react-player";
import {Box} from "@mui/system";

function HeadSection() {

    return (
        <Stack height={"44vw"} justifyContent={"end"} alignItems={"center"} justifyItems={"center"}>
            <Box height={"100%"} sx={{
                position: "absolute",
                width: "100vw",
                overflow: "auto",
                zIndex: -1
            }}
            >
                <video
                    width="100%"
                    autoPlay
                    loop
                    muted
                    src={"/intro.webm"}
                >
                </video>
            </Box>

            <Stack height={"100%"} paddingTop={10}>
                <img src={"logo_big.png"}/>
            </Stack>

        </Stack>
    )

}

export default HeadSection

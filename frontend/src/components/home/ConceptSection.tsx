import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function ConceptSection() {

    return (
        <Stack sx={{backgroundColor: 'dimgrey'}} height={550}
               alignItems="center" id="Concept">
            <Typography variant={"h1"}>Concept section</Typography>
        </Stack>
    )

}

export default ConceptSection

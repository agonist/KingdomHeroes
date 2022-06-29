import {LinearProgress, Stack, Typography} from "@mui/material";
import {GuiStyles} from "../Styles";

interface CharacterIndicatorProps {
    name: string,
    hp: number,
    img: string
}

export default function CharacterIndicator({name, hp, img}: CharacterIndicatorProps) {
    const classes = GuiStyles();

    return (
        <Stack direction={"row"} className={classes.frame} alignItems={"center"} spacing={2}>

            <Stack width={64} height={64}>
                <img src={img}/>
            </Stack>

            <Stack paddingY={2} paddingRight={2} width={150}>
                <Typography color={"white"} align={"left"}>{name}</Typography>
                <LinearProgress color="success" variant="determinate" value={50}/>
            </Stack>

        </Stack>
    )

}

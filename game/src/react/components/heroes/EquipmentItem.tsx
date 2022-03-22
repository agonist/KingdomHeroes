import {Stack, Typography} from "@mui/material";
import React from "react";


interface EquipmentItemProps {
    title: string,
    value: string
}

export default function EquipmentItem({title, value}: EquipmentItemProps) {
    return (
        <Stack sx={{backgroundColor: '#213D73'}} alignItems={"flex-start"} paddingX={2} width={150}>

            <Typography color={"white"}>{title}</Typography>
            <Typography color={"white"} variant={"body2"}>
                {value}
            </Typography>

        </Stack>
    )
}

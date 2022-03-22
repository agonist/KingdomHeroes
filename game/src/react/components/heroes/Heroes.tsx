import bgui from "../bgui.png";
import {
    Box,
    Container, Dialog, DialogContent, DialogProps,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText, Popper,
    Stack,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import React from "react";
import {getAttack, getDefense, getEquipment, getHP, getLevel, getSpeed} from "../../model/metadata";
import EquipmentItem from "./EquipmentItem";

export default function Heroes() {

    const user = useAppSelector((state) => state.user)

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Stack width={window.innerWidth / 2} height={window.innerHeight / 1.5} sx={{
            backgroundColor: "#273047",
            border: "solid",
            borderImage: `url("${bgui}") 25 / 10px 10px 10px 10px stretch`,
            padding: 2,
            paddingX: 3
        }}
        >
            <Typography variant={"h1"} paddingBottom={2} color={"white"}>Heroes</Typography>

            <Stack direction={"row"} spacing={18} paddingY={4} paddingX={2} overflow={"scroll"}>

                <Stack>
                    <Typography color={"white"} paddingBottom={2}>All</Typography>
                    <List component="nav" aria-label="main">
                        {user.heroes.map((item, index) => (
                            <ListItemButton sx={{marginBottom: 2}} key={index}
                                            selected={selectedIndex === index}
                                            onClick={(event) => handleListItemClick(event, index)}
                            >
                                <ListItemAvatar/>
                                <ListItemText primary={item.name} sx={{color: 'white'}}/>
                            </ListItemButton>
                        ))}

                    </List>
                </Stack>

                <Stack width={"50%"}>
                    <Typography color={"white"}>{user.heroes[selectedIndex].name}</Typography>

                    <Stack direction={"row"} spacing={3} paddingTop={2} justifyContent={"center"}>

                        <Box width={160} height={160} sx={{backgroundColor: '#213D73'}}/>

                        <Stack>
                            <Stack direction={"row"}>
                                <Typography color={"white"}>Level:</Typography>
                                <Typography
                                    color={"white"}>{getLevel(user.heroes[selectedIndex].attributes)}</Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <Typography color={"white"}>HP:</Typography>
                                <Typography
                                    color={"white"}>{getHP(user.heroes[selectedIndex].attributes)}</Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <Typography color={"white"}>Attack:</Typography>
                                <Typography
                                    color={"white"}>{getAttack(user.heroes[selectedIndex].attributes)}</Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <Typography color={"white"}>Defense:</Typography>
                                <Typography
                                    color={"white"}>{getDefense(user.heroes[selectedIndex].attributes)}</Typography>
                            </Stack>
                            <Stack direction={"row"}>
                                <Typography color={"white"}>Speed:</Typography>
                                <Typography
                                    color={"white"}>{getSpeed(user.heroes[selectedIndex].attributes)}</Typography>
                            </Stack>
                        </Stack>

                    </Stack>

                    <Stack spacing={2} paddingTop={3}>

                        <Stack direction={"row"} spacing={2}>
                            <EquipmentItem title={"Head"}
                                           value={getEquipment(user.heroes[selectedIndex].attributes, "Head")}/>
                            <EquipmentItem title={"Cloth"}
                                           value={getEquipment(user.heroes[selectedIndex].attributes, "Cloth")}/>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <EquipmentItem title={"Shoes"}
                                           value={getEquipment(user.heroes[selectedIndex].attributes, "Shoes")}/>
                            <EquipmentItem title={"Weapon"}
                                           value={getEquipment(user.heroes[selectedIndex].attributes, "Weapon")}/>
                        </Stack>

                    </Stack>


                </Stack>

            </Stack>

        </Stack>
    )
}

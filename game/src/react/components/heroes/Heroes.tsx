import {
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import {getAttack, getDefense, getEquipment, getHP, getLevel, getSpeed} from "../../model/metadata";
import {GuiStyles} from "../Styles";
import {useState} from "react";
import * as React from 'react';

export default function Heroes() {
    const classes = GuiStyles();

    const user = useAppSelector((state) => state.user)

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    if (user.heroes.length === 0) {
        return (
            <Typography>You don't own any heroes</Typography>
        )
    }

    return (
        <Stack width={window.innerWidth} height={window.innerHeight / 1.3}>
            <Stack direction={"row"} justifyContent={"center"} spacing={3} paddingY={4} paddingX={2}>

                <Stack width={window.innerWidth / 5} height={window.innerHeight / 1.7}>

                    <Stack width={"100%"} height={"100%"} overflow={"scroll"}>
                        <List component="nav" aria-label="main">
                            {user.heroes.map((item, index) => (
                                <ListItemButton sx={{marginBottom: 2}} key={index}
                                                selected={selectedIndex === index}
                                                onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemAvatar>
                                        <Stack width={64} height={64}
                                               sx={{borderStyle: "solid", borderColor: "white", borderWidth: 1}}>
                                            <img src={"wizz.png"}/>
                                        </Stack>
                                    </ListItemAvatar>
                                    <Stack paddingLeft={4}>
                                        <ListItemText primary={item.name}
                                                      secondary={"Lvl " + getLevel(item.attributes) + " - Knight"}
                                                      sx={{color: 'white'}}/>

                                    </Stack>
                                </ListItemButton>
                            ))}

                        </List>
                    </Stack>
                </Stack>

                <Stack className={classes.content} width={200} height={250}>
                    <Stack sx={{
                        backgroundColor: "#8A2439",
                        borderBottom: "solid",
                        borderWidth: "2px",
                        borderColor: "white"
                    }}>
                        <Typography color={"white"} variant={"body1"}
                                    paddingY={2}>STATS</Typography>
                    </Stack>

                    <Stack direction={"row"} paddingTop={2}>
                        <Stack width={"100%"} alignItems={"start"} paddingLeft={2}>
                            <Typography color={"white"}>LVL</Typography>
                            <Typography color={"white"}>ATK</Typography>
                            <Typography color={"white"}>DEF</Typography>
                            <Typography color={"white"}>SPEED</Typography>
                            <Typography color={"white"}>HP</Typography>
                        </Stack>

                        <Stack alignItems={"start"} paddingRight={2}>
                            <Typography color={"white"}>{getLevel(user.heroes[selectedIndex].attributes)}</Typography>
                            <Typography color={"white"}>{getAttack(user.heroes[selectedIndex].attributes)}</Typography>
                            <Typography color={"white"}>{getDefense(user.heroes[selectedIndex].attributes)}</Typography>
                            <Typography color={"white"}>{getSpeed(user.heroes[selectedIndex].attributes)}</Typography>
                            <Typography color={"white"}>{getHP(user.heroes[selectedIndex].attributes)}</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack className={classes.content} width={200} height={250}>
                    <Stack sx={{
                        backgroundColor: "#8A2439", borderBottom: "solid",
                        borderWidth: "2px",
                        borderColor: "white"
                    }}>
                        <Typography color={"white"} variant={"body1"}
                                    paddingY={2}>EQUIPMENT</Typography>
                    </Stack>

                    <Stack alignItems={"center"} paddingRight={2} paddingTop={2}>
                        <Typography
                            color={"white"}>{getEquipment(user.heroes[selectedIndex].attributes, "Armor")}</Typography>
                        <Typography
                            color={"white"}>{getEquipment(user.heroes[selectedIndex].attributes, "Head")}</Typography>
                        <Typography
                            color={"white"}>{getEquipment(user.heroes[selectedIndex].attributes, "Left Hand")}</Typography>
                        <Typography
                            color={"white"}>{getEquipment(user.heroes[selectedIndex].attributes, "Right Hand")}</Typography>
                    </Stack>
                </Stack>

            </Stack>

        </Stack>
    )
}

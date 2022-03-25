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
import {GuiStyles} from "../Styles";
import {CustomColor} from "../../MuiTheme";

export default function Heroes() {
    const classes = GuiStyles();

    const user = useAppSelector((state) => state.user)

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    if (user.heroes.length === 0) {
        return (
            <Typography>No heroes</Typography>
        )
    }

    return (
        <Stack width={window.innerWidth / 1.5} height={window.innerHeight / 1.3} className={classes.frame}
        >
            <Typography variant={"h1"} paddingY={2} color={CustomColor.fontYellow}>HEROES</Typography>

            <Stack direction={"row"} justifyContent={"center"} spacing={3} paddingY={4} paddingX={2}>

                <Stack className={classes.content} width={window.innerWidth / 4} height={window.innerHeight / 1.7}>
                    <Typography color={"white"} variant={"h4"} paddingY={2}>All</Typography>

                    <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>
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
                </Stack>

                <Stack className={classes.content} width={window.innerWidth / 3} height={window.innerHeight / 1.7}>
                    <Typography color={"white"} variant={"h4"}
                                paddingY={2}>{user.heroes[selectedIndex].name}</Typography>

                    <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>

                        <Stack direction={"row"} spacing={2} justifyContent={"center"} paddingTop={2}>
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

                            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                                <EquipmentItem title={"Head"}
                                               value={getEquipment(user.heroes[selectedIndex].attributes, "Head")}/>
                                <EquipmentItem title={"Cloth"}
                                               value={getEquipment(user.heroes[selectedIndex].attributes, "Cloth")}/>
                            </Stack>
                            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                                <EquipmentItem title={"Shoes"}
                                               value={getEquipment(user.heroes[selectedIndex].attributes, "Shoes")}/>
                                <EquipmentItem title={"Weapon"}
                                               value={getEquipment(user.heroes[selectedIndex].attributes, "Weapon")}/>
                            </Stack>

                        </Stack>

                    </Stack>


                </Stack>

            </Stack>

        </Stack>
    )
}

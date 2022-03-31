import {GuiStyles} from "../Styles";
import {Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, Stack, Typography} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {MetadataModel} from "../../model/metadata";
import {useDispatch} from "react-redux";
import {updateTeam} from "../../store/slices/user-slice";
import {UpdateTeamParams} from "../../store/utils/params";
import {User} from "../../model/user";
import {bcForId} from "../../model/gameinfos";

export default function Team() {

    const classes = GuiStyles();
    const user = useAppSelector((state) => state.user)
    const dispatch = useDispatch();

    const [heroesChecked, setHeroesChecked] = useState<number[]>([]);

    const [teamChecked, setTeamChecked] = useState<number[]>([]);

    useEffect(() => {
        setHeroesChecked([])
        setTeamChecked([])
    }, [user])

    const handleToggle = (value: number) => () => {
        const currentIndex = heroesChecked.indexOf(value);
        const newChecked = [...heroesChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setHeroesChecked(newChecked);

        console.log("Current selected : " + newChecked)
    };

    const handleTeamToggle = (value: number) => () => {
        const currentIndex = teamChecked.indexOf(value);
        const newChecked = [...teamChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setTeamChecked(newChecked);

        console.log("Current selected : " + newChecked)
    };

    function findHeroById(id: number[], heroes: MetadataModel[]): MetadataModel[] {
        const heroesRes = id.map(i => {
            return heroes.find(h => h.id === i)!!
        })

        return heroesRes
    }

    async function addToTeam(user: User, checked: number[]) {
        const current = user.team
        const full = current.concat(checked)
        let params: UpdateTeamParams = {
            heroes: full
        }
        dispatch(updateTeam(params))

    }

    async function removeFromTeam(user: User, checked: number[]) {
        const current = user.team

        const full = current.filter(h => {
            if (checked.find(i => i === h)) return false
            else return true
        })

        let params: UpdateTeamParams = {
            heroes: full
        }
        console.log(full)
        dispatch(updateTeam(params))
    }

    return (
        <Stack width={window.innerWidth / 1.1}
               spacing={3}

               alignItems={"center"}
               className={classes.frame}>
            <Typography variant={"h1"} color={CustomColor.fontYellow}>TEAM</Typography>

            <Stack paddingY={3} direction={"row"} spacing={3} width={"100%"} justifyContent={"center"}>

                <Stack width={window.innerWidth / 4} height={window.innerHeight / 1.7}
                       className={classes.content}>
                    <Typography color={"white"} variant={"h4"} paddingY={2}>AVAILABLE</Typography>

                    <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>


                        {user.heroesIds.length === 0 ?
                            <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <Typography color={"white"}>No Heroes</Typography>
                            </Stack>

                            :

                            <List sx={{width: '100%', height: '100%'}}>
                                {user.heroes.filter(h => !user.user!!.team.find(c => c === h.id)).map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={heroesChecked.indexOf(item.id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': item.name}}
                                                />
                                            </ListItemIcon>
                                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                                <Typography color={"white"} width={"70%"}>{item.name}</Typography>
                                                <Typography color={CustomColor.fontYellow}>BC:
                                                    {bcForId(item.id, user.game!.bc)}</Typography>
                                            </Stack>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                        }
                        {heroesChecked.length > 0 &&
                            <Stack spacing={1} paddingBottom={2} paddingX={2}>
                                <Button className={classes.button} variant={"contained"}
                                        onClick={() => addToTeam(user.user!!, heroesChecked)}>
                                    ADD
                                </Button>
                            </Stack>
                        }

                    </Stack>

                </Stack>

                <Stack width={window.innerWidth / 4} height={window.innerHeight / 1.7}
                       className={classes.content}>
                    <Typography color={"white"} variant={"h4"} paddingY={2}>YOUR TEAM</Typography>

                    <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>

                        {user.user!!.team.length === 0 ?
                            <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <Typography color={"white"}>No Heroes</Typography>
                            </Stack>

                            :

                            <List sx={{width: '100%', height: '100%'}}>
                                {findHeroById(user.user!!.team, user.heroes).map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleTeamToggle(item.id)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={teamChecked.indexOf(item.id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': item.name}}
                                                />
                                            </ListItemIcon>
                                            <Stack spacing={2} direction={"row"} width={"100%"}>
                                                <Typography color={"white"} width={"70%"}>{item.name}</Typography>
                                                <Typography color={CustomColor.fontYellow}>BC:
                                                    {bcForId(item.id, user.game!.bc)}</Typography>
                                            </Stack> </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        }
                        {teamChecked.length > 0 &&
                            <Stack spacing={1} paddingBottom={2} paddingX={2}>
                                <Button className={classes.button} variant={"contained"}
                                        onClick={() => removeFromTeam(user.user!!, teamChecked)}>
                                    REMOVE
                                </Button>
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

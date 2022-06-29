import {List, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../store/hooks";
import {GuiStyles} from "../Styles";
import CharacterIndicator from "./CharacterIndicator";
import {useCallback, useEffect, useRef, useState} from "react";
import {Character, Combat, Dungeon, Enemy, Hero} from "../../model/dungeon";
import CombatsManager, {Action, ActionType, DefaultRandomizer} from "../../../phaser/core/CombatsManager";
import {useDispatch} from "react-redux";

interface CombatUiProps {
    combatId: number
}

export function CombatUi({combatId}: CombatUiProps) {
    const dispatch = useDispatch();

    const classes = GuiStyles();

    const dungeon = useAppSelector((state) => state.dungeon)

    const [heroSelection, setHeroSelection] = useState<Hero>()
    const [actionSelection, setActionSelection] = useState<ActionType>()
    const [enemyTargetSelection, setEnemyTargetSelection] = useState<Enemy>()
    const [heroTargetSelection, setHeroTargetSelection] = useState<Hero>()

    // const [currentDungeon, setCurrentDungeon] = useState<Dungeon>()
    // const [currentCombat, setCurrentCombat] = useState<CombatsManager>()

    // const [currentDungeon, setCurrentDungeon] = useState<Dungeon>()

    let currentCombat = useRef<CombatsManager | null>(null)
    let currentDungeon = useRef<Dungeon | null>(null)

    let [dummy, setDummy] = useState(false)

    function skillsToText(action: ActionType): string {
        switch (action) {
            case ActionType.USE_OBJECT:
                return "USE OBJECT"
            case ActionType.ATTACK:
                return "ATTACK"
            case ActionType.DEFENSE:
                return "DEFENSE"
            case ActionType.HEAL:
                return "HEAL"
            case ActionType.MAGIC_ATTACK:
                return "MAGIC ATTACK"
        }
    }


    useEffect(() => {

        if (currentDungeon.current === null) {
            const d: Dungeon = {...dungeon.currentDungeon}
            currentDungeon.current = d
        }

        if (currentCombat.current === null && currentDungeon.current !== null) {
            const combats: Combat[] = currentDungeon.current.combats
                .filter(c => !c.won)
            const sorted = combats.sort((a, b) => {
                return a.order - b.order
            })
            const c = new CombatsManager(currentDungeon!!.current.heroes, sorted[0], new DefaultRandomizer())
            currentCombat.current = c
            // setCurrentCombat(new CombatsManager(currentDungeon!!.heroes, sorted[0], new DefaultRandomizer()))
        }

        if (currentDungeon.current !== null) {
            console.log(currentDungeon)
        }
        if (currentCombat.current !== null) {
            console.log(currentCombat)
        }
        setDummy(!dummy)

    }, [])

    useEffect(() => {

        if (heroTargetSelection != undefined || enemyTargetSelection != undefined) {
            pushToAction()
        }

    }, [enemyTargetSelection, heroTargetSelection])

    function renderTarget(action: ActionType) {
        if (action === undefined) return (<></>)


        if (action === ActionType.HEAL) {
            return (
                <Stack>
                    <List>

                        {currentDungeon.current?.heroes.map((item, index) => (

                            <ListItemButton key={index}
                                            onClick={() => {
                                                setHeroTargetSelection(item)
                                            }}>
                                <Stack width={42} height={42}>
                                    <img src={"wizz.png"}/>
                                </Stack>
                                <ListItemText primary={item.name} sx={{color: 'white'}}/>

                            </ListItemButton>
                        ))}

                    </List>
                </Stack>
            )
        }


        return (
            <Stack>
                <List>

                    {currentCombat.current?.combat.enemies.map((item, index) => (

                        <ListItemButton key={index} onClick={() => {
                            setEnemyTargetSelection(item)
                        }}>

                            <ListItemText primary={item.name} sx={{color: 'white'}}/>

                        </ListItemButton>
                    ))}

                </List>
            </Stack>
        )
    }

    function pushToAction() {

        const action: Action = {
            from: heroSelection,
            type: actionSelection,
            targetEnemy: [enemyTargetSelection],
            targetAlly: heroTargetSelection
        }

        currentCombat.current?.addActionForHeroTurn(action.from, action.type, action.targetEnemy, action.targetAlly)

        console.log(currentCombat.current?.turn)

        if (currentCombat.current?.heroTurnOk()) {
            currentCombat.current?.playFight()
        }


        //dispatch(pushAction(action))

        setHeroSelection(undefined)
        setActionSelection(undefined)
        setEnemyTargetSelection(undefined)
        setHeroTargetSelection(undefined)
    }

    if (currentCombat === null && currentDungeon === null) {
        console.log("Yooo")
        return (<></>)
    }

    console.log("YUUU")
    return (
        <Stack height={"100%"} width={"100%"}>

            {/* HEROES HEALTH*/}

            <Stack direction={"row"} spacing={3} margin={2}>
                {currentDungeon.current?.heroes.map((item, index) => (
                    <CharacterIndicator hp={item.hp} name={item.name} img={"wizz.png"}/>
                ))}
            </Stack>

            <Stack height={"100%"}></Stack>


            <Stack direction={"row"} spacing={3} margin={2} justifyContent={"end"}>
                {currentCombat.current?.combat.enemies.map((item, index) => (
                    <CharacterIndicator hp={item.hp} name={item.name} img={"wizz.png"}/>
                ))}
            </Stack>


            <Stack padding={2}>
                <Stack direction={"row"} className={classes.frame} height={250}>

                    {/* HEROES */}
                    <Stack>
                        <List>

                            {currentDungeon.current?.heroes.map((item, index) => (

                                <ListItemButton key={index} disabled={currentCombat.current?.heroActionSelected(item)}
                                                onClick={() => {
                                                    setHeroSelection(item)
                                                }}>
                                    <Stack width={42} height={42}>
                                        <img src={"wizz.png"}/>
                                    </Stack>
                                    <ListItemText primary={item.name} sx={{color: 'white'}}/>

                                </ListItemButton>
                            ))}

                        </List>
                    </Stack>

                    <Stack>
                        <List>

                            {heroSelection?.skills.map((item, index) => (

                                <ListItemButton key={index} onClick={() => {
                                    setActionSelection(item)
                                }}>

                                    <ListItemText primary={skillsToText(item)} sx={{color: 'white'}}/>

                                </ListItemButton>
                            ))}

                        </List>
                    </Stack>

                    {
                        renderTarget(actionSelection)
                    }

                </Stack>
            </Stack>

        </Stack>


    )
}

import {useAppSelector} from "../../store/hooks";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, Stack, Typography} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import {GuiStyles} from "../Styles";
import {approveHeroes, approveKeys, trainNFT} from "../../store/slices/training-slice";
import {TrainParams, Web3Params} from "../../store/utils/params";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useDispatch} from "react-redux";

export default function Stake() {

    const user = useAppSelector((state) => state.user)
    const training = useAppSelector((state) => state.training)

    const {provider, chainID} = useWeb3Context();
    const address = useAddress();
    const dispatch = useDispatch();

    const [heroesChecked, setHeroesChecked] = useState<number[]>([]);
    const [keysChecked, setKeysChecked] = useState<number[]>([]);

    useEffect(() => {
        setHeroesChecked([])
        setKeysChecked([])
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

    const keyChecked = (value: number) => () => {
        const currentIndex = keysChecked.indexOf(value);
        const newChecked = [...keysChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setKeysChecked(newChecked);

        console.log("Current selected : " + newChecked)
    }

    async function triggerStaking() {
        const heroesIds = heroesChecked;
        const keysAmount = keysChecked.length
        let web3: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        const params: TrainParams = {
            web3: web3,
            heroes: heroesIds,
            keys: keysAmount
        }

        await dispatch(trainNFT(params))
    }

    async function triggerApproveHeroes() {
        let web3: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        await dispatch(approveHeroes(web3))
    }

    async function triggerApproveKeys() {
        let web3: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        await dispatch(approveKeys(web3))
    }

    function approveButtons(heroesBalance: number, keysBalance: number,
                            heroesNeedApprove: boolean, keysNeedApprove: boolean,
                            heroesCheckedQ: number, keysCheckedQ: number) {

        let showKeysApprove = false
        let showHeroesApprove = false
        let showTrain = true

        if (heroesBalance === 0) {
            showHeroesApprove = false
        }
        if (heroesBalance > 0 && heroesNeedApprove && heroesCheckedQ > 0) {
            showHeroesApprove = true
        }
        if (keysBalance === 0) {
            showKeysApprove = false
        }
        if (keysBalance > 0 && keysNeedApprove && keysCheckedQ > 0) {
            showKeysApprove = true
        }

        if (heroesCheckedQ > 0 && heroesNeedApprove) {
            showTrain = false
        }

        if (keysCheckedQ > 0 && keysNeedApprove) {
            showTrain = false
        }

        if (keysCheckedQ === 0 && heroesCheckedQ === 0) {
            showTrain = false
        }

        return (
            <Stack spacing={1} paddingBottom={2} paddingX={2}>
                {showHeroesApprove &&
                    <Button className={classes.button} variant={"contained"} hidden={showHeroesApprove}
                            onClick={triggerApproveHeroes}>
                        Approve Heroes
                    </Button>
                }
                {showKeysApprove &&
                    <Button className={classes.button} variant={"contained"} hidden={showKeysApprove}
                            onClick={triggerApproveKeys}>
                        Approve Keys
                    </Button>
                }

                {showTrain &&
                    <Button className={classes.button} variant={"contained"} onClick={triggerStaking}>
                        Start Training
                    </Button>
                }

            </Stack>
        )


    }


    const classes = GuiStyles();

    const keysContent = (keysAmount: number) => {
        let content = [];
        for (let i = 0; i < keysAmount; i++) {

            content.push(
                <ListItem
                    key={"key" + i}
                    disablePadding
                >
                    <ListItemButton role={undefined} onClick={keyChecked(i)} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={keysChecked.indexOf(i) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': i + ""}}
                            />
                        </ListItemIcon>
                        <Typography color={"white"}>Kingdom Key #{i + 1}</Typography>
                    </ListItemButton>
                </ListItem>
            );
        }
        return content;
    };

    return (
        <Stack width={window.innerWidth / 4} height={window.innerHeight / 1.7}
               className={classes.content}>
            <Typography color={"white"} variant={"h4"} paddingY={2}>NOT TRAINING</Typography>
            <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>

                {user.heroesIds.length === 0 && user.keysAmount === 0 ?
                    <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography color={"white"}>No Heroes & No Keys</Typography>
                    </Stack>

                    :

                    <List sx={{width: '100%', height: '100%'}}>
                        {user.heroes.filter(h => user.heroesIds.find(c => c === h.id)).map((item, index) => (
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
                                    <Typography color={"white"}>{item.name}</Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {
                            keysContent(user.keysAmount)
                        }

                    </List>

                }


                {approveButtons(user.heroesIds.length, user.keysAmount, training.heroesNeedApproval, training.keysNeedApproval, heroesChecked.length, keysChecked.length)}

            </Stack>
        </Stack>
    )

}

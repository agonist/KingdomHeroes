import {useAppSelector} from "../../store/hooks";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, Stack, Typography} from "@mui/material";
import {CustomColor} from "../../MuiTheme";
import {GuiStyles} from "../Styles";
import {TrainParams, Web3Params} from "../../store/utils/params";
import {untrainNFT} from "../../store/slices/training-slice";
import {useAddress, useWeb3Context} from "../../web3/web3-context";
import {useDispatch} from "react-redux";


export default function UnStake() {

    const user = useAppSelector((state) => state.user)
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

    async function triggerUnstaking() {
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

        await dispatch(untrainNFT(params))
    }

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

    const classes = GuiStyles();


    return (
        <Stack width={window.innerWidth / 4} height={window.innerHeight / 1.7}
               className={classes.content}>
            <Typography color={"white"} variant={"h4"} paddingY={2}>IN TRAINING</Typography>

            <Stack width={"100%"} height={"100%"} sx={{backgroundColor: CustomColor.midBg}} overflow={"scroll"}>

                {(user.stakedHeroesIds.length === 0 && user.stakedKeysAmount === 0) ?
                    <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography color={"white"}>No Heroes & No Keys</Typography>
                    </Stack>

                    :


                    <List sx={{width: '100%', height: '100%'}}>
                        {user.heroes.filter(h => user.stakedHeroesIds.find(c => c === h.id)).map((item, index) => (
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
                            keysContent(user.stakedKeysAmount)
                        }
                    </List>
                }

                {(heroesChecked.length > 0 || keysChecked.length > 0) &&
                    <Button className={classes.button} variant={"contained"} sx={{margin: 2}}
                            onClick={triggerUnstaking}>
                        Stop Training
                    </Button>
                }
            </Stack>
        </Stack>
    )

}

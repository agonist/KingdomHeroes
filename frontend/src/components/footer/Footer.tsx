import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";
import Image from 'next/image'
import twitter from '../../../public/twitter.png';
import discord from '../../../public/discord.png';
import opensea from '../../../public/opensea.png';

function Footer() {

    return (
        <Stack direction="row" justifyContent="center" height="100%"
               alignItems="center" paddingY={3} spacing={3} sx={{backgroundColor: "#f1f1f1"}}>
            <a href={"https://twitter.com/KingdomHeroesN1"} target="_blank" rel="noreferrer">
                <Image src={twitter} width={42} height={42}/>
            </a>
            <a href={"https://discord.gg/KfZSHsrP"} target="_blank" rel="noreferrer">
                <Image src={discord} width={42} height={42}/>
            </a>
            {/*<a href={"https://twitter.com/KingdomHeroesN1"} target="_blank" rel="noreferrer">*/}
            {/*    <Image src={opensea} width={42} height={42}/>*/}
            {/*</a>*/}
        </Stack>
    )

}

export default Footer

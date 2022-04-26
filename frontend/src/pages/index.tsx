import type {NextPage} from 'next'
import {Stack, Typography} from "@mui/material";
import HeadSection from "../components/home/HeadSection";
import ConceptSection from "../components/home/ConceptSection";
import GameplaySection from "../components/home/GameplaySection";
import RoadmapSection from "../components/home/RoadmapSection";
import TeamSection from "../components/home/TeamSection";


const Home: NextPage = () => {
    return (
        <Stack>
            <HeadSection/>
            <ConceptSection/>
            <GameplaySection/>
            <RoadmapSection/>
            <TeamSection/>
        </Stack>


    )
}

export default Home

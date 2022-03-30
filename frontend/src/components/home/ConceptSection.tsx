import {NextPage} from "next";
import {Stack, Typography} from "@mui/material";

function ConceptSection() {

    return (
        <Stack sx={{backgroundColor: '#f1f1f1'}} paddingTop={6} paddingX={2}
               alignItems="center" id="Concept">
            <Stack maxWidth={800} alignItems="center" spacing={3}>
                <Typography variant={"h1"}>Concept</Typography>

                <Typography>

                    Times are changing rapidly. The Kingdom of Creeth for centuries has been the leader of the Civilised
                    World,
                    with Castreia, its picture perfect port capital being held as the gold standard of cities throughout
                    Creeth and rival kingdoms. <br/>
                    As merchants and new travelers come to settle within Castreia, new dangers come
                    as well.
                    Global expansion has brought the hope of riches and wealth to new settlers which has caused bad
                    actors to find
                    new ways to harm local citizens. Monsters from far away lands have been brought outside the city
                    gates, attacking
                    and stealing Creeth Gold from those not strong enough to fend for themselves. <br/>
                    It is rumored that the
                    promise of
                    wealth and safety from rival kingdoms is spreading to nearby cities, enacting revolts and further
                    tribulations to
                    The Kingdom. <br/>
                    As the situation grows dire, a set of citizens emerge in hopes to fight off the
                    monsters lurking
                    around Castreia and prove their strength to represent Creeth as The Kingdom Heroes. <br/>
                    This task will not be easy,
                    and it will cause these Heroes to make difficult decisions, some even having to fight against their
                    brethren.
                    Will you have what it takes to defeat these monsters and face the challenges emerging across the
                    Kingdom of Creeth?


                </Typography>

            </Stack>


        </Stack>
    )

}

export default ConceptSection

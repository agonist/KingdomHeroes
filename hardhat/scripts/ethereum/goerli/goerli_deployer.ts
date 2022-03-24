require("dotenv").config();
import hre = require("hardhat");
import {MerkleTree} from "merkletreejs";

async function main() {
    await hre.run('deploy', {tags: 'KingdomKey'});
    await hre.run('deploy', {tags: 'KingdomHeroes'});
    await hre.run('deploy', {tags: 'KingdomTraining'});
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

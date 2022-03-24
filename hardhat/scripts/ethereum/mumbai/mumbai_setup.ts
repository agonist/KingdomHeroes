require("dotenv").config();
import hre = require("hardhat");
import {MerkleTree} from "merkletreejs";

async function main() {
    const deployments = hre.deployments;
    const TokensStats = await deployments.get('TokensStats');
    const CreethGold = await deployments.get('CreethGold');
    const KingdomTrainingPoly = await deployments.get('KingdomTrainingPoly');


    const tokensStats = await hre.ethers.getContractAt('TokensStats', TokensStats.address);
    const cgld = await hre.ethers.getContractAt('CreethGold', CreethGold.address);
    const training = await hre.ethers.getContractAt('KingdomTrainingPoly', KingdomTrainingPoly.address);

    let stats = Array()
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    for (let i = 1; i < 20; i += 1) {
        stats.push({tokenId: i, attack: 1 + i, defense: 2 + i, speed: 3 + i, level: 2 + i, hp: 100 + i})
    }

    // when
    // await training.setFxRootTunnel(addressOfTrainingOnETH)

    await tokensStats.initStats(stats, ids)

    await cgld.setMinter(training.address, true)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

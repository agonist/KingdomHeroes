require("dotenv").config();
import hre = require("hardhat");

async function deployLocal() {
    await hre.run('deploy', {tags: 'RoyalKingdom'});

    const network = await hre.ethers.provider.getNetwork();

    const deployments = hre.deployments;
    const RoyalKingdom = await deployments.get('RoyalKingdom');

    const royalKingdom = await hre.ethers.getContractAt('RoyalKingdom', RoyalKingdom.address);

    // do stuff


}

deployLocal()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

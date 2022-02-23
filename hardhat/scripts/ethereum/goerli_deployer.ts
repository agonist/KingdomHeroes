require("dotenv").config();
import hre = require("hardhat");

async function main() {
    await hre.run('deploy', {tags: 'RoyalKingdom'});
    await hre.run('deploy', {tags: 'KingdomEthGate'});

    const network = await hre.ethers.provider.getNetwork();

    const deployments = hre.deployments;
    const RoyalKingdom = await deployments.get('RoyalKingdom');

    const royalKingdom = await hre.ethers.getContractAt('RoyalKingdom', RoyalKingdom.address);

    const kingdomEthGate = await hre.ethers.getContractAt('RoyalKingdom', RoyalKingdom.address);

    // after eth portal is deployed set the child tunnel address
    await kingdomEthGate.setFxChildTunnel("child tunnel addr")

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

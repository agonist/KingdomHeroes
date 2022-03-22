import keccak256 from "keccak256";

require("dotenv").config();
import hre = require("hardhat");
import {MerkleTree} from "merkletreejs";

async function main() {
    await hre.run('deploy', {tags: 'KingdomKey'});
    await hre.run('deploy', {tags: 'KingdomHeroes'});
    // await hre.run('deploy', {tags: 'CreethGold'});
    // await hre.run('deploy', {tags: 'KingdomStaking'});

    const deployments = hre.deployments;
    const KingdomKey = await deployments.get('KingdomKey');
    const KingdomHeroes = await deployments.get('KingdomHeroes');
    // const CreethGold = await deployments.get('CreethGold');
    // const KingdomStaking = await deployments.get('KingdomStaking');

    const kingdomKey = await hre.ethers.getContractAt('KingdomKey', KingdomKey.address);
    const royalKingdom = await hre.ethers.getContractAt('KingdomHeroes', KingdomHeroes.address);
    // const creethGold = await hre.ethers.getContractAt('CreethGold', CreethGold.address);
    // const kingdomStaking = await hre.ethers.getContractAt('KingdomStaking', KingdomStaking.address);

    await kingdomKey.togglePresale()
    //await royalKingdom.togglePresale()

    const whitelist = [
        "0xCBaE0841D72C6e1BDC4e3a85Dea5497822F27d18",
        "0xE032d90BE017B57118eAafaA5826De494D73E392",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xcF6c12BC62604207eBF7c95efd77c8B18519a6e1",
        "0xE032d90BE017B57118eAafaA5826De494D73E39b",
    ];
    const leafNodes = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
    });

    await kingdomKey.setWhitelistMerkleRoot(merkleTree.getHexRoot())
    // await royalKingdom.setWhitelistMerkleRoot(merkleTree.getHexRoot())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

import {MerkleTree} from "merkletreejs";

require("dotenv").config();
import hre = require("hardhat");
import keccak256 from "keccak256";

async function deployLocal() {
    await hre.run('deploy', {tags: 'KingdomKey'});
    await hre.run('deploy', {tags: 'KingdomHeroes'});
    await hre.run('deploy', {tags: 'CreethGold'});
    await hre.run('deploy', {tags: 'KingdomStaking'});

    const network = await hre.ethers.provider.getNetwork();

    const deployments = hre.deployments;
    const KingdomKey = await deployments.get('KingdomKey');
    const KingdomHeroes = await deployments.get('KingdomHeroes');
    const CreethGold = await deployments.get('CreethGold');
    const KingdomStaking = await deployments.get('KingdomStaking');

    const kingdomKey = await hre.ethers.getContractAt('KingdomKey', KingdomKey.address);
    const royalKingdom = await hre.ethers.getContractAt('KingdomHeroes', KingdomHeroes.address);
    const creethGold = await hre.ethers.getContractAt('CreethGold', CreethGold.address);
    const kingdomStaking = await hre.ethers.getContractAt('KingdomStaking', KingdomStaking.address);

    await royalKingdom.togglePresale()


    const whitelist = ["0xE032d90BE017B57118eAafaA5826De494D73E39b", "0xE032d90BE017B57118eAafaA5826De494D73E392", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
    const leafNodes = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
    });

    await royalKingdom.setWhitelistMerkleRoot(merkleTree.getHexRoot())
    // do stuff


}

deployLocal()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

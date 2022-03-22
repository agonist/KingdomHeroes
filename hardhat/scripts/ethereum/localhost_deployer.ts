import {MerkleTree} from "merkletreejs";

require("dotenv").config();
import hre = require("hardhat");
import keccak256 from "keccak256";

async function deployLocal() {
    await hre.run('deploy', {tags: 'KingdomKey'});
    await hre.run('deploy', {tags: 'KingdomHeroes'});
    await hre.run('deploy', {tags: 'CreethGold'});
    await hre.run('deploy', {tags: 'KingdomStaking'});
    await hre.run('deploy', {tags: 'TokensStats'});

    const network = await hre.ethers.provider.getNetwork();

    const deployments = hre.deployments;
    const KingdomKey = await deployments.get('KingdomKey');
    const KingdomHeroes = await deployments.get('KingdomHeroes');
    const CreethGold = await deployments.get('CreethGold');
    const KingdomStaking = await deployments.get('KingdomStaking');
    const TokensStats = await deployments.get('TokensStats');

    const kingdomKey = await hre.ethers.getContractAt('KingdomKey', KingdomKey.address);
    const royalKingdom = await hre.ethers.getContractAt('KingdomHeroes', KingdomHeroes.address);
    const creethGold = await hre.ethers.getContractAt('CreethGold', CreethGold.address);
    const kingdomStaking = await hre.ethers.getContractAt('KingdomStaking', KingdomStaking.address);
    const tokensStats = await hre.ethers.getContractAt('TokensStats', TokensStats.address);

    // await kingdomKey.togglePresale()
    //await kingdomKey.toggleSale()
    //await royalKingdom.togglePresale()
    await royalKingdom.toggleSale()


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
    await royalKingdom.setWhitelistMerkleRoot(merkleTree.getHexRoot())
    // do stuff

    let stats = Array()
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    for (let i = 1; i < 19; i += 1) {
        stats.push({tokenId: i, attack: 1 + i, defense: 2 + i, speed: 3 + i, level: 2 + i, hp: 100 + i})
    }

    // when
    await tokensStats.initStats(stats, ids)


}

deployLocal()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

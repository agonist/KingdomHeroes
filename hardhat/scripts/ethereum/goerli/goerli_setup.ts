import keccak256 from "keccak256";

require("dotenv").config();
import hre = require("hardhat");
import {MerkleTree} from "merkletreejs";

async function main() {

    const deployments = hre.deployments;
    const KingdomKey = await deployments.get('KingdomKey');
    const KingdomHeroes = await deployments.get('KingdomHeroes');
    const KingdomTraining = await deployments.get('KingdomTraining');

    const kingdomKey = await hre.ethers.getContractAt('KingdomKey', KingdomKey.address);
    const royalKingdom = await hre.ethers.getContractAt('KingdomHeroes', KingdomHeroes.address);
    const kingdomTraining = await hre.ethers.getContractAt('KingdomTraining', KingdomTraining.address);

    // need to set fxChildTunnel once deployed

    // await kingdomTraining.setFxChildTunnel(addressOfChildOnPolygon)
    
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

    // await kingdomKey.togglePresale()
    // await royalKingdom.togglePresale()

    // await kingdomKey.toggleSale()
    // await royalKingdom.toggleSale()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

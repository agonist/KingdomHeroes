import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from "hardhat";

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//     const {deployments, getNamedAccounts} = hre;
//     const {deploy} = deployments;
//     const {deployer} = await getNamedAccounts();
//
//     const args = [
//         "RoyalKingdom",
//         "RK",
//         "https://gateway.pinata.cloud/ipfs/xxx/",
//         10000,
//         10,
//         2
//     ]
//
//     const deployment = await deploy('RoyalKingdom', {
//         waitConfirmations: hre.network.live ? 12 : 1,
//         gasPrice: (await hre.ethers.provider.getGasPrice()).mul(2),
//         from: deployer,
//         log: true,
//         args: args,
//     });
//
//
//     if (hre.network.live) {
//         try {
//             const royalKingdom = await deployments.get('RoyalKingdom');
//             await hre.run('verify', {
//                 network: 'mainnet',
//                 address: royalKingdom.address,
//                 constructorArgsParams: args
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     } else {
//         const royalKingdom = await deployments.get('RoyalKingdom');
//
//         console.log("Royal Kingdom deployed at: " + royalKingdom.address)
//     }
// };
// export default func;
// func.tags = ['RoyalKingdom'];

async function main() {
    const args = [
        "RoyalKingdom",
        "RK",
        "https://gateway.pinata.cloud/ipfs/xxx/",
        10000,
        10,
        2
    ]


    const RK = await ethers.getContractFactory('RoyalKingdom');
    const contract = await RK.deploy("RoyalKingdom",
        "RK",
        "https://gateway.pinata.cloud/ipfs/xxx/",
        10000,
        10,
        2);
    await contract.deployed();
    console.log('RoyalKingdom deployed to:', contract.address);
    await contract.togglePresale()
    await contract.setWhitelistMerkleRoot("0x90d220a8cd51841af670d3f4d9a06681b37548a1c42e598d78fe73f34d68449f")

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

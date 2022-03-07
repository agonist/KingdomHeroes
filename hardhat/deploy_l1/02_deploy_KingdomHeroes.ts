import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {network} from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const network = await hre.ethers.provider.getNetwork();

    let maxSupply = 10000
    let maxMintAtOnce = 10;
    let maxMintWhitelist = 2;

    if (network.chainId == 31337) {
        maxSupply = 100
    }

    const args = [
        "KingdomHeroes",
        "KH",
        "https://gateway.pinata.cloud/ipfs/xxx/",
        maxSupply,
        maxMintAtOnce,
        maxMintWhitelist
    ]

    await deploy('KingdomHeroes', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.tags = ['KingdomHeroes'];

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {network} from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const network = await hre.ethers.provider.getNetwork();

    let maxSupply = 500
    let maxMintAtOnce = 5;
    let maxMintWhitelist = 2;

    if (network.chainId == 31337) {
        maxSupply = 100
    }

    const args = [
        "https://gateway.pinata.cloud/ipfs/xxx/",
        maxSupply,
        maxMintAtOnce,
        maxMintWhitelist
    ]

    await deploy('KingdomKey', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.tags = ['KingdomKey'];
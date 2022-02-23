import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const args = [
        "RoyalKingdom",
        "RK",
        "https://gateway.pinata.cloud/ipfs/xxx/"
    ]

    await deploy('RoyalKingdomPoly', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.tags = ['RoyalKingdomPoly'];
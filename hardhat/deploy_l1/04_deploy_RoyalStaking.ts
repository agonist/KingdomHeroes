import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const network = await hre.ethers.provider.getNetwork();

    const royalKingdom = await hre.ethers.getContractAt('RoyalKingdom', (await deployments.get('RoyalKingdom')).address);
    const creethGold = await hre.ethers.getContractAt('CreethGold', (await deployments.get('CreethGold')).address);

    const args = [
        royalKingdom.address,
        creethGold.address
    ]

    await deploy('RoyalStaking', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.dependencies = ['RoyalKingdom', 'CreethGold'];
func.tags = ['RoyalStaking'];
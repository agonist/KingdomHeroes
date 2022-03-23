import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const network = await hre.ethers.provider.getNetwork();

    const cgld = await hre.ethers.getContractAt('CreethGold', (await deployments.get('CreethGold')).address);

    let fxChild = "0x8397259c983751DAf40400790063935a11afa28a"

    if (network.chainId == 80001) {
        fxChild = "0xCf73231F28B7331BBe3124B907840A94851f9f11"
    }

    if (network.chainId == 31337) {

    }

    const args = [
        fxChild
    ]

    await deploy('KingdomTrainingPoly', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.dependencies = ['CreethGold']
func.tags = ['KingdomTrainingPoly'];

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const royalKingdom = await hre.ethers.getContractAt('RoyalKingdom', (await deployments.get('RoyalKingdom')).address);

    let checkPointManager = "0x2890bA17EfE978480615e330ecB65333b880928e"
    let fxRoot = "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA"

    console.log(royalKingdom.address)

    const args = [
        checkPointManager,
        fxRoot,
        royalKingdom.address
    ]

    await deploy('KingdomEthGate', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.tags = ['KingdomEthGate'];
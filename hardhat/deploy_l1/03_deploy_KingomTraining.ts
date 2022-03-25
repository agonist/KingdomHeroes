import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    const network = await hre.ethers.provider.getNetwork();

    const kingdomKey = await hre.ethers.getContractAt('KingdomKey', (await deployments.get('KingdomKey')).address);
    const kingdomHeroes = await hre.ethers.getContractAt('KingdomHeroes', (await deployments.get('KingdomHeroes')).address);

    let checkpointManager = "0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287"
    let fxRoot = "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2"

    if (network.chainId == 5) {
        fxRoot = "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA"
        checkpointManager = "0x2890bA17EfE978480615e330ecB65333b880928e"
    }

    if (network.chainId == 31337) {
        const fxRootMock = await hre.ethers.getContractAt('FxRootMock', (await deployments.get('FxRootMock')).address);
        fxRoot = fxRootMock.address
    }

    const args = [
        checkpointManager,
        fxRoot,
        kingdomHeroes.address,
        kingdomKey.address
    ]

    await deploy('KingdomTraining', {
        from: deployer,
        args: args,
        log: true,
    });
};
export default func;
func.dependencies = ['KingdomKey', 'KingdomHeroes', 'FxRootMock'];
func.tags = ['KingdomTraining'];

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    const args = [
        "RoyalKingdom",
        "RK",
        "https://gateway.pinata.cloud/ipfs/xxx/",
        10000,
        10,
        2
    ]

    const deployment = await deploy('RoyalKingdom', {
        waitConfirmations: hre.network.live ? 12 : 1,
        gasPrice: (await hre.ethers.provider.getGasPrice()).mul(2),
        from: deployer,
        log: true,
        args: args,
    });


    if (hre.network.live) {
        try {
            const royalKingdom = await deployments.get('RoyalKingdom');
            await hre.run('verify', {
                network: 'mainnet',
                address: royalKingdom.address,
                constructorArgsParams: args
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        const royalKingdom = await deployments.get('RoyalKingdom');
        console.log("Royal Kingdom deployed at: " + royalKingdom.address)
    }
};
export default func;
func.tags = ['RoyalKingdom'];
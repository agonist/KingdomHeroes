import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import {describe} from "mocha";
import {formatEther} from "ethers/lib/utils";
import {expect} from "chai";

async function setup() {

    await deployments.fixture(["CreethGold"]);
    await deployments.fixture(["KingdomTrainingPoly"]);

    const contracts = {
        cgld: (await ethers.getContract('CreethGold')),
        training: (await ethers.getContract('KingdomTrainingPoly')),
    };


    await contracts.training.setCgldContract(contracts.cgld.address)
    await contracts.cgld.setMinter(contracts.training.address, true)

    const {
        deployer: ownerAddr,
        alice: aliceAddr,
        bob: bobAddr,
        carol: carolAddr,
    } = await getNamedAccounts();

    const [owner, alice, bob, carol] = await setupUsers(
        [ownerAddr, aliceAddr, bobAddr, carolAddr],
        contracts
    );

    return {
        ...contracts,
        owner,
        bob, alice, carol
    };
}

describe('KingdomTrainingPoly', function () {

    describe('_processStake', function () {

        it('should stake 1 key and yield 7 cgld after a day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 0, 1)

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(7.0, 0.001)

        });

        it('should stake 1 key and yield 49 cgld after 7 day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 0, 1)

            const days = 7 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(49.0, 0.001)

        });

        it('should stake 1 hero and yield 5 cgld after a day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 1, 1)

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(5.0, 0.001)

        });

        it('should stake 1 hero and yield 50 cgld after 10 day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 1, 1)

            const days = 10 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(50.0, 0.001)

        });

        it('should stake 1 hero and 1 key and yield 12 cgld after 1 day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 0, 1)
            await training.processStake(owner.address, 1, 1)

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(12.0, 0.001)

        });

        it('should stake 10 hero and 5 key and yield 85 cgld after 1 day', async function () {
            // given
            const {training, owner, bob} = await setup();

            await training.processStake(owner.address, 0, 5)
            await training.processStake(owner.address, 1, 10)

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const bal = await training.totalBalance(owner.address)

            expect(parseFloat(formatEther(bal))).to.be.approximately(85.0, 0.001)

        });

        it('should auto claim when staking extra nft', async function () {
            // given
            const {training, cgld, owner, bob} = await setup();

            // stake a key
            await training.processStake(owner.address, 0, 1)

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            await training.processStake(owner.address, 0, 1)
            const bal = await cgld.balanceOf(owner.address)
            const pending = await training.unclaimedYield(owner.address)

            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const pending2 = await training.unclaimedYield(owner.address)


            expect(parseFloat(formatEther(bal))).to.be.approximately(7.0, 0.001)
            expect(parseFloat(formatEther(pending))).to.be.approximately(0, 0.001)
            expect(parseFloat(formatEther(pending2))).to.be.approximately(14, 0.001)

        })
    })

    describe('_processUnstake', function () {
        it('should unstake', async function () {

        });
    })

});

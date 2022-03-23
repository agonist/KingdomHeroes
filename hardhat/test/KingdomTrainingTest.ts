import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import {formatCoin, parseCoin} from "./utils/helpers";
import {expect} from "chai";
import {describe} from "mocha";

async function setup() {

    await deployments.fixture(["FxRootMock"]);
    await deployments.fixture(["KingdomKey"]);
    await deployments.fixture(["KingdomHeroes"]);
    await deployments.fixture(["KingdomTraining"]);

    const contracts = {
        fxRoot: (await ethers.getContract('FxRootMock')),
        training: (await ethers.getContract('KingdomTraining')),
        heroes: (await ethers.getContract('KingdomHeroes')),
        keys: (await ethers.getContract('KingdomKey')),
    };


    // await contracts.token.setMinter(contracts.training.address)

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

describe('KingdomTraining', function () {

    describe('setContractAddresses', function () {
        it('should revert with: "Ownable: caller is not the owner"', async function () {
            // given
            const {training, bob} = await setup();

            // when
            const tx = bob.training.setContractAddresses(training.address, training.address)

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it('should set contracts addresses', async function () {
            // given
            const {training} = await setup();

            // when
            await training.setContractAddresses(training.address, training.address)

            // then
            await expect(await training.heroesContract()).to.be.equal(training.address);
            await expect(await training.keysContract()).to.be.equal(training.address);
        });
    })

    describe('setStakingPaused', function () {
        it('should revert with: "Ownable: caller is not the owner"', async function () {
            // given
            const {training, bob} = await setup();

            // when
            const tx = bob.training.setStakingPaused(true)

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it('should set staking paused', async function () {
            // given
            const {training} = await setup();

            // when
            await training.setStakingPaused(true)

            // then
            expect(await training.stakingPaused()).to.be.equal(true);
        });

        it('should set staking unpaused', async function () {
            // given
            const {training} = await setup();

            // when
            await training.setStakingPaused(true)
            await training.setStakingPaused(false)

            // then
            expect(await training.stakingPaused()).to.be.equal(false);
        });
    })

    describe('heoresBalanceOf', function () {
        it('should return balance of 2 if 2 heroes staked', async function () {
            // given
            const {heroes, training, owner} = await setup();

            // when
            await heroes.toggleSale()
            await heroes.mint(5, {value: parseCoin("0.25")})
            await heroes.setApprovalForAll(training.address, true)
            await training.stakeHero(1)
            await training.stakeHero(2)

            // then
            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(2)
        });
    })

    describe('keysBalanceOf', function () {
        it('should return balance of 1 if 1 keys staked', async function () {
            // given
            const {keys, training, owner} = await setup();

            // when
            await keys.toggleSale()
            await keys.mint({value: parseCoin("0.05")})
            await keys.setApprovalForAll(training.address, true)

            await training.stakeKey(1)

            // then
            expect(await training.keysBalanceOf(owner.address)).to.be.equal(1)
        });
    })

    describe('bulkStake', function () {
        it('should stake 3 heroes and 1 key', async function () {
            // given
            const {keys, heroes, training, owner} = await setup();

            // when
            await heroes.toggleSale()
            await keys.toggleSale()
            await keys.mint({value: parseCoin("0.05")})
            await heroes.mint(5, {value: parseCoin("0.25")})
            await keys.setApprovalForAll(training.address, true)
            await heroes.setApprovalForAll(training.address, true)

            await training.bulkStake([1, 2, 3], 1)

            // then
            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(3)
            expect(await training.keysBalanceOf(owner.address)).to.be.equal(1)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(2)
            expect(await keys.balanceOf(owner.address, 1)).to.be.equal(0)
        });
    })

    describe('bulkUnstake', function () {
        it('should unstake 2 heroes and 1 key', async function () {
            // given
            const {keys, heroes, training, owner} = await setup();

            // when
            await heroes.toggleSale()
            await keys.toggleSale()
            await keys.mint({value: parseCoin("0.05")})
            await heroes.mint(5, {value: parseCoin("0.25")})
            await keys.setApprovalForAll(training.address, true)
            await heroes.setApprovalForAll(training.address, true)

            await training.bulkStake([1, 2, 3], 1)
            await training.bulkUnstake([1, 2], 1)

            // then
            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(1)
            expect(await training.keysBalanceOf(owner.address)).to.be.equal(0)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(4)
            expect(await keys.balanceOf(owner.address, 1)).to.be.equal(1)
        });
    })

    describe('bulkStakeHeroes', function () {
        it('should stake 3 heroes', async function () {
            // given
            const {heroes, training, owner} = await setup();

            // when
            await heroes.toggleSale()
            await heroes.mint(5, {value: parseCoin("0.25")})
            await heroes.setApprovalForAll(training.address, true)

            await training.bulkStakeHeroes([1, 2, 3])

            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(3)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(2)

        });

    })

    describe('bulkUnstakeHero', function () {
        it('should unstake 3 heroes', async function () {
            // given
            const {heroes, training, owner} = await setup();

            // when
            await heroes.toggleSale()
            await heroes.mint(5, {value: parseCoin("0.25")})
            await heroes.setApprovalForAll(training.address, true)

            await training.bulkStakeHeroes([1, 2, 3])
            await training.bulkUnstakeHero([1, 2, 3])

            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(0)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(5)

        });

    })

    describe('stakeHero', function () {

        it('should stake 1 hero', async function () {
            // given
            const {heroes, training, owner} = await setup();

            await heroes.toggleSale()
            await heroes.mint(5, {value: parseCoin("0.25")})

            await heroes.setApprovalForAll(training.address, true)
            await training.stakeHero(1)
            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(1)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(4)
        });

    })

    describe('unstakeHero', function () {

        it('should stake 1 hero', async function () {
            // given
            const {heroes, training, owner} = await setup();

            await heroes.toggleSale()
            await heroes.mint(5, {value: parseCoin("0.25")})

            await heroes.setApprovalForAll(training.address, true)
            await training.stakeHero(1)
            await training.unstakeHero(1)
            expect(await training.heoresBalanceOf(owner.address)).to.be.equal(0)
            expect(await heroes.balanceOf(owner.address)).to.be.equal(5)
        });

    })

    describe('stakeKey', function () {

        it('should stake 1 key', async function () {
            // given
            const {keys, training, owner} = await setup();

            await keys.toggleSale()
            await keys.mint({value: parseCoin("0.05")})

            await keys.setApprovalForAll(training.address, true)
            await training.stakeKey(1)
            expect(await training.keysBalanceOf(owner.address)).to.be.equal(1)
            expect(await keys.balanceOf(owner.address, 1)).to.be.equal(0)
        });

    })

    describe('unstakeKey', function () {

        it('should unstake 1 key', async function () {
            // given
            const {keys, training, owner} = await setup();

            await keys.toggleSale()
            await keys.mint({value: parseCoin("0.05")})

            await keys.setApprovalForAll(training.address, true)
            await training.stakeKey(1)
            await training.unstakeKey(1)
            expect(await training.keysBalanceOf(owner.address)).to.be.equal(0)
            expect(await keys.balanceOf(owner.address, 1)).to.be.equal(1)
        });

    })

})

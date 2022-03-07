import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";
import {formatCoin, parseCoin} from "./utils/helpers";
import {expect} from "chai";
import {BigNumber} from "ethers";

async function setup() {

    await deployments.fixture(["KingdomHeroes"]);
    await deployments.fixture(["CreethGold"]);
    await deployments.fixture(["KingdomStaking"]);
    const contracts = {
        staking: (await ethers.getContract('KingdomStaking')),
        nft: (await ethers.getContract('KingdomHeroes')),
        token: (await ethers.getContract('CreethGold')),
    };

    await contracts.token.setMinter(contracts.staking.address)

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

describe('KingdomStaking', function () {

    describe('stake', function () {

        it('should stake 1 nft', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const res = await staking.stakedTokensIdsOf(owner.address)
            const stakingBalance = await nft.balanceOf(staking.address)
            expect(res[0]).to.equal(1)
            expect(stakingBalance.toNumber()).to.equal(1)
        });

        it('should stake 5 nft', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(5, {value: parseCoin("0.25")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1, 2, 3, 4, 5])

            const res = await staking.stakedTokensIdsOf(owner.address)
            const stakingBalance = await staking.balanceOf(owner.address)
            expect(res[0]).to.equal(1)
            expect(res[1]).to.equal(2)
            expect(res[2]).to.equal(3)
            expect(res[3]).to.equal(4)
            expect(res[4]).to.equal(5)
            expect(stakingBalance.toNumber()).to.equal(5)
        });

    })

    describe('unstake', function () {
        it('should unstake 1 nft', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            await staking.unstake([1])

            const stakingBalance = await nft.balanceOf(staking.address)
            const ownerBalance = await nft.balanceOf(owner.address)
            expect(stakingBalance.toNumber()).to.equal(0)
            expect(ownerBalance.toNumber()).to.equal(1)
        })

        it('should unstake 5 after 10 staked nft', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(10, {value: parseCoin("0.5")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

            await staking.unstake([1, 3, 6, 7, 10])

            const stakingBalance = await nft.balanceOf(staking.address)
            const ownerBalance = await nft.balanceOf(owner.address)
            const res = await staking.stakedTokensIdsOf(owner.address)

            expect(stakingBalance.toNumber()).to.equal(5)
            expect(ownerBalance.toNumber()).to.equal(5)
            expect(res).to.includes(2)
            expect(res).to.includes(4)
            expect(res).to.includes(5)
            expect(res).to.includes(8)
            expect(res).to.includes(9)
        })

    })

    describe('calculateTokenYield', function () {

        it('should yield 25 token for 1 NFT after 1 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateTokenYield(1)
            expect(oneDayYield).to.equal(parseCoin("25"))
        });

        it('should yield 125 token for 1 NFT after 5 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const days = 5 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateTokenYield(1)
            expect(oneDayYield).to.equal(parseCoin("125"))
        });
    })

    describe('calculateYieldForAddress', function () {
        it('should yield 25 token for 1 NFT after 1 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateYieldForAddress(owner.address)
            expect(oneDayYield).to.equal(parseCoin("25"))
        });

        it('should yield 125 token for 1 NFT after 5 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const days = 5 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateYieldForAddress(owner.address)
            expect(oneDayYield).to.equal(parseCoin("125"))
        });

        it('should yield 125 token for 5 NFT after 1 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(5, {value: parseCoin("0.25")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1, 2, 3, 4, 5])

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateYieldForAddress(owner.address)
            expect(oneDayYield).to.equal(parseCoin("125"))
        });

        it('should yield 625 token for 5 NFT after 5 day', async function () {
            // given
            const {nft, staking, owner} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(5, {value: parseCoin("0.25")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1, 2, 3, 4, 5])

            const days = 5 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);

            const oneDayYield = await staking.calculateYieldForAddress(owner.address)
            expect(oneDayYield).to.equal(parseCoin("625"))
        });

    })

    describe('claimYield', function () {

        it('should have 25 CGLD after claiming yield', async function () {
            // given
            const {nft, staking, owner, token} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(1, {value: parseCoin("0.05")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1])

            const days = 1 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);
            await staking.claimYield()

            const balance = await token.balanceOf(owner.address)
            // little trick because timestamp is not 100% accurate
            expect(BigNumber.from(balance).gte(parseCoin("25"))).to.be.true
            expect(BigNumber.from(balance).lte(parseCoin("25.01"))).to.be.true
        });

        it('should have 625 CGLD after claiming yield', async function () {
            // given
            const {nft, staking, owner, token} = await setup();

            // when
            await nft.toggleSale()
            await nft.mint(5, {value: parseCoin("0.25")})
            await nft.setApprovalForAll(staking.address, true)
            await staking.stake([1, 2, 3, 4, 5])

            const days = 5 * 24 * 60 * 60;
            await ethers.provider.send('evm_increaseTime', [days]);
            await ethers.provider.send('evm_mine', []);
            await staking.claimYield()

            const balance = await token.balanceOf(owner.address)
            // little trick because timestamp is not 100% accurate
            expect(BigNumber.from(balance).gte(parseCoin("625"))).to.be.true
            expect(BigNumber.from(balance).lte(parseCoin("625.01"))).to.be.true
            const oneDayYield = await staking.calculateYieldForAddress(owner.address)
            expect(oneDayYield).to.equal(parseCoin("0"))
        });

    })

})

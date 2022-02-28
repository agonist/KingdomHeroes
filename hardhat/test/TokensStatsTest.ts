import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";
import {expect} from "chai";

async function setup() {

    await deployments.fixture(["TokensStats"]);
    const contracts = {
        tokensStats: (await ethers.getContract('TokensStats')),
    };

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

describe('TokensStats', function () {

    describe('frozeInitialStats', function () {

        it('should froze stats', async function () {
            // given
            const {tokensStats} = await setup();

            // when
            await tokensStats.frozeInitialStats()
            const statsFrozen = await tokensStats.initialStatsFrozen()

            // then
            expect(statsFrozen).to.be.true
        })

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {tokensStats, bob} = await setup();

            // when
            const tx = bob.tokensStats.frozeInitialStats()

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        })

    })

    describe('initStats', function () {

        it('should initialize for token id 1', async function () {
            // given
            const {tokensStats} = await setup();
            let stats = Array()
            stats.push({attack: 1, defense: 2, speed: 3, level: 2, hp: 100})

            // when
            await tokensStats.initStats(stats, [1])
            const res = await tokensStats.tokenStats(1)

            // then
            expect(res.attack.toNumber()).to.equal(1)
            expect(res.defense.toNumber()).to.equal(2)
            expect(res.speed.toNumber()).to.equal(3)
            expect(res.level.toNumber()).to.equal(2)
            expect(res.hp.toNumber()).to.equal(100)
        })

        it('should initialize for token id 1 to 10', async function () {
            // given
            const {tokensStats} = await setup();
            let stats = Array()
            let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            for (let i = 0; i < 10; i += 1) {
                stats.push({attack: 1 + i, defense: 2 + i, speed: 3 + i, level: 2 + i, hp: 100 + i})
            }

            // when
            await tokensStats.initStats(stats, ids)
            const res = await tokensStats.getStatsFor(ids)

            // then
            for (let i = 0; i < 10; i += 1) {
                const s = res[i]
                expect(s.attack.toNumber()).to.equal(stats[i].attack)
                expect(s.defense.toNumber()).to.equal(stats[i].defense)
                expect(s.speed.toNumber()).to.equal(stats[i].speed)
                expect(s.level.toNumber()).to.equal(stats[i].level)
                expect(s.hp.toNumber()).to.equal(stats[i].hp)
            }
        })

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {tokensStats, bob} = await setup();
            let stats = Array()
            stats.push({attack: 1, defense: 2, speed: 3, level: 2, hp: 100})

            // when
            const tx = bob.tokensStats.initStats(stats, [1])

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        })

        it('Should be reverted with "init frozen"', async function () {
            // given
            const {tokensStats} = await setup();
            let stats = Array()
            stats.push({attack: 1, defense: 2, speed: 3, level: 2, hp: 100})

            // when
            await tokensStats.frozeInitialStats()
            const tx = tokensStats.initStats(stats, [1])

            // then
            await expect(tx).to.be.revertedWith("init frozen");
        })

    })

})
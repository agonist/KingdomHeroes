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

        it ('should initialize for token id 1', async function (){

        })

    })

})
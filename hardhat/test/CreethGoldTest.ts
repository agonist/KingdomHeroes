import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";
import {expect} from "chai";
import {parseCoin} from "./utils/helpers";

async function setup() {

    await deployments.fixture(["CreethGold"]);
    const contracts = {
        token: (await ethers.getContract('CreethGold'))
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

    contracts.token.setMinter(owner.address, true)

    return {
        ...contracts,
        owner,
        bob, alice, carol
    };
}

describe('CreethGold', function () {
    describe('constructor', function () {
        it('Should initialize', async function () {
            // given
            const {token, owner} = await setup();

        })
    })

    describe('mint', function () {
        it('should be able to mint 1000 token to bob', async function () {
            // given
            const {token, bob} = await setup();

            // when
            await token.mint(bob.address, parseCoin("1000"))

            // expect
            expect(await token.balanceOf(bob.address)).to.equal(parseCoin("1000"))
        })


        it('Should be reverted with "CGLD: Only minter is authorized"', async function () {
            // given
            const {bob} = await setup();

            // when
            const tx = bob.token.mint(bob.address, parseCoin("1000"))

            // then
            await expect(tx).to.be.revertedWith("CGLD: Only minter is authorized");
        });
    })

    describe('burn', function () {
        it('should be able to burn tokens', async function () {
            // given
            const {token, bob} = await setup();

            // when
            await token.mint(bob.address, parseCoin("1000"))
            await bob.token.burn(parseCoin("500"))

            // expect
            expect(await token.balanceOf(bob.address)).to.equal(parseCoin("500"))
        });

    })

    describe('setMinter', function () {
        it('should set a new minter', async function () {
            // given
            const {token, bob} = await setup();

            // when
            await token.setMinter(bob.address, true)

            // then
            expect(await token.minters(bob.address)).to.equal(true)
        })

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {token, bob} = await setup();

            // when
            const tx = bob.token.setMinter(bob.address, true)

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        })
    })
})

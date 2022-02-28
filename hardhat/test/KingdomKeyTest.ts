import {deployments, ethers, getNamedAccounts} from "hardhat";
import {setupUsers} from "./utils";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";
import {expect} from "chai";
import {describe} from "mocha";
import {gp, parseCoin} from "./utils/helpers";

async function setup() {

    await deployments.fixture(["KingdomKey"]);
    const contracts = {
        nft: (await ethers.getContract('KingdomKey')),
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

    const whitelist = [bob.address];
    const ogleafNodes = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(ogleafNodes, keccak256, {
        sortPairs: true,
    });

    return {
        ...contracts,
        owner,
        bob, alice, carol, merkleTree
    };
}

describe('KingdomKey', function () {

    describe('constructor', function () {
        it('should initialize', async function () {
            // given
            const {nft} = await setup();

            // when
            const tokenURI = await nft.uri(1);
            const maxSupply = await nft.maxSupply();
            const saleActive = await nft.saleActive();

            expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/xxx/");
            expect(maxSupply).to.be.equal(100);
            expect(saleActive).to.be.false;
        })
    })

    describe('toggleSale', function () {

        it("Should set sale active", async function () {
            // given
            const {nft, owner} = await setup();

            // when
            await owner.nft.toggleSale();
            const saleActive = await nft.saleActive();

            // then
            expect(saleActive).to.be.true;
        });

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {alice} = await setup();

            // when
            const tx = alice.nft.toggleSale();

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });

    describe('togglePresale', function () {

        it("Should set presale active", async function () {
            // given
            const {nft, owner} = await setup();

            // when
            await owner.nft.togglePresale();
            const saleActive = await nft.presaleActive();

            // then
            expect(saleActive).to.be.true;
        });

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {alice} = await setup();

            // when
            const tx = alice.nft.togglePresale();

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });

    describe("setBaseURI", function () {

        it("Should set new baseTokenURI", async function () {
            // given
            const {nft, owner} = await setup();
            const baseTokenURI = "http://";
            // when
            await owner.nft.setBaseURI(baseTokenURI);
            // then
            expect(await nft.uri(1)).to.be.equal(baseTokenURI);
        });

        it('Should reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {alice} = await setup();
            // when
            const tx = alice.nft.setBaseURI("https://abc/");
            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });

    describe('mint', function () {

        it('Should revert with "Sale inactive"', async function () {
            // given
            const {nft, owner} = await setup()

            // when
            const tx = nft.mint(1)

            // then
            await expect(tx).to.be.revertedWith("Sale inactive")
        })

        it('Should revert with "Mint exceed max supply"', async function () {
            // given
            const {nft, owner} = await setup()
            await nft.toggleSale()

            // when
            const tx = nft.mint(300)

            // then
            await expect(tx).to.be.revertedWith("Mint exceed max supply")
        })

        it('Should revert with "Max mint exceeded"', async function () {
            // given
            const {nft, owner} = await setup()
            await nft.toggleSale()

            // when
            const tx = nft.mint(11)

            // then
            await expect(tx).to.be.revertedWith("Max mint exceeded")
        })

        it('Should revert with "Value sent is incorrect"', async function () {
            // given
            const {nft, bob} = await setup()
            await nft.toggleSale()

            // when
            const tx = bob.nft.mint(1, {value: parseCoin("0.03")})

            // then
            await expect(tx).to.be.revertedWith("Value sent is incorrect")
        })

        it('Should mint 5 NFTs', async function () {
            // given
            const {nft, owner} = await setup()
            await nft.toggleSale()

            // when
            await nft.mint(5, {value: parseCoin("0.25")})

            // then
            expect(await nft.balanceOf(owner.address, 1)).to.be.equal(5);
        })
    })

    describe('mintPresale', function () {
        it('Should revert with "Presale inactive"', async function () {
            // given
            const {nft, owner, merkleTree} = await setup()

            // when
            const tx = nft.mintPresale(1, gp(merkleTree, owner.address))

            //then
            await expect(tx).to.be.revertedWith("Presale inactive");
        })

        it('Should revert with "Not whitelisted"', async function () {
            // given
            const {nft, owner, merkleTree} = await setup()
            await nft.togglePresale()

            // when
            const tx = nft.mintPresale(1, gp(merkleTree, owner.address))

            //then
            await expect(tx).to.be.revertedWith("Not whitelisted");
        })

        it('Should revert with "Whitelist mint exceeded"', async function () {
            // given
            const {nft, bob, merkleTree} = await setup()
            await nft.togglePresale()
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            // when
            await bob.nft.mintPresale(2, gp(merkleTree, bob.address), {value: parseCoin("0.06")})
            const tx = bob.nft.mintPresale(1, gp(merkleTree, bob.address), {value: parseCoin("0.03")})

            //then
            await expect(tx).to.be.revertedWith("Whitelist mint exceeded");
        })

        it('Should revert with "Value sent is incorrect"', async function () {
            // given
            const {nft, bob, merkleTree} = await setup()
            await nft.togglePresale()
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            // when
            const tx = bob.nft.mintPresale(2, gp(merkleTree, bob.address), {value: parseCoin("0.03")})

            //then
            await expect(tx).to.be.revertedWith("Value sent is incorrect");
        })

        it('Should mint 2 presale NFTs', async function () {
            // given
            const {nft, bob, merkleTree} = await setup()
            await nft.togglePresale()
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            // when
            await bob.nft.mintPresale(2, gp(merkleTree, bob.address), {value: parseCoin("0.06")})

            //then
            expect(await nft.balanceOf(bob.address, 1)).to.be.equal(2);
        })
    })

    describe('setWhitelistMerkleRoot', function () {

        it('Should revert with "Ownable: caller is not the owner"', async function () {
            // given
            const {bob, merkleTree} = await setup()

            // when
            const tx = bob.nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            //then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        })

        it('Should set MerkleRoot properly', async function () {
            // given
            const {nft, merkleTree} = await setup()

            // when
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())
            const root = await nft.whitelistMerkleRoot()

            // then
            await expect(root).to.be.equal(merkleTree.getHexRoot())
        })
    })

})
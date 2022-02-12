import {expect} from "chai";
import {waffle} from "hardhat";
import {describe} from "mocha";
import {setup} from "./utils/fixture";
import {gp, parseCoin} from "./utils/helpers";

describe('RoyalKingdom', function () {

    describe('constructor', function () {

        it('should initialize', async function () {
            // given
            const {nft} = await waffle.loadFixture(setup);
            // when
            const name = await nft.name();
            const symbol = await nft.symbol();
            const baseTokenURI = await nft.baseTokenURI();
            const maxSupply = await nft.maxSupply();
            const saleActive = await nft.saleActive();

            // then
            expect(name).to.be.equal("RoyalKingdom");
            expect(symbol).to.be.equal("RK");
            expect(baseTokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/xxx/");
            expect(maxSupply).to.be.equal(100);
            expect(saleActive).to.be.false;
        });

    })

    describe('toggleSlae', function () {

        it("Should set sale active", async function () {
            // given
            const {nft} = await waffle.loadFixture(setup);

            // when
            await nft.toggleSale();
            const saleActive = await nft.saleActive();

            // then
            expect(saleActive).to.be.true;
        });

        it('Should be reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {alice} = await waffle.loadFixture(setup);

            // when
            const tx = alice.nft.toggleSale();

            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });

    describe("tokenURI", function () {

        it("Should return a tokenURI", async function () {
            // given
            const {nft, alice} = await waffle.loadFixture(setup);
            const baseTokenURI = await nft.baseTokenURI();
            await nft.toggleSale();
            await alice.nft.mint(1, {value: parseCoin("0.05")});

            // when
            const tokenURI = await nft.tokenURI(0);
            // then
            expect(tokenURI).to.be.equal(baseTokenURI + 0);
        });

        it('Should reverted with "URI query for nonexistent token"', async function () {
            // given
            const {alice} = await waffle.loadFixture(setup);
            // when
            const tx = alice.nft.tokenURI(1);
            // then
            await expect(tx).to.be.revertedWith("URI query for nonexistent token");
        });

    });

    describe("setBaseURI", function () {

        it("Should set new baseTokenURI", async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);
            const baseTokenURI = "http://";
            // when
            await owner.nft.setBaseURI(baseTokenURI);
            // then
            expect(await nft.baseTokenURI()).to.be.equal(baseTokenURI);
        });

        it('Should reverted with "Ownable: caller is not the owner"', async function () {
            // given
            const {alice} = await waffle.loadFixture(setup);
            // when
            const tx = alice.nft.setBaseURI("https://abc/");
            // then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });

    describe('reserve', function () {

        it('should reserve 5 NFT', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);

            // when
            await nft.reserve(5)

            //then
            expect(await nft.balanceOf(owner.address)).to.be.equal(5);
        })

        it('should revert with "Ownable: caller is not the owner"', async function () {
            // given
            const {bob} = await waffle.loadFixture(setup);

            // when
            const tx = bob.nft.reserve(5)

            //then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it('should revert with "Mint exceed max supply"', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);

            // when
            const tx = nft.reserve(105)

            //then
            await expect(tx).to.be.revertedWith("Mint exceed max supply");
        })

    })

    describe('mint', function () {

        it('Should revert with "Sale inactive"', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);

            // when
            const tx = nft.mint(1)

            // then
            await expect(tx).to.be.revertedWith("Sale inactive")
        })

        it('Should revert with "Mint exceed max supply"', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);
            await nft.toggleSale()

            // when
            const tx = nft.mint(300)

            // then
            await expect(tx).to.be.revertedWith("Mint exceed max supply")
        })

        it('Should revert with "Max mint exceeded"', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);
            await nft.toggleSale()

            // when
            const tx = nft.mint(11)

            // then
            await expect(tx).to.be.revertedWith("Max mint exceeded")
        })

        it('Should revert with "Value sent is incorrect"', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);
            await nft.toggleSale()

            // when
            const tx = nft.mint(1, {value: parseCoin("0.03")})

            // then
            await expect(tx).to.be.revertedWith("Value sent is incorrect")
        })

        it('Should mint 5 NFTs', async function () {
            // given
            const {nft, owner} = await waffle.loadFixture(setup);
            await nft.toggleSale()

            // when
            await nft.mint(5, {value: parseCoin("0.25")})

            // then
            expect(await nft.balanceOf(owner.address)).to.be.equal(5);
        })
    })

    describe('mintPresale', function () {
        it('Should revert with "Presale inactive"', async function () {
            // given
            const {nft, owner, merkleTree} = await waffle.loadFixture(setup);

            // when
            const tx = nft.mintPresale(1, gp(merkleTree, owner.address))

            //then
            await expect(tx).to.be.revertedWith("Presale inactive");
        })

        it('Should revert with "Not whitelisted"', async function () {
            // given
            const {nft, owner, merkleTree} = await waffle.loadFixture(setup);
            await nft.togglePresale()

            // when
            const tx = nft.mintPresale(1, gp(merkleTree, owner.address))

            //then
            await expect(tx).to.be.revertedWith("Not whitelisted");
        })

        it('Should revert with "Whitelist mint exceeded"', async function () {
            // given
            const {nft, bob, merkleTree} = await waffle.loadFixture(setup);
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
            const {nft, bob, merkleTree} = await waffle.loadFixture(setup);
            await nft.togglePresale()
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            // when
            const tx = bob.nft.mintPresale(2, gp(merkleTree, bob.address), {value: parseCoin("0.03")})

            //then
            await expect(tx).to.be.revertedWith("Value sent is incorrect");
        })

        it('Should mint 2 presale NFTs', async function () {
            // given
            const {nft, bob, merkleTree} = await waffle.loadFixture(setup);
            await nft.togglePresale()
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            // when
            await bob.nft.mintPresale(2, gp(merkleTree, bob.address), {value: parseCoin("0.06")})

            //then
            expect(await nft.balanceOf(bob.address)).to.be.equal(2);
        })
    })

    describe('setWhitelistMerkleRoot', function () {

        it('Should revert with "Ownable: caller is not the owner"', async function () {
            // given
            const {bob, merkleTree} = await waffle.loadFixture(setup);

            // when
            const tx = bob.nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())

            //then
            await expect(tx).to.be.revertedWith("Ownable: caller is not the owner");
        })

        it('Should set MerkleRoot properly', async function () {
            // given
            const {nft, merkleTree} = await waffle.loadFixture(setup);

            // when
            await nft.setWhitelistMerkleRoot(merkleTree.getHexRoot())
            const root = await nft.whitelistMerkleRoot()

            // then
            await expect(root).to.be.equal(merkleTree.getHexRoot())
        })
    })
});

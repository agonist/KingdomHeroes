import {deployments, ethers, getNamedAccounts, waffle} from "hardhat";
import {Contract} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
// eslint-disable-next-line camelcase
import {RoyalKingdom__factory} from "../../typechain-types";
import keccak256 from "keccak256";
import {MerkleTree} from "merkletreejs";

export async function setup() {
    await deployments.fixture();

    const provider = waffle.provider;
    const [deployer] = await ethers.getSigners();

    const {
        deployer: ownerAddr,
        alice: aliceAddr,
        bob: bobAddr,
        carol: carolAddr,
    } = await getNamedAccounts();

    const Nft = await ethers.getContractFactory("RoyalKingdom");
    const nft = await Nft.deploy(
        "RoyalKingdom",
        "RK",
        "https://gateway.pinata.cloud/ipfs/xxx/",
        100,
        10,
        2
    );

    await nft.deployed();

    const contracts = {
        // eslint-disable-next-line camelcase
        nft: RoyalKingdom__factory.connect(nft.address, deployer),
    };

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
        provider,
        owner,
        alice,
        bob,
        carol,
        merkleTree
    };
}

type UserHelper<T extends { [contractName: string]: Contract }> =
    SignerWithAddress & T;

export async function setupUsers<T extends { [contractName: string]: Contract }>(addresses: string[], contracts: T): Promise<UserHelper<T>[]> {
    const users: UserHelper<T>[] = [];
    for (const address of addresses) {
        users.push(await setupUser(address, contracts));
    }
    return users;
}

export async function setupUser<T extends { [contractName: string]: Contract }>(
    address: string,
    contracts: T
): Promise<UserHelper<T>> {
    const signer = await ethers.getSigner(address);
    const user: any = signer;
    for (const key of Object.keys(contracts)) {
        user[key] = contracts[key].connect(signer);
    }
    return user as UserHelper<T>;
}

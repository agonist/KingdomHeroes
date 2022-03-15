import * as dotenv from "dotenv";

import {HardhatUserConfig, task} from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";
import "tsconfig-paths/register";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-watcher";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-gas-reporter"

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.12",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: 'hardhat',

    networks: {

        hardhat: {
            deploy: ['deploy_l1', 'deploy_l2'],
            companionNetworks: {
                l1: 'hardhat',
            },
        },

        goerli: {
            url: process.env.GOERLI_URL || "",
            accounts: process.env.GOERLI_KEY !== undefined ? [process.env.GOERLI_KEY] : [],
            deploy: ['deploy_l1'],
        },

        mumbai: {
            url: process.env.MUMBAI_URL || "",
            accounts: process.env.MUMBAI_KEY !== undefined ? [process.env.MUMBAI_KEY] : [],
            deploy: ['deploy_l2'],
        },
        polygon: {
            url: process.env.POLYGON_URL || "",
            accounts: process.env.POLYGON_KEY !== undefined ? [process.env.POLYGON_KEY] : [],
        },
        mainnet: {
            url: process.env.MAINNET_URL || "",
            accounts: process.env.MAINNET_KEY !== undefined ? [process.env.MAINNET_KEY] : [],
        },

    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        coinmarketcap: "91bdfff2-47fe-4ef7-83e5-8f2260e53b68",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: 0,
        alice: 1,
        bob: 2,
        carol: 3,
    },
};

export default config;

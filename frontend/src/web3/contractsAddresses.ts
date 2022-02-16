import {Networks} from "./blockchain";

const LOCALHOST = {
    ROYAL_KINGDOM: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
}

const RINKEBY = {
    ROYAL_KINGDOM: ""

}

const MAINNET = {
    ROYAL_KINGDOM: ""

}


export const getAddresses = (networkID: number) => {
    if (networkID === Networks.LOCALHOST) return LOCALHOST;
    if (networkID === Networks.MAINNET) return MAINNET;
    if (networkID === Networks.RINKEBY) return RINKEBY;

    throw Error("Network don't support");
};

import {Networks} from "./blockchain";

const LOCALHOST = {

}

const RINKEBY = {

}

const MAINNET = {

}


export const getAddresses = (networkID: number) => {
    if (networkID === Networks.LOCALHOST) return LOCALHOST;
    if (networkID === Networks.MAINNET) return MAINNET;
    if (networkID === Networks.RINKEBY) return RINKEBY;

    throw Error("Network don't support");
};

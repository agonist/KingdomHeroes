
export enum Networks {
    LOCALHOST = 31337,
    MAINNET = 1,
    RINKEBY = 4,
}

export enum NetworksURI {
    LOCALHOST = "http://127.0.0.1:8545",
    MAINNET = "",
    RINKEBY = "",
}

export const DEFAULT_NETWORK = Networks.LOCALHOST;
export const DEFAULT_URI = NetworksURI.LOCALHOST;

export const getURI = (networkID: number) => {
    if (networkID === Networks.LOCALHOST) return NetworksURI.LOCALHOST;
    if (networkID === Networks.RINKEBY) return NetworksURI.RINKEBY;
    if (networkID === Networks.MAINNET) return NetworksURI.MAINNET;

    throw Error("Network don't support");
};

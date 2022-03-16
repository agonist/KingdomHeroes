
export enum Networks {
    LOCALHOST = 31337,
    MAINNET = 1,
    GOERLI = 5,
}

export enum NetworksURI {
    LOCALHOST = "http://127.0.0.1:8545",
    MAINNET = "https://eth-goerli.alchemyapi.io/v2/e4te75ZmUsKlE6GU1bRd82F7_FUDDF0F",
    GOERLI = "https://eth-goerli.alchemyapi.io/v2/e4te75ZmUsKlE6GU1bRd82F7_FUDDF0F",
}

export const DEFAULT_NETWORK = Networks.GOERLI;
export const DEFAULT_URI = NetworksURI.GOERLI;

export const getURI = (networkID: number) => {
    if (networkID === Networks.LOCALHOST) return NetworksURI.LOCALHOST;
    if (networkID === Networks.GOERLI) return NetworksURI.GOERLI;
    if (networkID === Networks.MAINNET) return NetworksURI.MAINNET;

    throw Error("Network don't support");
};

const CONTRACTS = {
    KINGDOM_HEROES: process.env.REACT_APP_KINGDOM_HEROES!,
    KINGDOM_KEY: process.env.REACT_APP_KINGDOM_KEY!,
    CREETH_GOLD: process.env.REACT_APP_CREETH_GOLD!,
    KINGDOM_TRAINING_ETH: process.env.REACT_APP_KINGDOM_TRAINING_ETH!
}


export const getAddresses = (networkID: number) => {
    return CONTRACTS;
};

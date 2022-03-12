import React, {useState, ReactElement, useContext, useMemo, useCallback, useEffect} from "react";
import Web3Modal from "web3modal";
import {StaticJsonRpcProvider, JsonRpcProvider, Web3Provider} from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {Networks, DEFAULT_NETWORK, DEFAULT_URI, NetworksURI, getURI} from "./blockchain";
import {swithNetwork} from "./switch-network";
import {Web3Params} from "../store/utils/params";

type onChainProvider = {
    connect: () => Promise<Web3Provider>;
    disconnect: () => void;
    checkWrongNetwork: () => Promise<boolean>;
    provider: JsonRpcProvider;
    address: string;
    connected: Boolean;
    web3Modal: Web3Modal;
    chainID: number;
    web3?: any;
    providerChainID: number;
    hasCachedProvider: () => boolean;
    web3Params: Web3Params;
};

export type Web3ContextData = {
    onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
    const web3Context = useContext(Web3Context);
    if (!web3Context) {
        throw new Error("useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.");
    }
    const {onChainProvider} = web3Context;
    return useMemo(() => {
        return {...onChainProvider};
    }, [web3Context, onChainProvider]);
};

export const useAddress = () => {
    const {address} = useWeb3Context();
    return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({children}) => {
    const [connected, setConnected] = useState(false);
    const [chainID, setChainID] = useState(DEFAULT_NETWORK);
    const [providerChainID, setProviderChainID] = useState(DEFAULT_NETWORK);
    const [address, setAddress] = useState("");

    const [uri, setUri] = useState(DEFAULT_URI);
    const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri));

    const [web3Modal, setWeb3Modal] = useState<Web3Modal>()

    useEffect(() => {
        let modal = new Web3Modal({
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            [Networks.MAINNET]: NetworksURI.MAINNET,
                            [Networks.RINKEBY]: NetworksURI.RINKEBY,
                            [Networks.LOCALHOST]: NetworksURI.LOCALHOST,
                        },
                    },
                },
            },
        })
        setWeb3Modal(modal)
    }, [])

    const hasCachedProvider = (): boolean => {
        return !(!web3Modal || !web3Modal.cachedProvider);

    };

    const _initListeners = useCallback(
        (rawProvider: JsonRpcProvider) => {
            if (!rawProvider.on) {
                return;
            }

            rawProvider.on("accountsChanged", () => setTimeout(() => window.location.reload(), 1));

            rawProvider.on("chainChanged", async (chain: number) => {
                changeNetwork(chain);
            });

            rawProvider.on("network", (_newNetwork, oldNetwork) => {
                if (!oldNetwork) return;
                window.location.reload();
            });
        },
        [provider],
    );

    const changeNetwork = async (otherChainID: number) => {
        const network = Number(otherChainID);

        setProviderChainID(network);
        setChainID(network)
        setUri(getURI(network))
    };

    const connect = useCallback(async () => {
        if (web3Modal === undefined) return

        const rawProvider = await web3Modal.connect();

        _initListeners(rawProvider);

        const connectedProvider = new Web3Provider(rawProvider, "any");

        const chainId = await connectedProvider.getNetwork().then(network => Number(network.chainId));
        const connectedAddress = await connectedProvider.getSigner().getAddress();

        setAddress(connectedAddress);

        setProviderChainID(chainId);

        setProvider(connectedProvider);

        setConnected(true);

        return connectedProvider;
    }, [provider, web3Modal, connected]);

    const checkWrongNetwork = async (): Promise<boolean> => {
        if (providerChainID !== DEFAULT_NETWORK) {
            const shouldSwitch = window.confirm("Wrong network");
            if (shouldSwitch) {
                await swithNetwork();
                window.location.reload();
            }
            return true;
        }

        return false;
    };

    const disconnect = useCallback(async () => {
        if (web3Modal === undefined) return

        web3Modal.clearCachedProvider();
        setConnected(false);

        setTimeout(() => {
            window.location.reload();
        }, 1);
    }, [provider, web3Modal, connected]);

    const params = useCallback(async () => {

        let p: Web3Params = {
            networkID: chainID, provider: provider, address: address
        }
        return p

    }, [provider, chainID, address])

    const onChainProvider = useMemo(
        () => ({
            connect,
            disconnect,
            hasCachedProvider,
            provider,
            connected,
            address,
            chainID,
            web3Modal,
            providerChainID,
            checkWrongNetwork,
            params,
        }),
        [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, providerChainID, params],
    );
    //@ts-ignore
    return <Web3Context.Provider value={{onChainProvider}}>{children}</Web3Context.Provider>;
};

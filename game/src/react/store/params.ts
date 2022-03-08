import {JsonRpcProvider, StaticJsonRpcProvider} from "@ethersproject/providers";
import {Networks} from "../web3/blockchain";

export interface Web3Params {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

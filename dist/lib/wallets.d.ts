import { IStatusHandlers, IWallets } from "../interface/Igwallet";
export declare class Wallets implements IWallets {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: string;
    response: any;
    statusHandlers: IStatusHandlers;
    constructor(RPC_URL: string, NETWORK_ID: string, INFURA_ID: string, statusHandlers: IStatusHandlers);
    MetaMask(): Promise<void>;
    WalletConnect(): Promise<void>;
}

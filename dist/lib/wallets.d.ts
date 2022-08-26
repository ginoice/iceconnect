import { IStatusHandlers, IWallets, IStatusHandlersCallBack } from "../interface/Igwallet";
export declare class Wallets implements IWallets {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: string;
    response: any;
    statusHandlers: IStatusHandlers;
    callback: IStatusHandlersCallBack;
    provider: any;
    typeWallet: string | null;
    constructor(RPC_URL: string, NETWORK_ID: string, INFURA_ID: string, statusHandlers: IStatusHandlers, callback: IStatusHandlersCallBack);
    MetaMask(): Promise<void>;
    WalletConnect(): Promise<void>;
    disconectWallet(): Promise<void>;
}

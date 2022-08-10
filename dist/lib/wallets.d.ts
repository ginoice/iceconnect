import { IStatusHandlers, IWallets, IStatusHandlersCallBack } from "../interface/Igwallet";
export declare class Wallets implements IWallets {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: string;
    response: any;
    statusHandlers: IStatusHandlers;
    callback: IStatusHandlersCallBack;
    constructor(RPC_URL: string, NETWORK_ID: string, INFURA_ID: string, statusHandlers: IStatusHandlers, callback: IStatusHandlersCallBack);
    MetaMask(): Promise<void>;
    WalletConnect(): Promise<void>;
}

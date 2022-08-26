import { IStatusHandlers, IWallets, IStatusHandlersCallBack } from "../interface/Igwallet";
export declare class Wallets implements IWallets {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: string;
    response: any;
    statusHandlers: IStatusHandlers;
    callback: IStatusHandlersCallBack;
    provider: any;
    constructor(RPC_URL: string, NETWORK_ID: string, INFURA_ID: string, statusHandlers: IStatusHandlers, callback: IStatusHandlersCallBack);
    MetaMask(employee: any): Promise<void>;
    WalletConnect(employee: any): Promise<void>;
}

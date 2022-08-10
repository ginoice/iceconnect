import { IOptions, IRender, IStatusHandlers, IWallet, IStatusHandlersCallBack } from '../interface/Igwallet';
export declare class Wallet implements IWallet {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: any;
    render: IRender;
    hooks: IStatusHandlers;
    constructor(options: IOptions);
    ConnectWallet(callback: IStatusHandlersCallBack): void;
    MetaMask(callback: IStatusHandlersCallBack): void;
    WalletConnect(callback: IStatusHandlersCallBack): void;
}

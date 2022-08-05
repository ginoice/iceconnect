import { IOptions, IRender, IStatusHandlers, IWallet } from '../interface/Igwallet';
export declare class Wallet implements IWallet {
    RPC_URL: string;
    NETWORK_ID: string;
    INFURA_ID: any;
    render: IRender;
    hooks: IStatusHandlers;
    constructor(options: IOptions);
    ConnectWallet(): void;
    MetaMask(): void;
    WalletConnect(): void;
}

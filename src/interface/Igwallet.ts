export interface IRenderStyle {
  style():string
}

export interface IRender {
  headDomElement: HTMLHeadElement | null
  bodyDomElement: HTMLBodyElement | null
  bodyMainElement: HTMLDivElement
  style: HTMLStyleElement
  render(): void
}

export interface IStatusHandlers {
  connecting: (description: string) => void
  connectionSuccess: (success: object) => void
  connectionFailed: (failed: string | any) => void
}

export interface IStatusHandlersCallBack {
  connecting: (description: string) => void
  connectionSuccess: (success: object) => void
  connectionFailed: (failed: string | any) => void
}

export interface IOptions {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID?: string
  hooks: IStatusHandlers
}

export interface IWallet {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: any
  render: IRender
  hooks: IStatusHandlers
  provider: null
  ConnectWallet (callback: IStatusHandlersCallBack):void
  useMetaMask (callback: IStatusHandlersCallBack): void
  useWalletConnect (callback: IStatusHandlersCallBack):void
  disconnect(): void
  autoConnect (callback: IStatusHandlersCallBack):void
}

export interface IWallets {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: string
  response: any
  statusHandlers: IStatusHandlers
  callback: IStatusHandlersCallBack
  provider: any
  MetaMask(employee:any): Promise<void>
  WalletConnect(employee:any): Promise<void>
}

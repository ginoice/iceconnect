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

export interface IOptions {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID?: string
  hooks: IStatusHandlers
}

export interface IWallets {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: string
  response: any
  statusHandlers: IStatusHandlers
  MetaMask(): Promise<void>
  WalletConnect(): Promise<void>
}

export interface IWallet {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: string
  render: IRender
  hooks: IStatusHandlers
  ConnectWallet ():void
  MetaMask (): void
  WalletConnect ():void
}
import { IOptions, IRender, IStatusHandlers, IWallet } from '../interface/Igwallet'
import { Render } from './render'
import { Wallets } from './wallets'

export class Wallet implements IWallet {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: string
  render: IRender = new Render()
  hooks: IStatusHandlers

  constructor (options: IOptions) {
    this.RPC_URL = options.RPC_URL
    this.NETWORK_ID = options.NETWORK_ID,
    this.INFURA_ID = options.INFURA_ID,

    this.hooks = options.hooks
  }

  ConnectWallet ():void {
    this.render.render()
    const clickEvent = async (e: MouseEvent) => {
      const event: HTMLElement = e.target as HTMLElement
      if (!event.closest('.gwallet-content')) {
        this.render.bodyMainElement.remove()
        this.render.style.remove()
        this.render.bodyMainElement.removeEventListener('click', clickEvent)
      }
      if (event.closest('#MetaMask')) await this.MetaMask()
      if (event.closest('#WalletConnect')) await this.WalletConnect()
    }
    this.render.bodyMainElement.addEventListener('click', clickEvent)
  }

  MetaMask (): void {
    const MetaMask = new Wallets(
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks
    )
    MetaMask.MetaMask()
  }

  WalletConnect ():void  {
    const WalletConnect:any = new Wallets(
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks
    )
    WalletConnect.WalletConnect()
  }
}
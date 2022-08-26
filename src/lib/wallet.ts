import { IOptions, IRender, IStatusHandlers, IWallet, IStatusHandlersCallBack } from '../interface/Igwallet'
import { Render } from './render'
import { Wallets } from './wallets'

export class Wallet implements IWallet {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: any
  render: IRender = new Render()
  hooks: IStatusHandlers
  provider: any

  constructor (options: IOptions) {
    this.RPC_URL = options.RPC_URL
    this.NETWORK_ID = options.NETWORK_ID,
    this.INFURA_ID = options.INFURA_ID,

    this.hooks = options.hooks
    this.provider = null
  }

  // async watcher (e: MouseEvent):Promise<void> {
    // const event: HTMLElement = e.target as HTMLElement

    // if (!event.closest('.gwallet-content')) {
    //   this.render.bodyMainElement.remove()
    //   this.render.style.remove()
    //   this.render.bodyMainElement.removeEventListener('click', clickEvent)
    // }
    // if (event.closest('#MetaMask')) await this.MetaMask(callback)
    // if (event.closest('#WalletConnect')) await this.WalletConnect(callback)
  // }

  ConnectWallet (callback: IStatusHandlersCallBack):void {
    this.render.render()
    const clickEvent = async (e: MouseEvent) => {

      const event: HTMLElement = e.target as HTMLElement

      if (!event.closest('.gwallet-content')) {
        this.render.bodyMainElement.remove()
        this.render.style.remove()
        this.render.bodyMainElement.removeEventListener('click', clickEvent)
      }
      if (event.closest('#MetaMask')) await this.MetaMask(callback)
      if (event.closest('#WalletConnect')) await this.WalletConnect(callback)
    }
    this.render.bodyMainElement.addEventListener('click', clickEvent)
  }

  MetaMask (callback: IStatusHandlersCallBack): void {
    const MetaMask = new Wallets (
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks,
      callback
    )

    MetaMask.MetaMask({
      employee: (res: any) => {
        this.provider = res
        this.render.bodyMainElement.remove()
        this.render.style.remove()
      }
    })
  }

  WalletConnect (callback: IStatusHandlersCallBack):void  {
    const WalletConnect:any = new Wallets (
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks,
      callback,
    )

    WalletConnect.WalletConnect({
      employee: (res: any) => {
        this.provider = res
        this.render.bodyMainElement.remove()
        this.render.style.remove()
      }
    })

  }

  disconnect () {
    if (this.provider === 'MetaMask') window.location.reload()
    else if (this.provider !== 'MetaMask') this.provider.disconnect()
  }
}
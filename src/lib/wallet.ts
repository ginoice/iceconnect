import { IOptions, IRender, IStatusHandlers, IWallet, IStatusHandlersCallBack } from '../interface/Igwallet'
import { ModalWindow } from './render'
import { Wallets } from './wallets'

export class Wallet implements IWallet {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: any
  modalWindow: IRender = new ModalWindow()
  hooks: IStatusHandlers
  provider: any

  constructor (options: IOptions) {
    this.RPC_URL = options.RPC_URL
    this.NETWORK_ID = options.NETWORK_ID,
    this.INFURA_ID = options.INFURA_ID,

    this.hooks = options.hooks
    this.provider = null
  }

  ConnectWallet (callback: IStatusHandlersCallBack):void {
    this.modalWindow.render({
      useMetaMask: () => this.useMetaMask(callback),
      useWalletConnect: () => this.useWalletConnect(callback)
    })
  }

  useMetaMask (callback: IStatusHandlersCallBack): void {
    const MetaMask = new Wallets (
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks,
      callback
    )

    window.localStorage.setItem('iceConnect', 'MetaMask')

    MetaMask.MetaMask({
      employee: (res: any) => {
        this.provider = res
        this.modalWindow.bodyMainElement.remove()
        this.modalWindow.style.remove()
      }
    })
  }

  useWalletConnect (callback: IStatusHandlersCallBack):void  {
    const WalletConnect:any = new Wallets (
      this.RPC_URL,
      this.NETWORK_ID,
      this.INFURA_ID,
      this.hooks,
      callback,
    )

    window.localStorage.setItem('iceConnect', 'WalletConnect')

    WalletConnect.WalletConnect({
      employee: (res: any) => {
        this.provider = res
        this.modalWindow.bodyMainElement.remove()
        this.modalWindow.style.remove()
      }
    })
  }

  disconnect () {
    try {
      if (this.provider === 'MetaMask') {
        window.localStorage.removeItem('iceConnect')
        window.location.reload()
      } 
      else if (this.provider !== 'MetaMask') {
        window.localStorage.removeItem('iceConnect')
        this.provider.disconnect()
      }
    }
    catch {
      console.error('You need to connect a wallet. To connect use the method "ConnectWallet"')
    }
  }

  autoConnect (callback: IStatusHandlersCallBack): void {
    if (window.localStorage.getItem('iceConnect') === 'MetaMask') this.useMetaMask(callback)
    else if (window.localStorage.getItem('iceConnect') === 'WalletConnect') this.useWalletConnect(callback)
    else this.ConnectWallet(callback)
  }

}
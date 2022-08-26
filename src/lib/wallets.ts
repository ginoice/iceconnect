import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { IStatusHandlers, IWallets, IStatusHandlersCallBack } from "../interface/Igwallet"

export class Wallets implements IWallets {
  RPC_URL: string
  NETWORK_ID: string
  INFURA_ID: string
  response: any
  statusHandlers: IStatusHandlers
  callback: IStatusHandlersCallBack
  provider: any

  typeWallet: string | null

  constructor (
      RPC_URL: string,
      NETWORK_ID: string,
      INFURA_ID: string,
      statusHandlers: IStatusHandlers,
      callback: IStatusHandlersCallBack,
    )
    {
      this.RPC_URL = RPC_URL
      this.NETWORK_ID = NETWORK_ID
      this.INFURA_ID = INFURA_ID
      this.response = null

      this.statusHandlers = statusHandlers
      this.callback = callback
      this.provider = null

      this.typeWallet = null
  }

  async MetaMask(): Promise<void>  {
    let { ethereum }: any = window
    if (typeof ethereum !== 'undefined') {

      this.statusHandlers.connecting('Connecting')
      this.callback.connecting('Connecting')

      const walletAddress:string[] = await ethereum.request({ method: 'eth_requestAccounts' })
      if (ethereum.chainId == this.NETWORK_ID) {
        if (walletAddress) {
          this.response = {
            walletAddress: walletAddress[0],
            web3Provider: new ethers.providers.Web3Provider(ethereum),
          }

          this.typeWallet = 'MetaMask'
          this.statusHandlers.connectionSuccess(this.response)
          this.callback.connectionSuccess(this.response)

        }
      } else {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: this.NETWORK_ID}]
          })
          this.response = {
            walletAddress: walletAddress[0],
            web3Provider: new ethers.providers.Web3Provider(ethereum),
          }

          this.typeWallet = 'MetaMask'
          this.statusHandlers.connectionSuccess(this.response)
          this.callback.connectionSuccess(this.response)
  
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: this.NETWORK_ID,
                  rpcUrls: [`${this.RPC_URL}${this.INFURA_ID}`],
                  chainName: 'newChain',
                  nativeCurrency: {
                    name: "bnb",
                    symbol: "bnb",
                    decimals: 18
                  }
                }]
              })
              this.response = {
                walletAddress: walletAddress[0],
                web3Provider: new ethers.providers.Web3Provider(ethereum),
              }

              this.typeWallet = 'MetaMask'
              this.statusHandlers.connectionSuccess(this.response)
              this.callback.connectionSuccess(this.response)

            } catch (err) {
              console.log(err)
              this.statusHandlers.connectionFailed(err)
              this.callback.connectionFailed(this.response)
            }
          }
        }
      }
    }
    else if (typeof ethereum == "undefined") {
      window.open(`https://metamask.app.link/dapp/${window.location.host}`)
    }
  }

  async WalletConnect(): Promise<void> {
    const provider:any = new WalletConnectProvider({
      infuraId: this.INFURA_ID,
      rpc: {
        [Number(this.NETWORK_ID)]: this.RPC_URL
      },
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar"
        ]
      }
    })

    this.provider = provider

    this.statusHandlers.connecting('Connecting')

    const account:any = await provider.enable()

    if (account) {
      this.response = {
        walletAddress: account[0],
        web3Provider: new ethers.providers.Web3Provider(provider),
      }

      this.typeWallet = 'WalletConnect'

      this.statusHandlers.connectionSuccess(this.response)
      this.callback.connectionSuccess(this.response)
    } else if (!account) {
      this.statusHandlers.connectionFailed('Wallet not connected')
      this.callback.connectionFailed(this.response)
    }
  }

  async disconectWallet (): Promise<void> {
    if (this.typeWallet === 'MetaMask') window.location.reload()
    if (this.typeWallet === 'WalletConnect') await this.provider.disconnect()
  }

}
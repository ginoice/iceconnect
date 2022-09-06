import { ModalWindow } from "./lib/render";
import { Wallet } from "./lib/wallet";
import { Wallets } from "./lib/wallets";
import { ethers, BigNumber } from 'ethers';
import { emitter } from './extensions/event-emitter'

export {
  ModalWindow,
  Wallet,
  Wallets,
  ethers,
  BigNumber,
  emitter
}

export default {
  ModalWindow,
  Wallet,
  Wallets,
  ethers,
  BigNumber,
  emitter
}

const RPC_URL = 'https://rinkeby.infura.io/v3/edefe768418643729b9f1d6194f9d193'
const NETWORK_ID = '0x4'

const btn:HTMLButtonElement = document.querySelector('.btn-connect') as HTMLButtonElement

const wallet:any = new Wallet({
  RPC_URL: RPC_URL,
  NETWORK_ID: NETWORK_ID,
  INFURA_ID: "",
  hooks: {
    connecting: res => console.log(res),
    connectionSuccess: () => console.log('res'),
    connectionFailed: () => console.log('failed'),
  }
})

btn.addEventListener('click', () => {
  wallet.ConnectWallet({
    connecting: (res: any) => console.log(res),
    connectionSuccess: (res: any) => console.log(res),
    connectionFailed: (res:any) => console.log(res)
  })
})

const btnDis:HTMLButtonElement = document.querySelector('.btn-disconect') as HTMLButtonElement

btnDis.addEventListener('click', () => {
  wallet.disconnect()
})

const btnAutoConnect:HTMLButtonElement = document.querySelector('.btn-autoConnect') as HTMLButtonElement

btnAutoConnect.addEventListener('click', () => {
  wallet.autoConnect({
    connecting: (res: any) => console.log(res),
    connectionSuccess: (res: any) => console.log(res),
    connectionFailed: (res:any) => console.log(res)
  })
})
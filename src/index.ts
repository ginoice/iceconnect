import { Wallet } from "./lib/wallet"

const wallet = new Wallet ({
  RPC_URL: 'https://rinkeby.infura.io/v3/',
  NETWORK_ID: '0x4',
  INFURA_ID: 'afa71de7abfb45beb016ac97e40f19ff',
  hooks: {
    connecting: (res:string):void => console.log(res),
    connectionSuccess: (success: object):void => console.log(success),
    connectionFailed: (failed: string):void => console.log(failed)
  }
})

const button: HTMLButtonElement = document.querySelector('.button')

button.addEventListener('click', async () => {
  await wallet.ConnectWallet()
})
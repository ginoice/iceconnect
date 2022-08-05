<<<<<<< HEAD
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ProviderRpcError } from "./interface/Igwallet";
import { Wallet } from "./lib/wallet"
=======
import { Render } from "./lib/render";
import { Wallet } from "./lib/wallet";
import { Wallets } from "./lib/wallets";
import { ethers } from 'ethers';
>>>>>>> aee012ccb7fc658fd7a798a989612d244c861bf4

export {
  Render,
  Wallet,
  Wallets,
  ethers
}

<<<<<<< HEAD
const button: HTMLButtonElement = document.querySelector('.button')
const buttonClose: HTMLButtonElement = document.querySelector('.closeButton')


button.addEventListener('click', async () => {
  await wallet.ConnectWallet();
})

buttonClose.addEventListener('click', async () => {
  await wallet.Disconnect();
})
=======
export default {
  Render,
  Wallet,
  Wallets,
  ethers
}
>>>>>>> aee012ccb7fc658fd7a798a989612d244c861bf4

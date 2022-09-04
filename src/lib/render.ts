import { IRender, IRenderStyle } from '../interface/Igwallet'

export class RenderStyle implements IRenderStyle {
  style ():string {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');

      .gwallet-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: rgba(244, 238, 255, 0.6);
      }
      .gwallet-body {
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
      }
      .gwallet-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 20px;
        max-width: 320px;
        width: 100%;
        background-color: rgb(82, 107, 240);
        border-radius: 20px;

        // background: rgba(217, 217, 217, 0.5);
        // border: 1px solid #FFFFFF;
        // backdrop-filter: blur(20px);
        // border-radius: 0px 50px 50px 0px;

        // backdrop-filter: blur(2px);
        // box-shadow: inset 0 0 0 4964px rgb(255 255 255 / 71%);
      }
      .gwallet-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        cursor: pointer;
        border-radius: 20px;
        padding: 15px 0;
        transition: background .3s ease;
        color: #ffffff;

        font-family: 'Open Sans', sans-serif;
      }
      .gwallet-item + .gwallet-item {
        margin-top: 10px
      }
      @media (any-hover: hover) {
        .gwallet-item:hover {
          background: rgba(244, 238, 255, 0.6);
        }
      }
      .description {
        color: #fff;
      }
      .gwallet-info {
        margin-top: 30px;
        color: #ffff;
        text-align: center;
        text-decoration: none;

        font-size: 15px;

        font-family: 'Open Sans', sans-serif;

        display: flex;
        align-items: center;
      }
      .gwallet-info > svg {
        margin-left: 7px;
        position: relative;
        bottom: 2.5px;
      }
      .gwallet-metamask {
      }
      .gwallet-walletconnect {
      }
    `
  }
}

export class Render implements IRender {
  headDomElement: HTMLHeadElement | null = document.querySelector('head')
  bodyDomElement: HTMLBodyElement | null = document.querySelector('body')
  bodyMainElement: HTMLDivElement  = document.createElement('div')
  renderStyle: IRenderStyle = new RenderStyle()
  style: HTMLStyleElement = document.createElement('style')
  
  render ():void {
    this.style.insertAdjacentHTML('afterbegin', this.renderStyle.style())

    this.headDomElement?.appendChild(this.style) 

    this.bodyMainElement.setAttribute('class', "gwallet-wrapper")

    const bodyWallet: HTMLDivElement = document.createElement('div')
    bodyWallet.setAttribute('class', 'gwallet-body')

    const contentWallet: HTMLDivElement = document.createElement('div')
    contentWallet.setAttribute('class', 'gwallet-content')

    const iconGinoiceLogo: string = `<svg width="100" height="33" viewBox="0 0 152 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_391)">
    <path d="M40.3592 1.25676C39.4725 1.24055 38.6175 1.60541 38.0079 2.26217C37.3746 2.8946 37.0184 3.77028 37.0342 4.67839C37.0184 5.61893 37.3746 6.51893 38.0238 7.18379C38.6413 7.85677 39.5042 8.22974 40.4067 8.21352C41.2854 8.22163 42.1325 7.85676 42.7421 7.20001C43.3834 6.55947 43.7317 5.66758 43.7159 4.75136C43.7317 3.81893 43.3754 2.92703 42.7263 2.27839C42.1088 1.61352 41.2538 1.24055 40.3592 1.25676Z" fill="white"/>
    <path d="M42.9796 10.0541H37.7388V31.4432H42.9796V10.0541Z" fill="white"/>
    <path d="M59.2009 9.5108C58.1876 9.5108 57.1822 9.71351 56.2401 10.1108C55.2743 10.5081 54.1976 11.2216 53.0101 12.2513V10.0622H47.7693V31.4432H53.0101V22.8649C53.0101 20.6432 53.0893 19.1919 53.2397 18.527C53.5326 17.2459 54.063 16.2405 54.823 15.5108C55.5593 14.7973 56.541 14.4081 57.5464 14.4243C58.3618 14.4243 59.0505 14.6432 59.6047 15.0811C60.1589 15.5189 60.5468 16.1595 60.7764 16.9946C60.998 17.8297 61.1089 19.5243 61.1089 22.0784V31.4432H66.2943V17.3108C66.2943 14.8459 65.6847 12.9892 64.4735 11.7243C63.0326 10.2486 61.2751 9.5108 59.2009 9.5108Z" fill="white"/>
    <path d="M86.7824 11.027C85.0962 10.0297 83.1803 9.50272 81.2249 9.51083C78.5016 9.51083 76.087 10.4838 73.9891 12.4216C71.5982 14.6514 70.4028 17.4324 70.4028 20.773C70.4028 23.8946 71.4637 26.546 73.5774 28.727C75.6912 30.9081 78.2483 32.0027 81.2487 32.0027C83.2832 32.0027 85.1437 31.5081 86.8378 30.5189C88.5162 29.546 89.8937 28.1189 90.8437 26.4C91.8095 24.6811 92.3162 22.727 92.3082 20.7406C92.3082 16.7108 90.2024 12.9973 86.7824 11.027ZM85.3891 25.2568C84.2966 26.4243 82.9349 27.0081 81.2962 27.0081C79.6574 27.0081 78.3037 26.4324 77.227 25.2811C76.1582 24.1216 75.6199 22.6216 75.6199 20.7568C75.6199 18.9487 76.1582 17.4649 77.2428 16.3054C78.3274 15.146 79.6812 14.5703 81.312 14.5622C82.9824 14.5622 84.3441 15.1379 85.4128 16.2811C86.4816 17.4243 87.0199 18.9162 87.0199 20.7568C87.0199 22.5892 86.4737 24.0892 85.3891 25.2568Z" fill="white"/>
    <path d="M101.143 10.0622H95.9026V31.4514H101.143V10.0622Z" fill="white"/>
    <path d="M98.5229 1.25677C96.6783 1.25677 95.19 2.7892 95.19 4.67839C95.1741 5.61893 95.5304 6.51893 96.1716 7.1838C96.7891 7.85677 97.652 8.22974 98.5545 8.21353C99.4333 8.22164 100.28 7.85677 100.89 7.20001C101.531 6.55947 101.88 5.66758 101.864 4.75136C101.88 3.81893 101.523 2.92704 100.882 2.27839C100.272 1.61353 99.4174 1.24055 98.5229 1.25677Z" fill="white"/>
    <path d="M116.771 14.5054C117.848 14.5054 118.782 14.6757 119.589 15.0162C120.397 15.3567 121.196 15.9649 122.02 16.8405L126.382 14.3838C125.353 12.8432 123.959 11.6027 122.328 10.7757C120.674 9.93242 118.813 9.5108 116.747 9.5108C114.507 9.5108 112.48 10.0054 110.675 11.0027C108.87 12 107.453 13.3703 106.448 15.1135C105.442 16.8405 104.92 18.8189 104.928 20.8297C104.928 23.8216 105.965 26.4243 108.047 28.654C110.129 30.8838 113.003 31.9946 116.676 31.9946C120.761 31.9946 123.92 30.5027 126.16 27.5189L122.028 24.6243C120.713 26.2622 118.885 27.0811 116.541 27.0811C114.641 27.0811 113.113 26.5054 111.95 25.354C110.786 24.2027 110.2 22.7189 110.2 20.8946C110.2 19.0216 110.802 17.4892 112.013 16.2892C113.224 15.0892 114.808 14.4973 116.771 14.5054Z" fill="white"/>
    <path d="M151.937 21.2838C151.937 17.7486 150.908 14.8946 148.849 12.7459C146.791 10.5892 144.115 9.5108 140.83 9.5108C137.734 9.5108 135.161 10.5892 133.103 12.7459C131.053 14.9027 130.023 17.6108 130.023 20.8703C130.023 24.0567 131.053 26.7081 133.111 28.8243C135.169 30.9405 137.837 32.0027 141.115 32.0027C143.228 32.0027 145.049 31.6216 146.585 30.8513C148.121 30.0811 149.435 28.9054 150.536 27.3L146.118 25.1757C144.709 26.5784 143.031 27.2838 141.067 27.2757C139.428 27.2757 138.083 26.8297 137.03 25.9297C135.977 25.0297 135.328 23.8216 135.082 22.3054H151.921L151.937 21.2838ZM135.312 18.0811C135.906 16.7595 136.547 15.8351 137.236 15.3081C138.336 14.473 139.618 14.0513 141.083 14.0513C142.429 14.0513 143.608 14.4243 144.63 15.1703C145.651 15.9162 146.332 16.8892 146.68 18.0811H135.312Z" fill="white"/>
    <path d="M10.9402 15L17.036 21.7703H24.8972C24.4302 22.7513 23.7493 23.6108 22.9181 24.2838C21.3743 25.573 19.506 26.2054 17.2102 26.2054C15.2706 26.2054 13.5368 25.7676 11.9218 24.8676C10.3306 23.9757 9.11933 22.7919 8.21683 21.2513C7.31433 19.7108 6.88683 18.1297 6.88683 16.4351C6.88683 14.7811 7.30642 13.2568 8.16933 11.7649C9.03225 10.273 10.2197 9.12162 11.8031 8.23783C13.4181 7.33783 15.0568 6.9081 16.8302 6.9081C18.2314 6.9081 19.7118 7.24054 21.2318 7.9054C22.7677 8.57837 24.2085 9.58378 25.5068 10.8973L26.8922 12.2919L31.9193 7.41081L30.3756 5.91081C28.3093 3.89189 26.1243 2.39189 23.9077 1.46756C21.6356 0.527023 19.1972 0.0405366 16.7431 0.0567528C13.6081 0.0567528 10.7502 0.778374 8.24058 2.2054C5.74683 3.6081 3.67267 5.68378 2.23975 8.21351C0.798916 10.727 0.0468327 13.5811 0.0547494 16.4919C0.0547494 20.4649 1.33725 24.0243 3.86267 27.0486C7.13225 30.9649 11.5972 32.9432 17.1389 32.9432C21.7464 32.9432 25.5068 31.4838 28.3172 28.6054C30.1064 26.773 31.3414 24.527 32.0064 21.9L26.2431 15H10.9402Z" fill="url(#paint0_linear_1_391)"/>
    <path d="M26.2438 15H10.9409L17.0368 21.7784H17.1318L26.2755 15.0486L26.2438 15Z" fill="url(#paint1_linear_1_391)"/>
    <path d="M26.2438 15C26.2517 15.5757 26.1963 16.4514 26.1805 16.9378C25.9667 24.5351 18.2005 29.2703 11.313 31.3054C12.2313 32.173 15.9997 32.9432 17.1476 32.9432C21.7551 32.9432 25.5155 31.4838 28.3259 28.6054C30.1151 26.773 31.3501 24.527 32.0151 21.9L26.2438 15Z" fill="url(#paint2_linear_1_391)"/>
    <path d="M7.40197 13.4027C7.59989 12.9486 7.93239 12.0811 8.45489 11.2784C11.3366 6.81081 16.142 3.81081 21.7232 3.81081C25.5153 3.81081 29.1411 5.2054 31.9278 7.4027L30.3841 5.9027C28.3099 3.89189 26.1249 2.39189 23.9082 1.46756C21.6361 0.527023 19.1978 0.0405366 16.7436 0.0567528C13.6086 0.0567528 10.7507 0.778374 8.24114 2.2054C5.74739 3.6081 3.67322 5.68378 2.2403 8.21351C0.862802 10.6378 6.20655 16.2405 7.07739 14.4568C7.14072 14.3351 7.35447 13.5081 7.40197 13.4027Z" fill="url(#paint3_linear_1_391)"/>
    <path d="M20.9797 30.8838C13.1976 30.8838 6.88806 24.4216 6.88806 16.4513C6.88806 8.48107 13.1976 2.02702 20.9797 2.02702C23.6556 2.02702 26.1572 2.75675 28.2868 4.07837C25.041 1.46756 21.0351 0.0567498 16.9026 0.0648579C6.20723 0.0648579 0.0322266 8.04324 0.0322266 16.4919C0.0322266 25.5649 6.80889 32.9838 16.8947 32.9838C21.6606 32.9838 25.4131 31.4919 28.0651 28.8649C25.9751 30.1216 23.5843 30.8838 20.9797 30.8838Z" fill="url(#paint4_linear_1_391)"/>
    </g>
    <defs>
    <linearGradient id="paint0_linear_1_391" x1="0.0578052" y1="16.4995" x2="32.0104" y2="16.4995" gradientUnits="userSpaceOnUse">
    <stop stop-color="#139AEC"/>
    <stop offset="1" stop-color="#127CF2"/>
    </linearGradient>
    <linearGradient id="paint1_linear_1_391" x1="10.9813" y1="17.6982" x2="26.291" y2="18.6445" gradientUnits="userSpaceOnUse">
    <stop stop-color="#34FEFF"/>
    <stop offset="1" stop-color="#127CF2"/>
    </linearGradient>
    <linearGradient id="paint2_linear_1_391" x1="11.3122" y1="23.9728" x2="32.0111" y2="23.9728" gradientUnits="userSpaceOnUse">
    <stop stop-color="#34FEFF"/>
    <stop offset="1" stop-color="#127CF2"/>
    </linearGradient>
    <linearGradient id="paint3_linear_1_391" x1="2.01538" y1="7.42447" x2="31.9246" y2="7.42447" gradientUnits="userSpaceOnUse">
    <stop stop-color="#127CF2"/>
    <stop offset="1" stop-color="#139AEC"/>
    </linearGradient>
    <linearGradient id="paint4_linear_1_391" x1="0.0353932" y1="16.5227" x2="28.2876" y2="16.5227" gradientUnits="userSpaceOnUse">
    <stop stop-color="#34FEFF"/>
    <stop offset="1" stop-color="#127CF2"/>
    </linearGradient>
    <clipPath id="clip0_1_391">
    <rect width="152" height="33" fill="white"/>
    </clipPath>
    </defs></svg>`

    const info: HTMLSpanElement = document.createElement('a')
    info.setAttribute('class', 'gwallet-info')
    info.setAttribute('href', 'https://ginoice.com/')
    info.setAttribute('href', 'https://ginoice.com/')
    info.setAttribute('target', '_blank')
    info.innerText = "made by "
    info.insertAdjacentHTML('beforeend', iconGinoiceLogo)

    const itemWalletMetaMask: HTMLDivElement = document.createElement('div'),
          metaMaskDescription: HTMLDivElement = document.createElement('div')
    metaMaskDescription.setAttribute('class', 'description')
    itemWalletMetaMask.setAttribute('class', 'gwallet-item MetaMask')
    itemWalletMetaMask.setAttribute('id', 'MetaMask')
    metaMaskDescription.innerText = 'MetaMask'

    const itemWalletWalletConnect: HTMLDivElement = document.createElement('div'),
          walletConnectDescription: HTMLDivElement = document.createElement('div')
    walletConnectDescription.setAttribute('class', 'description')
    itemWalletWalletConnect.setAttribute('class', 'gwallet-item WalletConnect')
    itemWalletWalletConnect.setAttribute('id', 'WalletConnect')
    walletConnectDescription.innerText = 'WalletConnect'

    const iconMetaMask: string = `<svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg" ><path d="M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z" fill="#E17726"></path><path d="M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z" fill="#E27625"></path><path d="M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z" fill="#E27625"></path><path d="M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z" fill="#E27625"></path><path d="M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z" fill="#E27625"></path><path d="M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z" fill="#E27625"></path><path d="M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z" fill="#E27625"></path><path d="M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z" fill="#E27625"></path><path d="M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z" fill="#D5BFB2"></path><path d="M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z" fill="#D5BFB2"></path><path d="M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z" fill="#233447"></path><path d="M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z" fill="#233447"></path><path d="M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z" fill="#CC6228"></path><path d="M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z" fill="#CC6228"></path><path d="M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z" fill="#CC6228"></path><path d="M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z" fill="#CC6228"></path><path d="M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z" fill="#E27525"></path><path d="M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z" fill="#E27525"></path><path d="M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z" fill="#E27525"></path><path d="M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z" fill="#E27525"></path><path d="M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z" fill="#F5841F"></path><path d="M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z" fill="#F5841F"></path><path d="M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z" fill="#C0AC9D"></path><path d="M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z" fill="#161616"></path><path d="M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z" fill="#763E1A"></path><path d="M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z" fill="#763E1A"></path><path d="M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z" fill="#F5841F"></path><path d="M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z" fill="#F5841F"></path><path d="M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z" fill="#F5841F"></path></svg>`
    const iconWalletConnect: string = `<svg viewBox="0 0 40 40" width="40px" color="text" xmlns="http://www.w3.org/2000/svg"><path d="M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z" fill="#3389FB"></path></svg>`


    this.bodyDomElement?.appendChild(this.bodyMainElement)
    this.bodyMainElement.appendChild(bodyWallet)

    bodyWallet.appendChild(contentWallet)
    contentWallet.appendChild(itemWalletMetaMask)
    contentWallet.appendChild(itemWalletWalletConnect)
    contentWallet.appendChild(info)

    itemWalletMetaMask.insertAdjacentHTML('afterbegin', iconMetaMask)
    itemWalletMetaMask.appendChild(metaMaskDescription)

    itemWalletWalletConnect.insertAdjacentHTML('afterbegin', iconWalletConnect)
    itemWalletWalletConnect.appendChild(walletConnectDescription)
  }
}
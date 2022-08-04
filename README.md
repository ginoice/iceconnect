# iceconnect.js

> iceconnect - a library for working with ...

## Features

- Full TypeScript support
- Support all platforms
- Easy to use

## Table of Contents
...

## Quick start

### Install

We support all platforms.

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i iceconnect
```

#### Include with &lt;script&gt;

Recommended for learning purposes, you can use the latest version:

```html
<script src=".../iceconnect.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src=".../dist/iceconnect.js"></script>
```

### Initialization

#### ES6

iceconnect as an ES6 module.

```js
import { Wallet } from 'iceconnect';

new Wallet();
```

#### Node

iceconnect as a Node.js module

```js
const { Wallet } = require('iceconnect');

new Wallet();
```

## Methods

```js
const wallet = new Wallet ({
  RPC_URL: '...',
  NETWORK_ID: '..',
  INFURA_ID: '...',
  hooks: {
    connecting: (res:string):void => console.log(res),
    connectionSuccess: (success: object):void => console.log(success),
    connectionFailed: (failed: string):void => console.log(failed)
  }
})
```

#### Example

```js
  hooks: {
    connecting: (res:string):void => console.log(res),
    // => 'Connecting'
    connectionSuccess: (success: object):void => console.log(success),
    // => { walletAddress: adderss, web3Provider: provider}
    connectionFailed: (failed: string):void => console.log(failed)
    // => 'Error'
  }
```

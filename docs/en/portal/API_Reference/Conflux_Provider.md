---
id: provider_api
title: Portal Provider API
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Conflux_Provider.md
---

ConfluxPortal injects a global API into websites visited by its users at
`window.conflux`. This API allows websites to request user login, load data from
blockchains the user has a connection to, and suggest that the user sign
messages and transactions. You can use this API to detect the user of an Conflux
browser.

```javascript
if (typeof window.conflux !== "undefined") {
  // Conflux user detected. You can now use the provider.
  const provider = window["conflux"]
}
```

The provider API itself is very simple, and wraps [Conflux
JSON-RPC](./JSON_RPC_API.md) formatted messages, which is why developers usually
use a convenience library for interacting with the provider, like
[js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk),
[conffle](https://github.com/liuis/conffle#readme), or others. From those tools,
you can generally find sufficient documentation to interact with the provider,
without reading this lower-level API.

However, for developers of convenience libraries, and for developers who would
like to use features that are not yet supported by their favorite libraries,
knowledge of the provider API is essential.

### Upcoming Provider Changes

In early 2020, we will be introducing some changes changes to this API, and
beginning to deprecate some old synchronous methods. You can [read more about
that transition
here](https://medium.com/metamask/breaking-changes-to-the-metamask-inpage-provider-b4dde069dd0a).

We will begin supporting the new API in early 2020. AWe will support the old and
new APIs for at least 6 weeks, after which some of the older methods will be
deprecated. These changes will make the ConfluxPortal inpage provider fully
compatible with [EIP
1193](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1193.md) and [EIP
1102](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1102.md).

You can continue reading to learn about the current API. Otherwise, [click here
to learn about the upcoming API changes](#new-api).

### A Note on Language

In our usage, if a feature is _deprecated_, we strongly discourage its use, and
may remove it in the future. Features that will be _removed_ or _replaced_ on a
particular date are clearly marked as such. We do not anticipate any need for
further breaking changes after Q1 2020.

# Current API

## Properties

These properties can be used to check the current state of the connected user,
which can be important things to verify before sending a transaction.

### conflux.networkVersion

Returns a numeric string representing the current blockchain's network ID. A few
example values:

```javascript
'1029': Conflux Main Network
'1': Conflux Test network
```

### conflux.selectedAddress

Returns a hex-prefixed string representing the current user's selected address,
ex: `"CFX:TYPE.USER:AAS8Y3SJ6KVGH703YG477FMZ4MKVYP72EYX2ZD2DU2"`.

### conflux.isConfluxPortal

Returns `true` or `false`, representing whether the user has ConfluxPortal
installed.

## Methods

### conflux.send("cfx_requestAccounts"')

Requests the user provides an conflux address to be identified by. Returns a
promise of an array of hex-prefixed conflux address strings.

#### Example (ES6)

Using an [async
function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

```javascript
try {
  const accounts = await conflux.send("cfx_requestAccounts")
  // You now have an array of accounts!
  // Currently only ever one:
  // [cfx:aas8y3sj6kvgh703yg477fmz4mkvyp72eyx2zd2du2']
} catch (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
}
```

#### Example (ES5)

```javascript
conflux
  .send("cfx_requestAccounts")
  .then(function (accounts) {
    // You now have an array of accounts!
    // Currently only ever one:
    // ['cfx:aas8y3sj6kvgh703yg477fmz4mkvyp72eyx2zd2du2']
  })
  .catch(function (error) {
    // Handle error. Likely the user rejected the login
    console.error(error)
  })
```

### conflux.send(options, callback) (To Be Replaced)

_This will be replaced with `conflux.send(method: string, params: Array<any>)`
on **January 13, 2020**._ _[Click
here](https://github.com/Conflux-Chain/conflux-portal-docs/blob/new-provider/03_API_Reference/01_Conflux_Provider.md#confluxsendmethod-string-params-array)
for more information._

See `conflux.sendAsync`, directly below.

### conflux.sendAsync(options, callback)

_To be superceded by the promise-returning send() method in [EIP
1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md)._

Sends a message to the web3 browser. Message format maps to the format of [the
Conflux JSON-RPC
API](https://conflux-chain.github.io/conflux-doc/json-rpc/).

Here's an example of everyone's favorite method, `cfx_sendTransaction`, which is
both how CFX is sent, and how smart contract methods are called:

```javascript
params: [
  {
    from: "CFX:TYPE.USER:AANA7DS0DVSXFTYANC727SNUU6HUSJ3VMYC3F1AY93",
    to: "CFX:TYPE.USER:AAMG7DS0TVSXFTYANC727SNUU6HUSKCFP64HY12RKN",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]

conflux.sendAsync(
  {
    method: "cfx_sendTransaction",
    params: params,
    from: accounts[0], // Provide the user's account to use.
  },
  function (err, result) {
    // A typical node-style, error-first callback.
    // The result varies by method, per the JSON RPC API.
    // For example, this method will return a transaction hash on success.
  }
)
```

### conflux.autoRefreshOnNetworkChange <!-- (To Be Removed) -->

<!-- _This will be removed on January 13, 2020. At this time, ConfluxPortal will also -->
<!-- stop reloading the page on network changes._ _[Click -->
<!-- here](https://medium.com/metamask/no-longer-reloading-pages-on-network-change-fbf041942b44) -->
<!-- for more details._  -->

When the network is changed, ConfluxPortal will reload any pages that have made
requests to the provider. This automatic reload behavior will be removed in a
future release of ConfluxPortal, but in the meantime it can be disabled with
this flag.

To disable auto-refresh on a network change you can do:

```javascript
conflux.autoRefreshOnNetworkChange = false
```

This can be toggled on or off at any time.

**Note:** Setting this flag to `true` results in the default behavior, which is
subject to change. If your site relies upon ConfluxPortal reloading it upon
network change, you will need to trigger the reload yourself in a
`networkChanged` event handler to ensure it continues to work with future
releases.

### conflux.on(eventName, callback)

The provider supports listening for some events:

- `accountsChanged`, returns updated account array.
- `networkChanged`, returns network ID string.

#### Example

```javascript
conflux.on("accountsChanged", function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

**Note:** At the moment, the `networkChanged` event is only useful if you
disable auto-refresh on network change by setting
[`conflux.autoRefreshOnNetworkChange`](#conflux.autorefreshonnetworkchange) to
`false`. Otherwise, ConfluxPortal will default to auto-reloading pages upon
network change if they have made requests to the provider. _ConfluxPortal will
stop reloading pages on network change on January 13, 2020, and this setting
will be removed._ _[Click
here](https://medium.com/metamask/no-longer-reloading-pages-on-network-change-fbf041942b44)
for more details._

# New API

This API will become available during the week of **November 25, 2019**. It will
be the only API supported starting **January 13, 2020.** If you want examples of
how to setup your dapp using the new API, you can check out [this
gist](https://gist.github.com/Pana/0839e442c006d556e696c02ca0770e2f).

## Methods

### conflux.send('cfx_requestAccounts')

#### conflux.enable() (Deprecated)

Requests that the user provides an conflux address to be identified by. Returns
a promise of an array of hex-prefixed conflux address strings. See [EIP
1102](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1102.md) for more
details.

#### Example (ES6)

Using an [async
function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

```javascript
try {
  const accounts = await conflux.send("cfx_requestAccounts")
  // You now have an array of accounts!
  // Currently only ever one:
  // [CFX:TYPE.USER:AAS8Y3SJ6KVGH703YG477FMZ4MKVYP72EYX2ZD2DU2]
} catch (error) {
  if (error.code === 4001) {
    // EIP 1193 userRejectedRequest error
    console.log("Please connect to ConfluxPortal.")
  } else {
    console.error(error)
  }
}
```

#### Example (ES5)

```javascript
conflux
  .send("cfx_requestAccounts")
  .then(function (accounts) {
    // You now have an array of accounts!
    // Currently only ever one:
    // ['CFX:TYPE.USER:AAS8Y3SJ6KVGH703YG477FMZ4MKVYP72EYX2ZD2DU2']
  })
  .catch(function (error) {
    if (error.code === 4001) {
      // EIP 1193 userRejectedRequest error
      console.log("Please connect to ConfluxPortal.")
    } else {
      console.error(error)
    }
  })
```

### `conflux.send(method: string, params: Array<any>)`

The way to send requests to the dapp browser. `method` and `params` should
follow [the Conflux JSON-RPC
API](https://github.com/conflux/wiki/wiki/JSON-RPC#json-rpc-methods).

Returns a `Promise` that resolves to the result of the method. Not all methods
require `params`, e.g. `conflux.send('cfx_accounts')`.

Here's an example of everyone's favorite method, `cfx_sendTransaction`, which is
both how CFX is sent, and how smart contract methods are called:

```javascript
params: [
  {
    from: "CFX:TYPE.USER:AANA7DS0DVSXFTYANC727SNUU6HUSJ3VMYC3F1AY93",
    to: "CFX:TYPE.USER:AAMG7DS0TVSXFTYANC727SNUU6HUSKCFP64HY12RKN",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]

conflux
  .send("cfx_sendTransaction", params)
  .then(function (result) {
    // The result varies by method, per the JSON RPC API.
    // For example, this method will return a transaction hash on success.
  })
  .catch(function (error) {
    // Like a typical promise, returns an error on rejection.
  })
```

### conflux.on(eventName, callback)

The provider supports listening for all events specified in [EIP
1193](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1193.md#events).

The following are especially important for managing the state of your dapp:

- `accountsChanged`, returns an array of the currently available accounts.
- `chainChanged`, returns the hex-formatted chain ID string of the currently
  used chain/network.
- `networkChanged`, _(Discouraged)_ returns decimal-formatted network ID string
  of the currently used chain/network.

#### Example

```javascript
conflux.on("accountsChanged", function (accounts) {
  // Time to reload your interface with accounts[0]!
})

conflux.on("chainChanged", function (chainId) {
  // Time to make sure your any calls are directed to the correct chain!
})
```

#### List of Chain and Network IDs

```javascript
'1029': Conflux Main Network
'1': Conflux Test network
```

### conflux.sendAsync(options, callback) (Deprecated)

_We strongly discourage the use of this method, which may be removed in the
future._

Sends a message to the dapp browser. Message format maps to the format of [the
Conflux JSON-RPC
API](https://conflux-chain.github.io/conflux-doc/json-rpc/).

Here's an example of everyone's favorite method, `cfx_sendTransaction`, which is
both how CFX is sent, and how smart contract methods are called:

```javascript
params: [
  {
    from: "CFX:TYPE.USER:AANA7DS0DVSXFTYANC727SNUU6HUSJ3VMYC3F1AY93",
    to: "CFX:TYPE.USER:AAMG7DS0TVSXFTYANC727SNUU6HUSKCFP64HY12RKN",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]

conflux.sendAsync(
  {
    method: "cfx_sendTransaction",
    params: params,
    from: accounts[0], // Provide the user's account to use.
  },
  function (err, result) {
    // A typical node-style, error-first callback.
    // The result varies by method, per the JSON RPC API.
    // For example, this method will return a transaction hash on success.
  }
)
```

## Properties

Useful for knowing whether `window.conflux` is ConfluxPortal, but not much else.

### conflux.isConfluxPortal

`true` if the user has ConfluxPortal installed, `false` otherwise.

### conflux.networkVersion (Deprecated)

_We strongly discourage the use of this property, which may be removed in the
future._

Returns a numeric string representing the current blockchain's network ID. A few
example values:

```javascript
'2': Conflux Main Network
'1': Conflux Test network
```

### conflux.selectedAddress (Deprecated)

_We strongly discourage the use of this property, which may be removed in the
future._

Returns a hex-prefixed string representing the current user's selected address,
ex: `"CFX:TYPE.USER:AAS8Y3SJ6KVGH703YG477FMZ4MKVYP72EYX2ZD2DU2"`.

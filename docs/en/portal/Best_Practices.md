---
id: best_practices
title: Best Practices
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Best_Practices.md
---

## Registering Your Contract's Method Names

Conflux Portal uses the parity on-chain registry of function signatures to
display method names on the confirm screen. For many common method names, like
token methods, this allows Conflux Portal to successfully look up the method
names by their [method
signature](https://solidity.readthedocs.io/en/v0.4.21/abi-spec.html).

However, sometimes you're using a method that is not in that on-chain registry,
and Conflux Portal will simply display `Unknown Function` to the user.  

To add your contract's function names to this registry so it shows in the
Conflux Portal interface, follow the below steps. 

_We (conflux) don't support below features right now._ 

1. Go to the [mainnet parity signature registration contract on
   etherscan](https://etherscan.io/address/0x44691b39d1a75dc4e0a0346cbb15e310e6ed1e86#writeContract) 

2. Connect Conflux Portal

3. Use etherscan's write contract feature to input the string value (without
   quotes or spaces) to the register function 

   for example:

   `getOwners()`

   `execTransaction(address,uint256,bytes,uint8,uint256,uint256,uint256,address,address,bytes)`

4. Press write

5. Approve the transaction through Conflux Portal (you only pay gas)


### Verify

`web3.sha3('getOwners()') =>
0xa0e67e2bdc0a6d8a09ccd6c353c9df590807ad66ff5e6630c4f31a86dfa84821`

take the first 10 characters `0xa0e67e2b` and input into **[this demo
app](https://jennypollack.github.io/function_signature_registry/) that checks
the on-chain registry** (mainnet or rinkeby) 

### Alternate steps using remix.ethereum.org:

Paste the contract code from [bokky's blog
post](https://www.bokconsulting.com.au/blog/a-quick-look-at-paritys-signature-registry-contract/)
into [remix](remix.ethereum.org) 

Set the correct compiler version based on the contract.

Use remix's write functionality to add to the registry.

You can look at the FUNCTIONHASHES section on remix.conflux.org by loading the
signature registry contract, press the Details button on the compile tab. 

### Additional Info
You can also use the [signature
registry](https://rinkeby.etherscan.io/address/0x0c0831fb1ec7442485fb41a033ba188389a990b4)
deployed on rinkeby but should note that **Conflux Portal reads from the mainnet
eth-method-registry endpoint, regardless of user's network** 

[eth-method-registry](https://github.com/danfinlay/eth-method-registry) is used
to lookup methods in Conflux Portal. 

This [stack
exchange](https://conflux.stackexchange.com/questions/59678/metamask-shows-unknown-function-when-calling-method-send-function)
answer is a good **tldr**. 

## Registering Tokens with Users

When a user opens their Conflux Portal, they are shown a variety of assets,
including tokens. By default, Conflux Portal auto-detects some major popular
tokens and auto-displays them, but for most tokens, the user will need to add
the token themselves. 

While this is possible using our UI with the `Add Token` button, that process
can be cumbersome, and involves the user interacting with contract addresses,
and is very error prone. 

You can greatly improve the security and experience of users adding your token
to their Conflux Portal by taking advantage of the `wallet_watchAsset` API as
defined in [EIP
747](https://github.com/estebanmino/EIPs/blob/master/EIPS/eip-747.md). 

### Code-free Example

Here are a couple live web applications that let you enter your token details,
and then share them with a simple web link: 

- [Watch Token](https://vittominacori.github.io/watch-token/create.html)
- [Add Token App](https://metamask.github.io/Add-Token/#edit)

### Example

If you'd like to integrate suggesting a token into your own web app, you can
follow this code snippet to implement it: 

```javascript
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513'
const tokenSymbol = 'TUT'
const tokenDecimals = 18
const tokenImage = 'http://placekitten.com/200/300'

conflux.sendAsync({
    method: 'wallet_watchAsset',
    params: {
      "type":"ERC20",
      "options":{
        "address": tokenAddress,
        "symbol": tokenSymbol,
        "decimals": tokenDecimals,
        "image": tokenImage,
      },
    },
    id: Math.round(Math.random() * 100000),
}, (err, added) => {

  if (added) {
    console.log('Thanks for your interest!')
  } else {
    console.log('Your loss!')
  }

})
```

## Default Token List

If you're a major and popular token, you may qualify to be listed in our
[cfx-contract-metadata](https://github.com/yqrashawn/cfx-contract-metadata)
registry. This is a centralized solution and takes a larger toll on our
development team, so we prefer to avoid the politics of picking and choosing
tokens that get auto-detected in users' accounts, so please see if the EIP-747
method above can suit your needs before submitting a new token there for
inclusion. 

If you have a user on your site, asking them to click once to add a token is a
small burden on them, and allows you to leverage the trusting relationship you
already have with your user instead of our central repository. 

## Defining Your App's Icon

When your site makes a login request to a Confluxi Portal user, Confluxi Portal may
render a modal that display's your site icon. 

We retrieve this icon using the HTML selector `head > link[rel="shortcut
icon"]`, so to customize this icon for your site, just make sure to follow the
[favicon standard](https://en.wikipedia.org/wiki/Favicon), and make sure to have
a `link` tag within your site's `head` with `rel = "shortcut icon"`, like this. 

The tag's `href` attribute will be used for assigning the site icon.

```html
<head>
  <link rel="shortcut icon" href="https://your-site.com/your-icon.png">
</head>
```


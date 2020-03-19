---
id: signing_data_with_portal
title: Signing Data with Conflux Portal
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Signing_Data/Introduction.md
---
If you'd like to jump to some working signature examples, [you can visit this
website](http://13.57.190.119:9000/contract.html) and download the code of the
page. 

If you'd like to read Metamask's JavaScript implementations of these methods,
they are all available in the npm package
[eth-sig-util](https://github.com/MetaMask/eth-sig-util).  

<!-- Note that Conflux Portal supports signing transactions with Trezor and Ledger -->
<!-- hardware wallets. These hardware wallets currently only support signing data -->
<!-- using the [`personal_sign`](./Personal_Sign.md) method. If you have trouble -->
<!-- logging in to a website or dapp when using a Ledger or Trezor, the site may be -->
<!-- requesting you sign data via an unsupported method, in which case we recommend -->
<!-- using your standard Conflux Portal account. -->

## A Brief History

There are currently five signing methods in Conflux Portal, and you might wonder
the history of these methods. Studying the history of these methods has some
lessons in it for the emergent lessons of decentralized standards emergence. Our
current five methods are: 

- [`cfx_sign`](./CFX_Sign.md)
- [`personal_sign`](./Personal_Sign.md)
- [`signTypedData`](./Sign_Typed_Data_v1.md) (currently identical to `signTypedData_v1`)
- [`signTypedData_v1`](./Sign_Typed_Data_v1.md)
- [`signTypedData_v3`](./Sign_Typed_Data_v3.md)

There are likely to be many more over time. When MetMask first started, the
Provider API wasn't designed to be exposed to untrusted websites, and so some
considerations weren't taken as seriously as they were later. 

In particular, the method `cfx_sign`(`eth_sign` in Metamask) is an open-ended
signing method that allows signing an arbitrary hash, which means it can be used
to sign transactions, or any other data, making it a dangerous phishing risk. 
For this reason, Metamask makes this method show the most frightening possible
message to the user, and generally discourage using this method in production.
However, some applications (usually admin panels internal to teams) use this
method for the sake of its ease of use, and so Metamask have continued to
support it for the sake of not breaking the workflows of active projects.   

Eventually, the [`personal_sign`
spec](https://github.com/ethereum/go-ethereum/pull/2940) was proposed, which added
a prefix to the data so it could not impersonate transactions. Metamask also
made this method able to display human readable text when UTF-8 encoded, making
it a popular choice for site logins.  

However, the text-prefix made those signatures expensive to verify on-chain, and
so with the help of the [0xProtocol](https://0xproject.com/) team and
[SpankChain](https://spankchain.com/), the [EIP
712](https://eips.ethereum.org/EIPS/eip-712) spec was written. 

The strange part of EIP 712, and this decentralized standards ecosystem, is that
the proposal changed several times while retaining the same EIP. This means what
Metamask initially implemented as `signTypedData` was the earliest proposed
version, while other groups implemented later versions under the same method
name.  

To avoid compatibility issues between clients, we recommend using the
hard-versioned method names `signTypedData_v1` and `signTypedData_v3`. The
missing `v2` represents an intermediary design that was implemented by the
Cipher browser, so that we have room to implement it if there is ever enough
developer demand for it. 

In the future, it may help to have method names include a hash of their exact
proposal, since in a decentralized ecosystem, there is no absolute source of
truth of what a given name should map to. Instead, we are forced to invent new
patterns of collaboration, where we can drive forward and innovate, while
simultaneously avoiding creating a brittle ecosystem by changing our meanings
out from under the words. 

<!-- I hope this has been a useful introduction to the history of our signing -->
<!-- methods!   -->


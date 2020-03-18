---
id: json_rpc_api
title: The Conflux RPC API
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/API_Reference/JSON_RPC_API.md
---
Conflux Portal uses the `conflux.sendAsync()` (and soon, `conflux.send()`) API
to wrap an RPC API which is based on an interface exposed by all Conflux
clients, with some extra methods that are provided by Conflux Portal, as a
key-holding signer. You can look up how to pass these methods to the
`window.conflux` object [here](./Conflux_Provider.md).  

This document is a cross-post of [EIP
1474](https://github.com/ethereum/EIPs/pull/1474/), which aims to standardize the
declaration of this interface. 

For the full API, please see [EIP
1474](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md). 

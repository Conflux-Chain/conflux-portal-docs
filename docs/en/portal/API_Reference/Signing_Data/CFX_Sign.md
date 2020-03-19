---
id: cfx_sign
title: CFX Sign
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Signing_Data/CFX_Sign.md
---
The CFX Sign method is the oldest signing method in Conflux, and can sign any
binary data, making it a dangerous method that can potentially sign transactions
or even [leak its private
key](https://en.wikipedia.org/wiki/Chosen-ciphertext_attack). 

You can read [our implementation
here](https://github.com/MetaMask/eth-simple-keyring/blob/master/index.js#L61-L68). 

Since this method is insecure, it should only be used for internal experiments
or your own contracts that you interact with directly. 

When prompted for this type of signature, users are shown an aggressive warning
that inclines them to re-evaluate their trust of the site suggesting the
signature. 

<!-- You can read the [cfx_sign API documentation -->
<!-- here](https://github.com/metamask/wiki/wiki/JSON-RPC#eth_sign).  -->


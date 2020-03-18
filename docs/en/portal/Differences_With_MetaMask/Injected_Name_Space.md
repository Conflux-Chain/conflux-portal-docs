---
id: injected_namespace
title: Injected Name Space
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/Differences_With_MetaMask/Injected_Name_Space.md
---
MetaMask inject a `window.web3` (will be deprecated soon) and a
`window.ethereum` in user pages. The corresponding conflux global variables are
`window.confluxJS` and `window.conflux`  

MetaMask has the api `window.ethereum.isMetaMask` for developer to check if the
MetaMask version of provider is available. ConfluxPortal change that to
`window.conflux.isConfluxPortal`. 
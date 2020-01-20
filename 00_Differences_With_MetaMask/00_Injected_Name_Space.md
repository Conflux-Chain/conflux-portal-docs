# Injected Name Space
MetaMask inject a `window.web3` (deprecated since 2020-01-13) and a
`window.ethereum` in user pages. The corresponding conflux global variables are
`window.confluxJS` and `window.conflux` 

MetaMask has the api `window.ethereum.isMetaMask` for developer to check if the
MetaMask version of provider is available. ConfluxPortal change that to
`window.conflux.isConfluxPortal`. 
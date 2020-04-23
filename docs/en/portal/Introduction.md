---
id: introduction
title: What Is ConfluxPortal
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Introduction.md
---
<!-- ![Conflux Logo](https://www.conflux-chain.org/icons/icon-48x48.png) -->
Welcome to ConfluxPortal's Developer Documentation. ConfluxPortal is Conflux
version of [MetaMask](https://github.com/MetaMask/metamask-extension#readme).
This documentation is for learning to develop applications for ConfluxPortal.  

- You can find the latest version of ConfluxPortal on [the github release
page](https://github.com/Conflux-Chain/conflux-portal/releases) and installation
instructions [in this
issue](https://github.com/Conflux-Chain/conflux-portal/issues/31). 
- For help using ConfluxPortal, [submit
  issues](https://github.com/Conflux-Chain/conflux-portal/issues/new/choose)
  in our github repo.
- To learn how to contribute to the ConfluxPortal project itself, visit our
  [Internal
  Docs](https://github.com/Conflux-Chain/conflux-portal/tree/develop/docs). 

## Why ConfluxPortal?

ConfluxPortal was created out of the needs of creating more secure and usable
Conflux-based web sites. In particular, it handles account management and
connecting the user to the blockchain. 

- [Read the full docs of our injected provider](./API_Reference/Conflux_Provider.md)
- [Read the full docs of the JSON RPC API](./API_Reference/JSON_RPC_API.md)
- [Read about other supported APIs](./API_Reference/Experimental_APIs.md)

### Account Management

ConfluxPortal allows users to manage accounts and their keys in a variety of
ways, including hardware wallets, while isolating them from the site context.
This is a great security improvement over storing the user keys on a single
central server, or even in local storage, which can allow for [mass account
thefts](https://www.ccn.com/cryptocurrency-exchange-etherdelta-hacked-in-dns-hijacking-scheme/). 

This security feature also comes with developer convenience: For developers, you
simply interact with the globally available `conflux` API that identifies the
users of web3-compatible browsers (like ConfluxPortal users), and whenever you
request a transaction signature (like `cfx_sendTransaction`,
`cfx_signTypedData`, or others), ConfluxPortal will prompt the user in as
comprehensible a way as possible, allowing them to be informed, you to have a
simple API, and attackers left trying to phish individual users rather than
performing mass hacks, although [DNS hacks can still be used for phishing en
masse](https://medium.com/metamask/new-phishing-strategy-becoming-common-1b1123837168). 

### Blockchain Connection

ConfluxPortal comes pre-loaded with nice and fast connections to the Conflux
blockchain and conflux test networks. This allows users to get started without
synchronizing a full node, while still providing the option to upgrade their
security the blockchain provider of their choice over time. 

Today, ConfluxPortal is compatible with any blockchain that exposes an [Conflux
Compatible JSON RPC API](https://conflux-chain.github.io/conflux-doc/json-rpc/),
including custom and private blockchains. For development, we recommend running
a test blockchain like
[conflux-local-network-lite](https://github.com/yqrashawn/conflux-local-network-lite#readme). 

<!-- We're aware that there are constantly more and more private blockchains that -->
<!-- people are interested in connecting ConfluxPortal to, and [we are continuously -->
<!-- building towards easier and easier integration with these many -->
<!-- options](https://medium.com/metamask/metamasks-vision-for-multiple-network-support-4ffbee9ec64d).  -->

## Blockchain Applications

ConfluxPortal makes it easy to write user interfaces to blockchain-based smart
contract systems. You can accept payments without knowing how to write smart
contracts, but you'll be able to do much more interesting things if you do. 

### New Dapp Developers

- We recommend this [Learning
  Solidity](https://karl.tech/learning-solidity-part-1-deploy-a-contract/)
  tutorial series by Karl Floersch. 

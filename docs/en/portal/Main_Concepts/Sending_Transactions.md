---
id: sending_transactions
title: Sending Transactions
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Main_Concepts/Sending_Transactions.md
---

Transactions are a formal action on a blockchain. They are always initiated in
ConfluxPortal with a call to the `cfx_sendTransaction` method. They can involve
a simple sending of CFX, may result in sending tokens, creating a new smart
contract, or changing state on the blockchain in any number of ways. They are
always initiated by a signature from an _external account_, or a simple key
pair.

In ConfluxPortal, using the `conflux.sendAsync` method directly, sending a
transaction will involve composing an options object like this:

```javascript
const transactionParameters = {
  nonce: "0x00", // ignored by ConfluxPortal
  gasPrice: "0x09184e72a000", // customizable by user during ConfluxPortal confirmation.
  gas: "0x2710", // customizable by user during ConfluxPortal confirmation.
  to: "cfx:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0sfbnjm2", // Required except during contract publications.
  from: accounts[0], // must match user's active address.
  value: "0x00", // Only required to send ether to the recipient from the initiating external account.
  data:
    "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
  chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by ConfluxPortal.
  storageLimit: 1024, // used to limit the total storage usage of a transaction
}

conflux.sendAsync(
  {
    method: "cfx_sendTransaction",
    params: [transactionParameters],
    from: conflux.selectedAddress,
  },
  callback
)
```

## Transaction Parameters

Many transaction parameters are handled for you by ConfluxPortal, but it's good
to know what all the parameters do.

### Nonce [ignored]

This field is ignored by ConfluxPortal.

In Conflux every transaction has a nonce. This is so that each transaction can
only be processed by the blockchain once. Additionally, to be a valid
transaction, the nonce must either be `0`, or a transaction with the previous
number must have already been processed.

That means that transactions are always processed in order for a given account,
and so incrementing nonces is a very sensitive matter that is easy to mess up,
especially when a user is interacting with multiple applications with pending
transactions using the same account, potentially across multiple devices.

For these reasons, ConfluxPortal currently does not provide application
developers any way to customize the nonce of transactions it suggests, and
instead assists the user in managing their transaction queue themselves.

### Gas Price [optional]

Optional parameter - best used on private blockchains.

In Conflux, the pool of pending transactions offer their gas price as a sort of
auction bid to the validators to include this transaction in a block in exchange
for a transaction fee. That means high gas prices can mean faster processing,
but also more expensive transactions.

ConfluxPortal helps users select a competitive gas price on the Conflux Main
Network and popular test networks. We make requests to an API maintained by our
friends at MyCrypto and allow users to choose between "slow," "medium," and
"fast" options for their gas price.

We cannot know about the gas market on all blockchains because it requires some
deep analysis. For this reason, while you can safely ignore this parameter on
our main hosted networks, you may want to suggest a gas price in situations
where your application knows more about the target network than we do.

### Gas Limit [optional]

Optional parameter. Rarely useful to Dapp developers.

Gas limit is a highly optional parameter, and we automatically calculate a
reasonable amount for it. You will probably know that your smart contract
benefits from a custom gas limit if it ever does for some reason.

### StorageLimit [optional]

Optional parameter. Rarely useful to Dapp developers.

StorageLimit is a highly optional parameter, and we automatically calculate a
reasonable amount for it. You will probably know that your smart contract
benefits from a custom storage limit if it ever does for some reason.

### To [semi-optional]

A hex-encoded Conflux address. Required for transactions with a recipient (all
transactions except for contract creation).

Contract creation occurs when there is no `to` value but there is a `data`
value.

### Value [optional]

Hex-encoded value of the network's native currency to send. On the Main Conflux
network, this is cfx, which is denominated in _drip_, which is `1e-18` ether.

Please note that these numbers often used in Conflux are far higher precision
than native JavaScript numbers, and can cause unpredictable behavior if not
anticipated. For this reason, we highly recommend using
[BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
or [BN.js](https://github.com/indutny/bn.js/) when manipulating values intended
for the blockchain.

### Data [semi-optional]

Required for smart contract creation.

This field is also used for specifying contract methods and their parameters.
You can learn more about how that data is encoded on [the solidity ABI
spec](https://solidity.readthedocs.io/en/develop/abi-spec.html).

### Chain ID [currently ignored]

Chain ID is currently derived by the user's current selected network at
`conflux.networkVersion`. In the future we will probably allow a way to connect
to multiple networks at once, at which point this parameter will become
important, so it may be useful to be in the habit of including now.

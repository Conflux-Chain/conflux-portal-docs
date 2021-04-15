---
id: getting_started
title: Getting Started
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Main_Concepts/Getting_Started.md
---

To develop for ConfluxPortal, you're first going to want to get ConfluxPortal
installed on your development machine. [Download
here](https://github.com/Conflux-Chain/conflux-portal/releases).

Once you have it running, you should find that new browser tabs have a
`window.conflux` object available in the console. This is the way ConfluxPortal
provides for you to interact with it.

You can review the full API for that object [here](../API_Reference/Conflux_Provider.md).

## Basic Considerations

### ConfluxJS Browser Detection

The first thing your app will want to do is verify whether the user is using
ConfluxPortal or not, which is simple using a check like `if (typeof window.conflux !== 'undefined') { /* deal with it */ }`.

### Running a Test Network

In the top right menu of ConfluxPortal, you can select the network that you are
currently connected to. Among several popular defaults, you'll find `Custom RPC`
and `Localhost 12539`. These are both useful for connecting to a test
blockchain, like [conflux local network
lite](https://github.com/yqrashawn/conflux-local-network-lite#readme).

<!-- Ganache has some great features for starting it up with different states. If you -->
<!-- start it with the `-m` flag, you can feed it the same seed phrase you have in -->
<!-- your ConfluxPortal, and the test network will give your first 10 accounts 100 -->
<!-- test ether each, which makes it easier to start work.  -->

Since your seed phrase is the power to control all your accounts, it is probably
worth keeping at least one seed phrase for development, separate from any that
you use for storing real value. One easy way to manage multiple seed phrases
with ConfluxPortal is with multiple browser profiles, each of which can have
its own clean extension installations.

#### Resetting Your Local Nonce Calculation

If you're running a test blockchain, and then restart it, you can accidentally
confuse ConfluxPortal, because it calculates the next
[nonce](./Sending_Transactions.md#nonce-[ignored]) based on both the network
state _and_ the known sent transactions.

To clear ConfluxPortal's transaction queue, and effectively reset its nonce
calculation, you can use the `Reset Account` button in `Settings` (available in
the top-right sandwich menu).

### Detecting ConfluxPortal

If you want to differentiate ConfluxPortal from other conflux-compatible
browsers, you can detect ConfluxPortal using `conflux.isConfluxPortal`.

### User State

Currently there are a few stateful things you want to consider when interacting
with this API:

- What is the current network?
- What is the current account?

Both of these are available synchronously as `conflux.networkVersion` and
`conflux.selectedAddress`. You can listen for changes using events too, see
([the API reference](../API_Reference/Conflux_Provider.md)).

### Connecting to ConfluxPortal

"Connecting" or "logging in" to ConfluxPortal effectively means "to access the
user's Conflux account(s)".

You should **only** initiate a connection request in response to direct user
action, such as clicking a button. You should **never** initiate a connection
request on page load.

We recommend that you provide a button to allow the user to connect Conflux
Portal to your dapp. Clicking this button should call the following method:

```javascript
conflux.send("cfx_requestAccounts")
```

This promise-returning function resolves with an array of hex-prefixed conflux
addresses, which can be used as general account references when sending
transactions.

Over time, this method is intended to grow to include various additional
parameters to help your site request all the setup it needs from the user during
setup.

Since it returns a promise, if you're in an `async` function, you may log in
like this:

```javascript
const accounts = await conflux.send("cfx_requestAccounts")
const account = accounts[0] // We currently only ever provide a single account,
// but the array gives us some room to grow.
```

## Choosing a Convenience Library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some
entirely manage the user account onboarding, and others give you a variety of
methods of interacting with smart contracts, for a variety of API preferences,
from promises, to callbacks, to strong types, and on.

The provider API itself is very simple, and wraps [Conflux
JSON-RPC](https://conflux-chain.github.io/conflux-doc/json-rpc/) formatted
messages, which is why developers usually use a convenience library for
interacting with the provider, like
[js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk), or others. From those tools,
you can generally find sufficient documentation to interact with the provider,
without reading this lower-level API.

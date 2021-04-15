---
id: quick_start
title: Quick Start
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Quick_Start/Low_Level_CFX_Transfer.md
---

Do you prefer to just copy and paste some working code? Here is a simple but
complete working ConfluxPortal tipping application.

Below the code snippet, we'll include some links to some related valuable
resources.

```javascript
// Let's imagine you want to receive an cfx tip
const yourAddress = "CFX:TYPE.USER:AAJVCEJVCEJVCEJVCEJVCEJVCEJVCEJVCEGPE3ER3U"
const value = "0xde0b6b3a7640000" // an ether has 18 decimals, here in hex.
const desiredNetwork = "1029" // '1029' is the Conflux test network ID.

// Detect whether the current browser is conflux-compatible,
// and handle the case where it isn't:
if (typeof window.conflux === "undefined") {
  alert("Looks like you need a Dapp browser to get started.")
  alert("Consider installing ConfluxPortal!")
} else {
  // In the case the user has ConfluxPortal installed, you can easily
  // ask them to sign in and reveal their accounts:
  conflux
    .send("cfx_requestAccounts")

    // Remember to handle the case they reject the request:
    .catch(function (reason) {
      if (reason === "User rejected provider access") {
        // The user didn't want to sign in!
      } else {
        // This shouldn't happen, so you might want to log this...
        alert("There was an issue signing you in.")
      }
    })

    // In the case they approve the log-in request, you'll receive their accounts:
    .then(function (accounts) {
      // You also should verify the user is on the correct network:
      if (conflux.networkVersion !== desiredNetwork) {
        alert(
          "This application requires the main network, please switch it in your ConfluxPortal UI."
        )

        // We plan to provide an API to make this request in the near future.
        // https://github.com/MetaMask/metamask-extension/issues/3663
      }

      // Once you have a reference to user accounts,
      // you can suggest transactions and signatures:
      const account = accounts[0]
      sendCFXFrom(account, function (err, transaction) {
        if (err) {
          return alert(`Sorry you weren't able to contribute!`)
        }

        alert("Thanks for your successful contribution!")
      })
    })
}

function sendCFXFrom(account, callback) {
  // We're going to use the lowest-level API here, with simpler example links below
  const method = "cfx_sendTransaction"
  const parameters = [
    {
      from: account,
      to: yourAddress,
      value: value,
    },
  ]
  const from = account

  // Now putting it all together into an RPC request:
  const payload = {
    method: method,
    params: parameters,
    from: from,
  }

  // Methods that require user authorization like this one will prompt a user interaction.
  // Other methods (like reading from the blockchain) may not.
  conflux.sendAsync(payload, function (err, response) {
    const rejected = "User denied transaction signature."
    if (response.error && response.error.message.includes(rejected)) {
      return alert(`We can't take your money without your permission.`)
    }

    if (err) {
      return alert("There was an issue, please try again.")
    }

    if (response.result) {
      // If there is a response.result, the call was successful.
      // In the case of this method, it is a transaction hash.
      const txHash = response.result
      alert("Thank you for your generosity!")

      // You can poll the blockchain to see when this transaction has been mined:
      pollForCompletion(txHash, callback)
    }
  })
}

function pollForCompletion(txHash, callback) {
  let calledBack = false

  // Normal conflux blocks are approximately every 15 seconds.
  // Here we'll poll every 2 seconds.
  const checkInterval = setInterval(function () {
    const notYet = "response has no error or result"
    conflux.sendAsync(
      {
        method: "cfx_getTransactionByHash",
        params: [txHash],
      },
      function (err, response) {
        if (calledBack) return
        if (err || response.error) {
          if (err.message.includes(notYet)) {
            return "transaction is not yet mined"
          }

          callback(err || response.error)
        }

        // We have successfully verified the mined transaction.
        // Mind you, we should do this server side, with our own blockchain connection.
        // Client side we are trusting the user's connection to the blockchain.
        const transaction = response.result
        clearInterval(checkInterval)
        calledBack = true
        callback(null, transaction)
      }
    )
  }, 2000)
}
```

Now that was all very low level, but should show you how ConfluxPortal works at
its simplest, and lowest level!

Now you can read more about this [conflux
API](../API_Reference/Conflux_Provider.md), or maybe get acquainted with a
convenience library so you don't have to interact with it directly:

- [js-conflux-sdk](https://www.npmjs.com/package/js-conflux-sdk)
- [conffle](https://github.com/liuis/conffle#readme)

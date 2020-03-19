---
id: accessing_accounts
title: Accessing Accounts
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/Main_Concepts/Accessing_Accounts.md
---
User accounts are used in a variety of contexts in Conflux, they serve as neat
identifiers, but no use is as important as calling _wallet methods_. These
methods involve a signature or transaction approval. All of those methods
require the sending account as a function parameter:

- `cfx_sendTransaction`
<!-- - `cfx_sign` (insecure and unadvised to use) -->
<!-- - `personal_sign` -->
<!-- - `cfx_signTypedData` -->

Once you've [connected to a user](./Getting_Started.md), you can always re-check
the current account by checking `conflux.selectedAddress`. 

If you'd like to be notified when the address changes, we have an event you can
subscribe to: 

```javascript
conflux.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

If the first account in the returned array isn't the account you expected, you
should notify the user! In the future, the accounts array may contain more than
one account. However, the first account in the array will continue to be
considered as the user's "selected" account. 

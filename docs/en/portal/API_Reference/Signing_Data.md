---
id: signing_data_with_portal
title: Signing Data with ConfluxPortal
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Signing_Data.md
---

## History of the signing methods

Portal is forked from MetaMask and there are multiple signing methods in MetaMask. You can read the history of all the signing methods in [MetaMask documentation](https://docs.metamask.io/guide/signing-data.html#a-brief-history).

We reserved all these methods and made some changes. The usage and intention of all these methods are not changed. We will follow EIP-712 if there's new spec, say v5 of typed sign.

## What changed in ConfluxPortal

1. In Ethereum's ecdsa sign method, the `v` (in r, s, v) is affected by the `chainId`, [we don't count `chainId` in this method](https://github.com/yqrashawn/confluxjs-util/compare/59e9849ac291c7bb2318f804b8f4b02277bf5bca...master#diff-332ce297a81989a8b375f3bb70deb2ec) at Conflux. This affects all signing methods including signing the transaction.
2. [We changed the prefix message](https://github.com/yqrashawn/confluxjs-util/compare/59e9849ac291c7bb2318f804b8f4b02277bf5bca...master#diff-332ce297a81989a8b375f3bb70deb2ecR126) from `\u0019Ethereum Signed Message:\n` to `\u0019Conflux Signed Message:\n` in the `personal_sign` method.

## Demo

[Here](https://conflux-portal-docs.conflux-chain.org/e2e_test_demo/) is a demo page for testing ConfluxPortal. There's example code of calling `cfx_signTypedData_v4`, `personal_sign` and `cfx_sign` in it.

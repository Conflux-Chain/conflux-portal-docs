---
id: signing_data_with_portal
title: Signing Data with ConfluxPortal
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Signing_Data.md
---

## History of the signing methods

Portal is forked from MetaMask and there are multiple signing methods in
MetaMask. You can read the history of all the signing methods in [MetaMask
documentation](https://docs.metamask.io/guide/signing-data.html#a-brief-history). 

## What changed in ConfluxPortal

- We changed `cfx_sign` to use the
  [`personal_sign`](https://github.com/ethereum/go-ethereum/pull/2940) logic. We
  recommend using `cfx_sign` method instead of `personal_sign`.
- The `signTypedData`, `signTypedData_v1`, `signTypedData_v3`,
`signTypedData_v4` still works the same way as
[MetaMask](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v1).
But we are planning to change them before our mainet launch.
---
id: sign_typed_data_v4
title: Sign Typed Data v4
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/API_Reference/Signing_Data/Sign_Typed_Data_v4.md
---
The method `signTypedData_v4` currently represents the latest version of the
[EIP 712 spec](https://eips.ethereum.org/EIPS/eip-712), with added support for
arrays and with a breaking fix for the way structs are encoded. 

This does not mean it is perfect, and does not mean we will not eventually have
a `v5`, but we do intend to protect this namespace and keep it compatible going
forwards. 

We have a [great introductory blog post to this method
here](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26). 

Hopefully soon we will also have good examples for parsing method input into
structs for verification on-chain (great contribution opportunity!) 


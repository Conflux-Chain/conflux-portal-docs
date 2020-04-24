---
id: experimental_api
title: Experimental APIs
custom_edit_url: https://github.com/Conflux-Chain/conflux-portal-docs/edit/master/docs/en/portal/API_Reference/Experimental_APIs.md
---
## wallet_watchAsset

Most all Conflux wallets display some set of tokens, usually from a centrally
curated registry of tokens. 

At ConfluxPortal, we believe the future of tokens has the potential to be much
bigger than any one party can curate, and we want to enable this explosion of
creativity.  

In support of this goal, we have implemented support for [EIP
747](https://github.com/estebanmino/EIPs/blob/master/EIPS/eip-747.md), which
provides a way for your site to suggest a token that a user might want to track
in their wallet. 

The code is simple:

```javascript
conflux.sendAsync({
	method: 'metamask_watchAsset',
	params: {
		"type":"ERC20", // Initially only supports ERC20, but eventually more!
		"options":{
			"address": tokenAddress, // The address that the token is at.
			"symbol": tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
			"decimals": tokenDecimals, // The number of decimals in the token
			"image": tokenImage, // A string url of the token logo
		},
	},
	id: Math.round(Math.random() * 100000),
}, (err, addedBoolean) => {

})
```

We even created a sample Dapp so developers could suggest their tokens to users
with a simple hyperlink, without a line of code. [Visit it
here](https://github.com/MetaMask/Add-Token). 

<!-- ## `conflux._metamask` -->

<!-- ConfluxPortal supports the standard Conflux Provider API as defined in both -->
<!-- [EIP-1193](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1193.md) and -->
<!-- [EIP-1102](https://github.com/conflux/EIPs/blob/master/EIPS/eip-1102.md). In -->
<!-- addition to `conflux.enable()` and its RPC equivalent -->
<!-- `conflux.send('cfx_requestAccounts')`, ConfluxPortal also exposes a collection -->
<!-- of nonstandard convenience methods on the provider object at -->
<!-- `conflux._metamask`. **Using these methods is dangerous** since other dapp -->
<!-- browsers may or may not implement them; for this reason, these methods are -->
<!-- intentionally kept at a ConfluxPortal specific namespace to avoid confusion with -->
<!-- standard provider functionality.  -->

<!-- Each method and its intended use is described below. -->

<!-- ### `conflux._metamask.isEnabled: () => boolean` (To Be Removed) -->

<!-- **Note:** This will be removed in **Q1 2020**. -->

<!-- This method returns a `boolean` indicating if the current domain has access to -->
<!-- user accounts. This is useful for determining if a user has approved account -->
<!-- access for the current session.  -->

<!-- ### `conflux._metamask.isApproved: () => Promise<boolean>` (To Be Removed) -->

<!-- **Note:** This will be removed in **Q1 2020**. -->

<!-- This method returns a `Promise` that resolves to a `Boolean` indicating if the -->
<!-- current domain has a cached approval. This is useful for determining if an -->
<!-- approval popup will show when `conflux.enable()` is called, since it indicates -->
<!-- if a past approval exists.  -->

<!-- ### `conflux._metamask.isUnlocked: () => Promise<boolean>` -->

<!-- This method returns a `Promise` that resolves to a `Boolean` indicating if -->
<!-- ConfluxPortal is unlocked by the user. This is useful for knowing if -->
<!-- ConfluxPortal is unlocked in order to provide meaningful instructions to the -->
<!-- user during onboarding. Note that this does not indicate if a user has approved -->
<!-- account exposure.  -->

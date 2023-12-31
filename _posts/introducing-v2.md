---
title: 'Introducing Contract Browser 2.0: The Next Generation of Smart Contract Development'
coverImage: '/blog/new-xl.png'
excerpt: 'Celebrating exactly one year since its creation, I am thrilled to present Contract Browser 2.0 - the best way to discover smart contracts on Flow. This latest version is not just an upgrade; it is a complete overhaul designed to make your experience smoother, quicker, and more intuitive.'
date: '2023-11-16T05:35:07.322Z'
author:
  name: Andrea Muttoni
  picture: '/me.jpeg'
ogImage:
  url: '/blog/new-xl.png'
---

Celebrating exactly one year since its creation, I'm thrilled to present Contract Browser 2.0 – your new swiss army knife for composing on Flow. This latest version is not just an upgrade; it's a complete overhaul designed to make your experience smoother, quicker, and more intuitive.

![New](/blog/new.png)

## Introduction

Composability is the backbone of web3 - a smart contract becomes a building block that others can extend, build on top of, and compound utility. That's why a tool that makes searching for, browsing, and working with smart contracts is an essential part of a composable ecosystem. 

Contract Browser 2.0 is built from the ground up, using state-of-the-art technologies and a new component framework. The result? A cleaner, more intuitive browsing experience that's easier to use than ever before, including on mobile.

## Enhanced Search

![Search](/blog/search.png)

Discover smart contracts across networks effortlessly. The new cross-network search, coupled with a smart auto-suggest feature for your frequently used contracts, means less time searching, more time building.

## Trust with Verified Contracts

![Verified](/blog/verified.png)

Say hello to Verified Contracts. Now, import with confidence knowing you're using the right contract every time. Anyone can verify contracts, 100% for free via a simple pull request. If you want to verify your contract, [you can do so here](https://github.com/muttoni/contract-browser/blob/main/lib/verified-contracts.ts). 

[Explore verified contracts &rarr;](/verified)

## Seamless Deployment

![Onchain](/blog/onchain.png)

With Contract Browser 2.0, you can connect your wallet and manage your account directly from our platform: deploy contracts via our user-friendly UI, as well as update an existing contract. 

When deploying a contract, you can enjoy automatic import detection and a new "Autofill" button to automagically fetch contract addresses based on the network you're deploying to – you'll never have to worry about making a mistake or waste time looking for the right address.

## Intuitive Contract Inspection

![Components](/blog/components.png)

Contracts can be complex, but are often made up of similar building blocks. Thanks to Components, you can more easily understand how each contract works.

> Fun fact, did you know that the new [Disney Pinnacle contract](https://contractbrowser.com/A.edf9df96c92f4595.Pinnacle/components) emits 30 events and has 149 functions?! Now you know. 

![History](/blog/history.png)

With deployment history, you can step back in time and track how contracts evolved. 

![Diffing](/blog/diffs.png)

You can also use the side-by-side diffing tool, mirroring the familiarity of your favorite code editor.

![Diffing Preview](/blog/diffs-2.png)

## Roadmap

Since creating the original Contract Browser, it has always been a service built by the community, for the community. For example, the amazing [Lanford](https://github.com/LanfordCai) created the backend indexing service, [Flowdiver](https://flowdiver.io) is providing the data that powers Diffs (which you gotta try out - [here](https://contractbrowser.com/A.1d7e57aa55817448.MetadataViews/events)'s an example). 

The project is [100% open source](https://github.com/muttoni/contract-browser), so you can contribute to the project, as well as take inspiration for your own projects. Contract Browser 2.0 uses NextJS and Tailwind to better align with industry standards for easier community contributions.

What's Next? Expect more interactive features, transaction suggestions, and FLIX / verified transaction support in the near future.

[Experience the new Contract Browser today](https://contractbrowser.com) and let me know what you think!

\- Andrea
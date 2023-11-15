---
title: 'Introducing Contract Browser 2.0: The Next Generation of Smart Contract Development'
coverImage: '/blog/new-xl.jpeg'
excerpt: 'After exactly a year since its first release, I am thrilled to announce the launch of Contract Browser 2.0! A completely revamped experience that is faster, prettier, and more useful than ever before. Read on to learn more about what you can enjoy with the latest version.'
date: '2023-11-16T05:35:07.322Z'
author:
  name: Andrea Muttoni
  picture: '/me.jpeg'
ogImage:
  url: '/blog/new-xl.jpeg'
---

Celebrating exactly one year since its creation, I'm thrilled to present Contract Browser 2.0 – your new swiss army knife for composing on Flow. This latest version is not just an upgrade; it's a complete overhaul designed to make your experience smoother, quicker, and more intuitive.

![New](/blog/new.jpeg)

## Introduction

Composability is the backbone of web3 - a smart contract becomes a building block that others can extend, build on top of, and compound utility. That's why a tool that makes searching for, browsing, and working with smart contracts is an essential part of a composable ecosystem. 

Contract Browser 2.0 is built from the ground up, using state-of-the-art technologies and a new component framework. The result? A cleaner, more intuitive browsing experience that's easier to use than ever before, including on mobile.

## Enhanced Search

![Search](/blog/search.jpeg)

Discover smart contracts across networks effortlessly. The new cross-network search, coupled with a smart auto-suggest feature for your frequently used contracts, means less time searching, more time building.

## Trust with Verified Contracts

![Verified](/blog/verified.jpeg)

Say hello to Verified Contracts. Now, import with confidence knowing you're using the right contract every time. Verifying your own contract is just a pull request away – simplicity and security in one. Anyone can verify contracts, 100% for free via a simple pull request. If you want to verify your contract, [you can do so here](https://github.com/muttoni/contract-browser/blob/main/lib/verified-contracts.ts). 

[Explore verified contracts &rarr;](/verified)

## Seamless Deployment

![Onchain](/blog/onchain.jpeg)

With Contract Browser 2.0, you can connect your wallet and manage your account directly from our platform: deploy contracts via our user-friendly UI, as well as update an existing contract. 

When deploying a contract, you can enjoy automatic import detection and a new "Autofill" button to automagically fetch contract addresses based on the network you're deploying to – you'll never have to worry about making a mistake or waste time looking for the right address.

## Intuitive Contract Inspection

![Browsing](/blog/browsing.jpeg)

Contracts can be complex, but are often made up of similar building blocks. Thanks to Snippets, you can more easily understand how each contract works.

> Fun fact, did you know that the new [Disney Pinnacle contract](https://contractbrowser.com/A.edf9df96c92f4595.Pinnacle/snippets) emits 30 events and has 149 functions?! Now you know. 


![Diffing](/blog/diffs.jpeg)

With deployment history, you can step back in time and track how contracts evolve with the side-by-side diffing tool, mirroring the familiarity of your favorite code editor.

![Diffing Preview](/blog/diffs2.jpeg)

## Roadmap

Since creating the original Contract Browser, it is a service built by the community, for the community. For example, [Lanford](https://github.com/LanfordCai) created the backend indexing service, [Flowdiver](https://flowdiver.io) is providing the data that powers Diffs (which you gotta try out - [here](https://contractbrowser.com/A.1d7e57aa55817448.MetadataViews/events)'s an example). 

The project is [100% open source](https://github.com/muttoni/contract-browser), so you can contribute to the project, as well as take inspiration for your own projects. Contract Browser 2.0 uses NextJS and Tailwind to better align with industry standards for easier community contributions.

What's Next? Expect more interactive features, transaction suggestions, and FLIX / verified transaction support in the near future.

[Experience the new Contract Browser today](https://contractbrowser.com) and let me know what you think!

\- Andrea
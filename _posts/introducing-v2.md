---
title: 'Introducing Contract Browser 2.0: The Next Generation of Smart Contract Browsing'
coverImage: '/blog/new-xl.jpeg'
excerpt: 'After exactly a year since its first release, I am thrilled to announce the launch of Contract Browser 2.0! A completely revamped experience that is faster, prettier, and more useful than ever before. Read on to learn more about what you can enjoy with the latest version.'
date: '2023-11-16T05:35:07.322Z'
author:
  name: Andrea Muttoni
  picture: '/me.jpeg'
ogImage:
  url: '/blog/v2-hero.png'
---

After exactly a year since its first release, I'm thrilled to announce the launch of Contract Browser 2.0! A completely revamped experience that is faster, prettier, and more useful than ever before. Read on to learn more about what you can enjoy with the latest version.

![New](/blog/new.jpeg)

## Introduction

Composability is the backbone of web3 - a smart contract becomes a building block that others can extend, build on top of, and compound utility. That's why a tool that makes searching for, browsing, and working with smart contracts is an essential part of a composable ecosystem. 

Contract Browser 2.0 is built from the ground up, using state-of-the-art technologies and a new component framework. The result? A cleaner, more intuitive browsing experience that's easier to use than ever before, including on mobile.

## Search

![Search](/blog/search.jpeg)

The new cross-network search functionality makes it easy to find the smart contracts you need, whether you're looking on mainnet or testnet. Thanks to recently viewed contracts auto-suggested on search, you can instantly access your most frequently used contracts with just a few clicks.

## Onchain Functionality

![Onchain](/blog/onchain.jpeg)

With Contract Browser 2.0, you can connect your wallet and manage your account directly from our platform: deploy contracts via our user-friendly UI, as well as update an existing contract. 

When deploying a contract, you can enjoy automatic import detection and a new "Autofill" button to automagically fetch contract addresses based on the network you're deploying to – you'll never have to worry about making a mistake or waste time looking for the right address.

## Verified Contracts

![Verified](/blog/verified.jpeg)

Introducing Verified Contracts – import contracts with confidence. Verified contracts are "the right ones" to import, 100% of the time. Anyone can verify contracts, 100% for free via a simple pull request. 
If you want to verify your contract, [do so here](https://github.com/muttoni/contract-browser-new/blob/main/lib/verified-contracts.ts). 

[See all currently verified contracts &rarr;](/verified)

## Enhanced Browsing

![Browsing](/blog/browsing.jpeg)

Contracts can be complex, but are often made up of similar building blocks. With Snippets, you can more easily understand how each contract works. With deployment history you'll be able to see a contract's timeline. Thanks to smart caching you'll also enjoy snappier load times, you'll be able to browse more efficiently than ever before. 

![Diffing](/blog/diffs.jpeg)

Like all apps, smart contracts evolve over time. Easily pin-point what changed at a specific point in time, and leverage the flexible diffing options to quickly understand how a contract evolved over time.  

Contract Browser displays diffs side by side, just like on your favorite code editor.

![Diffing Preview](/blog/diffs2.jpeg)

## Roadmap

While I (Andrea) am the creator and maintainer of Contract Browser, this is a service built by the community, for the community. For example, [Lanford](https://github.com/LanfordCai) created the backend indexing service, [Flowdiver](https://flowdiver.io) is providing the data which powers Diffs (which you gotta try out - [here](https://contractbrowser.com/A.1d7e57aa55817448.MetadataViews/events)'s an example).

The project is [100% open source](https://github.com/muttoni/contract-browser-new), so you can both contribute to the project, as well as take inspiration for your own projects, whether it be the UI components or functionality. If you're curious, Contract Browser 2.0 is now using NextJS and Tailwind to better align with industry standards for easier contributions.

We're only just getting started In the coming months, we'll be working on even more features to enhance your experience with Contract Browser 2.0. Look out for enhanced interactivity, transaction suggestion, and FLIX and verified transaction support.

[Try it out today](https://contractbrowser.com) and let me know what you think!
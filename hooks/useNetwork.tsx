import { useState, useEffect } from "react"
import * as fcl from "@onflow/fcl"
import { getNetworkFromAddress } from "@/lib/utils"

export function getNetworkConfig(network){
  const networkConfig = {
    "testnet":{
    "env": "testnet",
    "app.detail.title":"Contract Browser (TESTNET)",
    "app.detail.icon": "https://contractbrowser.com/favicon.png",
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "fcl.eventsPollRate": 2500,
    "0xLockedTokens": "0x95e019a17d0e23d7",
    "0xFungibleToken": "0x9a0766d93b6608b7",
    "0xNonFungibleToken": "0x631e88ae7f1d7c20",

    "0xFUSD": "0xe223d8a629e49c68",
    "0xMetadataViews":  "0x631e88ae7f1d7c20",
    "discovery.wallet.method": "POP/RPC",
    "0xFIND": "0xa16ab1d0abde3625",
  },
  "mainnet":{
    "env": "mainnet",
    "app.detail.title":"Contract Browser (TESTNET)",
    "app.detail.icon": "https://contractbrowser.com/favicon.png",
    "accessNode.api": "https://rest-mainnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
    "fcl.eventsPollRate": 2500,
    "0xLockedTokens": "0x8d0e87b65159ae63",
    "0xFungibleToken": "0xf233dcee88fe0abe",
    "0xNonFungibleToken": "0x1d7e57aa55817448",
    "0xMetadataViews":  "0x1d7e57aa55817448",
    "0xFUSD": "0x3c5959b568896393",
    "discovery.wallet.method": "POP/RPC",
    "0xFIND": "0x097bafa4e0b48eef",
  }}
  return networkConfig[network]
}

export function useNetworkForAddress(address){
  var network = "testnet"
  if (address.indexOf(".find")>-1){
    network="mainnet"  
  }else{
  network = getNetworkFromAddress(address)
  }
  fcl.config(getNetworkConfig(network))
  return network
}

export function useNetwork(network) {
  const [value, setValue] = useState(null)

  useEffect(() => {
    async function setConfig(config, setter){
      var r =  await fcl.config(config)
      setter(await r.all())
    }
    setConfig(getNetworkConfig[network], setValue)
  },[network, value])
  
  
  return value
}
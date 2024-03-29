import { useState, useEffect } from "react"
import * as fcl from "@onflow/fcl"
// import config from "@/config/fcl"
import { getNetworkFromAddress } from "@/lib/utils"

export function getNetworkConfig(network){
  const networkConfig = {
    "testnet":{
    "flow.network": "testnet",
    "app.detail.title":"Contract Browser Testnet",
    "app.detail.icon": "https://contractbrowser.com/icon.png",
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "fcl.eventsPollRate": 2500,
    "0xLockedTokens": "0x95e019a17d0e23d7",
    "0xFungibleToken": "0x9a0766d93b6608b7",
    "0xNonFungibleToken": "0x631e88ae7f1d7c20",
    "0xFUSD": "0xe223d8a629e49c68",
    "0xMetadataViews":  "0x631e88ae7f1d7c20",
    "0xFIND": "0xa16ab1d0abde3625",
  },
  "mainnet":{
    "flow.network": "mainnet",
    "app.detail.title":"Contract Browser",
    "app.detail.icon": "https://contractbrowser.com/icon.png",
    "accessNode.api": "https://rest-mainnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
    "fcl.eventsPollRate": 2500,
    "0xLockedTokens": "0x8d0e87b65159ae63",
    "0xFungibleToken": "0xf233dcee88fe0abe",
    "0xNonFungibleToken": "0x1d7e57aa55817448",
    "0xMetadataViews":  "0x1d7e57aa55817448",
    "0xFUSD": "0x3c5959b568896393",
    "0xFIND": "0x097bafa4e0b48eef",
  }}
  return networkConfig[network]
}

export function useNetworkForAddress(address){
  let network = "testnet"
  if (address?.indexOf(".find")>-1){
    network="mainnet"  
  } else{
  network = getNetworkFromAddress(address)
  }
  fcl.config(getNetworkConfig(network))
  return network
}

export async function useNetwork(desiredNetwork: string = "mainnet"){
  const [network, setNetwork] = useState<string|null>(null)
  useEffect(() => {
    async function getConfig() {
      fcl.config(getNetworkConfig(network))
      await fcl.config.get('flow.network')
      setNetwork(desiredNetwork)
    }
    getConfig()
  }, [network])
  return { network, setNetwork }
}




// export function useNetwork(network = "mainnet") {
//   const [value, setValue] = useState(network)

//   useEffect(() => {
//     async function setConfig(config, setter){
//       var r =  await fcl.config(config)
//       setter(await r.all())
//     }
//     setConfig(getNetworkConfig[network], setValue)
//   },[network, value])
  
  
//   return value
// }

export function getNetwork(): string  {
  const [network, setNetwork] = useState<string|null>(null)

  useEffect(() => {
    async function getConfig() {
      const flowNetwork = await fcl.config.get('flow.network')
      setNetwork(flowNetwork)
    }
    getConfig()
  }, [])

  return network
}
"use client"

import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"
import {getNetworkFromAddress, withPrefix} from "@/lib/utils"
import { useEffect, useState } from "react"
import { getNetworkConfig } from "./useNetwork"

export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"

// // this is gross need to fix this in fcl
// function ready() {
//   return new Promise(resolve => {
//     setTimeout(resolve,100)
//   })
// }

async function fetchAccount(address) {
  return address == null ? Promise.resolve(null) : fcl.account(address)
}


export const data = atomFamily({
  key: "ACCOUNT::DATA",
  default: selectorFamily({
    key: "ACCOUNT::PRIME",
    get: address => async () => fetchAccount(address),
  }),
})

export const fsm = atomFamily({
  key: "ACCOUNT::FSM",
  default: IDLE,
})

export function useAccount(address) {

  if(!address) return;

  const network = getNetworkFromAddress(address)
  fcl.config(getNetworkConfig(network))

  address = withPrefix(address)
  const [$data, setData] = useRecoilState(data(address))
  const [$status, setStatus] = useRecoilState(fsm(address))
  const [storage, setStorage] = useState(null)

  
 
  useEffect(()=>{
    if (!$data) return 

    fcl
    .query({
      args: (arg, t) => [arg(address, t.Address)],
      cadence: `
      import FungibleToken from 0xFungibleToken 

      pub fun main(addr: Address): {String: AnyStruct} {
        let acct = getAccount(addr)
        let ret: {String: AnyStruct} = {}
        ret["capacity"] = acct.storageCapacity
        ret["used"] = acct.storageUsed
        ret["available"]  = 0
        if acct.storageCapacity>acct.storageUsed{
            ret["available"] = acct.storageCapacity - acct.storageUsed
        }
        var ft : [{String:AnyStruct}] = []
        
        getAuthAccount(addr).forEachStored(fun (path: StoragePath, type: Type): Bool {
            if type.isSubtype(of: Type<@FungibleToken.Vault>()){
                var vault = getAuthAccount(addr).borrow<&FungibleToken.Vault>(from:path)!
                ft.append({"path":path, "balance":vault.balance})
            }
            return true
        })
        
        ret["ft"] = ft
        
        //find profile
        var findProfile = getAuthAccount(addr).borrow<&AnyResource>(from:/storage/findProfile)
        ret["find"] = findProfile
        
        return ret
      } 
    `,
    }).then(setStorage)

  }, [address, $data])

  const account = {
    $data,
    storage,
    $status,
    async refetch() {
      setStatus(PROCESSING)
      await fetchAccount(address).then(setData)
      setStatus(IDLE)
    },
    isIdle: $status === IDLE,
    isProcessing: $status === PROCESSING,
    ...$data,
  }

  return {
    account,
    address,
    keys: account.keys || [],
    contracts: account.contracts || {}, 
    contractNames:  Object.keys(account?.contracts || {}),
    flowBalance: account.balance,
    storage: account.storage
  }
}
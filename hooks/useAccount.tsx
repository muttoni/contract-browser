"use client"
import * as fcl from "@onflow/fcl"
import {getNetworkFromAddress, withPrefix} from "@/lib/utils"
import { useEffect, useState } from "react"
import { getNetworkConfig } from "./useNetwork"
import GetAccountStorage from "@/cadence/scripts/GetAccountStorage"

export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"

async function fetchAccount(address) {
  return address == null ? Promise.resolve(null) : fcl.account(address)
}

export function useAccount(address) {

  if(!address) return;

  const [data, setData] = useState({})
  const [storage, setStorage] = useState({})
 
  useEffect(()=>{
    const network = getNetworkFromAddress(address)
    fcl.config(getNetworkConfig(network))

    fetchAccount(address).then((data) => {
      setData(data)
    })
    
    fcl
    .query({
      args: (arg, t) => [arg(address, t.Address)],
      cadence: GetAccountStorage,
    }).then(setStorage)

  }, [address])

  const account = {
    ...data as {
      address: string,
      keys: any[],
      contracts: any,
      balance: number,
    },
    storage: storage as {
      capacity: number,
      used: number,
      available: number,
      ft: any[],
      find: any
    },
  }

  return {
    account,
    address,
    keys: account?.keys || [],
    contracts: account?.contracts || {}, 
    contractNames:  Object.keys(account?.contracts || {}),
    flowBalance: account?.balance || 0,
    storage: account?.storage
  }
}
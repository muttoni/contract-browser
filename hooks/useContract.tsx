import { ContractResponseType } from "@/lib/types"
import { useState, useEffect } from "react"
import { getContractAddress, getNetworkFromAddress } from "@/lib/utils"

export function useContract(uuid: string, network?: string) {
  console.log("CALLED")

  const [ contract, setContract ] = useState(null)

  async function getData() {
    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contract/${uuid}?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  useEffect(() => {
    getData().then((data : ContractResponseType) => {
      console.log("setting contract data", {...data.contract.data})
      setContract({...data.contract.data})
    })
  }, [uuid, network])

  return contract
}
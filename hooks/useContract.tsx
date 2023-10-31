import { ContractResponseType, DependantsResponseType, DeploymentsResponseType } from "@/lib/types"
import { useState, useEffect } from "react"
import { getContractAddress, getNetworkFromAddress } from "@/lib/utils"

export function useContract(uuid: string, network?: string) {
  console.log("CALLED")

  const [ contract, setContract ] = useState(null)

  async function getBasicData() {
    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  async function getDeploymentData() {
    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/deployments?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }


  async function getDependantData() {
    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/dependants?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  useEffect(() => {
    getBasicData().then((data : ContractResponseType) => {
      console.log("setting contract data", {...data.contract.data})
      setContract({...data.contract.data})
    })

    getDeploymentData().then((data: DeploymentsResponseType) => {
      console.log("setting deployment data", data)
      setContract((prev) => {
        return {
          ...prev,
          deployments: data.data
        }
      })
    })

    getDependantData().then((data : DependantsResponseType) => {
      console.log("setting dependant data", data)
      setContract((prev) => {
        return {
          ...prev,
          dependants: data.data
        }
      })
    })


  }, [uuid, network])

  return contract
}
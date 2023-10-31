import { ContractResponseType, DependantsResponseType, DeploymentsResponseType } from "@/lib/types"
import { useState, useEffect } from "react"
import { getContractAddress, getNetworkFromAddress } from "@/lib/utils"

export function useContract(uuid: string) {
  console.log("CALLED")

  const [ contract, setContract ] = useState(null)

  async function getBasicData() {
    const cacheKey = `basicData_${uuid}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    localStorage.setItem(cacheKey, JSON.stringify(data))
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString())
    return data
  }

  async function getDeploymentData() {
    const cacheKey = `deploymentData_${uuid}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/deployments?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    localStorage.setItem(cacheKey, JSON.stringify(data))
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString())
    return data
  }


  async function getDependantData() {
    const cacheKey = `dependantData_${uuid}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/dependants?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    localStorage.setItem(cacheKey, JSON.stringify(data))
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString())
    return data
  }

  useEffect(() => {
    getBasicData().then((data : ContractResponseType) => {
      console.log("setting contract data", {...data.contract.data})
      setContract((prev) => {
        return {
          ...prev,
          ...data.contract.data
        }
      })
    })

    getDeploymentData().then((data: DeploymentsResponseType) => {
      console.log("setting deployment data", data)
      setContract((prev) => {
        return {
          ...prev,
          deploymentsObject: data.data
        }
      })
    })

    getDependantData().then((data : DependantsResponseType) => {
      console.log("setting dependant data", data)
      setContract((prev) => {
        return {
          ...prev,
          dependantsObject: data.data
        }
      })
    })

    // Update recently viewed contracts
    const recentContracts = JSON.parse(localStorage.getItem('recentContracts') || '[]')
    const index = recentContracts.indexOf(uuid)
    if (index !== -1) {
      recentContracts.splice(index, 1)
    }
    recentContracts.unshift(uuid)
    if (recentContracts.length > 20) {
      recentContracts.pop()
    }
    localStorage.setItem('recentContracts', JSON.stringify(recentContracts))

  }, [uuid])

  useEffect(() => {
    const cacheKeys = [`basicData_${uuid}`, `deploymentData_${uuid}`, `dependantData_${uuid}`]
    const now = Date.now()
    cacheKeys.forEach((key) => {
      const timestamp = localStorage.getItem(`${key}_timestamp`)
      if (timestamp && now - parseInt(timestamp) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key)
        localStorage.removeItem(`${key}_timestamp`)
      }
    })
  }, [uuid])

  return contract as {
    uuid: string,
    name: string,
    address: string,
    code: string,
    dependants_count: number,
    dependencies_count: number,
    deploymentsObject?: {
      deployments: {
        block_height: number,
        block_timestamp: string,
        tx_id: string,
        type: string,
      }[],
      total_deployments_count: number,
    },
    dependantsObject?: {
      dependants: any[];
      total_dependants_count: number;
      uuid: string;
    }
  }
}
import { ContractResponseType, DependantsResponseType, DeploymentsResponseType, FullContract, SnippetsResponse } from "@/lib/types"
import { useState, useEffect } from "react"
import { extractSnippetName, getContractAddress, getContractName, getNetworkFromAddress } from "@/lib/utils"
import { ContractCache } from "@/lib/cache"
import * as fcl from "@onflow/fcl"
import { getNetworkConfig } from "./useNetwork"

function createGetDataFunction(cacheKeyPrefix, pathSuffix) {
  return async function getData(uuid) {
    const cacheKey = `${cacheKeyPrefix}_${uuid}`
    const cachedData = ContractCache.retrieve(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/${pathSuffix}?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
    const res = await fetch(path)

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    ContractCache.store(cacheKey, data)
    return data
  }
}

async function getOnchainContractCode(uuid) {
  const address = getContractAddress(uuid)
  const name = getContractName(uuid)
  const network = getNetworkFromAddress(address)
  fcl.config(getNetworkConfig(network))

  console.log("fetching onchain contract code", address)

  const code = fcl.account(address).then((data) => {
    if(data as {
      address: string,
      keys: any[],
      contracts: any,
      balance: number,
    } && data.contracts[name] ) {
      return {
        address,
        name,
        code: data.contracts[name]
      }
    }
  })

  return code
}

export function useContract(uuid: string) {

  const [ contract, setContract ] = useState(null)

  const getBasicData = createGetDataFunction("basicData", "");
  const getDeploymentData = createGetDataFunction("deploymentData", "deployments");
  const getDependantData = createGetDataFunction("dependantData", "dependants");
  const getSnippetData = createGetDataFunction("snippetData", "snippets");


  useEffect(() => {

    getOnchainContractCode(uuid).then((code) => {
      setContract((prev) => {
        return {
          ...prev,
          ...code
        }
      })
    });

    getBasicData(uuid).then((contractReponse : ContractResponseType) => {
      // console.log("setting contract data",contractReponse)
      setContract((prev) => {
        return {
          ...prev,
          ...contractReponse.data
        }
      })
    })

    getDeploymentData(uuid).then((deploymentResponse: DeploymentsResponseType) => {
      // console.log("setting deployment data", {...deploymentResponse.data})
      setContract((prev) => {
        return {
          ...prev,
          deploymentsObject: deploymentResponse.data
        }
      })
    })

    getDependantData(uuid).then((dependantsResponse : DependantsResponseType) => {
      // console.log("setting dependant data", {...dependantsResponse.data})
      setContract((prev) => {
        return {
          ...prev,
          dependantsObject: dependantsResponse.data
        }
      })
    })

    getSnippetData(uuid).then((snippetsResponse : SnippetsResponse) => {
      const snippets = snippetsResponse?.data?.snippets

      if(!snippets) return;

      snippets.map((snippet, i) => {
        snippets[i].name = extractSnippetName(snippet.code)
      })

      snippetsResponse.data.snippets = snippets

      setContract((prev) => {
        return {
          ...prev,
          snippetsObject: snippetsResponse.data
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
    const cacheKeys = [`basicData_${uuid}`, `deploymentData_${uuid}`, `dependantData_${uuid}`, `snippetData_${uuid}`]
    ContractCache.checkExpiry(cacheKeys)
  }, [uuid])

  return contract as FullContract & {
    deploymentsObject?: DeploymentsResponseType["data"]
    dependantsObject?: DependantsResponseType["data"]
    snippetsObject?: SnippetsResponse["data"]
  }
}
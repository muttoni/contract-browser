import { ContractResponseType, DependantsResponseType, DeploymentsResponseType, FullContract, SnippetsResponse } from "@/lib/types"
import { useState, useEffect } from "react"
import { getContractAddress, getNetworkFromAddress } from "@/lib/utils"

function createGetDataFunction(cacheKeySuffix, pathSuffix) {
  return async function getData(uuid) {
    const cacheKey = `${cacheKeySuffix}_${uuid}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/contracts/${uuid}/${pathSuffix}?network=${getNetworkFromAddress(getContractAddress(uuid)) || "mainnet"}`
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
}

export function useContract(uuid: string) {

  const [ contract, setContract ] = useState(null)

  const getBasicData = createGetDataFunction("basicData", "");
  const getDeploymentData = createGetDataFunction("deploymentData", "deployments");
  const getDependantData = createGetDataFunction("dependantData", "dependants");
  const getSnippetData = createGetDataFunction("snippetData", "snippets");


  useEffect(() => {
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
      // console.log("setting snippets data", {...snippetsResponse.data})
      const snippets = snippetsResponse.data.snippets

      const regex = /^ *(pub|priv|access\(self\)|access\(contract\)|access\(all\)|access\(account\)|pub\(set\))? *(resource|struct|fun|event|resource *interface) * (?<name>(?!interface)[A-Za-z_][A-Za-z0-9_]*)/

      snippets.map((snippet, i) => {
        //console.log(snippet.code.match(regex)?.groups?.name)
        snippets[i].name = snippet.code.match(regex)?.groups?.name
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

  return contract as FullContract & {
    deploymentsObject?: DeploymentsResponseType["data"]
    dependantsObject?: DependantsResponseType["data"]
    snippetsObject?: SnippetsResponse["data"]
  }
}
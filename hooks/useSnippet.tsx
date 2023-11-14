import { ContractSearchResponseType, SnippetsResponse } from "@/lib/types"
import { extractSnippetName } from "@/lib/utils"
import { useState, useEffect } from "react"

function createGetDataFunction(cacheKeySuffix, pathSuffix) {
  return async function getData(snippetId, network) {
    const cacheKey = `${cacheKeySuffix}_${snippetId}`
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    const path = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/snippets/${snippetId}/${pathSuffix}?network=${network || "mainnet"}`
    console.log('fetching..', path)
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


export function useSnippet(snippetId: string) {

  const [ snippet, setSnippet ] = useState(null)

  const getSnippetData = createGetDataFunction("snippetData", "");
  const getSnippetContractData = createGetDataFunction("snippetContractData", "contracts");


  useEffect(() => {

    getSnippetData(snippetId, "mainnet").then((snippetsResponse : SnippetsResponse) => {
      const snippet = snippetsResponse.data

      snippet.name = extractSnippetName(snippet.code)
  
      setSnippet((prev) => {
        return {
          ...prev,
          ...snippet
        }
      })
    })

    getSnippetContractData(snippetId, "mainnet").then((snippetContractsResponse : ContractSearchResponseType) => {
      const contracts = snippetContractsResponse.data.contracts

      setSnippet((prev) => {
        return {
          ...prev,
          contracts,
        }
      })
    })
  }, [snippetId])

  useEffect(() => {
    const cacheKeys = [`snippetData_${snippetId}`, `snippetContractData_${snippetId}`]
    const now = Date.now()
    cacheKeys.forEach((key) => {
      const timestamp = localStorage.getItem(`${key}_timestamp`)
      if (timestamp && now - parseInt(timestamp) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key)
        localStorage.removeItem(`${key}_timestamp`)
      }
    })
  }, [snippetId])

  return snippet
}
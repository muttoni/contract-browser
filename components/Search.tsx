import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"

import { cn, debounce, getContractAddress } from "@/lib/utils"
import {ContractSearchResponseType } from "@/lib/types"

import useOutsideClick from "@/hooks/useOutsideClick"

import SearchDataTable from "./tables/SearchDataTable"
import { columns } from "./tables/SearchContractTableColumns"

import { Clock, Info, SearchIcon } from "lucide-react"

import Loading from "@/components/ui/Loading"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ContractBadge from "@/components/ui/ContractBadge"
import AddressBadge from "@/components/ui/AddressBadge"

export function Search() {

  
  const [ query, setQuery ] = useState("")
  const [ network, setNetwork ] = useState("mainnet")
  const [ contractResultsMainnet, setContractResultsMainnet ] = useState({} as ContractSearchResponseType)
  const [ contractResultsTestnet, setContractResultsTestnet ] = useState({} as ContractSearchResponseType)
  const [ loading, setLoading ] = useState(false)
  const [ loadingMainnetResults, setLoadingMainnetResults ] = useState(false)
  const [ loadingTestnetResults, setLoadingTestnetResults ] = useState(false)
  const [ showSearchWindow , setShowSearchWindow ] = useState(false)
  
  const [ recentContracts, setRecentContracts ] = useState([] as string[])
  const [ offset, setOffset ] = useState(0)
  const [ limit, setLimit ] = useState(50)
  
  const router = useRouter()
  
  const containerComponentRef = useRef()
  const handleOutsideClick = () => {
    setShowSearchWindow(false)
  }
  const ref = useOutsideClick(handleOutsideClick)

  const getResults = useCallback(
    debounce(async (query) => {

      setLoading(true)
      setLoadingMainnetResults(true)
      setLoadingTestnetResults(true)

      console.log("fetching search results")

      const reqMainnet = fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/search/contracts?network=mainnet&query=${query}&offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((res) => {
          setLoadingMainnetResults(false)
          setContractResultsMainnet(res)
        })

      const reqTestnet = fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/search/contracts?network=testnet&query=${query}&offset=${offset}&limit=${limit}`)
        .then((res) => res.json())
        .then((res) => {
          setLoadingTestnetResults(false)
          setContractResultsTestnet(res)
        })

    }, 500),[])

  useEffect(() => {

    setRecentContracts(JSON.parse(localStorage.getItem("recentContracts")) as string[])
    
    switch(true) {
      case /^(?:0x)?[0-9a-fA-F]{8,16}$/.test(query):
        // Account search
        setLoading(false)
        setQuery("")
        return router.push(`/account/${query}`)
      case /^(?:A\.)?[0-9a-fA-F]{8,16}\.[\w-]+$/.test(query):
        // Contract search
        setLoading(false)
        setQuery("")
        return router.push(`/${query}`)
      default:
        break
    }

    if(query.length > 0) {
      setShowSearchWindow(true)
    }

    if(query.length > 2){
      setLoading(true)
      getResults(query)
    }

    return () => {
      setLoading(false)
    }
  }, [query, offset, limit])

  return (
    <div className="relative flex items-center w-full" ref={ref}>
      <SearchIcon className={cn("h-6 w-6 text-muted-foreground absolute left-4")} />
      {/* <SearchIcon className={cn("h-6 w-6 text-muted-foreground absolute left-4", query.length > 2 || loading ? "hidden": "")} /> */}
      {/* <Loading className={cn("w-6 h-6 absolute left-4 top-4", loading ? "": "hidden")} /> */}
      <Input
          type="search"
          placeholder="Search contracts, addresses and code"
          className="w-full h-10 md:h-14 md:text-lg ps-14 ring-2 ring-muted rounded-md"
          onFocus={() => setShowSearchWindow(true)}
          value={query}
          onChange={(e) => { setQuery(e.target.value)}}
        />

      {showSearchWindow && (recentContracts?.length || query.length > 2) ? (
      <>
      <Card className="max-h-[80vh] shadow-lg absolute overflow-auto w-full top-[38px] md:top-[50px] z-10 px-2 rounded-t-none">
      {recentContracts?.length > 0 && 
        <>
          <ul className="text-sm py-1 max-h-[150px] overflow-auto">
            {
            recentContracts
              .filter((recentContract) => recentContract.toLowerCase().includes(query.toLocaleLowerCase()))
              .map((recentContract) => {
                return (
                  <li key={recentContract} className="flex items-center gap-2 py-1 ps-3 text-muted-foreground hover:bg-muted rounded">
                    <Clock className="h-4 w-4 me-2" />
                    <AddressBadge address={getContractAddress(recentContract)} />
                    <ContractBadge uuid={recentContract} />
                  </li>
                )
              })
            }
          </ul>
          <Separator />
        </>
        }
        {query.length > 2 && <>
          <CardHeader className="px-2 pt-3 pb-2">
            <h3 className="text font-bold flex items-center justify-between">
              <span>Search Results</span>
              <span className="text-muted-foreground font-normal text-sm">{(contractResultsMainnet?.data?.total_contracts_count || 0) + (contractResultsTestnet?.data?.total_contracts_count || 0)} total results</span>
            </h3>
          </CardHeader>
          <CardContent className="px-2">
            <Tabs defaultValue="mainnet" className="space-y-4">
              <div className="flex">
              <TabsList>
                <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")} className="flex items-center">
                  Mainnet {loadingMainnetResults ? <Loading className="w-4 h-4 ms-2" /> : `(${contractResultsMainnet?.data?.total_contracts_count || 0})`}
                </TabsTrigger>
                <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")} className="flex items-center">
                  Testnet {loadingTestnetResults ? <Loading className="w-4 h-4 ms-2" /> : `(${contractResultsTestnet?.data?.total_contracts_count || 0})`}
                </TabsTrigger>
              </TabsList>
              <span className={`flex gap-2 ms-4 items-center text-xs text-muted-foreground ${network !== 'testnet' ? 'hidden' : null}`}><Info className="h-4 w-4"/>Note: Testnet API is slower</span>
              </div>

              <TabsContent value="mainnet" className="space-y-4">
              <h3 className="text-sm uppercase font-bold flex items-center justify-between mt-2 mb-1">
                  <span>Mainnet Contracts</span>
                  <span className="text-muted-foreground font-normal text-sm lowercase">{contractResultsMainnet?.data?.total_contracts_count || 0} results</span>
                </h3>
                {contractResultsMainnet && contractResultsMainnet?.data?.contracts?.length && contractResultsMainnet?.data?.contracts?.length  > 0 ?
                <SearchDataTable onClick={() => setShowSearchWindow(false)} data={contractResultsMainnet?.data?.contracts} columns={columns}/>
                : <div className={cn("text-sm block pt-4 pb-8 text-muted-foreground", loadingMainnetResults ? "hidden" : "")}>No results.</div>
                }
              </TabsContent>
              <TabsContent value="testnet" className="space-y-4">
                <h3 className="text-sm uppercase font-bold flex items-center justify-between mt-2 mb-1">
                  <span>Testnet Contracts</span>
                  <span className="text-muted-foreground">{contractResultsTestnet?.data?.total_contracts_count || 0} results</span>
                </h3>
                {contractResultsTestnet && contractResultsTestnet?.data?.contracts?.length && contractResultsTestnet?.data?.contracts?.length  > 0 ?
                <SearchDataTable onClick={() => setShowSearchWindow(false)} data={contractResultsTestnet?.data?.contracts} columns={columns}/>
                : <div className={cn("text-sm block pt-4 pb-8 text-muted-foreground", loadingTestnetResults ? "hidden" : "")}>No results.</div>
                }
              </TabsContent>
            </Tabs>
          </CardContent>
        </>}
        </Card>
      </>
      ): null}
      
    </div>
  )
}
"use client"
import { Suspense, useEffect, useRef, useState } from "react"
import CountUp from "react-countup"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { StatusResponseType } from "@/lib/types"
import { formatNumber, timeSince } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Skeleton } from "@/components/ui/skeleton"
import ConnectionLight from "@/components/ui/ConnectionLight"
import Link from "next/link"
import { FileCode2, Hourglass, Trophy } from "lucide-react"
import APIContractsTable from "@/components/tables/APIContractsTable"

export default function Page() {
  const [ status, setStatus ] = useState(null as unknown as StatusResponseType | null | undefined)
  const [ network, setNetwork ] = useState("mainnet")
  const [ updatedStart, setUpdatedStart ] = useState(0)
  const [ contractStats, setContractStats ] = useState({})

  async function getData(): Promise<StatusResponseType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/status?network=${network}`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json() 
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        if(typeof savedCallback?.current === "function") {
          // @ts-ignore
          savedCallback.current();
        }
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    let currentBlockHeight = status?.data?.synced_height || 0
    getData().then((data) => {
      setUpdatedStart(currentBlockHeight)
      setStatus(data)
    })
  }, 5000)

  useEffect(() => {
    getData().then((data) => {
      setStatus(data)
    })

    setContractStats({})
    fetch(`${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/graphql/`, {
      method: "POST",
      body: JSON.stringify({
        queryType: "CONTRACT_STATS",
        args: {
          interval: 1,
          time_scale: "day",
        },
        network
      })
    }).then((res) => res.json()).then(setContractStats)
  }, [network])


  return (
    <div className="flex-1 pt-2 md:pt-4">
      <Tabs defaultValue="mainnet" className="space-y-4">
      <div className="flex md:flex-col items-center justify-between md:justify-start md:items-start md:gap-y-2">
        <h2 className="text-3xl font-bold tracking-tight hidden">Overview</h2>
        <TabsList>
          <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
          <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
        </TabsList>
      </div>
        <TabsContent value="mainnet" className="space-y-4">
          <Dashboard network="mainnet" status={status} updatedStart={updatedStart} contractStats={contractStats}/>
        </TabsContent>
        <TabsContent value="testnet" className="space-y-4">
          <Dashboard network="testnet" status={status} updatedStart={updatedStart} contractStats={contractStats}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Dashboard({ network, status, updatedStart, contractStats }) {
  return (
    <>
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Contracts
          </CardTitle>
          <FileCode2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-8 w-24" />}>
            <div className="text-2xl font-bold"><CountUp start={0} end={status?.data?.contract_amount} /></div>
          </Suspense>
          <p className="text-xs text-muted-foreground">
            contracts on {network}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Deployed Today
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"><CountUp start={0} end={contractStats ? contractStats.contracts : 0} /></div>
          <p className="text-xs text-muted-foreground">
            {(contractStats.contracts_diff || 0).toFixed(2)}% from yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Block Height</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"><CountUp start={updatedStart} end={status?.data?.synced_height} /></div>
          <p className="text-xs text-muted-foreground">
            Blocks on {network}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Status
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl flex items-center gap-3 font-bold">
            <ConnectionLight status={status?.data ? "online" : "connecting"}/>
            {status?.data ? "Online" : "Connecting"}
          </div>
          <p className="text-xs text-muted-foreground">
            last synced {timeSince(new Date(status?.data?.last_sync_at + "Z")) || "-"} ago
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="md:col-span-3 overflow-auto border-none md:border-solid shadow-none md:shadow-sm"> {/* md:border-solid shadow-none md:shadow-sm */}
        <CardHeader className="px-0 md:px-4 pb-2 md:pb-2">
          <CardTitle className="flex flex-row items-center justify-between">
            <span>Top Contracts</span>
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>
            The most depended on contracts on {network}. <Link href="/top" className="text-primary font-bold whitespace-nowrap">View more &rarr;</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 py-3 md:px-3">
          <APIContractsTable action="top" network={network} limit={10} border={false} />
        </CardContent>
      </Card>
      <Card className="md:col-span-3 overflow-auto border-none  md:border-solid shadow-none md:shadow-sm">
        <CardHeader className="px-0 md:px-4 pb-2 md:pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Recent Contracts</span>
            <Hourglass className="h-5 w-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>
            The most recently deployed contracts on {network}. <Link href="/recent" className="text-primary font-bold whitespace-nowrap">View more &rarr;</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 py-3 md:px-3">
          <APIContractsTable action="recent" network={network} limit={10} border={false} />
        </CardContent>
      </Card>
    </div>
    </>
  )
}
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
import RecentContractsTable from "@/components/tables/RecentContractsTable"
import TopContractsTable from "@/components/tables/TopContractsTable"
import { Skeleton } from "@/components/ui/skeleton"
import ConnectionLight from "@/components/ui/ConnectionLight"
import Link from "next/link"
import { Hourglass, Star, Trophy } from "lucide-react"



export default function Page() {
  const [ status, setStatus ] = useState(null as unknown as StatusResponseType | null | undefined)
  const [ network, setNetwork ] = useState("mainnet")
  const [ updatedStart, setUpdatedStart ] = useState(0)

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
    let currentBlockHeight = status?.status?.data?.synced_height || 0
    getData().then((data) => {
      setUpdatedStart(currentBlockHeight)
      setStatus(data)
    })
  }, 5000)

  useEffect(() => {
    getData().then((data) => {
      setStatus(data)
    })
  }, [network])

  return (
        <div className="flex-1 space-y-4 md:pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="mainnet" className="space-y-4">
            <TabsList>
              <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
              <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
            </TabsList>
            <TabsContent value="mainnet" className="space-y-4">
              <Dashboard network="mainnet" status={status} updatedStart={updatedStart}/>
            </TabsContent>
            <TabsContent value="testnet" className="space-y-4">
              <Dashboard network="testnet" status={status} updatedStart={updatedStart}/>
            </TabsContent>
          </Tabs>
        </div>
  )
}

function Dashboard({ network, status, updatedStart }) {
  return (
    <>
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Contracts
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
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-8 w-24" />}>
            <div className="text-2xl font-bold">{formatNumber(status?.status?.data?.contract_amount || 0)}</div>
          </Suspense>
          <p className="text-xs text-muted-foreground">
            contracts on {network}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unique deploying addresses
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
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
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
          <div className="text-2xl font-bold"><CountUp start={updatedStart} end={status?.status?.data?.synced_height} /></div>
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
            <ConnectionLight status={status?.status?.data ? "online" : "connecting"}/>
            {status?.status?.data ? "Online" : "Connecting"}
          </div>
          <p className="text-xs text-muted-foreground">
            last synced {timeSince(new Date(status?.status?.data?.last_sync_at + "Z")) || "-"} ago
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <span>Top Contracts</span>
            <Trophy className="h-5 w-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>
            The most depended on contracts on {network}. <Link href="/top" className="text-primary font-bold">View all &rarr;</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <TopContractsTable network={network} />
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between">
            <span>Recent Contracts</span>
            <Hourglass className="h-5 w-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>
            The most recently deployed contracts on {network}. <Link href="/recent" className="text-primary font-bold">View all &rarr;</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentContractsTable network={network} />
        </CardContent>
      </Card>
    </div>
    </>
  )
}
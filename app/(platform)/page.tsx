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
//import { useMigration } from "@/contexts/MigrationContext"

export default function Page() {
  const [ status, setStatus ] = useState(null as unknown as StatusResponseType | null | undefined)
  const [ network, setNetwork ] = useState("mainnet")
  const [ updatedStart, setUpdatedStart ] = useState(0)
  const [ contractStats, setContractStats ] = useState({
    contracts_diff : 0
  })

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

    setContractStats({
      contracts_diff : 0
    })

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

  //const { data, error } = useMigration();

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
            {typeof contractStats?.contracts_diff === 'number' ? contractStats?.contracts_diff.toFixed(2) : '0.00'}% from yesterday
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
            blocks synced
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Status
          </CardTitle>
          <ConnectionLight status={status?.data ? "online" : "connecting"}/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl flex items-center gap-3 font-bold">
            <div className="text-2xl font-bold"><CountUp start={0} end={status?.data?.contract_search_count || 0} /></div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            searches on {network}
          </div>
        </CardContent>
      </Card>
    </div>
      {/* <Card className=" border-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            Staged Contracts on {network}
          </CardTitle>
          <svg className="h-4 w-4 me-2 text-green-500" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M34.319 8.75L26.103 17.5L58.729 17.764C81.918 17.951 91.765 18.368 92.773 19.204C93.955 20.185 94.135 25.806 93.858 53.19C93.676 71.236 93.783 86.001 94.096 86.001C94.409 86 98.572 82.008 103.346 77.129L112.027 68.258V35.329C112.027 11.051 111.712 2.085 110.827 1.2C109.941 0.314001 100.839 0 76.081 0H42.536L34.319 8.75ZM5.229 38.295L0 43.59L0.263 77.545L0.527 111.5L34.548 111.763L68.57 112.026L73.833 106.697L79.096 101.367L78.811 89.934L78.527 78.5L71.782 84.769L65.036 91.038L42.782 90.769L20.527 90.5L20.256 69.656L19.986 48.813L27.68 40.906L35.374 33H22.916H10.459L5.229 38.295ZM50.262 48.264L38.027 60.529V67.264V74H44.291H50.556L63.291 61.236L76.027 48.472V42.236V36H69.262H62.497L50.262 48.264Z" fill="currentColor"/>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"><CountUp start={0} end={data[network+'StagedCount']} /></div>
          <p className="text-xs text-muted-foreground">
            staged contracts for Crescendo
          </p>
        </CardContent>
      </Card> */}
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
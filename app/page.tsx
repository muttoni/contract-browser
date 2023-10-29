"use client"
import { Suspense, useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { StatusResponseType } from "@/lib/types"
import { formatNumber } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import RecentContracts from "@/components/RecentContracts"
import TopContracts from "@/components/TopContracts"
import { Skeleton } from "@/components/ui/skeleton"



export default function Page() {
  const [ status, setStatus ] = useState(null as unknown as StatusResponseType | null | undefined)
  const [ network, setNetwork ] = useState("mainnet")

  async function getData(): Promise<StatusResponseType> {
    const res = await fetch(`${window.location.origin + window.location.pathname.replace(/\/+$/, "")}/api/status?network=${network}`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json() 
  }

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
              <Dashboard network="mainnet" status={status}/>
            </TabsContent>
            <TabsContent value="testnet" className="space-y-4">
              <Dashboard network="testnet" status={status}/>
            </TabsContent>
          </Tabs>
        </div>
  )
}

function Dashboard({ network, status }) {
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
          <div className="text-2xl font-bold">{status?.status?.data?.synced_height}</div>
          <p className="text-xs text-muted-foreground">
            Blocks on {network}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Now
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
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            +201 since last hour
          </p>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Top Contracts</CardTitle>
          <CardDescription>
            The most depended on contracts on {network}.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <TopContracts network={network} />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Contracts</CardTitle>
          <CardDescription>
            The most recently deployed contracts on {network}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentContracts network={network} />
        </CardContent>
      </Card>
    </div>
    </>
  )
}
"use client"
import TopContractsTable from "@/components/tables/TopContractsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react"

export default function () {
  const [ network, setNetwork ] = useState("mainnet")

  return (
    <>
    <div className="py-6">
      <h2 className="text-3xl font-bold tracking-tight">Top Contracts</h2>
      <p className="text-muted-foreground">The top 500 contracts on {network}, ranked by number of dependants.</p>
    </div>
    <Tabs defaultValue="mainnet" className="space-y-4">
      <TabsList>
        <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
        <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
      </TabsList>
      <TabsContent value="mainnet" className="space-y-4">
        <TopContractsTable network="mainnet" limit={500}/>
      </TabsContent>
      <TabsContent value="testnet" className="space-y-4">
        <TopContractsTable network="testnet" limit={500}/>
      </TabsContent>
    </Tabs>
  </>
  )
}
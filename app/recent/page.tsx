"use client"
import RecentContractsTable from "@/components/tables/RecentContractsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react"

export default function RecentContracts() {
  const [ network, setNetwork ] = useState("mainnet")

  return (
    <>
    <div className="py-6">
      <h2 className="text-3xl font-bold tracking-tight">Recent Contracts</h2>
      <p className="text-muted-foreground">The 500 most recently deployed contracts on {network}.</p>
    </div>
    <Tabs defaultValue="mainnet" className="space-y-4">
      <TabsList>
        <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
        <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
      </TabsList>
      <TabsContent value="mainnet" className="space-y-4">
        <RecentContractsTable network="mainnet" limit={500}/>
      </TabsContent>
      <TabsContent value="testnet" className="space-y-4">
        <RecentContractsTable network="testnet" limit={500}/>
      </TabsContent>
    </Tabs>
  </>
  )
}
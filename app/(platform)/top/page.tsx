"use client"
import APIContractsTable from "@/components/tables/APIContractsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react"

export default function TopContracts() {
  const [ network, setNetwork ] = useState("mainnet")

  return (
    <div className="grid">
      <div>
        <div className="py-6">
          <h2 className="text-3xl font-bold tracking-tight">Top Composers</h2>
          <p className="text-muted-foreground">The top 500 contracts on {network}, ranked by number of contracts that depend on them.</p>
        </div>
        <Tabs defaultValue="mainnet" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mainnet" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
            <TabsTrigger value="testnet" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
          </TabsList>
          <TabsContent value="mainnet" className="space-y-4">
            <APIContractsTable action="top" network="mainnet" limit={500} />
          </TabsContent>
          <TabsContent value="testnet" className="space-y-4">
            <APIContractsTable action="top" network="testnet" limit={500} />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <div className="py-6">
          <h2 className="text-3xl font-bold tracking-tight">Top Importers</h2>
          <p className="text-muted-foreground">The top 500 contracts on {network}, ranked by number of contracts that they depend on.</p>
        </div>
        <Tabs defaultValue="mainnetDeps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mainnetDeps" onClick={() => setNetwork("mainnet")}>Mainnet</TabsTrigger>
            <TabsTrigger value="testnetDeps" onClick={() => setNetwork("testnet")}>Testnet</TabsTrigger>
          </TabsList>
          <TabsContent value="mainnetDeps" className="space-y-4">
            <APIContractsTable action="topByDependencies" network="mainnet" limit={500} />
          </TabsContent>
          <TabsContent value="testnetDeps" className="space-y-4">
            <APIContractsTable action="topByDependencies" network="testnet" limit={500} />
          </TabsContent>
        </Tabs>
      </div>
  </div>
  )
}
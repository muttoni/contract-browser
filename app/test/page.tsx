"use client"
import TopContractsTable from "@/components/tables/TopContractsTable";
import RecentContractsTable from "@/components/tables/RecentContractsTable";


export default function TestPage() {

  return (
    <div className="">
      <TopContractsTable network={"mainnet"}/>
      <RecentContractsTable network={"mainnet"} />
    </div>
  )
}